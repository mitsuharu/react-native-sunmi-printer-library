# @mitsuharu/react-native-sunmi-printer-library

React Native module that supports for SUNMI mobile printer devices.

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

See the React Native example in `example/` or the Expo example in
`example-expo/` for details.

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
> Printing without `await` is faster, but may be interrupted by other printing. When it use without `await`, it is better to use with Transaction.

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

### Transaction

```typescript
await SunmiPrinterLibrary.enterPrinterBuffer(true)

SunmiPrinterLibrary.printText('Transaction Test 0')

await SunmiPrinterLibrary.commitPrinterBuffer()

SunmiPrinterLibrary.printText('Transaction Test 1')
SunmiPrinterLibrary.printText('Transaction Test 2')
SunmiPrinterLibrary.printText('Transaction Test 3')
SunmiPrinterLibrary.lineWrap(4)

await SunmiPrinterLibrary.exitPrinterBuffer(true)
```

### Raw Data (ESC/POS command)

```typescript
// use to convert data to Base 64
import { Buffer } from 'buffer'

// ESC/POS command
// see: https://developer.sunmi.com/docs/en-US/index
const boldOn = new Uint8Array([0x1B, 0x45, 0x01])
const boldOnBase64 = Buffer.from(boldOn).toString('base64')
await SunmiPrinterLibrary.sendRAWData(boldOnBase64)

await SunmiPrinterLibrary.printText('Bold is ON')

const boldOff = new Uint8Array([0x1B, 0x45, 0x00])
const boldOffBase64= Buffer.from(boldOff).toString('base64')
await SunmiPrinterLibrary.sendRAWData(boldOffBase64)

await SunmiPrinterLibrary.printText('Bold is OFF')
```

### not support

- Cash Drawer API
- Black Mark Print API

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

### Develop

```shell
yarn
yarn example android
```

### Examples

- `example/` is the bare React Native example and uses React Native 0.87.
- `example-expo/` is the Expo example and uses Expo SDK 57 with React Native
  0.86.
- Both examples reuse the same printer operation screen.

The Expo example uses local Continuous Native Generation. It does not use EAS
Build or any other cloud build service. Generate a fresh Android project with
Expo Prebuild and build the APK with the generated Gradle Wrapper:

```shell
yarn example:expo build:android
```

The generated `example-expo/android/` directory is intentionally ignored. Do
not edit it directly; update the Expo app configuration or a config plugin and
run Prebuild again.

#### Android 7.xでのdevelopment buildの注意点

Expo SDK 57の `expo-dev-client` はdevelopment launcherの起動時に
`java.time.Duration` を使用します。このAPIをそのまま含むAPKはAndroid 8.0
未満で利用できないため、SUNMI V2 PROなどのAndroid 7.1端末では次の例外で
起動直後に停止します。

```text
java.lang.NoClassDefFoundError: Failed resolution of: Ljava/time/Duration;
```

このexampleでは
`example-expo/plugins/withAndroidCoreLibraryDesugaring.js` を `app.json` の
config pluginとして登録し、Prebuild時にcore library desugaringと
`desugar_jdk_libs` を設定しています。これによりAndroid 7.xでも
development buildを起動できます。この設定を生成後の
`example-expo/android/app/build.gradle` へ直接追加すると、次回の
`expo prebuild --clean` で消えるため、必ずconfig plugin側を保守してください。
詳細は[Expoのconfig plugin](https://docs.expo.dev/config-plugins/introduction/)
および[AndroidのJava API desugaring](https://developer.android.com/studio/write/java8-support?hl=ja)
のドキュメントを参照してください。

To start the Expo development server for an installed development build:

```shell
yarn example:expo start
```

### Guides

- It creates Pull Requests to be merged into the develop branch.
- I recommend that add or fix test, readme and example.

### リリース

（管理者のみ）develop ブランチのバージョン更新して、main ブランチへPRを作ってください。マージを行うと、自動で npm にリリースされます。

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
