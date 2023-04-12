import React from 'react'
import './SingleSlides.scss'
import { BsArrowLeft } from 'react-icons/bs'
import { BsArrowRight } from 'react-icons/bs'
import Slider from 'infinite-react-carousel';

function SingleSlides({ data }) {

  // console.log(data.desc)
  return (
    <div className='single-slide'>

      <Slider className="slider-container" slidesToShow={1} arrowsScroll={1}>
        {data?.images?.map((img, i) => {
          return (
            <img src={img} alt="" key={i}/>
          )
        })}
      </Slider>
    </div>
  )
}

export default SingleSlides
