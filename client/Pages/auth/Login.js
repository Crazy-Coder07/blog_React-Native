import { View, Text, StyleSheet, TextInput, Alert } from 'react-native'
import React, { useState,useContext} from 'react'
import InputBox from '../../Components/Forms/InputBox'
import SubmitButton from '../../Components/Forms/SubmitButton'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AuthContext } from '../../ContextApi/authContext'


const Login = ({ navigation }) => {
    
    // global state
    const [state, setState] = useContext(AuthContext);

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async() => {
        try {
            setLoading(true)
            if (!email || !password) {
                Alert.alert("Please Fill All Fileds")
                setLoading(false)
                return;
            }
            setLoading(false);
            const { data } = await axios.post("/auth/login", {email, password });
            setState(data);
            Alert.alert(data && data.message)
            navigation.navigate("Home")
            await AsyncStorage.setItem("@auth", JSON.stringify(data))
        } catch (error) {
            Alert.alert(error.response.data.message);
            setLoading(false)
            console.log(error)
        }
    } 

    return (
        <View style={styles.container}>
            <Text style={styles.pageTitle}>Login</Text>
            <View style={{ marginHorizontal: 20 }}>
                <InputBox
                    inputTitle={"Email"}
                    keyboardType="email-address"
                    autoComplete="email"
                    value={email}
                    setValue={setEmail}
                />
                <InputBox
                    inputTitle={"password"}
                    secureTextEntry={true}
                    autoComplete="password"
                    value={password}
                    setValue={setPassword}
                />
            </View>
            {/* <Text>{JSON.stringify({email,password},null,4)}</Text> */}
            <SubmitButton
                btnTitle="Login"
                loading={loading}
                handleSubmit={handleSubmit}
            />
            <Text style={styles.linkText}>
                Not Registered Please
                <Text style={styles.link} onPress={() => navigation.navigate("Register")}> Register</Text>
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#e1d5c9"
    },
    pageTitle: {
        fontSize: 40,
        fontWeight: "bold",
        textAlign: "center",
        color: "#1e2225",
        marginBottom: 20,
    },
    linkText: {
        textAlign: "center",
    },
    link: {
        color: "red",
    }
})
export default Login