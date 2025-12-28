# Simple Instructions - Add CreatorFlow Tools

## Step 1: Update package.json in Codespace

Copy and paste this entire command into your Codespace terminal:

```bash
cat > /tmp/package-update.json << 'ENDOFFILE'
{
  "name": "creator-toolkit",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "db:push": "prisma db push",
    "db:studio": "prisma studio",
    "db:generate": "prisma generate",
    "seed:creatorflow": "tsx scripts/seed-creatorflow-tools.ts"
  },
  "dependencies": {
    "next": "14.2.5",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "@prisma/client": "^5.19.1",
    "@stripe/stripe-js": "^4.4.0",
    "stripe": "^17.3.1",
    "zod": "^3.23.8",
    "react-hook-form": "^7.53.0",
    "@hookform/resolvers": "^3.9.0",
    "lucide-react": "^0.427.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.5.2",
    "next-auth": "^4.24.7",
    "bcryptjs": "^2.4.3"
  },
  "devDependencies": {
    "typescript": "^5.5.4",
    "@types/node": "^22.5.5",
    "@types/react": "^18.3.5",
    "@types/react-dom": "^18.3.0",
    "@types/bcryptjs": "^2.4.6",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.41",
    "tailwindcss": "^3.4.9",
    "eslint": "^8.57.1",
    "eslint-config-next": "14.2.5",
    "prisma": "^5.19.1",
    "tsx": "^4.7.0"
  }
}
ENDOFFILE
cp /tmp/package-update.json package.json
```

## Step 2: Create the scripts folder

```bash
mkdir -p scripts
```

## Step 3: Copy the seed script

The seed script file needs to be created. You'll need to get it from the repository or I can provide it in a simpler way.

## Step 4: Install and run

```bash
npm install
npm run seed:creatorflow
```


