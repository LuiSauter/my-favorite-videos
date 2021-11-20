import { RequestHandler } from 'express'
import Video from '../models/video'
import { IVideo } from '../Interfaces/IVideo'

export const createVideo: RequestHandler = async (req, res) => {
  const { title, description, url } = req.body
  if (!title || !url) return res.sendStatus(400)
  const findUrl = await Video.findOne({url: req.body.url})
  if (findUrl) {
    return res.status(301).json()
  }
  const newVideo: IVideo  = new Video({title, description, url})
  const savedVideo = await newVideo.save()
  res.json(savedVideo)
}

export const getVideos: RequestHandler = async (req, res) => {
  const allVideos = await Video.find({}).sort({ createdAt: 'desc' })
  res.json(allVideos)
}

export const deleteVideos: RequestHandler = async (req, res) => {
  try {
    const videoFound = await Video.findByIdAndDelete(req.params.id)
    if (!videoFound) return res.status(204).json({})
    return res.json(videoFound)
  } catch (error) {
    res.status(400).send({ err: 'id used is malformed' })
    console.log(error)
  }
}

export const getOneVideo: RequestHandler = async (req, res) => {
  const {id} = req.params
  const oneVideoFound = await Video.findById(id)
  if (!oneVideoFound) {
    return res.status(204).json({ error: 'not found video' })
  }
  res.status(200).json(oneVideoFound)
}

export const updateVideo: RequestHandler = async (req, res) => {
  const videoFound = await Video.findByIdAndUpdate(req.params.id, req.body, {new: true})
  if (!videoFound) {
    return res.status(204).json({})
  }
  res.json(videoFound)
}