import React, { useCallback } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
} from 'react-native'
import * as SunmiPrinterLibrary from '@mitsuharu/react-native-sunmi-printer-library'
import { Button } from './components/Button'
import { useToast } from 'react-native-toast-notifications'
import { sampleImageBase64, sampleTextEn, sampleTextJa } from './SampleResource'

type Props = Record<string, never>
type ComponentProps = {
  onPressPrepare: () => void
  onPressPrintSelfChecking: () => void
  onPressPrintText: () => void
  onPressPrintTable: () => void
  onPressPrintModifiedText: () => void
  onPressPrintImage: () => void
  onPressPrintBarcode: () => void
}

const Component: React.FC<ComponentProps> = ({
  onPressPrepare,
  onPressPrintSelfChecking,
  onPressPrintText,
  onPressPrintTable,
  onPressPrintModifiedText,
  onPressPrintImage,
  onPressPrintBarcode,
}) => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>@mitsuharu/react-native-sunmi-printer-library</Text>
          <Button
            text="[MUST] prepare"
            onPress={onPressPrepare}
          />
          <Button
            text="print Self-Checking"
            onPress={onPressPrintSelfChecking}
          />
          <Button
            text="print text"
            onPress={onPressPrintText}
          />
          <Button
            text="print table"
            onPress={onPressPrintTable}
          />
          <Button
            text="print modified text"
            onPress={onPressPrintModifiedText}
          />
          <Button
            text="print BarCode / QR code"
            onPress={onPressPrintBarcode}
          />
          <Button
            text="print image"
            onPress={onPressPrintImage}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const Container: React.FC<Props> = () => {
  const toast = useToast()

  const onPressPrepare = useCallback(async () => {
    try{
      const isPrepared: boolean = await SunmiPrinterLibrary.prepare()
      console.log(`isPrepared is ${isPrepared}`)

      const printerSerialNo: string = await SunmiPrinterLibrary.getPrinterSerialNo()
      console.log(`printerSerialNo is ${printerSerialNo}`)

      const printerVersion = await SunmiPrinterLibrary.getPrinterVersion()
      console.log(`printerVersion is ${printerVersion}`)
            
      const serviceVersion = await SunmiPrinterLibrary.getServiceVersion()
      console.log(`serviceVersion is ${serviceVersion}`)
            
      const printerModal = await SunmiPrinterLibrary.getPrinterModal()
      console.log(`serviceVersion is ${printerModal}`)

      const printerPaper = await SunmiPrinterLibrary.getPrinterPaper()
      console.log(`printerPaper is ${printerPaper}`)

      const printedLength = await SunmiPrinterLibrary.getPrintedLength()
      console.log(`printedLength is ${printedLength}`)

      const {value, description} = await SunmiPrinterLibrary.updatePrinterState()
      console.log(`updatePrinterState is (${value}, ${description}).`)

      toast.show('Prepare is OK')
    } catch(error: any) {
      console.warn(error)
      toast.show(`Prepare is failed. ${error}`)
    }
  }, [toast])

  const onPressPrintSelfChecking = useCallback(async () => {
    try{
      await SunmiPrinterLibrary.printText('Print Self-Checking')
      await SunmiPrinterLibrary.lineWrap(1)

      await SunmiPrinterLibrary.printSelfChecking()
      await SunmiPrinterLibrary.lineWrap(1)

      SunmiPrinterLibrary.setBold(true)
      SunmiPrinterLibrary.setAlignment('right')
      
    } catch(error: any) {
      console.warn(error)
      toast.show(`onPressPrintSelfChecking is failed. ${error}`)
    }
  }, [toast])

  const onPressPrintText = useCallback(async () => {
    try {
      await SunmiPrinterLibrary.printText('Print Text')
      await SunmiPrinterLibrary.lineWrap(1)

      await SunmiPrinterLibrary.printText(sampleTextEn)
      await SunmiPrinterLibrary.lineWrap(1)

      await SunmiPrinterLibrary.printText(sampleTextJa)
      await SunmiPrinterLibrary.lineWrap(1)

      await SunmiPrinterLibrary.lineWrap(3)
    } catch(error: any) {
      console.warn(error)
      toast.show(`PrintText is failed. ${error}`)
    }
  }, [toast])

  const onPressPrintTable = useCallback(async () => {
    try {
      await SunmiPrinterLibrary.printText('Print Table')
      await SunmiPrinterLibrary.lineWrap(1)

      await SunmiPrinterLibrary.printHR('plus')

      await SunmiPrinterLibrary.printColumnsString(
        ['', 'apple', 'mellon', 'banana'], 
        [8, 8, 8, 8], 
        ['left', 'center', 'center', 'center'])

      await SunmiPrinterLibrary.printHR('double')

      await SunmiPrinterLibrary.printColumnsString(
        ['color', 'red', 'green', 'yellow'], 
        [8, 8, 8, 8], 
        ['left', 'center', 'center', 'center'])

      await SunmiPrinterLibrary.printHR('line')

      await SunmiPrinterLibrary.printColumnsString(
        ['taste', 'good', 'good', 'good'], 
        [8, 8, 8, 8], 
        ['left', 'center', 'center', 'center'])
        
      await SunmiPrinterLibrary.printHR('wave')

      await SunmiPrinterLibrary.printColumnsString(
        ['shape', 'small', 'ball', 'crescent'], 
        [8, 8, 6, 10], 
        ['left', 'center', 'center', 'center'])

      await SunmiPrinterLibrary.printHR('star')
        
      await SunmiPrinterLibrary.lineWrap(3)
    } catch(error: any) {
      console.warn(error)
      toast.show(`PrintText is failed. ${error}`)
    }
  }, [toast])

  const onPressPrintModifiedText = useCallback(async () => {
    try {
      await SunmiPrinterLibrary.printText('Print ModifiedText')
      await SunmiPrinterLibrary.lineWrap(1)

      await SunmiPrinterLibrary.setAlignment('right')
      await SunmiPrinterLibrary.printText('right')

      await SunmiPrinterLibrary.setAlignment('center')
      await SunmiPrinterLibrary.printText('center')

      await SunmiPrinterLibrary.setAlignment('left')
      await SunmiPrinterLibrary.printText('left')

      await SunmiPrinterLibrary.lineWrap(1)
      
      await SunmiPrinterLibrary.setPrinterStyle('bold', true)
      await SunmiPrinterLibrary.printText('bold')
      await SunmiPrinterLibrary.setPrinterStyle('bold', false)
      
      await SunmiPrinterLibrary.setPrinterStyle('italic', true)
      await SunmiPrinterLibrary.printText('italic')
      await SunmiPrinterLibrary.setPrinterStyle('italic', false)
      
      await SunmiPrinterLibrary.lineWrap(1)

      await SunmiPrinterLibrary.setFontSize(16)
      await SunmiPrinterLibrary.printText('font size is 16')

      await SunmiPrinterLibrary.setFontSize(32)
      await SunmiPrinterLibrary.printText('font size is 32')

      await SunmiPrinterLibrary.setDefaultFontSize()
      await SunmiPrinterLibrary.printText(`font size is default (${SunmiPrinterLibrary.defaultFontSize})`)

      await SunmiPrinterLibrary.lineWrap(3)
    } catch(error: any) {
      console.warn(error)
      toast.show(`PrintText is failed. ${error}`)
    }
  }, [toast])

  const onPressPrintBarcode = useCallback(async() => {
    try {
      await SunmiPrinterLibrary.printText('Print BarCode')
      await SunmiPrinterLibrary.lineWrap(1)

      await SunmiPrinterLibrary.printText('(1) Barcode')
      await SunmiPrinterLibrary.lineWrap(1)

      SunmiPrinterLibrary.printBarcode('1234567890', 'CODE128', 162, 2, 'textUnderBarcode')
      await SunmiPrinterLibrary.lineWrap(2)

      await SunmiPrinterLibrary.printText('(2) QR code')
      await SunmiPrinterLibrary.lineWrap(1)

      SunmiPrinterLibrary.printQRCode('Hello World', 8, 'middle')
      await SunmiPrinterLibrary.lineWrap(4)
    } catch(error: any) {
      console.warn(error)
      toast.show(`onPressPrintImage is failed. ${error}`)
    }
  }, [toast])


  const onPressPrintImage = useCallback(async() => {
    try {
      await SunmiPrinterLibrary.printText('Print Image')
      await SunmiPrinterLibrary.lineWrap(1)

      await SunmiPrinterLibrary.printText('(1) monochrome')
      await SunmiPrinterLibrary.lineWrap(1)

      await SunmiPrinterLibrary.printBitmapBase64(sampleImageBase64, 384)
      await SunmiPrinterLibrary.lineWrap(2)

      await SunmiPrinterLibrary.printText('(2) grayscale')
      await SunmiPrinterLibrary.lineWrap(1)

      await SunmiPrinterLibrary.printBitmapBase64Custom(sampleImageBase64, 384, 'grayscale')
      await SunmiPrinterLibrary.lineWrap(4)
    } catch(error: any) {
      console.warn(error)
      toast.show(`onPressPrintImage is failed. ${error}`)
    }
  }, [toast])

  return (
    <Component {...{
      onPressPrepare,
      onPressPrintSelfChecking,
      onPressPrintText,
      onPressPrintTable,
      onPressPrintModifiedText, 
      onPressPrintBarcode,
      onPressPrintImage
    }} />
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
