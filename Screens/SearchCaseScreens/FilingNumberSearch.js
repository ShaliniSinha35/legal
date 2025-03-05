import { View, StyleSheet, Dimensions, ScrollView, Button, TouchableOpacity, Text } from 'react-native';
import React, { useState } from 'react';
import {  Layout, Select, SelectItem, IndexPath, Input } from '@ui-kitten/components';

const width = Dimensions.get('window').width;

const FilingNumberSearch = ({ navigation }) => {
  const [courtComplexIndex, setCourtComplexIndex] = useState(new IndexPath(0));
  const [year, setYear] = useState("");
  const [filingNumber, setFilingNumber] = useState("");



  return (
    <Layout style={{ flex: 1 }}>
   
      <ScrollView>
        <View style={styles.container}>
          <Layout style={styles.inputContainer} level="1">
            <Text allowFontScaling={false} style={{ fontWeight: "bold", fontSize: 15, color: "#333" }}>Court Complex</Text>

            <Select

              size='large'

              selectedIndex={courtComplexIndex}
              onSelect={(index) => setCourtComplexIndex(index)}
            >
              <SelectItem title="Option 1" />
              <SelectItem title="Option 2" />
              <SelectItem title="Option 3" />
            </Select>
          </Layout>




          <Layout style={styles.inputContainer} level="1">
            <Text allowFontScaling={false} style={{ fontWeight: "bold", fontSize: 15, color: "#333" }}>Filing Number</Text>
            <Input
              size='large'

              style={styles.input}
              placeholder="Enter filing number"
              value={filingNumber}
              keyboardType="numeric"
              onChangeText={(nextValue) => setFilingNumber(nextValue)}

            />
          </Layout>

          <Layout style={styles.inputContainer} level="1">
            <Text allowFontScaling={false} style={{ fontWeight: "bold", fontSize: 15, color: "#333" }}>Year</Text>

            <Input
              size='large'
              // label="Year"
              style={styles.input}
              placeholder="Year"
              value={year}
              onChangeText={(nextValue) => setYear(nextValue)}
              keyboardType="numeric"
            />
          </Layout>



          <View style={{ flexDirection: 'row', gap: 10, marginTop: 20, paddingHorizontal: 10 }}>
            <Layout style={styles.Btncontainer} level="1">
              <TouchableOpacity style={[styles.button, styles.goButton]} >
                <Text allowFontScaling={false} style={styles.buttonText}>Go</Text>
              </TouchableOpacity>
            </Layout>

            <Layout style={styles.Btncontainer} level="1">
              <TouchableOpacity style={[styles.button, styles.resetButton]} >
                <Text allowFontScaling={false} style={styles.buttonText}>Reset</Text>
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
    gap: 5
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
  goButton: {
    backgroundColor: '#e9c46a', // Background color for Civil button
  },
  resetButton: {
    backgroundColor: '#555555', // Background color for Criminal button
  },
  buttonText: {
    color: '#ffffff', // Text color
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default FilingNumberSearch;
