import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../ContextApi/authContext'
import FooterMenu from '../Components/Menu/FooterMenu';
import axios from 'axios';


const Account = () => {
    // global state
    const [state, setState] = useContext(AuthContext);
    const { user } = state;
    // local state
    const [name, setName] = useState(user?.name);
    const [email] = useState(user?.email);
    const [password, setPassword] = useState(user?.password);
    const [loading, setLoading] = useState(false);

    const handleUpdate = async () => {
        try {
        setLoading(true);
        const {data}=await axios.put('/auth/update-user', {name,email,password});
        setLoading(false);
        let updated=JSON.stringify(data);
        setState({...state,user:updated?.updatedUser});
        Alert.alert(data && data.message);
        } catch (error) {
            console.log(error);
            Alert.alert(error.response.data.message);
            setLoading(false);
        }
    };
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={{ alignItems: "center" }}>
                    <Image
                        source={{
                            uri: "https://e7.pngegg.com/pngimages/348/800/png-clipart-man-wearing-blue-shirt-illustration-computer-icons-avatar-user-login-avatar-blue-child.png"
                        }}
                        style={{ height: 120, width: 120, borderRadius: 60 }}
                    />
                </View>
                <Text style={styles.warningtext}>
                    Currently You Can Only Update Your Name and Password*
                </Text>
                <View style={styles.inputcontainer}>
                    <Text style={styles.inputText}>Name</Text>
                    <TextInput
                        style={styles.inputBox}
                        value={name}
                        onChangeText={(text) => setName(text)}
                    />
                </View>
                <View style={styles.inputcontainer}>
                    <Text style={styles.inputText}>Email</Text>
                    <TextInput
                        style={styles.inputBox}
                        value={email}
                        editable={false}
                    />
                </View>
                <View style={styles.inputcontainer}>
                    <Text style={styles.inputText}>password</Text>
                    <TextInput
                        style={styles.inputBox}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry={true}
                    />
                </View>
                <View style={styles.inputcontainer}>
                    <Text style={styles.inputText}>Role</Text>
                    <TextInput
                        style={styles.inputBox}
                        value={state?.user.role}
                        editable={false}
                    />
                </View>
                <View style={{ alignItems: "center" }}>
                    <TouchableOpacity style={styles.updateBtn} onPress={handleUpdate}>
                        <Text style={styles.updateBtnText}>{loading ? "Please Wait" : "Updated Profile"}</Text>
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
        justifyContent: 'space-between',
        marginTop: 30,
    },
    warningtext: {
        color: "red",
        fontSize: 13,
        textAlign: "center",
    },
    inputcontainer: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    inputText: {
        fontWeight: "bold",
        width: 70,
        color: "gray",
    },
    inputBox: {
        width: 250,
        height: 40,
        backgroundColor: "#ffffff",
        marginLeft: 10,
        paddingLeft: 15,
        borderRadius: 5,
    },
    updateBtn: {
        backgroundColor: "black",
        color: "white",
        height: 40,
        width: 250,
        borderRadius: 10,
        marginTop: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    updateBtnText: {
        color: "white",
        fontSize: 16,
    },
})
export default Account