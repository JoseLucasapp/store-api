import { NextFunction, Router, Request, Response } from 'express'
import { UserTypeEnum } from '../../../helpers/types'
import { validateJwt } from '../admins/validateLogin'
import { newManager, getAllManagers, getManager } from './controller'
import { create } from './validators'

const router = Router()

// POST
router.post(
  '/',
  [(req: Request, res: Response, next: NextFunction) => validateJwt(req, res, next, [UserTypeEnum.ADMIN]), create],
  newManager,
)

//GET
router.get('/', [(req: Request, res: Response, next: NextFunction) => validateJwt(req, res, next, [UserTypeEnum.ADMIN])], getAllManagers)

router.get('/:id', [(req: Request, res: Response, next: NextFunction) => validateJwt(req, res, next, [UserTypeEnum.ADMIN])], getManager)

module.exports = router
