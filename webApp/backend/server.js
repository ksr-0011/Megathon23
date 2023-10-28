const express=require("express");
const dotenv= require("dotenv");

dotenv.config();

var cors = require('cors')
const port = process.env.PORT;
const app = express();
app.use(cors())
const connectDB=require("./config/db.js")
connectDB();
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use("/",require("./routes/userRoutes.js"));
app.listen(port,()=>{console.log(`Server started on ${port}`)});