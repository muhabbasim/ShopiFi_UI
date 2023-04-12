import React, { useContext } from 'react'
import './OrdersTableRow.scss'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import newRequest from '../../context/newRequest'
import { TiMessages } from 'react-icons/ti'
import { useQuery } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'

function OrdersTableRow({ order }) {

  const navigate = useNavigate()

  const { currentUser } = useContext(AuthContext)
  const userId = currentUser.isSeller ? order.buyerId : order.sellerId

  const { isLoading: isLoadingUser, error: errorUser, data: dataUser } = useQuery({
    queryKey: ['user', userId],
    queryFn: () =>
    newRequest.get(`/users/${userId}`).then((res) => {
      return res.data
    })
  })


  const handleContact = async () => {

    const sellerId = order.sellerId
    const buyerId = order.buyerId
    const id = sellerId + buyerId

    try {
      const res = await newRequest.get(`/convo/single/${id}`)
      navigate(`/message/${res.data.id}`)
    } catch (error) {

      if(error.response.status === 404) {

        const res = await newRequest.post(`/convo/`, {
          to: currentUser.isSeller ? buyerId : sellerId
        })
        
        navigate(`/message/${res.data.id}`)

      }

    }
  }  

  return (
    
    <tr className='orders-table-row'>
      <td className='img'><img src={order.img} alt="" /></td>
      <Link className='link' to={`/single/${order.gigId}`}>
        <td>{order.title}</td>
      </Link>
      <td className='price'>$ {order.price}</td>
      { 
        isLoadingUser
        ? "loading info..."
        : errorUser
        ? "error" 
        : <td className='info'>{dataUser?.username}</td>
      }
      <td>
        <TiMessages 
          style={{ cursor: "pointer" }} 
          size={25} color='var(--light-blue)'
          onClick={handleContact}
          />
      </td>
    </tr>
  )
}

export default OrdersTableRow