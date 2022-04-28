import { Request, Response } from 'express'
import { parseMongoErrors } from '../../../helpers/errors'
import { generateToken } from '../../../helpers/jwt'
import { LogTypeEnum, UserTypeEnum } from '../../../helpers/types'
import { printError } from '../../../helpers/utils'
import AdminModel from '../admins/model'
import ManagersModel from '../managers/model'
import WorkersModel from '../workers/model'

export const login = async (req: Request, res: Response) => {
  try {
    const getData = async (user: any, database: any, userType: UserTypeEnum) => {
      if (!user) {
        const userPass = await database.findOne({ email })
        if (userPass) {
          return res.status(400).json({
            message: 'Incorrect password',
          })
        }
        return res.status(404).json({
          message: 'User not found',
        })
      }
      const token = generateToken({
        id: user._id,
        email: user.email,
        role: userType,
      })

      return res.status(200).json({ user, token })
    }
    const { email, password } = req.body
    const admin = await AdminModel.findOne({ email, password }).select('-password')
    if (admin) {
      return await getData(admin, AdminModel, UserTypeEnum.ADMIN)
    }
    const worker = await WorkersModel.findOne({ email, password }).select('-password')
    if (worker) {
      return await getData(worker, WorkersModel, UserTypeEnum.WORKER)
    }
    const manager = await ManagersModel.findOne({ email, password }).select('-password')
    if (manager) {
      return await getData(manager, ManagersModel, UserTypeEnum.MANAGER)
    }
  } catch (error: any) {
    printError({
      type: LogTypeEnum.error,
      moduleName: 'auth',
      functionName: 'login',
      message: 'An error ocurred when trying to login',
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
