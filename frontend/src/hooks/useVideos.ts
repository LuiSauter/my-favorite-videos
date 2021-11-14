import { useContext } from 'react'
import { VideoContext } from '../context/videos/VideoContext'

export const useVideos = () => {
  const {videoState, deleteVideo} = useContext(VideoContext)
  const {videos} = videoState

  return {loading: false, videos, deleteVideo}
}