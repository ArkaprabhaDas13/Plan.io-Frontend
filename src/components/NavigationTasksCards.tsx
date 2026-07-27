import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProjectItem {
  _id: string;
  name: string;
}

const NavigationTasksCards = ({ data = [] }: { data?: ProjectItem[] }) => {
  const projects = Array.isArray(data) ? data : [];
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(projects.length > 0 ? projects[0] : null);

  const navigate = useNavigate();

  const handleNavigationClick = () => {
    if (selectedProject) {
      navigate(`/projects/${selectedProject._id}/tasks`);
    }
  };

  const handleChange = (id: string) => {
    const project = projects.find((item) => String(item._id) === String(id));
    setSelectedProject(project ?? null);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-xl backdrop-blur-xl transition duration-300 hover:border-cyan-500/30 flex flex-col justify-between space-y-5">
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white">Project Tasks</h3>
          </div>
          <span className="text-xs font-medium text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-full border border-slate-700">
            {projects.length} {projects.length === 1 ? 'project' : 'projects'} available
          </span>
        </div>

        <p className="mt-3 text-sm text-slate-400">
          Select a project from your workspace to view, edit, and manage all related tasks.
        </p>

        <div className="mt-4">
          <label htmlFor="selectProject" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Select Project
          </label>
          <select
            onChange={(e) => handleChange(e.target.value)}
            name="selectProject"
            id="selectProject"
            value={selectedProject?._id || ""}
            className="w-full rounded-xl border border-slate-700 bg-slate-800/90 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 cursor-pointer"
          >
            <option value="" className="bg-slate-900 text-slate-400">Select a project</option>
            {projects.map((project) => (
              <option key={project._id} value={project._id} className="bg-slate-900 text-white">
                {project.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={handleNavigationClick}
        disabled={!selectedProject}
        className="w-full flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-slate-950 transition duration-200 hover:bg-cyan-400 active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-lg shadow-cyan-500/20"
      >
        <span>View Project Tasks</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </button>
    </div>
  );
};

export default NavigationTasksCards;