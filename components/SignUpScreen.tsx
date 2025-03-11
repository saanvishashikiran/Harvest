import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Button } from "react-native-paper";



const SignUpScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} style = {styles.logo} />

      <View style={styles.card}>
        <Text style={styles.title}>Sign Up</Text>

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
          />
        </View>

        <TextInput
          style={styles.inputFull}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.text}>Profile Picture</Text>
        <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.image} />
          ) : (
            <Text style={styles.imageText}>Upload Image</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.text}>Are you a Coffee Farmer or Picker?</Text>
        <View style={styles.roleSelection}>
          <TouchableOpacity
            style={[
              styles.roleButton,
              role === "farmer" && styles.selectedRole,
            ]}
            onPress={() => setRole("farmer")}
          >
            <Text style={styles.buttonText}>Coffee Farmer</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.roleButton,
              role === "picker" && styles.selectedRole,
            ]}
            onPress={() => setRole("picker")}
          >
            <Text style={styles.buttonText}>Coffee Picker</Text>
          </TouchableOpacity>
        </View>

        <Button
          mode="contained"
          style={styles.confirmButton}
          onPress={() => {}}
        >
          Confirm
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4E3",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#DDE5B6",
    width: "90%",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#3F6939",
    textAlign: "center",
    marginBottom: 15,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    width: "48%",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  inputFull: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2D5015",
    marginTop: 10,
  },
    text: {
        fontSize: 16,
        color: "#2D5015",
        marginTop: 10,
        fontWeight: "bold",
    },
  imagePicker: {
    width: "100%",
    height: 100,
    backgroundColor: "#B6C197",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 10,
  },
  imageText: {
    color: "#5A5A5A",
    fontSize: 14,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
  },
  roleSelection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  roleButton: {
    width: "48%",
    padding: 12,
    backgroundColor: "#5A7045",
    borderRadius: 5,
    alignItems: "center",
  },
  selectedRole: {
    backgroundColor: "#3F6939",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  confirmButton: {
    marginTop: 15,
    backgroundColor: "#477943",
  },
  logo: {
    width: 150,
    height: 50,
    resizeMode: "contain",
    marginBottom: 20,
    alignSelf: "center",
  },
});

export default SignUpScreen;
