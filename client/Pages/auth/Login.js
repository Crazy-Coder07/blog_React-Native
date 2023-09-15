import { View, Text, StyleSheet, TextInput, Alert } from 'react-native'
import React ,{useState}from 'react'
import InputBox from '../../Components/Forms/InputBox'
import SubmitButton from '../../Components/Forms/SubmitButton'

const Login = ({navigation}) => {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [loading,setLoading]=useState(false)

    const handleSubmit=()=>{
        try{
          setLoading(true)
          if(!email||!password){
            Alert.alert("Please Fill All Fileds")
            setLoading(false)
            return;
          }
          setLoading(false);
          console.log("Register Data ==>",{email,password})
        }catch(error){
            setLoading(false)
            console.log(error)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.pageTitle}>Login</Text>
            <View style={{marginHorizontal:20}}>
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
                Already Register Please 
                <Text style={styles.link} onPress={()=>navigation.navigate("Register")}> Register</Text>
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
       textAlign:"center",
    },
    link:{
        color:"red",
    }
})
export default Login