# 📘 Illustration Guidelines

## Overview

All illustrations follow a **consistent flat + minimal style** (modern vector-based, similar to unDraw, OpenPeeps, or Streamline).

## Categories

### onboarding/
Intro & empty onboarding screens
- Welcome screens
- Feature introductions
- Onboarding flows
- Tutorial illustrations

### empty-states/
No data, offline, error screens
- Empty cart
- No orders
- No products
- Offline state
- Error states
- No search results

### payments/
Checkout, wallet, card success
- Payment methods
- Wallet illustrations
- Checkout process
- Payment success
- Payment failure

### logistics/
Delivery truck, map, order tracking
- Delivery tracking
- Shipping illustrations
- Map views
- Courier illustrations
- Package tracking

### success-failure/
Confirmation, error
- Success states
- Error states
- Confirmation screens
- Alert illustrations

### delivery/
Courier, parcels
- Delivery person
- Packages
- Delivery truck
- Parcel illustrations

### profile/
User avatars & settings
- User profile
- Settings illustrations
- Account management
- User avatars

### cart/
Shopping cart states
- Empty cart
- Cart with items
- Cart animations
- Cart icons

### checkout/
Order, payment illustrations
- Checkout process
- Order confirmation
- Payment processing
- Order summary

## Recommended Sources

- [unDraw](https://undraw.co) - Free SVG illustrations
- [Storyset](https://storyset.com) - Animated illustrations
- [Icons8](https://icons8.com/illustrations) - Professional illustrations
- [OpenPeeps](https://www.openpeeps.com/) - Hand-drawn illustrations
- [Streamline](https://www.streamlineicons.com/) - Icon illustrations

## Style Guidelines

1. **Consistent Color Palette**: Use Linked All brand colors
2. **Flat Design**: Minimal shadows, clean lines
3. **Modern Aesthetics**: Contemporary, friendly, approachable
4. **Scalable**: SVG format preferred for scalability
5. **Accessible**: High contrast, clear visuals

## File Naming Convention

- Use kebab-case: `empty-cart.svg`, `payment-success.svg`
- Be descriptive: `onboarding-welcome.svg`, `delivery-tracking.svg`
- Include category prefix if needed: `cart-empty-state.svg`

## Usage

```tsx
import EmptyCartIllustration from '@/assets/illustrations/empty-states/empty-cart.svg';

<EmptyCartIllustration width={200} height={200} />
```

## Notes

- All illustrations should be optimized for mobile
- Use consistent stroke width (2-3px)
- Maintain brand color consistency
- Test on both light and dark themes
- Ensure illustrations work at different sizes

