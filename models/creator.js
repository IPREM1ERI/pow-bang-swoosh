import mongoose from "mongoose";

const Schema = mongoose.Schema

const creatorSchema = new Schema ({
  writer: { type: String, required: true },
  artist: { type: String, required: true },
}, {
  timestamps: true
})

const Creator = mongoose.model('Creator', creatorSchema)

export {
  Creator
}