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
        const customers = await sql`SELECT * FROM customers ORDER BY id DESC;`;
        return NextResponse.json(customers || []);
    } catch (error) {
        console.error("Error fetching customers:", error);
        return NextResponse.json(
            { error: "Failed to fetch customers", details: error instanceof Error ? error.message : String(error) }, 
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email } = body;

        // Validate required fields
        if (!name || !email) {
            return NextResponse.json(
                { error: "Name and email are required" }, 
                { status: 400 }
            );
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Invalid email format" }, 
                { status: 400 }
            );
        }

        // Trim whitespace
        const trimmedName = name.trim();
        const trimmedEmail = email.trim().toLowerCase();

        if (trimmedName.length === 0 || trimmedEmail.length === 0) {
            return NextResponse.json(
                { error: "Name and email cannot be empty" }, 
                { status: 400 }
            );
        }

        const newCustomer = await sql`
            INSERT INTO customers (name, email)
            VALUES (${trimmedName}, ${trimmedEmail})
            RETURNING *;
        `;

        if (!newCustomer || newCustomer.length === 0) {
            return NextResponse.json(
                { error: "Failed to create customer" }, 
                { status: 500 }
            );
        }

        return NextResponse.json(newCustomer[0], { status: 201 });
    } catch (error) {
        console.error("Error creating customer:", error);
        
        // Handle unique constraint violations
        if (error instanceof Error && error.message.includes('unique')) {
            return NextResponse.json(
                { error: "A customer with this email already exists" }, 
                { status: 409 }
            );
        }
        
        return NextResponse.json(
            { error: "Failed to create customer", details: error instanceof Error ? error.message : String(error) }, 
            { status: 500 }
        );
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const { id, name, email } = body;

        if (!id || !name || !email) {
            return NextResponse.json(
                { error: "ID, name, and email are required" }, 
                { status: 400 }
            );
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Invalid email format" }, 
                { status: 400 }
            );
        }

        const trimmedName = name.trim();
        const trimmedEmail = email.trim().toLowerCase();

        const updatedCustomer = await sql`
            UPDATE customers
            SET name = ${trimmedName}, email = ${trimmedEmail}
            WHERE id = ${id}
            RETURNING *;
        `;

        if (!updatedCustomer || updatedCustomer.length === 0) {
            return NextResponse.json(
                { error: "Customer not found" }, 
                { status: 404 }
            );
        }

        return NextResponse.json(updatedCustomer[0]);
    } catch (error) {
        console.error("Error updating customer:", error);
        return NextResponse.json(
            { error: "Failed to update customer", details: error instanceof Error ? error.message : String(error) }, 
            { status: 500 }
        );
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json(
                { error: "ID is required" }, 
                { status: 400 }
            );
        }

        const result = await sql`
            DELETE FROM customers
            WHERE id = ${id}
            RETURNING id;
        `;

        if (!result || result.length === 0) {
            return NextResponse.json(
                { error: "Customer not found" }, 
                { status: 404 }
            );
        }

        return NextResponse.json({ message: "Customer deleted successfully", id });
    } catch (error) {
        console.error("Error deleting customer:", error);
        return NextResponse.json(
            { error: "Failed to delete customer", details: error instanceof Error ? error.message : String(error) }, 
            { status: 500 }
        );
    }
}