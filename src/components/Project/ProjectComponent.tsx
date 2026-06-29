import React from 'react'

interface Project{
    _id: string;
    name: string;
    description: string;
    groupId: string;
    createdBy: string;
    status: string;
}

interface ProjectProps{
  projectData: Project;
  onDelete: (id: string)=>void;
}

const ProjectComponent = ({projectData, onDelete}:ProjectProps) => {
  return (
    <div style={{border:'1px solid black'}}>
        <p>{projectData.name}</p>
        <p>{projectData.description}</p>
        <button onClick={()=>onDelete(projectData._id)}>delete</button>
    </div>
  )
}

export default ProjectComponent