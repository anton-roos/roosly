"use client";

import { useState, useEffect, useCallback } from "react";

interface Customer {
    id: string;
    name: string;
    email: string;
}

interface FormState extends Omit<Customer, 'id'> {
    id: string;
}

export default function CustomersPage() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [form, setForm] = useState<FormState>({ id: "", name: "", email: "" });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const res = await fetch("/api/customers");
                
                if (!res.ok) {
                    throw new Error('Failed to fetch customers');
                }
                
                const data = await res.json();
                setCustomers(Array.isArray(data) ? data : []);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
                console.error('Error fetching customers:', err);
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchCustomers();
    }, []);

    const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!form.name.trim() || !form.email.trim()) {
            setError('Name and email are required');
            return;
        }

        setIsSubmitting(true);
        setError(null);
        
        try {
            const method = form.id ? "PUT" : "POST";
            const response = await fetch("/api/customers", {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (!response.ok) {
                throw new Error(`Failed to ${form.id ? 'update' : 'create'} customer`);
            }

            const updatedCustomer = await response.json();

            if (!updatedCustomer.id || !updatedCustomer.name || !updatedCustomer.email) {
                throw new Error('Invalid customer data received');
            }

            setCustomers((prev) => {
                if (method === "POST") {
                    return [...prev, updatedCustomer];
                } else {
                    return prev.map((c) => (c.id === updatedCustomer.id ? updatedCustomer : c));
                }
            });
            
            setForm({ id: "", name: "", email: "" });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            console.error('Error submitting form:', err);
        } finally {
            setIsSubmitting(false);
        }
    }, [form]);

    const handleDelete = useCallback(async (id: string) => {
        if (!confirm('Are you sure you want to delete this customer?')) {
            return;
        }
        
        try {
            const response = await fetch(`/api/customers?id=${id}`, { method: "DELETE" });
            
            if (!response.ok) {
                throw new Error('Failed to delete customer');
            }
            
            setCustomers((prev) => prev.filter((c) => c.id !== id));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to delete customer');
            console.error('Error deleting customer:', err);
        }
    }, []);

    const handleEdit = useCallback((customer: Customer) => {
        setForm(customer);
    }, []);

    if (isLoading) {
        return (
            <div style={{ padding: '2rem', textAlign: 'center' }}>
                <h1>Customers</h1>
                <p>Loading customers...</p>
            </div>
        );
    }

    return (
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <h1>Customers</h1>
            
            {error && (
                <div style={{ 
                    padding: '1rem', 
                    marginBottom: '1rem', 
                    backgroundColor: '#fee2e2', 
                    color: '#991b1b',
                    borderRadius: '4px'
                }}>
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} style={{ marginBottom: '2rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <input
                    type="text"
                    placeholder="Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    style={{ padding: '0.5rem', flex: '1', minWidth: '200px' }}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    style={{ padding: '0.5rem', flex: '1', minWidth: '200px' }}
                />
                <button 
                    type="submit" 
                    disabled={isSubmitting}
                    style={{ padding: '0.5rem 1rem', cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
                >
                    {isSubmitting ? 'Saving...' : (form.id ? "Update" : "Add") + " Customer"}
                </button>
                {form.id && (
                    <button 
                        type="button"
                        onClick={() => setForm({ id: "", name: "", email: "" })}
                        style={{ padding: '0.5rem 1rem' }}
                    >
                        Cancel
                    </button>
                )}
            </form>

            {customers.length === 0 ? (
                <p>No customers found. Add one above!</p>
            ) : (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {customers.map((customer) => (
                        <li 
                            key={customer.id} 
                            style={{ 
                                padding: '1rem', 
                                marginBottom: '0.5rem', 
                                backgroundColor: '#f9fafb',
                                borderRadius: '4px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}
                        >
                            <span>
                                <strong>{customer.name}</strong> ({customer.email})
                            </span>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button 
                                    onClick={() => handleEdit(customer)}
                                    style={{ padding: '0.25rem 0.75rem', cursor: 'pointer' }}
                                >
                                    Edit
                                </button>
                                <button 
                                    onClick={() => handleDelete(customer.id)}
                                    style={{ padding: '0.25rem 0.75rem', cursor: 'pointer', backgroundColor: '#fee2e2', color: '#991b1b' }}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}