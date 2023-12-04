import { NativeModules, Platform } from 'react-native'

/**
 * see: SUNMI Developers <https://developer.sunmi.com/en-US/>
 */

/**
 * Native Method for Printer
 */
interface SunmiPrinterLibrary {
  connect: () => Promise<boolean>
  disconnect: () => Promise<void>
  printerInit: () => Promise<boolean>
  printerSelfChecking: () => Promise<boolean>
  getPrinterInfo: () => Promise<NativePrinterInfo>
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
  printBarcode: (text: string, symbology: Barcode1DSymbology, height: number, width: number, textPosition: TextPosition) => Promise<void>
  printQRCode: (text: string, moduleSize: number, errorLevel: QRErrorLevel)  => Promise<void>
  print2DCode: (text: string, symbology: number, moduleSize: number, errorLevel: number)  => Promise<void>
  lineWrap: (count: number) => Promise<void>
  cutPaper: () => Promise<void>
  getCutPaperTimes: () => Promise<number>
  printBitmapBase64: (base64: string, pixelWidth: number) => Promise<void>
  printBitmapBase64Custom: (base64: string, pixelWidth: number, type: number) => Promise<void>
}

/**
 * Native Method for Scanner
 */
interface SunmiScannerLibrary {
  scan: () => Promise<string>
}

const sunmiPrinterLibrary: SunmiPrinterLibrary = NativeModules.SunmiPrinterLibrary
const sunmiScannerLibrary: SunmiScannerLibrary = NativeModules.SunmiScannerLibrary

const OS_DOSE_NOT_SUPPORT = 'Your OS does not support'

export type WoyouConstsBoolean = 'doubleWidth' | 'doubleHeight' | 'bold' | 'underline' | 'antiWhite' | 'strikethrough' | 'italic' | 'invert'
export type WoyouConstsNumber = 'textRightSpacing' | 'relativePosition' | 'absolutePosition' | 'lineSpacing' | 'leftSpacing' | 'strikethroughStyle'
export type Alignment = 'left' | 'center' | 'right'
export type FontName = 'chineseMonospaced'
export type Typeface = 'default'
export type Barcode1DSymbology = 'UPC-A' | 'UPC-E' | 'JAN13(EAN13)' | 'JAN8(EAN8)' | 'CODE39' | 'ITF' | 'CODABAR' | 'CODE93' | 'CODE128'
export type TextPosition = 'none' | 'textAboveBarcode' | 'textUnderBarcode' | 'textAboveAndUnderBarcode'
export type QRErrorLevel = 'low' | 'middle' | 'quartile' | 'high'
export type Barcode2DSymbology = 'QR' | 'PDF417' | 'DataMatrix'
export type PaperWidth = '58mm' | '80mm'
export const MaxPixelWidth: {[width in PaperWidth]: number} = {
  '58mm' : 384,
  '80mm' : 576
}
export const defaultFontSize = 24
export const EventType = {
  onScanSuccess: 'onScanSuccess',
  onScanFailed: 'onScanFailed',
}
type NativePrinterInfo = {
  serialNumber: string,
  printerVersion: string,
  serviceVersion: string,
  printerModal: string,
  paperWidth: string,
}
export type PrinterInfo = NativePrinterInfo & {
  paperWidth: PaperWidth,
  pixelWidth: number,
}

/**
 * connect printer
 * 
 * @example
 * await SunmiPrinterLibrary.connect()
 */
const connect = Platform.select<() => Promise<boolean>>({
  android: () => sunmiPrinterLibrary.connect(),
  default: () => Promise.reject(OS_DOSE_NOT_SUPPORT),
})

/**
 * initialize printer
 * 
 * @note
 * It calls printerInit after connects printer
 * 
 * @example
 * await SunmiPrinterLibrary.printerInit()
 */
const printerInit = Platform.select<() => Promise<boolean>>({
  android: () => sunmiPrinterLibrary.printerInit(),
  default: () => Promise.reject(OS_DOSE_NOT_SUPPORT),
})

