import { View, Text, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import moment from "moment"
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import EditModal from './EditModal'

const PostCard = ({ posts, myPostScreen }) => {

  const [loading, setLoading] = useState(false);
  const [modalVisible,setModalVisible] = useState(false);
  const [post,setPost]=useState({});
  const navigation = useNavigation()

  // handle delete prompt
  const handleDeletePropmt = (id) => {
    Alert.alert("Attention !", "Are you sure you want to delete this post?",
      [{
        text: 'Cancel',
        onPress: () => {
          console.log("cancel Press")
        }
      }, {
        text: 'Delete',
        onPress: () =>handleDeletePost(id)
      }
      ])
  }

  // delete post data
  const handleDeletePost = async (id) => {
    try {
      setLoading(true)
      const { data } = await axios.delete(`/post/delete-post/${id}`)
      setLoading(false)
      Alert.alert(data?.message)
      navigation.push("Myposts")
    } catch (error) {
      setLoading(false)
      console.log(error)
      Alert.alert(error)
    }
  }

  return (
    <View>
      <Text style={styles.heading}>Total Posts {posts?.length}</Text>
      {myPostScreen && (
      <EditModal 
           modalVisible={modalVisible} 
           setModalVisible={setModalVisible}
           post={post}
      />)}
      {posts?.map((post, i) => (
        <View key={i} style={styles.Card}>
          {myPostScreen && (
            <View style={{flexDirection:"row",justifyContent:"flex-end"}}>
              <Text style={{marginHorizontal:20 }}>
                <FontAwesome5
                  name="pen"
                  size={16}
                  color={"darkblue"}
                  onPress={() => {setPost(post),setModalVisible(true)}}
                />
              </Text>
              <Text>
                <FontAwesome5
                  name="trash"
                  size={16}
                  color={"red"}
                  onPress={() => handleDeletePropmt(post?._id)}
                />
              </Text>
            </View>
          )}

          <Text style={styles.title}>Title : {post?.title}</Text>
          <Text style={styles.desc}>{post?.description}</Text>
          <View style={styles.footer}>
            {post?.postedBy?.name && (
              <Text>
                {" "}
                <FontAwesome5 name="user" color={"orange"} />{" "}
                {post?.postedBy?.name}
              </Text>
            )}
            <Text>
              {" "}
              <FontAwesome5 name="clock" color={"orange"} /> {" "}
              {moment(post?.createdAt).format("DD:MM:YYYY")}
            </Text>
          </View>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  heading: {
    color: "green",
    textAlign: "center",
    marginTop: 4,
  },
  Card: {
    width: "97%",
    backgroundColor: "#17dafc",
    borderWidth: 0.2,
    borderColor: "gray",
    padding: 14,
    borderRadius: 5,
    marginVertical: 5,
  },
  title: {
    fontWeight: "bold",
    paddingBottom: 10,
    color: "red",
    borderBottomWidth: 0.3,
    marginTop:-5
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
  desc: {
    marginTop: 5,
  }
})

export default PostCard