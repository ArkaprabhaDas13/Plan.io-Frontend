import React from 'react'

interface NavigationCardsProps {
  name: string
}

const NavigationCards = ({name}: NavigationCardsProps) => {
  return (
    <div>
        <h1>{name}</h1>
        <button>see all</button>
    </div>

  )
}

export default NavigationCards