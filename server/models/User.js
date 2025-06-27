const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, require: true },
  },
  { timestamp: true }
)

module.exports = mongoose.model('User', userSchema)
