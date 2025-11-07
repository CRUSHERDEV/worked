-- Payment Processing Functions
-- Description: Functions for processing payments and managing transactions

-- Function to process payment
CREATE OR REPLACE FUNCTION process_payment(
    p_user_id UUID,
    p_order_id UUID,
    p_amount DECIMAL(15, 2),
    p_method payment_method,
    p_provider TEXT DEFAULT 'internal'
)
RETURNS JSONB AS $$
DECLARE
    v_wallet_id UUID;
    v_balance DECIMAL(15, 2);
    v_payment_id UUID;
    v_transaction_id UUID;
    v_reference TEXT;
BEGIN
    -- Get wallet ID
    SELECT id, fiat_balance INTO v_wallet_id, v_balance
    FROM wallets
    WHERE user_id = p_user_id;

    IF v_wallet_id IS NULL THEN
        RAISE EXCEPTION 'Wallet not found for user';
    END IF;

    -- Generate reference
    v_reference := 'PAY-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 12));

    -- Create payment record
    INSERT INTO payments (
        order_id,
        user_id,
        amount,
        currency,
        method,
        provider,
        status,
        provider_transaction_id
    ) VALUES (
        p_order_id,
        p_user_id,
        p_amount,
        'NGN',
        p_method,
        p_provider,
        'processing',
        v_reference
    ) RETURNING id INTO v_payment_id;

    -- Handle wallet payment
    IF p_method = 'wallet' OR p_method = 'linked_coin' THEN
        IF v_balance < p_amount THEN
            UPDATE payments SET status = 'failed', failure_reason = 'Insufficient balance' WHERE id = v_payment_id;
            RAISE EXCEPTION 'Insufficient balance';
        END IF;

        -- Deduct from wallet
        UPDATE wallets
        SET fiat_balance = fiat_balance - p_amount,
            updated_at = NOW()
        WHERE id = v_wallet_id;

        -- Create transaction
        INSERT INTO transactions (
            wallet_id,
            type,
            amount,
            currency,
            balance_before,
            balance_after,
            reference,
            description,
            status
        ) VALUES (
            v_wallet_id,
            'purchase',
            -p_amount,
            'NGN',
            v_balance,
            v_balance - p_amount,
            v_reference,
            'Payment for order',
            'completed'
        ) RETURNING id INTO v_transaction_id;

        -- Update payment status
        UPDATE payments
        SET status = 'completed', completed_at = NOW()
        WHERE id = v_payment_id;
    ELSE
        -- For other payment methods, mark as pending (external processing)
        -- In production, this would integrate with payment providers
        UPDATE payments
        SET status = 'pending'
        WHERE id = v_payment_id;
    END IF;

    RETURN jsonb_build_object(
        'payment_id', v_payment_id,
        'transaction_id', v_transaction_id,
        'status', 'completed',
        'reference', v_reference
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to create order with items (transactional)
CREATE OR REPLACE FUNCTION create_order_with_items(
    p_user_id UUID,
    p_vendor_id UUID,
    p_items JSONB,
    p_shipping_address JSONB,
    p_payment_method payment_method DEFAULT 'wallet',
    p_notes TEXT DEFAULT NULL
)
RETURNS JSONB AS $$
DECLARE
    v_order_id UUID;
    v_order_number TEXT;
    v_subtotal DECIMAL(15, 2) := 0;
    v_total DECIMAL(15, 2) := 0;
    v_item JSONB;
    v_product_id UUID;
    v_quantity INTEGER;
    v_unit_price DECIMAL(15, 2);
    v_item_total DECIMAL(15, 2);
BEGIN
    -- Generate order number
    v_order_number := generate_order_number();

    -- Calculate subtotal
    FOR v_item IN SELECT * FROM jsonb_array_elements(p_items)
    LOOP
        v_product_id := (v_item->>'product_id')::UUID;
        v_quantity := (v_item->>'quantity')::INTEGER;
        
        SELECT base_price INTO v_unit_price
        FROM products
        WHERE id = v_product_id;

        IF v_unit_price IS NULL THEN
            RAISE EXCEPTION 'Product not found: %', v_product_id;
        END IF;

        v_item_total := v_unit_price * v_quantity;
        v_subtotal := v_subtotal + v_item_total;
    END LOOP;

    -- Calculate total (add shipping, tax, etc.)
    v_total := v_subtotal;

    -- Create order
    INSERT INTO orders (
        order_number,
        user_id,
        vendor_id,
        status,
        subtotal,
        total,
        currency,
        shipping_address,
        notes
    ) VALUES (
        v_order_number,
        p_user_id,
        p_vendor_id,
        'pending',
        v_subtotal,
        v_total,
        'NGN',
        p_shipping_address,
        p_notes
    ) RETURNING id INTO v_order_id;

    -- Create order items
    FOR v_item IN SELECT * FROM jsonb_array_elements(p_items)
    LOOP
        v_product_id := (v_item->>'product_id')::UUID;
        v_quantity := (v_item->>'quantity')::INTEGER;
        
        SELECT base_price, name, sku INTO v_unit_price, v_item->>'name', v_item->>'sku'
        FROM products
        WHERE id = v_product_id;

        INSERT INTO order_items (
            order_id,
            product_id,
            name,
            sku,
            quantity,
            unit_price,
            total_price
        ) VALUES (
            v_order_id,
            v_product_id,
            v_item->>'name',
            v_item->>'sku',
            v_quantity,
            v_unit_price,
            v_unit_price * v_quantity
        );
    END LOOP;

    RETURN jsonb_build_object(
        'order_id', v_order_id,
        'order_number', v_order_number,
        'total', v_total,
        'status', 'pending'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

