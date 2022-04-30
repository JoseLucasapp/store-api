import { Request, Response } from 'express'
import { parseMongoErrors } from '../../../helpers/errors'
import { LogTypeEnum, UserTypeEnum } from '../../../helpers/types'
import { printError } from '../../../helpers/utils'
import CategoryModel from './model'
import WorkersModel from '../workers/model'
import ProductsModel from '../products/model'
import mongoose from 'mongoose'

export const newCategory = async (req: Request, res: Response) => {
  try {
    const category = new CategoryModel({ ...req.body, managerId: req.params.userId })
    const data = await category.save()
    const categoryDetails = await CategoryModel.findOne({ _id: data._id })
    res.status(200).json(categoryDetails)
  } catch (error: any) {
    printError({
      type: LogTypeEnum.error,
      moduleName: 'categories',
      functionName: 'newCategory',
      message: 'An error ocurred when trying to add a category',
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

export const getAllManagerCategories = async (req: Request, res: Response) => {
  const filter: Array<Object> = []
  const manager: any = {}

  if (req.params.userRole === UserTypeEnum.MANAGER) {
    manager.managerId = new mongoose.Types.ObjectId(req.params.userId)
  }
  if (req.params.userRole === UserTypeEnum.WORKER) {
    const worker: any = await WorkersModel.findOne({ _id: req.params.userId }).select('managerId')
    manager.managerId = new mongoose.Types.ObjectId(worker.managerId)
  }
  filter.push({ $eq: ['$managerId', manager.managerId] })

  CategoryModel.aggregate([
    {
      $match: {
        $expr: {
          $and: filter,
        },
      },
    },
  ])
    .project({
      categoryName: 1,
      _id: 1,
    })
    .then((data) => {
      if (data.length === 0) {
        return res.status(200).json({ data: [] })
      }
      res.status(200).json(data)
    })
    .catch((error: any) => {
      printError({
        type: LogTypeEnum.error,
        moduleName: 'categories',
        functionName: 'getAllManagerCategories',
        message: 'An error ocurred when trying to list all categories of the manager',
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

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const category = await CategoryModel.findOne({ _id: req.params.id })
    if (!category) {
      return res.status(404).json({ msg: 'NOT FOUND' })
    }
    await CategoryModel.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }).exec((err) => {
      if (err) {
        return err
      }
    })
    const categoryData = await CategoryModel.findOne({ _id: req.params.id })
    res.status(200).json(categoryData)
  } catch (error: any) {
    printError({
      type: LogTypeEnum.error,
      moduleName: 'categories',
      functionName: 'updateCategory',
      message: 'An error ocurred when trying to update a category',
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

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const category = await CategoryModel.findOne({ _id: req.params.id })
    if (category) {
      const categoryIsBeenUsed = await ProductsModel.find({ productCategory: req.params.id })
      if (categoryIsBeenUsed.length > 0) {
        return res.status(401).json({
          msg: `This category is been used on ${categoryIsBeenUsed.length} ${categoryIsBeenUsed.length === 1 ? 'product' : 'products'}.`,
        })
      }
      await CategoryModel.deleteOne({ _id: req.params.id }).exec((err) => {
        if (err) {
          return err
        }
      })

      return res.status(200).json({ msg: 'deleted' })
    }
    return res.status(404).json({ msg: 'NOT FOUND' })
  } catch (error: any) {
    printError({
      type: LogTypeEnum.error,
      moduleName: 'categories',
      functionName: 'deleteCategory',
      message: 'An error ocurred when trying to delete an category',
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
