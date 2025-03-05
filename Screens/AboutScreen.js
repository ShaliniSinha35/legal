import React from 'react';
import { StyleSheet, Image,View,TouchableOpacity } from 'react-native';
import { Layout, Text, Card,Divider } from '@ui-kitten/components';
import { Header } from '../Components/Header';
import { Ionicons } from '@expo/vector-icons';

const AboutScreen = ({navigation}) => {
  return (
    <>
    <Header navigation={navigation}></Header>


    <TouchableOpacity onPress={() => navigation.goBack()} style={{ backgroundColor:"#fff",padding:10 }}>
      <Ionicons name="arrow-back-circle-sharp" size={35} color="#e9c46a" />
        </TouchableOpacity>

      {/* <Divider style={{marginTop:10}} /> */}
       <Layout style={styles.container}>

       <View style={{width:"100%",alignItems:"center"}}>
            <Image source={require("../assets/logo.jpg")} style={{height:50,width:40,resizeMode:"contain"}}></Image>
            </View>
        
        <Text allowFontScaling={false} category="h4" style={styles.title}>
        About Us
       </Text>

      <Card style={styles.card}>

          
               
       <Text allowFontScaling={false} category="p1" style={styles.description}>
          Welcome to our company! We are dedicated to providing exceptional services and solutions for our clients. Our mission is to empower businesses and individuals with innovative and efficient tools. 
        </Text>
       <Text allowFontScaling={false} category="p1" style={styles.description}>
            
          At Justice Legal, we value integrity, excellence, and customer satisfaction. Thank you for choosing us as your trusted partner.
        </Text>

       <Text allowFontScaling={false} category="p1" style={styles.description}>
          At Justice Legal, we value integrity, excellence, and customer satisfaction. Thank you for choosing us as your trusted partner.
        </Text>
      </Card>

    </Layout>
    </>
 
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
  title: {
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  card: {
    width: '100%',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#ffffff',
  },
  description: {
    marginBottom: 10,
    textAlign: 'justify',
    fontSize:12


  },
});

export default AboutScreen;
