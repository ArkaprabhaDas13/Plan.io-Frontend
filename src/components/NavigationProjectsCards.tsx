import React from 'react'
import { useNavigate } from 'react-router-dom'

const NavigationProjectsCards = () => {
  const navigate = useNavigate();

  const handleNavigationClick = () => {
    navigate(`/projects`);
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-xl backdrop-blur-xl transition duration-300 hover:border-indigo-500/30 flex flex-col justify-between space-y-5">
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white">All Projects</h3>
          </div>
          <span className="text-xs font-medium text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">
            Overview
          </span>
        </div>

        <p className="mt-3 text-sm text-slate-400">
          Browse, create, and organize all projects within your team or individual workspace.
        </p>

        <div className="mt-4 rounded-xl border border-slate-800 bg-slate-800/40 p-3.5 text-xs text-slate-300">
          💡 Easily manage project settings, team members, and milestones in one central place.
        </div>
      </div>

      <button
        onClick={handleNavigationClick}
        className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition duration-200 hover:bg-indigo-500 active:scale-[0.99] cursor-pointer shadow-lg shadow-indigo-600/20"
      >
        <span>Explore All Projects</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </button>
    </div>
  )
}

export default NavigationProjectsCards