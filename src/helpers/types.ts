import { Types } from 'mongoose'

export enum UserTypeEnum {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  WORKER = 'WORKER',
}

export interface AuthInterface {
  id: Types.ObjectId
  email: string
  role: UserTypeEnum
}

export enum LogTypeEnum {
  info = 'info',
  warning = 'warning',
  error = 'error',
}

export interface LogInterface {
  type?: LogTypeEnum
  moduleName: string
  functionName: string
  message: string
  session?: any
  stackTrace?: any
}

export interface AddressInterface {
  city: string
  neighborhood: string
  zipCode: string
  state: string
  street: string
  number: string
  complement?: string
}

export interface PageOptionsInterface {
  page: number
  limit: number
}