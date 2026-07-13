import React, { useEffect, useState } from 'react'
import NavigationTasksCards from './NavigationTasksCards'
import NavigationProjectsCards from './NavigationProjectsCards';

const NavigationSection = () => {

    const [projects, setProjects] = useState([]);

    useEffect(()=>{

        const getAllProjects = async()=>{
            try{
                const token = localStorage.getItem("token");
                const url = "http://localhost:3000/api/project/"
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        'Authorization' : `Bearer ${token}`
                    }
                })
                const projects = await response.json();
                setProjects(projects.data);
            }catch(err){
                if(err instanceof Error){
                    throw new Error(err.message);
                }else{
                    console.error("ran into an unexpected error!");
                }
            }
        }
        getAllProjects();
    }, [])

    return (
        <div>
            <h1>NavigationSection</h1>
            
            <div>

                <NavigationTasksCards data={projects}/>
                <NavigationProjectsCards/>

            </div>
        
        </div>
    )
}

export default NavigationSection