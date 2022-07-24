import Order from "../../../modals/Order";
import Product from "../../../modals/Product";
import dbConnect from "../../../utlis/mongo";

const handler = async (req:any,res:any)=>{
    // const {method} = req

    await dbConnect()
    try{
        // console.log('Check for errror')
        const order = await Order.find()
        res.json(order)
        // res.status(201).json(Order)
        // res.json('No err da...')
    }catch(err){
        res.json({err:Order.find()})
    }

    // if(method=='GET'){
    //     try{
    //         const order = await Order.find()
    //         res.status(201).json(order)
    //     }catch(err){
    //         res.status(500).json(err)
    //     }
    // }  

    // if(method=='POST'){
    //     try{
    //         const order = await Order.create(req.body)
    //         console.log(order)
    //         res.status(201).json(order)
    //     }catch(err){
    //         res.status(500).json(err)
    //     }
    // }  
}

export default handler