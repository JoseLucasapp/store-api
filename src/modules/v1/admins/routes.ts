import { Router } from 'express'
import { adminLogin } from './controller'

const router = Router()

// POST
router.post('/login', adminLogin)

module.exports = router
