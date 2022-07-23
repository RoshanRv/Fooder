import Head from 'next/head'
import HomeHero from '../components/HomeHero'
import axios from 'axios'
import {PizzaList} from '../types'
import PizzaCard from '../components/PizzaCard'

interface Props{
  pizzaList:[PizzaList]
  err:boolean
}


const Home = ({pizzaList,err}:Props) => {


  return (
    <div className=" min-h-screen ">
      
      <Head>
      <title>F🍔🍔der | Home</title>
        <link rel="icon" href="/favicon.ico" />          
        <meta
            name="description"
            content={`Order Delicious And Lip Smacking Pizzas`}
          />

          <meta property="og:image" content={pizzaList[0].img} />
          <meta property="og:title" content={pizzaList[0]?.title + ' and more!'} />
          <meta
            property="og:description"
            content={pizzaList[0]?.desc}
          />

          <meta property="twitter:image" content={pizzaList[0].img} />
          <meta property="twitter:title" content={pizzaList[0]?.title + ' and more!'} />
          <meta
            property="twitter:description"
            content={pizzaList[0]?.desc}
          />
    </Head>

      <main className="">
        <HomeHero />
        <section className='my-4  mt-20 text-center lg:mx-16 mx-4'>
            <h1 className="lg:text-6xl text-4xl my-8 font-black font-serif text-rose-800">Our Pizza Varities</h1>
            <p className='font-light text-xl text-left ' >Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, enim suscipit inventore et consequatur fugiat ipsa natus similique dolore quis laborum nam libero voluptatibus itaque quam omnis ut dolor nihil ullam reprehenderit accusantium odio ad? Repellat quam laboriosam quaerat cupiditate, officia accusamus unde necessitatibus, labore non impedit ipsa asperiores explicabo.</p>
            <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 sm:grid-cols-2 gap-8 mt-12">
                {pizzaList?.map(pizza=>(
                    <PizzaCard data={pizza} key={pizza._id} />
                ))}
            </div>
        </section>

      </main>  
    </div>
  )
}

export default Home

export const getServerSideProps = async ()=>{
    try{
        const products = await axios.get('http://localhost:3000/api/product')

        return {
          props:{
            pizzaList:products.data,
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
