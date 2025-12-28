# Seed Scripts

This directory contains database seed scripts for populating the marketplace with initial data.

## CreatorFlow Tools Seed

The `seed-creatorflow-tools.ts` script creates:
- 39 individual CreatorFlow tools (all paid tools that can be sold separately)
- 1 CreatorFlow bundle (includes all 44 tools/features)

### Running the Seed Script

1. Make sure your database is set up:
   ```bash
   npm run db:generate
   npm run db:push
   ```

2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```

3. Run the seed script:
   ```bash
   npm run seed:creatorflow
   ```

### What It Creates

- **CreatorFlow User**: A system user account for CreatorFlow (`creatorflow@creatorflow.ai`)
- **CreatorFlow Seller Profile**: A verified seller profile for CreatorFlow
- **39 Individual Tools**: All paid tools from CreatorFlow that can be purchased separately
- **1 CreatorFlow Bundle**: The complete CreatorFlow platform with all 44 tools

### Tool Categories

Tools are categorized as:
- **Content**: Content creation and management tools
- **Marketing**: Marketing and promotion tools
- **Productivity**: Productivity and organization tools
- **Analytics**: Analytics and performance tracking tools
- **Sales**: Sales and business management tools
- **Community**: Community and engagement tools

### Notes

- The script is idempotent - running it multiple times won't create duplicates
- Existing tools with the same slug will be skipped
- All tools are automatically published and ready for the marketplace
- The CreatorFlow bundle is marked as featured

