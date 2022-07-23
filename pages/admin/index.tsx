import axios from 'axios'
import React, { useEffect } from 'react'
import Image from 'next/image'
import {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import Product from '../../modals/Product'

interface AdminProp{
    products:[Product],
    orders:[Order]
}

interface Product{
    _id:string,
    title:string,
    desc:string,
    img:string,
    prices:[number,number,number]
}

interface Order{
    _id:string
    customer:string,
    total:number,
    status:number
}

interface ShowModal {
    show:boolean,
    product:Product
}

const Admin = ({products,orders}:AdminProp) => {

    const statusDetail = ['Payment','Preparing','On The Way','Delivered']

    const [ordersList,setOrdersList]=useState<Order[]>(orders)
    const [productsList,setProductsList]=useState<Product[]>(products)

    const [showModal,setShowModal]=useState<ShowModal>({show:false,product:products[0]})

    const handleNextStage = async (order:Order)=>{
        const currStatus = order.status

        const res = await axios.put(`http://localhost:3000/api/order/${order._id}`,{
            status:currStatus+1
        })

        setOrdersList([
            res.data,...ordersList.filter((order)=>order._id!=res.data._id)
        ])
    }

    const handleDelete = async(id:string)=>{

        const res = await axios.delete(`http://localhost:3000/api/product/${id}`)
        if(res){
            setProductsList([
                ...productsList.filter(product=>product._id!==id)
            ])
        }
        
    }

  return (
    <main>
        <section className='my-8 text-center lg:px-20'>
            {/*                 PRODUCTSS            */}
            <h1 className="text-4xl font-bold text-rose-800 my-4 font-serif">Products</h1>
            <table className='lg:w-full w-max mx-auto'>
                <thead>
                    <tr  className='text-center h-full bg-rose-800 table-row ' >
                        <th>Image</th>
                        <th>Title</th>
                        <th>Desc.</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        productsList.map(product=>(
                            <tr key={product._id} className='text-center table-row'>
                                <td>
                                    <div className='h-40 w-40 relative' >
                                        <Image src={product.img} layout='fill' ></Image>
                                    </div>
                                </td>
                                <td>{product.title}</td>
                                <td>{`${product.desc.slice(0,80)}...`}</td>
                                <td>{product.prices[0]}</td>
                                <td>
                                    <div className="flex gap-x-4 text-white justify-around">
                                        <button className="bg-green-600 p-2 rounded-md" onClick={()=>{
                                            setShowModal({show:true,product:product})
                                        }} >Edit</button>
                                        <button onClick={()=>handleDelete(product._id)} className="bg-red-600 p-2 rounded-md">Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </section>
                    {/*             ORDERSSS */}
        <section className='my-8 text-center lg:px-20'>
            <h1 className="text-4xl font-bold text-rose-800 my-4 font-serif">Orders</h1>
            <table className='lg:w-full w-max mx-auto'>
                <thead>
                    <tr  className='text-center h-full bg-rose-800 table-row ' >
                        <th>ID</th>
                        <th>Customer</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        ordersList.map(order=>(
                            <tr key={order._id} className='text-center table-row'>
                                <td>
                                    {order._id}
                                </td>
                                <td>{order.customer}</td>
                                <td>{`₹${order.total}`}</td>
                                <td>{statusDetail[order.status-1]}</td>
                                <td>
                                    <div className="flex gap-x-4 text-white justify-around">
                                        <button disabled={order.status>3} className="bg-green-600 p-2 disabled:bg-gray-400 rounded-md" onClick={()=>handleNextStage(order)} >Next Stage</button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </section>
        {/*         Modal        */}
        <EditProduct showModal={showModal} setShowModal={setShowModal} setProductsList={setProductsList} productsList={productsList} />
    </main>
  )
}

export default Admin

interface EditProp{
    showModal:ShowModal,
    setShowModal :any,
    setProductsList:any,
    productsList:Product[]
}

export const EditProduct = ({showModal,setShowModal,setProductsList,productsList}:EditProp)=>{
    
    const [img,setImg]=useState<string>(showModal.product.img)
    const [title,setTitle]=useState<string>(showModal.product.title)
    const [desc,setDesc]=useState<string>(showModal.product.desc)
    const [smallPrice,setSmallPrice]=useState<number>(showModal.product?.prices[0])
    const [mediumPrice,setMediumPrice]=useState<number>(showModal.product?.prices[1])
    const [largePrice,setLargePrice]=useState<number>(showModal.product?.prices[2])

    useEffect(()=>{
        setImg(showModal.product.img)
        setTitle(showModal.product.title)
        setDesc(showModal.product.desc)
        setSmallPrice(showModal.product?.prices[0])
        setMediumPrice(showModal.product?.prices[1])
        setLargePrice(showModal.product?.prices[2])
    },[showModal.show])

    const handleEdit= async ()=>{
        const res = await axios.put(`http://localhost:3000/api/product/${showModal.product._id}`,{
            title,img,desc,
            prices:[smallPrice,mediumPrice,largePrice]
        })

        setProductsList([
            res.data,...productsList.filter((product)=>product._id!=res.data._id)
        ])


    }

    return(
        <>
       {showModal.show&&<section className={`fixed ${showModal.show?'top-1/2':'-top-full'} lg:w-1/2 md:3/4 w-full -translate-y-1/2 right-1/2 translate-x-1/2  bg-rose-800 rounded-lg shadow-xl shadow-black  border-black transition-all`} >
            <div className="relative w-full h-full lg:p-10 p-3 flex flex-col text-center gap-y-4">
                <button className='absolute top-3 right-3 text-white'onClick={()=>setShowModal({show:false,product:showModal.product})}  ><FontAwesomeIcon icon={faClose} className='text-2xl' /></button>
                <h1 className="text-4xl my-4 font-semibold text-white font-serif">Edit Product Details</h1>
                    <input type="text" className='block p-2 w-full border-4 border-black rounded-md' placeholder='Image URL: Eg: /img/pizza.png' value={img} onChange={(e)=>setImg(e.target.value)} />
                    <input type="text" className='block p-2 w-full border-4 border-black rounded-md' placeholder='Title: Eg: Pizza' value={title} onChange={(e)=>setTitle(e.target.value)} />
                    <input type="tel" className='block p-2 w-full border-4 border-black rounded-md' placeholder='Description: Eg: Lorem Ispum...' value={desc} onChange={(e)=>setDesc(e.target.value)} />
                    <h1 className="text-center my-3 text-2xl  text-white font-bold font-serif">Prices</h1>
                    <div className="flex justify-around gap-x-3">
                        <input type="number" className='block p-2 w-full border-4 border-black rounded-md' placeholder='Small: 70' value={smallPrice} onChange={(e)=>setSmallPrice(Number(e.target.value))} />
                        <input type="number" className='block p-2 w-full border-4 border-black rounded-md' placeholder='Small: 100' value={mediumPrice} onChange={(e)=>setMediumPrice(Number(e.target.value))} />
                        <input type="number" className='block p-2 w-full border-4 border-black rounded-md' placeholder='Small: 70' value={largePrice} onChange={(e)=>setLargePrice(Number(e.target.value))} />
                    </div>
                    <button onClick={()=>handleEdit()} className="bg-white w-max px-6 mx-auto text-rose-800 py-2 rounded-md font-bold text-xl border-4 my-4 border-black ">Edit</button>
            </div>
        </section>}
        </>
    )
}

export const getServerSideProps= async (ctx:any)=>{

    const cookie = ctx.req?.cookies || ''

    if(cookie.token !== process.env.ADMIN_TOKEN){

        return {
            redirect:{
                destination:'/admin/login '
            }
        }

    }
    
    const products = await axios.get('http://localhost:3000/api/product')
    const orders = await axios.get('http://localhost:3000/api/order')

    return {
        props:{
            products:products.data,
            orders:orders.data
        }
    }

}