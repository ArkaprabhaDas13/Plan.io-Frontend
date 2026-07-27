import React, { useEffect, useState } from 'react'
import TaskComponent from '../components/Task/TaskComponent';
import { createTask, getAllTasks, deleteTask, editTask } from '../api/tasksApi';
import { useParams, useNavigate } from 'react-router-dom';
import { getOneProject } from '../api/projectsApi';

interface Task {
  _id: string;
  title: string;
  description: string;
  dueDate: Date;
  priority: string;
}

interface PayloadType {
  title: string;
  description: string;
}

interface ProjectDetails {
  _id?: string;
  name?: string;
  description?: string;
}

const Tasks = () => {
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [projectDetails, setProjectDetails] = useState<ProjectDetails | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!projectId) return;

    const getProjectDetails = async () => {
      try {
        const projectData = await getOneProject(projectId);
        setProjectDetails(projectData.data || projectData);
      } catch (err) {
        console.error("Error fetching project details:", err);
      }
    }

    const loadAllTasks = async () => {
      try {
        const tasks = await getAllTasks(projectId);
        setAllTasks(tasks.data || []);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    }

    getProjectDetails();
    loadAllTasks();
  }, [projectId])

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !projectId) return;
    try {
      setIsCreating(true);
      const payload = {
        title: title,
        description: description,
        dueDate: dueDate,
        projectId: projectId
      }
      await createTask(payload);
      setTitle("");
      setDescription("");
      setDueDate("");
      const tasksData = await getAllTasks(projectId);
      setAllTasks(tasksData.data || []);
    } catch (err) {
      console.error("Error creating task:", err);
    } finally {
      setIsCreating(false);
    }
  }

  const handleEditTask = async (payload: PayloadType, taskId: string) => {
    try {
      const data = await editTask(payload, taskId);
      const updatedList = allTasks.map((item) => (
        item._id === taskId ? data : item
      ))
      setAllTasks(updatedList);
    } catch (err) {
      console.error("Error editing task:", err);
    }
  }

  const handleDelete = async (itemId: string) => {
    try {
      await deleteTask(itemId);
      const updatedTaskList = allTasks.filter((item) => item._id !== itemId);
      setAllTasks(updatedTaskList);
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,165,233,0.15),rgba(255,255,255,0))]">
      {/* Top Navbar */}
      <nav className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-900/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/projects')}
              className="flex items-center justify-center h-9 w-9 rounded-xl border border-slate-800 bg-slate-900 text-slate-400 hover:text-white hover:border-slate-700 transition cursor-pointer"
              title="Back to Projects"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-xl font-bold tracking-tight text-white">
              Plan<span className="text-cyan-400">.io</span>
            </span>
          </div>

          <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1.5 rounded-full">
            Project Tasks
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 space-y-8 sm:px-6 lg:px-8">
        {/* Project Header Banner */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70 p-6 sm:p-8 shadow-xl backdrop-blur-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/80 px-3 py-1 text-xs font-medium text-slate-300">
                <span>Project:</span>
                <span className="text-cyan-400 font-semibold">{projectDetails?.name || "Loading project..."}</span>
              </div>
              <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white">
                {projectDetails?.name ? `${projectDetails.name} Tasks` : 'Task Management'}
              </h1>
              {projectDetails?.description && (
                <p className="mt-2 text-sm text-slate-400 max-w-2xl">
                  {projectDetails.description}
                </p>
              )}
            </div>

            <div className="shrink-0 self-start sm:self-auto">
              <span className="inline-flex items-center gap-2 rounded-2xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-400">
                {allTasks.length} {allTasks.length === 1 ? 'Task' : 'Tasks'} Total
              </span>
            </div>
          </div>
        </div>

        {/* Create Task Form */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-white">
              Add New Task
            </h2>
          </div>

          <form onSubmit={handleCreateTask} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="title" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Task Title
              </label>
              <input
                type="text"
                id="title"
                placeholder="e.g. Design homepage hero"
                value={title}
                required
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Description
              </label>
              <input
                type="text"
                id="description"
                placeholder="Task details & requirements..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30"
              />
            </div>

            <div className="flex items-end gap-3">
              <div className="w-full">
                <label htmlFor="dueDate" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Due Date
                </label>
                <input
                  type="date"
                  id="dueDate"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-3 py-2 text-sm text-white outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30"
                />
              </div>

              <button
                type="submit"
                disabled={isCreating || !title.trim()}
                className="shrink-0 rounded-xl bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-lg shadow-cyan-500/20"
              >
                {isCreating ? 'Adding...' : '+ Add'}
              </button>
            </div>
          </form>
        </div>

        {/* Tasks List */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Task List
          </h2>

          {allTasks.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-slate-900/40 p-12 text-center backdrop-blur-xl">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-800/80 text-slate-400 border border-slate-700/60 mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white">No tasks created yet</h3>
              <p className="mt-1 text-sm text-slate-400 max-w-sm mx-auto">
                Add your first task above to track progress and stay organized.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {allTasks.map((item) => (
                <TaskComponent
                  key={item._id}
                  data={item}
                  onDelete={handleDelete}
                  onEdit={handleEditTask}
                  projectId={projectId}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default Tasks