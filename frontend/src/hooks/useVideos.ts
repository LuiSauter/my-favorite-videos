import { useContext } from 'react'
import { VideoContext } from '../context/videos/VideoContext'

export const useVideos = () => {
  const {videoState, deleteVideo, updateVideo, addVideo} = useContext(VideoContext)
  const {videos} = videoState

  return {
    loading: false,
    videos,
    deleteVideo,
    updateVideo,
    addVideo
  }
}