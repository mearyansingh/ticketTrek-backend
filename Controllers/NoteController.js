import asyncHandler from 'express-async-handler'
import userModel from '../models/userModel.js'
import noteModal from '../models/noteModel.js'
import ticketModel from '../models/ticketModel.js'

// @desc Get note for a ticket
// @route GET /api/tickets/:ticketId/notes
// @access Private
export const getNotes = asyncHandler(async (req, res) => {

   //Get user using the id in the JWT
   const user = await userModel.findById(req.user.id)

   if (!user) {
      res.status(401)
      throw new Error('User not Found')
   }

   const ticket = await ticketModel.findById(req.params.ticketId)//Single ticket

   if (ticket.user.toString() !== req.user.id) {
      res.status(401)
      throw new Error('User not authorized')
   }

   const notes = await noteModal.find({ ticket: req.params.ticketId })

   res.status(200).json(notes)
})

// @desc create ticket note
// @route POST /api/tickets/:ticketId/notes
// @access Private
export const addNote = asyncHandler(async (req, res) => {

   //Get user using the id in the JWT
   const user = await userModel.findById(req.user.id)

   if (!user) {
      res.status(401)
      throw new Error('User not Found')
   }

   const ticket = await ticketModel.findById(req.params.ticketId)//Single ticket

   if (ticket.user.toString() !== req.user.id) {
      res.status(401)
      throw new Error('User not authorized')
   }

   const note = await noteModal.create({ user: req.user.id, ticket: req.params.ticketId, text: req.body.text, isStaff: false })

   res.status(200).json(note)
})
