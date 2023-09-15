import { View, Text } from 'react-native'
import React from 'react'
import Register from './Pages/auth/Register'
import Login from './Pages/auth/Login'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const App = () => {
  const Stack=createNativeStackNavigator();
  return (
    <NavigationContainer>
     <Stack.Navigator initialRouteName='Login'>
       <Stack.Screen name="Register" component={Register} options={{headerShown:false}}/>
       <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
     </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;