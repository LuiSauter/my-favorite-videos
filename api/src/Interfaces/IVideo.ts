import { Document } from 'mongoose'

export interface IVideo extends Document {
  title: string
  description: string
  url: string
}
