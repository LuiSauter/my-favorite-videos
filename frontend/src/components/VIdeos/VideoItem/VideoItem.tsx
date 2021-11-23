import React from 'react'
import { Video } from '../../../interfaces/interfaces'
import { useLocation } from 'wouter'
import useTimeAgo from '../../../hooks/useTimeAgo'

import {Item} from './Item'
import { useVideos } from '../../../hooks/useVideos'

interface Props {
  video: Video
}

export default function VideoItem({video}: Props): JSX.Element {
  const {deleteVideo} = useVideos()

  const srcVideo = video.url.substring(32,43)
  const newDate: Date = new Date(video.createdAt || '')
  const fecha = newDate.getTime()
  const timeago = useTimeAgo(fecha)
  const [,navigate]= useLocation()

  const handleUpdateVideo = (id:string) => {
    navigate(`/update/${id}`)
  }

  const handleButtonDelete = (id: string) => {
    deleteVideo(id)
  }

  return (
    <Item>
      <figure>
        <img
          title='Ver información del video'
          onClick={() => video._id && handleUpdateVideo(video._id)}
          src={`https://img.youtube.com/vi/${srcVideo}/mqdefault.jpg`} alt={video.title}
        />
      </figure>
      <button onClick={() => video._id && handleButtonDelete(video._id)}>X</button>
      <div>
        <h3>{video.title}</h3>
        <time title={timeago}>{timeago} - @sauterdev</time>
        <p>{video.description}</p>
      </div>
    </Item>
  )
}
