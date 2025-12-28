#!/bin/bash

# Creator Toolkit Setup Script
# This script sets up the development environment

set -e

echo "🚀 Setting up Creator Toolkit..."

# Check if .env exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cat > .env << 'EOF'
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=
EOF
    
    # Generate a secure secret
    SECRET=$(openssl rand -base64 32)
    echo "NEXTAUTH_SECRET=$SECRET" >> .env
    echo "✅ Generated NEXTAUTH_SECRET"
else
    echo "✅ .env file already exists"
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Set up database
echo "💾 Setting up database..."
npx prisma db push

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Run: npm run dev"
echo "2. Open the app in your browser (check the Ports tab)"
echo ""