/**
 * prepare
 * 
 * @note
 * It must call to connect and initialize printer. If re-call it, reset text stylings.
 * 
 * @example
 * await SunmiPrinterLibrary.prepare()
 */
export const prepare = async () => {
  await connect()
  await printerInit()
  await setDefaultFontSize()
  return true
}

/**
 * reset printer style
 * 
 * @example
 * await SunmiPrinterLibrary.resetPrinterStyle()
 */
export const resetPrinterStyle = async () => {
  await printerInit()
  await setDefaultFontSize()
  return true
}

// !!! This is temporarily comment-out because it is not available. !!!
// FIXME: It can not use disconnect().
// error message > Service not registered: com.sunmiprinterlibrary.SunmiPrinterLibraryModule$disconnect$callback$1@bb8f7ce
//
// /**
//  * disconnect printer
//  * 
//  * @note
//  * It cannot disconnect. why...?
//  * "Service not registered: com.sunmiprinterlibrary.SunmiPrinterLibraryModule$disconnect$callback$1@4a31ba4"
//  *  
//  * @example
//  * await SunmiPrinterLibrary.disconnect()
//  */
// export const disconnect  = Platform.select<() => Promise<void>>({
//   android: () => sunmiPrinterLibrary.disconnect(),
//   default: () => Promise.reject(OS_DOSE_NOT_SUPPORT),
// })

/**
 * Print self-inspection
 */
export const printSelfChecking = Platform.select<() => Promise<boolean>>({
  android: () => sunmiPrinterLibrary.printerSelfChecking(),
  default: () => Promise.reject(OS_DOSE_NOT_SUPPORT),
})

/**
 * Get the SN of a printer board
 */
export const getPrinterSerialNo = Platform.select<() => Promise<string>>({
  android: () => sunmiPrinterLibrary.getPrinterSerialNo(),
  default: () => Promise.reject(OS_DOSE_NOT_SUPPORT),
})

/**
 * Get printer firmware version
 */
export const getPrinterVersion = Platform.select<() => Promise<string>>({
  android: () => sunmiPrinterLibrary.getPrinterVersion(),
  default: () => Promise.reject(OS_DOSE_NOT_SUPPORT),
})

/**
 * Get the version number of a print service
 */
export const getServiceVersion = Platform.select<() => Promise<string>>({
  android: () => sunmiPrinterLibrary.getServiceVersion(),
  default: () => Promise.reject(OS_DOSE_NOT_SUPPORT),
})

/**
 * Get printer type interface
 */
export const getPrinterModal = Platform.select<() => Promise<string>>({
  android: () => sunmiPrinterLibrary.getPrinterModal(),
  default: () => Promise.reject(OS_DOSE_NOT_SUPPORT),
})

/**
 * Get the current paper spec of a printer
 * 
 * @returns "58mm" | "80mm"
 */
export const getPaperWidth = Platform.select<() => Promise<PaperWidth>>({
  android: async () => {
    const result = await sunmiPrinterLibrary.getPrinterPaper()
    return Promise.resolve(result as PaperWidth)
  },
  default: () => Promise.reject(OS_DOSE_NOT_SUPPORT),
})

/**
 * Get max pixel width
 * 
 * @returns if width is 58mm" then 384 or it is "80mm" then 576
 */
export const getPrinterMaxPixelWidth = Platform.select<() => Promise<number>>({
  android: async () => {
    const result: PaperWidth = await getPaperWidth()
    return Promise.resolve(MaxPixelWidth[result])
  },
  default: () => Promise.reject(OS_DOSE_NOT_SUPPORT),
})

/**
 * Get the print length of a printhead
 */
export const getPrintedLength = Platform.select<() => Promise<string>>({
  android: () => sunmiPrinterLibrary.getPrintedLength(),
  default: () => Promise.reject(OS_DOSE_NOT_SUPPORT),
})

const PrinterState: { [value: number]: string } = {
  1: 'The printer works normally',
  2: 'Preparing printer',
  3: 'Abnormal communication',
  4: 'Out of paper',
  5: 'Overheated',
  6: 'Open the lid',
  7: 'The paper cutter is abnormal',
  8: 'The paper cutter has been recovered',
  9: 'No black mark has been detected',
  505: 'No printer has been detected',
  507: 'Failed to upgrade the printer firmware',
}

