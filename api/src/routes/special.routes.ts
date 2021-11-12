import { Router } from 'express'
const router = Router()

import passport from 'passport'

router.get('/special', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.send('success')
})

export default router