import { View, Text } from 'react-native'
import React from 'react'
import { AuthProvider } from './ContextApi/authContext'
import ScreenMenu from './Components/Menu/ScreenMenu'
import { PostProvider } from './ContextApi/postContext'

const Rootnavigation = () => {
  return (
    <AuthProvider>
      <PostProvider>
        <ScreenMenu />
      </PostProvider>
    </AuthProvider>
  )
}

export default Rootnavigation