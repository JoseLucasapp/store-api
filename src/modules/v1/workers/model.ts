import mongoose, { Schema, model } from 'mongoose'
import { createHash } from '../../../helpers/utils'

export interface WorkersInterface {
  email: string
  password: string
  managerId: mongoose.Types.ObjectId
}

const schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      set: createHash,
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

const Model = model<WorkersInterface>('workers', schema)

export default Model
