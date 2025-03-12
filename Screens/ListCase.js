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
import * as ImageManipulator from 'expo-image-manipulator';

import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import axios from "axios";
import { api } from "../ApiUrl";

// const courtType = ["High Court", "District Court"];
const courtName = ["option 1", "option 2", "option 3"];
// const caseType = ["option 1", "option 2", "option 3"];

const ListCase = ({ navigation }) => {

  const { control, handleSubmit, setValue, watch, formState: { errors }, } = useForm();
  const [whoAreYou, setWhoAreYou] = useState("plaintiff");

  const [courtType,setCourtType]= useState([])
  const [selectCourtTypeName,setSelectCourtTypeName]= useState(new IndexPath(0))


  const [images, setImages] = useState(null);

  const [allCourtNames,setAllCourtNames]= useState([])
  const [selectedCourtIndex, setSelectedCourtIndex] = useState(new IndexPath(0));
  // const [selectCourtNames, setSelectCourtNames] = useState([]);

const [caseTypes,setAllCaseTypes]=useState([])
const [selectedCaseType,setSelectedCaseType]= useState(new IndexPath(0))
 
  const [selectedStateIndex, setSelectedStateIndex] = useState(new IndexPath(0));
  const [selectedDistrictIndex, setSelectedDistrictIndex] = useState(new IndexPath(0));
  const [allStates, setAllStates] = useState([]);
  const [allDistricts,setAllDistricts]= useState([])

  const [documents,setDocuments]= useState(null)


   const courtTypeName= courtType[selectCourtTypeName.row]?.name || 'Select a court type'
  const selectedStateName =  allStates[selectedStateIndex.row]?.name || 'Select a State';
  const selectedDistrictName =  allDistricts[selectedDistrictIndex.row]?.name || 'Select a District';
  const selectedCourtName= allCourtNames[selectedCourtIndex.row]?.name || 'Select Court Name'
const caseTypeName= caseTypes[selectedCaseType.row]?.name || 'Select Case type'

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });
    console.log(result)

    if (!result.canceled) {
      const resizedImage = await ImageManipulator.manipulateAsync(
        result.assets[0].uri,
        [{ resize: { width: 300 } }], 
        { compress: 0.6, format: ImageManipulator.SaveFormat.JPEG } 
      );
  console.log(resizedImage)
     
      setImages(resizedImage.uri);
    }
  };

  const deleteImage = (index) => {
    // const updatedImages = images.filter((_, i) => i !== index);
    setImages(null);
  };


  const uploadDocuments = async () => {
    try {
     
      const uniqueName = `Doc_${Math.floor(Math.random() * 1000)}.jpg`;
  
      const formData = new FormData();
      formData.append('image', {
        uri: images, 
        type: 'image/jpeg', 
        name: uniqueName, 
      });
  
      const response = await axios.post(`${api}/uploadImage`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        params: {
          imgName: uniqueName, 
        },
      });
  
      if (response.data.imageUrl) {

        setDocuments(uniqueName)
       
        return uniqueName;
      } else {
  
        Alert.alert('Error', 'Failed to upload Document');
        return false;
      }
    } catch (error) {
      console.error('Documents upload failed:', error);
      Alert.alert('Error', 'There was an error uploading the documents.');
      return false;
    }
  };
  

  const onSubmit = async(data) => {
    if (!images) {
      Alert.alert('Error', 'Please upload your documents.');
      return;
    }

    const docRes= await uploadDocuments(images)
    console.log(docRes)

    console.log("Form Data:", { ...data, whoAreYou,images });

    const stateId = allStates[selectedStateIndex.row]?.sid;
    const districtId = allDistricts[selectedDistrictIndex.row]?.did;
    const courtTypeId = courtType[selectCourtTypeName.row]?.court_id;
    const caseTypeId= caseTypes[selectedCaseType.row]?.case_id
    const courtNameId= allCourtNames[selectedCourtIndex.row]?.courtnew_id || allCourtNames[selectedCourtIndex.row]?.courtdist_id 
    console.log(stateId,districtId,courtTypeId,caseTypeId)
    const case_list_id = `CAS_${Math.floor(Math.random() * 1000)}`;
    const results= {
      case_list_id:case_list_id,
      way:whoAreYou,
      court_type_id:courtTypeId,
      court_name_id:courtNameId,
      state_id:courtType[selectCourtTypeName.row]?.name== "District Court"?stateId:null,
      districtId:courtType[selectCourtTypeName.row]?.name== "District Court"? districtId :null,
      case_number:data.caseNumber,
      case_type:caseTypes[selectedCaseType.row]?.case_id,
      name:data.name,
      mobile_number:data.mobile,
      email:data.email,
      address:data.address,
      upload_document:docRes,

    }
    try {
      const response = await axios.post(`${api}/case-list`, results);
      if (response.status === 201) {
        alert('Case added successfully');
      } else {
        alert('Failed to add case');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Error submitting case');
    }
  };


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

  useEffect(() => {
    const fetchDistricts = async () => {
      if (allStates.length === 0) return; 
      const selectedStateId = allStates[selectedStateIndex.row]?.sid;
      
      if (!selectedStateId) return;

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

  const getCourtType=async()=>{
      try{
         const res= await axios.get("http://192.168.0.110:3005/legal/court_type")
         const data= res.data
         setCourtType(data)
      }
      catch(err){
        console.log(err.message)
      }
  }

  useEffect(()=>{
    getCourtType()
  },[])



  const getDistrictCourtName = async () => {
    const stateId = allStates[selectedStateIndex.row]?.sid;
    const districtId = allDistricts[selectedDistrictIndex.row]?.did;
    const courtTypeId = courtType[selectCourtTypeName.row]?.court_id;
  
    try {
      const res = await axios.get(
        `${api}/DistrictCourtNames`,
        { params: { sid: stateId, did: districtId, court_id: courtTypeId } } 
      );
      setAllCourtNames(res.data)
    } catch (err) {
      console.log(err.message, "147");
    }
  };
  const getHighCourtName = async () => {
    const courtTypeId = courtType[selectCourtTypeName.row]?.court_id;
  
    try {
      const res = await axios.get(
        `${api}/HighCourtNames`,
        { params: { court_id: courtTypeId } } 
      );
      setAllCourtNames(res.data)
    } catch (err) {
      console.log(err.message, "147");
    }
  };

  const getCaseTypes = async () => {
    const courtTypeId = courtType[selectCourtTypeName.row]?.court_id;
  
    try {
      const res = await axios.get(
        `${api}/caseType`,
        { params: { court_id: courtTypeId } } 
      );
setAllCaseTypes(res.data)
    } catch (err) {
      console.log(err.message, "147");
    }
  };
  
  useEffect(()=>{
    if(courtType[selectCourtTypeName.row]?.name== "District Court"){
      getDistrictCourtName()

    }
    else{
      getHighCourtName()
    }
  },[selectedStateName,selectCourtTypeName,])

  useEffect(()=>{
    getCaseTypes()
  },[courtTypeName])

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
        value={courtTypeName}
        selectedIndex={selectCourtTypeName}
        onSelect={(index) => {
          setSelectCourtTypeName(index);
          onChange(courtType[index.row].name);
        }}

        style={[styles.input, { marginTop: 10, backgroundColor: "#fff" }]}
      >
        {
        courtType.length!=0 &&
        courtType.map((court, index) => (
          <SelectItem key={court.court_id} title={court.name} />
        ))
        
        }
      </Select>
      {errors.court && <Text style={styles.errorText}>{errors.court.message}</Text>}
    </>
  )}
/>


            {courtType[selectCourtTypeName.row]?.name== "District Court" && (
                   <>

    <Controller
                     control={control}
                     name="state"
                     rules={{ required: "State is required" }}
                     render={({ field: { onChange } }) => (
                       <>
                         <Select
                           label="State"
                           size="large"
                           status="warning"
                           style={styles.select}
                           placeholder="Select a State"
                           value={selectedStateName}
                           selectedIndex={selectedStateIndex}
                           onSelect={(index) => {
                             setSelectedStateIndex(index);
                             onChange(allStates[index.row].name); 
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
                         size="large"
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
        // multiSelect={true}
        value={ selectedCourtName}
        selectedIndex={selectedCourtIndex}
        onSelect={(index) => {
          setSelectedCourtIndex(index);
        
        onChange(allCourtNames[index.row].name);
        }}
        style={[styles.input, { marginTop: 10, backgroundColor: "#fff" }]}
      >
        {
         allCourtNames.length!==0 &&
        allCourtNames.map((court, index) => (
          <SelectItem key={index} title={court.name} />
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
        value={caseTypeName}
        selectedIndex={selectedCaseType}
        onSelect={(index) => {
          setSelectedCaseType(index);
          onChange(caseTypes[index.row].name);
        }}
        style={[styles.input, { marginTop: 10, backgroundColor: "#fff" }]}
      >
        {
        caseTypes.length!==0 && 
        caseTypes.map((caseType, index) => (
          <SelectItem key={caseType.case_id} title={caseType.name} />
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

          {/* {images && (
            <FlatList
              data={images}
              showsHorizontalScrollIndicator={false}
              horizontal
                 keyExtractor={(item, index) => index.toString()}
                
              renderItem={({ item, index }) => (
                <View style={styles.imageContainer}>
                  <Image source={{ uri: item }} style={styles.image} />
                  {/* Delete Button */}
                  {/* <TouchableOpacity
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
          )} */} 
          {console.log(images)}
          {images && 
          
          <View style={styles.imageContainer}>
          <Image source={{ uri: images }} style={styles.image} />
          {/* Delete Button */}
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => deleteImage()}
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
        </View>}

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
    width: 100,
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
  },
  imageContainer:{
alignItems:"center"   ,
justifyContent:"center" 
  }
});

export default ListCase;
