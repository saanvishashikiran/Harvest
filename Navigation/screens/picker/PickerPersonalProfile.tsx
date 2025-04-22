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
import DropDownPicker from "react-native-dropdown-picker";
import { supabase } from "../../../lib/supabase";

type PickerProps = {
  rating?: number;
};

const buttonPress = () => {
  Alert.alert("Button pressed!");
};

const PickerPersonalProfile = (props: PickerProps) => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [experience, setExperience] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [bio, setBio] = React.useState("");
  const [profile, setImage] = React.useState<string | null>(null);
  const [open, isOpen] = React.useState(false);
  const [value, setValue] = React.useState(null);
  const [items, setItems] = React.useState([
    { label: "Coffee", value: "coffee" },
    { label: "Tea", value: "tea" },
    { label: "Equipment", value: "equipment" },
    { label: "Splicing", value: "splicing" },
    { label: "Pesticides", value: "pesticides" },
    { label: "Picking", value: "picking" },
  ]);

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

  const signOut = async () => {
    Alert.alert("Signed out!");
    await supabase.auth.signOut(); 
  };
  React.useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !user) return;

      const uuid = user.id;

      // Fetch account info
      const { data: accountData, error: accountError } = await supabase
        .from("accounts")
        .select("first_name, last_name, phone, email, location, experience, bio")
        .eq("uuid", uuid)
        .single();

      console.log("Account data:", accountData);

      if (!accountError && accountData) {
        setFirstName(accountData.first_name || "");
        setLastName(accountData.last_name || "");
        setPhone(accountData.phone || "");
        setEmail(accountData.email || "");
        setExperience(accountData.experience?.toString() || "");
        setLocation(accountData.location || "");
        setBio(accountData.bio || "");
      }

    };

    fetchProfile();
  }, []);

  const updateProfile = async () => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) return;

    const uuid = user.id;

    // Update account info
    const { error: updateError } = await supabase
      .from("accounts")
      .update({
        first_name: firstName,
        last_name: lastName,
        phone: phone,
        email: email,
        skill: value,
        location: location,
        experience: experience,
        bio: bio,
      })
      .eq("uuid", uuid);


    if (!updateError) {
      Alert.alert("Success", "Profile updated.");
    } else {
      Alert.alert("Error", "Could not update profile.");
      console.log(updateError);
    }
  };

  return (
    <View>
      <View style={styles.logoimage}>
        <Image
          source={require("../../../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.bigbox}>
        <View style={styles.bigboxheader}>
          <Text style={styles.bigboxtext}>Profile</Text>
        </View>
        <ScrollView>
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
          <View style={{ flex: 1, flexDirection: "row", marginBottom: 10 }}>
            <View style={styles.star}>
              <Image source={require("../../../photos/Star.png")} />
            </View>
            <Text
              style={{
                marginTop: 15,
                marginLeft: 5,
                fontFamily: "Roboto Regular",
                fontSize: 17,
              }}
            >
              {props.rating}
            </Text>
          </View>
          <TouchableOpacity onPress={changeImage} style={styles.photoButton}>
            <Text style={styles.photoButtonText}>Change Photo</Text>
          </TouchableOpacity>
          <View style={styles.infoBox}>
            <Text style={styles.textStyled}>FIRST NAME</Text>
            <TextInput
              style={styles.textBox}
              onChangeText={setFirstName}
              value={firstName}
            />
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.textStyled}>LAST NAME</Text>
            <TextInput
              style={styles.textBox}
              onChangeText={setLastName}
              value={lastName}
            />
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.textStyled}>PHONE NUMBER</Text>
            <TextInput
              style={styles.textBox}
              onChangeText={setPhone}
              value={phone}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.textStyled}>EMAIL</Text>
            <TextInput
              style={styles.textBox}
              onChangeText={setEmail}
              value={email}
            />
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.textStyled}>EXPERIENCE</Text>
            <TextInput
              style={styles.textBox}
              onChangeText={(text) => {
                if (/^\d*$/.test(text)) {
                  setExperience(text);
                }
              }}
              value={experience}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.textStyled}>LOCATION</Text>
            <TextInput
              style={styles.textBox}
              onChangeText={setLocation}
              value={location}
            />
          </View>
          <View style={styles.dropDown}>
            <Text style={styles.textStyled}>SKILLS</Text>
            <DropDownPicker
              placeholder="Select a Skill"
              open={open}
              value={value}
              items={items}
              setOpen={isOpen}
              setValue={setValue}
              setItems={setItems}
              listMode="SCROLLVIEW"
              style={styles.dropBox}
            />
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.textStyled}>BIOGRAPHY</Text>
            <TextInput
              style={styles.descripBox}
              editable
              multiline
              numberOfLines={4}
              maxLength={350}
              onChangeText={setBio}
              value={bio}
            />
          </View>
          <TouchableOpacity onPress={updateProfile} style={styles.button}>
            <Text style={styles.buttonText}>UPDATE</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={signOut} style={styles.signOutButton}>
            <Text style={styles.buttonText}>SIGN OUT</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

