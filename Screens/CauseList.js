import { View, StyleSheet, Dimensions, ScrollView, Button,TouchableOpacity,Text } from 'react-native';
import React, { useContext, useState } from 'react';
import {  Layout, Select, SelectItem, Divider, Datepicker, IndexPath } from '@ui-kitten/components';
import { Header } from '../Components/Header';
import { StateDistrictSelect } from '../Components/StateDistrictSelect';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome from Expo Vector Icons
import { CourtSelect } from '../Components/CourtSelect';
import { AppContext } from '../context/AppContext';
const width = Dimensions.get('window').width;

const CauseList = ({ navigation }) => {
  const [courtComplexIndex, setCourtComplexIndex] = useState(new IndexPath(0));
  const [courtNameIndex, setCourtNameIndex] = useState(new IndexPath(0));
  const [date, setDate] = useState(new Date());

  const CalendarIcon = () => (
    <FontAwesome name="calendar" size={24} color="#8F9BB3" style={{ marginRight: 10 }} />
  );
  const {court}=useContext(AppContext)

  return (
    <Layout style={{ flex: 1 }}>
      <Header navigation={navigation} />
<CourtSelect></CourtSelect>
      <Divider />

 {
      court == "District Court" &&
      <StateDistrictSelect></StateDistrictSelect>

     }

      <Divider />
      <ScrollView>
        <View style={styles.container}>
          <Layout style={styles.inputContainer} level="1">
                        <Text allowFontScaling={false} style={{ fontWeight: "bold", fontSize: 15, color: "#333" }}>Court Complex</Text>
            
            <Select
              // label="Court Complex"
              selectedIndex={courtComplexIndex}
              onSelect={(index) => setCourtComplexIndex(index)}
            >
              <SelectItem title="Option 1" />
              <SelectItem title="Option 2" />
              <SelectItem title="Option 3" />
            </Select>
          </Layout>

          <Layout style={styles.inputContainer} level="1">
          <Text allowFontScaling={false} style={{ fontWeight: "bold", fontSize: 15, color: "#333" }}>Court Name</Text>
         
            <Select
              selectedIndex={courtNameIndex}
              onSelect={(index) => setCourtNameIndex(index)}
            >
              <SelectItem title="Option 1" />
              <SelectItem title="Option 2" />
              <SelectItem title="Option 3" />
            </Select>
          </Layout>

          <View style={styles.container}>
            <Layout style={styles.inputContainer} level="1">
            <Text allowFontScaling={false} style={{ fontWeight: "bold", fontSize: 15, color: "#333" }}>Cause List Date</Text>
             
              <Datepicker
                // label="Cause List Date"
                placeholder="Pick Date"
                date={date}
                onSelect={(nextDate) => setDate(nextDate)}
                accessoryRight={CalendarIcon} // Use Expo Vector Icon here
              />
            </Layout>
          </View>

          <View style={{ flexDirection: 'row', gap: 10, marginTop: 20,paddingHorizontal:10 }}>
      <Layout style={styles.Btncontainer} level="1">
        <TouchableOpacity style={[styles.button, styles.civilButton]} >
           <Text allowFontScaling={false}  style={styles.buttonText}>Civil</Text>
        </TouchableOpacity>
      </Layout>

      <Layout style={styles.Btncontainer} level="1">
        <TouchableOpacity style={[styles.button, styles.criminalButton]} >
           <Text allowFontScaling={false}  style={styles.buttonText}>Criminal</Text>
        </TouchableOpacity>
      </Layout>
    </View>



        </View>
      </ScrollView>


    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  inputContainer: {
    width: width - 20,
    marginTop: 20,
    gap:5
  },
  Btncontainer: {
    flexDirection: 'row',
    alignItems: 'center',


  },
 
  button: {
    paddingHorizontal: 40, // Horizontal padding for width
    paddingVertical: 12, // Vertical padding for height
    borderRadius: 8, // Rounded corners
    justifyContent: 'center',
    alignItems: 'center',
  },
  civilButton: {
    backgroundColor: '#e9c46a', // Background color for Civil button
  },
  criminalButton: {
    backgroundColor: '#333333', // Background color for Criminal button
  },
  buttonText: {
    color: '#ffffff', // Text color
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CauseList;
