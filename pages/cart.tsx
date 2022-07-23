import React,{useContext,useEffect,useState}from 'react'
import Image from 'next/image'
import { Context } from '../components/Context'
import { CartData } from '../types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import axios from 'axios'

const Cart = () => {

    const {cartData}=useContext(Context)
    const [total,setTotal]=useState<number>(0)
    const [showModal,setShowModal]=useState<boolean>(false)
    const [name,setName]=useState<string>('')
    const [address,setAddress]=useState<string>('')
    const [phone,setPhone]=useState<string>('')

    const navigate = useRouter()


    useEffect(()=>{
        let total=0
        cartData.forEach((data:CartData)=>total+=data.total)
        setTotal(total)
    },[])

    const handleOrder = async ()=>{
        
        const response = await axios.post(`http://localhost:3000/api/order`,{
            customer:name,
            address,
            total,
            status:1
        })

        navigate.push(`/orders/${response.data._id}`)
        
    }

  return (
    <main className='lg:flex gap-x-6 items-start lg:p-10 min-h-[90vh] p-4 w-full'>
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
            <button onClick={()=>setShowModal(true)} className="text-white w-full py-2 font-semibold bg-rose-800 border-2 border-white rounded-md hover:scale-x-105 transition-all">Checkout Now!!</button>
        </div>


        {/*         Modal    */}
        <section className={`fixed ${showModal?'top-1/2':'-top-full'} lg:w-1/2 md:3/4 w-full -translate-y-1/2 right-1/2 translate-x-1/2  bg-rose-800 rounded-lg shadow-xl shadow-black  border-4 border-black transition-all`} >
            <div className="relative w-full h-full lg:p-10 p-3 flex flex-col text-center gap-y-4">
                <button className='absolute top-3 right-3 text-white'onClick={()=>setShowModal(false)}  ><FontAwesomeIcon icon={faClose} className='text-2xl' /></button>
                <h1 className="text-4xl my-4 font-semibold text-white font-serif">Your Details</h1>
                    <input type="text" className='block p-2 w-full border-4 border-black rounded-md' placeholder='Name: Eg: Albert' value={name} onChange={(e)=>setName(e.target.value)} />
                    <input type="text" className='block p-2 w-full border-4 border-black rounded-md' placeholder='Address: Eg: 16 A , S - Flat' value={address} onChange={(e)=>setAddress(e.target.value)} />
                    <input type="tel" className='block p-2 w-full border-4 border-black rounded-md' placeholder='Phone: Eg: 12345 09765' value={phone} onChange={(e)=>setPhone(e.target.value)} />
                    <button onClick={()=>handleOrder()} className="bg-white w-max px-6 mx-auto text-rose-800 py-2 rounded-md font-bold text-xl border-4 my-4 border-black ">Order !!</button>
            </div>
        </section>
    </main>
  )
}

export default Cart