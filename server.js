import 'dotenv/config'
import colors from 'colors'
import cors from 'cors'
import express from 'express'
// import path from 'path'
import userRouter from './Routes/UserRoutes.js'
import ticketRouter from './Routes/TicketRoutes.js'
import { errorHandler } from './Middleware/ErrorMiddleware.js'
import { connectDB } from './Config/Db.js'

//Connect to database
connectDB()
//initialize express app
const app = express()
const PORT = process.env.PORT || 8000

//middleware
app.use(cors({
	origin: ['http://localhost:5173', 'https://tickettrek-help.vercel.app'], //send the cookie in the response
	credentials: true // enable cookies
}))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//Routes
app.use('/api/users', userRouter)
app.use('/api/tickets', ticketRouter)

app.get('/', (req, res) => {
	res.send({ message: 'Welcome to the TicketTrek api' })
})

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on  port ${PORT}`.green.bold))

//Serve Frontend
// if (process.env.NODE_ENV === "production") {
// 	//set build folder as static
// 	app.use(express.static(path.join(__dirname, '/frontend/build')))

// 	app.get('*', (req, res) => {
// 		res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html'), function (err) {
// 			if (err) {
// 				res.status(500).send(err)
// 			}
// 		})
// 	})
// } else {
// 	app.get('/', (req, res) => {
// 		res.json({ message: 'Welcome to the TicketTrek api' })
// 	})
// }

// "devDependencies": {
//     "@babel/plugin-proposal-private-property-in-object": "^7.21.11"
//   }
