import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Dropdown.scss'

function Dropdown({serviceDropDown}) {

  const [ dropDown, setDropDown ] = useState(true);

  return (
    <ul className={ dropDown ? 'dropdown' : "dropDown clicked"} onClick={()=> setDropDown(!dropDown)}>
      { serviceDropDown.map(item => {
        return (
          <li key={item.id}>
            <Link to={item.path} onClick={()=> setDropDown(!dropDown)} className='link'>{item.title}</Link>
          </li>
        )
      })}
    </ul>
  )
}

export default Dropdown