import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { supabase } from "../../lib/supabase";
import DateTimePicker from "@react-native-community/datetimepicker";

const AddPostPage = () => {

  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [availablePositions, setAvailablePositions] = React.useState("");
  const [payRate, setPayRate] = React.useState("");
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = React.useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = React.useState(false);



  const onStartDateChange = (event: any, selectedDate?: Date) => {
    setShowStartDatePicker(false);
    if (selectedDate) setStartDate(selectedDate);
  };

  const onEndDateChange = (event: any, selectedDate?: Date) => {
    setShowEndDatePicker(false);
    if (selectedDate) setEndDate(selectedDate);
  };



  const handleSubmit = async () => {
    try {
      if (!title || !description || !location || !availablePositions || !payRate ||!startDate || !endDate) {
        Alert.alert("Error", "Please fill in all fields");
        return;
      }

      const { data, error } = await supabase.from("posts").insert([
        {
          title: title,
          start_date: startDate.toISOString().split("T")[0],
          end_date: endDate.toISOString().split("T")[0],
          available_positions: availablePositions,
          pay_rate: payRate,
          location: location,
          description: description,
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) {
        console.error("Error inserting post:", error);
        Alert.alert("Error", "Failed to create post. Please try again.");
        return;
      }

      Alert.alert("Success", "Post created successfully!");

      setTitle("");
      setLocation("");
    } catch (error) {
      console.error("Unexpected error handling job post insertion:", error);
      Alert.alert("Error", "An unexpected error occurred. Please try again.");
    }
  };
  // ADD A TITLE FOR SAYIN ADD A POST PAGE OR SOMETHING LIKE THAT // ( i am in integration hell )
  return (
    <ScrollView>
      <View style={styles.logoimage}>
        <Image source={require("../../assets/logo.png")} style ={styles.logo} />
      </View>
      <View style={styles.infoBox}>
        <Text style={styles.textStyled}>TITLE</Text>
        <TextInput
          style={styles.textBox}
          onChangeText={setTitle}
          value={title}
          placeholder="Title"
        />
      </View>
      <View style={styles.infoBox}>
        <Text style={styles.textStyled}>LOCATION</Text>
        <TextInput
          style={styles.textBox}
          onChangeText={setLocation}
          value={location}
          placeholder="Location"
        />
      </View>
      <View style={styles.infoBox}>
        <Text style={styles.textStyled}>DESCRIPTION</Text>
        <TextInput
          style={styles.descripBox}
          editable
          multiline
          numberOfLines={4}
          maxLength={350}
          onChangeText={setDescription}
          value={description}
          placeholder="Description"
        />
      </View>
      <View style={styles.infoBox}>
        <Text style={styles.textStyled}>AVAILABLE POSITIONS</Text>
        <TextInput
          style={styles.textBox}
          onChangeText={setAvailablePositions}
          value={availablePositions}
          placeholder="Available Positions"
        />
      </View>
      <View style={styles.infoBox}>
        <Text style={styles.textStyled}>PAY RATE</Text>
        <TextInput
          style={styles.textBox}
          onChangeText={setPayRate}
          value={payRate}
          placeholder="Pay Rate"
        />
      </View>
      <View style={styles.infoBox}>
        <Text style={styles.textStyled}>START DATE</Text>
        <TouchableOpacity
          onPress={() => setShowStartDatePicker(true)}
          style={styles.dateBox}
        >
          <Text style={styles.dateText}>{startDate.toLocaleDateString()}</Text>
        </TouchableOpacity>
        {showStartDatePicker && (
          <DateTimePicker
            value={startDate}
            mode="date"
            display="default"
            onChange={onStartDateChange}
          />
        )}
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.textStyled}>END DATE</Text>
        <TouchableOpacity
          onPress={() => setShowEndDatePicker(true)}
          style={styles.dateBox}
        >
          <Text style={styles.dateText}>{endDate.toLocaleDateString()}</Text>
        </TouchableOpacity>
        {showEndDatePicker && (
          <DateTimePicker
            value={endDate}
            mode="date"
            display="default"
            onChange={onEndDateChange}
          />
        )}
      </View>
      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>ADD</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddPostPage;

const styles = StyleSheet.create({
  textStyled: {
    fontSize: 15,
    fontWeight: 500,
    color: "#477943",
  },
  textBox: {
    height: 40,
    width: 350,
    borderWidth: 1,
    padding: 5,
    marginTop: 5,
  },
  infoBox: {
    marginTop: 10,
    marginLeft: 20,
  },
  button: {
    backgroundColor: "#477943",
    borderRadius: 20,
    marginTop: 20,
    width: 130,
    height: 30,
    marginLeft: 135,
  },
  buttonText: {
    color: "white",
    fontSize: 12,
    textAlign: "center",
    marginTop: 7,
    fontWeight: 700,
  },
  photoButton: {
    backgroundColor: "#477943",
    marginTop: 5,
    width: 120,
    height: 27,
    marginLeft: 135,
    marginBottom: 5,
    borderRadius: 20,
  },
  photoButtonText: {
    color: "white",
    fontSize: 12,
    marginLeft: 20,
    marginTop: 5,
  },
  logoimage: {
    flex: 1,
    marginTop: 63,
    marginLeft: 110,
    width: 178,
    height: 40,
    marginBottom: 30,
  },
  descripBox: {
    height: 70,
    width: 350,
    borderWidth: 1,
    padding: 5,
    marginTop: 5,
  },
  dateBox: {
    height: 40,
    width: 350,
    borderWidth: 1,
    padding: 5,
    marginTop: 5,
    justifyContent: "center",
  },
  dateText: {
    fontSize: 16,
    color: "#000",
  },
  logo: {
    width: 150,
    height: 50,
    resizeMode: "contain",
    marginBottom: 20,
    alignSelf: "center",
  },
});
