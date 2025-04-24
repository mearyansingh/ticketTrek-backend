import express from 'express'
import { getTickets, createTicket, getTicket, deleteTicket, updateTicket } from '../Controllers/TicketController.js'
import { protect } from '../Middleware/AuthMiddleware.js'
import noteRouter from './NoteRoutes.js'

const ticketRouter = express.Router()

//Re-route into note router
ticketRouter.use('/:ticketId/notes', protect, noteRouter)

//router.METHOD(PATH,Protected route, COMPONENT)
ticketRouter.route('/').get(protect, getTickets).post(protect, createTicket)// another way to chain the get and post request together(GET,POST)
ticketRouter.route('/:id').get(protect, getTicket).delete(protect, deleteTicket).put(protect, updateTicket)//(GET,DELETE,PUT->UPDATE)

// module.exports = router
export default ticketRouter