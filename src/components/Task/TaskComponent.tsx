import React, {useState} from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import TaskComments from './TaskComments';


interface Task{
    _id: string;
    title: string;
    description: string;
    dueDate: Date;
    priority: string;
}

interface PayloadType{
  title: string;
  description: string;
}

interface PropsType{
  data: Task;
  onDelete: (id: string)=>void;
  onEdit: (payload: PayloadType, id: string)=>void;
  projectId: string;
}

const TaskComponent = ({data, onDelete, onEdit, projectId} : PropsType) => {

  const navigate = useNavigate();

  const [title, setTitle] = useState(data.title);
  const [description, setDescription] = useState(data.description);
  const [isEditing, setIsEditing] = useState(false);
 
  const handleDelete = ()=>{
    onDelete(data._id);
  }
  const handleEdit = ()=>{
    setIsEditing(true);
  }
  const handleSave = ()=>{
    onEdit({title: title, description:description}, data._id);
    setIsEditing(false);
  }
  const handleTaskDetails = ()=>{
    navigate(`/projects/${projectId}/tasks/${data._id}`)
  }
 
  return (
    <div style={{border: '1px solid black'}}>
      {isEditing? <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)}/> : <h4>{data.title}</h4>}
      {isEditing? <input type="text" value={description} onChange={(e)=>setDescription(e.target.value)}/> : <h5>{data.description}</h5>}
      <button onClick={handleTaskDetails}>Details</button>
      {isEditing? <button onClick={handleSave}>Save</button> : <button onClick={handleEdit}>Edit</button>}
      <button onClick={handleDelete}>delete</button> 
    </div>
  )
}

export default TaskComponent