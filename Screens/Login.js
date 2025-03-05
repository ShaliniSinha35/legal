import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { ApplicationProvider, Layout, Text, Input} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { Ionicons } from '@expo/vector-icons';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const togglePasswordVisibility = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const onLoginPress = () => {
    // Add your login logic here
    console.log('Email:', email, 'Password:', password);
  };

  const renderIcon = (props) => (
    <Ionicons  size={24} color="black" name={secureTextEntry ? 'eye-off-outline' : 'eye-outline'} />
  );

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <Layout style={styles.container}>
        {/*<Text allowFontScaling={false} style={styles.title} category="h1">
          Login
        </Text> */}

        <Image source={require("../assets/logo.jpg")} style={{height:170,width:140,resizeMode:"contain"}}></Image>

        <Input
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(nextValue) => setEmail(nextValue)}
          keyboardType="email-address"
        />
        <Input
          style={styles.input}
          placeholder="Password"
          value={password}
          secureTextEntry={secureTextEntry}
          onChangeText={(nextValue) => setPassword(nextValue)}
          accessoryRight={renderIcon}
          onIconPress={togglePasswordVisibility}
        />
        <TouchableOpacity  style={styles.button} onPress={onLoginPress}>
          <Text allowFontScaling={false} style={{color:"#fff",textAlign:"center",fontSize:18}} category="h6">
          LOGIN
          </Text>
      
        </TouchableOpacity>
        {/*<Text allowFontScaling={false} style={styles.footer} category="p2">
          Don't have an account? Sign up
        </Text> */}
      </Layout>
    </ApplicationProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop:80
  },
  title: {
    marginBottom: 32,
  },
  input: {
    marginBottom: 16,
    width: '100%',
  },
  button: {
    marginTop: 16,
    width: '100%',
    backgroundColor: '#333333',
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    marginTop: 16,
    textAlign: 'center',
  },
});
