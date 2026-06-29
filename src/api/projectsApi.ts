import type { UNSAFE_AwaitContextProvider } from "react-router-dom";

interface ProjectProps{
    name: string,
    description: string
}

export const createProject = async(payload:ProjectProps)=>{

    const token = localStorage.getItem("token");
    const url = "http://localhost:3000/api/project/"
    try{
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        if(!response.ok)
        {
            throw new Error("Error in creating a new Project!");
        }
        const data = await response.json();
        return data;
    }catch(err){
        if(err instanceof Error)
        {
            throw new Error(err.message);
        }
        else{
            console.error("Unexpected error!");
        }
    }

}

export const getAllProjects = async ()=>{
    const token = localStorage.getItem("token");
    try{
        const url = "http://localhost:3000/api/project/"
        const response = await fetch(url,{
            method:"GET",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        if(!response.ok)
        {
            throw new Error("error in getting all projects");
        }
        const data = await response.json();
        return data;
    }catch(err)
    {
        if(err instanceof Error)
        {
            throw new Error(err.message);
        }
        else{
            console.error("Ran into an unexpected error!");
        }
    }
}

export const deleteProject = async(projectId: string)=>{
    const token = localStorage.getItem("token");
    try{
        const url = `http://localhost:3000/api/project/${projectId}`;
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-type': "appliction/json"
            }
        })
        if(!response.ok)
        {
            throw new Error("Error in deleting project!");
        }
        const data = await response.json();
        return data;
    }catch(err){
        if(err instanceof Error)
        {
            throw new Error(err.message);
        }else{
            console.error("Ran into an unexpected error!");
        }
    }
}