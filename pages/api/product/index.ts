import dbConnect from '../../../utlis/mongo'
import Product from '../../../modals/Product'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req:NextApiRequest,res:NextApiResponse)=>{

    const {method} = req
    
    await dbConnect()

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

export default handler