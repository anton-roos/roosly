import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";

// Load environment variables from .env.local
config({ path: ".env.local" });

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set.");
}

const sql = neon(process.env.DATABASE_URL);

async function setup() {
  try {
    console.log("Creating users table...");
    
    // Create users table
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create indexes
    await sql`CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_users_role ON users(role)`;

    console.log("Users table created successfully!");

    // Hash the admin password
    const hashedPassword = await bcrypt.hash("admin123", 10);

    // Insert admin user
    console.log("Creating admin user...");
    await sql`
      INSERT INTO users (name, email, password, role)
      VALUES (
        'Admin User',
        'admin@roosly.com',
        ${hashedPassword},
        'admin'
      )
      ON CONFLICT (email) DO NOTHING
    `;

    console.log("✅ Setup completed successfully!");
    console.log("\nAdmin credentials:");
    console.log("Email: admin@roosly.com");
    console.log("Password: admin123");
    console.log("\n⚠️  Please change the password after first login in production!");

  } catch (error) {
    console.error("❌ Setup failed:", error);
    process.exit(1);
  }
}

setup();
