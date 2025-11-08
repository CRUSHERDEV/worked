# 📱 Linked All Mobile App

React Native mobile application for the Linked All platform.

## 🚀 Getting Started

### Prerequisites

- Node.js >= 20.0.0
- pnpm >= 10.0.0
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm start
```

### Running on Devices

```bash
# iOS
pnpm ios

# Android
pnpm android

# Web
pnpm web
```

## 📁 Project Structure

```
apps/mobile/
├── assets/              # Assets (themes, styles, images, icons, etc.)
│   ├── themes/         # Theme system (colors, typography, spacing)
│   ├── styles/         # Global styles
│   ├── illustrations/  # SVG illustrations
│   ├── icons/          # Icon assets
│   ├── images/         # Image assets
│   ├── fonts/          # Custom fonts
│   ├── lottie/         # Lottie animations
│   └── sounds/         # Sound effects
├── src/
│   ├── components/     # Reusable components
│   ├── hooks/          # Custom React hooks
│   ├── utils/          # Utility functions
│   ├── screens/        # Screen components
│   ├── navigation/     # Navigation configuration
│   └── services/       # API services
└── app/                # Expo Router pages
```

## 🎨 Design System

### Theme

```tsx
import { colors, typography, spacing } from "@/assets/themes";

// Use theme values
<View style={{ backgroundColor: colors.primary[500] }}>
  <Text style={{ fontSize: typography.fontSize.xl }}>
    Text content
  </Text>
</View>
```

### Components

```tsx
import { Button, Input, ProductCard } from "@/components";

<Button title="Click me" onPress={() => {}} variant="primary" />
<Input label="Email" placeholder="Enter email" />
<ProductCard id="1" name="Product" price={100} />
```

### Theme Hook

```tsx
import { useTheme } from "@/hooks/useTheme";

function MyComponent() {
  const { theme, isDark, toggleTheme } = useTheme();
  
  return (
    <View style={{ backgroundColor: theme.colors.background.primary }}>
      <Text>Content</Text>
    </View>
  );
}
```

## 📦 Dependencies

### Core
- **Expo**: React Native framework
- **Expo Router**: File-based routing
- **React Native**: Mobile framework

### UI & Design
- **React Native SVG**: SVG support
- **React Native Vector Icons**: Icon library
- **Lottie React Native**: Animations

### Utilities
- **Expo AV**: Audio/video playback
- **Expo Haptics**: Haptic feedback
- **Expo Font**: Custom fonts

## 🔧 Configuration

### TypeScript

Path aliases are configured in `tsconfig.json`:
- `@/` → `src/`
- `@/assets` → `assets/`
- `@/components` → `src/components/`

### Babel

Module resolution is configured in `babel.config.js` for path aliases.

### App Configuration

App configuration is in `app.json`:
- App name and version
- Icons and splash screen
- Platform-specific settings
- Font configuration

## 📱 Features

### Implemented
- ✅ Complete design system
- ✅ 18 reusable components
- ✅ Theme system (light/dark)
- ✅ TypeScript support
- ✅ Path aliases
- ✅ Asset structure

### In Progress
- 🚧 Screen implementation
- 🚧 Navigation setup
- 🚧 API integration
- 🚧 State management

## 🎯 Next Steps

1. **Add Illustrations** - Add SVG illustrations to `assets/illustrations/`
2. **Add Icons** - Set up React Native Vector Icons
3. **Load Fonts** - Download and add font files
4. **Implement Screens** - Create app screens
5. **Set Up Navigation** - Configure Expo Router
6. **API Integration** - Connect to backend services

## 📚 Documentation

- **Design System**: `MOBILE_DESIGN_SYSTEM.md`
- **Theme Guide**: `assets/themes/README.md`
- **Component Guide**: `src/components/README.md`

## 🐛 Troubleshooting

### Common Issues

1. **Fonts not loading**: Ensure fonts are in the correct directory and registered in `app.json`
2. **Path aliases not working**: Clear Metro bundler cache: `pnpm start --clear`
3. **Build errors**: Clear cache and reinstall: `pnpm clean && pnpm install`

## 📝 Notes

- All components follow Linked All brand guidelines
- Theme system supports light and dark modes
- Components are fully typed with TypeScript
- Asset structure is ready for illustrations

---

**Ready for development!** 🚀
