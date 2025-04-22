import express, { request, response } from "express";
import { PORT,mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import {Book} from './models/bookmodel.js'
import booksRoutes from './routes/booksRoute.js'
import cors from 'cors';
// const config = require('./config.js');


const app=express();
app.use(express.json());

app.use(cors({}))
//     origin:"http://localhost:4554",
//     methods:['GET','POST','PUT','DELETE'],
//     allowedHeaders:['Content-Type'],

// }));

 app.get('/',(request,res)=>{
     console.log(request)
     return res.status(234).send("Hello World")
})

app.use('/books',booksRoutes)




mongoose.connect(mongoDBURL)
   .then(()=>{
    console.log("App connected to Database")
    app.listen(PORT,()=>{
        console.log(`App is listening to PORT:${PORT}`)
    })
   })
   .catch((error)=>{
    console.log(error)
   })