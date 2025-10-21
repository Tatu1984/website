'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function HRMSLogin() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // TODO: Replace with your actual HRMS authentication endpoint
      const response = await fetch('/api/hrms/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        // Store token in localStorage or cookie
        localStorage.setItem('hrms_token', data.token);
        // Redirect to HRMS dashboard
        router.push('/hrms/dashboard');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-[20%] right-[15%] w-[400px] h-[400px] rounded-full opacity-20 blur-[100px]"
           style={{ background: 'radial-gradient(circle, #FF9966 0%, transparent 70%)' }}></div>
      <div className="absolute bottom-[20%] left-[15%] w-[500px] h-[500px] rounded-full opacity-15 blur-[120px]"
           style={{ background: 'radial-gradient(circle, #FF6B35 0%, transparent 70%)' }}></div>

      <div className="relative z-10 w-full max-w-md px-8">
        {/* Back to home link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-foreground/60 hover:text-foreground mb-8 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m12 19-7-7 7-7"/>
            <path d="M19 12H5"/>
          </svg>
          Back to Home
        </Link>

        {/* Login card */}
        <div className="bg-card/50 backdrop-blur-xl border border-border rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary mb-4">
              <span className="text-3xl font-bold text-white">∞</span>
            </div>
            <h1 className="text-3xl font-bold mb-2">HRMS Login</h1>
            <p className="text-muted-foreground">Access your employee portal</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-destructive/10 border border-destructive/50 text-destructive px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                placeholder="you@company.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-border" />
                <span className="text-muted-foreground">Remember me</span>
              </label>
              <a href="#" className="text-primary hover:text-primary/80 transition-colors">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-[#FF9966] to-[#FF6B35] text-white font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,153,102,0.4)] disabled:opacity-50 disabled:cursor-not-allowed relative group overflow-hidden"
            >
              <span className="relative z-10">
                {isLoading ? 'Signing in...' : 'Sign In'}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#FFB088] to-[#FF8547] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>Need help? Contact your HR administrator</p>
          </div>
        </div>
      </div>
    </div>
  );
}
