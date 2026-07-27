import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

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

interface PropsType {
  data: Task;
  onDelete: (id: string) => void;
  onEdit: (payload: PayloadType, id: string) => void;
  projectId?: string;
}

const TaskComponent = ({ data, onDelete, onEdit, projectId }: PropsType) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState(data.title);
  const [description, setDescription] = useState(data.description);
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = () => {
    onDelete(data._id);
  }

  const handleEdit = () => {
    setIsEditing(true);
  }

  const handleSave = () => {
    onEdit({ title: title, description: description }, data._id);
    setIsEditing(false);
  }

  const handleTaskDetails = () => {
    if (projectId) {
      navigate(`/projects/${projectId}/tasks/${data._id}`)
    }
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 p-5 shadow-lg backdrop-blur-xl transition duration-300 hover:border-cyan-500/30 flex flex-col justify-between space-y-4">
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 w-full">
            <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            {isEditing ? (
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-sm text-white outline-none focus:border-cyan-500"
              />
            ) : (
              <h4 className="text-base font-bold text-white tracking-tight">{data.title}</h4>
            )}
          </div>
        </div>

        <div className="mt-2 pl-11">
          {isEditing ? (
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white outline-none focus:border-cyan-500 resize-none"
            />
          ) : (
            <p className="text-sm text-slate-400 leading-relaxed">
              {data.description || 'No description provided.'}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs">
        <button
          onClick={handleTaskDetails}
          className="flex items-center gap-1 font-semibold text-cyan-400 hover:text-cyan-300 transition cursor-pointer"
        >
          <span>Details & Comments</span>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div className="flex items-center gap-2">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="rounded-lg bg-emerald-500 px-3 py-1.5 font-semibold text-slate-950 hover:bg-emerald-400 transition cursor-pointer"
            >
              Save
            </button>
          ) : (
            <button
              onClick={handleEdit}
              className="rounded-lg border border-slate-700 bg-slate-800/60 px-3 py-1.5 font-semibold text-slate-300 hover:bg-slate-700 hover:text-white transition cursor-pointer"
            >
              Edit
            </button>
          )}

          <button
            onClick={handleDelete}
            className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-1.5 font-semibold text-red-400 hover:bg-red-500/20 hover:text-red-300 transition cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default TaskComponent