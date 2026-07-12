import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getOneTask } from '../../api/tasksApi';
import TaskComments from './TaskComments';

interface Task{
  _id: string;
  title: string;
  description: string;
}

const SelectedTask = () => {

  const {projectId, taskId} = useParams<{projectId: string, taskId: string}>(null);

  const [taskData, setTaskData] = useState<Task | null>(null);

  useEffect(()=>{
    const fetchTaskData = async()=>{
      if(!taskId)
      {
        console.error("Task Id missing");
        return;
      }
      try{
        const taskData= await getOneTask(taskId);
        if(!taskData)
        {
          throw new Error("Error while fetching taskData");
        }
        setTaskData(taskData);
      }catch(err){
        if(err instanceof Error)
        {
          throw new Error(err.message);
        }
        else{
          console.error(err.message);
        }
      }
      console.log(taskData);
    }
    fetchTaskData();
  }, [])

  return (
    <div>
        SelectedTask: 
        <h4>{taskData?.title}</h4>
        <p>{taskData?.description}</p>

        {/* task comments */}

        {taskData && <TaskComments task={taskData} />}
    </div>
  )
}

export default SelectedTask