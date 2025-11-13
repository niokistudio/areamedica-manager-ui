# Areamedica Manager UI - Architecture Documentation

## Overview

Areamedica Manager UI is a modern healthcare management application built with Next.js 15 and React 19. The application follows a clean architecture with server-side rendering, internationalization support, and a component-driven design using HeroUI.

## Tech Stack

### Core Technologies
- **Next.js**: v15.5.4 (App Router with Turbopack)
- **React**: v19.1.1
- **TypeScript**: v5.9.2
- **Node.js**: >=24.9.0
- **npm**: >=11.6.0

### UI & Styling
- **HeroUI**: ~2.2.x-2.4.x (Component library)
- **Tailwind CSS**: v4.1.13 (Utility-first CSS)
- **Framer Motion**: v12.23.24 (Animations)
- **Lucide React**: v0.544.0 (Icons)
- **IBM Plex Sans**: Primary typeface (Google Fonts)

### Developer Tools
- **Biome**: v2.2.4 (Fast linter/formatter, replaces ESLint + Prettier)
- **Turbopack**: Next.js bundler for faster development builds
- **PostCSS**: CSS processing

### Internationalization
- **next-intl**: v4.3.9 (i18n for App Router)
- **@lingual/i18n-check**: Translation validation

## Project Structure

```
areamedica-manager-ui/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (auth)/                   # Authentication route group
│   │   │   ├── components/           # Auth-specific components
│   │   │   │   └── AuthFooter.tsx
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx            # Auth layout wrapper
│   │   ├── layout.tsx                # Root layout
│   │   ├── page.tsx                  # Home page
│   │   ├── globals.css               # Global styles
│   │   └── favicon.ico
│   ├── i18n/
│   │   └── request.ts                # i18n configuration
│   └── lib/                          # Shared libraries and utilities
│       ├── GlobalProvider.tsx        # Root provider wrapper
│       ├── fonts/
│       │   └── index.ts              # Font configuration
│       ├── hero-ui/
│       │   └── HeroUIClientProvider.tsx
│       └── next-intl/
│           └── config.ts
├── messages/                         # Translation files
│   └── es.json                       # Spanish translations
├── public/                           # Static assets
├── Configuration files (see below)
└── package.json
```

## Key Architectural Patterns

### Next.js App Router

The application uses Next.js 15's App Router architecture:

- **Server Components by Default**: Most components are server components for optimal performance
- **Client Components**: Explicitly marked with `"use client"` directive when needed
  - `src/app/(auth)/components/AuthFooter.tsx`
  - `src/lib/hero-ui/HeroUIClientProvider.tsx`
- **Route Groups**: `(auth)` group for authentication-related pages
- **Nested Layouts**: Hierarchical layout system for shared UI patterns

### Component Architecture

#### Server Components
Used for:
- Page layouts
- Data fetching
- Static content rendering
- SEO-critical content

#### Client Components
Used for:
- Interactive UI elements
- Browser-only APIs
- Event handlers
- Provider components

### Provider Pattern

The application uses a centralized provider pattern via `GlobalProvider` (src/lib/GlobalProvider.tsx):

```
GlobalProvider
├── NextIntlClientProvider    # i18n context
└── HeroUIClientProvider       # UI theming
```

This allows for:
- Centralized configuration
- Easy addition of new providers
- Clean separation of concerns

## Authentication

The authentication system is structured but not yet fully implemented:

- **Route Group**: `(auth)` contains all authentication-related pages
- **Dedicated Layout**: `src/app/(auth)/layout.tsx` provides consistent auth page styling
- **Login Page**: `src/app/(auth)/login/page.tsx`
- **Auth Footer**: `src/app/(auth)/components/AuthFooter.tsx` for shared footer content

The architecture is ready for integration with authentication libraries like NextAuth, Clerk, or custom solutions.

## Internationalization (i18n)

### Configuration

- **Library**: next-intl v4.3.9
- **Default Locale**: Spanish (`es`)
- **Translation Files**: `/messages/` directory
- **Type Safety**: Global type declarations for autocomplete support

### Implementation

```tsx
// Type-safe translation hook
const t = useTranslations();

// Usage
<h1>{t('auth.login.title')}</h1>
```

### Configuration Files

- `next.config.ts`: next-intl plugin integration
- `src/i18n/request.ts`: Request-level i18n configuration
- `global.d.ts`: TypeScript type definitions for messages
- `messages/es.json`: Spanish translations

### Validation

Use `npm run i18n:check` to validate translation files.

## Styling System

### Tailwind CSS v4

The application uses the latest Tailwind CSS v4:

- **CSS-First Configuration**: No `tailwind.config.js` needed
- **Theme Configuration**: Via `@theme` directive in `globals.css`
- **PostCSS Integration**: Configured in `postcss.config.mjs`

### HeroUI Component Library

HeroUI provides pre-built, accessible components:

- **Theme Configuration**: `hero.ts`
- **Custom Variants**: Dark mode via `.dark` class
- **Components Used**: Button, Card, CardBody, and more

### Custom Properties

The application uses CSS custom properties for theming:

```css
--color-background
--color-muted
--color-muted-foreground
```

## TypeScript Configuration

