import dbConnect from '../../../utlis/mongo'
import Product from '../../../modals/Product'
import mongoose from 'mongoose'

const handler = async (req,res)=>{

    const {
        method,
        query: { id },
      } = req

    
    await dbConnect()

    if(method=='GET'){
        try{
            const product = await Product.findById(new mongoose.Types.ObjectId(id))
            res.status(200).json(product)
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

    if(method=='PUT'){
        try{
            const product = await Product.findByIdAndUpdate(new mongoose.Types.ObjectId(id),req.body,{new:true})
            res.status(201).json(product)
        }catch(err){
            res.status(500).json(err)
        }
    }

    if(method=='DELETE'){
        try{
            const product = await Product.findByIdAndDelete(new mongoose.Types.ObjectId(id))
            res.status(201).json(product)
        }catch(err){
            res.status(500).json(err)
        }
    }
}

export default handler