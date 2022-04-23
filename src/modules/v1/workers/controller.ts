import { Request, Response } from 'express'
import { parseMongoErrors } from '../../../helpers/errors'
import { LogTypeEnum, PageOptionsInterface, UserTypeEnum } from '../../../helpers/types'
import { printError, listLimit } from '../../../helpers/utils'
import WorkersModel from './model'
import ManagerModel from '../managers/model'
import { generateToken } from '../../../helpers/jwt'
import mongoose from 'mongoose'

export const newWorker = async (req: Request, res: Response) => {
  try {
    const manager = new WorkersModel({ ...req.body, managerId: req.params.userId })
    const data = await manager.save()
    const managerDetails = await WorkersModel.findOne({ _id: data._id }).select('-password')
    res.status(200).json(managerDetails)
  } catch (error: any) {
    printError({
      type: LogTypeEnum.error,
      moduleName: 'workers',
      functionName: 'newWorker',
      message: 'An error ocurred when trying to add an worker',
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

export const getAllManagerWorkers = async (req: Request, res: Response) => {
  const filter: any = {}
  const pageOptions: PageOptionsInterface = {
    page: parseInt(req.query.page as string) || 0,
    limit: parseInt(req.query.limit as string) || listLimit,
  }

  if (req.query.name) {
    Object.assign(filter, { name: { $regex: req.query.name.toString(), $options: 'i' } })
  }
  if (req.query.role) {
    Object.assign(filter, { role: { $regex: req.query.role.toString(), $options: 'i' } })
  }
  if (req.query.email) {
    Object.assign(filter, { email: { $regex: req.query.email.toString(), $options: 'i' } })
  }

  const managerId = new mongoose.Types.ObjectId(req.params.userId)

  Object.assign(filter, { managerId })
  const totalEntries = await WorkersModel.aggregate()
    .addFields({
      totalEntries: '$_id',
    })
    .match(filter)
    .count('totalEntries')

  WorkersModel.aggregate()
    .match(filter)
    .skip(pageOptions.page * pageOptions.limit)
    .limit(pageOptions.limit)
    .project({
      password: 0,
    })
    .then((data) => {
      if (data.length === 0) {
        return res.status(404).json({
          msg: 'NOT_FOUND',
        })
      }
      res.status(200).json({
        data,
        metadata: {
          pageNumber: pageOptions.page,
          pageSize: data.length,
          totalEntries: totalEntries[0].totalEntries,
          totalPages: Math.ceil(totalEntries[0].totalEntries / pageOptions.limit),
        },
      })
    })
    .catch((error: any) => {
      printError({
        type: LogTypeEnum.error,
        moduleName: 'workers',
        functionName: 'getAllManagerWorkers',
        message: 'An error ocurred when trying to list all workers of the manager',
        stackTrace: error,
      })
      res.status(500).json({
        error: {
          message: parseMongoErrors[error.code as keyof typeof parseMongoErrors],
          content: [error],
        },
      })
    })
}

export const getWorker = async (req: Request, res: Response) => {
  try {
    const manager = await ManagerModel.findOne({ _id: req.params.userId }).select('_id')
    if (!manager) {
      return res.status(404).json({ msg: 'NOT FOUND' })
    }
    const worker = await WorkersModel.findOne({ _id: req.params.id }).select('-password')
    if (!worker) {
      return res.status(404).json({ msg: 'NOT FOUND' })
    }
    res.status(200).json(worker)
  } catch (error: any) {
    printError({
      type: LogTypeEnum.error,
      moduleName: 'workers',
      functionName: 'getWorker',
      message: 'An error ocurred when trying to get an worker',
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

export const updateWorker = async (req: Request, res: Response) => {
  try {
    const worker = await WorkersModel.findOne({ _id: req.params.id }).select('-password')
    if (!worker) {
      return res.status(404).json({ msg: 'NOT FOUND' })
    }
    await WorkersModel.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }).exec((err) => {
      if (err) {
        return err
      }
    })
    const workerData = await WorkersModel.findOne({ _id: req.params.id }).select('-password')
    res.status(200).json(workerData)
  } catch (error: any) {
    printError({
      type: LogTypeEnum.error,
      moduleName: 'workers',
      functionName: 'updateWorker',
      message: 'An error ocurred when trying to update an worker',
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

export const deleteWorker = async (req: Request, res: Response) => {
  try {
    await WorkersModel.deleteOne({ _id: req.params.id }).exec((err) => {
      if (err) {
        return err
      }
    })

    res.status(200).json({ msg: 'deleted' })
  } catch (error: any) {
    printError({
      type: LogTypeEnum.error,
      moduleName: 'workers',
      functionName: 'deleteWorker',
      message: 'An error ocurred when trying to delete an worker',
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

export const workerLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const worker = await WorkersModel.findOne({ email, password }).select('-password')
    if (!worker) {
      const workerPass = await WorkersModel.findOne({ email })
      if (workerPass) {
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
      id: worker._id,
      email: worker.email,
      role: UserTypeEnum.WORKER,
    })
    return res.status(200).json({ user: worker, token })
  } catch (error: any) {
    printError({
      type: LogTypeEnum.error,
      moduleName: 'workers',
      functionName: 'workerLogin',
      message: 'An error ocurred when trying to login an worker',
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
