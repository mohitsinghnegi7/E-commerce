import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'

cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.API_KEY ,
    api_secret : process.env.API_SECRET_KEY
})

const uploadOnCloudinary = async(localFilePath) =>{
    try{

    }
    catch(err){
        
    }
}