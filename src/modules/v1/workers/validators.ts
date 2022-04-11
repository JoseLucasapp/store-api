import { NextFunction, Request, Response } from 'express'
import { LogTypeEnum } from '../../../helpers/types'
import { printError } from '../../../helpers/utils'
import WorkerModel from './model'

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const managerCheck = await WorkerModel.findOne({ email: req.body.email }).select('email')
    if (managerCheck) {
      return res.status(401).json({ msg: 'Email already used.' })
    }
    return next()
  } catch (error: any) {
    printError({
      type: LogTypeEnum.error,
      moduleName: 'workers',
      functionName: 'create',
      message: 'An error ocurred when trying to add an worker',
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

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.body.email) {
      const managerCheck = await WorkerModel.findOne({ email: req.body.email }).select('email')
      if (managerCheck) {
        const managerEmail = (await WorkerModel.findOne({ _id: req.params.id }).select('email')) || { email: '' }
        if (managerCheck.email !== managerEmail.email) {
          return res.status(401).json({ msg: 'Email already used.' })
        }
      }
    }
    return next()
  } catch (error: any) {
    printError({
      type: LogTypeEnum.error,
      moduleName: 'workers',
      functionName: 'update',
      message: 'An error ocurred when trying to update an worker',
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
