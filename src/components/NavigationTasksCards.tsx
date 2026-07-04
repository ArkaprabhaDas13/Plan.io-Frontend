import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { Navigate } from 'react-router-dom';


const NavigationTasksCards = ({data}) => {

  const [selectedProject, setSelectedProject] = useState("");

  const navigate = useNavigate();

  const handleNavigationClick = ()=>{
    navigate(`/tasks/${selectedProject._id}`);
  }

  const handleChange = (id)=>{
    const project = data.find((item)=>String(item._id) == String(id));
    setSelectedProject(project);
  }

  console.log("Selected Project = ", selectedProject);

  return (
    <div>
        <h1>Tasks</h1>
        <select onChange={(e)=>handleChange(e.target.value)} name="selectProject" id="selectProject">
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