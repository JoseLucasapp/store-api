import { NextFunction, Router, Request, Response } from 'express'
import { UserTypeEnum } from '../../../helpers/types'
import { validateJwt } from '../auth/validateLogin'
import { newCategory, getAllManagerCategories, updateCategory, deleteCategory } from './controller'

const router = Router()

// POST
router.post('/', [(req: Request, res: Response, next: NextFunction) => validateJwt(req, res, next, [UserTypeEnum.MANAGER])], newCategory)

//GET
router.get(
  '/',
  [(req: Request, res: Response, next: NextFunction) => validateJwt(req, res, next, [UserTypeEnum.MANAGER, UserTypeEnum.WORKER])],
  getAllManagerCategories,
)

//PUT
router.put(
  '/:id',
  [(req: Request, res: Response, next: NextFunction) => validateJwt(req, res, next, [UserTypeEnum.MANAGER])],
  updateCategory,
)

//DELETE
router.delete(
  '/:id',
  [(req: Request, res: Response, next: NextFunction) => validateJwt(req, res, next, [UserTypeEnum.MANAGER])],
  deleteCategory,
)

module.exports = router
