import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import { userRouter } from './routes/users.js';

const app = express();
app.use(express.json());
app.use(cors());

app.use("/auth",userRouter)

mongoose.connect("mongodb+srv://aabusamra:eva2612@recipes.i9imt4i.mongodb.net/recipes?retryWrites=true&w=majority")

app.listen(3002, ()=> {

    console.log("Server Connected well");
})


