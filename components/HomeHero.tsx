import React, { useState } from 'react'
import Image from 'next/image'
import banner1 from '../public/img/banner1.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'

const HomeHero = () => {

    const [slideIndex,setSlideIndex]=useState(0)

    const handleNext = ()=>{
        if(slideIndex>=2)return setSlideIndex(0)
        return setSlideIndex(e=>e+1)
    }

    const handlePrevious = ()=>{
        if(slideIndex<=0)return setSlideIndex(2)
        return setSlideIndex(e=>e-1)
    }

  return (
    <section className='w-full h-full relative' >
        <section className='w-full flex overflow-hidden '>
            <div className='flex w-max  transition-all duration-700' style={{transform:`translateX(${-slideIndex*100}vw)`}} >
            {[1,2,3].map((data:number,i)=>(
                    <div key={i} className='w-screen h-[50rem] ' >
                        <img  src={`/img/banner${data}.png`}  className='w-full h-full lg:object-fill object-center object-cover' />
                    </div>
                ))}  
            </div>
        </section>
        {/* left */}
        <button className='z-50 absolute top-1/2  -translate-y-1/2 md:left-10 left-4' onClick={()=>handlePrevious()} ><FontAwesomeIcon icon={faAngleLeft} className='w-10 text-white h-12 rounded-full bg-white/20 p-2 z-50 px-2' /></button>
        {/* right */}
        <button className='z-50 absolute top-1/2 -translate-y-1/2 md:right-10 right-4' onClick={()=>handleNext()} ><FontAwesomeIcon icon={faAngleRight} className='w-10 text-white h-12 rounded-full bg-white/20 p-2 z-50 px-2' /></button>
    </section>
   
  )
}

export default HomeHero