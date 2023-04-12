import React from 'react'
import './Business.scss'
import { BsCheck2Circle } from 'react-icons/bs'

function Business() {
  return (
    <div className='business flex'>
      <div className='hero flex'>
        <div className="left flex-column">
          <h2>ShopiFi<span> freelance </span></h2>
          <h2>A business solution designed for  <br/> <span> teams </span></h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. <br/> Nobis animi optio sequi maxime saepe ipsam</p>

          <div className="item">
            <div className="title">
              <div className='first-row flex'>
                <BsCheck2Circle size={25} color={"gray"}/>
                <h3>Lorem ipsum dolor sit amet consectetur adipisicing. So many books, so little time</h3>
              </div>
            </div>
          </div>

          <div className="item">
            <div className="title">
              <div className='first-row flex'>
                <BsCheck2Circle size={25} color={"gray"}/>
                <h3>Lorem ipsum dolor sit amet consectetur. So many books, so little time</h3>
              </div>
            </div>
          </div>

          <div className="item">
            <div className="title">
              <div className='first-row flex'>
                <BsCheck2Circle size={25} color={"gray"}/>
                <h3> Lorem ipsum dolor sit. So many books, so little time</h3>
              </div>
            </div>
          </div>

          <button>Explore ShopiFi Business</button>
        </div>
        <div className="right flex">
          <img src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_660,dpr_1.0/v1/attachments/generic_asset/asset/5364183d1377de2e002df16f78f56ef3-1599950021826/scattered-feedback-desktop-660-x2.png" alt="" />
        </div>
      </div>
    </div>
  )
}

export default Business