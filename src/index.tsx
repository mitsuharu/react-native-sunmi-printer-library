import { NativeModules, Platform } from 'react-native'

interface SunmiPrinterLibrary {
  connect: () => Promise<boolean>
  printerInit: () => Promise<boolean>
}

const sunmiPrinterLibrary: SunmiPrinterLibrary = NativeModules.SunmiPrinterLibrary
 
// export function multiply(a: number, b: number): Promise<number> {
//     return SunmiPrinterLibrary.multiply(a, b)
// }

export const connect = Platform.select<() => Promise<boolean>>({
    android: () => sunmiPrinterLibrary.connect(),
    default: () => Promise.resolve(false),
})

export const printerInit = Platform.select<() => Promise<boolean>>({
    android: () => sunmiPrinterLibrary.printerInit(),
    default: () => Promise.resolve(false),
})
