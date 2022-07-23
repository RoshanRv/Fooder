import axios from 'axios'
import React,{useState}from 'react'
import { useRouter } from 'next/router'

const login = () => {

    const [username,setUsername]=useState<string>()
    const [password,setPassword]=useState<string>()
    const [isError,setIsError]=useState<boolean>()

    const naviagte = useRouter()

    const handleLogin = async ()=>{
        try{
            await axios.post('http://localhost:3000/api/login',{username,password})

            naviagte.push('/admin')
        }catch(err){
            setIsError(true)
        }
    }

  return (
    <main className='w-full h-[80vh] flex flex-col justify-center items-center' >
        <div className=' lg:w-1/2 md:3/4 w-full  bg-rose-800 rounded-lg shadow-xl shadow-black text-center flex flex-col gap-y-8  border-black transition-all lg:p-10 p-3' >
            <h1 className="text-4xl my-1 font-semibold text-white font-serif">Login</h1>
            <input type="text" className='block p-2 w-full border-4 border-black rounded-md' placeholder='Username' value={username} onChange={(e)=>setUsername(e.target.value)} />
            <input type="password" className='block p-2 w-full border-4 border-black rounded-md' placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} />
            {isError&&(<h1 className='text-xl font-bold my-2 text-white'>Wrong Credentials!</h1>)}
            <button onClick={()=>handleLogin()} className="bg-white w-max px-6 mx-auto text-rose-800 py-2 rounded-md font-bold text-xl border-4 my-4 border-black ">Login</button>
        </div>
    </main>
  )
}

export default login