-- =============================================
-- LINKED ALL v1 - COMPLETE DATABASE SETUP
-- =============================================
-- This file contains ALL migrations combined
-- Apply this single file via Supabase Dashboard SQL Editor
-- =============================================
-- Migration 1: Initial Schema
-- Migration 2: Complete Schema (Functions, Triggers, RLS)
-- Migration 3: Payment Functions
-- =============================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =============================================
-- CUSTOM TYPES
-- =============================================

DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('consumer', 'vendor', 'delivery_partner', 'admin', 'super_admin');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE user_status AS ENUM ('active', 'inactive', 'suspended', 'deleted');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE kyc_status AS ENUM ('pending', 'verified', 'rejected');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE vendor_type AS ENUM ('individual', 'small_business', 'enterprise', 'farmer');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE vendor_tier AS ENUM ('starter', 'growth', 'enterprise');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE product_condition AS ENUM ('new', 'refurbished', 'used_like_new', 'used_good', 'used_acceptable');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE order_status AS ENUM ('pending', 'confirmed', 'processing', 'ready_for_pickup', 'out_for_delivery', 'delivered', 'cancelled', 'refunded', 'failed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE payment_status AS ENUM ('pending', 'processing', 'completed', 'failed', 'cancelled', 'refunded');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE payment_method AS ENUM ('card', 'mobile_money', 'bank_transfer', 'cash_on_delivery', 'wallet', 'linked_coin');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE shipment_status AS ENUM ('pending', 'picked_up', 'in_transit', 'out_for_delivery', 'delivered', 'failed_delivery', 'returned', 'cancelled');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE transaction_type AS ENUM ('purchase', 'refund', 'payout', 'deposit', 'withdrawal', 'reward', 'transfer', 'fee');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- =============================================
-- USERS AND AUTHENTICATION
-- =============================================

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    phone_number TEXT UNIQUE,
    role user_role NOT NULL DEFAULT 'consumer',
    status user_status NOT NULL DEFAULT 'active',
    first_name TEXT,
    last_name TEXT,
    avatar_url TEXT,
    date_of_birth DATE,
    gender TEXT,
    language TEXT DEFAULT 'en',
    currency TEXT DEFAULT 'NGN',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_login_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS user_addresses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    street TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    country TEXT NOT NULL,
    postal_code TEXT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS kyc_data (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status kyc_status NOT NULL DEFAULT 'pending',
    document_type TEXT NOT NULL,
    document_number TEXT NOT NULL,
    document_images TEXT[],
    verified_at TIMESTAMPTZ,
    rejection_reason TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================
-- VENDORS
-- =============================================

CREATE TABLE IF NOT EXISTS vendors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    business_name TEXT NOT NULL,
    type vendor_type NOT NULL,
    tier vendor_tier NOT NULL DEFAULT 'starter',
    status user_status NOT NULL DEFAULT 'active',
    verification_status kyc_status NOT NULL DEFAULT 'pending',
    logo_url TEXT,
    banner_url TEXT,
    description TEXT,
    categories TEXT[],
    contact_email TEXT NOT NULL,
    contact_phone TEXT NOT NULL,
    business_registration_number TEXT,
    tax_id TEXT,
    total_orders INTEGER DEFAULT 0,
    total_revenue DECIMAL(15, 2) DEFAULT 0,
    average_rating DECIMAL(3, 2) DEFAULT 0,
    total_reviews INTEGER DEFAULT 0,
    fulfillment_rate DECIMAL(5, 2) DEFAULT 0,
    response_time INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS vendor_bank_accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vendor_id UUID NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
    account_name TEXT NOT NULL,
    account_number TEXT NOT NULL,
    bank_name TEXT NOT NULL,
    bank_code TEXT NOT NULL,
    is_primary BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================
-- PRODUCTS
-- =============================================

CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vendor_id UUID NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    sub_category TEXT,
    condition product_condition NOT NULL DEFAULT 'new',
    status user_status NOT NULL DEFAULT 'active',
    sku TEXT NOT NULL UNIQUE,
    barcode TEXT,
    base_price DECIMAL(15, 2) NOT NULL,
    compare_at_price DECIMAL(15, 2),
    currency TEXT NOT NULL DEFAULT 'NGN',
    track_inventory BOOLEAN DEFAULT TRUE,
    quantity INTEGER DEFAULT 0,
    low_stock_threshold INTEGER DEFAULT 10,
    allow_backorder BOOLEAN DEFAULT FALSE,
    weight DECIMAL(10, 2),
    images TEXT[],
    thumbnails TEXT[],
    primary_image_index INTEGER DEFAULT 0,
    slug TEXT NOT NULL UNIQUE,
    meta_title TEXT,
    meta_description TEXT,
    keywords TEXT[],
    specifications JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS product_variants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    options JSONB NOT NULL,
    sku TEXT NOT NULL UNIQUE,
    price DECIMAL(15, 2) NOT NULL,
    quantity INTEGER DEFAULT 0,
    image_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS product_reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    order_id UUID NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title TEXT NOT NULL,
    comment TEXT NOT NULL,
    images TEXT[],
    verified BOOLEAN DEFAULT FALSE,
    helpful_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================
-- ORDERS
-- =============================================

CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number TEXT NOT NULL UNIQUE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    vendor_id UUID NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
    status order_status NOT NULL DEFAULT 'pending',
    subtotal DECIMAL(15, 2) NOT NULL,
    tax DECIMAL(15, 2) DEFAULT 0,
    shipping_fee DECIMAL(15, 2) DEFAULT 0,
    discount DECIMAL(15, 2) DEFAULT 0,
    linked_coin_discount DECIMAL(15, 2) DEFAULT 0,
    total DECIMAL(15, 2) NOT NULL,
    currency TEXT NOT NULL DEFAULT 'NGN',
    shipping_address JSONB,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    confirmed_at TIMESTAMPTZ,
    processing_at TIMESTAMPTZ,
    shipped_at TIMESTAMPTZ,
    delivered_at TIMESTAMPTZ,
    cancelled_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id),
    variant_id UUID REFERENCES product_variants(id),
    name TEXT NOT NULL,
    sku TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(15, 2) NOT NULL,
    total_price DECIMAL(15, 2) NOT NULL,
    thumbnail_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================
-- PAYMENTS AND WALLET
-- =============================================

CREATE TABLE IF NOT EXISTS wallets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE UNIQUE,
    fiat_balance DECIMAL(15, 2) DEFAULT 0,
    linked_coin_balance DECIMAL(15, 2) DEFAULT 0,
    currency TEXT NOT NULL DEFAULT 'NGN',
    status user_status NOT NULL DEFAULT 'active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    wallet_id UUID NOT NULL REFERENCES wallets(id) ON DELETE CASCADE,
    type transaction_type NOT NULL,
    amount DECIMAL(15, 2) NOT NULL,
    currency TEXT NOT NULL DEFAULT 'NGN',
    balance_before DECIMAL(15, 2) NOT NULL,
    balance_after DECIMAL(15, 2) NOT NULL,
    reference TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    metadata JSONB,
    status payment_status NOT NULL DEFAULT 'pending',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    amount DECIMAL(15, 2) NOT NULL,
    currency TEXT NOT NULL DEFAULT 'NGN',
    method payment_method NOT NULL,
    provider TEXT NOT NULL,
    status payment_status NOT NULL DEFAULT 'pending',
    provider_transaction_id TEXT,
    failure_reason TEXT,
    metadata JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    completed_at TIMESTAMPTZ
);

-- =============================================
-- LOGISTICS AND SHIPPING
-- =============================================

CREATE TABLE IF NOT EXISTS shipments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    tracking_number TEXT NOT NULL UNIQUE,
    carrier_id UUID,
    status shipment_status NOT NULL DEFAULT 'pending',
    origin JSONB NOT NULL,
    destination JSONB NOT NULL,
    pickup_date TIMESTAMPTZ,
    estimated_delivery_date TIMESTAMPTZ NOT NULL,
    actual_delivery_date TIMESTAMPTZ,
    weight DECIMAL(10, 2),
    dimensions JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS shipment_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    shipment_id UUID NOT NULL REFERENCES shipments(id) ON DELETE CASCADE,
    status shipment_status NOT NULL,
    description TEXT NOT NULL,
    location JSONB,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    metadata JSONB
);

-- =============================================
-- REWARDS AND REFERRALS
-- =============================================

CREATE TABLE IF NOT EXISTS referrals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    referrer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    referee_id UUID REFERENCES users(id) ON DELETE SET NULL,
    code TEXT NOT NULL UNIQUE,
    status TEXT NOT NULL DEFAULT 'pending',
    reward_amount DECIMAL(15, 2) NOT NULL,
    signups INTEGER DEFAULT 0,
    purchases INTEGER DEFAULT 0,
    total_value DECIMAL(15, 2) DEFAULT 0,
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================
-- INDEXES FOR PERFORMANCE
-- =============================================

