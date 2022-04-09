import { NextFunction, Router, Request, Response } from 'express'
import { UserTypeEnum } from '../../../helpers/types'
import { validateJwt } from '../admins/validateLogin'
import { newManager } from './controller'
import { create } from './validators'

const router = Router()

// POST
router.post(
  '/',
  [(req: Request, res: Response, next: NextFunction) => validateJwt(req, res, next, [UserTypeEnum.ADMIN]), create],
  newManager,
)

module.exports = router
