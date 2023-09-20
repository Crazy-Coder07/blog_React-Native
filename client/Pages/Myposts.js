import { View, Text,ScrollView,StyleSheet,Alert } from 'react-native'
import React,{useState,useEffect} from 'react'
import FooterMenu from '../Components/Menu/FooterMenu'
import axios from "axios";
import PostCard from '../Components/PostCard';

const Myposts = () => {
    // state
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    
    // get user posts
    const getUserPost=async()=>{
        try{
            setLoading(true)
            const {data}=await axios.get('/post/get-user-post')
            setLoading(false)
            setPosts(data?.userposts);
        }catch(error){
            setLoading(false)
            console.log(error)
            Alert.alert(error)
        }
    }
    useEffect(()=>{
        getUserPost()
    },[])

  return (
    <View style={styles.container}>
      <ScrollView>
        <PostCard posts={posts} myPostScreen={true}/>
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
      margin: 0,
      justifyContent: 'space-between',
    }
  })

export default Myposts