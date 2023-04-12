import React, { useContext, useEffect } from 'react'
import './MyGigs.scss'
import TableRow from '../../components/Gig_table_row/TableRow'
import { Link } from 'react-router-dom'
import { RiDeleteBin6Fill } from 'react-icons/ri'
import { AuthContext } from '../../context/authContext'
import { useQuery } from '@tanstack/react-query'
import newRequest from '../../context/newRequest'
import Loader from '../../components/loader/Loader'



function MyGigs() {
  
  const { currentUser } = useContext(AuthContext)
  const userId = currentUser._id

  const { isLoading, error, data } = useQuery({
    queryKey: ['usergig'],
    queryFn: () =>
    newRequest.get(`/gig/usergigs/${userId}`).then((res) => {
      return res.data.gig
    })
  })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className='mygigs'>
      <div className="header flex">
        <h2>Gigs</h2>
        <Link className='link' to='/adding'><button>Add New Gig</button></Link>
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
            <th className='salse'>Sales</th>
            <th>Action</th>
          </tr>
        </thead>
        { data.map((gig) => {
          
          return (
            <tbody key={gig._id}>
              <TableRow 
                img={gig.cover}
                gigId={gig._id}
                title={gig.title}
                price={gig.price}
                info={gig.sales}
                icon={<RiDeleteBin6Fill style={{ cursor: "pointer" }} size={25} color='var(--fail)'/>}
              />
            </tbody>
          )
        })}
      </table>}
    </div>
  )
}

export default MyGigs