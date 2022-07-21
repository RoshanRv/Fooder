import React,{useContext}from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faCartShopping, faPhoneFlip } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { Context } from './Context'

const Navbar = () => {

  const {cartData}=useContext(Context)

  return (
    <header className='w-full' >
      <nav className='lg:px-20 bg-rose-800 px-4 py-6  flex justify-between items-center text-white'>
        {/*     Call Now */}
        <div className='lg:flex hidden gap-x-4 items-center'>
          <button><FontAwesomeIcon icon={faPhoneFlip} className='w-10 rounded-full bg-white  p-2 text-rose-800'/></button>
          <div className=''>
            <h1 className="font-light">Order Now !!</h1>
            <p className='font-bold text-xl' >0123 789</p>
          </div>
        </div>
        {/*     menu button  */}
        <button className='lg:hidden'><FontAwesomeIcon icon={faBars} className='w-6 ' /></button>
        {/*   LOGO */}
        <div className="flex items-center gap-x-10">
          <div className=' items-center gap-x-10 text-lg hidden lg:flex  font-semibold'>
            <Link href={''}><a className='' >Products</a></Link>
            <Link href={''}><a className='' >Menu</a></Link>
          </div>

          <h1 className="font-serif text-4xl font-black">LOGO</h1>

          <div className='lg:flex hidden items-center gap-x-10 text-lg  font-semibold'>
            <Link href={''}><a className='' >Events</a></Link>
            <Link href={''}><a className='' >Contact</a></Link>
          </div>

        </div>

        {/*   Cart */}
        <div className='relative' >
          <Link href={'/cart'}><button><FontAwesomeIcon icon={faCartShopping} className='w-6  text-white ' /></button></Link>
          {cartData.length>0&&<p className='absolute -top-4 -right-4 bg-black p-1 rounded-full font-bold text-xs px-2 h-max '>{cartData.length}</p>}
        </div>

      </nav>
    </header>

  )
}

export default Navbar