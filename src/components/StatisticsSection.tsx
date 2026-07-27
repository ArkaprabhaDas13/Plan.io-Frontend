import React from 'react'

const StatisticsSection = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-white tracking-tight flex items-center gap-2">
        <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        Workspace Statistics
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Total Tasks Card */}
        <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 p-5 shadow-lg backdrop-blur-xl transition duration-300 hover:border-cyan-500/40 hover:bg-slate-900/80">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Tasks</p>
              <h3 className="mt-2 text-3xl font-extrabold text-white">0</h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:scale-110 transition duration-300">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-slate-400">
            <span className="text-cyan-400 font-medium mr-1">Active</span> across all projects
          </div>
        </div>

        {/* Completed Tasks Card */}
        <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 p-5 shadow-lg backdrop-blur-xl transition duration-300 hover:border-emerald-500/40 hover:bg-slate-900/80">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Completed Tasks</p>
              <h3 className="mt-2 text-3xl font-extrabold text-white">0</h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:scale-110 transition duration-300">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-slate-400">
            <span className="text-emerald-400 font-medium mr-1">Finished</span> task items
          </div>
        </div>

        {/* Total Projects Card */}
        <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 p-5 shadow-lg backdrop-blur-xl transition duration-300 hover:border-indigo-500/40 hover:bg-slate-900/80">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Projects</p>
              <h3 className="mt-2 text-3xl font-extrabold text-white">0</h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 group-hover:scale-110 transition duration-300">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-slate-400">
            <span className="text-indigo-400 font-medium mr-1">Workspace</span> repositories
          </div>
        </div>
      </div>
    </div>
  )
}

export default StatisticsSection