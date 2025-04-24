import express from 'express'
import { getNotes, addNote } from '../Controllers/NoteController.js'
import { protect } from '../Middleware/AuthMiddleware.js'

const noteRouter = express.Router({ mergeParams: true })

//router.METHOD(PATH,Protected route, COMPONENT)
noteRouter.route('/').get(protect, getNotes).post(protect, addNote)// another way to chain the get and post request together(GET,POST)

// module.exports = router
export default noteRouter