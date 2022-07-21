import React from 'react'
import Image from 'next/image'

const PizzaCard = () => {
  return (
    <div className='p-3 rounded-lg bg-rose-800 shadow-lg shadow-rose-500 h-full text-white'>
        <div className="relative w-60 h-60 mx-auto m-3 drop-shadow-lg rounded-full  overflow-hidden">
            <Image src={'/img/pizza.png'} layout='fill' className='hover:scale-110 transition-all'/>
        </div>
        <h1 className='text-4xl font-serif font-semibold my-6' >Pizza</h1>
        <p className="w-max text-2xl font-mono mx-auto my-2 font-semibold">$20.00</p>
        <p className="text-lg font-light my-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur ex, suscipit praesentium non voluptatum porro? Numquam quos cum officia magnam dolore omnis excepturi. Omnis quia, corrupti quam animi tenetur voluptates.</p>
    </div>

  )
}

export default PizzaCard