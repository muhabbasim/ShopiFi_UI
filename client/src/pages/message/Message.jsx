import React, { useContext, useEffect } from 'react'
import './Message.scss'
import { useLocation, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import newRequest from '../../context/newRequest';
import Loader from '../../components/loader/Loader'
import { AuthContext } from '../../context/authContext';
import SiingleMessage from '../../components/singleMessage/SiingleMessage';

function Message() {
  const id = useLocation().pathname.split( '/' )[2];
  const { currentUser } = useContext(AuthContext)

  const { isLoading, error, data } = useQuery({
    queryKey: ['messages'],
    queryFn: () =>
    newRequest.get(`/message/${id}`).then((res) => {
      return res.data
    })
  })


  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (message) => {
      return newRequest.post("/message", message)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages']})
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault();

    mutation.mutate({
      conversationId: id,
      desc: e.target[0].value
    })
    e.target[0].value = ""
  } 

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div className='message-container'>

      {  isLoading
        ? <Loader/>
        : error 
        ? "something went wrong"
        : <div className="chat">
          {data.map(message => {

            return (
              <div className={currentUser._id === message.userId ? "owner-message" : "message"}  key={message._id}>
                <SiingleMessage message={message}/>
              </div>
            )
          })}
       
      </div>}

      <div className="line"></div>
      <div className="write">
        <form onSubmit={(e) => handleSubmit(e)} className="container flex">
          <textarea placeholder='Write a message' name="" id="" cols="30" rows="6"></textarea>
          <button type='submit'>Send</button>
        </form>
      </div>
    </div>
  )
}

export default Message