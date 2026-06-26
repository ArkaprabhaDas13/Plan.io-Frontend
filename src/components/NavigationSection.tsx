import React from 'react'
import NavigationCards from './NavigationCards'

const NavigationSection = () => {
    const arr = ["Tasks", "Projects", "Comments"]
    return (
        <div>
            <h1>NavigationSection</h1>
            
            <div>

                {
                    arr.map((item)=>(<NavigationCards name={item}/>))
                }

            </div>
        
        </div>
    )
}

export default NavigationSection