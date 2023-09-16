import { View, Text } from 'react-native'
import React from 'react'
import { AuthProvider } from './ContextApi/authContext'
import ScreenMenu from './Components/Menu/ScreenMenu'

const Rootnavigation = () => {
  return (
    <AuthProvider>
        <ScreenMenu/>
    </AuthProvider>
  )
}

export default Rootnavigation