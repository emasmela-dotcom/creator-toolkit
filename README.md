# Creator Toolkit

A marketplace where creators buy small, focused tools. Think Gumroad + Shopify Apps + Stripe Connect.

## Features

- **Marketplace**: Browse and discover micro-tools built for creators
- **Seller Dashboard**: List and manage your tools
- **Buyer Dashboard**: Manage your tool subscriptions
- **Search & Filter**: Find tools by category and search terms
- **Tool Comparison**: Compare up to 4 tools side-by-side
- **Reviews & Ratings**: Rate and review tools you've subscribed to
- **Authentication**: Secure user accounts with NextAuth.js
- **CreatorFlow Showcase**: Featured flagship tool demonstration

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Prisma** - Database ORM
- **SQLite** - Database (PostgreSQL ready)
- **NextAuth.js** - Authentication
- **Stripe** - Payment processing (ready for integration)

## Getting Started

### Option 1: GitHub Codespaces (Recommended)

**Quick Setup:**
1. Open this repository in GitHub Codespaces
2. Run the setup script:
   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```

**That's it!** The app will be available on port 3000.

See [QUICK_START.md](./QUICK_START.md) for detailed instructions and troubleshooting.

### Option 2: Local Development

#### Prerequisites

- Node.js 18+ 
- SQLite (or PostgreSQL)
- Stripe account (for payments - optional for now)

#### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

Fill in your environment variables:
- `DATABASE_URL` - Database connection string (SQLite: `file:./dev.db`)
- `NEXTAUTH_URL` - Your app URL
- `NEXTAUTH_SECRET` - Random secret for NextAuth (generate with `openssl rand -base64 32`)

3. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Project Structure

```
creator-toolkit/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   └── tools/         # Tool management endpoints
│   ├── marketplace/       # Marketplace listing page
│   ├── tools/             # Tool detail pages
│   ├── compare/           # Tool comparison page
│   ├── sell/              # Seller onboarding
│   └── dashboard/         # User dashboards
├── components/            # Reusable components
├── lib/                   # Utilities and helpers
├── prisma/                # Database schema
└── types/                 # TypeScript type definitions
```

## Database Schema

- **User**: User accounts (buyers and sellers)
- **SellerProfile**: Seller-specific information and Stripe Connect accounts
- **Tool**: Tool listings with pricing and metadata
- **Subscription**: User subscriptions to tools
- **Review**: User reviews and ratings for tools

## Marketplace Fee

The marketplace fee is set to **15%** (configured in `lib/constants.ts`). This is competitive compared to:
- Apple App Store: 30%
- Google Play: 30%
- Shopify App Store: 20%

## Features Status

- [x] Authentication with NextAuth.js
- [x] Seller dashboard for tool management
- [x] Buyer dashboard for subscription management
- [x] Search and filtering
- [x] Reviews and ratings system
- [x] Tool hosting/integration system
- [x] Tool comparison feature
- [x] Competitive advantages section
- [x] CreatorFlow showcase integration
- [ ] Stripe Connect onboarding (pending)
- [ ] Payment processing (pending)
- [ ] Email notifications (pending)

## Next Steps

1. Test all features
2. Add Stripe Connect for payments
3. Implement payment processing
4. Add email notifications
5. Deploy to production

## License

MIT
