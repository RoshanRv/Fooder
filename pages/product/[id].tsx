import React, { useState } from 'react'
import Image from 'next/image'

interface Props{
    selected:string,
    size:string
}

const Product = () => {

    const [size,setSize]=useState<string>('medium')
    const [quantity,setQuantity]=useState<number>(1)

  return (
    <main className='py-10 lg:px-10 px-4 w-full' >
        <div className="lg:flex gap-x-8 items-start justify-around w-full">
            <div className={`relative w-[20rem] h-[20rem] mx-auto md:w-[30rem] md:h-[30rem] transition-all ${size=='small'?'scale-75':size=='medium'?'scale-90':size=='large'&&'scale-100'}`} >
                <img src='/img/pizza.png'/>
            </div>

            <div className='text-left flex flex-col gap-y-6 w-full lg:w-1/2 pt-10 mx-auto' >
                <h1 className="text-6xl font-serif font-black text-rose-800">Pizza</h1>
                <p className="font-mono font-semibold text-xl">$ 25.00</p>
                <p className="text-lg font-light my-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur ex, suscipit praesentium non voluptatum porro? Numquam quos cum officia magnam dolore omnis excepturi. Omnis quia, corrupti quam animi tenetur voluptates.</p>
                {/*         size */}
                <p className="text-xl font-semibold text-rose-800 ">Choose The Size</p>
                <div className='flex items-center my-4 gap-x-8'>
                    <button onClick={()=>setSize('small')}  ><PizzaSize selected={size} size='small' /></button>
                    <button  onClick={()=>setSize('medium')} ><PizzaSize selected={size} size='medium' /></button>
                    <button  onClick={()=>setSize('large')} ><PizzaSize selected={size} size='large' /></button>

                </div>
                {/*         quantity and cart */}
                <p className="text-xl font-semibold text-rose-800 ">Quantity</p>
                <div className="flex gap-x-8">
                    <input type={'number'} min={1} className='p-2 outline-0 border-2 border-rose-800 rounded-lg' value={quantity} onChange={(e)=>setQuantity(Number(e.target.value))} />
                    <button className="px-6 py-2 rounded-lg text-white bg-rose-800 active:shadow-none shadow-md border border-white hover:scale-x-105 shadow-rose-800 transition-all">Add To Cart</button>
                </div>
            </div>
        </div>
    </main>
  )
}

export default Product

const PizzaSize = ({selected,size}:Props)=>{
    return(
        <div className={`p-3 rounded-lg shadow-lg transition-all border-2 ${selected==size?'bg-rose-800 text-white shadow-rose-500 border-white':'bg-white text-black  border-rose-800'} `}>
            <h1 className="capitalize">{size}</h1>
        </div>
    )
}