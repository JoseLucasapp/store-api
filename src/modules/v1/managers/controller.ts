import { Request, Response } from 'express'
import { parseMongoErrors } from '../../../helpers/errors'
import { LogTypeEnum } from '../../../helpers/types'
import { printError } from '../../../helpers/utils'
import ManagerModel from './model'

export const newManager = async (req: Request, res: Response) => {
  try {
    const managerCheck = await ManagerModel.findOne({ email: req.body.email })
    if (managerCheck) {
      return res.status(401).json({ msg: 'Email already used.' })
    }
    if (req.body.cnpj.length !== 14) {
      return res.status(400).json({ msg: 'Invalid cnpj.' })
    }

    const manager = new ManagerModel(req.body)
    const data = await manager.save()
    res.status(200).json(data)
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
