import React from 'react'
import "./Title.css"

const Title = ({ titleL, titleR }) => {

  return (
    <div class = "title">
           <span>{titleL}</span> 
           <span> - </span>
           <span>{titleR}</span>
     </div>
  )
}

export default Title;