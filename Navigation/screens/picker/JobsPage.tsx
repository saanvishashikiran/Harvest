import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React from "react";
import Post from "../jobcomponents/Post";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { logToLogBoxAndConsole } from "react-native-reanimated/lib/typescript/logger";

const JobsPage = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Post
          title="Apple Picking"
          date="3/20/20"
          position={400}
          location="Farmington, CT"
          pay={2}
          jobDescription="You can pick anything you want"
        />
        <Post
          title="Tomato Harvesting"
          date="3/22/20"
          position={250}
          location="Hartford, CT"
          pay={3}
          jobDescription="Sort and harvest tomatoes by type"
        />
        <Post
          title="Cucumber Sorting"
          date="3/25/20"
          position={180}
          location="New Haven, CT"
          pay={2.5}
          jobDescription="Sort cucumbers by size for packaging"
        />
        <Post
          title="Berry Basket Packing"
          date="3/27/20"
          position={320}
          location="Bridgeport, CT"
          pay={3.2}
          jobDescription="Pack berry baskets carefully and efficiently"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default JobsPage;

const styles = StyleSheet.create({
  scroll: {},
  imageContainer: {
    marginTop: 3,
    marginLeft: 110,
    marginBottom: -10,
  },
  logo: {
    width: 170,
    height: 70,
    marginBottom: 10,
    marginTop: -10,
  },
});
