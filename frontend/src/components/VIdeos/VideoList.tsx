import React from 'react'
import { useVideos } from '../../hooks/useVideos'
import { Video } from '../../interfaces/interfaces'
// import { IVideo, useVideos } from '../../hooks/useVideos'
import VideoContainer from './VideoContainer'
import VideoItem from './VideoItem/VideoItem'

function VideoList() {
  const {videos} = useVideos()

  return (
    <VideoContainer>
      {
        videos && videos.map((video: Video) => (
          <VideoItem
            key={video._id}
            video={ video }
          />
        ))
      }
    </VideoContainer>
  )
}

export default VideoList
