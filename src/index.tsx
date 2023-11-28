import { NativeModules, Platform } from 'react-native'

interface SunmiPrinterLibrary {
  connect: () => Promise<boolean>
  printerInit: () => Promise<boolean>
  printerSelfChecking: () => Promise<boolean>
  getPrinterSerialNo: () => Promise<string>
  getPrinterVersion: () => Promise<string>
  getServiceVersion: () => Promise<string>
  getPrinterModal: () => Promise<string>
  getPrinterPaper: () => Promise<string>
  getPrintedLength: () => Promise<string>
  updatePrinterState: () => Promise<number>
  sendRAWData: (base64: string) => Promise<void>  
  setPrinterStyleBoolean(key: WoyouConstsBoolean, value: boolean): Promise<boolean>
  setPrinterStyleNumber(key: WoyouConstsNumber, value: number): Promise<boolean>


  printText: (text: string) => Promise<void>

  lineWrap: (count: number) => Promise<void>
}

// https://github.com/iminsoftware/PrinterLibrary/blob/master/printlibrary/src/main/java/com/sunmi/peripheral/printer/WoyouConsts.java

export type WoyouConsts = WoyouConstsBoolean | WoyouConstsNumber
type WoyouConstsBoolean = 'doubleWidth' | 'doubleHeight' | 'bold' | 'underline' | 'antiWhite' | 'strikethrough' | 'italic' | 'invert'
type WoyouConstsNumber = 'textRightSpacing' | 'relativePosition' | 'absolutePosition' | 'lineSpacing' | 'leftSpacing' | 'strikethroughStyle'


const NOT_SUPPORTED = 'This device is not supported'
const sunmiPrinterLibrary: SunmiPrinterLibrary = NativeModules.SunmiPrinterLibrary

export const connect = Platform.select<() => Promise<boolean>>({
  android: () => sunmiPrinterLibrary.connect(),
  default: () => Promise.reject(NOT_SUPPORTED),
})

export const printerInit = Platform.select<() => Promise<boolean>>({
  android: () => sunmiPrinterLibrary.printerInit(),
  default: () => Promise.reject(NOT_SUPPORTED),
})

export const printerSelfChecking = Platform.select<() => Promise<boolean>>({
  android: () => sunmiPrinterLibrary.printerSelfChecking(),
  default: () => Promise.reject(NOT_SUPPORTED),
})

export const getPrinterSerialNo = Platform.select<() => Promise<string>>({
  android: () => sunmiPrinterLibrary.getPrinterSerialNo(),
  default: () => Promise.reject(NOT_SUPPORTED),
})

export const getPrinterVersion = Platform.select<() => Promise<string>>({
  android: () => sunmiPrinterLibrary.getPrinterVersion(),
  default: () => Promise.reject(NOT_SUPPORTED),
})

export const getServiceVersion = Platform.select<() => Promise<string>>({
  android: () => sunmiPrinterLibrary.getServiceVersion(),
  default: () => Promise.reject(NOT_SUPPORTED),
})

export const getPrinterModal = Platform.select<() => Promise<string>>({
  android: () => sunmiPrinterLibrary.getPrinterModal(),
  default: () => Promise.reject(NOT_SUPPORTED),
})

export const getPrinterPaper = Platform.select<() => Promise<string>>({
  android: () => sunmiPrinterLibrary.getPrinterPaper(),
  default: () => Promise.reject(NOT_SUPPORTED),
})

export const getPrintedLength = Platform.select<() => Promise<string>>({
  android: () => sunmiPrinterLibrary.getPrintedLength(),
  default: () => Promise.reject(NOT_SUPPORTED),
})

export const updatePrinterState = Platform.select<() => Promise<number>>({
  android: () => sunmiPrinterLibrary.updatePrinterState(),
  default: () => Promise.reject(NOT_SUPPORTED),
})

const _setPrinterStyle = Platform.select<((key: WoyouConstsBoolean | WoyouConstsNumber, value: boolean | number) => Promise<boolean>)>({
  android: (key, value) => (typeof value === 'boolean')
    ? sunmiPrinterLibrary.setPrinterStyleBoolean(key as WoyouConstsBoolean, value)
    : sunmiPrinterLibrary.setPrinterStyleNumber(key as WoyouConstsNumber, value),
  default: () => Promise.reject(NOT_SUPPORTED),
})

export function setPrinterStyle(key: WoyouConstsBoolean, value: boolean): Promise<boolean>;
export function setPrinterStyle(key: WoyouConstsNumber, value: number): Promise<boolean>;
export function setPrinterStyle(key: WoyouConstsBoolean | WoyouConstsNumber, value: boolean | number): Promise<boolean> {
  return _setPrinterStyle(key, value)
}



export const printText = Platform.select<(text: string) => Promise<void>>({
  android: (text) => sunmiPrinterLibrary.printText(text),
  default: () => Promise.reject(NOT_SUPPORTED),
})


export const lineWrap = Platform.select<(count: number) => Promise<void>>({
  android: (count) => sunmiPrinterLibrary.lineWrap(count),
  default: () => Promise.reject(NOT_SUPPORTED),
})
