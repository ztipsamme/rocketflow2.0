const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: { type: String, required: true },
    state: { type: Number, default: 0 },
  },
  { timestamp: true }
)

module.exports = mongoose.model('Task', taskSchema)
