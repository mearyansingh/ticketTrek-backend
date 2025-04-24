import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
   name: {
      type: String,
      required: [true, 'Please add a name']
   },
   email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true
   },
   password: {
      type: String,
      required: [true, 'Please add a password'],
   },
   isAdmin: {
      type: Boolean,
      required: true,
      default: false
   }
}, { timestamps: true })


// module.exports = mongoose.model('User', userSchema)
const userModel = mongoose.models.user || mongoose.model('User', userSchema)
export default userModel;