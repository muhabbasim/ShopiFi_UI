import React, { useContext, useEffect, useState } from 'react'
import SingleSlides from '../../components/single-slides/SingleSlides'
import './SingleGig.scss'
import { AiFillStar } from 'react-icons/ai'
import OrderBox from '../../components/order_box/OrderBox'
import Reviews from '../../components/reviews/Reviews'
import { useQuery } from '@tanstack/react-query'
import newRequest from '../../context/newRequest'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../../components/loader/Loader'

import AddReview from '../../components/add_review/AddReview'
import { AuthContext } from '../../context/authContext'


function SingleGig() {
  const { currentUser } = useContext(AuthContext)

  const [ taps, setTaps ] = useState(0)
  const toggleTaps = (index) => {
    setTaps(index)
  }

  const [ isActive, setIsActive ] = useState(false)

  const { id } = useParams() // gig id

  const { isLoading, error, data } = useQuery({
    queryKey: ['gig'],
    queryFn: () =>
    newRequest.get(`/gig/single/${id}`).then((res) => {
      return res.data.gig
    })
  })

  const userId = data?.userId;

  const { isLoading: isLoadingUser, error: errorUser, data: dataUser } = useQuery({
    queryKey: [userId],
    queryFn: () =>
    newRequest.get(`/users/${userId}`).then((res) => {
      return res.data
    }),
    enabled: !!userId,
  })

  const navigate = useNavigate()

  const handleContact = async () => {

    if(currentUser === null) {
      navigate(`/login`)
      return
    }

    const sellerId = dataUser._id
    const buyerId = currentUser._id
    const id = sellerId + buyerId

    try {
      const res = await newRequest.get(`/convo/single/${id}`)
      navigate(`/message/${res.data.id}`)
    } catch (error) {

      if(error.response.status === 404) {

        const res = await newRequest.post(`/convo/`, {
          to: sellerId
        })
        
        navigate(`/message/${res.data.id}`)

      }

    }
  }  

  const windowScroll = () => {
    window.scrollY > 500 ? setIsActive(true) : setIsActive(false)
    window.scrollY > 2500 && setIsActive(false)
  }

  useEffect(()=> {
    window.addEventListener('scroll', windowScroll)
    return () => { // clean up
      window.addEventListener('scroll', windowScroll)
    }
  })

  useEffect(() => {
    window.scrollTo(0, 0)
    
  }, [])
  return (
    <div className='single-gig'>
      { isLoading
        ? <Loader/>
        : error 
        ? "something went wrong"
        : <div className="left">
        <h2>{data.title}</h2>
        { isLoadingUser
            ? 'loading...'
            : errorUser
            ? 'something went wrong'
            : <div className="user-info flex">
          <img src={dataUser.img} alt="" />
          <h4>{dataUser.username}</h4>
          <div className="rate flex">
            {!isNaN(data.totalStar / data.starNumber) && (
              <div className="stars flex">
                {Array(Math.round(data.totalStars / data.starNumber))
                  .fill()
                  .map((item, i) => (
                    <AiFillStar color='rgb(234, 180, 19)'/>
                  ))}
              </div>
            )}
            <span>{!isNaN(data.totalStar / data.starNumber) && Math.round(data.totalStar / data.starNumber)}</span>

          </div>
        </div>}

        <SingleSlides data={data}/>

        <div className="right2">
          <OrderBox data={data}/>
        </div>

        <div className="gig-desc">
          <span>About Thid Gig</span>
          <p>{data.desc}</p>
        </div>
        
        <div className="seller">
          <h2>About The Seller</h2>
          { isLoadingUser
            ? 'loading...'
            : errorUser
            ? 'something went wrong'
            : <div className="seller-info">
            <div className="profile-info flex">
              <img src={dataUser.img} alt="" />
              <div className="stats flex-column">
                <span>{dataUser.username}</span>
                <div className="rate flex">
                  <div className="stars flex">
                    <AiFillStar color='rgb(234, 180, 19)'/>

                    {/* { Array(Math.round(data.totalStars / data.starNumber))
                      .fill()
                      .map((item, i) => (
                        <AiFillStar color='rgb(234, 180, 19)'/>
                      ))
                    } */}

                  </div>
                  <span>{!isNaN(data.totalStar / data.starNumber) && Math.round(data.totalStar / data.starNumber)}</span>
                </div>
                <button>Contact Me</button>
              </div>
            </div>

            <div className="residence">
              <div className="top">
                <div className="first flex-column">
                  <div className="item">
                    <span>From</span>
                    <h3>{dataUser.country}</h3>
                  </div>
                  <div className="item">
                    <span>Avarage response time</span>
                    <h3>4 hours</h3>
                  </div>
                  <div className="item">
                    <span>Languages</span>
                    <h3>Arabic & English</h3>
                  </div>
                </div>
                <div className="second">
                  <div className="item">
                    <span>Member since</span>
                    <h3>desc 2018</h3>
                  </div>
                  <div className="item">
                    <span>Last delivery</span>
                    <h3>5 days</h3>
                  </div>
                </div>
              </div>

              <div className="line"></div>

              <div className="bottom">
                <p>{dataUser.desc}</p>
              </div>
            </div>

          </div>}
        </div>
        
        {isLoadingUser
            ? 'loading...'
            : errorUser
            ? 'something went wrong'
            :  isActive 
            && <div className="auther flex" onClick={handleContact}>
          <div className="first flex">
            <img src={dataUser.img} alt="" />
            <div className='point'></div>
          </div>
          <div className="second">
            <h2>Message {dataUser.username}</h2>
            <span>Onlinel . Avg response time: 4 Hourse</span>
          </div>
        </div>}

        <AddReview gigId={data._id}/>
        <Reviews gigId={data._id}/>
      </div>}

      <div className="right">
        <OrderBox data={data}/>
      </div>
    </div>
  )
}

export default SingleGig