import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { registerApi } from '../api/authApi';

const Register = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsLoading(true);
    try {
      const response = await registerApi(name, email, password);
      console.log(response);
      navigate('/login');
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
        setErrorMsg(err.message);
      } else {
        setErrorMsg("Registration failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,_rgba(56,189,248,0.2),_transparent_40%),linear-gradient(135deg,_#020617,_#111827)] px-4 py-10 text-slate-100 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="mx-auto flex w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70 shadow-2xl shadow-slate-950/50 backdrop-blur-xl">
        {/* Left Side Banner (Visible on large screens) */}
        <div className="hidden w-1/2 flex-col justify-between bg-gradient-to-br from-cyan-500 via-sky-600 to-indigo-700 p-10 lg:flex">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-100">Plan.io</p>
            <h1 className="mt-6 text-4xl font-semibold leading-tight text-white">
              Start organizing your projects today
            </h1>
            <p className="mt-4 text-lg text-cyan-50/90">
              Create your account to unlock powerful task management and seamless team collaboration.
            </p>
          </div>

          <div className="rounded-2xl border border-white/20 bg-white/10 p-5 text-sm text-cyan-50 backdrop-blur-md">
            <p className="font-semibold text-base mb-2">What you'll get with Plan.io</p>
            <ul className="space-y-2.5 text-cyan-100/90">
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-cyan-200 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Intuitive project & task dashboards</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-cyan-200 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Real-time status updates & assignments</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-cyan-200 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Secure access & centralized workspace</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="flex w-full flex-col justify-center p-8 sm:p-10 lg:w-1/2 lg:p-12">
          <div className="mb-6 lg:hidden">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">Plan.io</p>
            <h1 className="mt-2 text-3xl font-semibold text-white">Create Account</h1>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-white">Sign up for Plan.io</h2>
            <p className="mt-2 text-sm text-slate-400">
              Fill in your details below to get started with your new account.
            </p>
          </div>

          {errorMsg && (
            <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-3.5 text-sm text-red-300">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300" htmlFor="name">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                required
                placeholder="John Doe"
                className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition duration-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                required
                placeholder="you@example.com"
                className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition duration-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                required
                placeholder="••••••••"
                className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition duration-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-slate-950 transition duration-200 hover:bg-cyan-400 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-lg shadow-cyan-500/20"
            >
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>

          <div className="mt-8 flex items-center justify-center text-sm text-slate-400">
            <span>Already have an account?</span>
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="ml-2 font-medium text-cyan-400 transition hover:text-cyan-300 hover:underline cursor-pointer"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register