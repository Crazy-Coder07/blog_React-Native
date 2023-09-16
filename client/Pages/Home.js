import { View, Text } from 'react-native'
import React,{useContext} from 'react'
import { AuthContext } from '../ContextApi/authContext'

const Home = () => {
    // global state
    const [state,setState] = useContext(AuthContext);
  return (
    <View>
      <Text>Home</Text>
      <Text>{JSON.stringify(state,null,4)}</Text>
    </View>
  )
}

export default Home