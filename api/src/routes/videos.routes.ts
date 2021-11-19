import { Router } from 'express'
const router = Router()

import * as videoCtrl from '../controllers/videos.controllers'

router.get('/', videoCtrl.getVideos)

router.post('/', videoCtrl.createVideo)

router.get('/:id', videoCtrl.getOneVideo)

router.delete('/:id', videoCtrl.deleteVideos)

router.put('/:id', videoCtrl.updateVideo)

export default router