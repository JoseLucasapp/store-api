import mongoose, { Schema, model } from 'mongoose'

export interface CategoryInterface {
  categoryName: string
  managerId: mongoose.Types.ObjectId
}

const schema = new Schema(
  {
    categoryName: {
      type: String,
      required: true,
      unique: true,
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

const Model = model<CategoryInterface>('categories', schema)

export default Model
