import { NativeModules, Platform } from 'react-native'

interface SunmiPrinterLibrary {
  printerInit: () => Promise<void>
}

const sunmiPrinterLibrary: SunmiPrinterLibrary = NativeModules.SunmiPrinterLibrary
 
// export function multiply(a: number, b: number): Promise<number> {
//     return SunmiPrinterLibrary.multiply(a, b)
// }

export const printerInit = Platform.select<() => Promise<void>>({
    android: () => sunmiPrinterLibrary.printerInit(),
    default: () => Promise.resolve(),
})
