import dbConnect from '../../../utlis/mongo'
import Order from "../../../modals/Order";
import mongoose from 'mongoose';

const handler = async(req,res)=>{

    const {method,query:{id}} = req
    dbConnect()

    if(method=='GET'){
        try{
            const order = await Order.findById(mongoose.Types.ObjectId(id))
            res.status(200).json(order)
        }catch(err){
            res.status(500).json(err)
        }
    }

}

export default handler