-- Users
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone_number);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_status ON users(status);

-- Vendors
CREATE INDEX IF NOT EXISTS idx_vendors_user_id ON vendors(user_id);
CREATE INDEX IF NOT EXISTS idx_vendors_status ON vendors(status);
CREATE INDEX IF NOT EXISTS idx_vendors_verification_status ON vendors(verification_status);

-- Products
CREATE INDEX IF NOT EXISTS idx_products_vendor_id ON products(vendor_id);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_sku ON products(sku);

-- Orders
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_vendor_id ON orders(vendor_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON orders(order_number);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);

-- Payments
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_order_id ON payments(order_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);

-- Shipments
CREATE INDEX IF NOT EXISTS idx_shipments_order_id ON shipments(order_id);
CREATE INDEX IF NOT EXISTS idx_shipments_tracking_number ON shipments(tracking_number);
CREATE INDEX IF NOT EXISTS idx_shipments_status ON shipments(status);

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
-- SEQUENCES
-- =============================================

CREATE SEQUENCE IF NOT EXISTS order_number_seq START 1;

-- =============================================
-- FUNCTIONS
-- =============================================

-- Update timestamp function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Generate order number
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TEXT AS $$
DECLARE
    new_order_number TEXT;
BEGIN
    new_order_number := 'ORD-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(NEXTVAL('order_number_seq')::TEXT, 6, '0');
    RETURN new_order_number;
END;
$$ LANGUAGE plpgsql;

-- Generate tracking number
CREATE OR REPLACE FUNCTION generate_tracking_number()
RETURNS TEXT AS $$
DECLARE
    new_tracking_number TEXT;
BEGIN
    new_tracking_number := 'TRK-' || UPPER(SUBSTRING(MD5(RANDOM()::TEXT || NOW()::TEXT) FROM 1 FOR 12));
    RETURN new_tracking_number;
END;
$$ LANGUAGE plpgsql;

-- Generate referral code
CREATE OR REPLACE FUNCTION generate_referral_code()
RETURNS TEXT AS $$
DECLARE
    new_code TEXT;
BEGIN
    new_code := UPPER(SUBSTRING(MD5(RANDOM()::TEXT || NOW()::TEXT) FROM 1 FOR 8));
    RETURN new_code;
END;
$$ LANGUAGE plpgsql;

-- Create wallet for user
CREATE OR REPLACE FUNCTION create_wallet_for_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO wallets (user_id, fiat_balance, linked_coin_balance, currency)
    VALUES (NEW.id, 0, 0, COALESCE(NEW.currency, 'NGN'))
    ON CONFLICT (user_id) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update vendor stats
CREATE OR REPLACE FUNCTION update_vendor_stats()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'delivered' AND (OLD.status IS NULL OR OLD.status != 'delivered') THEN
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

-- Update product rating
CREATE OR REPLACE FUNCTION update_product_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE products
    SET updated_at = NOW()
    WHERE id = NEW.product_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Check inventory
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

-- Update inventory
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

