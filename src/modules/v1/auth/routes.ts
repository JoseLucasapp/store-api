import { Router } from 'express'
import { login } from './controller'

const router = Router()

// POST
router.post('/login', login)

module.exports = router
