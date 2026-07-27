import React, { useEffect, useState } from 'react'
import NavigationTasksCards from './NavigationTasksCards'
import NavigationProjectsCards from './NavigationProjectsCards';

const NavigationSection = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const getAllProjects = async () => {
            try {
                const token = localStorage.getItem("token");
                const url = "http://localhost:3000/api/project/"
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                const projects = await response.json();
                setProjects(projects.data);
            } catch (err) {
                if (err instanceof Error) {
                    console.error(err.message);
                } else {
                    console.error("ran into an unexpected error!");
                }
            }
        }
        getAllProjects();
    }, [])

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white tracking-tight flex items-center gap-2">
                <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Quick Actions & Shortcuts
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <NavigationTasksCards data={projects} />
                <NavigationProjectsCards />
            </div>
        </div>
    )
}

export default NavigationSection