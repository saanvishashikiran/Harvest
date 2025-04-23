import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FarmerTabScreens from "./FarmerTabScreens";
import PickerTabScreens from "./PickerTabScreens";
import AuthNavigator from "./AuthNavigator";
import CandidateFeed from "./screens/farmer/CandidateFeed"; 
import { NavigationContainer } from "@react-navigation/native";
import { ActivityIndicator } from "react-native-paper";
import { useAuth } from "../hooks/useAuth";
import RateWorker from "./screens/ratingComponents/RateWorker"; 


export type StackParamList = {
  CandidateFeed: { postId: string };
  FarmerTabs: undefined;
  PickerTabs: undefined;
  Auth: undefined;
  RateWorker: undefined;
};
const Stack = createNativeStackNavigator<StackParamList>();
export default function RootNavigator() {
  const { user, role, loading } = useAuth();
  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          // Unauthenticated flow
          <Stack.Screen name="Auth" component={AuthNavigator} />
        ) : role === "farmer" ? (
          <>
            <Stack.Screen name="FarmerTabs" component={FarmerTabScreens} />
            <Stack.Screen name="CandidateFeed" component={CandidateFeed} />
            <Stack.Screen name="RateWorker" component={RateWorker} />
          </>
        ) : role === "picker" ? (
          <Stack.Screen name="PickerTabs" component={PickerTabScreens} />
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
