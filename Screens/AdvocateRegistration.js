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
  const [gender, setGender] = useState("");
  const [image, setImage] = useState(null);
  const [selectedCourts, setSelectedCourts] = useState([]);
  const [date, setDate] = useState("");
  const [err, setErr] = useState([]);
  const courtOptions = ["option 1", "option 2", "option 3", "option 4"];
  const courtType = ["High Court", "District Court"];

  // const educationOptions = ["LLB", "LLM", "Diploma in Law", "Other"];
  const [educationOptions, setEducationOptions] = useState([]);
  const experienceOptions = [
    "Less than 1 year",
    "1 year",
    "2 years",
    "More than 2 years",
  ];

  // Generate Passout Year Options (1970 - current year)
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: currentYear - 1969 }, (_, i) =>
    (1970 + i).toString()
  );

  // State for Select Inputs
  const [selectedEducation, setSelectedEducation] = useState(null);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedCourtType, setSelectedCourtType] = useState(new IndexPath(0));

  const expertiseOptions = [
    "Criminal Law",
    "Civil Law",
    "Corporate Law",
    "Family Law",
    "Other",
  ];
  const [selectedExpertise, setSelectedExpertise] = useState([]);

  const CalendarIcon = () => (
    <FontAwesome
      name="calendar"
      size={24}
      color="#8F9BB3"
      style={{ marginRight: 10 }}
    />
  );

  // Pick an image
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

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const validateForm = () => {
    let err = {};

    console.log(image, gender, date, "54");

    if (!image) {
      err.image = "Upload your image";
    }
    if (!date) {
      err.dob = "Enter your D.O.B";
    }
    if (!gender) {
      err.gender = "Enter your gender";
    }

    console.log(err);
    setErr({ ...err });

    // If there are errors, return false, otherwise return true
    if (Object.keys(err).length > 0) {
      return false;
    } else {
      return true;
    }
  };

  // useEffect(() => {
  //   validateForm();
  // }, [onSubmit]);

  const onSubmit = (data) => {
    console.log("submit");
    console.log(validateForm());
    if (validateForm()) {
      console.log("Form Submitted", data);
    } else {
      console.log("not validated");
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
  }, []);

  const [selectedStateIndex, setSelectedStateIndex] = useState(
    new IndexPath(0)
  );
  const [selectedDistrictIndex, setSelectedDistrictIndex] = useState(
    new IndexPath(0)
  );
  const [allStates, setAllStates] = useState([]);
  const [allDistricts, setAllDistricts] = useState([]);

  const selectedStateName =
    allStates[selectedStateIndex.row]?.name || "Select a State";
  const selectedDistrictName =
    allDistricts[selectedDistrictIndex.row]?.name || "Select a District";

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
    <ScrollView contentContainerStyle={styles.container}>
      {/* {console.log(err)} */}

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
                primary: "#edae49", // Change focused outline color
                text: "#e09f3e", // Change text color
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
                primary: "#edae49", // Change focused outline color
                text: "#e09f3e", // Change text color
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
                primary: "#edae49", // Change focused outline color
                text: "#e09f3e", // Change text color
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

      <Datepicker
        size="large"
        status="warning"
        placeholder="D.O.B"
        date={date}
        min={new Date(1900, 0, 1)}
        max={new Date()}
        onSelect={(nextDate) => setDate(nextDate)}
        accessoryRight={CalendarIcon}
      />
      {console.log(err, "263")}

      {err.dob && <Text style={styles.errorText}>{err.dob}</Text>}
      {/* Gender */}
      <Text style={{ marginTop: 5 }}>Gender:</Text>
      <Controller
        control={control}
        name="gender"
        rules={{ required: "Please select your gender" }}
        render={({ field: { onChange, value } }) => (
          <RadioButton.Group
            onValueChange={(val) => onChange(val)}
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
      {err.gender && <Text style={styles.errorText}>{err.gender.message}</Text>}

      {/* Ward Counseling Registration Number */}
      <Controller
        control={control}
        name="wardRegNumber"
        render={({ field: { onChange, value } }) => (
          <TextInput
            theme={{
              colors: {
                primary: "#edae49", // Change focused outline color
                text: "#e09f3e", // Change text color
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
                primary: "#edae49", // Change focused outline color
                text: "#e09f3e", // Change text color
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
      {/* <Controller
        control={control}
        name="city"
        rules={{
          required: "Enter your city",
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            theme={{
              colors: {
                primary: "#edae49", // Change focused outline color
                text: "#e09f3e", // Change text color
              },
            }}
            label="City"
            value={value}
            onChangeText={onChange}
            mode="outlined"
            style={styles.input}
          />
        )}
      /> */}
      {/* {errors.city && (
        <Text style={styles.errorText}>{errors.city.message}</Text>
      )} */}

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
            {educationOptions.map((option, index) => (
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
            value={courtType[selectedCourtType.row]}
            selectedIndex={selectedCourtType}
            onSelect={(index) => {
              setSelectedCourtType(index);
              onChange(courtType[index.row]);
            }}
            status="warning"
            style={styles.input}
          >
            {courtType.map((title, index) => (
              <SelectItem key={index} title={title} />
            ))}
          </Select>
        )}
      />
      {errors.court && (
        <Text style={styles.errorText}>{errors.court.message}</Text>
      )}

      {courtType[selectedCourtType.row] == "District Court" && (
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
            }}
          >
            {allStates.map((state) => (
              <SelectItem key={state.sid} title={state.name} />
            ))}
          </Select>
          {console.log(allStates)}

          {/* District Select Dropdown */}
          <Select
            label="District"
            style={styles.select}
            status="warning"
            placeholder="Select a District"
            value={selectedDistrictName}
            selectedIndex={selectedDistrictIndex}
            onSelect={(index) => {
              setSelectedDistrictIndex(index);
            }}
            disabled={allDistricts.length === 0 && selectedStateName !== null}
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

          <Controller
            control={control}
            name="pin"
            render={({ field: { onChange, value } }) => (
              <TextInput
                theme={{
                  colors: {
                    primary: "#e9c462", // Change focused outline color
                    text: "#e09f3e", // Change text color
                  },
                }}
                mode="outlined"
                label="PIN Code"
                keyboardType="numeric"
                value={value}
                onChangeText={onChange}
                style={styles.input}
              />
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
            // multiSelect={true}

            value={
              selectedCourts !== null
                ? courtOptions[selectedCourts.row]
                : "Select Practice Court"
            }
            selectedIndex={selectedCourts}
            onSelect={(index) => {
              setSelectedCourts(index);

              onChange(courtOptions[index.row]);
            }}
            style={[styles.input, { marginTop: 10, backgroundColor: "#fff" }]}
          >
            {courtOptions.map((title, index) => (
              <SelectItem key={index} title={title} />
            ))}
          </Select>
        )}
      ></Controller>

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
                ? experienceOptions[selectedExperience.row]
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
            {experienceOptions.map((title, index) => (
              <SelectItem key={index} title={title} />
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
              .map((index) => expertiseOptions[index.row])
              .join(", ")}
            selectedIndex={selectedExpertise}
            onSelect={(index) => {
              setSelectedExpertise(index);

              // Extract the selected expertise values
              const selectedValues = index.map((i) => expertiseOptions[i.row]);

              // Update form state correctly
              onChange(selectedValues);
            }}
            status="warning"
            style={styles.input}
          >
            {expertiseOptions.map((title, index) => (
              <SelectItem key={index} title={title} />
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
    backgroundColor: "#fff", // White background for the whole form
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
    backgroundColor: "#333333", // Background color for Civil button
  },

  buttonText: {
    color: "#ffffff", // Text color
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
