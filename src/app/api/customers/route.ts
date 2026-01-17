import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

// Ensure DATABASE_URL is defined
if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL environment variable is not set.");
}

const sql = neon(process.env.DATABASE_URL!); // Use non-null assertion operator

export async function GET() {
    const customers = await sql`SELECT * FROM customers;`;
    return NextResponse.json(customers);
}

export async function POST(request: Request) {
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
}

export async function PUT(request: Request) {
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
}

export async function DELETE(request: Request) {
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
}