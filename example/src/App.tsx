import React from 'react'
import { StatusBar } from 'react-native'
import { Main } from './Main'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const App = () => (
  <SafeAreaProvider>
    <StatusBar barStyle="dark-content" />
    <Main />
  </SafeAreaProvider>
)

export default App
