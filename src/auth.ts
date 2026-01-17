import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set.");
}

const sql = neon(process.env.DATABASE_URL);

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.error("Missing credentials");
          return null;
        }

        try {
          console.log("Attempting login for:", credentials.email);
          
          const users = await sql`
            SELECT * FROM users 
            WHERE email = ${credentials.email as string}
          `;

          console.log("Users found:", users.length);

          if (users.length === 0) {
            console.error("No user found with email:", credentials.email);
            return null;
          }

          const user = users[0];
          console.log("User found:", { id: user.id, email: user.email, role: user.role });
          
          const isValidPassword = await bcrypt.compare(
            credentials.password as string,
            user.password
          );

          console.log("Password valid:", isValidPassword);

          if (!isValidPassword) {
            console.error("Invalid password for user:", credentials.email);
            return null;
          }

          console.log("Login successful for:", credentials.email);
          return {
            id: user.id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
});
