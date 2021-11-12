import { RequestHandler } from 'express'
import Video from '../models/video'
import { IVideo } from '../Interfaces/IVideo'

export const createVideo: RequestHandler = async (req, res) => {
  const { title, description, url } = req.body
  const findUrl = await Video.findOne({url: req.body.url})
  if (findUrl) {
    return res.status(301).json({ message: 'The URL already exists' })
  }
  const newVideo: IVideo  = new Video({title, description, url})
  const savedVideo = await newVideo.save()
  res.json(savedVideo)
}

export const getVideos: RequestHandler = async (req, res, next) => {
  try {
    const videos: Array<IVideo>  = await Video.find({})
    res.json(videos)
  } catch (error) {
    next(error)
  }
}

export const deleteVideos: RequestHandler = async (req, res) => {
  const videoFound = await Video.findByIdAndDelete(req.params.id)
  if (!videoFound) return res.status(204).json({})
  return res.json(videoFound)
}

export const getOneVideo: RequestHandler = async (req, res) => {
  const {id} = req.params
  const oneVideoFound = await Video.findById(id)
  if (!oneVideoFound) {
    return res.status(204).json({ error: 'not found video' })
  }
  res.json(oneVideoFound)
}

export const updateVideo: RequestHandler = async (req, res) => {
  const videoFound = await Video.findByIdAndUpdate(req.params.id, req.body, {new: true})
  if (!videoFound) {
    return res.status(204).json({})
  }
  res.json(videoFound)
}