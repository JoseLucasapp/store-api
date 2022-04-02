import { Request, Response } from 'express'
import { parseMongoErrors } from '../../../helpers/errors'
import { generateToken } from '../../../helpers/jwt'
import { LogTypeEnum, UserTypeEnum } from '../../../helpers/types'
import { printError } from '../../../helpers/utils'
import AdminModel from './model'

export const adminLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const admin = await AdminModel.findOne({ email, password }).select('-password')
    if (!admin) {
      const adminPass = await AdminModel.findOne({ email })
      if (adminPass) {
        return res.status(400).json({
          error: {
            message: 'Incorrect password',
          },
        })
      }
      return res.status(404).json({
        error: {
          message: 'User not found',
        },
      })
    }
    const token = generateToken({
      id: admin._id,
      email: admin.email,
      role: UserTypeEnum.ADMIN,
    })
    return res.status(200).json({ user: admin, token })
  } catch (error: any) {
    printError({
      type: LogTypeEnum.error,
      moduleName: 'admins',
      functionName: 'adminLogin',
      message: 'An error ocurred when trying to login an admin',
      stackTrace: error,
    })
    res.status(500).json({
      error: {
        message: parseMongoErrors[error.code as keyof typeof parseMongoErrors],
        content: [error],
      },
    })
  }
}
