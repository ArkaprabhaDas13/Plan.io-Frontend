import React, { useState } from 'react'

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

  const handleSave = async()=>{
    const payload = {
      name: name,
      description: desc
    }
    onEdit(projectData._id, payload);
    setIsEditing(false);
  }

  return (
    <div style={{border:'1px solid black'}}>
        {isEditing ? <input value={name} type="text" onChange={(e)=>setName(e.target.value)}/> : <p>{projectData.name}</p>}
        {isEditing ? <input value={desc} type="text" onChange={(e)=>setDesc(e.target.value)}/> : <p>{projectData.description}</p>}
        {isEditing ? <button onClick = {handleSave}>Save</button> : <button onClick={()=>setIsEditing(true)}>Edit</button>}
        <button onClick={()=>onDelete(projectData._id)}>delete</button>
    </div>
  )
}

export default ProjectComponent