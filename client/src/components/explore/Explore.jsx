import React from 'react'
import './Explore.scss'
import combo from '../../assets/icons/combo.png'
import piano from '../../assets/icons/piano.png'
import material from '../../assets/icons/material-ui.png'
import omnichannel from '../../assets/icons/omnichannel.png'
import programming from '../../assets/icons/programming.png'
import lifestyle from '../../assets/icons/lifestyle.png'
import writing from '../../assets/icons/writing.png'
import sculpture from '../../assets/icons/sculpture.png'
import facebook from '../../assets/icons/facebook.png'
import watch from '../../assets/icons/sculpture.png'

function Explore() {
  return (
    <div className='explore flex-column'>
      <h2>Explore the marketplace</h2>
      <div className="explore-container grid-15">
        <div className="item">
          <img src={combo} alt="" />
          <div className='line'></div>
          <span>Date</span>
        </div>
        <div className="item">
          <img src={piano} alt="" />
          <div className='line'></div>
          <span>Music </span>
        </div>
        <div className="item">
          <img src={material} alt="" />
          <div className='line'></div>
          <span>Design & graphics</span>
        </div>
        <div className="item">
          <img src={omnichannel} alt="" />
          <div className='line'></div>
          <span>Socialzing</span>
        </div>
        <div className="item">
          <img src={programming} alt="" />
          <div className='line'></div>
          <span>Programming</span>
        </div>
        <div className="item">
          <img src={lifestyle} alt="" />
          <div className='line'></div>
          <span>Lifestyle</span>
        </div>
        <div className="item">
          <img src={writing} alt="" />
          <div className='line'></div>
          <span>Writing</span>
        </div>
        <div className="item">
          <img src={sculpture} alt="" />
          <div className='line'></div>
          <span>Art</span>
        </div>
        <div className="item">
          <img src={facebook} alt="" />
          <div className='line'></div>
          <span>Videos</span>
        </div>
        <div className="item">
          <img src={watch} alt="" />
          <div className='line'></div>
          <span>Memories</span>
        </div>
      </div>
    </div>
  )
}

export default Explore