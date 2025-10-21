# EduFund Connect - Next.js Application

This is the Next.js implementation of EduFund Connect, a transparent education funding platform.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.local.example .env.local

# Edit .env.local with your actual keys

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # Protected dashboard pages
│   ├── (public)/          # Public pages
│   └── api/               # API routes
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── forms/            # Form components
│   └── layout/           # Layout components
├── lib/                   # Library code
│   ├── supabase/         # Supabase clients
│   ├── utils/            # Utility functions
│   └── validations/      # Zod schemas
├── types/                 # TypeScript types
└── hooks/                 # Custom React hooks
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Payments**: Stripe
- **Forms**: React Hook Form + Zod
- **State**: Zustand

## 📝 Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
npm run type-check # Check TypeScript types
```

## 🔐 Environment Variables

Required environment variables (see `.env.local.example`):

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
```

## 🎯 Phase 1 Implementation

Current implementation includes:

### Week 1: Foundation ✅
- Next.js 14 setup with App Router
- Tailwind CSS configuration
- Supabase integration (client, server, middleware)
- Authentication middleware
- Core UI components

### Week 2: Authentication (In Progress)
- Login page with Supabase Auth
- Registration page
- Protected routes
- Role-based dashboards

### Upcoming
- Project creation wizard
- Project browsing and search
- Stripe payment integration
- Escrow visualization

## 📚 Documentation

For detailed implementation guides, see:
- `../README_PHASE1.md` - Phase 1 overview
- `../IMPLEMENTATION_GUIDE.md` - Detailed code examples
- `../NEXTJS_MIGRATION_PLAN.md` - Migration strategy

## 🤝 Contributing

This is a Phase 1 implementation. Follow the implementation guide for adding new features.

## 📄 License

MIT License - see LICENSE file for details
