import React from 'react'
import Image from 'next/image'

const Cart = () => {
  return (
    <main className='flex gap-x-6 items-start lg:p-10 p-4 w-full'>
        {/* table */}
        <section className='w-3/4' >
            <table className='w-full'>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className='text-center' >
                        <td className='p-4 text-center w-80' >
                            <div className="w-40 h-40 relative mx-auto">
                                <Image src={'/img/pizza.png'} layout='fill' />
                            </div>
                            
                        </td>
                        <td>
                            <h1 className="font-black text-2xl text-rose-800">Pizza</h1>
                        </td>
                        <td>
                            <h1 className=" text-xl ">$20.00</h1>
                        </td>
                        <td>
                            <h1 className=" text-xl ">2</h1>
                        </td>
                        <td>
                            <h1 className=" text-xl ">$40.00</h1>
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>
        {/*         Total    */}
        <div className="bg-gray-800 p-10 text-white text-xl w-1/4 flex flex-col gap-y-6 rounded-lg">
            <h1 className="font-bold text-4xl  ">Cart Total</h1>
            <h1><span className='font-semibold' >Subtotal:</span> $40.00</h1>
            <h1><span className='font-semibold' >Discount:</span> $10.00</h1>
            <h1><span className='font-semibold' >Total:</span> $30.00</h1>
            <button className="bg-white w-full py-2 font-semibold text-rose-800 rounded-md hover:scale-x-105 transition-all">Checkout Now!!</button>
        </div>
    </main>
  )
}

export default Cart