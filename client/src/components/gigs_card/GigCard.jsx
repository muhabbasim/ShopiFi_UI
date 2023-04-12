import React from 'react'
import './GigCard.scss'
import { AiFillStar } from 'react-icons/ai'
import { FaHeart } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import newRequest from '../../context/newRequest'
import Loader from '../loader/Loader'

function GigCard({ item }) {

  const { isLoading, error, data } = useQuery({
    queryKey: [item.userId],
    queryFn: () =>
    newRequest.get(`/users/${item.userId}`).then((res) => {
      return res.data
    })
  })

  return (
    <div className='gig-card'>
      <div className="top">
        <Link to={`/single/${item._id}`}>
          <img src={item.cover} alt="" width="200" />
        </Link>
      </div>
      <div className="bottom">
        <div className="info flex-column">
          { isLoading
            ? <Loader/>
            : error
            ? "Something went wrong"
            : <div className="user-info flex">
            <img src={data.img} alt="" />
            <h4>{data.username}</h4>
          </div>}
          <span>{item.title}</span>
          <div className="rate flex">
            <AiFillStar color='rgb(234, 180, 19)'/>
            <span>{!isNaN(item.totalStar / item.starNumber) && Math.round(item.totalStar / item.starNumber)}</span>
          </div>
        </div>
        <div className="price-info">
          <div className="container">
            <FaHeart style={{ cursor: "pointer"}} color='gray'/>
            <div className="price">
              <span>STARTING AT</span>
              <h3>$ {item.price}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GigCard