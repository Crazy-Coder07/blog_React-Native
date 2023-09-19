import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useContext } from 'react'
import FooterMenu from '../Components/Menu/FooterMenu';
import { PostContext } from '../ContextApi/postContext';
import PostCard from '../Components/PostCard';

const Home = () => {

  // global state
  const [posts] = useContext(PostContext);

  return (
    <View style={styles.container}>
      <ScrollView>
        <PostCard posts={posts}/>
        {/* <Text>{JSON.stringify(posts, null, 4)}</Text> */}
      </ScrollView>
      <View style={{backgroundColor:"#ffffff"}}>
         <FooterMenu/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    justifyContent: 'space-between',
  }
})
export default Home