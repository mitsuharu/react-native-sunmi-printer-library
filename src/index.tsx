import { NativeModules, Platform } from 'react-native'

/*
see: https://developer.sunmi.com/en-US/
see: https://developer.sunmi.com/docs/en-US/xeghjk491/ciqeghjk513
see: https://file.cdn.sunmi.com/SUNMIDOCS/%E5%95%86%E7%B1%B3%E5%86%85%E7%BD%AE%E6%89%93%E5%8D%B0%E6%9C%BA%E5%BC%80%E5%8F%91%E8%80%85%E6%96%87%E6%A1%A3EN-0224.pdf


TransBean.java
https://github.com/shangmisunmi/SunmiPrinterDemo-Eclipse-/blob/master/PrinterTestDemo_eclipse/src/com/sunmi/trans/TransBean.java

commitPrint などトランザクション系とopenDrawer（開けるものない）のでサポートしない

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
  printColumnsText: (texts: string[], widths: number[], alignments: Alignment[]) => Promise<void>
  printColumnsString: (texts: string[], widths: number[], alignments: Alignment[]) => Promise<void>
  printBarCode: (text: string, symbology: BarCodeSymbology, height: number, width: number, textPosition: TextPosition) => Promise<void>

  printQRCode: (text: string, moduleSize: number, errorLevel: ErrorLevel)  => Promise<void>

  lineWrap: (count: number) => Promise<void>
}

// https://github.com/iminsoftware/PrinterLibrary/blob/master/printlibrary/src/main/java/com/sunmi/peripheral/printer/WoyouConsts.java

type WoyouConstsBoolean = 'doubleWidth' | 'doubleHeight' | 'bold' | 'underline' | 'antiWhite' | 'strikethrough' | 'italic' | 'invert'
type WoyouConstsNumber = 'textRightSpacing' | 'relativePosition' | 'absolutePosition' | 'lineSpacing' | 'leftSpacing' | 'strikethroughStyle'
// type WoyouConsts = WoyouConstsBoolean | WoyouConstsNumber
type Alignment = 'left' | 'center' | 'right'
type FontName = 'chineseMonospaced'
type Typeface = 'default'
type BarCodeSymbology = 'UPC-A' | 'UPC-E' | 'JAN13(EAN13)' | 'JAN8(EAN8)' | 'CODE39' | 'ITF' | 'CODABAR' | 'CODE93' | 'CODE128'
type TextPosition = 'none' | 'textAboveBarcode' | 'textUnderBarcode' | 'textAboveAndUnderBarcode'
type ErrorLevel = 'low' | 'middle' | 'quartile' | 'high'

const OS_DOSE_NOT_SUPPORT = 'Your OS does not support'
const sunmiPrinterLibrary: SunmiPrinterLibrary = NativeModules.SunmiPrinterLibrary

export const connect = Platform.select<() => Promise<boolean>>({
  android: () => sunmiPrinterLibrary.connect(),
  default: () => Promise.reject(OS_DOSE_NOT_SUPPORT),
})

export const printerInit = Platform.select<() => Promise<boolean>>({
  android: () => sunmiPrinterLibrary.printerInit(),
  default: () => Promise.reject(OS_DOSE_NOT_SUPPORT),
})

export const printerSelfChecking = Platform.select<() => Promise<boolean>>({
  android: () => sunmiPrinterLibrary.printerSelfChecking(),
  default: () => Promise.reject(OS_DOSE_NOT_SUPPORT),
})

export const getPrinterSerialNo = Platform.select<() => Promise<string>>({
  android: () => sunmiPrinterLibrary.getPrinterSerialNo(),
  default: () => Promise.reject(OS_DOSE_NOT_SUPPORT),
})

export const getPrinterVersion = Platform.select<() => Promise<string>>({
  android: () => sunmiPrinterLibrary.getPrinterVersion(),
  default: () => Promise.reject(OS_DOSE_NOT_SUPPORT),
})

export const getServiceVersion = Platform.select<() => Promise<string>>({
  android: () => sunmiPrinterLibrary.getServiceVersion(),
  default: () => Promise.reject(OS_DOSE_NOT_SUPPORT),
})

export const getPrinterModal = Platform.select<() => Promise<string>>({
  android: () => sunmiPrinterLibrary.getPrinterModal(),
  default: () => Promise.reject(OS_DOSE_NOT_SUPPORT),
})

export const getPrinterPaper = Platform.select<() => Promise<string>>({
  android: () => sunmiPrinterLibrary.getPrinterPaper(),
  default: () => Promise.reject(OS_DOSE_NOT_SUPPORT),
})

export const getPrintedLength = Platform.select<() => Promise<string>>({
  android: () => sunmiPrinterLibrary.getPrintedLength(),
  default: () => Promise.reject(OS_DOSE_NOT_SUPPORT),
})

export const updatePrinterState = Platform.select<() => Promise<number>>({
  android: () => sunmiPrinterLibrary.updatePrinterState(),
  default: () => Promise.reject(OS_DOSE_NOT_SUPPORT),
})

const _setPrinterStyle = Platform.select<((key: WoyouConstsBoolean | WoyouConstsNumber, value: boolean | number) => Promise<boolean>)>({
  android: (key, value) => (typeof value === 'boolean')
    ? sunmiPrinterLibrary.setPrinterStyleBoolean(key as WoyouConstsBoolean, value)
    : sunmiPrinterLibrary.setPrinterStyleNumber(key as WoyouConstsNumber, value),
  default: () => Promise.reject(OS_DOSE_NOT_SUPPORT),
})

export function setPrinterStyle(key: WoyouConstsBoolean, value: boolean): Promise<boolean>;
export function setPrinterStyle(key: WoyouConstsNumber, value: number): Promise<boolean>;
export function setPrinterStyle(key: WoyouConstsBoolean | WoyouConstsNumber, value: boolean | number): Promise<boolean> {
  return _setPrinterStyle(key, value)
}

export const setAlignment = Platform.select<(alignment: Alignment) => Promise<void>>({
  android: (alignment) => sunmiPrinterLibrary.setAlignment(alignment),
  default: () => Promise.reject(OS_DOSE_NOT_SUPPORT),
})

export const setFontName = Platform.select<(fontName: FontName) => Promise<void>>({
  android: (fontName) => sunmiPrinterLibrary.setFontName(fontName),
  default: () => Promise.reject(OS_DOSE_NOT_SUPPORT),
})

export const setFontSize = Platform.select<(fontSize: number) => Promise<void>>({
  android: (fontSize) => sunmiPrinterLibrary.setFontSize(fontSize),
  default: () => Promise.reject(OS_DOSE_NOT_SUPPORT),
})

export const setBold = Platform.select<(isBold: boolean) => Promise<void>>({
  android: (isBold) => sunmiPrinterLibrary.setBold(isBold),
  default: () => Promise.reject(OS_DOSE_NOT_SUPPORT),
})

export const printText = Platform.select<(text: string) => Promise<void>>({
  android: (text) => sunmiPrinterLibrary.printText(text),
  default: () => Promise.reject(OS_DOSE_NOT_SUPPORT),
})

export const printTextWithFont = Platform.select<(text: string, typeface: Typeface, fontSize: number) => Promise<void>>({
  android: (text, typeface, fontSize) => sunmiPrinterLibrary.printTextWithFont(text, typeface, fontSize),
  default: () => Promise.reject(OS_DOSE_NOT_SUPPORT),
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
  default: () => Promise.reject(OS_DOSE_NOT_SUPPORT),
})

/**
 * Print a row of a table
 * 
 * @note
 * - This may not supports width and alignment for each column. Its width means text length.
 * - This does not support Arabic Characters. If you print it, use printColumnsString.
 * 
 * @example
 * SunmiPrinterLibrary.printColumnsText(
 *      ['apple', 'orange', 'banana'], 
 *      [8, 8, 8], 
 *      ['center', 'center', 'center'])
 */
