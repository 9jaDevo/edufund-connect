# EduFund Connect - AI Coding Agent Instructions

## Project Overview

EduFund Connect is a transparent educational funding platform connecting donors with verified students through milestone-based disbursements and independent monitoring. Think "GoFundMe meets escrow" with mandatory verification agents.

**Core Flow:** Donor → Escrow → Monitoring Agent Verification → Staged Disbursement → School/Student

## Tech Stack & Architecture

### Frontend (Current Implementation)

- **React 18 + TypeScript** with Vite (not Next.js as planned in spec)
- **Routing:** React Router v6 with lazy-loaded pages
- **Styling:** Tailwind CSS with custom color system (primary: teal `#0F766E`, secondary: amber, accent: green)
- **State:** Zustand stores (see `src/stores/authStore.ts`)
- **Forms:** React Hook Form + Zod validation
- **i18n:** i18next with JSON files in `public/locales/{lang}/common.json`

### Backend & Services

- **Database:** Supabase (Postgres) with typed client
- **Auth:** Supabase Auth (JWT-based, session persistence enabled)
- **Storage:** Supabase Storage (spec mentions Cloudinary, but not implemented yet)
- **Payments:** Stripe integration (Paystack/Flutterwave planned)
- **Security:** Dual reCAPTCHA (v3 for scoring, v2 as fallback when score < 0.5)

### Key Discrepancies from Spec

- Using **Vite+React** instead of **Next.js** (affects SSR/ISR expectations)
- Auth currently demo-mode with hardcoded password checks (see `authStore.ts` line 22)
- No Redis/Upstash implementation yet
- File uploads use Supabase Storage, not Cloudinary

## Database Schema Patterns

### Core Tables (from `supabase/migrations/`)

- `users` - Base table for all roles (role enum: donor, student, ngo, monitoring_agent, admin)
- `students` - Extends users, links to funding via `user_id`
- `funds` - Tracks donations with escrow status, links donor → student → monitoring_agent
- `disbursements` - Batch-based releases (1=pre-funding, 2=midway, 3=completion)
- `monitoring_reports` - MA-submitted verification with attachments array

**Pattern:** All tables have `created_at`/`updated_at` with auto-triggers (see `update_updated_at_column()`)

### RLS (Row Level Security)

⚠️ **IMPORTANT:** Migrations mention RLS but policies are NOT fully implemented yet. When adding data mutations, consider security implications.

## Code Conventions

### Component Structure

1. **Pages** (`src/pages/`) - Route components, role-specific dashboards use naming pattern `{Role}DashboardPage.tsx`
2. **Layout** (`src/components/layout/`) - Navbar, Footer, Layout wrapper (minimal, just `<Outlet />`)
3. **UI** (`src/components/ui/`) - Reusable components using `cn()` helper for Tailwind class merging

### Component Pattern Example

```tsx
// All UI components use forwardRef + variant/size props
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary", // primary, secondary, accent, outline, ghost, link
      size = "md", // sm, md, lg
      leftIcon,
      rightIcon,
      children,
      ...props
    },
    ref
  ) => {
    // Uses cn() utility from src/utils/helpers.ts for class merging
    return (
      <button
        className={cn(baseClasses, sizeClasses[size], variantClasses[variant])}
        {...props}
      />
    );
  }
);
```

### Type System

- **Types:** Defined in `src/types/index.ts` (manual) and `src/types/supabase.ts` (generated)
- **Enums:** Use TypeScript enums like `UserRole` (DONOR, STUDENT, NGO, MONITORING_AGENT, ADMIN)
- **Validation:** Zod schemas co-located with types (e.g., `loginSchema`, `registerSchema`)

### Utility Functions

- `cn(...classes)` - Merge Tailwind classes with conflict resolution (clsx + tailwind-merge)
- `formatCurrency(amount, currency)` - Uses Intl.NumberFormat
- `formatDate(date)` - Consistent date formatting
- `getUserRoleName(role)` - Human-readable role names

### State Management (Zustand)

```typescript
// Pattern: All stores follow this structure
export const useAuthStore = create<AuthState>((set) => ({
  // State
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,

  // Actions
  login: async (email, password) => {
    set({ loading: true, error: null });
    // Query Supabase directly (no Supabase Auth yet)
    // Demo: password === 'password' check on line 22
  },

  // Persist to localStorage manually
  localStorage.setItem('user', JSON.stringify(user));
}));
```

### Toast Notifications

