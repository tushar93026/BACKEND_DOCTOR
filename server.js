import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import path from 'path'
import { fileURLToPath } from 'url'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './Routes/admin.routes.js'
import doctorRouter from './Routes/doctor.routes.js'
import userRouter from './Routes/user.routes.js'

const app = express()
const port = process.env.PORT || 4000

// Connect DB and Cloudinary
connectDB()
connectCloudinary()

// Middleware
app.use(express.json())
app.use(cors({
  origin: ['https://frontend-doctor-mu.vercel.app'], // no trailing slash!
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}))

// API Routes
app.use('/api/admin', adminRouter)
app.use('/api/doctor', doctorRouter)
app.use('/api/user', userRouter)

// ---------- DEPLOYMENT HANDLER ----------

// Only run this when your frontend build is inside your project (for Render)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Serve frontend (React build folder)
app.use(express.static(path.join(__dirname, './client/build')))

// Catch-all: send index.html for non-API routes
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build', 'index.html'))
})


// ----------------------------------------

app.listen(port, () => console.log(`Server is running on port: ${port}`))

