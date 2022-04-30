import { NextFunction, Request, Response } from 'express'
import { verifyToken } from '../../../helpers/jwt'
import { UserTypeEnum } from '../../../helpers/types'

export const validateJwt = (req: Request, res: Response, next: NextFunction, userType: UserTypeEnum[]) => {
  const { authorization } = req.headers
  if (!authorization) {
    return res.status(401).json({
      error: {
        message: 'Token não informado',
      },
    })
  }
  const user = verifyToken(authorization)
  if (!user) {
    return res.status(401).json({
      error: {
        message: 'Token inválido',
      },
    })
  }
  if (!userType.includes(user.role)) {
    return res.status(401).json({
      error: {
        message: 'Acesso negado',
      },
    })
  }
  req.params.userId = String(user.id)
  req.params.userRole = String(user.role)
  next()
}
