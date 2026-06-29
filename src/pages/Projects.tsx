import React, {useEffect, useState} from 'react'
import ProjectComponent from '../components/Project/ProjectComponent'
import type {Types} from 'mongoose'
import { createProject } from '../api/projectsApi'
import { getAllProjects } from '../api/projectsApi'
import { deleteProject } from '../api/projectsApi'

interface Project{
  _id: string;
  name: string;
  description: string;
  groupId: string;
  createdBy: string;
  status: string;
}

const Projects = () => {

  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  useEffect(()=>{
    const handleGetProjects = async ()=>{
      const data = await getAllProjects();
      setAllProjects(data);
    }
    handleGetProjects();
  }, [])

  const handleCreateProject = async ()=>{
    const payload = {
      name: name,
      description: description
    }
    const data = await createProject(payload);
    setName("");
    setDescription("");
    const updatedProjects = await getAllProjects();
    setAllProjects(updatedProjects);
  }

  const handleDeleteProject = async (projectId: string)=>{
    const res = await deleteProject(projectId);
    const updatedProjects = allProjects.filter((item)=>item._id != projectId)
    setAllProjects(updatedProjects);
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
            <ProjectComponent key={index} projectData={item} onDelete={handleDeleteProject}/>
          ))
        }
      </div>

    </div>
  )
}

export default Projects