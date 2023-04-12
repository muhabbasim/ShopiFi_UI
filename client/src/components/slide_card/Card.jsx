import React from 'react'
import { Link } from 'react-router-dom'
import './Card.scss'
function Card({ card }) {
  return (
    <Link to={`/gigs?${card?.path}`}>
      <div className='card'>
        <img src={card.img} alt="" />
        <div className="info">
          <h3>{card.desc}</h3>
          <h2>{card.title}</h2>
        </div>
      </div>
    </Link>
  )
}

export default Card