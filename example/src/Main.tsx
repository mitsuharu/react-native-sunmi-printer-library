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
import { sampleImageBase64 } from './SampleResource'

type Props = Record<string, never>
type ComponentProps = {
  onPressPrepare: () => void
  onPressPrintText: () => void
  onPressPrintImage: () => void
}

const Component: React.FC<ComponentProps> = ({
  onPressPrepare,
  onPressPrintText,
  onPressPrintImage,
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
            text="print text"
            onPress={onPressPrintText}
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

      // SunmiPrinterLibrary.printSelfChecking()

      // const printerSerialNo: string = await SunmiPrinterLibrary.getPrinterSerialNo()
      // console.log(`printerSerialNo is ${printerSerialNo}`)

      // const printerVersion = await SunmiPrinterLibrary.getPrinterVersion()
      // console.log(`printerVersion is ${printerVersion}`)
            
      // const serviceVersion = await SunmiPrinterLibrary.getServiceVersion()
      // console.log(`serviceVersion is ${serviceVersion}`)
            
      // const printerModal = await SunmiPrinterLibrary.getPrinterModal()
      // console.log(`serviceVersion is ${printerModal}`)

      const printerPaper = await SunmiPrinterLibrary.getPrinterPaper()
      console.log(`printerPaper is ${printerPaper}`)

      // const printedLength = await SunmiPrinterLibrary.getPrintedLength()
      // console.log(`printedLength is ${printedLength}`)

      // const updatePrinterState = await SunmiPrinterLibrary.updatePrinterState()
      // console.log(`updatePrinterState is ${updatePrinterState}`)

      toast.show('Prepare is OK')
    } catch(error: any) {
      console.warn(error)
      toast.show(`Prepare is NG. ${error}`)
    }
  }, [toast])

  const onPressPrintText = useCallback(async () => {
    try {
      // await SunmiPrinterLibrary.setPrinterStyle('italic', true)
      // await SunmiPrinterLibrary.setPrinterStyle('leftSpacing', 10)
      // await SunmiPrinterLibrary.setAlignment('right')

      const text = '祇園精舎の鐘の声、諸行無常の響きあり。沙羅双樹の花の色、盛者必衰の理をあらはす。おごれる人も久しからず。ただ春の夜の夢のごとし。たけき者も遂にはほろびぬ、ひとへに風の前の塵に同じ。'
      await SunmiPrinterLibrary.printText(text)

      // SunmiPrinterLibrary.printOriginalText('κρχκμνκλρκνκνμρτυφ')

      // SunmiPrinterLibrary.printColumnsText(
      //   ['apple', 'orange', 'banana'], 
      //   [8, 8, 8], 
      //   ['center', 'center', 'center'])

      // SunmiPrinterLibrary.printBarCode('1234567890', 'CODE128', 162, 2, 'textUnderBarcode')

      // SunmiPrinterLibrary.printQRCode('Hello World', 4, 'middle')

      // SunmiPrinterLibrary.print2DCode('aaaa', 'QR', 4, 'middle')
      // SunmiPrinterLibrary.print2DCode('aaaa', 'PDF417', 4, 4)
      // SunmiPrinterLibrary.print2DCode('aaaa', 'DataMatrix', 4, 4)

      // await SunmiPrinterLibrary.lineWrap(2)


    } catch(error: any) {
      console.warn(error)
      toast.show(`PrintText is NG. ${error}`)
    }
  }, [toast])

  const onPressPrintImage = useCallback(async() => {
    try {
      await SunmiPrinterLibrary.printText('画像印刷')
      await SunmiPrinterLibrary.lineWrap(1)

      await SunmiPrinterLibrary.printBitmapBase64(sampleImageBase64, 384)
      await SunmiPrinterLibrary.lineWrap(1)
      // await SunmiPrinterLibrary.printBitmapBase64Custom(sampleImageBase64, 384, 'monochrome')
      // await SunmiPrinterLibrary.printBitmapBase64Custom(sampleImageBase64, 384, 'monochrome200')
      await SunmiPrinterLibrary.printBitmapBase64Custom(sampleImageBase64, 384, 'grayscale')
      await SunmiPrinterLibrary.lineWrap(4)
    } catch(error: any) {
      console.warn(error)
      toast.show(`onPressPrintImage is failed. ${error}`)
    }
  }, [toast])

  return (
    <Component
      onPressPrepare={onPressPrepare}
      onPressPrintText={onPressPrintText}
      onPressPrintImage={onPressPrintImage}
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
