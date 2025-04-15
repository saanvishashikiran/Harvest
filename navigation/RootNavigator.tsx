import React, { useEffect, useMemo } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ActivityIndicator, View } from "react-native";
import { useAuth } from "../hooks/useAuth";
import AuthNavigator from "./AuthNavigator";
import FarmerStackNav from "./FarmerStackNav";
import PickerTabScreens from "./PickerTabScreens";

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
          <FarmerStackNav />
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
