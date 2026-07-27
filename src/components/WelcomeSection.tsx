import React from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '../redux/store'

const WelcomeSection = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-slate-900 via-indigo-950/50 to-slate-900 p-6 sm:p-8 shadow-xl shadow-slate-950/40">
      <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-400">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Dashboard Overview
          </div>
          <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">{user?.name || 'User'}</span>! 👋
          </h1>
          <p className="mt-2 max-w-2xl text-sm sm:text-base text-slate-400">
            Here is a breakdown of your current projects, active task stats, and quick navigation links.
          </p>
        </div>
      </div>
    </div>
  )
}

export default WelcomeSection