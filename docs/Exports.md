# @mitsuharu/react-native-sunmi-printer-library

## Table of contents

### Type Aliases

- [Alignment](../wiki/Exports#alignment)
- [BarType](../wiki/Exports#bartype)
- [Barcode1DSymbology](../wiki/Exports#barcode1dsymbology)
- [Barcode2DSymbology](../wiki/Exports#barcode2dsymbology)
- [BitmapType](../wiki/Exports#bitmaptype)
- [FontName](../wiki/Exports#fontname)
- [PaperWidth](../wiki/Exports#paperwidth)
- [QRErrorLevel](../wiki/Exports#qrerrorlevel)
- [TextPosition](../wiki/Exports#textposition)
- [Typeface](../wiki/Exports#typeface)
- [WoyouConstsBoolean](../wiki/Exports#woyouconstsboolean)
- [WoyouConstsNumber](../wiki/Exports#woyouconstsnumber)

### Variables

- [MaxPixelWidth](../wiki/Exports#maxpixelwidth)
- [defaultFontSize](../wiki/Exports#defaultfontsize)

### Functions

- [cutPaper](../wiki/Exports#cutpaper)
- [getCutPaperTimes](../wiki/Exports#getcutpapertimes)
- [getPrintedLength](../wiki/Exports#getprintedlength)
- [getPrinterMaxPixelWidth](../wiki/Exports#getprintermaxpixelwidth)
- [getPrinterModal](../wiki/Exports#getprintermodal)
- [getPrinterPaper](../wiki/Exports#getprinterpaper)
- [getPrinterSerialNo](../wiki/Exports#getprinterserialno)
- [getPrinterVersion](../wiki/Exports#getprinterversion)
- [getServiceVersion](../wiki/Exports#getserviceversion)
- [lineWrap](../wiki/Exports#linewrap)
- [prepare](../wiki/Exports#prepare)
- [print2DCode](../wiki/Exports#print2dcode)
- [printBarcode](../wiki/Exports#printbarcode)
- [printBitmapBase64](../wiki/Exports#printbitmapbase64)
- [printBitmapBase64Custom](../wiki/Exports#printbitmapbase64custom)
- [printColumnsString](../wiki/Exports#printcolumnsstring)
- [printColumnsText](../wiki/Exports#printcolumnstext)
- [printHR](../wiki/Exports#printhr)
- [printOriginalText](../wiki/Exports#printoriginaltext)
- [printQRCode](../wiki/Exports#printqrcode)
- [printSelfChecking](../wiki/Exports#printselfchecking)
- [printText](../wiki/Exports#printtext)
- [printTextWithFont](../wiki/Exports#printtextwithfont)
- [setAlignment](../wiki/Exports#setalignment)
- [setDefaultFontSize](../wiki/Exports#setdefaultfontsize)
- [setFontSize](../wiki/Exports#setfontsize)
- [setPrinterStyle](../wiki/Exports#setprinterstyle)
- [updatePrinterState](../wiki/Exports#updateprinterstate)

## Type Aliases

### Alignment

Ƭ **Alignment**: ``"left"`` \| ``"center"`` \| ``"right"``

#### Defined in

[index.tsx:49](https://github.com/mitsuharu/react-native-sunmi-printer-library/blob/86fcd1a/src/index.tsx#L49)

___

### BarType

Ƭ **BarType**: ``"line"`` \| ``"double"`` \| ``"dots"`` \| ``"wave"`` \| ``"plus"`` \| ``"star"``

#### Defined in

[index.tsx:618](https://github.com/mitsuharu/react-native-sunmi-printer-library/blob/86fcd1a/src/index.tsx#L618)

___

### Barcode1DSymbology

Ƭ **Barcode1DSymbology**: ``"UPC-A"`` \| ``"UPC-E"`` \| ``"JAN13(EAN13)"`` \| ``"JAN8(EAN8)"`` \| ``"CODE39"`` \| ``"ITF"`` \| ``"CODABAR"`` \| ``"CODE93"`` \| ``"CODE128"``

#### Defined in

[index.tsx:52](https://github.com/mitsuharu/react-native-sunmi-printer-library/blob/86fcd1a/src/index.tsx#L52)

___

### Barcode2DSymbology

Ƭ **Barcode2DSymbology**: ``"QR"`` \| ``"PDF417"`` \| ``"DataMatrix"``

#### Defined in

[index.tsx:55](https://github.com/mitsuharu/react-native-sunmi-printer-library/blob/86fcd1a/src/index.tsx#L55)

___

### BitmapType

Ƭ **BitmapType**: ``"monochrome"`` \| ``"monochrome200"`` \| ``"grayscale"``

#### Defined in

[index.tsx:56](https://github.com/mitsuharu/react-native-sunmi-printer-library/blob/86fcd1a/src/index.tsx#L56)

___

### FontName

Ƭ **FontName**: ``"chineseMonospaced"``

#### Defined in

[index.tsx:50](https://github.com/mitsuharu/react-native-sunmi-printer-library/blob/86fcd1a/src/index.tsx#L50)

___

### PaperWidth

Ƭ **PaperWidth**: ``"58mm"`` \| ``"80mm"``

#### Defined in

[index.tsx:57](https://github.com/mitsuharu/react-native-sunmi-printer-library/blob/86fcd1a/src/index.tsx#L57)

___

### QRErrorLevel

Ƭ **QRErrorLevel**: ``"low"`` \| ``"middle"`` \| ``"quartile"`` \| ``"high"``

#### Defined in

[index.tsx:54](https://github.com/mitsuharu/react-native-sunmi-printer-library/blob/86fcd1a/src/index.tsx#L54)

___

### TextPosition

Ƭ **TextPosition**: ``"none"`` \| ``"textAboveBarcode"`` \| ``"textUnderBarcode"`` \| ``"textAboveAndUnderBarcode"``

#### Defined in

[index.tsx:53](https://github.com/mitsuharu/react-native-sunmi-printer-library/blob/86fcd1a/src/index.tsx#L53)

___

### Typeface

Ƭ **Typeface**: ``"default"``

#### Defined in

[index.tsx:51](https://github.com/mitsuharu/react-native-sunmi-printer-library/blob/86fcd1a/src/index.tsx#L51)

___

### WoyouConstsBoolean

Ƭ **WoyouConstsBoolean**: ``"doubleWidth"`` \| ``"doubleHeight"`` \| ``"bold"`` \| ``"underline"`` \| ``"antiWhite"`` \| ``"strikethrough"`` \| ``"italic"`` \| ``"invert"``

#### Defined in

[index.tsx:47](https://github.com/mitsuharu/react-native-sunmi-printer-library/blob/86fcd1a/src/index.tsx#L47)

___

### WoyouConstsNumber

Ƭ **WoyouConstsNumber**: ``"textRightSpacing"`` \| ``"relativePosition"`` \| ``"absolutePosition"`` \| ``"lineSpacing"`` \| ``"leftSpacing"`` \| ``"strikethroughStyle"``

#### Defined in

[index.tsx:48](https://github.com/mitsuharu/react-native-sunmi-printer-library/blob/86fcd1a/src/index.tsx#L48)

## Variables

### MaxPixelWidth

• `Const` **MaxPixelWidth**: \{ [width in PaperWidth]: number }

#### Defined in

[index.tsx:58](https://github.com/mitsuharu/react-native-sunmi-printer-library/blob/86fcd1a/src/index.tsx#L58)

___

### defaultFontSize

• `Const` **defaultFontSize**: ``24``

#### Defined in

[index.tsx:62](https://github.com/mitsuharu/react-native-sunmi-printer-library/blob/86fcd1a/src/index.tsx#L62)

## Functions

### cutPaper

▸ **cutPaper**(): `Promise`\<`void`\>

Cut paper

#### Returns

`Promise`\<`void`\>

**`Note`**

It is only available to the desktop devices with a cutter.

#### Defined in

[index.tsx:553](https://github.com/mitsuharu/react-native-sunmi-printer-library/blob/86fcd1a/src/index.tsx#L553)

___

### getCutPaperTimes

▸ **getCutPaperTimes**(): `Promise`\<`number`\>

Get the number of times a cutter has been used

#### Returns

`Promise`\<`number`\>

**`Note`**

It is only available to the desktop devices with a cutter.

#### Defined in

[index.tsx:564](https://github.com/mitsuharu/react-native-sunmi-printer-library/blob/86fcd1a/src/index.tsx#L564)

___

### getPrintedLength

▸ **getPrintedLength**(): `Promise`\<`string`\>

Get the print length of a printhead

#### Returns

`Promise`\<`string`\>

#### Defined in

[index.tsx:191](https://github.com/mitsuharu/react-native-sunmi-printer-library/blob/86fcd1a/src/index.tsx#L191)

___

### getPrinterMaxPixelWidth

▸ **getPrinterMaxPixelWidth**(): `Promise`\<`number`\>

Get max pixel width

#### Returns

`Promise`\<`number`\>

if width is 58mm" then 384 or it is "80mm" then 576

#### Defined in

[index.tsx:180](https://github.com/mitsuharu/react-native-sunmi-printer-library/blob/86fcd1a/src/index.tsx#L180)

___

### getPrinterModal

▸ **getPrinterModal**(): `Promise`\<`string`\>

Get printer type interface

#### Returns

`Promise`\<`string`\>

#### Defined in

[index.tsx:157](https://github.com/mitsuharu/react-native-sunmi-printer-library/blob/86fcd1a/src/index.tsx#L157)

___

### getPrinterPaper

▸ **getPrinterPaper**(): `Promise`\<[`PaperWidth`](../wiki/Exports#paperwidth)\>

Get the current paper spec of a printer

#### Returns

`Promise`\<[`PaperWidth`](../wiki/Exports#paperwidth)\>

"58mm" | "80mm"

#### Defined in

[index.tsx:167](https://github.com/mitsuharu/react-native-sunmi-printer-library/blob/86fcd1a/src/index.tsx#L167)

___

### getPrinterSerialNo

▸ **getPrinterSerialNo**(): `Promise`\<`string`\>

Get the SN of a printer board

#### Returns

`Promise`\<`string`\>

#### Defined in

[index.tsx:133](https://github.com/mitsuharu/react-native-sunmi-printer-library/blob/86fcd1a/src/index.tsx#L133)

___

### getPrinterVersion

▸ **getPrinterVersion**(): `Promise`\<`string`\>

Get printer firmware version

#### Returns

`Promise`\<`string`\>

#### Defined in

[index.tsx:141](https://github.com/mitsuharu/react-native-sunmi-printer-library/blob/86fcd1a/src/index.tsx#L141)

___

### getServiceVersion

▸ **getServiceVersion**(): `Promise`\<`string`\>

Get the version number of a print service

#### Returns

`Promise`\<`string`\>

#### Defined in

[index.tsx:149](https://github.com/mitsuharu/react-native-sunmi-printer-library/blob/86fcd1a/src/index.tsx#L149)

___

### lineWrap

▸ **lineWrap**(`count`): `Promise`\<`void`\>

Implement n LFs on the paper

#### Parameters

| Name | Type |
| :------ | :------ |
| `count` | `number` |

#### Returns

`Promise`\<`void`\>

#### Defined in

[index.tsx:542](https://github.com/mitsuharu/react-native-sunmi-printer-library/blob/86fcd1a/src/index.tsx#L542)

___

### prepare

▸ **prepare**(): `Promise`\<`boolean`\>

prepare

#### Returns

`Promise`\<`boolean`\>

**`Note`**

It must call to connect and initialize printer. If re-call it, reset text stylings.

**`Example`**

```ts
await SunmiPrinterLibrary.prepare()
```

#### Defined in

[index.tsx:98](https://github.com/mitsuharu/react-native-sunmi-printer-library/blob/86fcd1a/src/index.tsx#L98)

___

### print2DCode

▸ **print2DCode**(`text`, `symbology`, `moduleSize`, `errorLevel`): `Promise`\<`void`\>

Print 2D code (QR)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `text` | `string` | 2D barcode to be printed. |
| `symbology` | ``"QR"`` | set 'QR' |
| `moduleSize` | `number` | It is a size of a QR code block and should be within 4-16. |
| `errorLevel` | [`QRErrorLevel`](../wiki/Exports#qrerrorlevel) | QR code error correction level |

#### Returns

`Promise`\<`void`\>

**`Example`**

```ts
SunmiPrinterLibrary.print2DCode('aaaa', 'QR', 4, 'middle')
```

#### Defined in

[index.tsx:510](https://github.com/mitsuharu/react-native-sunmi-printer-library/blob/86fcd1a/src/index.tsx#L510)

▸ **print2DCode**(`text`, `symbology`, `moduleSize`, `errorLevel`): `Promise`\<`void`\>

Print 2D code (PDF417)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `text` | `string` | 2D barcode to be printed. |
| `symbology` | ``"PDF417"`` | set 'PDF417' |
| `moduleSize` | `number` | It is a size of a QR code block and should be within 1-4. |
| `errorLevel` | `number` | It is error correction level and should be within 0 - 3 |

#### Returns

`Promise`\<`void`\>

**`Example`**

```ts
SunmiPrinterLibrary.print2DCode('aaaa', 'PDF417', 4, 4)
```

#### Defined in

[index.tsx:522](https://github.com/mitsuharu/react-native-sunmi-printer-library/blob/86fcd1a/src/index.tsx#L522)

▸ **print2DCode**(`text`, `symbology`, `moduleSize`, `errorLevel`): `Promise`\<`void`\>

Print 2D code (DataMatrix)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `text` | `string` | 2D barcode to be printed. |
| `symbology` | ``"DataMatrix"`` | set 'DataMatrix' |
| `moduleSize` | `number` | It is a size of a QR code block and should be within 4-16. |
| `errorLevel` | `number` | It is error correction level and should be within 0 - 8 |

#### Returns

`Promise`\<`void`\>

**`Example`**

```ts
SunmiPrinterLibrary.print2DCode('aaaa', 'PDF417', 4, 4)
```

#### Defined in

[index.tsx:534](https://github.com/mitsuharu/react-native-sunmi-printer-library/blob/86fcd1a/src/index.tsx#L534)

___

### printBarcode

▸ **printBarcode**(`text`, `symbology`, `height`, `width`, `textPosition`): `Promise`\<`void`\>

Print 1D BarCode

#### Parameters

| Name | Type |
| :------ | :------ |
| `text` | `string` |
| `symbology` | [`Barcode1DSymbology`](../wiki/Exports#barcode1dsymbology) |
| `height` | `number` |
| `width` | `number` |
| `textPosition` | [`TextPosition`](../wiki/Exports#textposition) |

#### Returns

`Promise`\<`void`\>

**`Note`**

Text pattern (e.g. length, character) is determined by symbology.

**`Description`**

- code39
   - Numbers within 13 digits can be printed
- code93 
   - Numbers within 17 digits can be printed
- JAN8(EAN8)
   - 8-digit numbers (the last digit is for parity check). The effective length is 8 digits (numbers).
- JAN13(EAN13)
   - The effective length is 13 digits, and the last digit is for parity check.
- ITF 
   - Number (even number of digits) within 14 digits is required.
- Codabar
   - Numbers within 0-9 plus 6 special characters. Maximum18 digitscan be printed. UPC-E 8-digit number (the last digit is for parity check)
- UPC-A
   - 12-digit number (the last digit is for parity check)
- code128
   - Code128 can be divided into subset A, B and C:
   - 128A: numbers, upper-case letters, and control characters, etc. 
   - 128B: numbers, upper- and lower-case letters and special character. 
   - 128C: numbers only. It must have an even number of digits (if it has an odd number of digits, the last digit will be omitted). 
   - By default, the interface uses subset B. “{A” or “{C” should be added before the content if you need to use subset A or C, for example: “{A2344A”, ”{C123123”, ”{A1A{B13B{C12”.

**`Example`**

```ts
SunmiPrinterLibrary.printBarcode('1234567890', 'CODE128', 162, 2, 'textUnderBarcode')
```

#### Defined in

[index.tsx:424](https://github.com/mitsuharu/react-native-sunmi-printer-library/blob/86fcd1a/src/index.tsx#L424)

___

### printBitmapBase64

▸ **printBitmapBase64**(`base64`, `pixelWidth`): `Promise`\<`void`\>

printBitmapBase64

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `base64` | `string` | 'data:image/png;base64,iVBORw0KGgoAAAA...' |
| `pixelWidth` | `number` | if paper width is 58mm then max 384 or it is 80mm then max 576. |

#### Returns

`Promise`\<`void`\>

**`Description`**

print image that is encoded Base64

**`Example`**

```ts
SunmiPrinterLibrary.printBitmapBase64(sampleImageBase64, 194)
```

#### Defined in

[index.tsx:581](https://github.com/mitsuharu/react-native-sunmi-printer-library/blob/86fcd1a/src/index.tsx#L581)

___

### printBitmapBase64Custom

▸ **printBitmapBase64Custom**(`base64`, `pixelWidth`, `type`): `Promise`\<`void`\>

printBitmapBase64Custom

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `base64` | `string` | 'data:image/png;base64,iVBORw0KGgoAAAA...' |
| `pixelWidth` | `number` | if paper width is 58mm then max 384 or it is 80mm then max 576. |
| `type` | [`BitmapType`](../wiki/Exports#bitmaptype) | 'monochrome' \| 'monochrome200' \|'grayscale' |

#### Returns

`Promise`\<`void`\>

**`Description`**

print image that is encoded Base64

**`Example`**

```ts
SunmiPrinterLibrary.printBitmapBase64Custom(sampleImageBase64, 194, 'grayscale')
```

#### Defined in

[index.tsx:599](https://github.com/mitsuharu/react-native-sunmi-printer-library/blob/86fcd1a/src/index.tsx#L599)

___

### printColumnsString

▸ **printColumnsString**(`texts`, `widths`, `alignments`): `Promise`\<`void`\>

Print a row of a table

#### Parameters

| Name | Type |
| :------ | :------ |
| `texts` | `string`[] |
| `widths` | `number`[] |
| `alignments` | [`Alignment`](../wiki/Exports#alignment)[] |

#### Returns

`Promise`\<`void`\>

**`Note`**

This supports width and alignment for each column.

**`Example`**

```ts
SunmiPrinterLibrary.printColumnsString(
     ['apple', 'orange', 'banana'], 
     [8, 8, 8], 
     ['center', 'center', 'center'])
```

#### Defined in

[index.tsx:387](https://github.com/mitsuharu/react-native-sunmi-printer-library/blob/86fcd1a/src/index.tsx#L387)

___

### printColumnsText

▸ **printColumnsText**(`texts`, `widths`, `alignments`): `Promise`\<`void`\>

Print a row of a table

#### Parameters

| Name | Type |
| :------ | :------ |
| `texts` | `string`[] |
| `widths` | `number`[] |
| `alignments` | [`Alignment`](../wiki/Exports#alignment)[] |

#### Returns

`Promise`\<`void`\>

**`Note`**

- This may not supports width and alignment for each column. Its width means text length.
- This does not support Arabic Characters. If you print it, use printColumnsString.

**`Example`**

```ts
SunmiPrinterLibrary.printColumnsText(
     ['apple', 'orange', 'banana'], 
     [8, 8, 8], 
     ['center', 'center', 'center'])
```

#### Defined in

[index.tsx:370](https://github.com/mitsuharu/react-native-sunmi-printer-library/blob/86fcd1a/src/index.tsx#L370)

___

### printHR

▸ **printHR**(`barType`): `Promise`\<`void`\>

print HorizontalRule by text

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `barType` | [`BarType`](../wiki/Exports#bartype) | 'line' \| 'double' \| 'dots' \| 'wave' \| 'plus' \| 'star' |

#### Returns

`Promise`\<`void`\>

**`Note`**

This function is an original method.
It may not be displayed correctly depending on your environment.
It is calculated from the character width.

#### Defined in

[index.tsx:638](https://github.com/mitsuharu/react-native-sunmi-printer-library/blob/86fcd1a/src/index.tsx#L638)

___

### printOriginalText

▸ **printOriginalText**(`text`): `Promise`\<`void`\>

Print Vector Font

#### Parameters

| Name | Type |
| :------ | :------ |
| `text` | `string` |

#### Returns

`Promise`\<`void`\>

**`Note`**

output characters are in the same width of vector fonts, which means that they are not monospace.

**`Example`**

```ts
printOriginalText('κρχκμνκλρκνκνμρτυφ')
```

#### Defined in

[index.tsx:352](https://github.com/mitsuharu/react-native-sunmi-printer-library/blob/86fcd1a/src/index.tsx#L352)

___

### printQRCode

▸ **printQRCode**(`text`, `moduleSize`, `errorLevel`): `Promise`\<`void`\>

Print QR code

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `text` | `string` | QR code to be printed. |
| `moduleSize` | `number` | It is a size of a QR code block and should be within 4-16. |
| `errorLevel` | [`QRErrorLevel`](../wiki/Exports#qrerrorlevel) | QR code error correction level |

#### Returns

`Promise`\<`void`\>

**`Description`**

- After calling this method, the content will be printed under normal print status, and every QR code block is 4 Pixel (when smaller than 4 Pixel, the code parsing might fail). 
- version19 (93*93) is a maximum mode supported.

**`Example`**

```ts
SunmiPrinterLibrary.printQRCode('Hello World', 8, 'middle')
```

#### Defined in

[index.tsx:443](https://github.com/mitsuharu/react-native-sunmi-printer-library/blob/86fcd1a/src/index.tsx#L443)

___

### printSelfChecking

▸ **printSelfChecking**(): `Promise`\<`boolean`\>

Print self-inspection

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[index.tsx:125](https://github.com/mitsuharu/react-native-sunmi-printer-library/blob/86fcd1a/src/index.tsx#L125)

___

### printText

▸ **printText**(`text`): `Promise`\<`void`\>

Print text

#### Parameters

| Name | Type |
| :------ | :------ |
| `text` | `string` |

#### Returns

`Promise`\<`void`\>

#### Defined in

[index.tsx:326](https://github.com/mitsuharu/react-native-sunmi-printer-library/blob/86fcd1a/src/index.tsx#L326)

___

### printTextWithFont

▸ **printTextWithFont**(`text`, `typeface`, `fontSize`): `Promise`\<`void`\>

Print text in a specified typeface and size

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `text` | `string` |  |
| `typeface` | ``"default"`` | "default" only (unavailable for now) |
| `fontSize` | `number` |  |

#### Returns

`Promise`\<`void`\>

#### Defined in

[index.tsx:338](https://github.com/mitsuharu/react-native-sunmi-printer-library/blob/86fcd1a/src/index.tsx#L338)

___

### setAlignment

▸ **setAlignment**(`alignment`): `Promise`\<`void`\>

Set alignment

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `alignment` | [`Alignment`](../wiki/Exports#alignment) | "left" \| "center" \| "right" |

#### Returns

`Promise`\<`void`\>

#### Defined in

[index.tsx:270](https://github.com/mitsuharu/react-native-sunmi-printer-library/blob/86fcd1a/src/index.tsx#L270)

___

### setDefaultFontSize

▸ **setDefaultFontSize**(): `Promise`\<`void`\>

Set default font size

#### Returns

`Promise`\<`void`\>

#### Defined in

[index.tsx:303](https://github.com/mitsuharu/react-native-sunmi-printer-library/blob/86fcd1a/src/index.tsx#L303)

___

### setFontSize

▸ **setFontSize**(`fontSize`): `Promise`\<`void`\>

Set font size

#### Parameters

| Name | Type |
| :------ | :------ |
| `fontSize` | `number` |

#### Returns

`Promise`\<`void`\>

#### Defined in

[index.tsx:295](https://github.com/mitsuharu/react-native-sunmi-printer-library/blob/86fcd1a/src/index.tsx#L295)

___

### setPrinterStyle

▸ **setPrinterStyle**(`key`, `value`): `Promise`\<`boolean`\>

Set printer style

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | [`WoyouConstsBoolean`](../wiki/Exports#woyouconstsboolean) | "doubleWidth" \| "doubleHeight" \| "bold" \| "underline" \| "antiWhite" \| "strikethrough" \| "italic" \| "invert" |
| `value` | `boolean` | true \| false |

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[index.tsx:251](https://github.com/mitsuharu/react-native-sunmi-printer-library/blob/86fcd1a/src/index.tsx#L251)

▸ **setPrinterStyle**(`key`, `value`): `Promise`\<`boolean`\>

Set printer style

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | [`WoyouConstsNumber`](../wiki/Exports#woyouconstsnumber) | "textRightSpacing" \| "relativePosition" \| "absolutePosition" \| "lineSpacing" \| "leftSpacing" \| "strikethroughStyle" |
| `value` | `number` | integer |

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[index.tsx:257](https://github.com/mitsuharu/react-native-sunmi-printer-library/blob/86fcd1a/src/index.tsx#L257)

___

### updatePrinterState

▸ **updatePrinterState**(): `Promise`\<\{ `description`: `string` ; `value`: `number`  }\>

Get the latest status of a printer

#### Returns

`Promise`\<\{ `description`: `string` ; `value`: `number`  }\>

value: number, description: string
- 1: The printer works normally
- 2: Preparing printer
- 3: Abnormal communication
- 4: Out of paper
- 5: Overheated
- 6: Open the lid
- 7: The paper cutter is abnormal
- 8: The paper cutter has been recovered
- 9: No black mark has been detected
- 505: No printer has been detected
- 507: Failed to upgrade the printer firmware

#### Defined in

[index.tsx:226](https://github.com/mitsuharu/react-native-sunmi-printer-library/blob/86fcd1a/src/index.tsx#L226)
