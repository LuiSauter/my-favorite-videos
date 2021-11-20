import {Router} from 'express'
const router = Router()

import * as userCtrl from '../controllers/user.controllers'

router.get('/all', userCtrl.getAllUsers)

router.post('/signup', userCtrl.signUp )

router.post('/signin', userCtrl.signIn )

export default router