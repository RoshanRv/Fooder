import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import HomeHero from '../components/HomeHero'

const Home: NextPage = () => {
  return (
    <div className=" min-h-screen ">
      <Head>
        <title>F🍔🍔der</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        <HomeHero />
      </main>  
    </div>
  )
}

export default Home
