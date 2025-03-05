import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Layout } from "@ui-kitten/components";
import { LinearGradient } from "expo-linear-gradient";

const Section1 = ({navigation}) => {
  return (
    <Layout style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <View style={{ gap: 20 }}>
        {/* Box 1: List Your Case */}
        <TouchableOpacity onPress={()=>navigation.navigate("ListCase")}>
          <LinearGradient
    colors={['#333333', '#555555']} // Dark gray gradient for professional look

            style={{
              padding: 18,
              borderRadius: 10,
              alignItems: "center",
              elevation: 5,
              shadowColor: "#000",
              shadowOpacity: 0.2,
              shadowOffset: { width: 0, height: 2 },
              shadowRadius: 4,
              justifyContent:"center"
            }}
          >
            <Image style={{height:40,width:40,resizeMode:"contain"}} source={require("../assets/l1.png")}></Image>
            <Text allowfontScaling={false} style={{ fontSize: 18, fontWeight: "bold", color: "#fff" }}>
              List Your Case
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Box 2: Advocate Registration */}
        <TouchableOpacity
           onPress={()=>navigation.navigate("AdvocateRegistration")}>
          <LinearGradient
    colors={['#333333', '#555555']} // Dark gray gradient for professional look


            style={{
              padding: 18,
              borderRadius: 10,
              alignItems: "center",
              elevation: 5,
              shadowColor: "#000",
              shadowOpacity: 0.2,
              shadowOffset: { width: 0, height: 2 },
              shadowRadius: 4,
            }}
          >
        <Image style={{height:40,width:40,resizeMode:"contain"}} source={require("../assets/advocate.png")}></Image>

            <Text allowfontScaling={false} style={{ fontSize: 18, fontWeight: "bold", color: "#fff" }}>
              Advocate Registration
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </Layout>
  );
};

export default Section1;
