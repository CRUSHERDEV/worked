# Apply Database Migrations

Since Supabase CLI global install isn't working, here are two ways to apply the database schema:

## Option 1: Using Supabase Dashboard (Easiest)

1. Go to https://supabase.com/dashboard/project/giqrkglcjstwvhbslpiu
2. Click on **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy the entire contents of `supabase/migrations/20240101000001_initial_schema.sql`
5. Paste it into the SQL editor
6. Click **Run** (or press Ctrl+Enter)
7. Wait for it to complete - you should see "Success. No rows returned"

## Option 2: Using npx (Command Line)

Since global install doesn't work, we can use npx:

```bash
# Link the project
npx supabase link --project-ref giqrkglcjstwvhbslpiu

# Push migrations
npx supabase db push
```

## After Applying Migrations

Verify the tables were created:
1. Go to Supabase Dashboard → **Table Editor**
2. You should see tables like: users, vendors, products, orders, etc.
