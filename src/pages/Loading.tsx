import React from 'react'

const Loading = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center relative overflow-hidden bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,165,233,0.15),rgba(255,255,255,0))]">
      <div className="relative flex flex-col items-center">
        {/* Animated Glow Rings */}
        <div className="relative flex items-center justify-center">
          <div className="h-20 w-20 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-500 flex items-center justify-center text-slate-950 text-2xl font-bold shadow-xl shadow-cyan-500/30 animate-pulse">
            P
          </div>
          <div className="absolute -inset-4 rounded-3xl border border-cyan-500/30 animate-spin [animation-duration:3s]" />
        </div>

        <h1 className="mt-8 text-2xl font-bold tracking-tight text-white">
          Plan<span className="text-cyan-400">.io</span>
        </h1>
        
        <p className="mt-2 text-sm text-slate-400 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
          Loading your workspace...
        </p>
      </div>
    </div>
  )
}

export default Loading