/**
 * Get the latest status of a printer
 * 
 * @returns value: number, description: string
 * - 1: The printer works normally
 * - 2: Preparing printer
 * - 3: Abnormal communication
 * - 4: Out of paper
 * - 5: Overheated
 * - 6: Open the lid
 * - 7: The paper cutter is abnormal
 * - 8: The paper cutter has been recovered
 * - 9: No black mark has been detected
 * - 505: No printer has been detected
 * - 507: Failed to upgrade the printer firmware
 */
export const getPrinterState = Platform.select<() => Promise<{value: number, description: string}>>({
  android: async () => {
    const value = await sunmiPrinterLibrary.updatePrinterState()
    const description = PrinterState[value]
    if (description){
      return Promise.resolve({value, description})
    }else {
      return Promise.reject('getPrinterState is failed.') 
    }
  },
  default: () => Promise.reject(OS_DOSE_NOT_SUPPORT),
})

const _setPrinterStyle = Platform.select<((key: WoyouConstsBoolean | WoyouConstsNumber, value: boolean | number) => Promise<boolean>)>({
  android: (key, value) => (typeof value === 'boolean')
    ? sunmiPrinterLibrary.setPrinterStyleBoolean(key as WoyouConstsBoolean, value)
    : sunmiPrinterLibrary.setPrinterStyleNumber(key as WoyouConstsNumber, value),
  default: () => Promise.reject(OS_DOSE_NOT_SUPPORT),
})

/**
 * Set printer style
 * @param {WoyouConstsBoolean} key - "doubleWidth" | "doubleHeight" | "bold" | "underline" | "antiWhite" | "strikethrough" | "italic" | "invert"
 * @param {boolean} value true | false
 */
export function setPrinterStyle(key: WoyouConstsBoolean, value: boolean): Promise<boolean>;
/**
 * Set printer style
 * @param {WoyouConstsNumber} key - "textRightSpacing" | "relativePosition" | "absolutePosition" | "lineSpacing" | "leftSpacing" | "strikethroughStyle"
 * @param {number} value integer
 */
export function setPrinterStyle(key: WoyouConstsNumber, value: number): Promise<boolean>;
/**
 * Set printer style
 */
export function setPrinterStyle(key: WoyouConstsBoolean | WoyouConstsNumber, value: boolean | number): Promise<boolean> {
  return _setPrinterStyle(key, value)
}

/**
 * Set alignment
 * 
 * @param {Alignment} alignment "left" | "center" | "right"
 */
export const setAlignment = Platform.select<(alignment: Alignment) => Promise<void>>({
  android: (alignment) => sunmiPrinterLibrary.setAlignment(alignment),
  default: () => Promise.reject(OS_DOSE_NOT_SUPPORT),
})

// !!! This is temporarily comment-out because it is not available. !!!
//
// /**
//  * Set print typeface (unavailable for now)
//  * 
//  * @note
//  * unavailable for now
//  * 
//  * @param {FontName} fontName "chineseMonospaced"
//  */
// export const setFontName = Platform.select<(fontName: FontName) => Promise<void>>({
//   android: (fontName) => sunmiPrinterLibrary.setFontName(fontName),
//   default: () => Promise.reject(OS_DOSE_NOT_SUPPORT),
// })

/**
 * Set font size
 * 
 * @param {number} fontSize
 */
export const setFontSize = Platform.select<(fontSize: number) => Promise<void>>({
  android: (fontSize) => sunmiPrinterLibrary.setFontSize(fontSize),
  default: () => Promise.reject(OS_DOSE_NOT_SUPPORT),
})

/**
 * Set default font size
 */
export const setDefaultFontSize = () => sunmiPrinterLibrary.setFontSize(defaultFontSize)

