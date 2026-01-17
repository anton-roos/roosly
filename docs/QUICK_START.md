# 🚀 Quick Start Guide

## Step 1: Install Dependencies (Already Done ✓)
```bash
npm install
```

## Step 2: Configure Environment Variables

Add these to your `.env.local` file (create it if it doesn't exist):

```env
# Database (you should already have this)
DATABASE_URL=your_neon_database_url

# Authentication (NEW - Required!)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_random_secret_here
```

### Generate NEXTAUTH_SECRET:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## Step 3: Setup Database

Run this command to create the users table and admin account:

```bash
npm run setup-auth
```

**Default Admin Credentials:**
- Email: `admin@roosly.com`
- Password: `admin123`

## Step 4: Start the App

```bash
npm run dev
```

## Step 5: Test It Out!

1. Open http://localhost:3000/login
2. Login with admin credentials
3. You'll be redirected to http://localhost:3000/dashboard
4. Click "Customers" to manage customer data
5. Try logging out and accessing protected routes

## 🔒 Protected Routes

These routes now require admin login:
- `/dashboard` - Admin dashboard
- `/customers` - Customer management

## ✅ You're Done!

Your app now has:
- ✅ Secure authentication
- ✅ Admin-only access to sensitive pages
- ✅ Beautiful login UI
- ✅ Session management
- ✅ Protected API routes

## 📖 More Info

- See [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) for what was changed
- See [AUTH_SETUP.md](./AUTH_SETUP.md) for detailed documentation
