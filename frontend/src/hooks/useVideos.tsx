import { useContext } from 'react'
import { VideoContext } from '../context/videos/VideoContext'
import { Video } from '../interfaces/interfaces'

interface useVideoState {
  videos: Video[]
  loading: boolean
  deleteVideo: (id: string) => void
  updateVideo: (id: string, video: Video) => void
  addVideo: (video: Video) => void
}

export const useVideos = (): useVideoState => {
  const {videoState, deleteVideo, updateVideo, addVideo, loading} = useContext(VideoContext)
  const {videos} = videoState

  return {
    videos,
    loading,
    deleteVideo,
    updateVideo,
    addVideo
  }
}