const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const authRoutes = require('./routes/authRoutes')

dotenv.config()
const app = express()

app.use(cors({ origin: 'http://localhost:5173' }))

app.use(express.json())
app.use('/api/auth', authRoutes)

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('🔗 MongoDB connected'))
  .catch((error) => console.error('❌ MongoDB connection error: ', error))

// Start server
const PORT = process.env.PORT || 8000
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))
