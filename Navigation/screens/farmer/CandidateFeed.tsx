import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Image,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect } from "react";
import Modal from "react-native-modal";
import Profile from "./Profile";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { supabase } from "../../../lib/supabase";


const windowWidth = Dimensions.get("window").width;

// const pickerData = Array.from({ length: 30 }, (_, i) => ({
//   id: (i + 1).toString(),
//   name: `Picker ${i + 1}`,
//   location: "Washington, D.C.",
//   experience: Math.floor(Math.random() * 15) + 1,
//   rating: Math.floor(Math.random() * 5) + 1,
//   coordinates: { lat: 38.9072 + i * 0.01, lng: -77.0369 + i * 0.01 },
// }));

export default function CandidateFeed() {
  const route = useRoute();
  const { postId } = route.params as { postId: string };
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPicker, setSelectedPicker] = useState(null);
  const [pickerData, setPickerData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);


  const openProfile = (picker: any) => {
    setSelectedPicker(picker);
    setModalVisible(true);
  };

  const closeProfile = () => {
    setModalVisible(false);
    setSelectedPicker(null);
  };

  const renderStars = (count: number) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Text
          key={i}
          style={{ color: i <= count ? "gold" : "lightgray", fontSize: 16 }}
        >
          ★
        </Text>
      );
    }
    return stars;
  };
  const renderItem = ({ item }: any) => {
    let backgroundColor = "#ffffff";
    if (item.experience >= 15) backgroundColor = "#5F8250";
    else if (item.experience >= 10) backgroundColor = "#699866";
    else if (item.experience >= 5) backgroundColor = "#8A9B6F";
    else if (item.experience >= 2) backgroundColor = "#8ea37a";
    else backgroundColor = "#B6C59D";

    return (
      <View style={[styles.card, { backgroundColor }]}>
        <View style={styles.imagePlaceholder} />
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.location}>Based in {item.location}</Text>
        <Text style={styles.experience}>
          {item.experience} years of experience
        </Text>
        <View style={styles.stars}>{renderStars(item.rating)}</View>
        <TouchableOpacity
          onPress={() => openProfile(item)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>See full profile</Text>
        </TouchableOpacity>
      </View>
    );
  };
const fetchApplicants = async () => {
  const { data, error } = await supabase
    .from("job_applications")
    .select(
      `
      *,
      accounts:picker_id (
        first_name,
        last_name,
        location,
        experience,
        rating,
        skill,
        bio,
        email,
        phone
      )
    `
    )
    .eq("job_id", postId);
console.log("Fetched applicants:", data);
  if (error) {
    console.error("Error fetching applicants:", error);
  } else {
    const mapped = data.map((entry) => ({
      pickerId: entry.picker_id,
      postId: postId,
      name: `${entry.accounts.first_name} ${entry.accounts.last_name}`,
      location: entry.accounts.location,
      experience: entry.accounts.experience,
      rating: entry.accounts.rating,
      coordinates: { lat: 38.9072, lng: -77.0369 }, // Placeholder coordinates
      bio: entry.accounts.bio,
      skill: entry.accounts.skill,
      email: entry.accounts.email,
      phone: entry.accounts.phone,
    }));
    setPickerData(mapped);
  }
  setLoading(false);
};

useEffect(() => {
  fetchApplicants();
}, []);
const onRefresh = async () => {
  setRefreshing(true);
  await fetchApplicants();
  setRefreshing(false);
};

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Image
              source={require("../../../assets/back.png")}
              style={styles.backIcon}
            />
          </TouchableOpacity>
        </View>
        <Image
          source={require("../../../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        {loading ? (
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            Loading candidates...
          </Text>
        ) : pickerData.length === 0 ? (
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            No one has applied to this job yet.
          </Text>
        ) : (
          <FlatList
            data={pickerData}
            renderItem={renderItem}
            keyExtractor={(item) => item.pickerId}
            numColumns={2}
            contentContainerStyle={{ paddingBottom: 20 }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        )}
      </View>
      <Modal
        isVisible={modalVisible}
        onBackdropPress={closeProfile}
        onSwipeComplete={closeProfile}
        swipeDirection="down"
        animationIn="slideInUp"
        animationOut="slideOutUp"
        animationInTiming={400}
        animationOutTiming={300}
        backdropTransitionInTiming={200}
        backdropTransitionOutTiming={200}
        style={styles.modal}
      >
        {selectedPicker && (
          <Profile data={selectedPicker} onClose={closeProfile} />
        )}
      </Modal>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  logo: {
    width: 170,
    height: 70,
    alignSelf: "center",
    marginTop: -40,
    marginBottom: 5,
  },
  card: {
    width: windowWidth * 0.45,
    margin: 10,
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
    textAlign: "center",
    fontFamily: "Roboto Regular",
  },
  location: {
    color: "#fff",
    fontSize: 12,
    textAlign: "center",
    fontFamily: "Roboto Regular",
  },
  experience: {
    color: "#fff",
    marginBottom: 8,
    fontSize: 12,
    textAlign: "center",
    fontFamily: "Roboto Regular",
  },
  stars: { flexDirection: "row", marginBottom: 8 },
  button: {
    marginTop: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#477943",
    borderRadius: 30,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 12, fontFamily: "Roboto Regular" },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 12,
    paddingBottom: 20,
    backgroundColor: "#365b37",
    position: "absolute",
    bottom: 0,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  navIcon: { width: 40, height: 40, tintColor: "#BCDAC6" },
  imagePlaceholder: {
    width: 64,
    height: 64,
    backgroundColor: "#ccc",
    borderRadius: 32,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modal: {
    justifyContent: "flex-start",
    marginTop: 50,
    marginHorizontal: 0,
    marginBottom: 0,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingTop: 10,
  },
  backButton: {
    marginRight: 10,
    marginLeft: -8,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  backIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
    tintColor: "#2C5015",
  },
});
