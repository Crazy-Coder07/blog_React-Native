import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity,Alert } from 'react-native'
import React ,{useState} from 'react'
import FooterMenu from '../Components/Menu/FooterMenu'
import  FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import axios from "axios"

const Post = ({navigation}) => {
    
    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("");
    const [loading,setLoading]=useState(false);
    
    const handlepost=async()=>{
        try{
            setLoading(true);
            if(!title || !description){
                Alert.alert("Please fill all the fields");
            }
            
            const {data}=await axios.post("/post/create-post",{
                title,
                description,
            })
            setLoading(false);
            navigation.navigate("Home");
            Alert.alert(data?.message);
        }catch(error){
            Alert.alert(error.response.data.message|| error.message);
            setLoading(false);
            console.log(error);
        }
    }
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={{ alignItems: "center" }}>
                    <Text style={styles.heading}>Create a post</Text>
                    <TextInput
                        style={styles.inputBox}
                        placeholder='add post title'
                        placeholderTextColor={"gray"}
                        value={title}
                        onChangeText={(text)=>setTitle(text)}
                    />
                    <TextInput
                        style={styles.inputBox}
                        placeholder='add post description'
                        placeholderTextColor={"gray"}
                        multiline={true}
                        numberOfLines={6}
                        value={description}
                        onChangeText={(text)=>setDescription(text)}
                    />
                </View>
                <View style={{ alignItems: "center" }}>
                    <TouchableOpacity style={styles.postBtn} onPress={handlepost}>
                        <Text style={styles.postBtnText}> 
                           <FontAwesome5 name="plus-square" size={18} /> {" "}
                           Create Post
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <View style={{ flex: 1, justifyContent: "flex-end" }}>
                <FooterMenu />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        marginTop: 30,
    },
    heading: {
        fontSize: 25,
        fontWeight: 'bold',
        textTransform: "uppercase"
    },
    inputBox: {
        width: 320,
        backgroundColor: "#ffffff",
        paddingTop: 10,
        marginTop: 30,
        textAlignVertical: "top",
        fontSize: 16,
        paddingLeft: 15,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius:10,
    },
    postBtn: {
        width: 320,
        backgroundColor: "#0c76e8",
        marginTop: 30,
        height: 30,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    postBtnText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },
})

export default Post