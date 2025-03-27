import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUpScreen from "../components/auth/SignUpScreen";
import LoginScreen from "../components/auth/LoginScreen";

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
};
const RootStack = createNativeStackNavigator({
  initialRouteName: "Home",
  screens: {
    SignUp: SignUpScreen,
    Login: LoginScreen,
  },
});

export default AuthNavigator;
