import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import config from './config/config'
import passport from 'passport'
import passportMiddleware from './middlewares/passport'

import videosRouter from './routes/videos.routes'
import authRoutes from './routes/auth.routes'
import specialRoutes from './routes/special.routes'
// import Video from './models/video'
// initializations
const app = express()
// settings
app.set('port', config.PORT)
// middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
// app.use(express.static('../frontend/build'))
app.use(express.urlencoded({extended: false}))
app.use(passport.initialize())
passport.use(passportMiddleware)
// routes
app.get('/', (req,res) => {
  res.send('<h1>FAVORITE VIDEOS - API - SAUTERDEV</h1>')
})
app.use('/api/videos', videosRouter)
app.use('/user', authRoutes)
app.use('/spc', specialRoutes)

export default app