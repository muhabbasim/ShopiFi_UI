import React from 'react'
import './Footer.scss'
import { BsFacebook } from 'react-icons/bs'
import { FaInstagram } from 'react-icons/fa'
import { BsTwitter } from 'react-icons/bs'
import { BsLinkedin } from 'react-icons/bs'
import { BsPinterest } from 'react-icons/bs'

function Footer() {
  return (
    <div className='footer'>
      <div className="top">
        <div className="cat">
          <h3>Categories</h3>
          <span>The internet’s </span>
          <span>source for visuals.</span>
          <span>Powered by creators </span>
          <span>everywhere.</span>
          <span>Experimental</span>
          <span>Textures & Patterns</span>
          <span>Animals</span>
          <span>Street Photography</span>
        </div>
        <div className="cat">
          <h3>About</h3>
          <span>Nature</span>
          <span>Explore</span>
          <span>Advertise</span>
          <span>Wallpapers</span>
          <span>3D Renders</span>
          <span>Editorial</span>
        </div>
        <div className="cat">
          <h3>Support</h3>
          <span>Film</span>
          <span>Food & Drink</span>
          <span>People</span>
          <span>Spirituality</span>
          <span>Business & Work</span>
        </div>
        <div className="cat">
          <h3>Community</h3>
          <span>Athletics</span>
          <span>Health & Wellness</span>
          <span>Current Events</span>
          <span>Arts & Culture</span>
      
        </div>
        <div className="cat">
          <h3>More From ShopiFi</h3>
          <span>Experimental</span>
          <span>Textures & Patterns</span>
          <span>Animals</span>
          <span>Street Photography</span>
          <span>Health & Wellness</span>
          <span>Current Events</span>
          <span>Arts & Culture</span>
          <span>Explore</span>
          <span>Advertise</span>
          <span>Wallpapers</span>
        </div>
      </div>
      <div className="line"></div>
      <div className="bottom">
        <div className="left flex">
          <h2>ShopiFi</h2>
          <span>@shopifi.co limited 2023</span>
        </div>
        <div className="right flex">
          <BsFacebook color='gray' size={20}/>
          <FaInstagram color='gray' size={20}/>
          <BsTwitter color='gray' size={20}/>
          <BsLinkedin color='gray' size={20}/>
          <BsPinterest color='gray' size={20}/>
        </div>
      </div>
    </div>
  )
}

export default Footer