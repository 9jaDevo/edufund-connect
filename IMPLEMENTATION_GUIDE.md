# EduFund Connect - Phase 1 Implementation Guide

## Getting Started

### Step 1: Initialize Next.js Project

```bash
# Navigate to your workspace
cd /path/to/your/workspace

# Create new Next.js project
npx create-next-app@latest edufund-connect-nextjs --typescript --tailwind --app --src-dir --import-alias "@/*"

# Navigate into project
cd edufund-connect-nextjs

# Install additional dependencies
npm install @supabase/ssr @supabase/supabase-js
npm install @stripe/stripe-js stripe
npm install react-hook-form @hookform/resolvers zod
npm install zustand
npm install lucide-react
npm install clsx tailwind-merge
npm install date-fns
npm install react-hot-toast
npm install @googlemaps/js-api-loader
npm install socket.io-client

# Install dev dependencies
npm install -D @types/node
```

### Step 2: Configure Environment Variables

Create `.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_public_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_maps_key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Step 3: Project Structure Setup

Create the following directory structure:

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── register/
│   │   │   └── page.tsx
│   │   ├── verify-email/
│   │   │   └── page.tsx
│   │   ├── reset-password/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── (dashboard)/
│   │   ├── donor/
│   │   │   └── page.tsx
│   │   ├── student/
│   │   │   └── page.tsx
│   │   ├── ngo/
│   │   │   └── page.tsx
│   │   ├── monitoring-agent/
│   │   │   └── page.tsx
│   │   ├── admin/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── (public)/
│   │   ├── projects/
│   │   │   ├── page.tsx
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── about/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── api/
│   │   ├── auth/
│   │   │   └── callback/
│   │   │       └── route.ts
│   │   ├── webhooks/
│   │   │   └── stripe/
│   │   │       └── route.ts
│   │   └── upload/
│   │       └── route.ts
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── input.tsx
│   │   ├── loading-spinner.tsx
│   │   └── toast.tsx
│   ├── forms/
│   │   ├── registration-form.tsx
│   │   ├── project-form.tsx
│   │   └── donation-form.tsx
│   ├── layout/
│   │   ├── navbar.tsx
│   │   ├── footer.tsx
│   │   ├── sidebar.tsx
│   │   └── user-menu.tsx
│   └── features/
│       ├── project-card.tsx
│       ├── project-filters.tsx
│       └── escrow-status.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── middleware.ts
│   ├── stripe/
│   │   ├── client.ts
│   │   └── server.ts
│   ├── utils/
│   │   ├── cn.ts
│   │   ├── format.ts
│   │   └── helpers.ts
│   └── validations/
│       ├── auth.ts
│       ├── project.ts
│       └── donation.ts
├── hooks/
│   ├── use-auth.ts
│   ├── use-toast.ts
│   └── use-supabase.ts
├── types/
│   ├── database.ts
│   ├── auth.ts
│   └── index.ts
├── stores/
│   └── auth-store.ts
└── middleware.ts
```

## Core Files Implementation

### 1. Supabase Client Configuration

**`src/lib/supabase/client.ts`** (Client-side)
```typescript
import { createBrowserClient } from '@supabase/ssr'
import { Database } from '@/types/database'

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

**`src/lib/supabase/server.ts`** (Server-side)
```typescript
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Database } from '@/types/database'

