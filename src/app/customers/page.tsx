"use client";

import { useState, useEffect } from "react";

interface Customer {
    id: string;
    name: string;
    email: string;
}

export default function CustomersPage() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [form, setForm] = useState<Customer>({ id: "", name: "", email: "" });

    useEffect(() => {
        fetch("/api/customers")
            .then((res) => res.json())
            .then(setCustomers);
    }, []);

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        const method = form.id ? "PUT" : "POST";
        const response = await fetch("/api/customers", {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        if (response.ok) {
            const updatedCustomer = await response.json();
            setCustomers((prev) => {
                if (method === "POST") {
                    return [...prev, updatedCustomer];
                } else {
                    return prev.map((c) => (c.id === updatedCustomer.id ? updatedCustomer : c));
                }
            });
            setForm({ id: "", name: "", email: "" });
        }
    };

    const handleDelete = async (id: string) => {
        const response = await fetch(`/api/customers?id=${id}`, { method: "DELETE" });
        if (response.ok) {
            setCustomers((prev) => prev.filter((c) => c.id !== id));
        }
    };

    return (
        <div>
            <h1>Customers</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <button type="submit">{form.id ? "Update" : "Add"} Customer</button>
            </form>

            <ul>
                {customers.map((customer) => (
                    <li key={customer.id}>
                        {customer.name} ({customer.email})
                        <button onClick={() => setForm(customer)}>Edit</button>
                        <button onClick={() => handleDelete(customer.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}