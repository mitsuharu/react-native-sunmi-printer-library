import { useCallback, useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { printerInit } from 'react-native-sunmi-printer-library'

export default function App() {
   

    const aaa = useCallback(  async () => {
        console.log('aaa')
        try{
            await printerInit()
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
