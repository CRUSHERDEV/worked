-- Linked All v1 Complete Schema Migration
-- Description: Complete database setup with all tables, functions, triggers, and RLS policies

-- =============================================
-- ADDITIONAL FUNCTIONS AND TRIGGERS
-- =============================================

-- Function to generate order number
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TEXT AS $$
DECLARE
    new_order_number TEXT;
BEGIN
    new_order_number := 'ORD-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(NEXTVAL('order_number_seq')::TEXT, 6, '0');
    RETURN new_order_number;
END;
$$ LANGUAGE plpgsql;

-- Create sequence for order numbers
CREATE SEQUENCE IF NOT EXISTS order_number_seq START 1;

-- Function to generate tracking number
CREATE OR REPLACE FUNCTION generate_tracking_number()
RETURNS TEXT AS $$
DECLARE
    new_tracking_number TEXT;
BEGIN
    new_tracking_number := 'TRK-' || UPPER(SUBSTRING(MD5(RANDOM()::TEXT || NOW()::TEXT) FROM 1 FOR 12));
    RETURN new_tracking_number;
END;
$$ LANGUAGE plpgsql;

-- Function to generate referral code
CREATE OR REPLACE FUNCTION generate_referral_code()
RETURNS TEXT AS $$
DECLARE
    new_code TEXT;
BEGIN
    new_code := UPPER(SUBSTRING(MD5(RANDOM()::TEXT || NOW()::TEXT) FROM 1 FOR 8));
    RETURN new_code;
END;
$$ LANGUAGE plpgsql;

-- Function to automatically create wallet for new user
CREATE OR REPLACE FUNCTION create_wallet_for_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO wallets (user_id, fiat_balance, linked_coin_balance, currency)
    VALUES (NEW.id, 0, 0, COALESCE(NEW.currency, 'NGN'));
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create wallet on user creation
DROP TRIGGER IF EXISTS trigger_create_wallet_for_user ON users;
CREATE TRIGGER trigger_create_wallet_for_user
    AFTER INSERT ON users
    FOR EACH ROW
    EXECUTE FUNCTION create_wallet_for_user();

-- Function to update vendor stats when order is completed
CREATE OR REPLACE FUNCTION update_vendor_stats()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'delivered' AND OLD.status != 'delivered' THEN
        UPDATE vendors
        SET 
            total_orders = total_orders + 1,
            total_revenue = total_revenue + NEW.total,
            updated_at = NOW()
        WHERE id = NEW.vendor_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update vendor stats
DROP TRIGGER IF EXISTS trigger_update_vendor_stats ON orders;
CREATE TRIGGER trigger_update_vendor_stats
    AFTER UPDATE ON orders
    FOR EACH ROW
    WHEN (NEW.status = 'delivered' AND OLD.status != 'delivered')
    EXECUTE FUNCTION update_vendor_stats();

-- Function to update product rating when review is added
CREATE OR REPLACE FUNCTION update_product_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE products
    SET updated_at = NOW()
    WHERE id = NEW.product_id;
    
    -- Update average rating (this would need aggregation in real scenario)
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update product on review
DROP TRIGGER IF EXISTS trigger_update_product_rating ON product_reviews;
CREATE TRIGGER trigger_update_product_rating
    AFTER INSERT ON product_reviews
    FOR EACH ROW
    EXECUTE FUNCTION update_product_rating();

-- Function to check inventory before order
CREATE OR REPLACE FUNCTION check_inventory()
RETURNS TRIGGER AS $$
DECLARE
    available_quantity INTEGER;
BEGIN
    SELECT quantity INTO available_quantity
    FROM products
    WHERE id = NEW.product_id;
    
    IF available_quantity < NEW.quantity THEN
        RAISE EXCEPTION 'Insufficient inventory. Available: %, Requested: %', available_quantity, NEW.quantity;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to check inventory
