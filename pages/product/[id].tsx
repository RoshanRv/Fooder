import React, { useState ,useEffect,useContext} from 'react'
import axios from 'axios'
import {PizzaList} from '../../types'
import {Context} from '../../components/Context'

interface Props{
    selected:string,
    size:string
}

interface PizzaProp{
    pizza:PizzaList
}

const Product = ({pizza}:PizzaProp) => {

    const [size,setSize]=useState<string>('medium')
    const [price,setPrice]=useState<number | any>(pizza?.prices[1])
    const [quantity,setQuantity]=useState<number>(1)
    const {cartData,setCartData} = useContext(Context)

    // console.log({cartData})

    useEffect(()=>{
        let price
        if(size=='small')price=pizza.prices[0]
        else if(size=='medium')price=pizza.prices[1]
        else if(size=='large')price=pizza.prices[2]
        setPrice(price)
    },[size])



    const handleCart=()=>{
        let list = [...cartData]
        const data = {
            product:pizza.img,
            name:pizza.title,
            price,
            quantity,
            total:price*quantity
        }
        list.push(data)
        setCartData(list)
    }

  return (
    <main className='py-10 lg:px-10 px-4 w-full' >
        <div className="lg:flex gap-x-8 items-start justify-around w-full">
            <div className={`relative w-[20rem] h-[20rem] mx-auto md:w-[30rem] md:h-[30rem] transition-all ${size=='small'?'scale-75':size=='medium'?'scale-90':size=='large'&&'scale-100'}`} >
                <img src={pizza.img}/>
            </div>

            <div className='text-left flex flex-col gap-y-6 w-full lg:w-1/2 pt-10 mx-auto' >
                <h1 className="text-6xl font-serif font-black text-rose-800">{pizza.title}</h1>
                <p className="font-mono font-semibold text-xl">{`₹${price}`}</p>
                <p className="text-lg font-light my-2">{pizza.desc}</p>
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
                    <button className="px-6 py-2 rounded-lg text-white bg-rose-800 active:shadow-none shadow-md border border-white hover:scale-x-105 shadow-rose-800 transition-all" onClick={()=>handleCart()} >Add To Cart</button>
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

export const getServerSideProps = async ({query}:any)=>{
    try{
        const product = await axios.get(`http://localhost:3000/api/product/${query.id}`)

        return {
          props:{
            pizza:product.data,
            err:false
          }
        }
    }catch(err){
      return{
        props:{
          err:true
        }
      }
    }
}