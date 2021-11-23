import React from 'react'
import GlobalStyle from './styles/GlobalStyle'
import { ToastContainer } from 'react-toastify'
import { Route, Switch } from 'wouter'
import Navbar from './components/Navbar/Nav'
import VideoForm from './components/VIdeos/VideoForm/VideoForm'
import Home from './pages/Home'
import { Layout } from './styles/Layout'

export default function App(): JSX.Element {
  return (
    <>
      <GlobalStyle />
      <Layout>
        <Navbar />
        <Switch>
          <Route path='/' component={Home} />
          <Route path='/new-video' component={VideoForm} />
          <Route path='/update/:id' component={VideoForm} />
        </Switch>
        <ToastContainer />
      </Layout>
    </>
  )
}
