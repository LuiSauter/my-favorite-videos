import path from 'path'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import config from './config/config'
import passport from 'passport'
import passportMiddleware from './middlewares/passport'

import videosRouter from './routes/videos.routes'
import authRoutes from './routes/auth.routes'
import specialRoutes from './routes/special.routes'
// initializations
const app = express()
// settings
app.set('port', config.PORT)
// middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.static('../frontend/build'))
app.get('/', (req, res) => {
  const params = req.path
  console.log(params)
  if (params !== '/api/videos') {
    res.sendFile(path.resolve(__dirname, '../../frontend/build', 'index.html'))
  }
})
app.get('/new-video', (req, res) => {
  const params = req.path
  console.log(params)
  if (params !== '/api/videos') {
    res.sendFile(path.resolve(__dirname, '../../frontend/build', 'index.html'))
  }
})
app.get('/update/:id', (req, res) => {
  if (req.path !== '/api/videos') {
    res.sendFile(path.resolve(__dirname, '../../frontend/build', 'index.html'))
  }
})
app.use(express.urlencoded({extended: false}))
app.use(passport.initialize())
passport.use(passportMiddleware)
// routes
app.use('/api/videos', videosRouter)
app.use('/user', authRoutes)
app.use('/spc', specialRoutes)

export default app