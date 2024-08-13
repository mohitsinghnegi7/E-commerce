import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import userRouter from './routes/user.routes.js'
import productRouter from './routes/product.routes.js'

const app = express()

app.use(express.json({
    limit : "50mb"
}))
app.use(cors({
    origin : 'http://localhost:5173',
    credentials : true
}))
app.use(cookieParser())

app.use("/api/v1/users", userRouter)
app.use("/api/v1/product",productRouter)


export default app