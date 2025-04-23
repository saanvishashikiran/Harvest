import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { supabase } from "../../../lib/supabase";

type ProfileProps = {
  data: {
    pickerId: string;
    postId: string;
    name: string;
    experience: number;
    location: string;
    rating: number;
    coordinates: { lat: number; lng: number };
    email: string;
    phone: string;
    bio: string;
    skill: string;
  };
  onClose: () => void;
};

export default function Profile({ data, onClose }: ProfileProps) {
  const { name, experience, location, rating, coordinates, email, phone, bio, skill, pickerId, postId} = data;

  const renderStars = (count: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <Text
        key={i}
        style={{ color: i < count ? "gold" : "lightgray", fontSize: 16 }}
      >
        ★
      </Text>
    ));

  const getBackgroundColor = (experience: number) => {
    if (experience >= 15) return "#5F8250";
    else if (experience >= 10) return "#699866";
    else if (experience >= 5) return "#8A9B6F";
    else if (experience >= 2) return "#8ea37a";
    else return "#B6C59D";
  };
const chooseCandidate = async (pickerId: string, postId: string) => {

  const { data: existing, error: checkError } = await supabase
    .from("job_applications")
    .select("status")
    .eq("picker_id", pickerId)
    .eq("job_id", postId)
    .single();

  if (checkError) {
    console.error("Error checking application status:", checkError);
    return;
  }

  if (existing?.status === "accepted") {
    Alert.alert("Already Accepted", "You’ve already accepted this candidate.");
    return;
  }

  const { error: updateError } = await supabase
    .from("job_applications")
    .update({ status: "accepted" })
    .eq("picker_id", pickerId)
    .eq("job_id", postId);

  if (updateError) {
    console.error("Failed to update application status:", updateError);
    return;
  }

  const { data: post, error: postError } = await supabase
    .from("job_posts")
    .select("available_positions")
    .eq("post_id", postId)
    .single();

  if (postError || !post) {
    console.error("Error fetching job post:", postError);
    return;
  }

  const updatedCount = Math.max(0, post.available_positions - 1);

  const { error: updatePostError } = await supabase
    .from("job_posts")
    .update({ available_positions: updatedCount })
    .eq("post_id", postId);

  if (updatePostError) {
    console.error("Error updating job post:", updatePostError);
    return;
  }

  Alert.alert("Success", "Candidate has been accepted!");
};

  return (
    <View
      style={[
        styles.modalContainer,
        { backgroundColor: getBackgroundColor(experience) },
      ]}
    >
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Text style={styles.closeText}>✕</Text>
      </TouchableOpacity>

      <View style={styles.headerRow}>
        <View style={styles.imagePlaceholder} />
        <View style={styles.nameColumn}>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.stars}>{renderStars(rating)}</View>
        </View>
      </View>

      <Text style={styles.description}>{bio || "No bio available."}</Text>

      <View style={{ height: 12 }} />
      <Text style={styles.info}>
        Years of experience: <Text style={styles.bold}>{experience}</Text>
      </Text>
      <Text style={styles.info}>
        Specialties:{" "}
        <Text style={styles.bold}>{skill || "No skill availalbe"}</Text>
      </Text>

      <View style={{ height: 12 }} />
      <Text style={styles.locationText}>
        Based in: <Text style={styles.bold}>{location || "No location available"}</Text>
      </Text>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: coordinates.lat,
          longitude: coordinates.lng,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker
          coordinate={{ latitude: coordinates.lat, longitude: coordinates.lng }}
          title={name}
        />
      </MapView>

      <View style={styles.contactSection}>
        <Text style={styles.contactTitle}>Contact Info</Text>
        <Text style={styles.contactItem}>{phone || "No phone number available"}</Text>
        <Text style={styles.contactItem}>{email || "No email available"}</Text>
      </View>

      <TouchableOpacity
        onPress={() => chooseCandidate(data.pickerId, data.postId)}
        style={styles.chooseButton}
      >
        <Text style={styles.chooseButtonText}>Choose Candidate</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    width: "100%",
    minHeight: "60%",
  },
  closeButton: {
    position: "absolute",
    top: 16,
    left: 16,
    zIndex: 10,
    padding: 8,
  },
  closeText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    fontFamily: "Roboto Regular",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 40,
  },
  imagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#ccc",
    marginRight: 16,
  },
  nameColumn: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
    textAlign: "left",
    fontFamily: "Roboto Regular",
  },
  stars: {
    flexDirection: "row",
  },
  description: {
    fontSize: 14,
    color: "#fff",
    lineHeight: 20,
    textAlign: "left",
    marginBottom: 10,
    fontFamily: "Roboto Regular",
  },
  info: {
    fontSize: 14,
    color: "#fff",
    marginBottom: 4,
    textAlign: "left",
    fontFamily: "Roboto Regular",
  },
  bold: {
    fontWeight: "bold",
    color: "#fff",
  },
  map: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginTop: 5,
  },
  contactSection: {
    marginTop: 20,
  },
  contactTitle: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
    fontFamily: "Roboto Regular",
  },
  contactItem: {
    fontSize: 14,
    color: "#fff",
    marginBottom: 4,
    fontFamily: "Roboto Regular",
  },
  locationText: {
    fontSize: 19,
    color: "#fff",
    marginBottom: 4,
    textAlign: "left",
    fontFamily: "Roboto Regular",
  },
  chooseButton: {
    backgroundColor: "#365b37",
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 20,
    alignSelf: "center",
  },

  chooseButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Roboto Regular",
  },
});
