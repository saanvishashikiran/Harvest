import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";

type RateWorkerModalProps = {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (rating: number) => void;
  worker: {
    name: string;
    experience: number;
  };
};

export default function RateWorkerModal({
  isVisible,
  onClose,
  onSubmit,
  worker,
}: RateWorkerModalProps) {
  const [selectedRating, setSelectedRating] = useState(0);

  const handleRate = (rating: number) => {
    setSelectedRating(rating);
  };

  const handleSubmit = () => {
    onSubmit(selectedRating);
    onClose();
    setSelectedRating(0); // reset for next time
  };

  const getBackgroundColor = (experience: number) => {
    if (experience >= 15) return "#5F8250";
    else if (experience >= 10) return "#699866";
    else if (experience >= 5) return "#8A9B6F";
    else if (experience >= 2) return "#8ea37a";
    else return "#B6C59D";
  };

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose} style={styles.modal}>
      <View
        style={[
          styles.container,
          { backgroundColor: getBackgroundColor(worker.experience) },
        ]}
      >
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>

        <View style={styles.profileSection}>
          <View style={styles.imagePlaceholder} />
          <Text style={styles.name}>{worker.name}</Text>
        </View>

        <Text style={styles.prompt}>How would you rate this worker?</Text>

        <View style={styles.starsRow}>
          {[1, 2, 3, 4, 5].map((num) => (
            <TouchableOpacity key={num} onPress={() => handleRate(num)}>
              <Text
                style={[
                  styles.star,
                  selectedRating >= num ? styles.filledStar : styles.emptyStar,
                ]}
              >
                ★
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[
            styles.submitButton,
            selectedRating === 0 && { backgroundColor: "#ccc" },
          ]}
          onPress={handleSubmit}
          disabled={selectedRating === 0}
        >
          <Text style={styles.submitText}>Submit Rating</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: "center",
    margin: 0,
  },
  container: {
    backgroundColor: "#6F7E4D",
    borderRadius: 20,
    padding: 24,
    marginHorizontal: 24,
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 12,
    right: 12,
  },
  closeText: {
    fontSize: 20,
    color: "#fff",
    fontFamily: "Roboto Regular",
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  imagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#ccc",
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    fontFamily: "Roboto Regular",
  },
  prompt: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 12,
    textAlign: "center",
    fontFamily: "Roboto Regular",
  },
  starsRow: {
    flexDirection: "row",
    marginBottom: 20,
  },
  star: {
    fontSize: 32,
    marginHorizontal: 6,
  },
  filledStar: {
    color: "gold",
  },
  emptyStar: {
    color: "lightgray",
  },
  submitButton: {
    backgroundColor: "#365b37",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  submitText: {
    color: "#fff",
    fontWeight: "bold",
    fontFamily: "Roboto Regular",
  },
});
