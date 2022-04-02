import { LogInterface, LogTypeEnum } from './types'

export const printError = ({ type, moduleName, functionName, message, session, stackTrace }: LogInterface) => {
  const content = `Type: ${type}, Module: ${moduleName}, Function: ${functionName}, Message: ${message}, Session: ${session}, ${stackTrace}`

  const parseLogType = () => {
    if (type === LogTypeEnum.warning) return 'warn'
    if (type === LogTypeEnum.error) return 'error'
    return 'log'
  }

  const parseColors = () => {
    if (type === LogTypeEnum.warning) return '\u001b[33m'
    if (type === LogTypeEnum.error) return '\u001b[31m'
    return '\u001b[32m'
  }

  return console[parseLogType()](parseColors(), content)
}
