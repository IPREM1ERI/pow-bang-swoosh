import mongoose from 'mongoose'
//import { Book } from '../models/book.js'

const Schema = mongoose.Schema

const profileSchema = new Schema({
  name: String,
  avatar: String,
  ownBook: [{type: Schema.Types.ObjectId, ref: 'Book'}]
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}
