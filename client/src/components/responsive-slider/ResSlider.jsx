import React, { useEffect } from 'react'
import './resSlider.scss'
import Slider from "react-slick";
import catData from '../../slider_data'
import useEmblaCarousel from 'embla-carousel-react'

function ResSlider() {
  // const [emblaRef] = useEmblaCarousel()
  const [emblaRef, emblaApi] = useEmblaCarousel({ speed: 50 })
  
  useEffect(() => {
    if (emblaApi) {
      // Embla API is ready
    }
  }, [emblaApi])

  // console.log(catData)
  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        {catData.map(element => {
           return (
              <div className="embla__slide" key={element.id}>
                <div className="container">
                    <div className="top">
                    <img src={element.img} alt="" />
                  </div>
                  <div className="bottom flex-column">
                    <div className="user flex">
                      <img src={element.img} alt="" />
                      <span>{element.title}</span>
                    </div>
                    <div className="desc">
                      <span>{element.desc}</span>
                    </div>
                  </div>
                </div>
              </div>
            )
        })}
      </div>
    </div>
  )
}

export default ResSlider

{/* <div className='res-slider flex'>
     
     {catData.map((slider) => {
       return (
         <Slider>
           <div className="container" key={slider.id}>
             <div className="top">
               <img src={slider.img} alt="" />
             </div>
             <div className="bottom flex-column">
               <div className="user flex">
                 <img src={slider.img} alt="" />
                 <span>{slider.title}</span>
               </div>
               <div className="desc">
                 <span>{slider.desc}</span>
               </div>
             </div>
           </div>
         </Slider>
       )
     })}
   </div> */}


  //  return (
  //   <div className="embla__slide" key={element.id}>
  //     <div className="container">
  //         <div className="top">
  //         <img src={element.img} alt="" />
  //       </div>
  //       <div className="bottom flex-column">
  //         <div className="user flex">
  //           <img src={element.img} alt="" />
  //           <span>{element.title}</span>
  //         </div>
  //         <div className="desc">
  //           <span>{element.desc}</span>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // )