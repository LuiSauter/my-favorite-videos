import {Request, Response} from 'express'
import jwt from 'jsonwebtoken'
import config from '../config/config'
import User, { IUser } from '../models/user'

function createToken(user: IUser) {
  return jwt.sign({id: user.id, email: user.email}, config.jwtSecret, {
    expiresIn: 86400
  })
}

export const signUp = async (req: Request, res: Response): Promise<Response> => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({msg: 'Please. Send your email and password'})
  }
  const user = await User.findOne({email: req.body.email})
  if (user) {
    return res.status(400).json({msg: 'The user already exists'})
  }

  const newUser = new User(req.body)
  await newUser.save()
  return res.status(201).json(newUser)
}

export const signIn = async (req: Request, res: Response): Promise<Response> => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({msg: 'Please. Send your email and password'})
  }

  const user = await User.findOne({email: req.body.email})
  if (!user) {
    return res.status(400).json({msg: 'The user does not exist'})
  }
  const isMath = await user.comparePassword(req.body.password)
  if (isMath) {
    return res.status(200).json({token: createToken(user)})
  }
  return res.status(400).json({ msg: 'The email or password is incorrect'})
}