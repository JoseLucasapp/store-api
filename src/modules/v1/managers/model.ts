import { Schema, model } from 'mongoose'
import { createHash } from '../../../helpers/utils'
import { AddressInterface } from '../../../helpers/types'

export interface ManagerInterface {
  email: string
  password: string
  storeName: string
  managerName: string
  storeAddress: AddressInterface
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
    storeName: {
      type: String,
      required: true,
    },
    cnpj: {
      type: String,
      required: true,
    },
    storeAddress: {
      city: {
        type: String,
        required: true,
      },
      neighborhood: {
        type: String,
        required: true,
      },
      zipCode: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      street: {
        type: String,
        required: true,
      },
      number: {
        type: String,
        required: true,
      },
      complement: {
        type: String,
      },
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

const Model = model<ManagerInterface>('managers', schema)

export default Model
