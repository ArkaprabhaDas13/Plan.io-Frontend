import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NavigationTasksCards = ({ data = [] }) => {
  const projects = Array.isArray(data) ? data : [];
  const [selectedProject, setSelectedProject] = useState(projects.length > 0 ? projects[0] : null);

  const navigate = useNavigate();

  const handleNavigationClick = () => {
    if (selectedProject) {
      navigate(`/projects/${selectedProject._id}/tasks`);
    }
  };

  const handleChange = (id) => {
    const project = projects.find((item) => String(item._id) === String(id));
    setSelectedProject(project ?? null);
  };

  return (
    <div>
      <h1>Tasks</h1>
      <select
        onChange={(e) => handleChange(e.target.value)}
        name="selectProject"
        id="selectProject"
        value={selectedProject?._id || ""}
      >
        <option value="">Select a project</option>
        {projects.map((project) => (
          <option key={project._id} value={project._id}>
            {project.name}
          </option>
        ))}
      </select>
      <button onClick={handleNavigationClick} disabled={!selectedProject}>
        see all
      </button>
    </div>
  );
};

export default NavigationTasksCards;