import cookie from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = (req:NextApiRequest,res:NextApiResponse)=>{

    const {method} = req

    if(method=='POST'){
        const {username,password} = req.body
        if(username==process.env.USERNAME && password == process.env.PASSWORD){
            
            res.setHeader('Set-Cookie',cookie.serialize("token",process.env.ADMIN_TOKEN,{maxAge:60*60,sameSite:'strict',path:'/'}))
            res.status(200).json('Success')
        }else{
            res.status(400).json('Wrong Credentials')
        }

    }

}

export default handler

