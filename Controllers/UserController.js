import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js'

// @desc Register a new user
// @route /api/users
// @access Public
export const registerUser = asyncHandler(async (req, res) => {
   const { name, email, password } = req.body

   //Validation
   if (!name || !email || !password) {
      res.status(400)
      throw new Error('Please include all fields')
   }

   //Find if user already exists
   const userExists = await userModel.findOne({ email })

   if (userExists) {
      res.status(400)
      throw new Error('User already exists')
   }

   //Hash password
   const salt = await bcrypt.genSalt(10)
   const hashedPassword = await bcrypt.hash(password, salt)

   //create user
   const user = await userModel.create({
      name,
      email,
      password: hashedPassword
   })

   if (user) {
      res.status(201).json({
         _id: user._id,
         name: user.name,
         email: user.email,
         token: generateToken(user._id)
      })
   } else {
      res.status(400)
      throw new Error('Invalid user data')
   }
})

// @desc Login a user
// @route /api/users/login
// @access Public
export const loginUser = asyncHandler(async (req, res) => {
   const { email, password } = req.body

   const user = await userModel.findOne({ email })
   //check user and password match
   if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({
         _id: user._id,
         name: user.name,
         email: user.email,
         token: generateToken(user._id)
      })
   } else {
      res.status(401)
      throw new Error('Invalid credentials')
   }
})

// @desc Get current user
// @route /api/users/me
// @access Private
export const getMe = asyncHandler(async (req, res) => {
   const user = {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email
   }
   res.status(200).json(user)
})

//Generate token
export const generateToken = (id) => {
   return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '30d'
   })
}

// module.exports = { registerUser, loginUser, getMe }