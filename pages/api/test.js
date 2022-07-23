const handler = (req,res)=>{



    res.json(process.env.MONGO_URL)



}

export default handler