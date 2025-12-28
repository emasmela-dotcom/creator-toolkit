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
     - Install all npm dependencies
     - Generate Prisma client

3. **Quick Setup (Recommended)**
   - Run the setup script:
     ```bash
     chmod +x setup.sh
     ./setup.sh
     ```
   - This will create `.env`, install dependencies, and set up the database

4. **Manual Setup (Alternative)**
   - Create a `.env` file:
     ```bash
     cp .env.example .env
     ```
   - Generate a secret:
     ```bash
     openssl rand -base64 32
     ```
   - Add it to `.env` as `NEXTAUTH_SECRET=your-generated-secret`

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

## Database

The project uses **SQLite** for development (no setup required).

You can view/edit data using Prisma Studio:
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
- Make sure you ran `npx prisma db push`
- Check your `DATABASE_URL` in `.env` (should be `file:./dev.db`)

**Dependencies not installing?**
- Run `npm install` manually
- Check Node.js version: `node --version` (should be 18+)

