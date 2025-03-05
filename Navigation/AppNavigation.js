import React from 'react';
import { Dimensions, ImageBackground,View,TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, Divider } from '@ui-kitten/components';
import CNSearchScreen from '../Screens/SearchCaseScreens/CNSearchScreen';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { FontAwesome5 } from '@expo/vector-icons';
const width= Dimensions.get('screen').width;
// Import Screens
import Home from '../Screens/Home';
import CaseStatus from '../Screens/CaseStatus';
import MyCases from '../Screens/MyCases';
import CauseList from '../Screens/CauseList';
import Octicons from '@expo/vector-icons/Octicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { StyleSheet } from 'react-native';
import AboutScreen from '../Screens/AboutScreen';
import TermsScreen from '../Screens/TermsScreen';
import Login from '../Screens/Login';
import PartyNameSearch from '../Screens/SearchCaseScreens/PartyNameSearch';
import FilingNumberSearch from '../Screens/SearchCaseScreens/FilingNumberSearch';
import FIRSearch from '../Screens/SearchCaseScreens/FIRSearch';
import AdvocateSearch from '../Screens/SearchCaseScreens/AdvocateSearch';
import ActSearch from '../Screens/SearchCaseScreens/ActSearch';
import CaseTypeSearch from '../Screens/SearchCaseScreens/CaseTypeSearch';
import CaveatSearch from '../Screens/SearchCaseScreens/CaveatSearch';
import PreTrial from '../Screens/SearchCaseScreens/PreTrial';
import AdvocateRegistration from '../Screens/AdvocateRegistration';
import ListCase from '../Screens/ListCase';
// Stack Navigator for individual tabs
const Stack = createNativeStackNavigator();



const HomeIcon = ({ isFocused, ...props }) => (
  <AntDesign name="home" size={!isFocused ? 20 : 30} color={!isFocused ? "#ddd" : "#333333"} />
);

const CaseStatusIcon = ({ isFocused, ...props }) => (
  <Octicons name="law" size={!isFocused ? 20 : 30} color={!isFocused ? "#ddd" : "#333333"} />

);

const CauseIcon = ({ isFocused, ...props }) => (
  <AntDesign name="filetext1" size={!isFocused ? 20 : 30} color={!isFocused ? "#ddd" : "#333333"} />
);

const MyCasesIcon = ({ isFocused, ...props }) => (
  <MaterialCommunityIcons name="briefcase-account-outline" size={!isFocused ? 20 : 30} color={!isFocused ? "#ddd" : "#333333"} />
)

const AboutIcon = ({ isFocused, ...props }) => (
<AntDesign name="infocirlceo" size={!isFocused ? 20 : 30} color={!isFocused ? "#ddd" : "#333333"}/>)

const TermIcon = ({ isFocused, ...props }) => (
<AntDesign name="infocirlceo" size={!isFocused ? 20 : 30} color={!isFocused ? "#ddd" : "#333333"}/>

)

const LoginIcon = ({ isFocused, ...props }) => (
<AntDesign name="login" size={!isFocused ? 20 : 30} color={!isFocused ? "#ddd" : "#333333"} />
)

// const Header = (props) => (
//   <>
//     <ImageBackground
//       style={[props.style, styles.header]}
//       source={require('../assets/law.png')}
//     />
//     <Divider />
//   </>
// );




// Bottom Tab Navigator
const Tab = createBottomTabNavigator();

