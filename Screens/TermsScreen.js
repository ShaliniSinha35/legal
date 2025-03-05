import React, { useState } from "react";
import { View, Text,Image, ScrollView, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Header } from "../Components/Header";
import { Ionicons } from '@expo/vector-icons';
import { Divider } from '@ui-kitten/components';

const TermsScreen = ({ navigation }) => {

 
  return (
    <View style={styles.container}>
      <Header navigation={navigation}></Header>
    <TouchableOpacity onPress={() => navigation.goBack()} style={{ backgroundColor:"#fff",padding:10 }}>
      <Ionicons name="arrow-back-circle-sharp" size={35} color="#e9c46a" />
        </TouchableOpacity>
     <Text allowFontScaling={false} style={styles.title}>Terms and Conditions</Text>
     <Divider></Divider>
      <ScrollView style={styles.scrollView}>
   
       <Text  allowFontScaling={false} style={styles.termsText}>
          {/* Sample Terms and Conditions */}
          Welcome to our application. Please read the following terms and conditions carefully before using the app. By accessing or using the app, you agree to be bound by these terms.
          
          1. **Use of the App**: The app is intended for personal and non-commercial use only. You agree to use the app in compliance with all applicable laws and regulations.
          
          2. **Intellectual Property**: All content, logos, and designs on the app are the property of the company. Unauthorized use is prohibited.
          
          3. **Privacy**: Your use of the app is subject to our privacy policy, which governs how we collect and use your data.
          
          4. **Termination**: We reserve the right to terminate your access to the app at any time without notice if you violate these terms.
          
          5. **Liability**: The company is not responsible for any damages resulting from the use of the app.
          
       
        </Text>
        <Divider></Divider>
      </ScrollView>
   
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",

  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    marginTop:10
  },
  scrollView: {
    flex: 1,
    marginBottom: 16,
    padding:10
  },
  termsText: {
    fontSize: 12,
    lineHeight: 24,
    color: "#333",
    letterSpacing: 0.5,
    margin:5,
    textAlign:"justify"
  },
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonEnabled: {
    backgroundColor: "#1E90FF",
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default TermsScreen;
