import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

// Ensure DATABASE_URL is defined
if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL environment variable is not set.");
}

const sql = neon(process.env.DATABASE_URL!); // Use non-null assertion operator

// Wrap all API handlers with try-catch for error handling
export async function GET() {
    try {
        // Ensure the response is always an array
        const customers = await sql`SELECT * FROM customers;`;

        // Log the raw database query result for debugging
        console.log("Raw database query result:", customers);

        return NextResponse.json(customers || []);
    } catch (error) {
        console.error("Error fetching customers:", error);
        console.error("Error details:", (error as any).message, (error as any).stack); // Enhanced error logging
        return NextResponse.json({ error: "Failed to fetch customers." }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email } = body;

        if (!name || !email) {
            return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
        }

        const newCustomer = await sql`
            INSERT INTO customers (name, email)
            VALUES (${name}, ${email})
            RETURNING *;
        `;

        return NextResponse.json(newCustomer);
    } catch (error) {
        console.error("Error creating customer:", error);
        console.error("Error details:", (error as any).message, (error as any).stack); // Enhanced error logging
        return NextResponse.json({ error: "Failed to create customer." }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const { id, name, email } = body;

        if (!id || !name || !email) {
            return NextResponse.json({ error: "ID, name, and email are required." }, { status: 400 });
        }

        const updatedCustomer = await sql`
            UPDATE customers
            SET name = ${name}, email = ${email}
            WHERE id = ${id}
            RETURNING *;
        `;

        return NextResponse.json(updatedCustomer);
    } catch (error) {
        console.error("Error updating customer:", error);
        console.error("Error details:", (error as any).message, (error as any).stack); // Enhanced error logging
        return NextResponse.json({ error: "Failed to update customer." }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "ID is required." }, { status: 400 });
        }

        await sql`
            DELETE FROM customers
            WHERE id = ${id};
        `;

        return NextResponse.json({ message: "Customer deleted successfully." });
    } catch (error) {
        console.error("Error deleting customer:", error);
        console.error("Error details:", (error as any).message, (error as any).stack); // Enhanced error logging
        return NextResponse.json({ error: "Failed to delete customer." }, { status: 500 });
    }
}