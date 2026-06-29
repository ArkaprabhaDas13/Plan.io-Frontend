import React from 'react'
import NavigationCards from './NavigationCards'

const NavigationSection = () => {
    const arr = ["tasks", "projects", "comments"]
    return (
        <div>
            <h1>NavigationSection</h1>
            
            <div>

                {
                    arr.map((item)=>(<NavigationCards key={item} name={item}/>))
                }

            </div>
        
        </div>
    )
}

export default NavigationSection