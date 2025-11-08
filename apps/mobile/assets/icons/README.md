# 🎨 Icons

## Overview

Icon assets for the Linked All mobile app.

## Categories

### general/
General purpose icons (home, settings, search, etc.)

### commerce/
Shopping and commerce icons (cart, bag, credit card, etc.)

### navigation/
Navigation icons (arrow, chevron, menu, etc.)

### social/
Social media icons (Facebook, Twitter, Instagram, etc.)

### flags/
Country flags for multi-country support

## Usage

Recommended: Use **React Native Vector Icons** library for icons.

### Installation

```bash
npm install react-native-vector-icons
# or
pnpm add react-native-vector-icons
```

### Recommended Icon Sets

- **Material Icons** - Comprehensive icon set
- **Ionicons** - Popular mobile icons
- **Feather** - Minimal, consistent icons
- **Font Awesome** - Extensive icon library

### Example Usage

```tsx
import Icon from 'react-native-vector-icons/MaterialIcons';

<Icon name="home" size={24} color="#0066FF" />
<Icon name="shopping-cart" size={24} color="#0066FF" />
```

## File Naming

- Use kebab-case: `shopping-cart.svg`
- Be descriptive: `user-profile-icon.svg`
- Include category if needed: `commerce-payment-icon.svg`

## Notes

- Use SVG format for custom icons
- Optimize icons for mobile (reduce file size)
- Ensure icons work at different sizes
- Test on both iOS and Android
- Maintain consistent stroke width (2-3px)

