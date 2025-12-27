# Creator Toolkit

A marketplace where creators buy small, focused tools. Think Gumroad + Shopify Apps + Stripe Connect.

## Features

- **Marketplace**: Browse and discover micro-tools built for creators
- **Seller Dashboard**: List and manage your tools
- **Buyer Dashboard**: Manage your tool subscriptions
- **Stripe Connect**: Secure payment processing with automatic payouts
- **Subscriptions**: Support for one-time and recurring payments

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Prisma** - Database ORM
- **PostgreSQL** - Database
- **Stripe** - Payment processing

## Getting Started

### Option 1: GitHub Codespaces (Recommended)

1. Open this repository in GitHub Codespaces
2. The devcontainer will automatically:
   - Install Node.js 18
   - Set up PostgreSQL
   - Install dependencies
   - Generate Prisma client

3. Set up environment variables:
   - Create a `.env` file in the root directory
   - Copy the template from `.env.example` and fill in your values:
     ```env
     DATABASE_URL="postgresql://postgres:postgres@localhost:5432/creator-toolkit?schema=public"
     NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
     STRIPE_SECRET_KEY=sk_test_...
     STRIPE_WEBHOOK_SECRET=whsec_...
     NEXTAUTH_URL=http://localhost:3000
     NEXTAUTH_SECRET=your-secret-key-here
     ```

4. Set up the database:
```bash
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

The app will be available at the forwarded port (usually shown in the Codespaces ports panel).

### Option 2: Local Development

#### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Stripe account (for payments)

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
- `DATABASE_URL` - PostgreSQL connection string
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe publishable key
- `STRIPE_SECRET_KEY` - Stripe secret key
- `STRIPE_WEBHOOK_SECRET` - Stripe webhook secret
- `NEXTAUTH_URL` - Your app URL
- `NEXTAUTH_SECRET` - Random secret for NextAuth

3. Set up the database:
```bash
npx prisma db push
npx prisma generate
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
│   ├── marketplace/       # Marketplace listing page
│   ├── tools/             # Tool detail pages
│   ├── sell/              # Seller onboarding
│   └── dashboard/         # User dashboards
├── prisma/                # Database schema
├── components/            # Reusable components
└── lib/                   # Utilities and helpers
```

## Database Schema

- **User**: User accounts (buyers and sellers)
- **SellerProfile**: Seller-specific information and Stripe Connect accounts
- **Tool**: Tool listings with pricing and metadata
- **Subscription**: User subscriptions to tools

## Next Steps

- [ ] Add authentication (NextAuth.js)
- [ ] Implement Stripe Connect onboarding
- [ ] Build seller dashboard for tool management
- [ ] Build buyer dashboard for subscription management
- [ ] Add search and filtering
- [ ] Implement reviews and ratings
- [ ] Add tool hosting/integration system

## License

MIT

