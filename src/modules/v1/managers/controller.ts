import { Request, Response } from 'express'
import { parseMongoErrors } from '../../../helpers/errors'
import { LogTypeEnum, PageOptionsInterface } from '../../../helpers/types'
import { printError, listLimit } from '../../../helpers/utils'
import ManagerModel from './model'
import ProductsModel from '../products/model'
import WorkersModel from '../workers/model'

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
      message: 'An error ocurred when trying to add a manager',
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

export const getAllManagers = async (req: Request, res: Response) => {
  const filter: any = {}

  const pageOptions: PageOptionsInterface = {
    page: parseInt(req.query.page as string) || 0,
    limit: parseInt(req.query.limit as string) || listLimit,
  }

  if (req.query.storeName) {
    Object.assign(filter, { storeName: { $regex: req.query.storeName.toString(), $options: 'i' } })
  }
  if (req.query.email) {
    Object.assign(filter, { email: { $regex: req.query.email.toString(), $options: 'i' } })
  }
  if (req.query.cnpj) {
    Object.assign(filter, { cnpj: req.query.cnpj.toString() })
  }

  if (req.query.city) {
    Object.assign(filter, { 'storeAddress.city': { $regex: req.query.city.toString(), $options: 'i' } })
  }
  if (req.query.neighborhood) {
    Object.assign(filter, { 'storeAddress.neighborhood': { $regex: req.query.neighborhood.toString(), $options: 'i' } })
  }

  const totalEntries = await ManagerModel.aggregate()
    .addFields({
      totalEntries: '$cnpj',
    })
    .match(filter)
    .count('totalEntries')

  ManagerModel.aggregate()
    .match(filter)
    .skip(pageOptions.page * pageOptions.limit)
    .limit(pageOptions.limit)
    .project({
      techId: 0,
      producerId: 0,
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
        moduleName: 'managers',
        functionName: 'getAllManagers',
        message: 'An error ocurred when trying to list managers',
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

export const getManager = async (req: Request, res: Response) => {
  try {
    const manager = await ManagerModel.findOne({ _id: req.params.id }).select('-password')
    if (!manager) {
      return res.status(404).json({ msg: 'NOT FOUND' })
    }
    res.status(200).json(manager)
  } catch (error: any) {
    printError({
      type: LogTypeEnum.error,
      moduleName: 'managers',
      functionName: 'getManager',
      message: 'An error ocurred when trying to get a manager',
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

export const updateManager = async (req: Request, res: Response) => {
  try {
    await ManagerModel.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }).exec((err) => {
      if (err) {
        return err
      }
    })
    const manager = await ManagerModel.findOne({ _id: req.params.id }).select('-password')
    res.status(200).json(manager)
  } catch (error: any) {
    printError({
      type: LogTypeEnum.error,
      moduleName: 'managers',
      functionName: 'updateManager',
      message: 'An error ocurred when trying to update a manager',
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

export const deleteManager = async (req: Request, res: Response) => {
  try {
    const manager = await ManagerModel.findOne({ _id: req.params.id })
    if (!manager) {
      return res.status(404).json({ msg: 'NOT FOUND' })
    }
    await ProductsModel.deleteMany({ managerId: req.params.id }).exec((err) => {
      if (err) {
        return err
      }
    })
    await WorkersModel.deleteMany({ managerId: req.params.id }).exec((err) => {
      if (err) {
        return err
      }
    })
    await ManagerModel.deleteOne({ _id: req.params.id }).exec((err) => {
      if (err) {
        return err
      }
    })

    res.status(200).json({ msg: 'deleted' })
  } catch (error: any) {
    printError({
      type: LogTypeEnum.error,
      moduleName: 'managers',
      functionName: 'deleteManager',
      message: 'An error ocurred when trying to delete a manager',
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
