# 🔤 Fonts

## Overview

Custom font files for the Linked All mobile app.

## Font Families

### Inter
- Inter-Regular.ttf
- Inter-Medium.ttf
- Inter-SemiBold.ttf
- Inter-Bold.ttf

### Poppins
- Poppins-Regular.ttf
- Poppins-Medium.ttf
- Poppins-SemiBold.ttf
- Poppins-Bold.ttf

### Urbanist
- Urbanist-Regular.ttf
- Urbanist-Medium.ttf
- Urbanist-SemiBold.ttf
- Urbanist-Bold.ttf

### Outfit
- Outfit-Regular.ttf
- Outfit-Medium.ttf
- Outfit-SemiBold.ttf
- Outfit-Bold.ttf

## Installation

1. Download font files
2. Place in respective folders
3. Update `app.json` to register fonts:

```json
{
  "expo": {
    "fonts": [
      "./assets/fonts/Inter/Inter-Regular.ttf",
      "./assets/fonts/Inter/Inter-Medium.ttf",
      "./assets/fonts/Inter/Inter-SemiBold.ttf",
      "./assets/fonts/Inter/Inter-Bold.ttf"
    ]
  }
}
```

4. Load fonts in app:

```tsx
import { useFonts } from 'expo-font';

const [fontsLoaded] = useFonts({
  'Inter-Regular': require('./assets/fonts/Inter/Inter-Regular.ttf'),
  'Inter-Medium': require('./assets/fonts/Inter/Inter-Medium.ttf'),
  'Inter-SemiBold': require('./assets/fonts/Inter/Inter-SemiBold.ttf'),
  'Inter-Bold': require('./assets/fonts/Inter/Inter-Bold.ttf'),
});
```

## Font Sources

- **Google Fonts**: https://fonts.google.com
- **Inter**: https://rsms.me/inter/
- **Poppins**: https://fonts.google.com/specimen/Poppins
- **Urbanist**: https://fonts.google.com/specimen/Urbanist
- **Outfit**: https://fonts.google.com/specimen/Outfit

## Usage

Fonts are configured in the theme system and can be used via:

```tsx
import { typography } from "@/assets/themes";

<Text style={{ fontFamily: typography.fontFamily.regular }}>
  Text content
</Text>
```

## Notes

- Always include fallback fonts
- Test font rendering on both iOS and Android
- Ensure fonts are properly licensed
- Optimize font files (subset if possible)
- Consider font loading performance

