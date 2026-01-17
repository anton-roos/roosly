import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
import RooslyLogo from "@/components/RooslyLogo";

export default async function DashboardPage() {
  const session = await auth();

  if (!session || session.user.role !== "admin") {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      {/* Header */}
      <header className="bg-black/40 backdrop-blur-lg border-b border-gray-800/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <RooslyLogo />
              <nav className="hidden md:flex items-center space-x-1">
                <Link 
                  href="/dashboard"
                  className="px-4 py-2 text-white font-medium bg-[#FF033E]/10 rounded-lg"
                >
                  Dashboard
                </Link>
                <Link 
                  href="/customers"
                  className="px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all"
                >
                  Customers
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden sm:block text-right">
                <p className="text-xs text-gray-500">Logged in as</p>
                <p className="text-sm text-white font-medium">{session.user.email}</p>
              </div>
              <LogoutButton />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <div className="flex items-center space-x-4 mb-4">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-[#FF033E] to-pink-600 flex items-center justify-center shadow-lg shadow-[#FF033E]/20">
              <span className="text-2xl">👋</span>
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-1">
                Welcome back, {session.user.name?.split(' ')[0] || "Admin"}!
              </h1>
              <p className="text-gray-400 text-lg">
                Here's what's happening with your platform today
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
          <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-6 hover:border-gray-700 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div className="text-xs text-gray-500 bg-gray-800/50 px-2 py-1 rounded-full">
                Coming soon
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-2">Total Users</p>
            <p className="text-3xl font-bold text-white mb-1">-</p>
            <p className="text-xs text-gray-500">Registered accounts</p>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-6 hover:border-gray-700 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-xs text-green-400 bg-green-500/10 px-2 py-1 rounded-full">
                Active
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-2">Active Sessions</p>
            <p className="text-3xl font-bold text-white mb-1">1</p>
            <p className="text-xs text-gray-500">Currently online</p>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-6 hover:border-gray-700 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="text-xs text-gray-500 bg-gray-800/50 px-2 py-1 rounded-full">
                Coming soon
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-2">Customers</p>
            <p className="text-3xl font-bold text-white mb-1">-</p>
            <p className="text-xs text-gray-500">Total registered</p>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-6 hover:border-gray-700 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-xl bg-[#FF033E]/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-[#FF033E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="text-xs text-green-400 bg-green-500/10 px-2 py-1 rounded-full">
                Healthy
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-2">System Status</p>
            <p className="text-3xl font-bold text-green-400 mb-1">100%</p>
            <p className="text-xs text-gray-500">All systems operational</p>
          </div>
        </div>

        {/* Main Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Customers Card */}
          <Link href="/customers" className="group">
            <div className="relative bg-gradient-to-br from-gray-900 to-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-8 hover:border-[#FF033E]/50 hover:shadow-xl hover:shadow-[#FF033E]/10 transition-all duration-300 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF033E]/5 rounded-full blur-3xl group-hover:bg-[#FF033E]/10 transition-all"></div>
              <div className="relative">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-[#FF033E] to-pink-600 flex items-center justify-center mb-6 shadow-lg shadow-[#FF033E]/20 group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#FF033E] transition-colors">
                  Customers
                </h3>
                <p className="text-gray-400 mb-4 leading-relaxed">
                  View and manage all customer records. Add, edit, or delete customer information.
                </p>
                <div className="flex items-center text-[#FF033E] font-medium group-hover:translate-x-2 transition-transform">
                  <span>Manage customers</span>
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>

          {/* Analytics Card */}
          <div className="relative bg-gradient-to-br from-gray-900 to-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-8 opacity-60 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl"></div>
            <div className="relative">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Analytics</h3>
              <p className="text-gray-400 mb-4 leading-relaxed">
                View detailed analytics and insights about your platform performance.
              </p>
              <div className="inline-flex items-center text-gray-500 text-sm bg-gray-800/50 px-3 py-1.5 rounded-lg">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Coming soon
              </div>
            </div>
          </div>

          {/* Settings Card */}
          <div className="relative bg-gradient-to-br from-gray-900 to-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-8 opacity-60 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-3xl"></div>
            <div className="relative">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mb-6 shadow-lg shadow-green-500/20">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Settings</h3>
              <p className="text-gray-400 mb-4 leading-relaxed">
                Configure your application settings and preferences.
              </p>
              <div className="inline-flex items-center text-gray-500 text-sm bg-gray-800/50 px-3 py-1.5 rounded-lg">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Coming soon
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <svg className="w-6 h-6 mr-3 text-[#FF033E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/customers" className="group flex items-center space-x-3 p-4 bg-gray-800/30 hover:bg-gray-800/50 rounded-xl transition-all border border-transparent hover:border-gray-700">
              <div className="h-10 w-10 rounded-lg bg-[#FF033E]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 text-[#FF033E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <span className="text-gray-300 group-hover:text-white font-medium transition-colors">Add Customer</span>
            </Link>
            
            <button disabled className="flex items-center space-x-3 p-4 bg-gray-800/20 rounded-xl opacity-50 cursor-not-allowed">
              <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span className="text-gray-500 font-medium">View Reports</span>
            </button>
            
            <button disabled className="flex items-center space-x-3 p-4 bg-gray-800/20 rounded-xl opacity-50 cursor-not-allowed">
              <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <span className="text-gray-500 font-medium">Notifications</span>
            </button>
            
            <button disabled className="flex items-center space-x-3 p-4 bg-gray-800/20 rounded-xl opacity-50 cursor-not-allowed">
              <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <span className="text-gray-500 font-medium">Settings</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
