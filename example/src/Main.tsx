import React, { useCallback, useEffect } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  DeviceEventEmitter,
} from 'react-native'
import * as SunmiPrinterLibrary from '@mitsuharu/react-native-sunmi-printer-library'
import { Button } from './components/Button'
import { useToast } from 'react-native-toast-notifications'
import {
  sampleImageBase64,
  sampleTextEn,
  sampleTextHelloWorld,
  sampleTextJa,
} from './SampleResource'
import { Buffer } from 'buffer'

type Props = Record<string, never>
type ComponentProps = {
  onPressPrepare: () => void
  onPressPrintSelfChecking: () => void
  onPressPrintText: () => void
  onPressPrintTextAwait: () => void
  onPressPrintTextAsync: () => void
  onPressSendRAWData: () => void
  onPressPrintTable: () => void
  onPressPrintChangingStyle: () => void
  onPressPrintImage: () => void
  onPressPrintBarcode: () => void
  onPressScan: () => void
  onPressTransaction: () => void
}

const Component: React.FC<ComponentProps> = ({
  onPressPrepare,
  onPressPrintSelfChecking,
  onPressPrintText,
  onPressPrintTextAwait,
  onPressPrintTextAsync,
  onPressSendRAWData,
  onPressPrintTable,
  onPressPrintChangingStyle,
  onPressPrintImage,
  onPressPrintBarcode,
  onPressScan,
  onPressTransaction,
}) => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>
            @mitsuharu/react-native-sunmi-printer-library
          </Text>
          <Button text="[MUST] prepare" onPress={onPressPrepare} />
          <Button
            text="print Self-Checking"
            onPress={onPressPrintSelfChecking}
          />
          <Button text="print text" onPress={onPressPrintText} />
          <Button text="print text (await)" onPress={onPressPrintTextAwait} />
          <Button text="print text (async)" onPress={onPressPrintTextAsync} />
          <Button text="send raw data" onPress={onPressSendRAWData} />
          <Button text="print table" onPress={onPressPrintTable} />
          <Button
            text="Print changing styles"
            onPress={onPressPrintChangingStyle}
          />
          <Button
            text="print Barcode / QR code"
            onPress={onPressPrintBarcode}
          />
          <Button text="print image" onPress={onPressPrintImage} />
          <Button text="scan" onPress={onPressScan} />
          <Button
            text="print text with transaction"
            onPress={onPressTransaction}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const Container: React.FC<Props> = () => {
  const toast = useToast()

  const onPressPrepare = useCallback(async () => {
    try {
      const isPrepared: boolean = await SunmiPrinterLibrary.prepare()
      console.log(`isPrepared is ${isPrepared}`)

      const {
        serialNumber,
        printerVersion,
        serviceVersion,
        printerModal,
        paperWidth,
        pixelWidth,
      } = await SunmiPrinterLibrary.getPrinterInfo()
      console.log(`serialNumber is ${serialNumber}`)
      console.log(`printerVersion is ${printerVersion}`)
      console.log(`serviceVersion is ${serviceVersion}`)
      console.log(`printerModal is ${printerModal}`)
      console.log(`paperWidth is ${paperWidth}`)
      console.log(`pixelWidth is ${pixelWidth}`)

      const printedLength = await SunmiPrinterLibrary.getPrintedLength()
      console.log(`printedLength is ${printedLength}`)

      const { value, description } = await SunmiPrinterLibrary.getPrinterState()
      console.log(`getPrinterState is (${value}, ${description}).`)

      toast.show('Prepare is OK')
    } catch (error) {
      console.warn(error)
      toast.show(`Prepare is failed. ${error}`)
    }
  }, [toast])

  const onPressPrintSelfChecking = useCallback(async () => {
    try {
      await SunmiPrinterLibrary.printText('Print Self-Checking')
      await SunmiPrinterLibrary.lineWrap(1)

      await SunmiPrinterLibrary.printSelfChecking()
      await SunmiPrinterLibrary.lineWrap(1)
    } catch (error) {
      console.warn(error)
      toast.show(`onPressPrintSelfChecking is failed. ${error}`)
    }
  }, [toast])

  const onPressPrintText = useCallback(async () => {
    try {
      await SunmiPrinterLibrary.printText('Print Text (await)')
      await SunmiPrinterLibrary.lineWrap(1)

      await SunmiPrinterLibrary.printText(sampleTextEn)
      await SunmiPrinterLibrary.lineWrap(1)

      await SunmiPrinterLibrary.printText(sampleTextJa)
      await SunmiPrinterLibrary.lineWrap(1)

      await SunmiPrinterLibrary.lineWrap(3)
    } catch (error) {
      console.warn(error)
      toast.show(`PrintText is failed. ${error}`)
    }
  }, [toast])

  const onPressPrintTextAwait = useCallback(async () => {
    try {
      await SunmiPrinterLibrary.printText('Print Text (await)')
      await SunmiPrinterLibrary.lineWrap(1)

      await SunmiPrinterLibrary.printText('0 ' + sampleTextHelloWorld)
      await SunmiPrinterLibrary.printText('1 ' + sampleTextHelloWorld)
      await SunmiPrinterLibrary.printText('2 ' + sampleTextHelloWorld)
      await SunmiPrinterLibrary.printText('3 ' + sampleTextHelloWorld)
      await SunmiPrinterLibrary.printText('4 ' + sampleTextHelloWorld)
      await SunmiPrinterLibrary.printText('5 ' + sampleTextHelloWorld)
      await SunmiPrinterLibrary.printText('6 ' + sampleTextHelloWorld)
      await SunmiPrinterLibrary.printText('7 ' + sampleTextHelloWorld)
      await SunmiPrinterLibrary.printText('8 ' + sampleTextHelloWorld)
      await SunmiPrinterLibrary.printText('9 ' + sampleTextHelloWorld)

      await SunmiPrinterLibrary.lineWrap(3)
    } catch (error) {
      console.warn(error)
      toast.show(`PrintText is failed. ${error}`)
    }
  }, [toast])

  const onPressPrintTextAsync = useCallback(async () => {
    try {
      SunmiPrinterLibrary.printText('Print Text (no await)')
      SunmiPrinterLibrary.lineWrap(1)

      SunmiPrinterLibrary.printText('0 ' + sampleTextHelloWorld)
      SunmiPrinterLibrary.printText('1 ' + sampleTextHelloWorld)
      SunmiPrinterLibrary.printText('2 ' + sampleTextHelloWorld)
      SunmiPrinterLibrary.printText('3 ' + sampleTextHelloWorld)
      SunmiPrinterLibrary.printText('4 ' + sampleTextHelloWorld)
      SunmiPrinterLibrary.printText('5 ' + sampleTextHelloWorld)
      SunmiPrinterLibrary.printText('6 ' + sampleTextHelloWorld)
      SunmiPrinterLibrary.printText('7 ' + sampleTextHelloWorld)
      SunmiPrinterLibrary.printText('8 ' + sampleTextHelloWorld)
      SunmiPrinterLibrary.printText('9 ' + sampleTextHelloWorld)

      SunmiPrinterLibrary.lineWrap(3)
    } catch (error) {
      console.warn(error)
      toast.show(`PrintText is failed. ${error}`)
    }
  }, [toast])

  const onPressSendRAWData = useCallback(async () => {
    try {
      const boldOn = new Uint8Array([0x1b, 0x45, 0x01])
      const boldOnBase64 = Buffer.from(boldOn).toString('base64')
      await SunmiPrinterLibrary.sendRAWData(boldOnBase64)

      await SunmiPrinterLibrary.printText('\'sendRAWData\' sets Bold to ON')
      await SunmiPrinterLibrary.lineWrap(1)

      const boldOff = new Uint8Array([0x1b, 0x45, 0x00])
      const boldOffBase64 = Buffer.from(boldOff).toString('base64')
      await SunmiPrinterLibrary.sendRAWData(boldOffBase64)

      await SunmiPrinterLibrary.printText('\'sendRAWData\' sets Bold to OFF')
      await SunmiPrinterLibrary.lineWrap(1)

      await SunmiPrinterLibrary.lineWrap(3)
    } catch (error) {
      console.warn(error)
      toast.show(`onPressSendRAWData is failed. ${error}`)
    }
  }, [toast])

  const onPressPrintTable = useCallback(async () => {
    try {
      await SunmiPrinterLibrary.printText('Print Table')
      await SunmiPrinterLibrary.lineWrap(1)

      const {
        serialNumber,
        printerVersion,
        serviceVersion,
        printerModal,
        paperWidth,
        pixelWidth,
      } = await SunmiPrinterLibrary.getPrinterInfo()

      const widths = [30, 25]
      await SunmiPrinterLibrary.printColumnsString(['name', 'value'], widths, [
        'center',
        'center',
      ])
      await SunmiPrinterLibrary.printColumnsString(
        ['serial number:', serialNumber],
        widths,
        ['left', 'left']
      )
      await SunmiPrinterLibrary.printColumnsString(
        ['printer version:', printerVersion],
        widths,
        ['left', 'left']
      )
      await SunmiPrinterLibrary.printColumnsString(
        ['service version:', serviceVersion],
        widths,
        ['left', 'left']
      )
      await SunmiPrinterLibrary.printColumnsString(
        ['printer modal:', printerModal],
        widths,
        ['left', 'left']
      )
      await SunmiPrinterLibrary.printColumnsString(
        ['paper width:', paperWidth],
        widths,
        ['left', 'left']
      )
      await SunmiPrinterLibrary.printColumnsString(
        ['pixel width:', `${pixelWidth}`],
        widths,
        ['left', 'left']
      )

      SunmiPrinterLibrary.lineWrap(1)
      await SunmiPrinterLibrary.printHR('plus')

      await SunmiPrinterLibrary.printColumnsString(
        ['', 'apple', 'mellon', 'banana'],
        [8, 8, 8, 8],
        ['left', 'center', 'center', 'center']
      )

      await SunmiPrinterLibrary.printHR('double')

      await SunmiPrinterLibrary.printColumnsString(
        ['color', 'red', 'green', 'yellow'],
        [8, 8, 8, 8],
        ['left', 'center', 'center', 'center']
      )

      await SunmiPrinterLibrary.printHR('line')

      await SunmiPrinterLibrary.printColumnsString(
        ['taste', 'good', 'good', 'good'],
        [8, 8, 8, 8],
        ['left', 'center', 'center', 'center']
      )

      await SunmiPrinterLibrary.printHR('wave')

      await SunmiPrinterLibrary.printColumnsString(
        ['shape', 'small', 'ball', 'crescent'],
        [8, 8, 6, 10],
        ['left', 'center', 'center', 'center']
      )

      await SunmiPrinterLibrary.printHR('star')

      await SunmiPrinterLibrary.lineWrap(3)
    } catch (error) {
      console.warn(error)
      toast.show(`PrintText is failed. ${error}`)
    }
  }, [toast])

  const onPressPrintChangingStyle = useCallback(async () => {
    try {
      await SunmiPrinterLibrary.printText('Print changing styles')
      await SunmiPrinterLibrary.lineWrap(1)

      await SunmiPrinterLibrary.setAlignment('right')
      await SunmiPrinterLibrary.printText('right')

      await SunmiPrinterLibrary.setAlignment('center')
      await SunmiPrinterLibrary.printText('center')

      await SunmiPrinterLibrary.setAlignment('left')
      await SunmiPrinterLibrary.printText('left')

      await SunmiPrinterLibrary.setTextStyle('bold', true)
      await SunmiPrinterLibrary.printText('bold')
      await SunmiPrinterLibrary.setTextStyle('bold', false)

      await SunmiPrinterLibrary.setTextStyle('italic', true)
      await SunmiPrinterLibrary.printText('italic')
      await SunmiPrinterLibrary.setTextStyle('italic', false)

      await SunmiPrinterLibrary.setParagraphStyle('leftSpacing', 50)
      await SunmiPrinterLibrary.printText('leftSpacing sets 50.')
      await SunmiPrinterLibrary.setParagraphStyle('leftSpacing', 0)

      await SunmiPrinterLibrary.setFontSize(16)
      await SunmiPrinterLibrary.printText('font size is 16')

      await SunmiPrinterLibrary.setFontSize(32)
      await SunmiPrinterLibrary.printText('font size is 32')

      await SunmiPrinterLibrary.setDefaultFontSize()
      await SunmiPrinterLibrary.printText(
        `font size is default (${SunmiPrinterLibrary.defaultFontSize})`
      )

      await SunmiPrinterLibrary.resetPrinterStyle()
      await SunmiPrinterLibrary.lineWrap(3)
    } catch (error) {
      console.warn(error)
      toast.show(`PrintText is failed. ${error}`)
    }
  }, [toast])

  const onPressPrintBarcode = useCallback(async () => {
    try {
      await SunmiPrinterLibrary.printText('Print Barcode')
      await SunmiPrinterLibrary.lineWrap(1)

      await SunmiPrinterLibrary.printText('(1) Barcode')
      await SunmiPrinterLibrary.lineWrap(1)

      await SunmiPrinterLibrary.printBarcode(
        '1234567890',
        'CODE128',
        162,
        2,
        'textUnderBarcode'
      )
      await SunmiPrinterLibrary.lineWrap(2)

      await SunmiPrinterLibrary.printText('(2) QR code')
      await SunmiPrinterLibrary.lineWrap(1)

      await SunmiPrinterLibrary.printQRCode('Hello World', 8, 'middle')
      await SunmiPrinterLibrary.lineWrap(4)
    } catch (error) {
      console.warn(error)
      toast.show(`onPressPrintImage is failed. ${error}`)
    }
  }, [toast])

  const onPressPrintImage = useCallback(async () => {
    try {
      await SunmiPrinterLibrary.printText('Print Image')
      await SunmiPrinterLibrary.lineWrap(1)

      await SunmiPrinterLibrary.printText('(1) binary')
      await SunmiPrinterLibrary.lineWrap(1)

      await SunmiPrinterLibrary.printImage(sampleImageBase64, 384, 'binary')
      await SunmiPrinterLibrary.lineWrap(2)

      await SunmiPrinterLibrary.printText('(2) grayscale')
      await SunmiPrinterLibrary.lineWrap(1)

      await SunmiPrinterLibrary.printImage(sampleImageBase64, 384, 'grayscale')
      await SunmiPrinterLibrary.lineWrap(4)
    } catch (error) {
      console.warn(error)
      toast.show(`onPressPrintImage is failed. ${error}`)
    }
  }, [toast])

  const onPressScan = useCallback(async () => {
    try {
      const result = await SunmiPrinterLibrary.scan()
      console.warn(`onPressScan is ${result}`)
    } catch (error) {
      console.warn(error)
      toast.show(`onPressScan is failed. ${error}`)
    }
  }, [toast])

  useEffect(() => {
    DeviceEventEmitter.addListener(
      SunmiPrinterLibrary.EventType.onScanSuccess,
      (message) => {
        console.log(`[onScanSuccess] ${message}`)
      }
    )
    DeviceEventEmitter.addListener(
      SunmiPrinterLibrary.EventType.onScanFailed,
      (message) => {
        console.log(`[onScanFailed] ${message}`)
      }
    )
    return () => {
      DeviceEventEmitter.removeAllListeners(
        SunmiPrinterLibrary.EventType.onScanSuccess
      )
      DeviceEventEmitter.removeAllListeners(
        SunmiPrinterLibrary.EventType.onScanFailed
      )
    }
  }, [])

  const onPressTransaction = useCallback(async () => {
    try {
      const hr = await SunmiPrinterLibrary.hr('line')

      await SunmiPrinterLibrary.enterPrinterBuffer(true)

      SunmiPrinterLibrary.printText('Transaction Test 0')
      SunmiPrinterLibrary.printText(hr)

      await SunmiPrinterLibrary.commitPrinterBuffer()

      SunmiPrinterLibrary.printText('Transaction Test 1')
      SunmiPrinterLibrary.printText('Transaction Test 2')
      SunmiPrinterLibrary.printText('Transaction Test 3')
      SunmiPrinterLibrary.lineWrap(4)

      await SunmiPrinterLibrary.exitPrinterBuffer(true)
    } catch (error) {
      console.warn(error)
    }
  }, [])

  return (
    <Component
      {...{
        onPressPrepare,
        onPressPrintSelfChecking,
        onPressPrintText,
        onPressPrintTextAwait,
        onPressPrintTextAsync,
        onPressSendRAWData,
        onPressPrintTable,
        onPressPrintChangingStyle,
        onPressPrintBarcode,
        onPressPrintImage,
        onPressScan,
        onPressTransaction,
      }}
    />
  )
}

export { Container as Main }

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: '#ffffff',
  },
  scrollView: {
    backgroundColor: '#ffffff',
  },
  sectionContainer: {
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000000',
  },
})
