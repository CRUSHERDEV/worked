# 🎨 UI Components Setup Guide

## Overview

Complete UI implementation with login, signup, navigation, and dashboard pages following a clean, classic design.

## ✅ What's Included

### Pages
- **Login Page** (`/login`) - Email/password authentication
- **Signup Page** (`/signup`) - User registration form
- **Dashboard** (`/dashboard`) - Main authenticated home page with stats and charts

### Components
- **AuthNavigation** - Navigation bar for authenticated users
- **Input** - Form input component with icon support
- **Button** - Reusable button component with variants
- **Header** - Updated to show dashboard link when authenticated

### Features
- ✅ Supabase authentication integration
- ✅ Protected routes (dashboard requires authentication)
- ✅ Responsive design (mobile & desktop)
- ✅ Smooth animations with Framer Motion
- ✅ Clean, classic UI design
- ✅ Form validation and error handling
- ✅ Loading states
- ✅ Profile menu with sign out

## 🚀 Setup

### 1. Environment Variables

Create or update `apps/web/.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://giqrkglcjstwvhbslpiu.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdpcXJrZ2xjanN0d3ZoYnNscGl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0OTUzODQsImV4cCI6MjA3ODA3MTM4NH0.hFmUK2jpm64soZPb8LCKUtXmh99wkXEHy1CriOYFeyA
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Run Development Server

```bash
cd apps/web
pnpm dev
```

The app will be available at `http://localhost:3000`

## 📱 Pages Overview

### Login Page (`/login`)
- Email and password input fields
- Form validation
- Error handling
- Link to signup page
- Forgot password link

### Signup Page (`/signup`)
- First name, last name, email, phone
- Password and confirm password
- Form validation
- Error handling
- Link to login page

### Dashboard (`/dashboard`)
- **Stats Cards**: Total orders, revenue, active products, customers
- **Charts**: Bar chart (recent activity) and line chart (revenue trend)
- **Recent Orders**: List of recent orders with status
- **Navigation**: Access to products, orders, wallet, settings
- **Profile Menu**: User profile, settings, sign out

## 🎨 Design System

### Colors
- **Primary**: Blue (#0066FF)
- **Secondary**: Yellow (#F5B800)
- **Accent**: Teal (#00C2A8)
- **Dark**: Dark gray (#0D0D0D)

### Typography
- **Font**: Inter, Poppins
- **Sizes**: Responsive scaling

### Components Style
- Rounded corners (xl: rounded-xl, rounded-2xl, rounded-3xl)
- Smooth transitions
- Shadow effects
- Hover states
- Focus states

## 🔐 Authentication Flow

1. User visits `/login` or `/signup`
2. After successful authentication, redirects to `/dashboard`
3. Dashboard layout checks authentication
4. If not authenticated, redirects to `/login`
5. Header shows "Dashboard" link when authenticated
6. AuthNavigation shows profile menu

## 📁 File Structure

```
apps/web/
├── app/
│   ├── login/
│   │   └── page.tsx          # Login page
│   ├── signup/
│   │   └── page.tsx          # Signup page
│   ├── dashboard/
│   │   ├── layout.tsx        # Protected layout
│   │   └── page.tsx          # Dashboard page
│   └── ...
├── components/
│   ├── forms/
│   │   ├── Input.tsx         # Input component
│   │   ├── Button.tsx        # Button component
│   │   └── index.ts
│   ├── navigation/
│   │   ├── Header.tsx        # Main header (updated)
│   │   └── AuthNavigation.tsx # Authenticated nav
│   └── ...
└── lib/
    └── supabase.ts           # Supabase client & auth functions
```

## 🧪 Testing

### Test Login Flow
1. Navigate to `/login`
2. Enter email and password
3. Click "Login"
4. Should redirect to `/dashboard`

### Test Signup Flow
1. Navigate to `/signup`
2. Fill in all fields
3. Click "Sign Up"
4. Should redirect to `/dashboard`

### Test Protected Routes
1. Try accessing `/dashboard` without logging in
2. Should redirect to `/login`
3. After login, should access `/dashboard`

## 🎯 Next Steps

- [ ] Add forgot password functionality
- [ ] Add email verification
- [ ] Add profile page
- [ ] Add settings page
- [ ] Connect dashboard to real data
- [ ] Add product listing page
- [ ] Add orders page
- [ ] Add wallet page

## 📝 Notes

- All forms include validation
- Error messages are displayed inline
- Loading states prevent double submissions
- Responsive design works on all screen sizes
- Animations enhance user experience
- Classic, clean design matches reference images

---

**Ready to use!** 🚀

