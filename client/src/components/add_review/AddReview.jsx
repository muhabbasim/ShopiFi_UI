import React, { useContext, useState } from 'react'
import './AddReview.scss'
import { AiFillStar } from 'react-icons/ai'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import newRequest from '../../context/newRequest'
import { AuthContext } from '../../context/authContext'
import { useNavigate } from 'react-router-dom'

function AddReview({ gigId }) {

  const { currentUser } = useContext(AuthContext)
  const userId = currentUser?._id

  const navigate = useNavigate()

  const [ desc, setDesc ] = useState("")

  const [ rate, setRate ] = useState(null)
  const [ hover, setHover ] = useState(null)


  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (reveiw) => {
      return newRequest.post("/review/add", reveiw)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['review'] })
    },
  })

  const handlePost = () => {

    if(currentUser === null) {
      navigate(`/login`)
    }

    mutation.mutate({desc, userId, gigId, stars: rate})
    setDesc("")
    setRate(null)
  }

  return (
    <div className="add-review">
      <h3>Write a reviw</h3>
      <div className="desc">
        <div className="stars flex">
          <span>Rating:</span>
          {[...Array(5)].map((star, i)=> {
            const ratingValue = i + 1;

            return(
              <label key={i}>
                <input type="radio" 
                  name='rate'
                  value={ratingValue}
                  onClick={() => setRate(ratingValue)}
                />
                <AiFillStar
                  size={30} 
                  color={ ratingValue <= ( hover || rate) ? 'rgb(234, 180, 19)' : "lightgray"}
                  style={{cursor: "pointer"}}
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover()}
                /> 
              </label>
            )
          })}
        </div>
        <textarea name="desc" value={desc} cols="30" rows="2"
          onChange={(e) => setDesc(e.target.value)}>
        </textarea>
      </div>
        <div className="button">
          <button onClick={handlePost} type='submit'>Post</button>
        </div>
    </div>
  )
}

export default AddReview