import { View, Text, Dimensions, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';

const width = Dimensions.get('screen').width;

const HowToUse = () => {
  const steps = [
    {
      id: 0,
      step: "a",
      content: "Use settings option in side menu to manage your cases from majority of the High Courts or District Courts or Both.",
    },
    {
      id: 1,
      step: "b",
      content: "If you know the CNR Number of the case, enter the 16 alphanumeric CNR Number without any (hyphen) or space."
    },
    {
      id: 2,
      step: "c",
      content: "On Clicking the search button, the current status and entire history of the case will be shown."
    },
    {
      id: 3,
      step: "d",
      content: "You can also search by Party Name, Advocate Name, FIR Number, Filing Number, Act, Case Type, etc."
    },
    {
      id: 4,
      step: "e",
      content: "Click on case number to view current status, entire history and orders/judgements delivered  in the case."
    },
    {
      id: 5,
      step: "f",
      content: "When you view the history of the case you have option to Save the case and create your own portfolio of cases."
    },
    {
      id: 6,
      step: "g",
      content: "For Future reference, your saved cases can be seen in My cases."
    },
  ];


  const renderUseList = ({ item }) => {
    return (
      <TouchableOpacity style={styles.listContainer} key={item.id}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text allowFontScaling={false}>{item.step}. </Text>
          <Text allowFontScaling={false} style={styles.textContent}>{item.content}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ marginTop: 20, alignItems: "center" }}>
      <View style={{ width: width * 0.9 }}>
        <View style={{ backgroundColor: "#333333", padding: 12, justifyContent: "center" }}>
          <Text allowFontScaling={false} style={{ color: "#FFFFFF" }}>
            <AntDesign name="questioncircle" size={15} color="white" /> How to use
          </Text>
        </View>
        <FlatList
          data={steps}
          renderItem={renderUseList}
          keyExtractor={(item) => item.id.toString()} // Convert ID to string
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    borderWidth: 1,
    borderColor: "#f0f0f0",
    padding: 10,
    margin: 0,
    justifyContent: "center",
    backgroundColor: "#f9f9f9", // Light background color for better visibility
    marginBottom: 10, // Add some space between list items
  },
  textContent: {
    fontSize: 12,
    letterSpacing: 1,
    textAlign: "justify",
    flexWrap: "wrap", // Allow the text to wrap
    flex: 1, // Allow content to take available space within the container
  }
});

export default HowToUse;
