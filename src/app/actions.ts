// app/actions.ts
"use server";
import { neon } from "@neondatabase/serverless";

// Ensure DATABASE_URL is defined
if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL environment variable is not set.");
}

const sql = neon(process.env.DATABASE_URL);

export async function getData() {
    const data = await sql`SELECT * FROM your_table_name;`;
    return data;
}