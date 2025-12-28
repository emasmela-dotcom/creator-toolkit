# User Testing Guide

Follow these steps to test the Creator Toolkit marketplace as a user.

## Prerequisites

Make sure you've completed setup:
```bash
npm install
npx prisma db push
npx prisma generate
```

And added to `.env`:
```
NEXTAUTH_SECRET=your-secret-here
```

## Test Flow

### 1. Test Sign Up
- Go to `/signup`
- Create a new account:
  - Name: Test User
  - Email: test@example.com
  - Password: test123456
  - Check "I want to sell tools" if testing seller features
- Should redirect to login or dashboard

### 2. Test Login
- Go to `/login`
- Enter credentials
- Should redirect to dashboard

### 3. Test Marketplace (As Buyer)
- Go to `/marketplace`
- Browse tools (if any exist)
- Use search bar to search
- Click category filters
- Click on a tool to view details
- Check "Compare" checkbox on multiple tools
- Click "Compare" button to see comparison page

### 4. Test Seller Dashboard
- Go to `/dashboard/seller` (or `/dashboard` if you're a seller)
- Click "Create New Tool"
- Fill out the form:
  - Name: Test Tool
  - Short Description: A test tool for creators
  - Full Description: This is a comprehensive test tool that helps creators manage their workflow...
  - Category: Marketing
  - Price: 9.99
  - Price Type: Monthly
- Submit form
- Should see tool in dashboard (as draft)
- Click "Edit" to modify tool
- Toggle "Publish Tool" to make it visible
- View tool in marketplace

### 5. Test Tool Details
- Go to `/tools/[tool-slug]`
- View tool information
- If you have a subscription, you can write a review
- Test review form (rating + comment)

### 6. Test Buyer Dashboard
- Go to `/dashboard/buyer` (or `/dashboard` if you have subscriptions)
- View your subscriptions
- See stats (active subscriptions, monthly cost)

### 7. Test Comparison
- Go to `/marketplace`
- Check "Compare" on 2-4 tools
- Click "Compare" button
- View side-by-side comparison
- Remove tools from comparison

## Expected Behavior

✅ **Sign Up**: Creates user account, optionally creates seller profile
✅ **Login**: Authenticates and redirects to dashboard
✅ **Marketplace**: Shows published tools, search/filter works
✅ **Tool Creation**: Creates draft tool, can be published
✅ **Tool Editing**: Updates tool information
✅ **Tool Deletion**: Removes tool (with confirmation)
✅ **Reviews**: Can submit review if subscribed
✅ **Comparison**: Can compare up to 4 tools
✅ **Dashboard**: Shows correct stats and tools

## Common Issues

**Can't login after signup?**
- Check that password is hashed in database
- Verify NEXTAUTH_SECRET is set

**Tools not showing?**
- Make sure tools are published (isPublished: true)
- Check database has tools

**Search not working?**
- SQLite search is case-sensitive, try exact matches

**Comparison not working?**
- Make sure you're selecting tools with checkboxes
- URL should have `?tools=id1,id2` format

## Test Data

You can create test tools via the seller dashboard, or manually in the database using Prisma Studio:
```bash
npm run db:studio
```


