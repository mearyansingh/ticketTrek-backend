import asyncHandler from 'express-async-handler'
import userModel from '../models/userModel.js'
import ticketModel from '../models/ticketModel.js'

// @desc Get user tickets
// @route GET /api/tickets
// @access Private
export const getTickets = asyncHandler(async (req, res) => {
	//Get user using the id in the JWT
	const user = await userModel.findById(req.user.id)
	if (!user) {
		res.status(401)
		throw new Error('User not Found')
	}
	const tickets = await ticketModel.find({ user: req.user.id })
	res.status(200).json(tickets)
})

// @desc Get user ticket by id
// @route GET /api/tickets/:id
// @access Private
export const getTicket = asyncHandler(async (req, res) => {
	//Get user using the id in the JWT
	const user = await userModel.findById(req.user.id)

	if (!user) {
		res.status(401)
		throw new Error('User not Found')
	}

	const ticket = await ticketModel.findById(req.params.id)

	if (!ticket) {
		res.status(404)
		throw new Error('Ticket not found')
	}
	//Not anybody can access anybody ticket
	//Only the actual user can see their own ticket
	if (ticket.user.toString() !== req.user.id) {
		res.status(401)
		throw new Error('Not Authorized')
	}
	res.status(200).json(ticket)
})

// @desc Add new ticket
// @route POST /api/tickets
// @access Private
export const createTicket = asyncHandler(async (req, res) => {
	const { product, description } = req.body

	if (!product || !description) {
		res.status(400)
		throw new Error('Please add a product and description')
	}

	//Get user using the id in the JWT
	const user = await userModel.findById(req.user.id)
	if (!user) {
		res.status(401)
		throw new Error('User not Found')
	}
	const ticket = await ticketModel.create({
		product,
		description,
		user: req.user.id,
		status: 'new'
	})
	res.status(201).json(ticket)
})

// @desc Delete ticket 
// @route DELETE /api/tickets/:id
// @access Private
export const deleteTicket = asyncHandler(async (req, res) => {
	//Get user using the id in the JWT
	const user = await userModel.findById(req.user.id)

	if (!user) {
		res.status(401)
		throw new Error('User not Found')
	}

	const ticket = await ticketModel.findById(req.params.id)

	if (!ticket) {
		res.status(404)
		throw new Error('Ticket not found')
	}
	//Not anybody can access anybody ticket
	//Only the actual user can see their own ticket
	if (ticket.user.toString() !== req.user.id) {
		res.status(401)
		throw new Error('Not Authorized')
	}
	//Remove the ticket
	await ticket.remove
	res.status(200).json({ success: true })
})

// @desc Update ticket 
// @route PUT /api/tickets/:id
// @access Private
export const updateTicket = asyncHandler(async (req, res) => {
	//Get user using the id in the JWT
	const user = await userModel.findById(req.user.id)

	if (!user) {
		res.status(401)
		throw new Error('User not Found')
	}

	const ticket = await ticketModel.findById(req.params.id)

	if (!ticket) {
		res.status(404)
		throw new Error('Ticket not found')
	}
	//Not anybody can access anybody ticket
	//Only the actual user can see their own ticket
	if (ticket.user.toString() !== req.user.id) {
		res.status(401)
		throw new Error('Not Authorized')
	}
	//Update the ticket by id
	const updateTicket = await ticketModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
	res.status(200).json(updateTicket)
})

// module.exports = { getTickets, createTicket, getTicket, deleteTicket, updateTicket }