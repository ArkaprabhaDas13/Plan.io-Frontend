import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Navigate } from 'react-router-dom';

const NavigationProjectsCards = () => {

  const navigate = useNavigate();

  const handleNavigationClick = ()=>{
    navigate(`/projects`);
  }

  return (
    <div>
        <h1>Projects</h1>
        <button onClick={handleNavigationClick}>see all</button>
    </div>

  )
}

export default NavigationProjectsCards