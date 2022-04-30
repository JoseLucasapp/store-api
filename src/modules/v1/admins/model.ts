import { Schema, model } from 'mongoose'
import { createHash } from '../../../helpers/utils'

export interface AdminInterface {
  email: string
  password: string
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

const Model = model<AdminInterface>('admins', schema)

export default Model
