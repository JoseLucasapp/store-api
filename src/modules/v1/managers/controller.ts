import { Request, Response } from 'express'
import { parseMongoErrors } from '../../../helpers/errors'
import { LogTypeEnum } from '../../../helpers/types'
import { printError } from '../../../helpers/utils'
import ManagerModel from './model'

export const newManager = async (req: Request, res: Response) => {
  try {
    const manager = new ManagerModel(req.body)
    const data = await manager.save()
    const managerDetails = await ManagerModel.findOne({ _id: data._id }).select('-password')
    res.status(200).json(managerDetails)
  } catch (error: any) {
    printError({
      type: LogTypeEnum.error,
      moduleName: 'managers',
      functionName: 'managerLogin',
      message: 'An error ocurred when trying to add an manager',
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
