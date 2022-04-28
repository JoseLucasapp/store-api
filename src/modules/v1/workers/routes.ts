import { NextFunction, Router, Request, Response } from 'express'
import { UserTypeEnum } from '../../../helpers/types'
import { validateJwt } from '../auth/validateLogin'
import { deleteWorker, getAllManagerWorkers, getWorker, newWorker, updateWorker } from './controller'
import { create, update } from './validators'

const router = Router()

// POST
router.post(
  '/',
  [(req: Request, res: Response, next: NextFunction) => validateJwt(req, res, next, [UserTypeEnum.MANAGER]), create],
  newWorker,
)

// GET
router.get(
  '/',
  [(req: Request, res: Response, next: NextFunction) => validateJwt(req, res, next, [UserTypeEnum.MANAGER])],
  getAllManagerWorkers,
)

router.get('/:id', [(req: Request, res: Response, next: NextFunction) => validateJwt(req, res, next, [UserTypeEnum.MANAGER])], getWorker)
//PUT
router.put(
  '/:id',
  [(req: Request, res: Response, next: NextFunction) => validateJwt(req, res, next, [UserTypeEnum.MANAGER]), update],
  updateWorker,
)

//DELETE
router.delete(
  '/:id',
  [(req: Request, res: Response, next: NextFunction) => validateJwt(req, res, next, [UserTypeEnum.MANAGER])],
  deleteWorker,
)

module.exports = router
