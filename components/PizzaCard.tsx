import React from 'react'
import Image from 'next/image'
import { PizzaList } from '../types'
import Link from 'next/link'

interface Props{
  data:PizzaList
}

const PizzaCard = ({data}:Props) => {
  return (
    <Link href={`product/${data._id}`}>
      <div className='p-3 rounded-lg cursor-pointer bg-rose-800 shadow-lg shadow-rose-500 h-full text-white'>
          <div className="relative w-60 h-60 mx-auto m-3 drop-shadow-lg rounded-full  overflow-hidden">
              <Image src={data.img} layout='fill' className='hover:scale-110 transition-all'/>
          </div>
          <h1 className='text-4xl font-serif font-semibold my-6' >{data.title}</h1>
          <p className="w-max text-2xl font-mono mx-auto my-2 font-semibold">{`₹${data.prices[0]}`}</p>
          <p className="text-lg font-light my-2">{data.desc}</p>
      </div>
    </Link>

  )
}

export default PizzaCard