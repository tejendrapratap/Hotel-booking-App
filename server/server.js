import express from "express";
import { readdirSync } from "fs";
import cors from "cors";
//import mongoose from "mongoose";
const morgan = require("morgan");
//require("dotenv").config();

const app = express();

// db connection
//mongoose
  //.connect(process.env.DATABASE, {
    //useNewUrlParser: true,
    //useFindAndModify: false,
    //useUnifiedTopology: true,
    //useCreateIndex: true,
  //})
  //.then(() => console.log("DB Connected"))
  //.catch((err) => console.log("DB Connection Error: ", err));
  const mongoose = require("mongoose");
require('dotenv').config();

//Local offline mongodb database
const LOCAL_DB_URL= `mongodb://localhost:27017/${process.env.DB_NAME}`;
// connecting to online mongodb database
const DB_URL= `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.5vsjo.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
mongoose.connect(DB_URL,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
}).then(()=>{
    console.log("Database Connection Successful.");
}).catch((error)=>{
    console.log(error);
});

// middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
