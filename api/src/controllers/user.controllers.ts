import {RequestHandler} from 'express'
import jwt from 'jsonwebtoken'
import config from '../config/config'
import User from '../models/user'

interface IUser  {
  email: string
  password: string
  _id?: string
  __v?: number
}

function createToken(user: IUser) {
  return jwt.sign({id: user._id, email: user.email}, config.jwtSecret, {
    expiresIn: 86400
  })
}

export const signUp: RequestHandler = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({msg: 'Please. Send your email and password'})
  }
  const user = await User.findOne({email: req.body.email})
  if (user) {
    return res.status(400).json({msg: 'The user already exists, no created'})
  }
  const newUser = new User(req.body)
  await newUser.save()
  return res.status(201).json(newUser)
}

export const signIn: RequestHandler = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({msg: 'Please. Send your email and password'})
  }
  const user = await User.findOne({email: req.body.email})
  if (!user) return res.status(400).json({msg: 'The user does not exist'})
  const isMatch = await user?.comparePassword(req.body.password)
  if (isMatch) {
    const token = createToken(user)
    return res.status(200).json({token: token})
  } else {
    return res.status(400).json({ msg: 'The email or password is incorrect'})
  }
}

export const getAllUsers: RequestHandler = async (req, res) => {
  const users = await User.find({})
  res.status(200).json(users)
}