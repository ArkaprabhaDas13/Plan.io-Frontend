import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getOneTask } from '../../api/tasksApi';
import TaskComments from './TaskComments';

interface Task {
  createdBy: string;
  _id: string;
  title: string;
  description: string;
  dueDate: Date;
  priority: string;
}

const SelectedTask = () => {
  const { projectId, taskId } = useParams<{ projectId: string, taskId: string }>();
  const [taskData, setTaskData] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTaskData = async () => {
      if (!taskId) {
        console.error("Task Id missing");
        setLoading(false);
        return;
      }
      try {
        const response = await getOneTask(taskId);
        if (response) {
          setTaskData(response.data || response);
        }
      } catch (err) {
        console.error("Error fetching task data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchTaskData();
  }, [taskId])

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,165,233,0.15),rgba(255,255,255,0))]">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-900/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(projectId ? `/projects/${projectId}/tasks` : '/projects')}
              className="flex items-center justify-center h-9 w-9 rounded-xl border border-slate-800 bg-slate-900 text-slate-400 hover:text-white hover:border-slate-700 transition cursor-pointer"
              title="Back to Tasks"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-xl font-bold tracking-tight text-white">
              Plan<span className="text-cyan-400">.io</span>
            </span>
          </div>

          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-full">
            Task Details
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-4 py-8 space-y-8 sm:px-6 lg:px-8">
        {loading ? (
          <div className="p-12 text-center text-slate-400">Loading task details...</div>
        ) : taskData ? (
          <div className="space-y-6">
            {/* Task Card */}
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70 p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">Active Task</span>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{taskData.title}</h1>
                </div>
              </div>

              <div className="pt-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Description</h3>
                <p className="text-slate-300 text-sm leading-relaxed bg-slate-800/40 p-4 rounded-2xl border border-slate-800">
                  {taskData.description || 'No description provided.'}
                </p>
              </div>
            </div>

            {/* Task Comments Section */}
            <TaskComments task={taskData} />
          </div>
        ) : (
          <div className="p-12 text-center text-slate-400">Task not found.</div>
        )}
      </main>
    </div>
  )
}

export default SelectedTask