export async function createServerSupabaseClient() {
  const cookieStore = cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // Handle cookie setting errors
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // Handle cookie removal errors
          }
        },
      },
    }
  )
}
```

### 2. Middleware for Auth Protection

**`src/middleware.ts`**
```typescript
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Protected routes
  const protectedRoutes = ['/donor', '/student', '/ngo', '/monitoring-agent', '/admin']
  const isProtectedRoute = protectedRoutes.some(route =>
    request.nextUrl.pathname.startsWith(route)
  )

  // Redirect to login if accessing protected route without auth
  if (isProtectedRoute && !user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Redirect to dashboard if accessing auth pages while logged in
  const authRoutes = ['/login', '/register']
  const isAuthRoute = authRoutes.some(route =>
    request.nextUrl.pathname.startsWith(route)
  )

  if (isAuthRoute && user) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
```

### 3. Utility Functions

**`src/lib/utils/cn.ts`**
```typescript
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**`src/lib/utils/format.ts`**
```typescript
import { format, formatDistanceToNow } from 'date-fns'

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount)
}

export function formatDate(date: string | Date, formatStr: string = 'PPP'): string {
  return format(new Date(date), formatStr)
}

export function formatRelativeTime(date: string | Date): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true })
}

export function getUserRoleName(role: string): string {
  const roleNames: Record<string, string> = {
    donor: 'Donor',
    student: 'Student',
    ngo: 'NGO',
    monitoring_agent: 'Monitoring Agent',
    admin: 'Administrator',
  }
  return roleNames[role] || role
}
```

### 4. TypeScript Types

**`src/types/index.ts`**
```typescript
export enum UserRole {
  DONOR = 'donor',
  STUDENT = 'student',
  NGO = 'ngo',
  MONITORING_AGENT = 'monitoring_agent',
  ADMIN = 'admin',
}

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  profile_picture?: string
  is_verified: boolean
  created_at: string
  updated_at: string
  reputation_score?: number
  preferred_language?: string
  country?: string
  city?: string
  phone?: string
  bio?: string
}

export interface Project {
  id: string
  ngo_id: string
  title: string
  description: string
  location: string
  budget: number
  status: 'pending' | 'active' | 'completed' | 'cancelled'
  project_type: string
  beneficiaries_count: number
  start_date?: string
  end_date?: string
  created_at: string
  updated_at: string
  location_lat?: number
  location_long?: number
}

export interface Donation {
  id: string
  project_id: string
  donor_id: string
  amount: number
  status: 'pending' | 'completed' | 'failed' | 'refunded'
  escrow_status: 'held' | 'released' | 'pending'
  message?: string
  created_at: string
  updated_at: string
}
```

### 5. Validation Schemas

**`src/lib/validations/auth.ts`**
```typescript
import { z } from 'zod'
import { UserRole } from '@/types'

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string(),
  role: z.nativeEnum(UserRole),
  terms: z.boolean().refine(val => val === true, {
    message: 'You must agree to the terms and conditions',
  }),
  country: z.string().min(2, 'Please select your country'),
  phone: z.string().optional(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
})

export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>
```

## Component Examples

### Button Component

**`src/components/ui/button.tsx`**
```typescript
import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils/cn'
import { Loader2 } from 'lucide-react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'error' | 'success'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  fullWidth?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading,
      leftIcon,
      rightIcon,
      fullWidth,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'

    const variants = {
      primary: 'bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500',
      secondary: 'bg-secondary-500 text-white hover:bg-secondary-600 focus:ring-secondary-500',
      outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-primary-500',
      ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-primary-500',
      error: 'bg-error-500 text-white hover:bg-error-600 focus:ring-error-500',
      success: 'bg-success-500 text-white hover:bg-success-600 focus:ring-success-500',
    }

    const sizes = {
      sm: 'text-sm px-3 py-1.5 gap-1.5',
      md: 'text-base px-4 py-2 gap-2',
      lg: 'text-lg px-6 py-3 gap-2',
    }

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          leftIcon && <span className="flex-shrink-0">{leftIcon}</span>
        )}
        {children}
        {rightIcon && !isLoading && <span className="flex-shrink-0">{rightIcon}</span>}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
```

### Card Component

**`src/components/ui/card.tsx`**
```typescript
import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils/cn'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-lg border border-gray-200 bg-white shadow-card',
        className
      )}
      {...props}
    />
  )
)
Card.displayName = 'Card'

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 p-6', className)}
      {...props}
    />
  )
)
CardHeader.displayName = 'CardHeader'

const CardTitle = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-lg font-semibold leading-none tracking-tight', className)}
      {...props}
    />
  )
)
CardTitle.displayName = 'CardTitle'

const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-gray-500', className)}
      {...props}
    />
  )
)
CardDescription.displayName = 'CardDescription'

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
  )
)
CardContent.displayName = 'CardContent'

export { Card, CardHeader, CardTitle, CardDescription, CardContent }
```

## Next Steps

After setting up the foundation:

1. **Implement Authentication Pages**
   - Login page with email/password
   - Registration wizard with role selection
   - Email verification flow
   - Password reset functionality

2. **Build Dashboard Layouts**
   - Create role-specific dashboard layouts
   - Implement navigation and routing
   - Add user profile section

3. **Implement Project System**
   - Project creation wizard
   - Project listing with SSR
   - Project detail pages
   - Search and filtering

4. **Integrate Payment System**
   - Stripe checkout integration
   - Donation flow UI
   - Escrow visualization
   - Webhook handlers

5. **Testing & Refinement**
   - Test all user flows
   - Optimize performance
   - Fix bugs
   - Improve UX

## Resources

- [Next.js App Router Documentation](https://nextjs.org/docs/app)
- [Supabase with Next.js Guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [Stripe Next.js Integration](https://github.com/vercel/next.js/tree/canary/examples/with-stripe-typescript)
- [React Hook Form Documentation](https://react-hook-form.com/)
- [Zod Documentation](https://zod.dev/)
