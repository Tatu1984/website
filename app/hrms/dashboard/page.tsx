'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function HRMSDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('hrms_token');
    if (!token) {
      router.push('/hrms/login');
    } else {
      setIsAuthenticated(true);
      // TODO: Decode token and get user info
      // For now, using mock data
      setUser({
        name: 'Employee Name',
        email: 'employee@infinititechpartners.com',
        role: 'Employee',
      });
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('hrms_token');
    router.push('/');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Header */}
      <header className="bg-card/50 backdrop-blur-xl border-b border-border sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <span className="text-2xl font-bold text-white">∞</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">Infinititech HRMS</h1>
              <p className="text-xs text-muted-foreground">Employee Portal</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-muted-foreground">{user?.role}</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1400px] mx-auto px-8 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h2>
          <p className="text-muted-foreground">Access your employee information and services</p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Profile */}
          <div className="bg-card/50 backdrop-blur-xl border border-border rounded-2xl p-6 hover:shadow-lg transition-all hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">My Profile</h3>
            <p className="text-muted-foreground text-sm mb-4">View and update your personal information</p>
            <Link href="#" className="text-primary text-sm font-medium hover:underline">
              View Profile →
            </Link>
          </div>

          {/* Card 2: Attendance */}
          <div className="bg-card/50 backdrop-blur-xl border border-border rounded-2xl p-6 hover:shadow-lg transition-all hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
                <line x1="16" x2="16" y1="2" y2="6"/>
                <line x1="8" x2="8" y1="2" y2="6"/>
                <line x1="3" x2="21" y1="10" y2="10"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Attendance</h3>
            <p className="text-muted-foreground text-sm mb-4">Track your attendance and working hours</p>
            <Link href="#" className="text-primary text-sm font-medium hover:underline">
              View Attendance →
            </Link>
          </div>

          {/* Card 3: Leave Management */}
          <div className="bg-card/50 backdrop-blur-xl border border-border rounded-2xl p-6 hover:shadow-lg transition-all hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M8 2v4"/>
                <path d="M16 2v4"/>
                <rect width="18" height="18" x="3" y="4" rx="2"/>
                <path d="M3 10h18"/>
                <path d="m9 16 2 2 4-4"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Leave Management</h3>
            <p className="text-muted-foreground text-sm mb-4">Apply for leave and check balance</p>
            <Link href="#" className="text-primary text-sm font-medium hover:underline">
              Manage Leaves →
            </Link>
          </div>

          {/* Card 4: Payroll */}
          <div className="bg-card/50 backdrop-blur-xl border border-border rounded-2xl p-6 hover:shadow-lg transition-all hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <line x1="12" x2="12" y1="2" y2="22"/>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Payroll</h3>
            <p className="text-muted-foreground text-sm mb-4">View payslips and salary information</p>
            <Link href="#" className="text-primary text-sm font-medium hover:underline">
              View Payslips →
            </Link>
          </div>

          {/* Card 5: Documents */}
          <div className="bg-card/50 backdrop-blur-xl border border-border rounded-2xl p-6 hover:shadow-lg transition-all hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
                <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Documents</h3>
            <p className="text-muted-foreground text-sm mb-4">Access your employment documents</p>
            <Link href="#" className="text-primary text-sm font-medium hover:underline">
              View Documents →
            </Link>
          </div>

          {/* Card 6: Support */}
          <div className="bg-card/50 backdrop-blur-xl border border-border rounded-2xl p-6 hover:shadow-lg transition-all hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Support</h3>
            <p className="text-muted-foreground text-sm mb-4">Get help from HR department</p>
            <Link href="#" className="text-primary text-sm font-medium hover:underline">
              Contact Support →
            </Link>
          </div>
        </div>

        {/* TODO Note */}
        <div className="mt-12 bg-primary/10 border border-primary/30 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 16v-4"/>
                <path d="M12 8h.01"/>
              </svg>
            </div>
            <div>
              <h4 className="font-bold mb-2">Integration Required</h4>
              <p className="text-sm text-muted-foreground">
                This is a placeholder dashboard. To complete the integration, you need to:
              </p>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground list-disc list-inside">
                <li>Connect to your actual HRMS API endpoints</li>
                <li>Implement proper authentication and authorization</li>
                <li>Add real data fetching for each module</li>
                <li>Configure secure token management</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
