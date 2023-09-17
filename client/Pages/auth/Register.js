import { View, Text, StyleSheet, TextInput, Alert } from 'react-native'
import React ,{useContext,useState}from 'react'
import InputBox from '../../Components/Forms/InputBox'
import SubmitButton from '../../Components/Forms/SubmitButton'
import axios from 'axios'
import { AuthContext } from '../../ContextApi/authContext'

const Register = ({ navigation }) => {

  // global state
  const [state,setState]=useContext(AuthContext);

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!name || !email || !password) {
        Alert.alert("Please Fill All Fields");
        setLoading(false);
        return;
      }
      setLoading(false);
      setState(data);
      const {data} = await axios.post("/auth/register", { name, email, password });
      navigation.navigate("Login");
      Alert.alert(data && data.message)
    } catch (error) {
      Alert.alert(error.response.data.message);
      setLoading(false);
      console.log(error);
    }
  }
  

    return (
        <View style={styles.container}>
            <Text style={styles.pageTitle}>Register</Text>
            <View style={{marginHorizontal:20}}>
                <InputBox 
                  inputTitle={"Name"}
                  value={name}
                  setValue={setName}
                />
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
            {/* <Text>{JSON.stringify({name,email,password},null,4)}</Text> */}
            <SubmitButton 
              btnTitle="Register" 
              loading={loading}
              handleSubmit={handleSubmit}
            />
            <Text style={styles.linkText}>
                Already Registered Please <Text style={styles.link} onPress={()=>navigation.navigate("Login")}>Login</Text>
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
        marginBottom:20,
    },
    linkText:{
       textAlign:"center" ,
    },
    link:{
        color:"red",
    }
})
export default Register