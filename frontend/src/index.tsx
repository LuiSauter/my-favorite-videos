import React from 'react'
import ReactDOM from 'react-dom'
import { Route, Switch } from 'wouter'
import reportWebVitals from './reportWebVitals'

import VideoForm from './components/VIdeos/VideoForm/VideoForm'
import Home from './pages/Home'
import Nav from './components/Navbar/Nav'

import {ToastContainer} from 'react-toastify'

import { Layout } from './styles/Layout'
import GlobalStyle from './styles/GlobalStyle'
import 'react-toastify/dist/ReactToastify.css'
import { VideoStateProvider } from './context/videos/VIdeoStateProvider'

ReactDOM.render(
  <React.StrictMode>
    <VideoStateProvider>
      <GlobalStyle />
      <Layout>
        <Nav />
        <Switch>
          <Route path='/' component={Home} />
          <Route path='/new-video' component={VideoForm} />
          <Route path='/update/:id' component={VideoForm} />
        </Switch>
        <ToastContainer />
      </Layout>
    </VideoStateProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