export const printColumnsText = Platform.select<(texts: string[], widths: number[], alignments: Alignment[]) => Promise<void>>({
  android: (texts, widths, alignments) => sunmiPrinterLibrary.printColumnsText(texts, widths, alignments),
  default: () => Promise.reject(OS_DOSE_NOT_SUPPORT),
})

/**
 * Print a row of a table
 * 
 * @note
 * This supports width and alignment for each column.
 * 
 * @example
 * SunmiPrinterLibrary.printColumnsString(
 *      ['apple', 'orange', 'banana'], 
 *      [8, 8, 8], 
 *      ['center', 'center', 'center'])
 */
export const printColumnsString = Platform.select<(texts: string[], widths: number[], alignments: Alignment[]) => Promise<void>>({
  android: (texts, widths, alignments) => sunmiPrinterLibrary.printColumnsString(texts, widths, alignments),
  default: () => Promise.reject(OS_DOSE_NOT_SUPPORT),
})

/**
 * Print 1D BarCode
 * 
 * @note
 * Text pattern (e.g. length, character) is determined by symbology.
 * 
 * @description
 * - code39
 *    - Numbers within 13 digits can be printed
 * - code93 
 *    - Numbers within 17 digits can be printed
 * - JAN8(EAN8)
 *    - 8-digit numbers (the last digit is for parity check). The effective length is 8 digits (numbers).
 * - JAN13(EAN13)
 *    - The effective length is 13 digits, and the last digit is for parity check.
 * - ITF 
 *    - Number (even number of digits) within 14 digits is required.
 * - Codabar
 *    - Numbers within 0-9 plus 6 special characters. Maximum18 digitscan be printed. UPC-E 8-digit number (the last digit is for parity check)
 * - UPC-A
 *    - 12-digit number (the last digit is for parity check)
 * - code128
 *    - Code128 can be devided into subset A, B and C:
 *    - 128A: numbers, upper-case letters, and control characters, etc. 
 *    - 128B: numbers, upper- and lower-case letters and special character. 
 *    - 128C: numbers only. It must have an even number of digits (if it has an odd number of digits, the last digit will be omitted). 
 *    - By default, the interface uses subset B. “{A” or “{C” should be added before the content if you need to use subset A or C, for example: “{A2344A”, ”{C123123”, ”{A1A{B13B{C12”.
 * 
 * @example
 * SunmiPrinterLibrary.printBarCode('1234567890', 'CODE128', 162, 2, 'textUnderBarcode')
 * 
 */
