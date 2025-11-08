# 📸 Images

## Overview

Image assets for the Linked All mobile app.

## Categories

### products/
Product images
- High-quality product photos
- Multiple angles when possible
- Optimized for mobile (webp format recommended)
- Recommended size: 800x800px minimum

### banners/
Banner images
- Promotional banners
- Campaign images
- Hero images
- Recommended size: 1200x400px

### placeholders/
Placeholder images
- Default product images
- Avatar placeholders
- Empty state images
- Recommended size: 400x400px

### avatars/
User avatar images
- Profile pictures
- Default avatars
- Recommended size: 200x200px (circular)

### backgrounds/
Background images
- App backgrounds
- Pattern backgrounds
- Recommended size: 1920x1080px

## Optimization

- Use WebP format for better compression
- Compress images before adding
- Use appropriate sizes (don't use desktop-sized images)
- Consider using CDN for production

## File Naming

- Use kebab-case: `product-123.jpg`
- Include dimensions if multiple sizes: `banner-hero-1200x400.jpg`
- Be descriptive: `user-avatar-placeholder.png`

## Usage

```tsx
import { Image } from 'react-native';

<Image 
  source={require('@/assets/images/products/product-1.jpg')} 
  style={{ width: 200, height: 200 }}
/>
```

## Notes

- Always optimize images for mobile
- Use appropriate image formats (WebP, JPEG, PNG)
- Consider lazy loading for product images
- Cache images appropriately
- Test on different screen sizes