```typescript
import { showToast } from "../components/ui/Toast";
showToast.success("Message");
showToast.error("Error");
showToast.warning("Warning");
showToast.info("Info");
```

## Critical Workflows

### Development Setup

```bash
npm install
# Copy .env.example to .env and configure:
# VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY
# VITE_STRIPE_PUBLIC_KEY, VITE_GOOGLE_MAPS_API_KEY
# VITE_RECAPTCHA_V3_SITE_KEY, VITE_RECAPTCHA_V2_SITE_KEY

npm run dev          # Start Vite dev server (port 5173)
npm run build        # Production build
npm run preview      # Preview production build
```

### Database Migrations

```bash
supabase db reset    # Reset DB and apply all migrations
npm run seed         # Run src/utils/seed.ts (uses ts-node)
```

### Environment Variables

All env vars use `VITE_` prefix (Vite requirement). Access via `import.meta.env.VITE_*`

## Security Patterns

### ReCAPTCHA Integration

```tsx
// Wrap app in security provider
<ReCaptchaProvider>
  <App />
</ReCaptchaProvider>;

// In components requiring verification
const { token, loading, showV2Challenge, handleV2Response, ReCaptchaV2 } =
  useReCaptcha("action_name");

// Adaptive: v3 runs first, falls back to v2 checkbox if score < 0.5
{
  showV2Challenge && <ReCaptchaV2 />;
}
```

### Input Sanitization

⚠️ Not fully implemented - when adding user-generated content, add proper sanitization

## i18n Patterns

```tsx
import { useTranslation } from "react-i18next";
const { t, i18n } = useTranslation();

// Usage
t("navigation.home"); // "Home"
i18n.changeLanguage("es"); // Switch language

// Translation files: public/locales/{lang}/common.json
```

## Role-Based Access

### Route Structure

- `/` - Public homepage
- `/login`, `/register` - Auth pages
- `/dashboard` - Generic dashboard (redirects based on role)
- `/{role}/dashboard` - Role-specific dashboards:
  - `/donor/dashboard` - DonorDashboardPage
  - `/student/dashboard` - StudentDashboardPage
  - `/ngo/dashboard` - NGODashboardPage
  - `/monitor/dashboard` - MADashboardPage
  - `/admin` - AdminDashboardPage

### Protected Routes

⚠️ Currently no route guards implemented. When adding, check `useAuthStore().isAuthenticated` and `user.role`

## Data Flow Patterns

### Donation/Funding Flow

1. Donor browses `/students` → selects student
2. Creates fund record (status: 'pending')
3. Payment via Stripe → webhook updates status → creates `EscrowTransaction`
4. Admin assigns Monitoring Agent (MA) or auto-assigns by proximity
5. MA submits 3 reports (pre/mid/final) → triggers disbursements in batches
6. School/Student receives funds after each verified milestone

### Monitoring Agent Workflow

1. Receives assignment via `monitoring_assignments` table
2. Submits report to `monitoring_reports` with:
   - Photos/attachments (Supabase Storage)
   - Geotag verification
   - Status update
3. System auto-releases next disbursement batch (or admin manual approval)

## Common Pitfalls

1. **Auth is Demo Mode:** `password === 'password'` in `authStore.ts` - don't rely on this for production logic
2. **No RLS Policies Yet:** Direct Supabase queries bypass security - implement policies before production
3. **Spec vs Reality:** Project spec mentions Next.js, Cloudinary, Redis - actual stack differs
4. **Currency Handling:** `formatCurrency()` defaults to USD, but spec targets NGN (Nigerian Naira)
5. **File Uploads:** Use Supabase Storage, not Cloudinary (spec is outdated)

## Testing & Debugging

- **Error Boundary:** Wraps entire app in `src/App.tsx`
- **ESLint:** Config in `eslint.config.js` (flat config format)
- **No test suite yet:** When adding tests, use Vitest (Vite's test runner)

## Key Files Reference

- `src/stores/authStore.ts` - Authentication state/logic
- `src/lib/supabase.ts` - Supabase client config
- `src/types/index.ts` - Core type definitions
- `src/utils/helpers.ts` - Shared utility functions
- `supabase/migrations/*.sql` - Database schema
- `tailwind.config.js` - Custom color palette
- `EduFund_Connect_PROJECT_SPEC.md` - Full specification (note: some sections aspirational)

## When in Doubt

1. Check existing page implementations in `src/pages/` for patterns
2. Refer to `src/types/index.ts` for data structures
3. Migrations in `supabase/migrations/` show actual DB schema
4. Spec file is aspirational - always verify current implementation
