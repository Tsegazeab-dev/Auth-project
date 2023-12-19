import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'

import userRoutes from './routes/user.routes.js'
import authRoutes from './routes/auth.routes.js'
import cookieParser from 'cookie-parser'

dotenv.config()
const __dirname = path.resolve();

// inside the database link we must add name of db otherwise it will automatically name it as test auth-app is our db  name
mongoose.connect(process.env.MONGODB).then(()=>console.log("DB connected")).catch(e=>console.log('DB error:', e))

const app = express();

// to serve the frontend 
app.use(express.static(path.join(__dirname, 'client/dist')));

// to redirect any routes to index.html since all the frontend route is inside index
app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
})

app.use(express.json())
app.use(cookieParser())

app.listen(3000, ()=>console.log("Listening to port 3000"))

app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)

// Error handling middleware
app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500
    const message = err.message
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode
    })
})