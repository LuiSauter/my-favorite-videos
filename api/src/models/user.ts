import { Schema, model, Document } from 'mongoose'
import bcrypt from 'bcrypt'

export interface IUser extends Document {
  email: string
  password: string
  comparePassword: (password: string) => Promise<boolean>
}

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
})

userSchema.pre('save', async function (next): Promise<void> {
  // if (!this.user.isModified('password')) return next()
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(this.password, salt)
  this.password = hash
  next()
})

userSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password)
}

export default model<IUser>('User', userSchema)
