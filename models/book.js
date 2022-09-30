import mongoose from 'mongoose'

const Schema = mongoose.Schema

const bookSchema = new Schema({
  title: { type: String, required: true },
  onGoing: { type: Boolean, default: true },
  writer: { type: String, required: true },
  artist: { type: String, required: true },
  review: {type: Schema.Types.ObjectId, ref: 'Review'}
}, {
  timestamps: true
})

const Book = mongoose.model('Book', bookSchema)

export {
  Book
}
