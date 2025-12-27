# GitHub Codespaces Setup Guide

This project is optimized for GitHub Codespaces. Follow these steps to get started:

## Quick Start

1. **Open in Codespaces**
   - Click the green "Code" button on GitHub
   - Select "Codespaces" tab
   - Click "Create codespace on main"

2. **Wait for Setup**
   - The devcontainer will automatically:
     - Install Node.js 18
     - Set up PostgreSQL database
     - Install all npm dependencies
     - Generate Prisma client

3. **Configure Environment**
   - Create a `.env` file in the root:
     ```bash
     touch .env
     ```
   - Add your environment variables (see `.env.example` for template)
   - For local development in Codespaces, use:
     ```env
     DATABASE_URL="postgresql://postgres:postgres@localhost:5432/creator-toolkit?schema=public"
     ```

4. **Initialize Database**
   ```bash
   npx prisma db push
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

6. **Access Your App**
   - The app will be available on port 3000
   - Codespaces will automatically forward the port
   - Click the "Open in Browser" button in the ports panel

## Ports

- **3000**: Next.js development server
- **5432**: PostgreSQL database (internal)

## Database Access

The PostgreSQL database is automatically set up with:
- Username: `postgres`
- Password: `postgres`
- Database: `creator-toolkit`

You can access it via:
```bash
psql -U postgres -d creator-toolkit
```

Or use Prisma Studio:
```bash
npm run db:studio
```

## Next Steps

1. Set up Stripe account and add API keys to `.env`
2. Configure authentication (NextAuth.js)
3. Start building your first tool!

## Troubleshooting

**Port not forwarding?**
- Check the "Ports" tab in the bottom panel
- Make sure port 3000 is set to "Public" or "Private"

**Database connection issues?**
- Ensure PostgreSQL is running: `sudo service postgresql status`
- Check your `DATABASE_URL` in `.env`

**Dependencies not installing?**
- Run `npm install` manually
- Check Node.js version: `node --version` (should be 18+)

