import { useQuery } from '@tanstack/react-query'
import React, { useContext } from 'react'
import { AuthContext } from '../../context/authContext'
import newRequest from '../../context/newRequest'

function SiingleMessage({ message }) {

    const { currentUser } = useContext(AuthContext)
    
    const userId = message.userId
    const { isLoading, error, data: userData } = useQuery({
      queryKey: ['user', userId],
      queryFn: () =>
      newRequest.get(`/users/${userId}`).then((res) => {
        return res.data
      })
    })
    
  return (
    <>
        { isLoading
        ? "Loading..."
        : error 
        ? "something went wrong"
        : <img src={userData.img} alt="" />}
        <div className="msg">
            <span>{message.desc}</span>
        </div>
    </>
  )
}

export default SiingleMessage