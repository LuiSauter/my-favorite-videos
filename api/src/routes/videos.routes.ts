import { Router } from 'express'
const router = Router()

import * as videoCtrl from '../controllers/videos.controllers'

router.post('/videos', videoCtrl.createVideo)

router.get('/videos', videoCtrl.getVideos)

router.get('/videos/:id', videoCtrl.getOneVideo)

router.delete('/videos/:id', videoCtrl.deleteVideos)

router.put('/videos/:id', videoCtrl.updateVideo)

export default router