#!/bin/bash

# EduFund Connect - Next.js Quick Start Script
# This script sets up a new Next.js 14 project with all required dependencies

echo "🚀 EduFund Connect - Next.js Setup"
echo "===================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18 or higher is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"
echo ""

# Prompt for project name
read -p "Enter project directory name (default: edufund-connect-nextjs): " PROJECT_NAME
PROJECT_NAME=${PROJECT_NAME:-edufund-connect-nextjs}

# Check if directory exists
if [ -d "$PROJECT_NAME" ]; then
    echo "❌ Directory $PROJECT_NAME already exists!"
    read -p "Do you want to delete it and start fresh? (y/N): " CONFIRM
    if [ "$CONFIRM" = "y" ] || [ "$CONFIRM" = "Y" ]; then
        rm -rf "$PROJECT_NAME"
        echo "✅ Cleaned up existing directory"
    else
        echo "❌ Aborted"
        exit 1
    fi
fi

echo ""
echo "📦 Creating Next.js project..."
echo ""

# Create Next.js project with all options
npx create-next-app@latest "$PROJECT_NAME" \
    --typescript \
    --tailwind \
    --app \
    --src-dir \
    --import-alias "@/*" \
    --use-npm

# Navigate into project
cd "$PROJECT_NAME" || exit

echo ""
echo "📦 Installing additional dependencies..."
echo ""

# Core dependencies
npm install @supabase/ssr @supabase/supabase-js

# Payment processing
npm install @stripe/stripe-js stripe

# Forms and validation
npm install react-hook-form @hookform/resolvers zod

# State management
npm install zustand

# UI libraries
npm install lucide-react clsx tailwind-merge

# Utilities
npm install date-fns

# Notifications
npm install react-hot-toast

# Maps
npm install @googlemaps/js-api-loader

# Real-time
npm install socket.io-client

# Dev dependencies
npm install -D @types/node

echo ""
echo "✅ All dependencies installed!"
echo ""

# Create directory structure
echo "📁 Creating directory structure..."

# App routes
mkdir -p src/app/\(auth\)/login
mkdir -p src/app/\(auth\)/register
mkdir -p src/app/\(auth\)/verify-email
mkdir -p src/app/\(auth\)/reset-password

mkdir -p src/app/\(dashboard\)/donor
mkdir -p src/app/\(dashboard\)/student
mkdir -p src/app/\(dashboard\)/ngo
mkdir -p src/app/\(dashboard\)/monitoring-agent
mkdir -p src/app/\(dashboard\)/admin

mkdir -p src/app/\(public\)/projects
mkdir -p src/app/\(public\)/about
mkdir -p src/app/\(public\)/how-it-works

mkdir -p src/app/api/auth/callback
mkdir -p src/app/api/webhooks/stripe
mkdir -p src/app/api/upload

# Component directories
mkdir -p src/components/ui
mkdir -p src/components/forms
mkdir -p src/components/layout
mkdir -p src/components/features

# Lib directories
mkdir -p src/lib/supabase
mkdir -p src/lib/stripe
mkdir -p src/lib/utils
mkdir -p src/lib/validations

# Other directories
mkdir -p src/hooks
mkdir -p src/types
mkdir -p src/stores

echo "✅ Directory structure created!"
echo ""

# Create .env.local template
echo "📝 Creating environment variables template..."

cat > .env.local << 'EOF'
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_public_key_here
STRIPE_SECRET_KEY=your_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET=your_webhook_secret_here

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_maps_key_here

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
EOF

echo "✅ .env.local template created!"
echo ""

# Create basic utility files
echo "📝 Creating utility files..."

# cn utility
cat > src/lib/utils/cn.ts << 'EOF'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
EOF

# format utility
cat > src/lib/utils/format.ts << 'EOF'
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
EOF

echo "✅ Utility files created!"
echo ""

# Update tailwind.config.ts with custom colors
echo "🎨 Updating Tailwind configuration..."

cat > tailwind.config.ts << 'EOF'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#0F766E',
          600: '#0e6969',
          700: '#0e5e5e',
          800: '#115e59',
          900: '#134e4a',
          950: '#042f2e',
        },
        secondary: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        },
        accent: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22C55E',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
      },
      boxShadow: {
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
      },
    },
  },
  plugins: [],
}
export default config
EOF

echo "✅ Tailwind configuration updated!"
echo ""

# Create README
cat > GETTING_STARTED.md << 'EOF'
# EduFund Connect - Getting Started

## ✅ Setup Complete!

Your Next.js project has been initialized with all the required dependencies.

## 📋 Next Steps

### 1. Configure Environment Variables

Edit `.env.local` and add your actual keys:

```bash
# Get these from your Supabase dashboard
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Get these from your Stripe dashboard
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# Get these from your Cloudinary dashboard
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Get this from Google Cloud Console
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
```

### 2. Start Development Server

```bash
npm run dev
```

Visit http://localhost:3000 to see your app!

### 3. Follow Implementation Guide

Refer to these documents in your parent directory:
- `NEXTJS_MIGRATION_PLAN.md` - Overall migration strategy
- `IMPLEMENTATION_GUIDE.md` - Detailed code examples
- `PHASE_1_SUMMARY.md` - Phase 1 overview

### 4. Build Core Files

Start implementing in this order:
1. Supabase client utilities (`src/lib/supabase/`)
2. Middleware for auth (`middleware.ts`)
3. UI components (`src/components/ui/`)
4. Authentication pages (`src/app/(auth)/`)
5. Dashboard layouts (`src/app/(dashboard)/`)

## 📚 Useful Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Type checking
npm run type-check   # Check TypeScript errors
```

## 🎯 Phase 1 Goals

- [ ] Set up Supabase authentication
- [ ] Build login and registration pages
- [ ] Create role-based dashboards
- [ ] Implement project creation
- [ ] Add project browsing
- [ ] Integrate Stripe payments

## 📖 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Stripe Docs](https://stripe.com/docs)
- [Tailwind Docs](https://tailwindcss.com/docs)

Good luck building! 🚀
EOF

echo ""
echo "================================================"
echo "✨ Setup Complete!"
echo "================================================"
echo ""
echo "📂 Project created at: $PROJECT_NAME"
echo ""
echo "🎯 Next Steps:"
echo ""
echo "1. cd $PROJECT_NAME"
echo "2. Edit .env.local with your actual API keys"
echo "3. npm run dev"
echo "4. Open http://localhost:3000"
echo ""
echo "📚 Documentation:"
echo "   - Read GETTING_STARTED.md in your project"
echo "   - Review IMPLEMENTATION_GUIDE.md in parent directory"
echo ""
echo "Happy coding! 🚀"
echo ""
