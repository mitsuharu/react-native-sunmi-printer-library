import React, { useCallback, useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import * as SunmiPrinterLibrary from '@mitsuharu/react-native-sunmi-printer-library'

export default function App() {
   
  const prepare = useCallback(  async () => {
    console.log('prepare')
    try{
      console.log('call isConnected')

      const isConnected: boolean = await SunmiPrinterLibrary.connect()
      console.log(`isConnected is ${isConnected}`)

      console.log('call printerInit')

      const isPrinterInit: boolean = await SunmiPrinterLibrary.printerInit()
      console.log(`isPrinterInit is ${isPrinterInit}`)

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

    } catch(error: any) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    prepare()
  }, [])

  return (
    <View style={styles.container}>
      <Text>Result aa</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
})
