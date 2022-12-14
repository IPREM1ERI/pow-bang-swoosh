import mongoose from 'mongoose'

const Schema = mongoose.Schema

const reviewSchema = new Schema ({
  content: String,
  rating: {type: Number, min: 1, max: 5, default: 1},
  owner: {type: Schema.Types.ObjectId, ref: 'Profile'}
},{
  timestamps: true
})

const bookSchema = new Schema({
  title: { type: String, required: true },
  onGoing: { type: Boolean, default: true },
  writer: { type: String, required: true },
  artist: { type: String, required: true },
  reviews: [reviewSchema],
  issue: Number
}, {
  timestamps: true
})

const Book = mongoose.model('Book', bookSchema)

export {
  Book
}
