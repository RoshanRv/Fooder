import axios from 'axios'
import React from 'react'
import Image from 'next/image'
import {useState} from 'react'

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

const Admin = ({products,orders}:AdminProp) => {

    const statusDetail = ['Payment','Preparing','On The Way','Delivered']

    const [ordersList,setOrdersList]=useState<Order[]>(orders)
    const [productsList,setproductsList]=useState<Product[]>(products)

    const handleNextStage = async (order:Order)=>{
        const currStatus = order.status

        const res = await axios.put(`http://localhost:3000/api/order/${order._id}`,{
            status:currStatus+1
        })

        setOrdersList([
            res.data,...ordersList.filter((order)=>order._id!=res.data._id)
        ])
    }

  return (
    <main>
        <section className='my-8 text-center lg:px-20'>
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
                                        <button className="bg-green-600 p-2 rounded-md">Edit</button>
                                        <button className="bg-red-600 p-2 rounded-md">Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </section>

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
                                        <button className="bg-green-600 p-2 rounded-md" onClick={()=>handleNextStage(order)} >Next Stage</button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </section>
    </main>
  )
}

export default Admin

export const getServerSideProps= async (ctx:object)=>{
    
    const products = await axios.get('http://localhost:3000/api/product')
    const orders = await axios.get('http://localhost:3000/api/order')

    return {
        props:{
            products:products.data,
            orders:orders.data
        }
    }

}