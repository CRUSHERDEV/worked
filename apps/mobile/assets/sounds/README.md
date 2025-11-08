# 🔊 Sounds

## Overview

Sound effects and audio files for the Linked All mobile app.

## Categories

### haptics/
Haptic feedback sounds (for reference)
- tap.wav
- success.wav
- error.wav
- notification.wav

### notifications/
Notification sounds
- cart-add.mp3
- checkout-success.mp3
- order-confirmed.mp3
- payment-success.mp3

## Installation

```bash
npm install expo-av
# or
pnpm add expo-av
```

## Usage

### Play Sound

```tsx
import { Audio } from 'expo-av';

const playSound = async () => {
  const { sound } = await Audio.Sound.createAsync(
    require('@/assets/sounds/notifications/cart-add.mp3')
  );
  await sound.playAsync();
};
```

### Haptic Feedback

```tsx
import * as Haptics from 'expo-haptics';

// Light impact
Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

// Success
Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

// Error
Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
```

## File Formats

- **MP3**: Recommended for notifications
- **WAV**: High quality, larger file size
- **AAC**: Good compression, iOS friendly

## Best Practices

- Keep sound files small (< 50KB)
- Use appropriate sound levels
- Provide user controls (mute, volume)
- Respect user's sound preferences
- Test on different devices

## Notes

- Always provide mute/sound toggle
- Consider user's environment
- Don't overuse sounds
- Test volume levels
- Ensure sounds work on both iOS and Android

