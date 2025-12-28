# Quick Start Guide

## For GitHub Codespaces

When you open the Codespace, just run:

```bash
chmod +x setup.sh
./setup.sh
```

This will:
- ✅ Create `.env` file with all required variables
- ✅ Install all dependencies
- ✅ Generate Prisma client
- ✅ Set up the database

Then start the dev server:

```bash
npm run dev
```

The app will be available on port 3000. Check the "Ports" tab to open it in your browser.

## Manual Setup

If you prefer to set up manually:

1. **Create `.env` file:**
   ```bash
   cp .env.example .env
   ```

2. **Generate NEXTAUTH_SECRET:**
   ```bash
   openssl rand -base64 32
   ```
   Copy the output and add it to `.env`:
   ```
   NEXTAUTH_SECRET=your-generated-secret-here
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Set up database:**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Start dev server:**
   ```bash
   npm run dev
   ```

## Troubleshooting

**"Recovery mode" error?**
- Click "Cancel" on the dialog
- The devcontainer is optional - you can work without it
- Just run the setup commands manually

**Can't paste in terminal?**
- Click "Allow" on the clipboard permission popup
- Or type commands manually

**Port not showing?**
- Check the "Ports" tab in the bottom panel
- Port 3000 should auto-forward


