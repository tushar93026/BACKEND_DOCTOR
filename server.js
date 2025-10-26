import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './Routes/admin.routes.js'
import doctorRouter from './Routes/doctor.routes.js'
import userRouter from './Routes/user.routes.js'

const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()
app.use(express.json())
const allowedOrigins = [
  'https://frontend-doctor-mu.vercel.app',
  'https://admin-doctor.vercel.app/'];
app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use('/admin', adminRouter)
app.use('/doctor', doctorRouter)
app.use('/user', userRouter)
app.get('/', (req,res)=>{
    res.send('API WORKING')
})
app.listen(port, ()=> console.log(`Server is Running on Port : ${port}`))