export const printBarCode = Platform.select<(text: string, symbology: BarCodeSymbology, height: number, width: number, textPosition: TextPosition) => Promise<void>>({
  android: (text, symbology, height, width, textPosition) => sunmiPrinterLibrary.printBarCode(text, symbology, height, width, textPosition),
  default: () => Promise.reject(OS_DOSE_NOT_SUPPORT),
})

/**
 * Print QR code
 * 
 * @param {string} text - QR code to be printed.
 * @param {number} moduleSize - It is a size of a QR code block and should be within 4-16.
 * @param {ErrorLevel} errorLevel - QR code error correction level
 * 
 * @description
 * - After calling this method, the content will be printed under normal print status, and every QR code block is 4 Pixel (when smaller than 4 Pixel, the code parsing might fail). 
 * - version19 (93*93) is a maximum mode supported.
 * 
 * @example
 * SunmiPrinterLibrary.printQRCode('Hello World', 8, 'middle')
 */
export const printQRCode = Platform.select<(text: string, moduleSize: number, errorLevel: ErrorLevel) => Promise<void>>({
  android: (text, moduleSize, errorLevel) => {
    if (moduleSize < 4 || 16 < moduleSize) {
      return Promise.reject('printQrCode is failed. moduleSize should be within 4-16.')
    }
    return sunmiPrinterLibrary.printQRCode(text, moduleSize, errorLevel)
  },
  default: () => Promise.reject(OS_DOSE_NOT_SUPPORT),
})



export const lineWrap = Platform.select<(count: number) => Promise<void>>({
  android: (count) => sunmiPrinterLibrary.lineWrap(count),
  default: () => Promise.reject(OS_DOSE_NOT_SUPPORT),
})
