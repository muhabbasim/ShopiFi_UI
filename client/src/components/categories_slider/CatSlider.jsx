import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { Link } from 'react-router-dom'
import newRequest from '../../context/newRequest'
import './CatSlider.scss'

function CatSlider({ card }) {

  const userId =  card.userId
  const { isLoading, error, data: userData } = useQuery({
    queryKey: ['user',userId],
    queryFn: () =>
    newRequest.get(`/users/${userId}`).then((res) => {
      return res.data
    })
  })
  
  return (
    
    <div className='cat-cntainer'>
      <Link className='link' to={`/single/${card._id}`}> 
        <div className="top">
          <img src={card.cover} alt="" />
        </div>
      </Link>
      { isLoading 
        ?  "is loading..."
        : error
        ? "Something went wrog" 
        : <div className="bottom flex">
        <img src={userData.img} alt="" />
        <div className="info">
          <h3>{card.cat}</h3>
          <span>by {userData.username}</span>
        </div>
      </div>}
    </div>

  )
}

export default CatSlider