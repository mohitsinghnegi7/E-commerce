import app from './app.js'
import dotenv from 'dotenv'
import connectDB from './db/index.js'

dotenv.config({
    path : './.env'
})

connectDB()
.then(()=>{
    app.listen(process.env.port || 3000,()=>{
        console.log(`Server is running on ${process.env.PORT}`);
        
    })
})
.catch(err=>{
    console.log("MongoDB conncetion failed !! ", err);
    
})