#!/bin/bash

echo "🔧 Setting up CreatorFlow tools..."

# Create scripts directory
mkdir -p scripts

# Install tsx
echo "📦 Installing tsx..."
npm install tsx --save-dev

# Add seed script to package.json
echo "📝 Adding seed script to package.json..."
node << 'EOF'
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
pkg.scripts = pkg.scripts || {};
pkg.scripts['seed:creatorflow'] = 'tsx scripts/seed-creatorflow-tools.ts';
if (!pkg.devDependencies) pkg.devDependencies = {};
pkg.devDependencies.tsx = '^4.7.0';
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
EOF

echo "✅ Setup complete!"
echo ""
echo "Next step: The seed script file needs to be created."
echo "Run: npm run seed:creatorflow"
echo "(The script file will need to be added first)"


