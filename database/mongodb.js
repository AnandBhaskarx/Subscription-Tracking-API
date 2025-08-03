import mongoose from 'mongoose'

import {DB_URI,NODE_ENV} from '../config/env.js'


const connectToDatabase = async()=>{
    if(!DB_URI){
       
        throw new Error('please define the MONGODB_URI environment variable')
    }
    try{    console.log(DB_URI)
            await mongoose.connect(DB_URI);
            console.log(`connected to database i ${NODE_ENV}mode`)
    }catch(error){
        console.log('Error connecting to databasse :',error)
        process.exit(1);
    }
}

export default connectToDatabase