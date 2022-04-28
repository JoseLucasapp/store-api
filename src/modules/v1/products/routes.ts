import { NextFunction, Router, Request, Response } from 'express'
import { UserTypeEnum } from '../../../helpers/types'
import { validateJwt } from '../auth/validateLogin'
import { deletProduct, getAllManagerProducts, getProduct, newProduct, updateProduct } from './controller'

const router = Router()

// POST
router.post('/', [(req: Request, res: Response, next: NextFunction) => validateJwt(req, res, next, [UserTypeEnum.MANAGER])], newProduct)

//GET
router.get(
  '/',
  [(req: Request, res: Response, next: NextFunction) => validateJwt(req, res, next, [UserTypeEnum.MANAGER])],
  getAllManagerProducts,
)

router.get('/:id', [(req: Request, res: Response, next: NextFunction) => validateJwt(req, res, next, [UserTypeEnum.MANAGER])], getProduct)

//PUT
router.put(
  '/:id',
  [(req: Request, res: Response, next: NextFunction) => validateJwt(req, res, next, [UserTypeEnum.MANAGER])],
  updateProduct,
)

//DELETE
router.delete(
  '/:id',
  [(req: Request, res: Response, next: NextFunction) => validateJwt(req, res, next, [UserTypeEnum.MANAGER])],
  deletProduct,
)

module.exports = router
