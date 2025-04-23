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
import { supabase } from "../../../lib/supabase";

type FarmerProps = {
  rating?: number;
};


const FarmerPersonalProfile = (props: FarmerProps) => {
  const [first_name, setFirstName] = React.useState("");
  const [last_name, setLastName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [profile, setImage] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !user) return;

      const uuid = user.id;

      const { data: accountData, error: accountError } = await supabase
        .from("accounts")
        .select("first_name, last_name, phone, email")
        .eq("uuid", uuid)
        .single();

      if (!accountError && accountData) {
        setFirstName(accountData.first_name || "");
        setLastName(accountData.last_name || "");
        setPhone(accountData.phone || "");
        setEmail(accountData.email || "");
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


  const { error: updateError } = await supabase
    .from("accounts")
    .update({
      first_name: first_name,
      last_name: last_name,
      phone: phone,
      email: email,
    })
    .eq("uuid", uuid);

  
  if (!updateError) {
    Alert.alert("Success", "Profile updated.");
    console.log(phone, email, first_name, last_name);
  } else {
    Alert.alert("Error", "Could not update profile.");
    console.log(updateError);
  }
};

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
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Sign out error:", error.message);
    Alert.alert("Error signing out");
  } else {
    Alert.alert("Signed out!");
  }
  };


  // FIX LOGO POSITIONING and other styling issues
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
          <TouchableOpacity onPress={changeImage} style={styles.photoButton}>
            <Text style={styles.photoButtonText}>Change Photo</Text>
          </TouchableOpacity>
          <View style={styles.infoBox}>
            <Text style={styles.textStyled}>First Name</Text>
            <TextInput
              style={styles.textBox}
              onChangeText={setFirstName}
              value={first_name}
            />
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.textStyled}>Last Name</Text>
            <TextInput
              style={styles.textBox}
              onChangeText={setLastName}
              value={last_name}
            />
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.textStyled}>Phone Number</Text>
            <TextInput
              style={styles.textBox}
              onChangeText={(text) => {
                if (/^\d*$/.test(text)) {
                  setPhone(text);
                }
              }}
              value={phone}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.textStyled}>Email</Text>
            <TextInput
              style={styles.textBox}
              onChangeText={setEmail}
              value={email}
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

export default FarmerPersonalProfile;

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
    marginLeft: 25,
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
    marginTop: 17,
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
  descripBox: {
    height: 70,
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
  star: {
    marginTop: 14,
    marginLeft: 155,
  },
});
