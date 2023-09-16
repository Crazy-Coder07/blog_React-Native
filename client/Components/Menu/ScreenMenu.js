import { View, Text } from 'react-native'
import React ,{useContext} from 'react'
import Home from '../../Pages/Home'
import Register from '../../Pages/auth/Register'
import Login from '../../Pages/auth/Login'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AuthContext } from '../../ContextApi/authContext'
import HeaderMenu from './HeaderMenu'

const ScreenMenu = () => {

  //  global state
  const [state,setState] = useContext(AuthContext);
  //   auth condition true false
  const isValid=state?.user && state?.token;
  const Stack=createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName='Login'>
          {isValid ? (
          <>
            <Stack.Screen name="Home" component={Home} 
               options={{title:"BlogEase",headerRight:()=><HeaderMenu/>}} 
            />
          </>) : (
            <>
              <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
              <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            </>
          )}
          
    </Stack.Navigator>
  )
}

export default ScreenMenu