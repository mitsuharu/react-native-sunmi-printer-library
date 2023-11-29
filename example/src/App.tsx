import React from 'react'
import { StatusBar } from 'react-native'
import { Main } from './Main'
import { ToastProvider } from 'react-native-toast-notifications'

const App = () => (
  <ToastProvider>
    <StatusBar barStyle="dark-content" />
    <Main />
  </ToastProvider>
)

export default App
