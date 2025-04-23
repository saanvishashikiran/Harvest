import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import React from "react";
import PagePost from "../jobcomponents/PagePost";
import { SafeAreaView } from "react-native-safe-area-context";

const MyJobsPage = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View style={styles.image}>
        <Image
          source={require("../../../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
      >
        <PagePost
          title="Apple Picking"
          date="3/20/20"
          position={400}
          location="Farmington, CT"
          pay={2}
          jobDescription="You can pick anything you want"
        />
        <PagePost
          title="Tomato Harvesting"
          date="3/22/20"
          position={250}
          location="Hartford, CT"
          pay={3}
          jobDescription="Sort and harvest tomatoes by type"
        />
        <PagePost
          title="Cucumber Sorting"
          date="3/25/20"
          position={180}
          location="New Haven, CT"
          pay={2.5}
          jobDescription="Sort cucumbers by size for packaging"
        />
        <PagePost
          title="Berry Basket Packing"
          date="3/27/20"
          position={320}
          location="Bridgeport, CT"
          pay={3.2}
          jobDescription="Pack berry baskets carefully and efficiently"
        />
        <PagePost
          title="Grape Picking"
          date="3/30/20"
          position={300}
          location="Stamford, CT"
          pay={2.8}
          jobDescription="Pick grapes from the vineyard and sort them"
        />
        <PagePost />
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyJobsPage;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    marginTop: 3,
    marginLeft: 110,
    marginBottom: 60,
    width: 178,
    height: 40,
  },
  logo: {
    width: 170,
    height: 70,
    marginBottom: 0,
    marginTop: -10,
  },
});
