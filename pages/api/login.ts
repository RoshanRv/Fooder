import cookie from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'

const handler5 = (req:NextApiRequest,res:NextApiResponse)=>{

    const {method} = req
    console.log('Hell Yeah')


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

// export default handler

import dbConnect from '../../utlis/mongo'
import Product from '../../modals/Product'
// import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req:NextApiRequest,res:NextApiResponse)=>{

    const {method} = req
    
    dbConnect()

    if(method=='GET'){
        try{
            const products = await Product.find()
            res.status(200).json(products)
        }catch(err){
            res.status(500).json(err)
        }
    }

    if(method=='POST'){
        try{
            const product = await Product.create(req.body)
            res.status(201).json(product)
        }catch(err){
            res.status(500).json(err)
        }
    }
}

export default handler5