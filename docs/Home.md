# @mitsuharu/react-native-sunmi-printer-library

React Native module that support to print for SUNMI mobile thermal printer devices.

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

```typescript
import * as SunmiPrinterLibrary from '@mitsuharu/react-native-sunmi-printer-library'

await SunmiPrinterLibrary.prepare()
await SunmiPrinterLibrary.printText('Print Text')
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
