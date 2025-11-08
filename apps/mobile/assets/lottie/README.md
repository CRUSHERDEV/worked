# 🎬 Lottie Animations

## Overview

Lottie animation files for the Linked All mobile app.

## Categories

### loading/
Loading animations
- Spinner animations
- Skeleton loaders
- Progress indicators

### success/
Success animations
- Success checkmarks
- Confirmation animations
- Success states

### error/
Error animations
- Error states
- Failure animations
- Alert animations

### transitions/
Transition animations
- Page transitions
- Screen transitions
- Navigation animations

## Installation

```bash
npm install lottie-react-native
# or
pnpm add lottie-react-native
```

## Usage

```tsx
import LottieView from 'lottie-react-native';

<LottieView
  source={require('@/assets/lottie/loading/loading.json')}
  autoPlay
  loop
  style={{ width: 200, height: 200 }}
/>
```

## Animation Sources

- **LottieFiles**: https://lottiefiles.com
- **Lordicon**: https://lordicon.com
- **Iconscout**: https://iconscout.com/lottie-animations

## File Naming

- Use kebab-case: `loading-spinner.json`
- Be descriptive: `success-checkmark.json`
- Include category: `error-alert.json`

## Best Practices

- Keep animation files small (< 100KB)
- Optimize animations for mobile
- Test on both iOS and Android
- Use appropriate animation speeds
- Consider accessibility (reduce motion)

## Notes

- Lottie animations are JSON files
- Test animations on different devices
- Consider performance impact
- Provide fallback for slow connections
- Respect user's motion preferences

