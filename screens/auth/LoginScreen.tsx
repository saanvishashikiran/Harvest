import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import { Button } from "react-native-paper";
import { supabase } from "../../lib/supabase";

const LoginScreen: React.FC<{ navigation: any }> = ({ navigation }) =>{
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      Alert.alert("Login Failed", error.message);
    } else {
      Alert.alert("Success", "Logged in successfully!");
      // TODO: navigate to your main screen if using navigation
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/logo.png")} style={styles.logo} />
      <View style={styles.card}>
        <Text style={styles.title}>Log In</Text>

        <TextInput
          style={styles.inputFull}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <View style={{ position: "relative" }}>
          <TextInput
            style={styles.inputFull}
            placeholder="Password"
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword((prev) => !prev)}
            style={{ position: "absolute", right: 10, top: 12 }}
          >
            <Text>{showPassword ? "🔒" : "👁️"}</Text>
          </TouchableOpacity>
        </View>

        <Button
          mode="contained"
          style={styles.confirmButton}
          loading={loading}
          onPress={handleLogin}
        >
          Log In
        </Button>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.signUpText}>
            Don’t have an account?{" "}
            <Text style={{ fontWeight: "bold" }}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
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
  signUpText: {
    marginTop: 15,
    color: "#3F6939",
    textAlign: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#3F6939",
    textAlign: "center",
    marginBottom: 15,
  },
  inputFull: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    paddingRight: 40,
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

export default LoginScreen;
