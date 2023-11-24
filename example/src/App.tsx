import React, { useCallback, useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { connect, printerInit } from '@mitsuharu/react-native-sunmi-printer-library'

export default function App() {
   

    const aaa = useCallback(  async () => {
        console.log('aaa')
        try{
            console.log('call isConnected')

            const isConnected: boolean = await connect()
            console.log(`isConnected is ${isConnected}`)

            console.log('call printerInit')

            const isPrinterInit: boolean = await printerInit()
            console.log(`isPrinterInit is ${isPrinterInit}`)
        } catch(error: any) {
            console.log(error)

        }
    }, [])

    useEffect(() => {
        aaa()
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
