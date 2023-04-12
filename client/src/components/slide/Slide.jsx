import React from 'react'
import './Slide.scss'
import Slider from 'infinite-react-carousel';


function Slide({ children, slidesToShow, arrowsScroll, title }) {

  return (
    <div className='slide flex'>
      <div className="slide-containenr">
        <h1>{title}</h1>
        <Slider className='slider' slidesToShow={slidesToShow} arrowsScroll={arrowsScroll}>
          {children}
        </Slider>
      </div>
    </div>
  )
}

export default Slide