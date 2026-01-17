# Authentication & RBAC Setup Guide

This application now has authentication and role-based access control (RBAC) implemented using NextAuth.js v5.

## Features

- ✅ Secure login with credentials (email/password)
- ✅ Role-based access control (Admin-only routes)
- ✅ Protected routes: `/dashboard` and `/customers`
- ✅ Middleware-based route protection
- ✅ API route protection with admin checks
- ✅ Session management with JWT
- ✅ Beautiful login UI matching your brand

## Quick Start

### 1. Setup Environment Variables

Make sure your `.env.local` file includes:

```env
DATABASE_URL=your_neon_database_url
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate_with_command_below
```

To generate a secret for NEXTAUTH_SECRET:
```bash
openssl rand -base64 32
```

### 2. Initialize the Database

Run the setup script to create the users table and seed an admin user:

```bash
npm run setup-auth
```

This will:
- Create the `users` table in your database
- Create an admin user with these credentials:
  - **Email**: `admin@roosly.com`
  - **Password**: `admin123`

⚠️ **Important**: Change the admin password in production!

### 3. Start the Development Server

```bash
npm run dev
```

### 4. Test the Authentication

1. Navigate to `http://localhost:3000/login`
2. Log in with the admin credentials
3. You'll be redirected to `/dashboard`
4. Try accessing `/customers` - it should work now!
5. Try logging out and accessing protected routes - you'll be redirected to login

## Protected Routes

The following routes require admin authentication:

- `/dashboard` - Admin dashboard with navigation and quick stats
- `/customers` - Customer management page (CRUD operations)

## File Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/
│   │   │   └── route.ts          # NextAuth API routes
│   │   └── customers/
│   │       └── route.ts          # Protected with admin checks
│   ├── dashboard/
│   │   └── page.tsx              # Admin dashboard
│   ├── login/
│   │   └── page.tsx              # Login page
│   └── customers/
│       └── page.tsx              # Protected customer management
├── components/
│   ├── LogoutButton.tsx          # Client-side logout button
│   └── Providers.tsx             # SessionProvider wrapper
├── types/
│   └── next-auth.d.ts            # NextAuth TypeScript types
├── auth.ts                       # NextAuth configuration
└── middleware.ts                 # Route protection middleware

scripts/
└── setup-auth.ts                 # Database setup script

sql/
├── create_users.sql              # SQL to create users table
└── seed_users.sql                # SQL to seed admin user
```

## How It Works

### Authentication Flow

1. User visits a protected route (e.g., `/dashboard`)
2. Middleware checks if user is authenticated
3. If not authenticated → redirect to `/login`
4. User enters credentials
5. NextAuth validates against database
6. On success → create JWT session
7. Redirect to requested page

### Role-Based Access Control

- Middleware checks both authentication AND role
- Only users with `role: 'admin'` can access protected routes
- API routes also check for admin role before processing requests

### API Protection

All customer API routes (`GET`, `POST`, `PUT`, `DELETE`) check for:
1. Valid session
2. Admin role

Returns:
- `401 Unauthorized` - No session
- `403 Forbidden` - Not an admin

## Adding New Users

To add more users or admins, you can:

1. **Manually insert into database**:
```sql
INSERT INTO users (name, email, password, role)
VALUES (
  'New Admin',
  'newadmin@roosly.com',
  '$2a$10$hash_your_password_here',
  'admin'
);
```

2. **Create a user management page** (future enhancement)

## Creating Password Hashes

Use bcryptjs to hash passwords:

```typescript
import bcrypt from 'bcryptjs';
const hashedPassword = await bcrypt.hash('your_password', 10);
```

Or use the Node.js REPL:
```bash
node
> const bcrypt = require('bcryptjs')
> bcrypt.hashSync('your_password', 10)
```

## Security Best Practices

✅ Implemented:
- Password hashing with bcrypt (10 rounds)
- JWT-based sessions
- HTTPS required in production (via NEXTAUTH_URL)
- Role-based access control
- API route protection
- Secure cookie settings

🔧 Recommended for Production:
- Change default admin password
- Use strong NEXTAUTH_SECRET (32+ characters)
- Enable HTTPS
- Implement rate limiting on login
- Add password reset functionality
- Add MFA/2FA support
- Implement account lockout after failed attempts

## Troubleshooting

### "Unauthorized" errors when accessing APIs
- Make sure you're logged in
- Check that your session is valid
- Verify the user has admin role

### Can't log in
- Verify database connection
- Check that setup script ran successfully
- Verify password is correct
- Check browser console for errors

### Redirected to login repeatedly
- Check NEXTAUTH_URL matches your app URL
- Verify NEXTAUTH_SECRET is set
- Clear browser cookies and try again

## Future Enhancements

- [ ] User management page for admins
- [ ] Password reset functionality
- [ ] Email verification
- [ ] Multi-factor authentication (MFA)
- [ ] Activity logging
- [ ] Session management (view/revoke sessions)
- [ ] More granular permissions
- [ ] OAuth providers (Google, GitHub, etc.)

## Support

For issues or questions, refer to:
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Next.js Documentation](https://nextjs.org/docs)
