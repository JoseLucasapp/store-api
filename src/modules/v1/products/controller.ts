import { Request, Response } from 'express'
import { parseMongoErrors } from '../../../helpers/errors'
import { LogTypeEnum, PageOptionsInterface } from '../../../helpers/types'
import { printError, listLimit } from '../../../helpers/utils'
import ProductsModel from '../products/model'
import WorkersModel from '../workers/model'
import mongoose from 'mongoose'

export const newProduct = async (req: Request, res: Response) => {
  try {
    const product = new ProductsModel({ ...req.body, managerId: req.params.userId })
    const data = await product.save()
    const productDetails = await ProductsModel.findOne({ _id: data._id })
    res.status(200).json(productDetails)
  } catch (error: any) {
    printError({
      type: LogTypeEnum.error,
      moduleName: 'products',
      functionName: 'newProduct',
      message: 'An error ocurred when trying to add a product',
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

export const getAllManagerProducts = async (req: Request, res: Response) => {
  const filter: Array<Object> = []
  const pageOptions: PageOptionsInterface = {
    page: parseInt(req.query.page as string) || 0,
    limit: parseInt(req.query.limit as string) || listLimit,
  }

  if (req.query.name) filter.push({ $regexMatch: { input: '$productName', regex: req.query.name.toString(), options: 'i' } })
  if (req.query.brand) filter.push({ $regexMatch: { input: '$productBrand', regex: req.query.brand.toString(), options: 'i' } })
  if (req.query.category) filter.push({ $regexMatch: { input: '$productCategory', regex: req.query.category.toString(), options: 'i' } })

  if (req.query.startPrice) filter.push({ $gte: ['$productPrice', parseInt(req.query.startPrice.toString())] })
  if (req.query.endPrice) filter.push({ $lte: ['$productPrice', parseInt(req.query.endPrice.toString())] })

  if (req.query.startAmount) filter.push({ $gte: ['$productAmount', parseInt(req.query.startAmount.toString())] })
  if (req.query.endAmount) filter.push({ $lte: ['$productAmount', parseInt(req.query.endAmount.toString())] })

  const manager: any = {}

  if (req.params.userRole === UserTypeEnum.MANAGER) {
    manager.managerId = new mongoose.Types.ObjectId(req.params.userId)
  }
  if (req.params.userRole === UserTypeEnum.WORKER) {
    const worker: any = await WorkersModel.findOne({ _id: req.params.userId }).select('managerId')
    manager.managerId = new mongoose.Types.ObjectId(worker.managerId)
  }
  filter.push({ $eq: ['$managerId', manager.managerId] })
  const totalEntries = await ProductsModel.aggregate([
    {
      $match: {
        $expr: {
          $and: filter,
        },
      },
    },
  ])
    .addFields({
      totalEntries: '$_id',
    })
    .count('totalEntries')

  ProductsModel.aggregate([
    {
      $match: {
        $expr: {
          $and: filter,
        },
      },
    },
  ])
    .skip(pageOptions.page * pageOptions.limit)
    .limit(pageOptions.limit)
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
        moduleName: 'products',
        functionName: 'getAllManagerProducts',
        message: 'An error ocurred when trying to list all products of the manager',
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

export const getProduct = async (req: Request, res: Response) => {
  try {
    const product = await ProductsModel.findOne({ _id: req.params.id })
    if (!product) {
      return res.status(404).json({ msg: 'NOT FOUND' })
    }
    res.status(200).json(product)
  } catch (error: any) {
    printError({
      type: LogTypeEnum.error,
      moduleName: 'products',
      functionName: 'getProduct',
      message: 'An error ocurred when trying to get one product',
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

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = await ProductsModel.findOne({ _id: req.params.id })
    if (!product) {
      return res.status(404).json({ msg: 'NOT FOUND' })
    }
    await ProductsModel.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }).exec((err) => {
      if (err) {
        return err
      }
    })
    const productData = await ProductsModel.findOne({ _id: req.params.id })
    res.status(200).json(productData)
  } catch (error: any) {
    printError({
      type: LogTypeEnum.error,
      moduleName: 'products',
      functionName: 'updateProduct',
      message: 'An error ocurred when trying to update a product',
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

export const deletProduct = async (req: Request, res: Response) => {
  try {
    await ProductsModel.deleteOne({ _id: req.params.id }).exec((err) => {
      if (err) {
        return err
      }
    })

    res.status(200).json({ msg: 'deleted' })
  } catch (error: any) {
    printError({
      type: LogTypeEnum.error,
      moduleName: 'products',
      functionName: 'deleteProduct',
      message: 'An error ocurred when trying to delete an product',
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
