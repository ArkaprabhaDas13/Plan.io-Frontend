import React, { useState } from 'react'
import { loginApi } from '../api/authApi';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../redux/store';
import { loginSuccess } from '../redux/authSlice';
import type { RootState } from '../redux/store'
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const user = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try{
      const response = await loginApi(email, password);
      console.log("Login response = ", response);
      // Save user details to Local Storage
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.token);
      // Populate the REDUX STORE
      dispatch(loginSuccess({
        user: response.data.user,
        token: response.data.token
      }))
      if(response.data.user)
      {
        navigate("/dashboard");
      }
      else
      {
        navigate("/login");
      }
    }catch(err){
      if(err instanceof Error)
      {
        console.log(err.message);
      }
    }
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.2),_transparent_40%),linear-gradient(135deg,_#020617,_#111827)] px-4 py-10 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70 shadow-2xl shadow-slate-950/50 backdrop-blur-xl">
        <div className="hidden w-1/2 flex-col justify-between bg-gradient-to-br from-cyan-500 via-sky-600 to-indigo-700 p-10 lg:flex">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-100">Plan.io</p>
            <h1 className="mt-6 text-4xl font-semibold leading-tight text-white">
              Welcome back to your workspace
            </h1>
            <p className="mt-4 text-lg text-cyan-50/90">
              Sign in to manage projects, tasks, and collaboration in one place.
            </p>
          </div>

          <div className="rounded-2xl border border-white/20 bg-white/10 p-4 text-sm text-cyan-50">
            <p className="font-medium">Why teams love Plan.io</p>
            <ul className="mt-2 space-y-2 text-cyan-100/90">
              <li>• Track tasks without losing context</li>
              <li>• Stay aligned with your team in real time</li>
              <li>• Keep every project moving forward</li>
            </ul>
          </div>
        </div>

        <div className="flex w-full flex-col justify-center p-8 sm:p-10 lg:w-1/2 lg:p-12">
          <div className="mb-8 lg:hidden">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">Plan.io</p>
            <h1 className="mt-2 text-3xl font-semibold text-white">Sign in</h1>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-white">Login to your account</h2>
            <p className="mt-2 text-sm text-slate-400">
              Enter your credentials to continue.
            </p>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30"
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
                placeholder="••••••••"
                className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              Login
            </button>
          </form>

          <div className="mt-6 flex items-center justify-between text-sm text-slate-400">
            <button
              type="button"
              onClick={() => console.log(user, token, isAuthenticated)}
              className="transition hover:text-cyan-400"
            >
              Show auth details
            </button>
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="font-medium text-cyan-400 transition hover:text-cyan-300"
            >
              Create account
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login