import React from 'react'
import { StatusBar } from 'react-native'
import { Main } from './Main'
import { SafeAreaProvider } from 'react-native-safe-area-context'

type Props = {
  runtime?: 'React Native' | 'Expo'
}

const App: React.FC<Props> = ({ runtime = 'React Native' }) => (
  <SafeAreaProvider>
    <StatusBar barStyle="dark-content" />
    <Main runtime={runtime} />
  </SafeAreaProvider>
)

export default App
