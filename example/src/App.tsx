import React from 'react'
import { StatusBar } from 'react-native'
import { Main } from './Main'
import { ToastProvider } from 'react-native-toast-notifications'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const App = () => (
  <SafeAreaProvider>
    <ToastProvider>
      <StatusBar barStyle="dark-content" />
      <Main />
    </ToastProvider>
  </SafeAreaProvider>
)

export default App
