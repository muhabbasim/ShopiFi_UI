import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useContext, useState } from 'react'
import { AiFillStar } from 'react-icons/ai'
import { FiThumbsUp } from 'react-icons/fi'
import { FiThumbsDown } from 'react-icons/fi'
import { BsThreeDots } from 'react-icons/bs'
import newRequest from '../../context/newRequest'
import {AuthContext} from '../../context/authContext'

function Review({ review }) {

  const { currentUser } = useContext(AuthContext)
  const [ remove, setRemove ] = useState(false)
  
  const { isLoading, error, data: user } = useQuery({
    queryKey: [review.userId],
    queryFn: () =>
    newRequest.get(`/users/${review.userId}`).then((res) => {
      return res.data
    })
  })

  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: () => {
      return newRequest.delete(`/review/${review._id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['review'] })
    },
  })

  const userId = currentUser?._id

  const handleDelete = () => {
    mutation.mutate(userId)
    setRemove(false)
  } 

  return (
    <div className="review flex-column" key={review.id}>
      { isLoading
        ? 'loading...'
        : error
        ? 'something went wrong'
        : <div className="profile-info flex">
        <img src={user.img} alt="" />
        <div className="specifics flex-column">
          <span>{user.username}</span>
          <h4> From: {user.country}</h4>
        </div>
      </div>}

      <div className="delete">
        <BsThreeDots size={30} color={"gray"} style={{ cursor: "pointer"}}
          onClick={() => setRemove(!remove)}
        />
        {  remove && <div className="select">
          { userId === review.userId && <div>
            <button>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>}
        </div>}
      </div>

      <div className="rate flex">
        <div className="stars flex">
          {[...Array(review.stars)].map((star, i) => {
            return (
              <AiFillStar key={i} color='rgb(234, 180, 19)'/>
            )
          })}
        </div>
      </div>

      <p>{review.desc}</p>
      <div className="options flex">
        <span>Helpful?</span>
        <div className="op1 flex">
          <FiThumbsUp/>
          <small>Yes</small>
        </div>
        <div className="op2 flex">
          <FiThumbsDown/>
          <small>No</small>
        </div>
      </div>
      <div className="line"></div>
    </div>
  )
}

export default Review