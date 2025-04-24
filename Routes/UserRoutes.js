import express from 'express'
import { registerUser, loginUser, getMe } from '../Controllers/UserController.js'
import { protect } from '../Middleware/AuthMiddleware.js'

// const router = express.Router()
const userRouter = express.Router()

//router.METHOD(PATH,Protected route, COMPONENT)
userRouter.post('/', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/me', protect, getMe)

// module.exports = router
export default userRouter