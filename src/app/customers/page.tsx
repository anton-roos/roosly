"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
import RooslyLogo from "@/components/RooslyLogo";

interface Customer {
    id: string;
    name: string;
    email: string;
}

interface FormState extends Omit<Customer, 'id'> {
    id: string;
}

export default function CustomersPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [form, setForm] = useState<FormState>({ id: "", name: "", email: "" });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Redirect if not authenticated
    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, router]);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const res = await fetch("/api/customers");
                
                if (!res.ok) {
                    if (res.status === 401 || res.status === 403) {
                        router.push("/login");
                        return;
                    }
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
        
        if (status === "authenticated") {
            fetchCustomers();
        }
    }, [status, router]);

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

    if (isLoading || status === "loading") {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF033E] mx-auto mb-4"></div>
                    <p className="text-gray-400">Loading...</p>
                </div>
            </div>
        );
    }

    if (status === "unauthenticated") {
        return null;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
            {/* Header */}
            <header className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <RooslyLogo />
                            <nav className="flex space-x-4">
                                <Link 
                                    href="/dashboard"
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    Dashboard
                                </Link>
                                <Link 
                                    href="/customers"
                                    className="text-white font-medium"
                                >
                                    Customers
                                </Link>
                            </nav>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="text-right">
                                <p className="text-sm text-gray-400">Logged in as</p>
                                <p className="text-white font-medium">{session?.user?.email}</p>
                            </div>
                            <LogoutButton />
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Customers</h1>
                    <p className="text-gray-400">Manage your customer database</p>
                </div>
            
            {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500 text-red-500 rounded-lg">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="mb-8 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                            Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            placeholder="John Doe"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            required
                            className="w-full px-4 py-3 border border-gray-700 bg-gray-800/50 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF033E] focus:border-transparent transition-all"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            required
                            className="w-full px-4 py-3 border border-gray-700 bg-gray-800/50 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF033E] focus:border-transparent transition-all"
                        />
                    </div>
                </div>
                <div className="flex gap-3">
                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="px-6 py-3 bg-[#FF033E] hover:bg-[#E0022E] text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#FF033E] focus:ring-offset-2 focus:ring-offset-gray-900"
                    >
                        {isSubmitting ? 'Saving...' : (form.id ? "Update" : "Add") + " Customer"}
                    </button>
                    {form.id && (
                        <button 
                            type="button"
                            onClick={() => setForm({ id: "", name: "", email: "" })}
                            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            {customers.length === 0 ? (
                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-12 text-center">
                    <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <p className="text-gray-400">No customers found. Add one using the form above!</p>
                </div>
            ) : (
                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-800/50">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Name</th>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Email</th>
                                <th className="px-6 py-4 text-right text-sm font-medium text-gray-300">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {customers.map((customer) => (
                                <tr 
                                    key={customer.id}
                                    className="hover:bg-gray-800/30 transition-colors"
                                >
                                    <td className="px-6 py-4 text-white font-medium">{customer.name}</td>
                                    <td className="px-6 py-4 text-gray-400">{customer.email}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button 
                                                onClick={() => handleEdit(customer)}
                                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                Edit
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(customer.id)}
                                                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            </main>
        </div>
    );
}