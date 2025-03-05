import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  Pressable,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { LinearGradient } from "expo-linear-gradient"; // Gradient import
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from "@expo/vector-icons/Entypo";
import { FontAwesome6 } from "@expo/vector-icons";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import ThemeSwitcher from "./ThemeSwitch";
const width = Dimensions.get("screen").width;

export const Header = ({ navigation }) => {
  const [iconRotate, setIconRotate] = useState(new Animated.Value(0));
   const {theme,setTheme}= useContext(AppContext)



  const handleMenuPress = () => {
   
    Animated.timing(iconRotate, {
      toValue: iconRotate._value === 0 ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    navigation.openDrawer();
  };

  const rotate = iconRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const renderTitle = () => (
    <>
    <View style={styles.titleContainer}>
      <TouchableOpacity onPress={handleMenuPress}>
        <Animated.View style={{ transform: [{ rotate }] }}>
          <AntDesign
            name="menufold"
            size={26}
            color="white"
            style={styles.icon}
          />
        </Animated.View>
      </TouchableOpacity>
      {/* <Image
        source={require('../assets/logo.jpg')}
       style={styles.logo}
      /> */}
      <Pressable
        style={styles.header}
        onPress={() => navigation.navigate("Home")}
      >
        <Text allowfontScaling={false} style={styles.headerText}>
          JUSTICE LEGAL
        </Text>
      </Pressable>

      <View style={{alignItems:"flex-end",gap:10}}>
        {/* <ThemeSwitcher></ThemeSwitcher> */}
      <View style={styles.iconContainer}>
        {/* Social Media Icons */}
        <TouchableOpacity>
          <FontAwesome
            onPress={() => {
              /* Add social media logic */
            }}
            name="facebook"
            size={15}
            color="white"
            style={styles.socialIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <AntDesign
            onPress={() => {
              /* Add social media logic */
            }}
            name="youtube"
            size={15}
            color="white"
            style={styles.socialIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Entypo
            onPress={() => {
              /* Add social media logic */
            }}
            name="instagram"
            size={15}
            color="white"
            style={styles.socialIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <FontAwesome6
            name="x-twitter"
            size={15}
            color="white"
            style={styles.socialIcon}
          />
        </TouchableOpacity>
      </View>
      </View>

  

     
    </View>
  
     </>
  );

  return (
    <LinearGradient
      colors={["#333333", "#555555"]} // Dark gray gradient for professional look
      style={styles.gradientBackground}
    >
      {renderTitle()}
   
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  logo: {
    height: 50,
    width: 50,
    resizeMode: "contain",
    marginLeft: 15,
    borderRadius: 30,
  },
  header: {
    justifyContent: "center",
    paddingTop: 15,
  },
  headerText: {
    color: "#FFD700",
    fontSize: 18,
    fontWeight: "bold",
    flex: 1, // To push icons to the right
    // textAlign: 'center',
    letterSpacing: 1,
    marginLeft: 5,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  
  },
  icon: {
    marginHorizontal: 12,
    opacity: 1,

  },
  socialIcon: {
    marginHorizontal: 10,
    opacity: 0.9,
  },
  gradientBackground: {
    flexDirection: "row",
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "space-between",
    height: 80,
  },
});
