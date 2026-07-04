interface PayloadType{
    title: string;
    description: string;
}

export const createTask = async(payload)=>{
    const url = "http://localhost:3000/api/task"
    const token = localStorage.getItem("token");
    try{
        const response = await fetch(url, {
            method:"POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        if(!response.ok)
        {
            const error = await response.json();
            throw new Error(error.message);
        }
        const resData = await response.json();
        return resData;
    }catch(err: unknown){
        if(err instanceof Error)
            throw new Error(err.message);
        else
            console.error("Unexpected error!");
    }
}

export const getAllTasks = async(projectId)=>{
    const url = `http://localhost:3000/api/task/project/${projectId}`
    const token = localStorage.getItem("token");
    try{
        const response = await fetch(url, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        if(!response.ok)
        {
            throw new Error("error in getting all the tasks!");
        }
        const data = await response.json();
        return data;
    }catch(err){
        if(err instanceof Error)
        {
            throw new Error(err.message);
        }
        else{
            console.error("unexpected error faced");
        }
    }
}

export const editTask = async(payload: PayloadType, taskId:string)=>{
    try{
        const url = `http://localhost:3000/api/task/${taskId}`
        const token = localStorage.getItem("token");
        const response = await fetch(url, {
            method: "PATCH",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        const data = await response.json();
        return data;
    }catch(err){
        if(err instanceof Error)
        {
            throw new Error(err.message);
        }
        else{
            console.error("Ran into an unexpected error");
        }
    }
}

export const deleteTask = async(itemId)=>{
    try{
        const url = `http://localhost:3000/api/task/${itemId}`
        const token = localStorage.getItem("token");
        const response = await fetch(url, {
            'method' : "DELETE",
            'headers' : {
                'Authorization' : `Bearer ${token}`
            }
        })
        if(!response.ok)
        {
            throw new Error("Error in deleting a Task");
        }
        const data = await response.json();
        return data;
    }catch(err)
    {
        if(err instanceof Error){
            throw new Error(err.message);
        }
        else{  
            console.error("Unexpected Error faced");
        }
    }
}