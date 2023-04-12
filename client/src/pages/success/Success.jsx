import React, { useContext } from 'react'
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import newRequest from '../../context/newRequest';
import {FiCheckCircle} from 'react-icons/fi'
import { AuthContext } from '../../context/authContext';
function Success() {
  const { currentUser } = useContext(AuthContext)

  // to get the payment intent from the params 
  const { search } = useLocation()
  const params = new URLSearchParams(search);
  const payment_intent = params.get('payment_intent')

  const navigate = useNavigate()

  useEffect(() => {
    const makeRequest = async () => {

      try {
        await newRequest.put("/orders", {payment_intent})
        
        setTimeout(() => {
          navigate(`/orders/${currentUser._id}}`)
        }, 5000);
  
      } catch (error) {
        console.log(error)
      }
    }

    makeRequest()
  },[])

  return (
    <div style={{padding: "70px", minHeight: "70px"}}>
      <div className='flex-center'>
        <FiCheckCircle size={100} color={'lightgreen'}/>
      </div>
      <div className='flex-center'>
        <span style={{fontSize: 23, marginTop: 50}}>Successful Payment. You are being redirected to the orders page. Please do ot close the page</span>
      </div>
    </div>
  )
}

export default Success