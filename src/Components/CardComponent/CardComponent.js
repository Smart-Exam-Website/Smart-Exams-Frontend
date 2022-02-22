import React from 'react'
import './CardComponent.css'
const CardComponent = ({children, title}) => {
    return (
        <div className="greenCard">
            <h2 className="text-light text-center mx-auto py-3">{title}</h2>
            {children}
        </div>
    )
}

export default CardComponent
