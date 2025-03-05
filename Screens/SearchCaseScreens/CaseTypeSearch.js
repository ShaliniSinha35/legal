import { View, StyleSheet, Dimensions, ScrollView, Button, TouchableOpacity, Text } from 'react-native';
import React, { useState, useMemo } from 'react';
import { Layout, Select, SelectItem, IndexPath, Input } from '@ui-kitten/components';
import RadioGroup from 'react-native-radio-buttons-group';

const width = Dimensions.get('window').width;

const CNSearchScreen = ({ navigation }) => {
  const [courtComplexIndex, setCourtComplexIndex] = useState(new IndexPath(0));
  const [caseType, setCaseType] = useState(new IndexPath(0));
  const [year, setYear] = useState("");

  const [selectedId, setSelectedId] = useState();

  const radioButtons = useMemo(() => ([
    {
      id: '1', // acts as primary key, should be unique and non-empty string
      label: 'Pending',
      value: 'Pending'
    },
    {
      id: '2',
      label: 'Disposed',
      value: 'Disposed'
    },
    {
      id: '3',
      label: 'Both',
      value: 'Both'
    }
  ]), []);


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
            <Text allowFontScaling={false} style={{ fontWeight: "bold", fontSize: 15, color: "#333" }}>Case Type</Text>

            <Select
              size='large'

              selectedIndex={caseType}
              onSelect={(index) => setCaseType(index)}
            >
              <SelectItem title="Option 1" />
              <SelectItem title="Option 2" />
              <SelectItem title="Option 3" />
            </Select>
          </Layout>




          <Layout style={styles.inputContainer} level="1">
            <Text allowFontScaling={false} style={{ fontWeight: "bold", fontSize: 15, color: "#333" }}>Year</Text>

            <Input
              size='large'
              style={styles.input}
              placeholder="Year"
              value={year}
              onChangeText={(nextValue) => setYear(nextValue)}
              keyboardType="numeric"
            />
          </Layout>

          <Layout style={[styles.inputContainer, { marginTop: 5 }]} level="1">

            <RadioGroup
              color='#e9c46a'
              layout='row'
              radioButtons={radioButtons}
              onPress={setSelectedId}
              selectedId={selectedId}
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

export default CNSearchScreen;
