import { View, Text,StyleSheet} from 'react-native'
import React from 'react'
import moment from "moment"
import  FontAwesome5 from 'react-native-vector-icons/FontAwesome5'


const PostCard = ({posts}) => {
  return (
    <View>
      <Text style={styles.heading}>Total Posts {posts?.length}</Text>
      {posts?.map((post,i)=>(
          <View key={i} style={styles.Card}>
            <Text style={styles.title}>Title : {post?.title}</Text>
            <Text style={styles.desc}>{post?.description}</Text>
            <View style={styles.footer}>
                <Text>
                    {" "}
                    <FontAwesome5 name="user" color={"orange"}/> {post?.postedBy?.name}
                </Text>
                <Text>             
                     <FontAwesome5 name="clock" color={"orange"}/> {" "} 
                     {moment(post?.createdAt).format("DD:MM:YYYY")}
                </Text>
            </View>
          </View>
      ))}
    </View>
  )
}

const styles=StyleSheet.create({
    heading:{
        color:"green",
        textAlign:"center",
    },
    Card:{
        width:"97%",
        backgroundColor:"#FFFFFF",
        borderWidth:0.2,
        borderColor:"gray",
        padding:20,
        borderRadius:5,
        marginVertical:5,
    },
    title:{
       fontWeight:"bold",
       paddingBottom:10,
       borderBottomWidth:0.3,
    },
    footer:{
        flexDirection:"row",
        justifyContent:"space-between",
        marginTop:10,
    },
    desc:{
      marginTop:10,
      
    }
})

export default PostCard