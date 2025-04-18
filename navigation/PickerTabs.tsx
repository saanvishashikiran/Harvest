import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import JobsPage from "../screens/picker/JobsPage";
import AddPostPage from "../screens/farmer/AddPostPage";
import EmailPage from "../screens/EmailPage";

const Tab = createBottomTabNavigator();

const PickerTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#477943",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={JobsPage}
        options={{ 
          tabBarIcon: () => (
            <View style={styles.image}>
              <Image source={require("../assets/home.png")} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Add"
        component={AddPostPage}
        options={{
          tabBarIcon: () => (
            <View style={{ marginTop: 25 }}>
              <Image source={require("../assets/feed.png")} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Email"
        component={EmailPage}
        options={{
          tabBarIcon: () => (
            <View style={{ marginTop: 25 }}>
              <Image source={require("../assets/messages.png")} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default PickerTabs;

const styles = StyleSheet.create({
  image: {
    marginTop: 20,
  },
});
