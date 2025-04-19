import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";
import { useAuth } from "../hooks/useAuth";
import AuthNavigator from "./AuthNavigator";
import PickerTabScreens from "./PickerTabScreens";
import FarmerTabScreens from "./FarmerTabScreens";

export default function RootNavigator() {
  const { user, role, loading } = useAuth();

  useEffect(() => {
    console.log("Auth Debug:", {
      userExists: !!user,
      authRole: user?.role, 
      customRole: role, 
    });
  }, [user, role]);

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  return (
    <NavigationContainer>
      {user ? (
        role === "farmer" ? (
          <FarmerTabScreens />
        ) : role === "picker" ? (
          <PickerTabScreens />
        ) : (
          <>
            <AuthNavigator />
            {console.warn("No valid role assigned - showing auth screen")}
          </>
        )
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
}
