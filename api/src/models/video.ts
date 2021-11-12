import { Schema, model } from 'mongoose'
import { IVideo } from '../Interfaces/IVideo'
const videoSchema = new Schema<IVideo>({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  url: {
    type: String,
    required: true,
    trim: true,
    unique: true
  }
}, {
  versionKey: false,
  timestamps: true
})

export default model<IVideo>('Video', videoSchema)