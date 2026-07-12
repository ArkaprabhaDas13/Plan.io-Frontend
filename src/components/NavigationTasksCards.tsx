import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { Navigate } from 'react-router-dom';


const NavigationTasksCards = ({data}) => {

  const [selectedProject, setSelectedProject] = useState(data?.length > 0 ? data[0] : null);

  const navigate = useNavigate();

  const handleNavigationClick = ()=>{
    if (selectedProject) {
      navigate(`/projects/${selectedProject._id}/tasks`);
    }
  }

  const handleChange = (id)=>{
    const project = data.find((item)=>String(item._id) == String(id));
    setSelectedProject(project);
  }

  return (
    <div>
        <h1>Tasks</h1>
        <select 
          onChange={(e)=>handleChange(e.target.value)} 
          name="selectProject" 
          id="selectProject"
          value={selectedProject?._id || ""}
        >
          <option value="">Select a project</option>
          {
            data.map((project)=>{
              return (
                <option key={project._id} value={project._id}>{project.name}</option>
              )
            })
          }
        </select>
        <button onClick={handleNavigationClick}>see all</button>
    </div>

  )
}

export default NavigationTasksCards