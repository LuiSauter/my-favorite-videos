import React, { ChangeEvent, FormEvent, useState } from 'react'
import {toast} from 'react-toastify'
import {useLocation, useRoute} from 'wouter'

import * as videoService from '../../../services/videoService'
// import { IVideo } from '../../../hooks/useVideos'
import CardForm from './CardForm'
import yt from '../../../assets/yt.svg'
import { Video } from '../../../interfaces/interfaces'

type InputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
type FormSubmit = FormEvent<HTMLFormElement>

const initialState = { title: '', description: '', url: '' }

function VideoForm() {
  const [video, setVideo] = useState<Video>(initialState)
  const [, navigate] = useLocation()
  const [, params] = useRoute('/update/:id')

  const handleInputChange = (e: InputChange) => {
    setVideo({...video, [e.target.name]: e.target.value})
  }

  // const getOneVideo = async (id: string) => {
  //   const res = await videoService.getVideo(id)
  //   const { title, description, url } = res
  //   setVideo({ title, description, url })
  // }

  // useEffect(() => {
  //   if (params?.id) getOneVideo(params.id)
  // }, [params?.id])

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault()
    if (video === initialState || !video.url || !video.title) return
    if (!params?.id) {
      videoService.createVideo(video)
      toast.success('New video added')
    } else {
      videoService.updateVideo(params.id, video)
    }
    navigate('/')
  }

  const srcVideo = video.url.substring(32,43)

  return (
    <CardForm>
      <figure>
        {
          video.url
            ? <iframe
              src={`https://www.youtube.com/embed/${srcVideo}`}
              title={video.title}
              frameBorder='0'
              allowFullScreen
            />
            : <img src={yt} alt='my favorite videos - dev: sauterdev' />
        }
      </figure>
      <form onSubmit={handleSubmit}>
        <header>
          <h2>New Video</h2>
        </header>
        <label>
          Title <span>*</span>
          <input
            type='text'
            name='title'
            placeholder='Wrtie a title'
            autoFocus
            value={video.title}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Youtube url <span>*</span>
          <input
            type='text'
            name='url'
            placeholder='youtube.com/example'
            value={video.url}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Description <span>*</span>
          <textarea
            rows={3}
            name='description'
            placeholder='Write a description'
            value={video.description}
            onChange={handleInputChange}
          />
        </label>
        {
          params?.id
            ? <button disabled={video.url.length === 0}>Update</button>
            : <button disabled={video.url.length === 0}>Create</button>
        }
      </form>
    </CardForm>
  )
}

export default VideoForm
