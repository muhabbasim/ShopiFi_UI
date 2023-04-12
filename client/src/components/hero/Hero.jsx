import React from 'react'
import './Hero.scss'
import {FiSearch} from 'react-icons/fi'
import goggle from '../../assets/google.png'
import apple from '../../assets/apple.avif'
import amazon from '../../assets/Amazon.webp'
import logo from '../../assets/logo.webp'
import mastercard from '../../assets/mastercard.png'
import nike from '../../assets/nike.webp'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Hero() {
    const [ input, setInput ] = useState()
    const navigate = useNavigate()

    const handleSearch = () => {
        navigate(`/gigs?search=${input}`)
    }
    
  return (
    <div className="container">
        <div className='hero flex'>
            <div className="left flex-column">
                <h2>Find the perfect<span> freelance </span>servecies for your buiness</h2>
                <div className="search-box">
                    <FiSearch className='search-icon' size={22} color="gray"/>
                    <input type="search" 
                        onChange={(e) => setInput(e.target.value)}
                        placeholder='Try "Building mobile app"' 
                    />
                    <button style={{cursor: "pointer"}} onClick={handleSearch}>Search</button>
                </div>
                <div className="popular flex">
                    <span>Popular:</span>
                    <ul className='flex-between'>
                        <Link to={`/gigs?cat=design`} className='link'>
                            <li>Graphics & design</li>
                        </Link>
                        <Link to={`/gigs?cat=tech`} className='link'>
                            <li>Tech & programming</li>
                        </Link>
                        <Link to={`/gigs?cat=animation`} className='link'>
                            <li>Video & animation</li>
                        </Link>
                        <Link to={`/gigs?cat=sport`} className='link'>
                            <li>Fitness & Sport</li>
                        </Link>
                    </ul>
                </div>
            </div>
            <div className="right">
                <img src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_660,dpr_1.0/v1/attachments/generic_asset/asset/bc05537ddbcae4f68ad0b17659b45dd0-1606732443796/right-talent-desktop-660-x2.png" alt="" />
            </div>
            
        </div>
        <div className="credentials flex">
            <span>Trusted by:</span>
            <div className="brands flex">
                <img src={goggle} alt="" />
                <img src={apple} alt="" />
                <img src={amazon} alt="" />
                <img src={logo} alt="" />
                <img src={nike} alt="" />
                <img src={mastercard} alt="" />
            </div>
        </div>

    </div>
  )
}

export default Hero