-- Process payment
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
    SELECT id, fiat_balance INTO v_wallet_id, v_balance
    FROM wallets
    WHERE user_id = p_user_id;

    IF v_wallet_id IS NULL THEN
        RAISE EXCEPTION 'Wallet not found for user';
    END IF;

    v_reference := 'PAY-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 12));

    INSERT INTO payments (
        order_id, user_id, amount, currency, method, provider, status, provider_transaction_id
    ) VALUES (
        p_order_id, p_user_id, p_amount, 'NGN', p_method, p_provider, 'processing', v_reference
    ) RETURNING id INTO v_payment_id;

    IF p_method = 'wallet' OR p_method = 'linked_coin' THEN
        IF v_balance < p_amount THEN
            UPDATE payments SET status = 'failed', failure_reason = 'Insufficient balance' WHERE id = v_payment_id;
            RAISE EXCEPTION 'Insufficient balance';
        END IF;

        UPDATE wallets
        SET fiat_balance = fiat_balance - p_amount, updated_at = NOW()
        WHERE id = v_wallet_id;

        INSERT INTO transactions (
            wallet_id, type, amount, currency, balance_before, balance_after, reference, description, status
        ) VALUES (
            v_wallet_id, 'purchase', -p_amount, 'NGN', v_balance, v_balance - p_amount, v_reference, 'Payment for order', 'completed'
        ) RETURNING id INTO v_transaction_id;

        UPDATE payments SET status = 'completed', completed_at = NOW() WHERE id = v_payment_id;
    ELSE
        UPDATE payments SET status = 'pending' WHERE id = v_payment_id;
    END IF;

    RETURN jsonb_build_object(
        'payment_id', v_payment_id,
        'transaction_id', v_transaction_id,
        'status', 'completed',
        'reference', v_reference
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create order with items
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
    v_product_name TEXT;
    v_product_sku TEXT;
BEGIN
    v_order_number := generate_order_number();

    FOR v_item IN SELECT * FROM jsonb_array_elements(p_items)
    LOOP
        v_product_id := (v_item->>'product_id')::UUID;
        v_quantity := (v_item->>'quantity')::INTEGER;
        
        SELECT base_price, name, sku INTO v_unit_price, v_product_name, v_product_sku
        FROM products
        WHERE id = v_product_id;

        IF v_unit_price IS NULL THEN
            RAISE EXCEPTION 'Product not found: %', v_product_id;
        END IF;

        v_item_total := v_unit_price * v_quantity;
        v_subtotal := v_subtotal + v_item_total;
    END LOOP;

    v_total := v_subtotal;

    INSERT INTO orders (
        order_number, user_id, vendor_id, status, subtotal, total, currency, shipping_address, notes
    ) VALUES (
        v_order_number, p_user_id, p_vendor_id, 'pending', v_subtotal, v_total, 'NGN', p_shipping_address, p_notes
    ) RETURNING id INTO v_order_id;

    FOR v_item IN SELECT * FROM jsonb_array_elements(p_items)
    LOOP
        v_product_id := (v_item->>'product_id')::UUID;
        v_quantity := (v_item->>'quantity')::INTEGER;
        
        SELECT base_price, name, sku INTO v_unit_price, v_product_name, v_product_sku
        FROM products
        WHERE id = v_product_id;

        INSERT INTO order_items (
            order_id, product_id, name, sku, quantity, unit_price, total_price
        ) VALUES (
            v_order_id, v_product_id, v_product_name, v_product_sku, v_quantity, v_unit_price, v_unit_price * v_quantity
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

-- =============================================
-- TRIGGERS
-- =============================================

-- Update timestamps
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_vendors_updated_at ON vendors;
CREATE TRIGGER update_vendors_updated_at BEFORE UPDATE ON vendors FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_products_updated_at ON products;
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_orders_updated_at ON orders;
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_wallets_updated_at ON wallets;
CREATE TRIGGER update_wallets_updated_at BEFORE UPDATE ON wallets FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create wallet for user
DROP TRIGGER IF EXISTS trigger_create_wallet_for_user ON users;
CREATE TRIGGER trigger_create_wallet_for_user
    AFTER INSERT ON users
    FOR EACH ROW
    EXECUTE FUNCTION create_wallet_for_user();

-- Update vendor stats
DROP TRIGGER IF EXISTS trigger_update_vendor_stats ON orders;
CREATE TRIGGER trigger_update_vendor_stats
    AFTER UPDATE ON orders
    FOR EACH ROW
    WHEN (NEW.status = 'delivered' AND (OLD.status IS NULL OR OLD.status != 'delivered'))
    EXECUTE FUNCTION update_vendor_stats();

-- Update product rating
DROP TRIGGER IF EXISTS trigger_update_product_rating ON product_reviews;
CREATE TRIGGER trigger_update_product_rating
    AFTER INSERT ON product_reviews
    FOR EACH ROW
    EXECUTE FUNCTION update_product_rating();

-- Check inventory
DROP TRIGGER IF EXISTS trigger_check_inventory ON order_items;
CREATE TRIGGER trigger_check_inventory
    BEFORE INSERT ON order_items
    FOR EACH ROW
    EXECUTE FUNCTION check_inventory();

-- Update inventory
DROP TRIGGER IF EXISTS trigger_update_inventory ON order_items;
CREATE TRIGGER trigger_update_inventory
    AFTER INSERT ON order_items
    FOR EACH ROW
    EXECUTE FUNCTION update_inventory();

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE kyc_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_bank_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE shipments ENABLE ROW LEVEL SECURITY;
ALTER TABLE shipment_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Users can view own data" ON users;
DROP POLICY IF EXISTS "Users can update own data" ON users;
DROP POLICY IF EXISTS "Users can view own profile" ON users;
DROP POLICY IF EXISTS "Users can update own profile" ON users;
DROP POLICY IF EXISTS "Users can insert own profile" ON users;

-- Users table policies
CREATE POLICY "Users can view own profile" 
    ON users FOR SELECT 
    USING (auth.uid() = id OR (auth.jwt() ->> 'role')::text = 'admin');

CREATE POLICY "Users can update own profile" 
    ON users FOR UPDATE 
    USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" 
    ON users FOR INSERT 
    WITH CHECK (auth.uid() = id);

-- User addresses policies
DROP POLICY IF EXISTS "Users can view own addresses" ON user_addresses;
DROP POLICY IF EXISTS "Users can manage own addresses" ON user_addresses;
CREATE POLICY "Users can view own addresses" 
    ON user_addresses FOR SELECT 
    USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own addresses" 
    ON user_addresses FOR ALL 
    USING (auth.uid() = user_id);

-- KYC data policies
DROP POLICY IF EXISTS "Users can view own KYC data" ON kyc_data;
DROP POLICY IF EXISTS "Users can insert own KYC data" ON kyc_data;
CREATE POLICY "Users can view own KYC data" 
    ON kyc_data FOR SELECT 
    USING (auth.uid() = user_id OR (auth.jwt() ->> 'role')::text = 'admin');
CREATE POLICY "Users can insert own KYC data" 
    ON kyc_data FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

-- Vendors policies
DROP POLICY IF EXISTS "Anyone can view active vendors" ON vendors;
DROP POLICY IF EXISTS "Vendors can view own vendor profile" ON vendors;
DROP POLICY IF EXISTS "Vendors can update own vendor profile" ON vendors;
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
DROP POLICY IF EXISTS "Anyone can view active products" ON products;
DROP POLICY IF EXISTS "Vendors can manage own products" ON products;
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
DROP POLICY IF EXISTS "Users can view own orders" ON orders;
DROP POLICY IF EXISTS "Users can create own orders" ON orders;
DROP POLICY IF EXISTS "Vendors can view their vendor orders" ON orders;
DROP POLICY IF EXISTS "Vendors can update their vendor orders" ON orders;
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
DROP POLICY IF EXISTS "Users can view own order items" ON order_items;
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
DROP POLICY IF EXISTS "Users can view own wallet" ON wallets;
DROP POLICY IF EXISTS "Users can update own wallet" ON wallets;
CREATE POLICY "Users can view own wallet" 
    ON wallets FOR SELECT 
    USING (auth.uid() = user_id);
CREATE POLICY "Users can update own wallet" 
    ON wallets FOR UPDATE 
    USING (auth.uid() = user_id);

-- Transactions policies
DROP POLICY IF EXISTS "Users can view own transactions" ON transactions;
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
DROP POLICY IF EXISTS "Users can view own payments" ON payments;
DROP POLICY IF EXISTS "Users can create own payments" ON payments;
CREATE POLICY "Users can view own payments" 
    ON payments FOR SELECT 
    USING (auth.uid() = user_id);
CREATE POLICY "Users can create own payments" 
    ON payments FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

-- Shipments policies
DROP POLICY IF EXISTS "Users can view own shipments" ON shipments;
DROP POLICY IF EXISTS "Vendors can view their shipments" ON shipments;
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
DROP POLICY IF EXISTS "Anyone can view product reviews" ON product_reviews;
DROP POLICY IF EXISTS "Users can create own reviews" ON product_reviews;
CREATE POLICY "Anyone can view product reviews" 
    ON product_reviews FOR SELECT 
    USING (true);
CREATE POLICY "Users can create own reviews" 
    ON product_reviews FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

-- Referrals policies
DROP POLICY IF EXISTS "Users can view own referrals" ON referrals;
DROP POLICY IF EXISTS "Users can create own referrals" ON referrals;
CREATE POLICY "Users can view own referrals" 
    ON referrals FOR SELECT 
    USING (auth.uid() = referrer_id OR auth.uid() = referee_id);
CREATE POLICY "Users can create own referrals" 
    ON referrals FOR INSERT 
    WITH CHECK (auth.uid() = referrer_id);

-- =============================================
-- VIEWS
-- =============================================

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

-- Grant necessary permissions
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'authenticated') THEN
        GRANT USAGE ON SCHEMA public TO authenticated;
        GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
        GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
        GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO authenticated;
    END IF;
    
    IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'service_role') THEN
        GRANT USAGE ON SCHEMA public TO service_role;
        GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
        GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;
        GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO service_role;
    END IF;
END $$;

-- =============================================
-- COMPLETE!
-- =============================================

SELECT '✅ Linked All database setup complete! All tables, functions, triggers, and RLS policies have been created.' as status;

