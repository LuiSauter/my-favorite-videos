import { useContext } from 'react'
import { VideoContext } from '../context/videos/VideoContext'
import { Video } from '../interfaces/interfaces'

interface useVideosRet {
  loading: boolean;
  videos: Video[];
  deleteVideo: (id: string) => void
  updateVideo: (id: string, video: Video) => void
  addVideo: (video: Video) => void
}

export const useVideos = (): useVideosRet => {
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