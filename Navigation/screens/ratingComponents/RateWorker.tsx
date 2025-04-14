import { View, Text, FlatList, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import Modal from 'react-native-modal';
import RateWorkerProfile from './RateWorkerProfile'; 
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;

const pickerData = Array.from({ length: 5 }, (_, i) => ({
  id: (i + 1).toString(),
  name: `Picker ${i + 1}`,
  location: 'Washington, D.C.',
  experience: Math.floor(Math.random() * 15) + 1,
  rating: 0, 
  coordinates: { lat: 38.9072 + i * 0.01, lng: -77.0369 + i * 0.01 },
}));

export default function RateWorker() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPicker, setSelectedPicker] = useState<any>(null);
  const [pickerRatings, setPickerRatings] = useState<{ [id: string]: number }>({});

  const navigation = useNavigation();

  const openProfile = (picker: any) => {
    setSelectedPicker(picker);
    setModalVisible(true);
  };

  const closeProfile = () => {
    setModalVisible(false);
    setSelectedPicker(null);
  };

  const handleSubmitRating = (rating: number) => {
    if (selectedPicker) {
      setPickerRatings((prev) => ({
        ...prev,
        [selectedPicker.id]: rating,
      }));
      Alert.alert('Success', 'Rating has been successfully recorded.');
      closeProfile();
    }
  };

  const renderStars = (count: number) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Text key={i} style={{ color: i <= count ? 'gold' : 'lightgray', fontSize: 16 }}>★</Text>
      );
    }
    return stars;
  };

  const renderItem = ({ item }: any) => {
    const rating = pickerRatings[item.id] || 0;

    let backgroundColor = '#ffffff';
    if (item.experience >= 15) backgroundColor = '#5F8250';
    else if (item.experience >= 10) backgroundColor = '#699866';
    else if (item.experience >= 5) backgroundColor = '#8A9B6F';
    else if (item.experience >= 2) backgroundColor = '#8ea37a';
    else backgroundColor = '#B6C59D';

    return (
      <View style={[styles.card, { backgroundColor }]}>
        <View style={styles.imagePlaceholder} />
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.location}>Based in {item.location}</Text>
        <Text style={styles.experience}>{item.experience} years of experience</Text>
        <View style={styles.stars}>
          {renderStars(rating)}
        </View>
        <TouchableOpacity onPress={() => openProfile(item)} style={styles.button}>
          <Text style={styles.buttonText}>Rate worker</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 10 }}>
          <Image source={require('../../../assets/logo.png')} style={styles.logo} resizeMode="contain" />
        </View>
        <FlatList
          data={pickerData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
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
          <RateWorkerProfile
            worker={selectedPicker}
            onClose={closeProfile}
            isVisible={modalVisible}
            onSubmit={handleSubmitRating}
          />
        )}
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  logo: {
    width: 170,
    height: 70,
    alignSelf: 'center',
    marginTop: -45,
    marginBottom: 5,
  },
  card: {
    width: windowWidth * 0.45,
    margin: 10,
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  name: { fontSize: 16, fontWeight: 'bold', color: '#fff', marginBottom: 4, textAlign: 'center', fontFamily: 'Roboto Regular' },
  location: { color: '#fff', fontSize: 12, textAlign: 'center', fontFamily: 'Roboto Regular' },
  experience: { color: '#fff', marginBottom: 8, fontSize: 12, textAlign: 'center', fontFamily: 'Roboto Regular' },
  stars: { flexDirection: 'row', marginBottom: 8 },
  button: {
    marginTop: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#477943',
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 12, fontFamily: 'Roboto Regular' },
  imagePlaceholder: {
    width: 64,
    height: 64,
    backgroundColor: '#ccc',
    borderRadius: 32,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modal: {
    justifyContent: 'flex-start',
    marginTop: 50,
    marginHorizontal: 0,
    marginBottom: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 10,
  },
  backButton: {
    marginRight: 10,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: '#B6C59D',
  },
  backButtonText: {
    fontSize: 14,
    color: '#333',
    fontFamily: 'Roboto Regular',
  },
});
