# 🎨 Design System Integration Guide

## Brand Guidelines (From Design System Guide)

### Colors
- **Primary**: `#0066FF` - Blue (Main brand color)
- **Secondary**: `#FFD600` - Yellow (Secondary brand color)
- **Dark**: `#0A00A0` - Dark blue (Text and dark elements)
- **Accent**: `#00C2A8` - Teal (Optional accent color)

### Typography
- **Display/Headings**: Poppins SemiBold (600)
- **Body Text**: Inter Regular (400)
- **Monospace/Code**: JetBrains Mono

### UI Elements
- **Buttons**: 
  - Primary: Blue background (#0066FF), white text
  - Secondary: White background, dark border, dark text
- **Inputs**: Rounded corners, light gray border
- **Cards**: White background, light gray border, rounded corners

## ✅ Updates Applied

### Mobile App (`apps/mobile/`)
- ✅ Updated primary color to #0066FF
- ✅ Updated secondary color to #FFD600
- ✅ Updated dark color to #0A00A0
- ✅ Added JetBrains Mono font
- ✅ Updated Poppins SemiBold usage
- ✅ Updated Inter Regular usage

### Web App (`apps/web/`)
- ✅ Updated primary color to #0066FF
- ✅ Updated secondary color to #FFD600
- ✅ Updated dark color to #0A00A0
- ✅ Added JetBrains Mono font
- ✅ Updated typography (Poppins for headings, Inter for body)
- ✅ Updated global styles

### Shared Config (`packages/config/`)
- ✅ Updated theme colors to match design system
- ✅ Updated typography configuration
- ✅ Added design tokens

## 📋 Next Steps

### 1. Upload Assets
Place your assets in the correct folders:

**Logos:**
- `apps/mobile/assets/branding/logo/logo-primary.svg`
- `apps/mobile/assets/branding/logo/logo-icon.svg`
- `apps/mobile/assets/branding/logo/logo-dark.svg`
- `apps/mobile/assets/branding/logo/logo-light.svg`

**Illustrations:**
- Global Connection → `apps/mobile/assets/illustrations/onboarding/global-connection.svg`
- Security/Verification → `apps/mobile/assets/illustrations/onboarding/security-verification.svg`
- Delivery/Tracking → `apps/mobile/assets/illustrations/logistics/delivery-tracking.svg`
- E-commerce/Shopping → `apps/mobile/assets/illustrations/onboarding/ecommerce-shopping.svg`
- Search/Payment → `apps/mobile/assets/illustrations/payments/search-payment.svg`
- Success/Reward → `apps/mobile/assets/illustrations/success-failure/success-reward.svg`

### 2. Verify Integration
- [ ] Test colors in both web and mobile
- [ ] Verify typography rendering
- [ ] Test logo display
- [ ] Verify component styling

### 3. Start Frontend Development
- [ ] Product catalog
- [ ] Shopping cart
- [ ] Checkout flow
- [ ] User dashboard

## 🎯 Component Updates Needed

### Buttons
- Primary: Blue (#0066FF) background, white text
- Secondary: White background, dark (#0A00A0) border, dark text

### Inputs
- Rounded corners
- Light gray border
- Placeholder text styling

### Cards
- White background
- Light gray border
- Rounded corners
- Card title and description styling

## 📝 Files Updated

### Mobile App
- `apps/mobile/assets/themes/colors.ts` - Updated colors
- `apps/mobile/assets/themes/typography.ts` - Added JetBrains Mono

### Web App
- `apps/web/app/globals.css` - Updated colors and typography
- `apps/web/app/layout.tsx` - Added JetBrains Mono font

### Shared Config
- `packages/config/src/themes.ts` - Updated design tokens

---

**Design system is now aligned with your brand guidelines!** 🎨

Upload your assets and we'll integrate them next!