const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={{ backgroundColor: '#333333', flexDirection: 'row', height: 70, alignItems: 'center' }}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        let iconName;

        if (route.name === 'Home') iconName = 'home';
        else if (route.name === 'Case Status') iconName = 'balance-scale';
        else if (route.name === 'Cause List') iconName = 'list';
        else if (route.name === 'My Cases') iconName = 'briefcase';

        return (
          <TouchableOpacity
            key={index}
            activeOpacity={0.7}
            onPress={() => navigation.navigate(route.name)}
            style={{
              flex: 1,
              alignItems: 'center',
              paddingVertical: 10,
              justifyContent: 'center',
            }}
          >
            {/* Gold Top Indicator */}
            {isFocused && (
              <View
                style={{
                  position: 'absolute',
                  top: -3,
                  width: '50%', // Adjust width to fit icon width
                  height: 4,
                  backgroundColor: '#FFD700', // Gold Indicator
                  borderRadius: 2,
                }}
              />
            )}

            {/* Icon */}
            <FontAwesome5 name={iconName} size={isFocused?25:20} color={isFocused ? '#FFD700' : '#FFFFFF'} />

            {/* Text */}
            <Text allowfontScaling={false} style={{ color: isFocused ? '#FFD700' : '#FFFFFF', fontSize: 12, marginTop: 5 }}>
              {route.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

function BottomTabNavigator() {
  return (
    <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
      <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Tab.Screen name="Case Status" component={CaseStatus} options={{ headerShown: false }} />
      <Tab.Screen name="Cause List" component={CauseList} options={{ headerShown: false }} />
      <Tab.Screen name="My Cases" component={MyCases} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

function StackNavigator() {


  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={DrawerNavigator} options={{ headerShown: false }} />
    <Stack.Screen name="Case Number" component={CNSearchScreen} options={{ headerShown: true,title:"Search By Case Number" }}  />
    <Stack.Screen name="Party Name" component={PartyNameSearch} options={{ headerShown: true,title:"Search By Party Name" }}  />
    <Stack.Screen name="Filing Number" component={FilingNumberSearch} options={{ headerShown: true,title:"Search By Filing Number" }} />
    <Stack.Screen name="FIR Number" component={FIRSearch} options={{ headerShown: true,title:"Search By FIR Number" }}  />
    <Stack.Screen name="Advocate" component={AdvocateSearch} options={{ headerShown: true,title:"Search By Advocate" }}  />
    <Stack.Screen name="Act" component={ActSearch} options={{ headerShown: true,title:"Search By Act Type" }} />
    <Stack.Screen name="Case Type" component={CaseTypeSearch} options={{ headerShown: true,title:"Search By Case Type" }}  />
    <Stack.Screen name="Caveat" component={CaveatSearch} options={{ headerShown: true,title:"Caveat Search" }}  />
    <Stack.Screen name="Pre Trial Application" component={PreTrial} options={{ headerShown: true,title:"Search By Pre Trial Application" }}  />
    <Stack.Screen name="AdvocateRegistration" component={AdvocateRegistration} options={{ headerShown:false}}  />
    <Stack.Screen name="ListCase" component={ListCase} options={{ headerShown:false }}  />


    </Stack.Navigator>
  );
}





// Drawer Navigator
const Drawer = createDrawerNavigator();

const CustomDrawerContent = ({ navigation, state }) => {
  const activeRoute = state.routes[state.index].name;

  const menuItems = [
    { name: 'Home', icon: HomeIcon },
    { name: 'Case Status', icon: CaseStatusIcon },
    { name: 'Cause List', icon: CauseIcon },
    { name: 'My Cases', icon: MyCasesIcon },
    { name: 'About Us', icon: AboutIcon },
    { name: 'Terms & Conditions', icon: TermIcon },
    { name: 'Login', icon: LoginIcon },
  ];

  return (
    <View style={styles.drawerContainer}>
      {menuItems.map((item, index) => (
        <>
          <TouchableOpacity
          key={index}
          style={[styles.menuItem, activeRoute === item.name && styles.activeItem]}
          onPress={() => navigation.navigate(item.name)}
        >
          {item.icon({ isFocused: activeRoute === item.name })}
          <Text allowfontScaling={false} style={[styles.menuText, activeRoute === item.name && styles.activeText]}>
            {item.name}
          </Text>
        </TouchableOpacity>
        <Divider></Divider>
        </>
      
      ))}
    </View>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: { backgroundColor: '#333333', width: 250 },
        headerShown: false,
      }}
    >
      <Drawer.Screen name="Home" component={BottomTabNavigator} />
      <Drawer.Screen name="Case Status" component={CaseStatus} />
      <Drawer.Screen name="Cause List" component={CauseList} />
      <Drawer.Screen name="My Cases" component={MyCases} />
      <Drawer.Screen name="About Us" component={AboutScreen} />
      <Drawer.Screen name="Terms & Conditions" component={TermsScreen} />
      <Drawer.Screen name="Login" component={Login} />
    </Drawer.Navigator>
  );
};

// Main Navigation Container
export default function AppNavigation() {
  return (
    <NavigationContainer>
<StackNavigator></StackNavigator>
  {/* <DrawerNavigator /> */}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    resizeMode: 'contain',
    height: 150,
    width: 150,
    alignItems: "center",
    justifyContent: "center"
  },
  drawerContainer: {
    flex: 1,
    backgroundColor: '#333333',
    paddingTop: 50,
    paddingHorizontal: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginVertical: 12,
    
  },
  menuText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 10,
  },
  activeText: {
    color: '#111',
    fontWeight: 700,
  },
  activeItem: {
    backgroundColor: 'rgba(255, 215, 0, 0.9)',
    borderLeftWidth: 4,
    borderLeftColor: '#FFD700',
  },
})
