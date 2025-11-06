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
app.use(cors({
  origin: ['https://frontend-doctor-mu.vercel.app/', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use('/api/admin', adminRouter)
app.use('/api/doctor', doctorRouter)
app.use('/api/user', userRouter)
app.get('/', (req,res)=>{
    res.send('API WORKING')
})
app.listen(port, ()=> console.log(`Server is Running on Port : ${port}`))
