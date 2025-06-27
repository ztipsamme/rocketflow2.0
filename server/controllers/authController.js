const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
  const { email, password } = req.body

  try {
    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' })
    }

    // Create user
    const newUser = new User({ email, password: hashedPassword })
    await newUser.save()

    res.status(201).json({ message: 'User created' })
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' })
  }
}

//Sign in
exports.login = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    const isMatch = await bcrypt.compare(password, user.password)

    // Find user and compare passwords
    if (!user || !isMatch)
      return res.status(401).json({ error: 'Wrong email or password' })

    // Create JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    })

    res.json({ token })
  } catch (error) {
    res.status(500).json({ error: 'Sign in failed' })
  }
}
