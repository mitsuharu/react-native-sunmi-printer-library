# @mitsuharu/react-native-sunmi-printer-library

React Native module that support for SUNMI mobile printer devices.

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
await SunmiPrinterLibrary.prepare()
```


### print Text

```typescript
await SunmiPrinterLibrary.printText('Hello World')
```

OR

```typescript
SunmiPrinterLibrary.printText('Hello World')
```

### modify test

```typescript
await SunmiPrinterLibrary.setAlignment('center')
await SunmiPrinterLibrary.setPrinterStyle('bold', true)
await SunmiPrinterLibrary.setFontSize(32)
await SunmiPrinterLibrary.printText('Hello World')
```

### print Image (Base64)

```typescript
const base64 = 'data:image/png;base64,iVBORw0KGgoAAAA...'
await SunmiPrinterLibrary.printImage(sampleImageBase64, 384, 'binary')
await SunmiPrinterLibrary.printImage(base64, 384, 'grayscale')
```

### print QR code

```typescript
await SunmiPrinterLibrary.printQRCode('Hello World', 8, 'middle')
```

### scan QR code

```typescript
const reulst = await SunmiPrinterLibrary.scan()
```

OR

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
