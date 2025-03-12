import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import { TextInput, Text, RadioButton } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import {
  Select,
  SelectItem,
  Divider,
  Datepicker,
  IndexPath,
} from "@ui-kitten/components";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5, FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import { api } from "../ApiUrl";

export default function AdvocateRegistration({ navigation }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [gender, setGender] = useState("");
  const [image, setImage] = useState(null);
  const [date, setDate] = useState("");
  const [err, setErr] = useState([]);
  const [advImg, setAdvImg] = useState(null);

  const [educationOptions, setEducationOptions] = useState([]);
  const [experienceOptions, setExperienceOptions] = useState([]);

  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: currentYear - 1969 }, (_, i) =>
    (1970 + i).toString()
  );

  const [selectedEducation, setSelectedEducation] = useState(null);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedCourtType, setSelectedCourtType] = useState(null);
  const [allCourtNames, setAllCourtNames] = useState([]);
  const [selectedCourtIndex, setSelectedCourtIndex] = useState(
    new IndexPath(0)
  );
  const [expertiseOptions, setExpertiseOptions] = useState([]);
  const [selectedExpertise, setSelectedExpertise] = useState([]);

  const CalendarIcon = () => (
    <FontAwesome
      name="calendar"
      size={24}
      color="#8F9BB3"
      style={{ marginRight: 10 }}
    />
  );

  const [selectedStateIndex, setSelectedStateIndex] = useState(
    new IndexPath(0)
  );
  const [selectedDistrictIndex, setSelectedDistrictIndex] = useState(
    new IndexPath(0)
  );
  const [allStates, setAllStates] = useState([]);
  const [allDistricts, setAllDistricts] = useState([]);
  const [courtType, setCourtType] = useState([]);
  const [selectCourtTypeName, setSelectCourtTypeName] = useState(
    new IndexPath(0)
  );
  const courtTypeName =
    courtType[selectCourtTypeName.row]?.name || "Select a court type";
  const selectedStateName =
    allStates[selectedStateIndex.row]?.name || "Select a State";
  const selectedDistrictName =
    allDistricts[selectedDistrictIndex.row]?.name || "Select a District";
  const selectedCourtName =
    allCourtNames[selectedCourtIndex.row]?.name || "Select Court Name";

  const getExpertiseOptions = async () => {
    try {
      const res = await axios.get(`${api}/expertise`);
      const data = res.data;
      setExpertiseOptions(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const getExperienceOptions = async () => {
    try {
      const res = await axios.get(`${api}/experience`);
      const data = res.data;
      setExperienceOptions(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const getEducationOptions = async () => {
    try {
      const res = await axios.get(`${api}/qualification`);
      const data = res.data;

      setEducationOptions(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getEducationOptions();
    getExpertiseOptions();
    getExperienceOptions();
  }, []);

  const getCourtType = async () => {
    try {
      const res = await axios.get("http://192.168.0.110:3005/legal/court_type");
      const data = res.data;

      setCourtType(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getCourtType();
  }, []);

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

  const getDistrictCourtName = async () => {
    const stateId = allStates[selectedStateIndex.row]?.sid;
    const districtId = allDistricts[selectedDistrictIndex.row]?.did;
    const courtTypeId = courtType[selectCourtTypeName.row]?.court_id;

    try {
      const res = await axios.get(`${api}/DistrictCourtNames`, {
        params: { sid: stateId, did: districtId, court_id: courtTypeId },
      });
      setAllCourtNames(res.data);
    } catch (err) {
      console.log(err.message, "147");
    }
  };
  const getHighCourtName = async () => {
    const courtTypeId = courtType[selectCourtTypeName.row]?.court_id;

    try {
      const res = await axios.get(`${api}/HighCourtNames`, {
        params: { court_id: courtTypeId },
      });
      setAllCourtNames(res.data);
    } catch (err) {
      console.log(err.message, "147");
    }
  };

  useEffect(() => {
    if (courtType[selectCourtTypeName.row]?.name == "District Court") {
      getDistrictCourtName();
    } else {
      getHighCourtName();
    }
  }, [selectedStateName, selectCourtTypeName]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      // console.log(result.assets);
      setImage(result.assets[0].uri);
      setValue("image", result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    try {
      const uniqueName = `ADC_${Math.floor(Math.random() * 1000)}.jpg`;

      const formData = new FormData();
      formData.append("image", {
        uri: image,
        type: "image/jpeg",
        name: uniqueName,
      });

      const response = await axios.post(`${api}/uploadImage`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        params: {
          imgName: uniqueName,
        },
      });

      if (response.data.imageUrl) {
        setAdvImg(uniqueName);

        return uniqueName;
      } else {
        Alert.alert("Error", "Failed to upload Document");
        return false;
      }
    } catch (error) {
      console.error("Documents upload failed:", error);
      Alert.alert("Error", "There was an error uploading the documents.");
      return false;
    }
  };

  const onSubmit = async (data) => {
    console.log("submit",data);
    let uploadRes = null;
    if (image) {
      uploadRes = await uploadImage();
    }

    const results = {
      advct_id: `ADV_${Math.floor(Math.random() * 10000)}`,
      name: data.name,
      mobileNumber: data.mobile,
      email: data.email,
      dob: data.dob,
      gender: data.gender,
      wcrn: data.wardRegNumber,
      currentAddress: data.currentAddress,
      city: data.city,
      heducation: educationOptions[selectedEducation?.row]?.qid,
      pyear: data.passOutYear,
      exp: experienceOptions[selectedExperience?.row]?.exy_id,
      courtType: courtType[selectCourtTypeName?.row]?.court_id,
      state_id:
        courtType[selectCourtTypeName?.row]?.name === "District Court"
          ? allStates[selectedStateIndex.row]?.sid
          : null,
      districtId:
        courtType[selectCourtTypeName?.row]?.name === "District Court"
          ? allDistricts[selectedDistrictIndex.row]?.did
          : null,
      pcName:
        allCourtNames[selectedCourtIndex?.row]?.courtnew_id ||
        allCourtNames[selectedCourtIndex?.row]?.courtdist_id,
      expertise: data.expertise?.map((item) => item.exp_id) || [],
      uploadDocument: uploadRes,
    };

    try {
      const response = await axios.post(`${api}/add-advocate`, results);

      if (response.status === 201) {
        alert("Registered successfully");
      } else {
        alert("Failed to add Advocate");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Error registering");
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View
        style={{
          flexDirection: "row",
          width: Dimensions.get("screen").width,
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginLeft: 5 }}
        >
          <Ionicons name="arrow-back-circle-sharp" size={35} color="#edae49" />
        </TouchableOpacity>
        <View>
          <Text
            allowFontScaling={false}
            style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}
          >
            {" "}
            Advocate Registration
          </Text>
        </View>
      </View>
      <Divider style={{ marginTop: 10, marginBottom: 10 }} />

      {/* Name */}
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <TextInput
            theme={{
              colors: {
                primary: "#edae49", 
                text: "#e09f3e",
              },
            }}
            label="Full Name"
            value={value}
            onChangeText={onChange}
            mode="outlined"
            style={styles.input}
          />
        )}
        rules={{
          required: "Enter your name",
        }}
      />
      {errors.name && (
        <Text style={styles.errorText}>{errors.name.message}</Text>
      )}
      {/* Mobile */}
      <Controller
        control={control}
        name="mobile"
        render={({ field: { onChange, value } }) => (
          <TextInput
            theme={{
              colors: {
                primary: "#edae49",
                text: "#e09f3e", 
              },
            }}
            label="Mobile"
            keyboardType="phone-pad"
            value={value}
            onChangeText={onChange}
            mode="outlined"
            style={styles.input}
          />
        )}
        rules={{
          required: "Enter your mobile number",
          pattern: {
            value: /^[6-9]\d{9}$/,
            message: "Invalid mobile number",
          },
        }}
      />
      {errors.mobile && (
        <Text style={styles.errorText}>{errors.mobile.message}</Text>
      )}

      {/* Email */}
      <Controller
        control={control}
        name="email"
        rules={{
          required: "Enter your email",
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: "Enter a valid email",
          },
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            theme={{
              colors: {
                primary: "#edae49", 
                text: "#e09f3e", 
              },
            }}
            label="Email"
            keyboardType="email-address"
            value={value}
            onChangeText={onChange}
            mode="outlined"
            style={styles.input}
          />
        )}
      />
      {errors.email && (
        <Text style={styles.errorText}>{errors.email.message}</Text>
      )}
      {/* Date of Birth */}

      <Controller
        control={control}
        name="dob"
        rules={{ required: "Date of Birth is required" }}
        render={({ field: { onChange, value } }) => (
          <Datepicker
            size="large"
            status="warning"
            placeholder="D.O.B"
            date={value}
            min={new Date(1900, 0, 1)}
            max={new Date()}
            onSelect={onChange}
            accessoryRight={CalendarIcon}
          />
        )}
      />

      {errors.dob && <Text style={styles.errorText}>{errors.dob.message}</Text>}
      {/* Gender */}
      <Text style={{ marginTop: 5 }}>Gender:</Text>
      <Controller
        control={control}
        name="gender"
        rules={{ required: "Please select your gender" }}
        render={({ field: { onChange, value } }) => (
          <RadioButton.Group
            onValueChange={(val) => {
              setGender(val);
              onChange(val);
            }}
            value={value}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <RadioButton color="#e9c46a" value="Male" />
              <Text>Male</Text>
              <RadioButton color="#e9c46a" value="Female" />
              <Text>Female</Text>
              <RadioButton color="#e9c46a" value="Other" />
              <Text>Other</Text>
            </View>
          </RadioButton.Group>
        )}
      ></Controller>
      {errors.gender && (
        <Text style={styles.errorText}>{errors.gender.message}</Text>
      )}

      {/* Ward Counseling Registration Number */}
      <Controller
        control={control}
        name="wardRegNumber"
        rules={{ required: "Enter your Reg. number" }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            theme={{
              colors: {
                primary: "#edae49",
                text: "#e09f3e",
              },
            }}
            label="Ward counseling Reg. Number"
            value={value}
            onChangeText={onChange}
            mode="outlined"
            style={styles.input}
          />
        )}
      />
      {errors.wardRegNumber && (
        <Text style={styles.errorText}>{errors.wardRegNumber.message}</Text>
      )}
      {/* Current Address */}
      <Controller
        control={control}
        name="currentAddress"
        rules={{
          required: "Enter your address",
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            theme={{
              colors: {
                primary: "#edae49",
                text: "#e09f3e",
              },
            }}
            label="Current Address"
            value={value}
            onChangeText={onChange}
            mode="outlined"
            multiline
            style={styles.input}
          />
        )}
      />
      {errors.currentAddress && (
        <Text style={styles.errorText}>{errors.currentAddress.message}</Text>
      )}

      {/* City */}
      <Controller
        control={control}
        name="city"
        rules={{
          required: "Enter your city",
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            theme={{
              colors: {
                primary: "#edae49", 
                text: "#e09f3e", 
              },
            }}
            label="City"
            value={value}
            onChangeText={onChange}
            mode="outlined"
            style={styles.input}
          />
        )}
      />
      {errors.city && (
        <Text style={styles.errorText}>{errors.city.message}</Text>
      )}

      {/* Higher Education */}
      <Controller
        control={control}
        name="education"
        rules={{ required: "Select your higher education" }}
        render={({ field: { onChange } }) => (
          <Select
            label="Higher Education"
            size="large"
            placeholder="Select Education"
            value={
              selectedEducation !== null
                ? educationOptions[selectedEducation.row].name
                : "Select Education"
            }
            selectedIndex={selectedEducation}
            onSelect={(index) => {
              setSelectedEducation(index);
              onChange(educationOptions[index.row]);
            }}
            status="warning"
            style={styles.input}
          >
            {educationOptions.length != 0 &&
              educationOptions.map((option, index) => (
                <SelectItem key={option.qid} title={option.name} />
              ))}
          </Select>
        )}
      />
      {errors.education && (
        <Text style={styles.errorText}>{errors.education.message}</Text>
      )}

      {/* Passout Year */}
      <Controller
        control={control}
        name="passOutYear"
        rules={{ required: "Select your passout year" }}
        render={({ field: { onChange } }) => (
          <Select
            label="Passout Year"
            size="large"
            placeholder="Select Year"
            value={
              selectedYear !== null
                ? yearOptions[selectedYear.row]
                : "Select Passout Year"
            }
            selectedIndex={selectedYear}
            onSelect={(index) => {
              setSelectedYear(index);
              onChange(yearOptions[index.row]);
            }}
            status="warning"
            style={styles.input}
          >
            {yearOptions.map((year, index) => (
              <SelectItem key={index} title={year} />
            ))}
          </Select>
        )}
      />
      {errors.passOutYear && (
        <Text style={styles.errorText}>{errors.passOutYear.message}</Text>
      )}

      {/* Court Type */}
      <Controller
        control={control}
        name="court"
        rules={{ required: "Select court type" }}
        render={({ field: { onChange } }) => (
          <Select
            label="Court Type"
            size="large"
            placeholder="Select Court Type"
            value={courtTypeName}
            selectedIndex={selectCourtTypeName}
            onSelect={(index) => {
              setSelectCourtTypeName(index);
              onChange(courtType[index.row].name);
            }}
            status="warning"
            style={styles.input}
          >
            {courtType.length != 0 &&
              courtType.map((court, index) => (
                <SelectItem key={court.court_id} title={court.name} />
              ))}
          </Select>
        )}
      />
      {errors.court && (
        <Text style={styles.errorText}>{errors.court.message}</Text>
      )}

      {courtType[selectCourtTypeName.row]?.name == "District Court" && (
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
                {errors.state && (
                  <Text style={styles.errorText}>{errors.state.message}</Text>
                )}
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
                    setSelectedDistrictIndex(index);
                    onChange(allDistricts[index.row].name);
                  }}
                  disabled={
                    allDistricts.length === 0 && selectedStateName !== null
                  }
                >
                  {allDistricts.length > 0
                    ? allDistricts.map((district) => (
                        <SelectItem key={district.did} title={district.name} />
                      ))
                    : [
                        <SelectItem
                          key="loading"
                          title="Loading districts..."
                          disabled
                        />,
                      ]}
                </Select>
                {errors.district && (
                  <Text style={styles.errorText}>
                    {errors.district.message}
                  </Text>
                )}
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
                value: /^[0-9]{6}$/, 
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
                {errors.pin && (
                  <Text style={styles.errorText}>{errors.pin.message}</Text>
                )}
              </>
            )}
          />
        </>
      )}

      {/* Practice Court (Multi-Select) */}
      <Controller
        control={control}
        name="practiceCourts"
        rules={{ required: "Select your expertise" }}
        render={({ field: { onChange } }) => (
          <Select
            status="warning"
            size="large"
            label="Practice Court"

            value={selectedCourtName}
            selectedIndex={selectedCourtIndex}
            onSelect={(index) => {
              setSelectedCourtIndex(index);

              onChange(allCourtNames[index.row].name);
            }}
            style={[styles.input, { marginTop: 10, backgroundColor: "#fff" }]}
          >
            {allCourtNames.length !== 0 &&
              allCourtNames.map((court, index) => (
                <SelectItem key={index} title={court.name} />
              ))}
          </Select>
        )}
      ></Controller>

      {errors.practiceCourts && (
        <Text style={styles.errorText}>{errors.practiceCourts.message}</Text>
      )}

      {/* Experience */}
      <Controller
        control={control}
        name="experience"
        rules={{ required: "Select your experience" }}
        render={({ field: { onChange } }) => (
          <Select
            label="Experience (Years)"
            size="large"
            placeholder="Select Experience"
            value={
              selectedExperience !== null
                ? experienceOptions[selectedExperience.row].name
                : "Select Experience"
            }
            selectedIndex={selectedExperience}
            onSelect={(index) => {
              setSelectedExperience(index);
              onChange(experienceOptions[index.row]);
            }}
            status="warning"
            style={styles.input}
          >
            {experienceOptions.map((list, index) => (
              <SelectItem key={list.exy_id} title={list.name} />
            ))}
          </Select>
        )}
      />
      {errors.experience && (
        <Text style={styles.errorText}>{errors.experience.message}</Text>
      )}

      {/* Expertise */}
      <Controller
        control={control}
        name="expertise"
        rules={{ required: "Select your expertise" }}
        render={({ field: { onChange } }) => (
          <Select
            label="Expertise"
            size="large"
            multiSelect={true}
            placeholder="Select your expertise"
            value={selectedExpertise
              .map((index) => expertiseOptions[index.row].name)
              .join(", ")}
            selectedIndex={selectedExpertise}
            onSelect={(index) => {
              setSelectedExpertise(index);

              const selectedValues = index.map((i) => expertiseOptions[i.row]);

              onChange(selectedValues);
            }}
            status="warning"
            style={styles.input}
          >
            {expertiseOptions.map((list, index) => (
              <SelectItem key={list.exp_id} title={list.name} />
            ))}
          </Select>
        )}
      />
      {errors.expertise && (
        <Text style={styles.errorText}>{errors.expertise.message}</Text>
      )}

      {/* Upload Image */}
      <Text>Upload Image:</Text>

      {err.image && <Text style={styles.errorText}>{err.image}</Text>}

      <TouchableOpacity style={{ marginVertical: 10 }}>
        {image ? (
          <TouchableOpacity
            style={{ alignItems: "center", flexDirection: "row" }}
          >
            <Image
              source={{ uri: image }}
              style={{ width: 120, height: 120, resizeMode: "contain" }}
            />
            <TouchableOpacity onPress={() => setImage(null)}>
              <Text allowFontScaling={false} style={{ textAlign: "center" }}>
                {" "}
                <FontAwesome5 name="trash" size={24} color="#555555" />{" "}
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={pickImage}
            style={[styles.button, styles.uploadButton]}
          >
            <MaterialIcons name="cloud-upload" size={20} color="#ffffff" />
            <Text allowFontScaling={false} style={styles.buttonText}>
              {" "}
              Upload
            </Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>

      {/* Submit Button */}
      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        style={[styles.button, styles.submitButton]}
      >
        <Text allowFontScaling={false} style={styles.buttonText}>
          Submit
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  input: {
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  uploadButton: {
    backgroundColor: "#e9c46a",
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: "#333333", 
  },

  buttonText: {
    color: "#ffffff", 
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  select: {
    marginBottom: 10,
  },
});