// !!! This is temporarily comment-out. !!!
//
// /**
//  * Set bold
//  * 
//  * @note
//  * It is better to use setPrinterStyle.
//  * 
//  * @param {boolean} isBold
//  */
// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// const setBold = Platform.select<(isBold: boolean) => Promise<void>>({
//   android: (isBold) => sunmiPrinterLibrary.setBold(isBold),
//   default: () => Promise.reject(OS_DOSE_NOT_SUPPORT),
// })

/**
 * Print text
 * 
 * @param {string} text
 */
export const printText = Platform.select<(text: string) => Promise<void>>({
  android: (text) => sunmiPrinterLibrary.printText(text),
  default: () => Promise.reject(OS_DOSE_NOT_SUPPORT),
})

/**
 * Print text in a specified typeface and size
 * 
 * @param {string} text
 * @param {Typeface} typeface "default" only (unavailable for now)
 * @param {number} fontSize
 */
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
 *    - Code128 can be divided into subset A, B and C:
 *    - 128A: numbers, upper-case letters, and control characters, etc. 
 *    - 128B: numbers, upper- and lower-case letters and special character. 
 *    - 128C: numbers only. It must have an even number of digits (if it has an odd number of digits, the last digit will be omitted). 
 *    - By default, the interface uses subset B. “{A” or “{C” should be added before the content if you need to use subset A or C, for example: “{A2344A”, ”{C123123”, ”{A1A{B13B{C12”.
 * 
 * @example
 * SunmiPrinterLibrary.printBarcode('1234567890', 'CODE128', 162, 2, 'textUnderBarcode')
 * 
 */
export const printBarcode = Platform.select<(text: string, symbology: Barcode1DSymbology, height: number, width: number, textPosition: TextPosition) => Promise<void>>({
  android: (text, symbology, height, width, textPosition) => sunmiPrinterLibrary.printBarcode(text, symbology, height, width, textPosition),
  default: () => Promise.reject(OS_DOSE_NOT_SUPPORT),
})

/**
 * Print QR code
 * 
 * @param {string} text - QR code to be printed.
 * @param {number} moduleSize - It is a size of a QR code block and should be within 4-16.
 * @param {QRErrorLevel} errorLevel - QR code error correction level
 * 
 * @description
 * - After calling this method, the content will be printed under normal print status, and every QR code block is 4 Pixel (when smaller than 4 Pixel, the code parsing might fail). 
 * - version19 (93*93) is a maximum mode supported.
 * 
 * @example
 * SunmiPrinterLibrary.printQRCode('Hello World', 8, 'middle')
 */
export const printQRCode = Platform.select<(text: string, moduleSize: number, errorLevel: QRErrorLevel) => Promise<void>>({
  android: (text, moduleSize, errorLevel) => {
    if (moduleSize < 4 || 16 < moduleSize) {
      return Promise.reject('printQrCode is failed. moduleSize should be within 4-16.')
    }
    return sunmiPrinterLibrary.printQRCode(text, moduleSize, errorLevel)
  },
  default: () => Promise.reject(OS_DOSE_NOT_SUPPORT),
})

const _print2DCode = Platform.select<((text: string, symbology: Barcode2DSymbology, moduleSize: number, errorLevel: QRErrorLevel | number) => Promise<void>)>({
  android: (text, symbology, moduleSize, errorLevel) => {
    switch (symbology) {
    case 'QR': {
      if ( typeof errorLevel != 'number'){
        // If symbology is QR, print2DCode is equivalent to printQRCode.
        return printQRCode(text, moduleSize, errorLevel)
      }else {
        return Promise.reject('print2DCode is failed. parameters are incorrect.')
      }
    }
    default:{
      let _symbology: number | null = null
      if (symbology === 'PDF417'){
        _symbology = 1
      } else if (symbology === 'DataMatrix'){
        _symbology = 2
      }
      if (_symbology == null){
        return Promise.reject('print2DCode is failed. symbology is incorrect.')
      }
      if (typeof errorLevel != 'number'){
        return Promise.reject('print2DCode is failed. errorLevel is incorrect.')
      }
      if (symbology === 'PDF417' ) {
        if (moduleSize < 1 || 4 < moduleSize){
          return Promise.reject('print2DCode is failed. If PDF417, moduleSize should be within 1-4.')
        }
        if (errorLevel < 0 || 3 < errorLevel){
          return Promise.reject('print2DCode is failed. If PDF417, errorLevel should be within 0-3.')
        }
      }
      else if (symbology === 'DataMatrix') { 
        if  (moduleSize < 4 || 16 < moduleSize){
          return Promise.reject('print2DCode is failed. If DataMatrix, moduleSize should be within 4-16.')
        }
        if (errorLevel < 0 || 8 < errorLevel){
          return Promise.reject('print2DCode is failed. If DataMatrix, errorLevel should be within 0-8.')
        }
      }
      return sunmiPrinterLibrary.print2DCode(text, _symbology, moduleSize, errorLevel)
    }}
  },
  default: () => Promise.reject(OS_DOSE_NOT_SUPPORT),
})

/**
 * Print 2D code (QR)
 * 
 * @param {string} text - 2D barcode to be printed.
 * @param {BarCode2DSymbology} symbology - set 'QR'
 * @param {number} moduleSize - It is a size of a QR code block and should be within 4-16.
 * @param {QRErrorLevel} errorLevel - QR code error correction level
 * 
* @example
 * SunmiPrinterLibrary.print2DCode('aaaa', 'QR', 4, 'middle')
 */
export function print2DCode(text: string, symbology: 'QR', moduleSize: number, errorLevel: QRErrorLevel): Promise<void>
/**
 * Print 2D code (PDF417)
 * 
 * @param {string} text - 2D barcode to be printed.
 * @param {BarCode2DSymbology} symbology - set 'PDF417'
 * @param {number} moduleSize - It is a size of a QR code block and should be within 1-4.
 * @param {QRErrorLevel} errorLevel - It is error correction level and should be within 0 - 3
 * 
* @example
 * SunmiPrinterLibrary.print2DCode('aaaa', 'PDF417', 4, 4)
 */
export function print2DCode(text: string, symbology: 'PDF417', moduleSize: number, errorLevel: number): Promise<void>;
/**
 * Print 2D code (DataMatrix)
 * 
 * @param {string} text - 2D barcode to be printed.
 * @param {BarCode2DSymbology} symbology - set 'DataMatrix'
 * @param {number} moduleSize - It is a size of a QR code block and should be within 4-16.
 * @param {QRErrorLevel} errorLevel - It is error correction level and should be within 0 - 8
 * 
* @example
 * SunmiPrinterLibrary.print2DCode('aaaa', 'PDF417', 4, 4)
 */
export function print2DCode(text: string, symbology: 'DataMatrix', moduleSize: number, errorLevel: number): Promise<void>;
export function print2DCode(text: string, symbology: Barcode2DSymbology, moduleSize: number, errorLevel: QRErrorLevel | number): Promise<void>{
  return _print2DCode(text, symbology, moduleSize, errorLevel)
}

/**
 * Implement n LFs on the paper
 */
export const lineWrap = Platform.select<(count: number) => Promise<void>>({
  android: (count) => sunmiPrinterLibrary.lineWrap(count),
  default: () => Promise.reject(OS_DOSE_NOT_SUPPORT),
})

/**
 * Cut paper
 * 
 * @note
 * It is only available to the desktop devices with a cutter.
 */
export const cutPaper = Platform.select<() => Promise<void>>({
  android: () => sunmiPrinterLibrary.cutPaper(),
  default: () => Promise.reject(OS_DOSE_NOT_SUPPORT),
})

/**
 * Get the number of times a cutter has been used
 * 
 * @note
 * It is only available to the desktop devices with a cutter.
 */
export const getCutPaperTimes = Platform.select<() => Promise<number>>({
  android: () => sunmiPrinterLibrary.getCutPaperTimes(),
  default: () => Promise.reject(OS_DOSE_NOT_SUPPORT),
})

/**
 * print image
 * 
 * @description
 * print image that is encoded Base64
 * 
 * @param {string} base64 'data:image/png;base64,iVBORw0KGgoAAAA...'
 * @param {number} pixelWidth if paper width is 58mm then max 384 or it is 80mm then max 576.
 * @param {'binary' | 'grayscale'} type 'binary' or 'grayscale'
 * 
 * @example
 * SunmiPrinterLibrary.printImage(sampleImageBase64, 384, 'grayscale')
 */
export const printImage = Platform.select<(base64: string, pixelWidth: number, type: 'binary' | 'grayscale') => Promise<void>>({
  android: (base64, pixelWidth, type) => {
    const _type: number = type === 'binary' ? 0 : 2
    return sunmiPrinterLibrary.printBitmapBase64Custom(base64, pixelWidth, _type)
  },
  default: () => Promise.reject(OS_DOSE_NOT_SUPPORT),
})

export type BarType = 'line' | 'double' | 'dots' | 'wave' | 'plus' | 'star'
const BarTypeCharacter: {[type in BarType]: string} = {
  'line': '-',
  'double': '=',
  'dots': '･',
  'wave': '~',
  'plus': '+',
  'star': '*',
}

/**
 * print HorizontalRule by text
 * 
 * @note
 * It NEEDs await.
 * 
 * @note
 * This function is an original method.
 * It may not be displayed correctly depending on your environment.
 * It is calculated from the character width.
 * 
 * @param {BarType} barType - 'line' | 'double' | 'dots' | 'wave' | 'plus' | 'star' 
 * 
 * @example
 * await SunmiPrinterLibrary.printHR('plus') 
 * 
 */
export const printHR = Platform.select<(barType: BarType) => Promise<void>>({
  android: async (barType) => {
    const lengthPerCharacter = 0.5
    const pixelWidth = await getPrinterMaxPixelWidth()
    const count = pixelWidth / (lengthPerCharacter * defaultFontSize)
    const text = BarTypeCharacter[barType].repeat(count)
    return sunmiPrinterLibrary.printTextWithFont(text, 'default', defaultFontSize)
  },
  default: () => Promise.reject(OS_DOSE_NOT_SUPPORT),
})

/**
 * scan barcode / QR code
 * 
 * @example
 * 
 * ```
 * const result = await SunmiPrinterLibrary.scan()
 * ```
 * 
 * OR
 * 
 * ```
 * const scan = () => {
 *    SunmiPrinterLibrary.scan()
 * }
 * 
 * useEffect(() => {
 *    DeviceEventEmitter.addListener(SunmiPrinterLibrary.EventType.onScanSuccess, (message) => {
 *       console.log(message)
 *    })
 *    DeviceEventEmitter.addListener(SunmiPrinterLibrary.EventType.onScanFailed, (message) => {
 *       console.log(message)
 *    })
 *    return () => {
 *       DeviceEventEmitter.removeAllListeners(SunmiPrinterLibrary.EventType.onScanSuccess)
 *       DeviceEventEmitter.removeAllListeners(SunmiPrinterLibrary.EventType.onScanFailed)
 *    }
 * }, [])
 *```
 *
 */
export const scan = Platform.select<() => Promise<string>>({
  android: () => sunmiScannerLibrary.scan(),
  default: () => Promise.reject(OS_DOSE_NOT_SUPPORT),
})

/**
 * get Printer info.
 * 
 * @note
 * It gets printer information, such as serial number, in bulk.
 * 
 * @example
 *  const {
 *      serialNumber, printerVersion, serviceVersion, printerModal, paperWidth, pixelWidth
 *    } = await SunmiPrinterLibrary.getPrinterInfo()
 */
export const getPrinterInfo = Platform.select<() => Promise<PrinterInfo>>({
  android: async () => {
    const nativeResult: NativePrinterInfo = await sunmiPrinterLibrary.getPrinterInfo()
    const paperWidth: PaperWidth = nativeResult.paperWidth as PaperWidth
    const result: PrinterInfo = {
      ...nativeResult,
      paperWidth: paperWidth,
      pixelWidth : MaxPixelWidth[paperWidth],
    }
    return Promise.resolve(result)
  },
  default: () => Promise.reject(OS_DOSE_NOT_SUPPORT),
})

