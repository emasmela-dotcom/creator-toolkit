# Quick User Testing Guide

## Step-by-Step Test Flow

### 1. Start the App
Make sure your dev server is running:
```bash
npm run dev
```

Open the app in your browser (check the Ports tab in Codespaces for the URL).

### 2. Test Sign Up
1. Click "Get Started" or go to `/signup`
2. Fill in:
   - Name: Test User
   - Email: test@example.com  
   - Password: password123
   - ✅ Check "I want to sell tools"
3. Click "Create Account"
4. Should redirect to login or dashboard

### 3. Test Login
1. Go to `/login`
2. Enter: test@example.com / password123
3. Click "Sign In"
4. Should redirect to `/dashboard/seller`

### 4. Test Creating a Tool
1. In seller dashboard, click "Create New Tool"
2. Fill out:
   - **Name**: Email Capture Tool
   - **Short Description**: Collect emails directly in your bio link
   - **Full Description**: This tool lets you add a simple email capture form to any link, making it easy for your audience to subscribe without leaving their current page. Perfect for creators who want to grow their email list.
   - **Category**: Marketing
   - **Price**: 9.99
   - **Price Type**: Monthly
3. Click "Create Tool"
4. Should see tool in dashboard as "Draft"

### 5. Test Publishing a Tool
1. Click "Edit" on your tool
2. Check "Publish Tool" checkbox
3. Click "Save Changes"
4. Tool should now show as "Published"

### 6. Test Marketplace
1. Go to `/marketplace`
2. Your tool should appear in the list
3. Try searching: "email"
4. Try filtering by "Marketing" category
5. Click on your tool to view details

### 7. Test Comparison Feature
1. In marketplace, check "Compare" on 2 tools
2. Click "Compare (2)" button
3. Should see side-by-side comparison table
4. Try removing a tool with the X button

### 8. Test Tool Details Page
1. Click on a tool from marketplace
2. View all the information
3. Check the reviews section (empty if no reviews)

### 9. Test Buyer Dashboard
1. Create a second account (different email)
2. Login as buyer
3. Go to `/dashboard/buyer`
4. Should see "No subscriptions yet" message

## What to Check

✅ **Sign Up**: Creates account successfully
✅ **Login**: Authenticates and redirects
✅ **Tool Creation**: Form submits, tool appears in dashboard
✅ **Tool Publishing**: Draft → Published status changes
✅ **Marketplace**: Tools appear, search/filter works
✅ **Tool Details**: All info displays correctly
✅ **Comparison**: Can select and compare tools
✅ **Navigation**: All links work, headers show correctly

## Common Issues & Fixes

**"Can't login"**
- Make sure you ran `npm install` (installs bcryptjs)
- Check NEXTAUTH_SECRET is in `.env`

**"Tools not showing in marketplace"**
- Make sure tool is published (isPublished: true)
- Check database: `npm run db:studio`

**"Search not working"**
- SQLite search is case-sensitive
- Try exact word matches

**"Page not found errors"**
- Make sure you ran `npx prisma db push`
- Restart dev server: `npm run dev`

## Test Checklist

- [ ] Sign up new user
- [ ] Login with credentials  
- [ ] Create a tool
- [ ] Edit a tool
- [ ] Publish a tool
- [ ] View tool in marketplace
- [ ] Search for tools
- [ ] Filter by category
- [ ] Compare tools
- [ ] View tool details
- [ ] Check buyer dashboard
- [ ] Check seller dashboard stats


