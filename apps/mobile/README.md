# Linked All Mobile Application

Expo (React Native) mobile application for the Linked All platform.

## Tech Stack

- **Framework**: Expo SDK 50
- **Router**: Expo Router
- **Language**: TypeScript
- **State Management**: Zustand
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth

## Getting Started

### Prerequisites

- Node.js >= 20.0.0
- pnpm >= 10.0.0
- Expo CLI
- iOS Simulator (Mac) or Android Emulator

### Installation

```bash
# From the monorepo root
pnpm install

# From this directory
cd apps/mobile
pnpm install
```

### Development

```bash
# Start Expo development server
pnpm dev

# Run on iOS simulator
pnpm ios

# Run on Android emulator
pnpm android

# Run on web
pnpm web
```

### Building

```bash
# Build for Android
pnpm build:android

# Build for iOS
pnpm build:ios
```

## Project Structure

```
apps/mobile/
├── app/              # Expo Router pages
├── src/
│   ├── components/   # React Native components
│   ├── screens/      # Screen components
│   ├── navigation/   # Navigation configuration
│   ├── hooks/        # Custom hooks
│   └── services/     # API services
├── assets/          # Images, fonts, etc.
└── app.json         # Expo configuration
```

## Environment Variables

Copy `.env.example` to `.env.local` and fill in the required values:

```bash
cp .env.example .env.local
```

## Features

### Phase 0 (MVP)
- [ ] Product browsing
- [ ] Shopping cart
- [ ] Checkout
- [ ] User authentication
- [ ] Push notifications

### Phase 1
- [ ] Wallet dashboard
- [ ] Payment methods
- [ ] Order tracking
- [ ] Referral system

### Phase 2
- [ ] LinkedCoin rewards
- [ ] Barcode scanning
- [ ] Offline mode
- [ ] Location services

## Deployment

The mobile application uses EAS (Expo Application Services) for builds:

1. Install EAS CLI: `npm install -g eas-cli`
2. Login: `eas login`
3. Configure: `eas build:configure`
4. Build: `eas build --platform android` or `eas build --platform ios`

## Contributing

See the main [CONTRIBUTING.md](../../CONTRIBUTING.md) for guidelines.
