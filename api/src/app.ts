import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import config from './config/config'
import passport from 'passport'
import passportMiddleware from './middlewares/passport'

import authRoutes from './routes/auth.routes'
import specialRoutes from './routes/special.routes'

import videosRouter from './routes/videos.routes'
// initializations
const app = express()
// settings
app.set('port', config.PORT)
// middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(passport.initialize())
passport.use(passportMiddleware)
// routes
app.use('/api', videosRouter)
app.use('/user', authRoutes)
app.use('/spc', specialRoutes)



export default app