import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBowlRice,faPersonBiking,faBoxOpen,faMoneyBill } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'

interface Props{
    status:number,
    index:number,
    text:string,
    icon:any
}


const Order = () => {

    const [status,setStatus]=useState<number>(3)

  return (
    <main className='flex gap-x-6 items-start lg:p-10 p-4 w-full'>
        {/* table */}
        <section className='w-3/4' >
            <table className='w-full'>
                <thead>
                    <tr className=''>
                        <th>Order ID </th>
                        <th>Customer</th>
                        <th>Address</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className='text-center font-semibold'>
                        <td>12345667</td>
                        <td>John Doe</td>
                        <td>34/1 , Flat B</td>
                        <td>$40.00</td>
                    </tr>
                </tbody>
            </table>
            {/*             status */}
            <h1 className="text-rose-800 text-4xl my-10 font-serif w-max mx-auto font-bold">Status</h1>
            {/*         status bar  */}
            <div className={` ${status==0?'w-0':status==1?'w-1/4':status==2?'w-1/2':status==3?'w-3/4':'w-full'}  transition-all bg-green-500 h-2`}></div>
            <div className='flex items-start justify-around  pt-4' >
                    <StatusCard status={status} index={0} text={'payment'} icon={faMoneyBill}/>
                    <StatusCard status={status} index={1} text={'perparing'}  icon={faBowlRice}/>
                    <StatusCard status={status} index={2} text={'one the way'} icon={faPersonBiking} />
                    <StatusCard status={status} index={3} text={'delivered'}  icon={faBoxOpen}/>


            </div>
        </section>
        {/*         Total    */}
        <div className="bg-gray-800 p-10 text-white text-xl w-1/4 flex flex-col gap-y-6 rounded-lg">
            <h1 className="font-bold text-4xl  ">Cart Total</h1>
            <h1><span className='font-semibold' >Subtotal:</span> $40.00</h1>
            <h1><span className='font-semibold' >Discount:</span> $10.00</h1>
            <h1><span className='font-semibold' >Total:</span> $30.00</h1>
            <button className="text-white w-full py-2 font-semibold bg-green-600 border-2 border-white rounded-md hover:scale-x-105 transition-all">Paid</button>
        </div>
    </main>
  )
}

export default Order

export const StatusCard=({status,index,text,icon}:Props)=>{
    return(
        <div className={`${status>index?'opacity-100':status==index?'animate-pulse':'opacity-20'} text-center flex flex-col gap-y-3 `} >
            <FontAwesomeIcon icon={icon} className='text-5xl' />
            <h1 className='text-lg font-semibold capitalize' >{text}</h1>
            <div className={`w-max rounded-full mx-auto  bg-green-500 ${status>index?'block':'hidden'}`}>
                <FontAwesomeIcon icon={faCheck} className='font-black text-white text-xl pb-0 p-1 px-2 rounded-full'/>
            </div>
        </div>
    )
}