const MongoClient = require('mongoose');

const connectDB=async()=>{
    try{
        const conn= await MongoClient.connect(`${process.env.MONGO_URL}`)
        console.log(`MongoDB connected: ${conn.connection.host}`)
    }catch(error)
    {
        console.log(error);
    }
}

module.exports= connectDB;