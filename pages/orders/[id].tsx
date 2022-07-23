import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBowlRice,faPersonBiking,faBoxOpen,faMoneyBill } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'
import axios from 'axios'

interface StatusProps{
    status:number,
    index:number,
    text:string,
    icon:any
}

interface OrderProps{
    order:{
        _id:string,
        customer:string,
        address:string,
        total:number,
        status:number
    }
}


const Order = ({order}:OrderProps) => {

    const [status,setStatus]=useState<number>(order.status)


  return (
    <main className='lg:flex gap-x-6 items-start lg:p-10 p-4 w-full'>
        {/* table */}
        <section className='lg:w-3/4 w-full text-center' >
            <table className='lg:w-full w-max flex lg:table mx-auto'>
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
                        <td>{order._id}</td>
                        <td>{order.customer}</td>
                        <td>{order.address}</td>
                        <td>{`₹${order.total}`}</td>
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
        <div className="bg-gray-800 p-10 text-white mt-12 lg:mt-0  text-xl w-full lg:w-1/4 flex flex-col gap-y-6 rounded-lg">
            <h1 className="font-bold text-4xl  ">Cart Total</h1>
            <h1><span className='font-semibold' >Subtotal:</span>{`₹${order.total}`}</h1>
            <h1><span className='font-semibold' >Discount:</span> {`₹0`}</h1>
            <h1><span className='font-semibold' >Total:</span> {`₹${order.total}`}</h1>
            <button className="text-white w-full py-2 font-semibold bg-green-600 border-2 border-white rounded-md hover:scale-x-105 transition-all">Paid</button>
        </div>
    </main>
  )
}

export default Order

export const StatusCard=({status,index,text,icon}:StatusProps)=>{
    return(
        <div className={`${status>index?'opacity-100':status==index?'animate-pulse':'opacity-20'} text-center flex gap-x-1 flex-col gap-y-3 `} >
            <FontAwesomeIcon icon={icon} className='md:text-5xl text-2xl' />
            <h1 className='md:text-lg text-sm font-semibold capitalize' >{text}</h1>
            <div className={`w-max rounded-full mx-auto  bg-green-500 ${status>index?'block':'hidden'}`}>
                <FontAwesomeIcon icon={faCheck} className='font-black text-white text-xl pb-0 p-1 px-2 rounded-full'/>
            </div>
        </div>
    )
}

interface ServerProps{
    query:{
        id:string
    }
}

export const getServerSideProps =async ({query}:ServerProps)=>{

    try{
        const order = await axios.get(`http://localhost:3000/api/order/${query.id}`)

        return {
            props:{
                order:order.data
            }
        }
    }catch(err){

        return {
            redirect:{
                destination:'/',
                permanent:false
            }
        }
    }

   
}