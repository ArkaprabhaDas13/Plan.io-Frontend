import React, {useEffect, useState} from 'react'
import TaskComponent from '../components/Task/TaskComponent';
import { createTask , getAllTasks, deleteTask, editTask } from '../api/tasksApi';

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

const Tasks = () => {
  
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  
  useEffect(()=>{
    const loadAllTasks = async()=>{
      const data = await getAllTasks();
      setAllTasks(data);
    }
    loadAllTasks();
  }, [])

  const handleCreateTask = async ()=>{
    const payload = {
      title: title,
      description: description
    }
    const response = await createTask(payload);
    setTitle("");
    setDescription("");
    const data = await getAllTasks();
    setAllTasks(data);
  }

  const handleEditTask = async (payload: PayloadType, taskId: string)=>{
    const data = await editTask(payload, taskId);
    const updatedList = allTasks.map((item)=>(
      item._id == taskId ? data: item
    ))
    setAllTasks(updatedList);
  }

  const handleDelete = async (itemId: string)=>{
    const response = await deleteTask(itemId);
    const updatedTaskList = allTasks.filter((item)=>item._id != itemId);
    setAllTasks(updatedTaskList);
  }

  return (
    <div>
      <h1>My Tasks:</h1>

      <div style={{display:'flex', flexDirection: 'column'}}>
        <h3>New Task</h3>
        <label htmlFor="title">Title</label>
        <input type="text" id='title' placeholder='Title' value={title} onChange={(e)=>setTitle(e.target.value)}/>
        <label htmlFor="description">Description</label>
        <input type="text" id='description' placeholder='Description' value={description} onChange={(e)=>setDescription(e.target.value)}/>
        <label htmlFor="dueDate">Due Date</label>
        <input type="date" id='dueDate' placeholder='Due'/>
        <button onClick={handleCreateTask}>Create Task</button>
      </div>

      <div>
        All Tasks: 
        {allTasks.map((item, index)=>{
          return <TaskComponent key={index} data={item} onDelete={handleDelete} onEdit={handleEditTask}/>
        })}
      </div>

    </div>
  )
}

export default Tasks