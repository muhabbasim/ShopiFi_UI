import React, { useContext, useEffect } from 'react'
import './Orders.scss'
import { useQuery } from '@tanstack/react-query'
import newRequest from '../../context/newRequest'
import Loader from '../../components/loader/Loader'
import { AuthContext } from '../../context/authContext'
import OrdersTableRow from '../../components/orders_table_row/OrdersTableRow'

function Orders() {

  const { currentUser } = useContext(AuthContext)
  const userId = currentUser._id

  const { isLoading, error, data } = useQuery({
    queryKey: ['orders',userId],
    queryFn: () =>
    newRequest.get(`/orders`).then((res) => {
      return res.data
    })
  })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div className='orders'>
      <div className="header flex">
        <h2>Orders</h2>
      </div>
      { isLoading
        ? <Loader/>
        : error 
        ? "something went wrong"
        : <table>
        <thead>
          <tr>
            <th className='img'>Image</th>
            <th>Title</th>
            <th className='price'>Price</th>
            <th className='buyer'>{currentUser.isSeller ? "Buyer" : "Seller"}</th>
            <th>Contact</th>
          </tr>
        </thead>
        { data?.map(order => {
          return (
            <tbody key={order._id}>
              <OrdersTableRow order={order}/>
            </tbody>
          )
        })}
      </table>}
    </div>
  )
}

export default Orders