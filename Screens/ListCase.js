import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { TextInput, Button, RadioButton, Text } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";
import {
  Divider,
  IndexPath,
  Select,
  SelectGroup,
  SelectItem,
} from "@ui-kitten/components";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import axios from "axios";
import { api } from "../ApiUrl";

const courtType = ["High Court", "District Court"];
const courtName = ["option 1", "option 2", "option 3"];
const caseType = ["option 1", "option 2", "option 3"];

const ListCase = ({ navigation }) => {

  const { control, handleSubmit, setValue, watch, formState: { errors }, } = useForm();
  const [whoAreYou, setWhoAreYou] = useState("plaintiff");
  const [images, setImages] = useState([]);
  const [selectedCourts, setSelectedCourts] = useState(new IndexPath(0));
  const [selectCourtNames, setSelectCourtNames] = useState([]);
  const [selectedCaseType,setSelectedCaseType]= useState(new IndexPath(0))

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true, // Allows multiple image selection
      quality: 1,
    });

    if (!result.canceled) {
      setImages([...images, ...result.assets.map((img) => img.uri)]); // Add new images to the array
    }
  };

  const deleteImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  const onSubmit = (data) => {
    console.log("Form Data:", { ...data, whoAreYou,images });
  };


  
  const [selectedStateIndex, setSelectedStateIndex] = useState(new IndexPath(0));
  const [selectedDistrictIndex, setSelectedDistrictIndex] = useState(new IndexPath(0));
  const [allStates, setAllStates] = useState([]);
  const [allDistricts,setAllDistricts]= useState([])


  const selectedStateName =  allStates[selectedStateIndex.row]?.name || 'Select a State';
  const selectedDistrictName =  allDistricts[selectedDistrictIndex.row]?.name || 'Select a District';

  // 🔹 Fetch States on Component Mount
  useEffect(() => {
    const getAllStates = async () => {
      try {
        const res = await axios.get(`${api}/states`);
        setAllStates(res.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    getAllStates();
  }, []);

  // 🔹 When a state is selected, reset district selection and fetch new b    districts
  useEffect(() => {
    const fetchDistricts = async () => {
      if (allStates.length === 0) return; // Ensure states are loaded
      const selectedStateId = allStates[selectedStateIndex.row]?.sid;
      if (!selectedStateId) return;

      // ✅ Keep district dropdown enabled while data is being fetched
      setAllDistricts([]);
      setSelectedDistrictIndex(new IndexPath(0));

      try {
        const res = await axios.get(`${api}/districts?sid=${selectedStateId}`);
        setAllDistricts(res.data);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchDistricts();
  }, [selectedStateIndex, allStates]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableOpacity
          style={{ marginLeft: 10 }}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back-circle-sharp" size={30} color="#e9c46a" />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 10,
            gap: 5,
          }}
        >
          <View>
            <Text
              allowFontScaling={false}
              style={{ fontSize: 22, fontWeight: "bold", textAlign: "center" }}
            >
              LIST YOUR CASE
            </Text>
          </View>
        </View>

        <Divider
          style={{
            marginTop: 5,
            marginBottom: 10,
            backgroundColor: "#e9c462",
            height: 2,
          }}
        />

        <View style={styles.container}>
          {/* Who Are You? */}
          <Text allowFontScaling={false} style={styles.label}>
            Who Are You?
          </Text>
          <Controller
  control={control}
  name="whoAreYou"
  rules={{ required: "Please select who you are" }}
  render={({ field: { onChange, value } }) => (
    <>
      <RadioButton.Group onValueChange={(val) => onChange(val)} value={value}>
        <View style={styles.radioGroup}>
          <RadioButton.Item
            color="#e9c46a"
            label="Plaintiff"
            value="plaintiff"
          />
          <RadioButton.Item
            color="#e9c46a"
            label="Defendant"
            value="defendant"
          />
        </View>
      </RadioButton.Group>
      {errors.whoAreYou && <Text style={styles.errorText}>{errors.whoAreYou.message}</Text>}
    </>
  )}
/>


          {/* court */}

          <Controller
  control={control}
  name="court"
  rules={{ required: "Select court type" }}
  render={({ field: { onChange } }) => (
    <>
      <Select
        status="warning"
        label="Court Type"
        size="large"
        value={courtType[selectedCourts.row]}
        selectedIndex={selectedCourts}
        onSelect={(index) => {
          setSelectedCourts(index);
          onChange(courtType[index.row]);
        }}
        style={[styles.input, { marginTop: 10, backgroundColor: "#fff" }]}
      >
        {courtType.map((title, index) => (
          <SelectItem key={index} title={title} />
        ))}
      </Select>
      {errors.court && <Text style={styles.errorText}>{errors.court.message}</Text>}
    </>
  )}
/>

            {courtType[selectedCourts.row] == "District Court" && (
                   <>

    <Controller
                     control={control}
                     name="state"
                     rules={{ required: "State is required" }}
                     render={({ field: { onChange } }) => (
                       <>
                         <Select
                           label="State"
                           status="warning"
                           style={styles.select}
                           placeholder="Select a State"
                           value={selectedStateName}
                           selectedIndex={selectedStateIndex}
                           onSelect={(index) => {
                             setSelectedStateIndex(index);
                             console.log(allStates[index.row].name)
                             onChange(allStates[index.row].name); // Trigger validation
                           }}
                         >
                           {allStates.map((state) => (
                             <SelectItem key={state.sid} title={state.name} />
                           ))}
                         </Select>
                         {errors.state && <Text style={styles.errorText}>{errors.state.message}</Text>}
                       </>
                     )}
                   />
                 
                   {/* District Select Dropdown */}
                   <Controller
                     control={control}
                     name="district"
                     rules={{ required: "District is required" }}
                     render={({ field: { onChange } }) => (
                       <>
                         <Select
                           label="District"
                           status="warning"
                           style={styles.select}
                           placeholder="Select a District"
                           value={selectedDistrictName}
                           selectedIndex={selectedDistrictIndex}
                           onSelect={(index) => {
                             setSelectedDistrictIndex(index)
                             onChange(allDistricts[index.row].name);
                           }}
                           disabled={allDistricts.length === 0 && selectedStateName !== null}
                         >
                           {allDistricts.length > 0
                             ? allDistricts.map((district) => (
                                 <SelectItem key={district.did} title={district.name} />
                               ))
                             : [<SelectItem key="loading" title="Loading districts..." disabled />]}
                         </Select>
                         {errors.district && <Text style={styles.errorText}>{errors.district.message}</Text>}
                       </>
                     )}
                   />
                 
                   {/* PIN Code Input */}
                   <Controller
                     control={control}
                     name="pin"
                     rules={{
                       required: "PIN Code is required",
                       pattern: {
                         value: /^[0-9]{6}$/, // Adjust regex based on PIN length
                         message: "Enter a valid 6-digit PIN Code",
                       },
                     }}
                     render={({ field: { onChange, value } }) => (
                       <>
                         <TextInput
                           theme={{
                             colors: {
                               primary: "#e9c462",
                               text: "#e09f3e",
                             },
                           }}
                           mode="outlined"
                           label="PIN Code"
                           keyboardType="numeric"
                           value={value}
                           onChangeText={onChange}
                           style={styles.input}
                         />
                         {errors.pin && <Text style={styles.errorText}>{errors.pin.message}</Text>}
                       </>
                     )}
                   />
                 </>
                 
                    )}
          
{/* court name */}
          <Controller
  control={control}
  name="courtname"
  rules={{ required: "Please select at least one court" }}
  render={({ field: { onChange } }) => (
    <>
      <Select
        status="warning"
        label="Court Name"
        size="large"
        multiSelect={true}
        value={selectCourtNames.map((index) => courtName[index.row]).join(", ")}
        selectedIndex={selectCourtNames}
        onSelect={(index) => {
          setSelectCourtNames(index);
             // Extract the selected expertise values
        const selectedValues = index.map((i) => courtName[i.row]);
        
        // Update form state correctly
        onChange(selectedValues);
        }}
        style={[styles.input, { marginTop: 10, backgroundColor: "#fff" }]}
      >
        {courtName.map((title, index) => (
          <SelectItem key={index} title={title} />
        ))}
      </Select>
      {errors.courtname && <Text style={styles.errorText}>{errors.courtname.message}</Text>}
    </>
  )}
/>


          {/* case type */}
   

          <Controller
  control={control}
  name="case"
  rules={{ required: "Select case type" }}
  render={({ field: { onChange } }) => (
    <>
      <Select
        status="warning"
        label="Case Type"
        size="large"
        value={caseType[selectedCaseType.row]}
        selectedIndex={selectedCaseType}
        onSelect={(index) => {
          setSelectedCaseType(index);
          onChange(caseType[index.row]);
        }}
        style={[styles.input, { marginTop: 10, backgroundColor: "#fff" }]}
      >
        {caseType.map((title, index) => (
          <SelectItem key={index} title={title} />
        ))}
      </Select>
      {errors.case && <Text style={styles.errorText}>{errors.case.message}</Text>}
    </>
  )}
/>

        
          {/* Other Inputs */}

          {/* <Controller
            control={control}
            name="firNumber"
            render={({ field: { onChange, value } }) => (
              <TextInput
                theme={{
                  colors: {
                    primary: "#e9c462", // Change focused outline color
                    text: "#e09f3e", // Change text color
                  },
                }}
                mode="outlined"
                label="FIR Number (optional)"
                value={value}
                onChangeText={onChange}
                style={styles.input}
              />
            )}
          />

          <Controller
            control={control}
            name="policeStation"
            render={({ field: { onChange, value } }) => (
              <TextInput
                theme={{
                  colors: {
                    primary: "#e9c462", // Change focused outline color
                    text: "#e09f3e", // Change text color
                  },
                }}
                mode="outlined"
                label="Police Station (optional)"
                value={value}
                onChangeText={onChange}
                style={styles.input}
              />
            )}
          />

          <Controller
            control={control}
            name="city"
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Enter your police station city"
                theme={{
                  colors: {
                    primary: "#e9c462", // Change focused outline color
                    text: "#e09f3e", // Change text color
                  },
                }}
                mode="outlined"
                label="City"
                value={value}
                onChangeText={onChange}
                style={styles.input}
              />
            )}
          /> */}

          <Controller
            control={control}
            name="caseNumber"
            rules={{required:"Enter your case number"}}
            render={({ field: { onChange, value } }) => (
              <TextInput
                theme={{
                  colors: {
                    primary: "#e9c462", // Change focused outline color
                    text: "#e09f3e", // Change text color
                  },
                }}
                mode="outlined"
                label="Case Number"
                value={value}
                onChangeText={onChange}
                style={styles.input}
              />
            )}
          />
          {errors.caseNumber && <Text style={styles.errorText}>{errors.caseNumber.message}</Text>}

          {/* Name */}
          <Controller
  control={control}
  name="name"
  rules={{ required: "Name is required" }}
  render={({ field: { onChange, value } }) => (
    <>
      <TextInput
        theme={{
          colors: {
            primary: "#e9c462",
            text: "#e09f3e",
          },
        }}
        mode="outlined"
        label="Name"
        value={value}
        onChangeText={onChange}
        style={styles.input}
      />
      {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}
    </>
  )}
/>

          {/* Mobile */}
          <Controller
  control={control}
  name="mobile"
  rules={{
    required: "Mobile number is required",
    minLength: { value: 10, message: "Must be at least 10 digits" },
  }}
  render={({ field: { onChange, value } }) => (
    <>
      <TextInput
        mode="outlined"
        label="Mobile"
        keyboardType="phone-pad"
        value={value}
        onChangeText={onChange}
        style={styles.input}
        theme={{ colors: { primary: "#e9c462", text: "#e09f3e" } }}
      />
      {errors.mobile && <Text style={styles.errorText}>{errors.mobile.message}</Text>}
    </>
  )}
/>


          {/* Email */}
          <Controller
  control={control}
  name="email"
  rules={{
    required: "Email is required",
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      message: "Enter a valid email",
    },
  }}
  render={({ field: { onChange, value } }) => (
    <>
      <TextInput
        mode="outlined"
        label="Email"
        keyboardType="email-address"
        value={value}
        onChangeText={onChange}
        style={styles.input}
        theme={{ colors: { primary: "#e9c462", text: "#e09f3e" } }}
      />
      {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
    </>
  )}
/>


          {/* Address */}
          <Controller
  control={control}
  name="address"
  rules={{ required: "Address is required" }}
  render={({ field: { onChange, value } }) => (
    <>
      <TextInput
        mode="outlined"
        label="Address"
        value={value}
        onChangeText={onChange}
        style={styles.input}
        theme={{ colors: { primary: "#e9c462", text: "#e09f3e" } }}
      />
      {errors.address && <Text style={styles.errorText}>{errors.address.message}</Text>}
    </>
  )}
/>


          {/* Upload Image */}

          {images && (
            <FlatList
              data={images}
              showsHorizontalScrollIndicator={false}
              horizontal
                 keyExtractor={(item, index) => index.toString()}
                
              renderItem={({ item, index }) => (
                <View style={styles.imageContainer}>
                  <Image source={{ uri: item }} style={styles.image} />
                  {/* Delete Button */}
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => deleteImage(index)}
                  >
                    <Text
                      allowFontScaling={false}
                      style={{ textAlign: "center" }}
                    >
                      {" "}
                      <FontAwesome5
                        name="trash"
                        size={24}
                        color="#555555"
                      />{" "}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          )}

          <TouchableOpacity onPress={pickImage} style={styles.uploadButton}>
            <MaterialIcons name="cloud-upload" size={20} color="#ffffff" />
            <Text allowFontScaling={false} style={styles.buttonText}>
              {" "}
              Upload Documents
            </Text>
          </TouchableOpacity>

          {/* Submit Button */}
          <TouchableOpacity
            // buttonColor="#333333"
            // mode="contained"
            onPress={handleSubmit(onSubmit)}
            style={styles.Submitbutton}
          >
            <Text
              allowFontScaling={false}
              style={{ color: "#fff", fontSize: 18,textAlign:"center" }}
            >
              SUBMIT CASE
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
    backgroundColor: "#fff",
    paddingTop: 10,
  },
  container: {
    padding: 10,
    backgroundColor: "#fff",
  },
  input: {
    marginBottom: 10,
    backgroundColor: "#fff", // Light gray background
  },
  radioGroup: {
    flexDirection: "row",
    alignItems: "center",
    //justifyContent: "space-between",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  Submitbutton: {
    marginTop: 15,
    paddingVertical: 5,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  uploadButton: {
    backgroundColor: "#e9c46a",
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    marginTop: 10,
    borderRadius: 20,
  },
  Submitbutton: {
    backgroundColor: "#333333", 
    padding:10,
    justifyContent:"center",
    alignItems:"center"
  },

  buttonText: {
    color: "#ffffff", // Text color
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },

  image: {
    height: 150,
    width: 150,
    resizeMode: "contain",
  },
  select:{
    marginBottom:10
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  deleteButton:{
    marginTop:5
  }
});

export default ListCase;
