import { View, Text,StyleSheet} from 'react-native'
import React,{useContext} from 'react'
import { AuthContext } from '../ContextApi/authContext'
import FooterMenu from '../Components/Menu/FooterMenu';

const Home = () => {
    // global state
    const [state,setState] = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(state,null,4)}</Text>
      <FooterMenu></FooterMenu>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    margin:10,
    justifyContent: 'space-between',
    marginTop:40,
  }
})
export default Home