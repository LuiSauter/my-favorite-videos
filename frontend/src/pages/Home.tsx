import React from 'react'
import VideoList from '../components/VIdeos/VideoList'
import { useVideos } from '../hooks/useVideos'

export default function Home () {

  const {loading} = useVideos()

  return (
    <>
      {
        loading
          ? <h1>Cargando...</h1>
          : <VideoList />
      }
    </>
  )
}
