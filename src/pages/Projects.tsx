import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProjectComponent from '../components/Project/ProjectComponent'
import { createProject } from '../api/projectsApi'
import { getAllProjects } from '../api/projectsApi'
import { deleteProject } from '../api/projectsApi'
import { editProject } from '../api/projectsApi'

interface Project {
  _id: string;
  name: string;
  description: string;
  groupId: string;
  createdBy: string;
  status: string;
}

interface ProjectPayload {
  name: string,
  description: string
}

const Projects = () => {
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isCreating, setIsCreating] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    const handleGetProjects = async () => {
      try {
        const projects = await getAllProjects();
        setAllProjects(projects.data || []);
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    }
    handleGetProjects();
  }, [])

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    try {
      setIsCreating(true);
      const payload = { name: name, description: description };
      await createProject(payload);
      setName("");
      setDescription("");
      const updatedProjects = await getAllProjects();
      setAllProjects(updatedProjects.data || []);
    } catch (err) {
      console.error("Error creating project:", err);
    } finally {
      setIsCreating(false);
    }
  }

  const handleDeleteProject = async (projectId: string) => {
    try {
      await deleteProject(projectId);
      const updatedProjects = allProjects.filter((item) => item._id !== projectId);
      setAllProjects(updatedProjects);
    } catch (err) {
      console.error("Error deleting project:", err);
    }
  }

  const handleEditProject = async (projectId: string, payload: ProjectPayload) => {
    try {
      const updatedProject = await editProject(projectId, payload);
      const newProjects = allProjects.map((project) => (
        project._id === projectId ? updatedProject : project
      ));
      setAllProjects(newProjects);
    } catch (err) {
      console.error("Error updating project:", err);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,165,233,0.15),rgba(255,255,255,0))]">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-900/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center justify-center h-9 w-9 rounded-xl border border-slate-800 bg-slate-900 text-slate-400 hover:text-white hover:border-slate-700 transition cursor-pointer"
              title="Back to Dashboard"
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
            Projects Overview
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <main className="mx-auto max-w-7xl px-4 py-8 space-y-8 sm:px-6 lg:px-8">
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white">Projects Workspace</h1>
            <p className="mt-1 text-sm text-slate-400">
              Manage your current projects, add new workspaces, and organize task workflows.
            </p>
          </div>
          <span className="self-start sm:self-auto inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-400">
            {allProjects.length} {allProjects.length === 1 ? 'Project' : 'Projects'}
          </span>
        </div>

        {/* Create Project Form Card */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-white">Create New Project</h2>
          </div>

          <form onSubmit={handleCreateProject} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Project Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="e.g. Website Redesign"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
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
                placeholder="Brief project details..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30"
              />
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                disabled={isCreating || !name.trim()}
                className="w-full rounded-xl bg-cyan-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-lg shadow-cyan-500/20"
              >
                {isCreating ? 'Creating...' : '+ Create Project'}
              </button>
            </div>
          </form>
        </div>

        {/* Projects List */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            All Projects
          </h2>

          {allProjects.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-slate-900/40 p-12 text-center backdrop-blur-xl">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-800/80 text-slate-400 border border-slate-700/60 mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white">No projects found</h3>
              <p className="mt-1 text-sm text-slate-400 max-w-sm mx-auto">
                Create your first project above to start tracking tasks and collaborating.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allProjects.map((item) => (
                <ProjectComponent
                  key={item._id}
                  projectData={item}
                  onDelete={handleDeleteProject}
                  onEdit={handleEditProject}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default Projects