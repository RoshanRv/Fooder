import React from 'react'
import PizzaCard from './PizzaCard'

const ProductList = () => {
  return (
    <section className='my-4  mt-20 text-center lg:mx-16 mx-4'>
        <h1 className="lg:text-6xl text-4xl my-8 font-black font-serif text-rose-800">Our Pizza Varities</h1>
        <p className='font-light text-xl text-left ' >Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, enim suscipit inventore et consequatur fugiat ipsa natus similique dolore quis laborum nam libero voluptatibus itaque quam omnis ut dolor nihil ullam reprehenderit accusantium odio ad? Repellat quam laboriosam quaerat cupiditate, officia accusamus unde necessitatibus, labore non impedit ipsa asperiores explicabo.</p>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 sm:grid-cols-2 gap-8 mt-12">
            <PizzaCard/>
            <PizzaCard/>
            <PizzaCard/>
            <PizzaCard/>
        </div>
    </section>
  )
}

export default ProductList