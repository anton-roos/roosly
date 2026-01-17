import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";

// Load environment variables from .env.local
config({ path: ".env.local" });

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set.");
}

const sql = neon(process.env.DATABASE_URL);

async function resetAdmin() {
  try {
    console.log("Deleting existing admin user...");
    
    await sql`
      DELETE FROM users WHERE email = 'admin@roosly.com'
    `;

    console.log("Creating new admin user with fresh password hash...");
    
    // Hash the admin password
    const hashedPassword = await bcrypt.hash("admin123", 10);
    
    console.log("Generated hash:", hashedPassword.substring(0, 20) + "...");

    // Insert admin user
    await sql`
      INSERT INTO users (name, email, password, role)
      VALUES (
        'Admin User',
        'admin@roosly.com',
        ${hashedPassword},
        'admin'
      )
    `;

    console.log("✅ Admin user reset successfully!");
    console.log("\nAdmin credentials:");
    console.log("Email: admin@roosly.com");
    console.log("Password: admin123");
    
    // Test the hash
    console.log("\n🔍 Testing password hash...");
    const testResult = await bcrypt.compare("admin123", hashedPassword);
    console.log("Hash test result:", testResult ? "✅ PASS" : "❌ FAIL");

  } catch (error) {
    console.error("❌ Reset failed:", error);
    process.exit(1);
  }
}

resetAdmin();