export default PickerPersonalProfile;

const styles = StyleSheet.create({
  signOutButton: {
    backgroundColor: "#a94442",
    borderRadius: 20,
    marginTop: 15,
    width: 130,
    height: 30,
    marginLeft: 110,
    marginBottom: 20,
  },
  logo: {
    width: 170,
    height: 70,
    marginBottom: 0,
  },
  bigbox: {
    height: 610,
    width: 340,
    marginTop: 30,
    backgroundColor: "#C9D9AF",
    marginLeft: 30,
    borderRadius: 10,
  },
  bigboxheader: {
    width: 340,
    height: 50,
    backgroundColor: "#477943",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  bigboxtext: {
    color: "white",
    fontSize: 25,
    marginLeft: 137,
    marginTop: 8,
    fontWeight: 700,
    fontFamily: "Roboto Regular",
  },
  image: {
    marginTop: 25,
    marginLeft: 125,
  },
  textStyled: {
    fontSize: 15,
    fontWeight: 700,
    color: "#477943",
    fontFamily: "Roboto Regular",
  },
  textBox: {
    height: 40,
    width: 295,
    borderWidth: 1,
    padding: 5,
    marginTop: 5,
    backgroundColor: "white",
    borderRadius: 7,
    borderTopWidth: 0,
    borderEndWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  infoBox: {
    marginTop: 10,
    marginLeft: 20,
  },
  button: {
    backgroundColor: "#477943",
    borderRadius: 20,
    marginTop: 15,
    width: 130,
    height: 30,
    marginLeft: 110,
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 12,
    marginLeft: 40,
    marginTop: 7,
    fontWeight: 700,
    fontFamily: "Roboto Regular",
  },
  photoButton: {
    backgroundColor: "#477943",
    marginTop: 5,
    width: 120,
    height: 27,
    marginLeft: 117,
    marginBottom: 5,
    borderRadius: 20,
  },
  photoButtonText: {
    color: "white",
    fontSize: 12,
    marginLeft: 20,
    marginTop: 5,
    fontFamily: "Roboto Regular",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
  },
  logoimage: {
    marginTop: 63,
    marginLeft: 110,
    width: 178,
    height: 40,
  },
  dropDown: {
    marginTop: 10,
    marginLeft: 20,
  },
  dropBox: {
    height: 40,
    width: 295,
    borderWidth: 1,
    padding: 5,
    marginTop: 5,
    marginBottom: 10,
    borderTopWidth: 0,
    borderEndWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  descripBox: {
    height: 70,
    width: 295,
    borderWidth: 1,
    padding: 5,
    marginTop: 5,
    backgroundColor: "white",
    borderRadius: 7,
    fontFamily: "Roboto Regular",
    borderTopWidth: 0,
    borderEndWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  star: {
    marginTop: 14,
    marginLeft: 155,
  },
});
