import React, { useContext, useState } from 'react'
import './OrderBox.scss'
import { MdOutlineAccessTime } from 'react-icons/md'
import { TiArrowSync } from 'react-icons/ti'
import { FcCheckmark } from 'react-icons/fc'
import { AuthContext } from '../../context/authContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import newRequest from '../../context/newRequest'
import { Link, useNavigate, useParams } from 'react-router-dom'


function OrderBox({ data }) {

  // const options = [
  //   {
  //     id: 1,
  //     title: "Basic",
  //     price: 10,
  //     desc: "Basic Formatting I'll do basic excel sheet formatting ( One Sheet )",
  //     delivaryDate: 2,
  //     revision: 1,
  //     packages: [
  //       {title: "Prompt writing"},
  //     ]
  //   },
  //   {
  //     id: 2,
  //     title: "Standard",
  //     price: 25,
  //     desc: "Formatting & Formulas I'll do conditional and basic excel sheet formatting with basic formula ( One Sheet )",
  //     delivaryDate: 2,
  //     revision: 2,
  //     packages: [
  //       {title: "Prompt writing"},
  //       {title: "Artwork delivery"},
  //     ]
  //   },
  //   {
  //     id: 3,
  //     title: "Premium",
  //     price: 50,
  //     desc: "Fully Automated Sheet I'll do Formatting and Use Advance Formulas and Macros ( One Sheet )",
  //     delivaryDate: 3,
  //     revision: 4,
  //     packages: [
  //       {title: "Prompt writing"},
  //       {title: "Artwork delivery"},
  //       {title: "Image upscaling"},
  //       {title: "Additional desitn"},
  //     ]
  //   },
  // ]

  const { id } = useParams()// gig id
  const { currentUser } = useContext(AuthContext)

  const [ taps, setTaps ] = useState(0)

  const toggleTaps = (index) => {
    setTaps(index)
  }

  const navigate = useNavigate()
  const handleBuy = () => {
    if(currentUser === null) {
      navigate(`/login`)
      return
    }

    navigate(`/payment/${id}`)
  }
  
  return (
    <div className='order-box'>
      <div className="buttons">
        <button className={taps === 0 ? "tap active-tap" : "tap"} onClick={()=> toggleTaps(0)}>Basic</button>
        <button className={taps === 1 ? "tap active-tap" : "tap"} onClick={()=> toggleTaps(1)}>Standard</button>
        <button className={taps === 2 ? "tap active-tap" : "tap"} onClick={()=> toggleTaps(2)}>Premium</button>
      </div>
      
      <div className={"box active-box"}>
        <div className="title flex-between">
          <h2>{data?.title}</h2>
          <span>$ {data?.price}</span>
        </div>
        <p>{data?.shortDesc}</p>
        <div className="delivery flex-between">
          <div className="delivery-time flex">
            <MdOutlineAccessTime size={25} color="var(--fail)"/>
            <span>{data?.delivaryTime} Days Delivary</span>
          </div>
          <div className="revision-time flex">
            <TiArrowSync size={25}/>
            <span>{data?.revisionTime} Revision</span>
          </div>
        </div>
        <div className="features">
          {data?.features?.map((pack, i) => {
            return (
              <div className="item flex" key={i}>
                <FcCheckmark/>
                <span>{pack}</span>
              </div>
            )
          })}
        </div>
        {currentUser?.isSeller 
          ? <span style={{ color: " var(--fail)", marginLeft:"50%"}}>You have a seller account</span> 
          : <button onClick={handleBuy}>Proceed to buy</button>
        }
      </div>


    </div>
  )
}

export default OrderBox


// return (
//     <div className='order-box'>
//       <div className="buttons">
//         <button className={taps === 0 ? "tap active-tap" : "tap"} onClick={()=> toggleTaps(0)}>Basic</button>
//         <button className={taps === 1 ? "tap active-tap" : "tap"} onClick={()=> toggleTaps(1)}>Standard</button>
//         <button className={taps === 2 ? "tap active-tap" : "tap"} onClick={()=> toggleTaps(2)}>Premium</button>
//       </div>
      
//       { datas.map((option, i) => {
//         const { packages } = option
//         return (
//           <div className={ taps === i ? "box active-box" : "box" } key={option.id}>
//             <div className="title flex-between">
//               <h2>1 Ai generated image</h2>
//               <span>$ {option.price}</span>
//             </div>
//             <p>{option.desc}</p>
//             <div className="delivery flex-between">
//               <div className="delivery-time flex">
//                 <MdOutlineAccessTime size={25} color="var(--fail)"/>
//                 <span>{option.delivaryDate} Days Delivary</span>
//               </div>
//               <div className="revision-time flex">
//                 <TiArrowSync size={25}/>
//                 <span>{option.revision} Revision</span>
//               </div>
//             </div>
//             <div className="features">
//               {packages?.map((pack, i) => {
//                 return (
//                   <div className="item flex" key={i}>
//                     <FcCheckmark/>
//                     <span>{pack.title}</span>
//                   </div>
//                 )
//               })}
//             </div>
//             <button>Continue</button>
//           </div>
//         )

//       })}
//     </div>
//   )