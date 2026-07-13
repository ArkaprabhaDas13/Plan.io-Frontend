import React, {useEffect, useState} from 'react'
import ProjectComponent from '../components/Project/ProjectComponent'
import { createProject } from '../api/projectsApi'
import { getAllProjects } from '../api/projectsApi'
import { deleteProject } from '../api/projectsApi'
import { editProject } from '../api/projectsApi'

interface Project{
  _id: string;
  name: string;
  description: string;
  groupId: string;
  createdBy: string;
  status: string;
}

interface ProjectPayload{
    name: string,
    description: string
}

const Projects = () => {

  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  useEffect(()=>{
    const handleGetProjects = async ()=>{
      const projects = await getAllProjects();
      setAllProjects(projects.data);
    }
    handleGetProjects();
  }, [])

  const handleCreateProject = async ()=>{
    const payload = {
      name: name,
      description: description
    }
    const newProject = await createProject(payload);
    setName("");
    setDescription("");
    const updatedProjects = await getAllProjects();
    setAllProjects(updatedProjects.data);
  }

  const handleDeleteProject = async (projectId: string)=>{
    const res = await deleteProject(projectId);
    const updatedProjects = allProjects.filter((item)=>item._id != projectId)
    setAllProjects(updatedProjects);
  }

  const handleEditProject = async (projectId: string, payload: ProjectPayload)=>{
    const updatedProject = await editProject(projectId, payload);
    console.log("Updated Project = ", updatedProject);
    const newProjects = allProjects.map((project)=>(
      project._id === projectId ? updatedProject : project
    ))
    setAllProjects(newProjects);
  }

  return (
    <div>
      <h1>My Projects</h1>

      <div>
        <h3>New Project</h3>
        <label htmlFor="name">Name</label>
        <input type="text" id='name' placeholder='Name' value={name} onChange={(e)=>setName(e.target.value)}/>
        <label htmlFor="description">Description</label>
        <input type="text" id='description' placeholder='Description' value={description} onChange={(e)=>setDescription(e.target.value)}/>
        <button onClick={handleCreateProject}>Create Project</button>
      </div>

      <div>
        All Projects: 
        {
          allProjects.map((item, index)=>(
            <ProjectComponent key={index} projectData={item} onDelete={handleDeleteProject} onEdit={handleEditProject}/>
          ))
        }
      </div>

    </div>
  )
}

export default Projects