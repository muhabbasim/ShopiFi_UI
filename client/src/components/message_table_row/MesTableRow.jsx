import React, { useContext } from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import './MesTableRow.scss'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import newRequest from '../../context/newRequest'
import Loader from '../loader/Loader'
import { AuthContext } from '../../context/authContext'

function MesTableRow({ convo }) {

  const { currentUser } = useContext(AuthContext)
  const userId = currentUser._id


  const sellerId = convo?.sellerId
  const buyerId = convo?.buyerId

  const { isLoading: isLoadingSeller, error: errorSeller, data: dataSeller } = useQuery({
    queryKey: ['user',sellerId],
    queryFn: () =>
    newRequest.get(`/users/${sellerId}`).then((res) => {
      return res.data
    })
  })

  const { isLoading: isLoadingBuyer, error: errorBuyer, data: dataBuyer } = useQuery({
    queryKey: ['user', buyerId],
    queryFn: () =>
    newRequest.get(`/users/${buyerId}`).then((res) => {
      return res.data
    })
  })

  // console.log(convo)


  // Access the client
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.put(`/convo/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversation'] })
    },
  })
  // console.log(convo)

  const handleRead = () => {
    mutation.mutate(convo.id)
  }

  return (
    <tr className={`mes-table-row 
      ${((currentUser.isSeller && !convo.readBySeller) || 
        (!currentUser.isSeller && !convo.readByBuyer)) && "unread"}`
    }>
      { isLoadingSeller
        ? <Loader/>
        : errorSeller 
        ? "something went wrong"
        : <td>{currentUser.isSeller ? dataBuyer?.username : dataSeller?.username}</td>
      }

      <td>
        <Link className="link gray" to={`/message/${convo.id}`}>
          {convo?.lastMessage?.substring(0, 100)}...
        </Link>
      </td>

      <td className='date'>{moment(convo.updatedAt).fromNow()}</td>
      
      { ((currentUser.isSeller && !convo.readBySeller) || 
        (!currentUser.isSeller && !convo.readByBuyer)) &&
        <td className='action'><button onClick={handleRead}>Mark As Read</button></td>
      }
    </tr>
  )
}

export default MesTableRow