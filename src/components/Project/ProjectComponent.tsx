import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

interface Project{
    _id: string;
    name: string;
    description: string;
    groupId: string;
    createdBy: string;
    status: string;
}

interface ProjectPayload{
  name: string;
  description: string;
}

interface ProjectProps{
  projectData: Project;
  onDelete: (id: string)=>void;
  onEdit: (id: string, payload:ProjectPayload)=>void;
}

const ProjectComponent = ({projectData, onDelete, onEdit}:ProjectProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(projectData.name);
  const [desc, setDesc] = useState(projectData.description);
  const navigate = useNavigate();

  const handleSave = async()=>{
    const payload = {
      name: name,
      description: desc
    }
    onEdit(projectData._id, payload);
    setIsEditing(false);
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-xl backdrop-blur-xl transition duration-300 hover:border-cyan-500/40 flex flex-col justify-between space-y-4">
      <div>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-500/20 to-indigo-500/20 text-cyan-400 border border-cyan-500/30 font-bold">
              {projectData.name ? projectData.name[0].toUpperCase() : 'P'}
            </div>
            {isEditing ? (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-sm text-white outline-none focus:border-cyan-500"
              />
            ) : (
              <h3 className="text-lg font-bold text-white tracking-tight">{projectData.name}</h3>
            )}
          </div>

          <span className="shrink-0 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-400">
            Active
          </span>
        </div>

        <div className="mt-3">
          {isEditing ? (
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows={2}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white outline-none focus:border-cyan-500 resize-none"
            />
          ) : (
            <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">
              {projectData.description || 'No description provided.'}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 gap-2">
        <button
          onClick={() => navigate(`/projects/${projectData._id}/tasks`)}
          className="flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition cursor-pointer"
        >
          <span>View Tasks</span>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>

        <div className="flex items-center gap-2">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-slate-950 hover:bg-emerald-400 transition cursor-pointer"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="rounded-lg border border-slate-700 bg-slate-800/60 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-slate-700 hover:text-white transition cursor-pointer"
            >
              Edit
            </button>
          )}

          <button
            onClick={() => onDelete(projectData._id)}
            className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-400 hover:bg-red-500/20 hover:text-red-300 transition cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProjectComponent