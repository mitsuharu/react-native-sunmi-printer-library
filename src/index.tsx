import { NativeModules, Platform } from 'react-native'

/*
see: https://developer.sunmi.com/en-US/
see: https://developer.sunmi.com/docs/en-US/xeghjk491/ciqeghjk513
see: https://file.cdn.sunmi.com/SUNMIDOCS/%E5%95%86%E7%B1%B3%E5%86%85%E7%BD%AE%E6%89%93%E5%8D%B0%E6%9C%BA%E5%BC%80%E5%8F%91%E8%80%85%E6%96%87%E6%A1%A3EN-0224.pdf
*/

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
  setPrinterStyleBoolean: (key: WoyouConstsBoolean, value: boolean) => Promise<boolean>
  setPrinterStyleNumber: (key: WoyouConstsNumber, value: number) => Promise<boolean>
  setAlignment: (alignment: Alignment) => Promise<void>
  setFontName: (fontName: FontName) => Promise<void>
  setBold: (isBold: boolean) => Promise<void>
  setFontSize: (fontSize: number) => Promise<void>
  printText: (text: string) => Promise<void>
  printTextWithFont: (text: string, typeface: Typeface, fontSize: number) => Promise<void>
  printOriginalText: (text: string) => Promise<void>


  lineWrap: (count: number) => Promise<void>
}

// https://github.com/iminsoftware/PrinterLibrary/blob/master/printlibrary/src/main/java/com/sunmi/peripheral/printer/WoyouConsts.java

type WoyouConstsBoolean = 'doubleWidth' | 'doubleHeight' | 'bold' | 'underline' | 'antiWhite' | 'strikethrough' | 'italic' | 'invert'
type WoyouConstsNumber = 'textRightSpacing' | 'relativePosition' | 'absolutePosition' | 'lineSpacing' | 'leftSpacing' | 'strikethroughStyle'
type Alignment = 'left' | 'center' | 'right'
type FontName = 'chineseMonospaced'
type Typeface = 'default'

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

export const setAlignment = Platform.select<(alignment: Alignment) => Promise<void>>({
  android: (alignment) => sunmiPrinterLibrary.setAlignment(alignment),
  default: () => Promise.reject(NOT_SUPPORTED),
})

export const setFontName = Platform.select<(fontName: FontName) => Promise<void>>({
  android: (fontName) => sunmiPrinterLibrary.setFontName(fontName),
  default: () => Promise.reject(NOT_SUPPORTED),
})

export const setFontSize = Platform.select<(fontSize: number) => Promise<void>>({
  android: (fontSize) => sunmiPrinterLibrary.setFontSize(fontSize),
  default: () => Promise.reject(NOT_SUPPORTED),
})

export const setBold = Platform.select<(isBold: boolean) => Promise<void>>({
  android: (isBold) => sunmiPrinterLibrary.setBold(isBold),
  default: () => Promise.reject(NOT_SUPPORTED),
})

export const printText = Platform.select<(text: string) => Promise<void>>({
  android: (text) => sunmiPrinterLibrary.printText(text),
  default: () => Promise.reject(NOT_SUPPORTED),
})

export const printTextWithFont = Platform.select<(text: string, typeface: Typeface, fontSize: number) => Promise<void>>({
  android: (text, typeface, fontSize) => sunmiPrinterLibrary.printTextWithFont(text, typeface, fontSize),
  default: () => Promise.reject(NOT_SUPPORTED),
})

/**
 * Print Vector Font
 * 
 * @note
 * output characters are in the same width of vector fonts, which means that they are not monospace.
 * 
 * @example
 * printOriginalText('κρχκμνκλρκνκνμρτυφ')
 */
export const printOriginalText = Platform.select<(text: string) => Promise<void>>({
  android: (text) => sunmiPrinterLibrary.printOriginalText(text),
  default: () => Promise.reject(NOT_SUPPORTED),
})


export const lineWrap = Platform.select<(count: number) => Promise<void>>({
  android: (count) => sunmiPrinterLibrary.lineWrap(count),
  default: () => Promise.reject(NOT_SUPPORTED),
})
