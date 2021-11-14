import React, { MouseEvent } from 'react'
import { Video } from '../../../interfaces/interfaces'
import { useLocation } from 'wouter'
import useTimeAgo from '../../../hooks/useTimeAgo'

import Item from './Item'
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

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    navigate(`/update/${video._id}`)
  }

  const handleButtonDelete = (id: string) => {
    deleteVideo(id)
  }

  return (
    <Item>
      <figure>
        <img
          title='See video information'
          onClick={handleClick}
          src={`https://img.youtube.com/vi/${srcVideo}/mqdefault.jpg`} alt={video.title}
        />
      </figure>
      <div>
        <h3>{video.title}</h3>
        <time title={timeago}>{timeago} - @sauterdev</time>
        <p>{video.description}</p>
        <button onClick={() => video._id && handleButtonDelete(video._id)}>x</button>
      </div>
    </Item>
  )
}
