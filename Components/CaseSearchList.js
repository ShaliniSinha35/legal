import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import React from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
const CaseSearchList = ({navigation}) => {
console.log(navigation.getState())
  const lists = [
    {
      id: 0,
      name: "Case Number",
      icon: <AntDesign name="infocirlce" size={24} color="#333333" />,
      url:"CNSearchScreen"
    },
    {
      id: 1,
      name: "Party Name",
      icon: <FontAwesome name="group" size={24} color="#333333" />,
      url:"PartyNameSearch"
    },
    {
      id: 2,
      name: "Filing Number",
      icon: <AntDesign name="filetext1" size={24} color="#333333" />,
      url:"FilingNumberSearch"
    },
    {
      id: 3,
      name: "FIR Number",
      icon: <AntDesign name="filetext1" size={24} color="#333333" />,
      url:"FIRSearch"
    },
    {
      id: 4,
      name: "Advocate",
      icon: <FontAwesome name="user" size={24} color="#333333" />,
      url:"AdvocateSearch"
    },
    {
      id: 5,
      name: "Act",
      icon: <FontAwesome name="legal" size={24} color="#333333" />,
      url:"ActSearch"
    },
    {
      id: 6,
      name: "Case Type",
      icon: <FontAwesome name="files-o" size={24} color="#333333" />,
      url:"CaseTypeSearch"
    },
    // {
    //   id: 7,
    //   name: "Caveat",
    //   icon: <MaterialCommunityIcons name="file-search" size={24} color="#333333" />,
    //   url:"CaveatSearch"
    // },
    // {
    //   id: 8,
    //   name: "Pre Trial Application",
    //   icon: <MaterialIcons name="gavel" size={24} color="#333333" />,
    //   url:"PreTrial"
    // },
  ];

  const renderSearchList = ({ item }) => {
    return (
      <TouchableOpacity onPress={()=>navigation.navigate(item.name)} style={styles.listContainer} key={item.id}>
        <View style={{ flexDirection: "row", gap: 20, padding: 10 }}>
           <Text allowFontScaling={false} >{item.icon}</Text>
           <Text allowFontScaling={false} >{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <FlatList
      scrollEnabled
        data={lists}
        renderItem={renderSearchList}
        keyExtractor={(item) => item.id.toString()} // Convert ID to string
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 8,
    borderRadius: 8, // Rounded corners
    margin: 8,
    backgroundColor: "#f9f9f9", // Light background color for better visibility
  },
});

export default CaseSearchList;
