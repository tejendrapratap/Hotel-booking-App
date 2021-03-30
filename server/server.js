import express from "express";
import {readdirSync} from "fs";
const morgan = require('morgan');
require('dotenv').config();

const app = express();

//middlewares
app.use(morgan("dev"));

//route middleware
readdirSync("./routes").map((r)=>app.use('/api', require(`./routes/${r}`)));
//app.use('/api',router); 

const port=process.env.PORT || 8000;

app.listen(port,()=>console.log(`Server is running on port ${port}`));