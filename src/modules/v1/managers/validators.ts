import { NextFunction, Request, Response } from 'express'
import { LogTypeEnum } from '../../../helpers/types'
import { printError } from '../../../helpers/utils'
import ManagerModel from './model'

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const managerCheck = await ManagerModel.findOne({ email: req.body.email }).select('email')
    if (managerCheck) {
      return res.status(401).json({ msg: 'Email already used.' })
    }
    if (!req.body.cnpj) {
      return res.status(400).json({ msg: 'Invalid cnpj.' })
    }
    if (req.body.cnpj.length !== 14) {
      return res.status(400).json({ msg: 'Invalid cnpj.' })
    }
    const cnpjCheck = await ManagerModel.findOne({ cnpj: req.body.cnpj }).select('cnpj')
    if (cnpjCheck) {
      return res.status(401).json({ msg: 'Cnpj already used.' })
    }
    return next()
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
        message: error,
        content: [error],
      },
    })
  }
}
