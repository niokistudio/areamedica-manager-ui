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

### Data Fetching & State Management
- **Axios**: HTTP client for browser/client-side requests
- **SWR**: React Hooks for data fetching and caching
- **Native Fetch**: Server-side data fetching with Next.js

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
│   │   ├── (manager)/                # Manager route group
│   │   │   ├── components/           # Manager-specific components
│   │   │   ├── transactions/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx            # Manager layout wrapper
│   │   ├── layout.tsx                # Root layout
│   │   ├── page.tsx                  # Home page
│   │   ├── globals.css               # Global styles
│   │   └── favicon.ico
│   ├── components/                   # Shared components
│   │   └── Footer.tsx
│   ├── i18n/
│   │   └── request.ts                # i18n configuration
│   ├── lib/                          # Shared external libraries and utilities
│   │   ├── GlobalProvider.tsx        # Root provider wrapper
│   │   ├── axios/
│   │   │   ├── client.ts             # Axios client with interceptors
│   │   ├── fetch/
│   │   │   └── server.ts             # Server-side fetch utilities
│   │   ├── fonts/
│   │   │   └── index.ts              # Font configuration
│   │   ├── hero-ui/
│   │   │   └── HeroUIClientProvider.tsx
│   │   ├── next-intl/
│   │   │   └── config.ts
│   │   ├── swr/
│   │   │   ├── SWRClientProvider.tsx # SWR configuration
│   │   │   └── fetcher.ts            # SWR fetcher function
│   │   └── tokens/
│   │       └── client.ts             # Client-side token management
│   ├── types/                        # TypeScript type definitions
│   │   ├── api.ts                    # API types
│   │   ├── transactions.ts           # Transaction types
│   │   └── user.ts                   # User types
│   └── utils/                        # Utility functions
│       ├── local-storage.ts          # Local storage abstractions
│       └── cookies/
│           └── server.ts             # Server-side cookie utilities
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

## Data Layer Architecture

### HTTP Client Configuration

The application implements a dual HTTP client strategy optimized for Next.js:

#### Client-Side (Axios)
**Location**: `src/lib/axios/client.ts`

Features:
- Automatic token refresh on 401 errors
- Request/response interceptors
- Credential support for cookies
- Consistent error transformation to `APIClientError`

```typescript
import { axiosClient } from '@/lib/axios/client'

// Automatically includes auth token and handles refresh
const response = await axiosClient.get('/api/users')
```

#### Server-Side (Native Fetch)
**Location**: `src/lib/fetch/server.ts`

Features:
- Server-only operations with `"use server"` directive
- Cookie-based authentication
- Type-safe helper functions
- Consistent error transformation to `APIServerError`

```typescript
import { fetchGet, fetchPost } from '@/lib/fetch/server'

// In Server Components or Server Actions
const data = await fetchGet<User>('/api/users/me')
```

### Error Handling

The application uses a type-safe error handling system:

**Types**: `src/types/api.ts`

```typescript
interface APIError {
  message: string
  status: number
  code: APIErrorCode
}
```

Error codes are defined as enums for type safety:
- `APIErrorCode`: Error codes

### State Management with SWR

**Location**: `src/lib/swr/`

SWR provides React Hooks for data fetching with:
- Automatic caching and revalidation
- Optimistic UI updates
- Error retry logic
- Focus revalidation

**Configuration**: `src/lib/swr/SWRClientProvider.tsx`
- Custom retry logic for 4xx/5xx errors
- Global error handling
- Deduplication of requests

## Utilities

### Local Storage
**Location**: `src/utils/local-storage.ts`

Type-safe abstractions for browser local storage with SSR safety:

```typescript
import { getItem, setItem, removeItem } from '@/utils/local-storage'

// Automatically handles JSON serialization
setItem('user', { id: 1, name: 'John' })
const user = getItem<User>('user')

// Namespaced storage
const authStorage = createNamespacedStorage('auth')
authStorage.setItem('token', 'abc123')
```

Features:
- Automatic JSON serialization/deserialization
- SSR-safe (checks for `window`)
- Error handling with console logging
- Namespaced storage for organization

### Cookie Management
**Location**: `src/utils/cookies/`

Separate utilities for client and server cookie operations:

#### Server-Side Cookies
```typescript
import { getCookie, setCookie, removeCookie } from '@/utils/cookies/server'

// Secure defaults based on environment
await setCookie('session', token, {
  maxAge: 60 * 60 * 24 * 7, // 7 days
  // Automatically sets: secure (prod), httpOnly, sameSite
})
```

**Security Defaults**:
- **Production**: `secure=true`, `httpOnly=true`, `sameSite=lax`
- **Development**: `secure=false`, `httpOnly=true`, `sameSite=lax`

Features:
- Wraps Next.js `cookies()` API
- Automatic security configurations
- Type-safe options
- Async/await interface

### Token Management
**Location**: `src/lib/tokens/client.ts`

Client-side token management utilities:
- Access token storage and retrieval
- Token validation
- Automatic cleanup

## Authentication

### Current Implementation

The authentication system includes:

- **Route Group**: `(auth)` contains all authentication-related pages
- **Dedicated Layout**: `src/app/(auth)/layout.tsx` provides consistent auth page styling
- **Login Page**: `src/app/(auth)/login/page.tsx`
- **Auth Footer**: `src/app/(auth)/components/AuthFooter.tsx` for shared footer content
- **Token Management**: Automatic refresh on 401 errors

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

```
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

## Implemented Features

### ✅ Data Layer
- ✅ HTTP Client (Axios for client-side, Fetch for server-side)
- ✅ Data fetching library (SWR)
- ✅ Type-safe error handling

### ✅ Utilities
- ✅ Local storage abstractions
- ✅ Cookie management (server-side)
- ✅ Token management

## Future Considerations

The architecture is prepared for but does not yet include:

### Database & Backend
- Database integration (Prisma, Drizzle, etc.)
- API routes (`src/app/api/`)
- Server Actions for mutations
- Background jobs and queues

### Form Management
- Form library (React Hook Form, Formik)
- Schema validation (Zod, Yup)
- Form state management

### Additional Features
- File upload utilities
- Real-time updates (WebSockets, Server-Sent Events)
- Advanced caching strategies
- Rate limiting and throttling
- Analytics integration

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

**Last Updated**: 2025-11-20
**Next.js Version**: 15.5.4
**React Version**: 19.1.1