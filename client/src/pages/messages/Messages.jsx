import React, { useContext, useEffect } from 'react'
import './Messages.scss'
import MesTableRow from '../../components/message_table_row/MesTableRow'
import { AuthContext } from '../../context/authContext'
import { useQuery } from '@tanstack/react-query'
import newRequest from '../../context/newRequest'
import Loader from '../../components/loader/Loader'

function Messages() {
  const { currentUser } = useContext(AuthContext)

  const { isLoading, error, data: conversations } = useQuery({
    queryKey: ['conversation'],
    queryFn: () =>
    newRequest.get(`/convo`).then((res) => {
      return res.data
    })
  })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div className='messages'>
      <div className="header flex">
        <h2>Messages</h2>
      </div>
      { isLoading
        ? <Loader/>
        : error 
        ? "something went wrong"
        : <table>
        <thead>
          <tr>
            <th>{ currentUser.isSeller ? "Buyer" : "Seller"}</th>
            <th>Message</th>
            <th className='date'>Date</th>
            <th className='action'>Action</th>
          </tr>
        </thead>
        { conversations.map(convo => {
          return (
            <tbody key={convo._id}>
              <MesTableRow convo={convo} />
            </tbody>
          )
        })}
      </table>}
    </div>
  )
}

export default Messages