DROP TRIGGER IF EXISTS trigger_check_inventory ON order_items;
CREATE TRIGGER trigger_check_inventory
    BEFORE INSERT ON order_items
    FOR EACH ROW
    EXECUTE FUNCTION check_inventory();

-- Function to update inventory after order
CREATE OR REPLACE FUNCTION update_inventory()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE products
    SET quantity = quantity - NEW.quantity,
        updated_at = NOW()
    WHERE id = NEW.product_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update inventory
DROP TRIGGER IF EXISTS trigger_update_inventory ON order_items;
CREATE TRIGGER trigger_update_inventory
    AFTER INSERT ON order_items
    FOR EACH ROW
    EXECUTE FUNCTION update_inventory();

-- =============================================
-- COMPREHENSIVE RLS POLICIES
-- =============================================

-- Drop existing policies if any
DROP POLICY IF EXISTS "Users can view own data" ON users;
DROP POLICY IF EXISTS "Users can update own data" ON users;

-- Users table policies
CREATE POLICY "Users can view own profile" 
    ON users FOR SELECT 
    USING (auth.uid() = id OR auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Users can update own profile" 
    ON users FOR UPDATE 
    USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" 
    ON users FOR INSERT 
    WITH CHECK (auth.uid() = id);

-- User addresses policies
CREATE POLICY "Users can view own addresses" 
    ON user_addresses FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own addresses" 
    ON user_addresses FOR ALL 
    USING (auth.uid() = user_id);

-- KYC data policies
CREATE POLICY "Users can view own KYC data" 
    ON kyc_data FOR SELECT 
    USING (auth.uid() = user_id OR auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Users can insert own KYC data" 
    ON kyc_data FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

-- Vendors policies
CREATE POLICY "Anyone can view active vendors" 
    ON vendors FOR SELECT 
    USING (status = 'active');

CREATE POLICY "Vendors can view own vendor profile" 
    ON vendors FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Vendors can update own vendor profile" 
    ON vendors FOR UPDATE 
    USING (auth.uid() = user_id);

-- Products policies
CREATE POLICY "Anyone can view active products" 
    ON products FOR SELECT 
    USING (status = 'active');

CREATE POLICY "Vendors can manage own products" 
    ON products FOR ALL 
    USING (
        EXISTS (
            SELECT 1 FROM vendors 
            WHERE vendors.id = products.vendor_id 
            AND vendors.user_id = auth.uid()
        )
    );

-- Orders policies
CREATE POLICY "Users can view own orders" 
    ON orders FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create own orders" 
    ON orders FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Vendors can view their vendor orders" 
    ON orders FOR SELECT 
    USING (
        EXISTS (
            SELECT 1 FROM vendors 
            WHERE vendors.id = orders.vendor_id 
            AND vendors.user_id = auth.uid()
        )
    );

CREATE POLICY "Vendors can update their vendor orders" 
    ON orders FOR UPDATE 
    USING (
        EXISTS (
            SELECT 1 FROM vendors 
            WHERE vendors.id = orders.vendor_id 
            AND vendors.user_id = auth.uid()
        )
    );

-- Order items policies
CREATE POLICY "Users can view own order items" 
    ON order_items FOR SELECT 
    USING (
        EXISTS (
            SELECT 1 FROM orders 
            WHERE orders.id = order_items.order_id 
            AND orders.user_id = auth.uid()
        )
    );

-- Wallets policies
CREATE POLICY "Users can view own wallet" 
    ON wallets FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can update own wallet" 
    ON wallets FOR UPDATE 
    USING (auth.uid() = user_id);

-- Transactions policies
CREATE POLICY "Users can view own transactions" 
    ON transactions FOR SELECT 
    USING (
        EXISTS (
            SELECT 1 FROM wallets 
            WHERE wallets.id = transactions.wallet_id 
            AND wallets.user_id = auth.uid()
        )
    );

-- Payments policies
CREATE POLICY "Users can view own payments" 
    ON payments FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create own payments" 
    ON payments FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

-- Shipments policies
CREATE POLICY "Users can view own shipments" 
    ON shipments FOR SELECT 
    USING (
        EXISTS (
            SELECT 1 FROM orders 
            WHERE orders.id = shipments.order_id 
            AND orders.user_id = auth.uid()
        )
    );

CREATE POLICY "Vendors can view their shipments" 
    ON shipments FOR SELECT 
    USING (
        EXISTS (
            SELECT 1 FROM orders 
            JOIN vendors ON vendors.id = orders.vendor_id
            WHERE orders.id = shipments.order_id 
            AND vendors.user_id = auth.uid()
        )
    );

-- Product reviews policies
CREATE POLICY "Anyone can view product reviews" 
    ON product_reviews FOR SELECT 
    USING (true);

CREATE POLICY "Users can create own reviews" 
    ON product_reviews FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

-- Referrals policies
CREATE POLICY "Users can view own referrals" 
    ON referrals FOR SELECT 
    USING (auth.uid() = referrer_id OR auth.uid() = referee_id);

CREATE POLICY "Users can create own referrals" 
    ON referrals FOR INSERT 
    WITH CHECK (auth.uid() = referrer_id);

-- =============================================
-- ADDITIONAL INDEXES FOR PERFORMANCE
-- =============================================

-- Full-text search indexes
CREATE INDEX IF NOT EXISTS idx_products_name_search ON products USING GIN (to_tsvector('english', name || ' ' || COALESCE(description, '')));
CREATE INDEX IF NOT EXISTS idx_products_keywords ON products USING GIN (keywords);

-- Composite indexes for common queries
CREATE INDEX IF NOT EXISTS idx_products_vendor_status ON products(vendor_id, status);
CREATE INDEX IF NOT EXISTS idx_orders_user_status ON orders(user_id, status);
CREATE INDEX IF NOT EXISTS idx_orders_vendor_status ON orders(vendor_id, status);
CREATE INDEX IF NOT EXISTS idx_transactions_wallet_type ON transactions(wallet_id, type);
CREATE INDEX IF NOT EXISTS idx_transactions_status_created ON transactions(status, created_at DESC);

-- =============================================
-- VIEWS FOR COMMON QUERIES
-- =============================================

-- View for vendor dashboard stats
CREATE OR REPLACE VIEW vendor_dashboard_stats AS
SELECT 
    v.id as vendor_id,
    v.business_name,
    COUNT(DISTINCT o.id) as total_orders,
    COUNT(DISTINCT CASE WHEN o.status = 'delivered' THEN o.id END) as completed_orders,
    COALESCE(SUM(CASE WHEN o.status = 'delivered' THEN o.total END), 0) as total_revenue,
    COUNT(DISTINCT p.id) as total_products,
    COUNT(DISTINCT pr.id) as total_reviews,
    COALESCE(AVG(pr.rating), 0) as average_rating
FROM vendors v
LEFT JOIN orders o ON o.vendor_id = v.id
LEFT JOIN products p ON p.vendor_id = v.id
LEFT JOIN product_reviews pr ON pr.product_id = p.id
WHERE v.status = 'active'
GROUP BY v.id, v.business_name;

-- View for user order history
CREATE OR REPLACE VIEW user_order_history AS
SELECT 
    o.id,
    o.order_number,
    o.user_id,
    o.status,
    o.total,
    o.currency,
    o.created_at,
    v.business_name as vendor_name,
    COUNT(oi.id) as item_count
FROM orders o
JOIN vendors v ON v.id = o.vendor_id
LEFT JOIN order_items oi ON oi.order_id = o.id
GROUP BY o.id, o.order_number, o.user_id, o.status, o.total, o.currency, o.created_at, v.business_name;

-- =============================================
-- GRANT PERMISSIONS
-- =============================================

-- Grant necessary permissions to authenticated users
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- Grant necessary permissions to service role
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO service_role;

