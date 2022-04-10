import { NextFunction, Router, Request, Response } from 'express'
import { UserTypeEnum } from '../../../helpers/types'
import { validateJwt } from '../admins/validateLogin'
import { newManager, getAllManagers, getManager, updateManager } from './controller'
import { create, update } from './validators'

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

//PUT
router.put(
  '/:id',
  [(req: Request, res: Response, next: NextFunction) => validateJwt(req, res, next, [UserTypeEnum.ADMIN]), update],
  updateManager,
)

module.exports = router
