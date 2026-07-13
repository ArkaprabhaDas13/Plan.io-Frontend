import React, {useEffect, useState} from 'react'
import TaskComponent from '../components/Task/TaskComponent';
import { createTask , getAllTasks, deleteTask, editTask } from '../api/tasksApi';
import { useParams } from 'react-router-dom';
import { getOneProject } from '../api/projectsApi';

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
  const [projectDetails, setProjectDetails] = useState();
  const [projectName, setProjectName] = useState("");

  const {projectId} = useParams();
  
  console.log("Project Details = ", projectDetails);

  useEffect(()=>{
    // get the project info
    const getProjectDetails = async()=>{
      const data = await getOneProject(projectId);
      setProjectDetails(data);
      setProjectName(data.name);
    }

    if(!projectId) return;

    const loadAllTasks = async()=>{
      const tasks = await getAllTasks(projectId);
      setAllTasks(tasks.data);
    }
    getProjectDetails();
    loadAllTasks();
  }, [projectId])

  const handleCreateTask = async ()=>{
    const payload = {
      title: title,
      description: description,
      projectId: projectId
    }
    const response = await createTask(payload);
    setTitle("");
    setDescription("");
    const data = await getAllTasks(projectId);
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
        <h3>New Task for {projectDetails?.name || "Loading project"}</h3>
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
          return <TaskComponent key={index} data={item} onDelete={handleDelete} onEdit={handleEditTask} projectId={projectId}/>
        })}
      </div>

    </div>
  )
}

export default Tasks