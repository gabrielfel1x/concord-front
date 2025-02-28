import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
    navigate('/chat', { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0E0E10] px-4">
      <div className="max-w-xl w-full space-y-8 md:bg-[#18181B] bg-transparent p-4 md:p-24 rounded-sm shadow-xl">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-zinc-100">We Missed You!</h2>
          <p className="text-sm text-zinc-400">Please sign in to your account</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="peer w-full px-3 pt-5 pb-2 bg-zinc-700 border-none border-zinc-600 rounded-sm text-zinc-100 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#34AB70] focus:border-transparent"
                placeholder="Email address"
              />
              <label
                htmlFor="email"
                className="absolute left-3 top-2 text-sm text-zinc-400 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-500 peer-focus:top-2 peer-focus:text-sm peer-focus:text-zinc-300"
              >
                Email address
              </label>
            </div>
            <div className="relative">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="peer w-full px-3 pt-5 pb-2 bg-zinc-700 border-none border-zinc-600 rounded-sm text-zinc-100 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#34AB70] focus:border-transparent"
                placeholder="Password"
              />
              <label
                htmlFor="password"
                className="absolute left-3 top-2 text-sm text-zinc-400 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-500 peer-focus:top-2 peer-focus:text-sm peer-focus:text-zinc-300"
              >
                Password
              </label>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-4 px-4 border border-transparent rounded-sm text-sm font-medium text-white bg-[#34AB70] hover:bg-[#34AB70]/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#34AB70]"
            >
              Sign in
            </button>
            <Link
              to="/register"
              className="mt-4 block text-center text-sm text-[#34AB70] hover:text-[#34AB70]/80"
            >
              Don't have an account? Create one
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
