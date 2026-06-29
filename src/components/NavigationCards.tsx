import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Navigate } from 'react-router-dom';

interface NavigationCardsProps {
  name: string
}

const NavigationCards = ({name}: NavigationCardsProps) => {

  const navigate = useNavigate();

  const handleNavigationClick = ()=>{
    navigate(`/${name}`);
  }

  return (
    <div>
        <h1>{name}</h1>
        <button onClick={handleNavigationClick}>see all</button>
    </div>

  )
}

export default NavigationCards