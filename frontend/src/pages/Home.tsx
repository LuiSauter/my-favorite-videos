import React from 'react'
import { Placeholder } from '../components/Placeholder/Placeholder'
import VideoList from '../components/VIdeos/VideoList'
import { useVideos } from '../hooks/useVideos'

export default function Home (): JSX.Element {

  const {loading} = useVideos()

  return (
    <>
      {loading ? <Placeholder /> : <VideoList />}
    </>
  )
}
