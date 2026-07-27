import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../redux/store'
import { logout } from '../redux/authSlice';
import NavigationSection from '../components/NavigationSection'
import StatisticsSection from '../components/StatisticsSection'
import WelcomeSection from '../components/WelcomeSection'

const Dashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = async () => {
    dispatch(logout());
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  const getInitials = (name?: string) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,165,233,0.15),rgba(255,255,255,0))]">
      {/* Top Navbar */}
      <nav className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-900/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20">
              P
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Plan<span className="text-cyan-400">.io</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 rounded-full border border-slate-800 bg-slate-900/90 px-3 py-1.5 shadow-inner">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500/20 font-semibold text-cyan-400 text-xs border border-cyan-500/30">
                {getInitials(user?.name)}
              </div>
              <span className="hidden text-sm font-medium text-slate-200 sm:inline-block">
                {user?.name || 'User'}
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-xl border border-slate-700/80 bg-slate-800/60 px-3.5 py-2 text-xs font-semibold text-slate-300 transition duration-200 hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400 cursor-pointer"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Dashboard Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 space-y-8 sm:px-6 lg:px-8">
        <WelcomeSection />
        <StatisticsSection />
        <NavigationSection />
      </main>
    </div>
  )
}

export default Dashboard;