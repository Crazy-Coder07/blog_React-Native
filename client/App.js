import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Rootnavigation from './navigation'

const App = () => {
  return (
    <NavigationContainer>
      <Rootnavigation/>
    </NavigationContainer>
  )
}

export default App;