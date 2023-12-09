import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import userRoutes from './routes/user.routes.js'
import authRoutes from './routes/auth.routes.js'

dotenv.config()

// inside the database link we must add name of db otherwise it will automatically name it as test auth-app is our db  name
mongoose.connect(process.env.MONGODB).then(()=>console.log("DB connected")).catch(e=>console.log('DB error:', e))

const app = express();

app.use(express.json())

app.listen(3000, ()=>console.log("Listening to port 3000"))

app.use('/api/test', userRoutes)
app.use('/api/auth', authRoutes)