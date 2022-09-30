import mongoose from 'mongoose'

const Schema = mongoose.Schema

const reviewSchema = new Schema ({
  content: String,
  rating: {type: Number, min: 1, max: 5, default: 1}
},{
  timestamps: true
})

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  onGoing: {type: Boolean, default: true},
  reviews: [reviewSchema],
  creators: [{type: Schema.Types.ObjectId, ref: 'Creator'}]
  
}, {
  timestamps: true
})

const Book = mongoose.model('Book', bookSchema)

export {
  Book
}
