# 📱 Mobile Design System

## Overview

Complete design system for Linked All mobile app with themes, components, and assets.

## 🎨 Theme System

### Colors
Located in `assets/themes/colors.ts`
- Primary colors (Blue #0066FF)
- Secondary colors (Yellow #F5B800)
- Accent colors (Teal #00C2A8)
- Semantic colors (Success, Error, Warning, Info)
- Neutral grays
- Background and text colors

### Typography
Located in `assets/themes/typography.ts`
- Font families: Inter, Poppins, Urbanist, Outfit
- Font sizes: xs (12) to 6xl (60)
- Line heights and letter spacing
- Font weights

### Spacing
Located in `assets/themes/spacing.ts`
- Consistent spacing scale (4px base)
- Border radius values

### Shadows
Located in `assets/themes/shadows.ts`
- Elevation system for iOS and Android

## 🧩 Components

### Implemented Components
- ✅ **Button** - Primary, secondary, outline, ghost, danger variants
- ✅ **Input** - Text input with labels, errors, icons
- ✅ **ProductCard** - Product display card
- ✅ **Badge** - Status badges and labels
- ✅ **Card** - Generic card container
- ✅ **CategoryTag** - Category filter tags
- ✅ **Header** - App header/navigation
- ✅ **EmptyState** - Empty state screens
- ✅ **Loading** - Loading spinners
- ✅ **Toast** - Toast notifications
- ✅ **Modal** - Modal dialogs
- ✅ **Typography** - Text variants (h1-h4, body, caption)
- ✅ **Avatar** - User avatars
- ✅ **Chip** - Filter chips
- ✅ **Carousel** - Horizontal scrolling
- ✅ **Icon** - Icon wrapper
- ✅ **ThemeToggle** - Dark mode toggle
- ✅ **Footer** - App footer

## 📁 Asset Structure

```
assets/
├── icons/
│   ├── general/        # General purpose icons
│   ├── commerce/       # Shopping/commerce icons
│   ├── navigation/     # Navigation icons
│   ├── social/         # Social media icons
│   └── flags/          # Country flags
├── illustrations/
│   ├── onboarding/     # Onboarding screens
│   ├── empty-states/   # Empty state illustrations
│   ├── payments/       # Payment illustrations
│   ├── logistics/      # Delivery/logistics
│   ├── success-failure/# Success/error states
│   ├── delivery/       # Delivery illustrations
│   ├── profile/         # Profile illustrations
│   ├── cart/           # Shopping cart
│   └── checkout/       # Checkout process
├── images/
│   ├── products/        # Product images
│   ├── banners/        # Banner images
│   ├── placeholders/   # Placeholder images
│   ├── avatars/        # User avatars
│   └── backgrounds/    # Background images
├── fonts/
│   ├── Inter/          # Inter font family
│   ├── Poppins/        # Poppins font family
│   ├── Urbanist/       # Urbanist font family
│   └── Outfit/         # Outfit font family
├── lottie/
│   ├── loading/        # Loading animations
│   ├── success/        # Success animations
│   ├── error/          # Error animations
│   └── transitions/    # Transition animations
├── sounds/
│   ├── haptics/        # Haptic feedback sounds
│   └── notifications/  # Notification sounds
├── themes/             # Theme system (✅ Complete)
└── styles/             # Global styles (✅ Complete)
```

## 🚀 Usage

### Import Theme
```tsx
import { colors, typography, spacing, borderRadius } from "@/assets/themes";
```

### Use Components
```tsx
import { Button, Input, ProductCard } from "@/components";

<Button title="Click me" onPress={() => {}} variant="primary" />
<Input label="Email" placeholder="Enter email" />
<ProductCard id="1" name="Product" price={100} />
```

### Use Styles
```tsx
import { globalStyles, layoutStyles } from "@/assets/styles";

<View style={globalStyles.container}>
  <Text style={globalStyles.heading}>Title</Text>
</View>
```

## 📝 Next Steps

1. **Add Illustrations** - Add SVG illustrations to respective folders
2. **Add Icons** - Add icon sets (React Native Vector Icons recommended)
3. **Add Fonts** - Load custom fonts in app.json
4. **Add Lottie** - Integrate Lottie animations
5. **Add Sounds** - Integrate haptic feedback and sounds

## 🎯 Design Principles

1. **Consistency** - Use theme system for all styling
2. **Accessibility** - High contrast, readable fonts
3. **Performance** - Optimized images and assets
4. **Scalability** - Theme system supports easy updates
5. **Brand Identity** - Linked All colors and typography

---

**Design system is ready for use!** 🎨

