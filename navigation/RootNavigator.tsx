import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "../hooks/useAuth";
import AuthNavigator from "./AuthNavigator";
import FarmerTabs from "./FarmerTabs";
import PickerTabs from "./PickerTabs";
import { ActivityIndicator, View } from "react-native";

export default function RootNavigator() {
  const { user, role, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {!user ? (
        <AuthNavigator />
      ) : role === "farmer" ? (
        <FarmerTabs />
      ) : (
        <PickerTabs />
      )}
    </NavigationContainer>
  );
}
