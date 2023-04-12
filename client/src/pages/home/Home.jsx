import React, { useEffect } from 'react'
import CatSlider from '../../components/categories_slider/CatSlider'
import Explore from '../../components/explore/Explore'
import Hero from '../../components/hero/Hero'
import Business from '../../components/shopifi_business/Business'
import Slide from '../../components/slide/Slide'
import Card from '../../components/slide_card/Card'
import Video from '../../components/video_row/Video'
import './Home.scss'
import catData from '../../slider_data'
import { useQuery } from '@tanstack/react-query'
import newRequest from '../../context/newRequest'


function Home() {

  const { isLoading, error, data } = useQuery({
    queryKey: ['gigs'],
    queryFn: () =>
    newRequest.get(`/gig/gigs`).then((res) => {
      return res.data
    })
  })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div className='home'>
      <Hero/>
      <Slide title="Popular professional services" slidesToShow={5} arrowsScroll={1}>
        { catData.map(card => (
          <div className='card-cntainer' key={card.id}>
            <Card card={card}/>
          </div>
        ))}
      </Slide>
      <Video/>
      {/* <Explore/> */}
      <Business/>
      { isLoading 
          ?  "is loading..."
          : error
          ? "Something went wrog" 
          : <Slide title="Get inspired with projects made by our freelancers" slidesToShow={4} arrowsScroll={1}>
            {data.map(card => (
            <div className='card-cntainer' key={card._id}>
              <CatSlider card={card}/>
            </div>
        ))}
      </Slide>}
    </div>
  )
}

export default Home