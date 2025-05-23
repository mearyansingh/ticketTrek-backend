import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import userModel from '../models/userModel.js'

export const protect = asyncHandler(async (req, res, next) => {
   let token

   if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      try {
         //Get token from header
         token = req.headers.authorization.split(' ')[1]//Bearer token

         //Verify token
         const decoded = jwt.verify(token, process.env.JWT_SECRET)

         //Get user from token
         req.user = await userModel.findById(decoded.id).select('-password')//exclude the password from the data that returned to the user
         next()
      } catch (error) {
         console.log(error)
         res.status(401)//unAuthorized
         throw new Error('Not authorized')
      }
   }
   if (!token) {
      res.status(401)//unAuthorized
      throw new Error('Not authorized')
   }
})