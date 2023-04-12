import React, { useEffect } from 'react'
import './Reviews.scss'
import { AiFillStar } from 'react-icons/ai'
import { FiThumbsUp } from 'react-icons/fi'
import { FiThumbsDown } from 'react-icons/fi'
import { useQuery } from '@tanstack/react-query'
import newRequest from '../../context/newRequest'
import Loader from '../loader/Loader'
import Review from '../review/Review'

function Reviews({ gigId }) {

  const { isLoading, error, data } = useQuery({
    queryKey: ['review', gigId],
    queryFn: () =>
    newRequest.get(`/review/${gigId}`).then((res) => {
      return res.data
    })
  })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div className='reviews flex-column'>
      <h2>Reviews</h2>
      { isLoading
        ? <Loader/>
        : error
        ? "something went wrong"
        : <div className="reviews-container flex-column">
        { data.map((review, i) => {
          return (
            <Review key={i} review={review}/>
          )
        })}
      </div>}
    </div>
  )
}

export default Reviews