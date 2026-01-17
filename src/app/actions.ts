// Server Actions for database operations
"use server";
import { neon } from "@neondatabase/serverless";

// Ensure DATABASE_URL is defined
if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL environment variable is not set.");
}

const sql = neon(process.env.DATABASE_URL);

/**
 * Example server action - replace with your actual data needs
 * Server actions provide a secure way to perform server-side operations
 */
export async function getData() {
    try {
        const data = await sql`SELECT * FROM your_table_name ORDER BY id DESC;`;
        return { success: true, data };
    } catch (error) {
        console.error("Error fetching data:", error);
        return { 
            success: false, 
            error: error instanceof Error ? error.message : "Unknown error" 
        };
    }
}