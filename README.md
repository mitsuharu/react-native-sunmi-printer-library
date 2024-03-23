# @mitsuharu/react-native-sunmi-printer-library

React Native module that support for SUNMI mobile printer devices.

## Verification devices

I validate it with GMS enable and developable SUNMI V2 PRO and SUNMI V2s as follows. Though I do not have other devices, users report to work with V1s and V2.

| | Android | SUNMI OS | firmware | storage | memory | NFC |
| :-- | :-- | :-- | :-- | :-- | :-- | :-- |
| SUNMI V2 PRO | 7.1 | 3.6.23 | 754 | 16 GB | 2 GB | enable |
| SUNMI V2 PRO (foodpanda) | 7.1 | 1.0.33 | 138 | 8 GB | 1 GB | disable |
| SUNMI V2s | 11 | 3.0.11 | 242 | 32 GB | 3 GB | enable |

[^GMS]: Google Mobile Services [https://www.android.com/gms](https://www.android.com/gms)


## Installation

```shell
npm install @mitsuharu/react-native-sunmi-printer-library
```

or 

```shell
yarn add @mitsuharu/react-native-sunmi-printer-library
```

## Usage

You see `example` directory for details.

### prepare

```typescript
import * as SunmiPrinterLibrary from '@mitsuharu/react-native-sunmi-printer-library'
```

```typescript
try {
    await SunmiPrinterLibrary.prepare()
} catch (error: any) {
    console.warn("This device is not supported.")
}
```

### print Text

```typescript
await SunmiPrinterLibrary.printText('Hello World')
```

or

```typescript
SunmiPrinterLibrary.printText('Hello World')
```

> [!WARNING]
> Printing without `await` is faster, but may be interrupted by other printing.

### change style

```typescript
await SunmiPrinterLibrary.setAlignment('center')
await SunmiPrinterLibrary.setTextStyle('bold', true)
await SunmiPrinterLibrary.setParagraphStyle('textRightSpacing', 5)
await SunmiPrinterLibrary.setFontSize(32)
await SunmiPrinterLibrary.printText('Hello World')
```

### print Image (Base64)

```typescript
const base64 = 'data:image/png;base64,iVBORw0KGgoAAAA...'
await SunmiPrinterLibrary.printImage(base64, 384, 'binary')
await SunmiPrinterLibrary.printImage(base64, 384, 'grayscale')
```

### print QR code

```typescript
await SunmiPrinterLibrary.printQRCode('Hello World', 8, 'middle')
```

### scan QR code

```typescript
const result = await SunmiPrinterLibrary.scan()
```

or

```typescript
SunmiPrinterLibrary.scan()
```

```typescript
useEffect(() => {
   DeviceEventEmitter.addListener(
      SunmiPrinterLibrary.EventType.onScanSuccess,
      (message) => {
        console.log(`[onScanSuccess] ${message}`)
      })
   DeviceEventEmitter.addListener(
      SunmiPrinterLibrary.EventType.onScanFailed, 
      (message) => {
        console.log(`[onScanFailed] ${message}`)
      })
   return () => {
      DeviceEventEmitter.removeAllListeners(SunmiPrinterLibrary.EventType.onScanSuccess)
      DeviceEventEmitter.removeAllListeners(SunmiPrinterLibrary.EventType.onScanFailed)
    }
}, [])
```

### not support

- Transaction Print API
- Cash Drawer API
- Black Mark Print API

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

### Develop

```shell
yarn
yarn example android
```

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
