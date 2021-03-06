import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import {toast} from 'react-toastify'
import {useLocation, useRoute} from 'wouter'

import { useVideos } from '../../../hooks/useVideos'
import { Video } from '../../../interfaces/interfaces'
import CardForm from './CardForm'
import yt from '../../../assets/yt.svg'

type InputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
type FormSubmit = FormEvent<HTMLFormElement>

const initialState = { title: '', description: '', url: '', _id: '',}

function VideoForm(): JSX.Element {
  const [videoForm, setVideoForm] = useState<Video>(initialState)
  const {updateVideo, addVideo, videos} = useVideos()

  const [, navigate] = useLocation()
  const [, params] = useRoute('/update/:id')

  const handleInputChange = (e: InputChange) => {
    setVideoForm({...videoForm, [e.target.name]: e.target.value})
  }

  useEffect(() => {
    if (params?.id) {
      const videoFound = videos.find(video => video._id === params.id)
      if (typeof videoFound !== 'undefined') {
        const {title, description, url, _id} = videoFound
        return setVideoForm({title, description, url, _id})
      }
    } else {
      setVideoForm(initialState)
    }
  }, [params?.id, videos])

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault()
    if (videoForm === initialState || !videoForm.url || !videoForm.title) return
    if (!params?.id) {
      const {title, description, url} = videoForm
      addVideo({title, description, url})
      toast.success('New video added')
    } else {
      updateVideo(params.id, videoForm)
    }
    navigate('/')
  }

  const srcVideo = videoForm.url.substring(32,43)

  return (
    <CardForm>
      <figure>
        {videoForm.url ? (
          <iframe
            src={`https://www.youtube.com/embed/${srcVideo}`}
            title={videoForm.title}
            frameBorder='0'
            allowFullScreen
          />
        ) : (
          <img src={yt} alt='my favorite videos - dev: sauterdev' />
        )}
      </figure>
      <form onSubmit={handleSubmit}>
        <header>
          <h2>Nuevo Video</h2>
        </header>
        <label>
          T??tulo <span>*</span>
          <input
            type='text'
            name='title'
            placeholder='Escribe un t??tulo'
            autoFocus
            value={videoForm.title}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Youtube url <span>*</span>
          <input
            type='text'
            name='url'
            placeholder='youtube.com/ejemplo'
            value={videoForm.url}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Descripci??n <span>*</span>
          <textarea
            rows={3}
            name='description'
            placeholder='Escribe una descripci??n'
            value={videoForm.description}
            onChange={handleInputChange}
          />
        </label>
        {params?.id ? (
          <button disabled={videoForm.url.length === 0}>Actualizar</button>
        ) : (
          <button disabled={videoForm.url.length === 0}>Crear</button>
        )}
      </form>
    </CardForm>
  )
}

export default VideoForm
