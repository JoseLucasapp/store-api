import mongoose, { Schema, model } from 'mongoose'
import { CategoryInterface } from 'modules/v1/categories/model'

export interface ProductInterface {
  productName: string
  productPrice: number
  productDescription: string
  productBrand: string
  productAmount: number
  productCategory: CategoryInterface
  managerId: mongoose.Types.ObjectId
}

const schema = new Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    productPrice: {
      type: Number,
      required: true,
    },
    productDescription: {
      type: String,
      required: true,
    },
    productBrand: {
      type: String,
      required: true,
    },
    productAmount: {
      type: Number,
      required: true,
    },
    productCategory: {
      type: String,
      required: true,
    },
    managerId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.__v
        return ret
      },
    },
  },
)

const Model = model<ProductInterface>('products', schema)

export default Model
