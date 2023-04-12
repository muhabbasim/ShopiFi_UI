import React, { useEffect, useRef, useState } from 'react'
import GigCard from '../../components/gigs_card/GigCard'
import './Gigs.scss'
import { MdKeyboardArrowDown } from 'react-icons/md'
import newRequest from '../../context/newRequest'
import { useQuery } from '@tanstack/react-query'
import Loader from '../../components/loader/Loader'
import { useLocation } from 'react-router-dom'

function Gigs() {

  const [ option, setOptions ] = useState(false)
  const [ sort, setSort ] = useState("sales")

  const minRef = useRef()
  const maxRef = useRef()

  const { search } = useLocation()

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ['gigs'],
    queryFn: () =>
    newRequest.get(`/gig/gigs${search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`).then((res) => {
      return res.data
    })
  })

  // console.log(search)

  const reSort = (type) => {
    setSort(type)
  }

  const handleApply = () => {
    refetch()
  }

  useEffect(() => {
    refetch();
  }, [sort, search])


  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div className='gigs'>
      <div className="header flex">
        <div className="left">
          <h1>All Categories Artist</h1>
          <span>Explore the boundries of art and technology with ShopiFi Ai artists</span>
          <div className="adjustments flex">
            <span>Budget:</span>
            <input type="text" ref={minRef} placeholder="min price"/>
            <input type="text" ref={maxRef} placeholder="max price"/>
            <button type='submit' onClick={handleApply}>Apply</button>
          </div>
        </div>
        <div className="right">
          <span>Sort by</span>
          <small>{sort === "sales" ? 'Best Selling' : "Newest"}</small>
          <MdKeyboardArrowDown size={25} onClick={()=> setOptions(!option)} color="rgb(180, 180, 180)" style={{cursor:"pointer"}}/>
          { option && <div className="right-options flex" onClick={()=> setOptions(!option)}>
            { sort === "sales" 
              ? <small onClick={()=> reSort("createdAt")}>Newest</small>
              : <small onClick={()=> reSort("sales")}>Best Selling</small>}
              <small onClick={()=> reSort("sales")}>Popular</small>
          </div>}
        </div>
      </div>
      <div className="grid-25">
        { isLoading 
          ? <Loader/> 
          : error
          ? "Something went wrog" 
          : data.map(item => {
            return (
              <div key={item._id}>
                <GigCard item={item}/>
              </div>
            )
        })}
      </div>
    </div>
  )
}

export default Gigs