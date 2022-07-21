import React,{useContext,useEffect,useState}from 'react'
import Image from 'next/image'
import { Context } from '../components/Context'
import { CartData } from '../types'

const Cart = () => {

    const {cartData}=useContext(Context)
    const [total,setTotal]=useState<number>(0)


    useEffect(()=>{
        let total=0
        cartData.forEach((data:CartData)=>total+=data.total)
        setTotal(total)
    },[])

  return (
    <main className='lg:flex gap-x-6 items-start lg:p-10 p-4 w-full'>
        {/* table */}
        <section className='lg:w-3/4 w-full' >
            <table className='lg:w-full w-max mx-auto flex lg:table'>
                <thead>
                    <tr className='text-center h-full bg-rose-800 flex flex-col lg:table-row justify-around' >
                        <th className='' >Product</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {cartData?.map((data:CartData,i:number)=>(
                        <tr className='text-center' >
                            <td className='p-4 text-center w-80' >
                                <div className="w-40 h-40 relative mx-auto">
                                    <Image src={data.product} layout='fill' />
                                </div>
                                
                            </td>
                            <td>
                                <h1 className="font-black text-2xl text-rose-800">{data.name}</h1>
                            </td>
                            <td>
                                <h1 className=" text-xl ">{`₹${data.price}`}</h1>
                            </td>
                            <td>
                                <h1 className=" text-xl ">{data.quantity}</h1>
                            </td>
                            <td>
                                <h1 className=" text-xl ">{`₹${data.total}`}</h1>
                            </td>
                        </tr>
                    ))}
                    
                </tbody>
            </table>
        </section>
        {/*         Total    */}
        <div className="bg-gray-800 p-10 text-white text-xl mt-10 lg:mt-0 w-full lg:w-1/4 flex flex-col gap-y-6 rounded-lg">
            <h1 className="font-bold text-4xl  ">Cart Total</h1>
            <h1><span className='font-semibold' >Subtotal:</span>{`₹${total}`}</h1>
            <h1><span className='font-semibold' >Discount:</span> {`₹0`}</h1>
            <h1><span className='font-semibold' >Total:</span> {`₹${total}`}</h1>
            <button className="text-white w-full py-2 font-semibold bg-rose-800 border-2 border-white rounded-md hover:scale-x-105 transition-all">Checkout Now!!</button>
        </div>
    </main>
  )
}

export default Cart