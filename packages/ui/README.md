# @linked-all/ui

Shared UI component library for Linked All web and mobile applications.

## Design Principles

1. **Mobile-First**: Components optimized for touch and small screens
2. **Accessible**: WCAG 2.1 AA compliant
3. **Performant**: Optimized for low-bandwidth environments
4. **Consistent**: Follows Linked All design system
5. **Flexible**: Composable and customizable

## Usage

```tsx
import { Button, Input, Card } from "@linked-all/ui";

function MyComponent() {
  return (
    <Card>
      <Input placeholder="Enter text" />
      <Button>Submit</Button>
    </Card>
  );
}
```

## Components

Components will be added as the project progresses. Initial components include:

- Button
- Input
- Card
- Modal
- Toast
- Spinner
- Badge
- Avatar
- etc.

## Development

```bash
# Build the package
pnpm build

# Watch for changes
pnpm dev

# Type check
pnpm type-check
```