### Compiler Options

- **Target**: ES2017
- **Strict Mode**: Enabled for maximum type safety
- **Module Resolution**: Bundler
- **Path Aliases**: `@/*` maps to `./src/*`

### Usage

```typescript
// Import with path alias
import { GlobalProvider } from '@/lib/GlobalProvider';
```

## Code Quality & Formatting

### Biome

Biome (v2.2.4) replaces both ESLint and Prettier:

- **Fast**: Rust-based for instant linting and formatting
- **Integrated**: Single tool for both linting and formatting
- **Auto-organize**: Automatically organizes imports
- **Git Integration**: Staged files support

### Configuration

- **Indentation**: 2 spaces
- **Semicolons**: As needed
- **Linting Rules**: Recommended + Next.js/React domains

### Commands

```bash
npm run lint    # Check for issues
npm run format  # Format code
```

## Build & Development

### Development

```bash
npm run dev
```

- Uses **Turbopack** for faster builds
- Hot module replacement
- Instant feedback

### Production Build

```bash
npm run build
npm start
```

- Optimized production bundle
- Server-side rendering
- Static optimization

## Future Considerations

The architecture is prepared for but does not yet include:

### Data Layer
- Database integration (Prisma, Drizzle, etc.)
- API routes (`src/app/api/`)
- Server Actions for mutations
- Data fetching library (React Query, SWR)

### Form Management
- Form library (React Hook Form, Formik)
- Validation (Zod, Yup)

### State Management
- Global state library (Zustand, Jotai, Redux) if needed
- Most state can be handled with Server Components and Server Actions

### Authentication
- Complete authentication implementation
- Session management
- Protected routes
- Role-based access control

## Configuration Files Reference

| File | Purpose |
|------|---------|
| `package.json` | Dependencies and scripts |
| `tsconfig.json` | TypeScript compiler configuration |
| `next.config.ts` | Next.js configuration and plugins |
| `biome.json` | Linting and formatting rules |
| `postcss.config.mjs` | PostCSS and Tailwind configuration |
| `hero.ts` | HeroUI theme customization |
| `global.d.ts` | Global TypeScript type declarations |
| `.nvmrc` | Node version specification (v24.9.0) |

## Best Practices

### 1. Server Components First
Default to Server Components and only use Client Components when necessary (interactivity, browser APIs).

### 2. Type Safety
Leverage TypeScript strict mode and type-safe translations for better DX and fewer runtime errors.

### 3. Path Aliases
Use `@/*` imports for cleaner import statements and easier refactoring.

### 4. Internationalization
Always use the `useTranslations()` hook for user-facing text to maintain i18n support.

### 5. Code Quality
Run `npm run lint` and `npm run format` before committing to maintain consistent code style.

### 6. Component Organization
- Keep auth-related components in `(auth)/components/`
- Shared components go in `src/components/` (to be created)
- Page-specific components can live alongside their pages

### 7. Component Export Convention

**Function Exports Over Const Declarations**

Components should be exported as functions, not as const declarations:

```tsx
// ✅ PREFERRED: Named function export
export function AuthFooter () {
  return <footer>...</footer>;
}

// ❌ AVOID: Const arrow function export
export const AuthFooter = () => {
  return <footer>...</footer>;
};
```

**Exception: Layouts and Pages**

For Next.js layouts and pages, use **default export** of a function:

```tsx
// ✅ Layouts (layout.tsx)
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

// ✅ Pages (page.tsx)
export default function LoginPage() {
  return <main>...</main>;
}
```

**Benefits:**
- **Better stack traces**: Named functions show up clearly in debugging
- **Hoisting**: Function declarations are hoisted, providing more flexibility
- **Consistency**: Aligns with Next.js conventions for pages and layouts
- **Readability**: Clear function syntax is easier to read and maintain

**Migration Note:** Existing components using const declarations should be gradually migrated to follow this convention during refactoring or updates.

## Development Workflow

1. **Install Dependencies**: `npm install` (requires Node 24+)
2. **Start Development Server**: `npm run dev`
3. **Make Changes**: Edit files in `src/`
4. **Check Code Quality**: `npm run lint`
5. **Format Code**: `npm run format`
6. **Validate Translations**: `npm run i18n:check`
7. **Build for Production**: `npm run build`

## Performance Optimizations

- **Server Components**: Reduced client-side JavaScript
- **Turbopack**: Faster development builds
- **React 19**: Latest performance improvements
- **Font Optimization**: Google Fonts with `next/font`
- **Image Optimization**: Use `next/image` for automatic optimization
- **Code Splitting**: Automatic with App Router

## Accessibility

- **HeroUI Components**: Built with accessibility in mind
- **Semantic HTML**: Use proper HTML elements
- **ARIA Labels**: Add where needed for screen readers
- **Keyboard Navigation**: Test all interactive elements

## Security Considerations

- **Environment Variables**: Store sensitive data in `.env.local`
- **Input Validation**: Validate all user inputs
- **CSRF Protection**: Built into Next.js forms
- **Content Security Policy**: Can be configured in `next.config.ts`

---

**Last Updated**: 2025-11-12
**Next.js Version**: 15.5.4
**React Version**: 19.1.1