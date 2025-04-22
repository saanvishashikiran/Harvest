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
import * as ImagePicker from "expo-image-picker";

const buttonPress = () => {
  Alert.alert("Button pressed!");
};

const FarmerInfo = () => {
  const [name, nameChange] = React.useState("");
  const [phoneNumber, phoneChange] = React.useState("");
  const [email, emailChange] = React.useState("");
  const [experience, experienceChange] = React.useState("");
  const [location, locationChange] = React.useState("");
  const [bio, bioChange] = React.useState("");
  const [profile, setImage] = React.useState<string | null>(null);

  const changeImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View>
      <View style={styles.image}>
        {profile ? (
          <Image source={{ uri: profile }} style={styles.profileImage} />
        ) : (
          <Image
            source={{ uri: "../../../photos/BlankUser.png" }}
            style={styles.profileImage}
          />
        )}
      </View>
      <Text
        style={{
          marginLeft: 170,
          marginBottom: 5,
          marginTop: 15,
          fontWeight: 700,
        }}
      >
        5 STARS
      </Text>
      <TouchableOpacity onPress={changeImage} style={styles.photoButton}>
        <Text style={styles.photoButtonText}>Change Photo</Text>
      </TouchableOpacity>
      <View style={styles.infoBox}>
        <Text style={styles.textStyled}>NAME</Text>
        <TextInput
          style={styles.textBox}
          onChangeText={nameChange}
          value={name}
          placeholder="Name"
        />
      </View>
      <View style={styles.infoBox}>
        <Text style={styles.textStyled}>PHONE NUMBER</Text>
        <TextInput
          style={styles.textBox}
          onChangeText={phoneChange}
          value={phoneNumber}
          placeholder="Phone Number"
          keyboardType="numeric"
        />
      </View>
      <View style={styles.infoBox}>
        <Text style={styles.textStyled}>EMAIL</Text>
        <TextInput
          style={styles.textBox}
          onChangeText={emailChange}
          value={email}
          placeholder="Email"
        />
      </View>
      <View style={styles.infoBox}>
        <Text style={styles.textStyled}>YEARS OF EXPERIENCE</Text>
        <TextInput
          style={styles.textBox}
          onChangeText={experienceChange}
          value={experience}
          placeholder="Experience"
        />
      </View>
      <View style={styles.infoBox}>
        <Text style={styles.textStyled}>LOCATION</Text>
        <TextInput
          style={styles.textBox}
          onChangeText={locationChange}
          value={location}
          placeholder="Location"
        />
      </View>
      <View style={styles.infoBox}>
        <Text style={styles.textStyled}>BIOGRAPHY</Text>
        <TextInput
          style={styles.textBox}
          onChangeText={bioChange}
          value={bio}
          placeholder="Biography"
        />
      </View>
      <TouchableOpacity onPress={buttonPress} style={styles.button}>
        <Text style={styles.buttonText}>UPDATE</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FarmerInfo;

const styles = StyleSheet.create({
  image: {
    marginTop: 55,
    marginLeft: 125,
  },
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
    marginLeft: 40,
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
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 10,
    marginLeft: 20,
    borderWidth: 3,
  },
});
