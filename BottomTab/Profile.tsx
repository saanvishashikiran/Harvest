import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

type ProfileProps = {
  data: {
    name: string;
    experience: number;
    location: string;
    rating: number;
    coordinates: { lat: number; lng: number };
  };
  onClose: () => void;
};

export default function Profile({ data, onClose }: ProfileProps) {
  const { name, experience, location, rating, coordinates } = data;

  const renderStars = (count: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <Text key={i} style={{ color: i < count ? 'gold' : 'lightgray', fontSize: 16 }}>★</Text>
    ));

    const getBackgroundColor = (experience: number) => 
    {   if (experience >= 15) return '#5F8250';
        else if (experience >= 10) return '#699866';
        else if (experience >= 5) return '#8A9B6F';
        else if (experience >= 2) return '#8ea37a';
        else return '#B6C59D';
    };
  

  return (
    <View style={[styles.modalContainer, { backgroundColor: getBackgroundColor(experience) }]}>
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

      <Text style={styles.description}>
        Hi! My name is {name}. I have been working in coffee picking for {experience} years. I specialize in long hours, large acres, and dry climates.
      </Text>

      <View style={{ height: 12 }} />
      <Text style={styles.info}>Years of experience: <Text style={styles.bold}>{experience}</Text></Text>
      <Text style={styles.info}>Specialties: <Text style={styles.bold}>Long hours, large acres, dry climates</Text></Text>

      <View style={{ height: 12 }} />
      <Text style={styles.locationText}>Based in: <Text style={styles.bold}>{location}</Text></Text>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: coordinates.lat,
          longitude: coordinates.lng,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker coordinate={{ latitude: coordinates.lat, longitude: coordinates.lng }} title={name} />
      </MapView>

      <View style={styles.contactSection}>
        <Text style={styles.contactTitle}>Contact Info</Text>
        <Text style={styles.contactItem}>+ (123) 456-7890</Text>
        <Text style={styles.contactItem}>picker@example.com</Text>
      </View>

      <TouchableOpacity
        onPress={() => Alert.alert("Success", "Candidate has been successfully chosen")}
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
        width: '100%',
        minHeight: '60%',
      },
  closeButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 10,
    padding: 8,
  },
  closeText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'Roboto Regular',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 40,
  },
  imagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ccc',
    marginRight: 16,
  },
  nameColumn: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
    textAlign: 'left',
    fontFamily: 'Roboto Regular',
  },
  stars: {
    flexDirection: 'row',
  },
  description: {
    fontSize: 14,
    color: '#fff',
    lineHeight: 20,
    textAlign: 'left',
    marginBottom: 10,
    fontFamily: 'Roboto Regular',
  },
  info: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 4,
    textAlign: 'left',
    fontFamily: 'Roboto Regular',
  },
  bold: {
    fontWeight: 'bold',
    color: '#fff',
  },
  map: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginTop: 5,
  },
  contactSection: {
    marginTop: 20,

  },
  contactTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    fontFamily: 'Roboto Regular',
  },
  contactItem: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 4,
    fontFamily: 'Roboto Regular',
  },
    locationText: {
        fontSize: 19,
        color: '#fff',
        marginBottom: 4,
        textAlign: 'left',
        fontFamily: 'Roboto Regular',
    },
    chooseButton: {
      backgroundColor: '#365b37',
      borderRadius: 20,
      paddingVertical: 12,
      paddingHorizontal: 20,
      marginTop: 20,
      alignSelf: 'center',
    },
    
    chooseButtonText: {
      color: '#fff',
      fontSize: 14,
      fontWeight: 'bold',
      textAlign: 'center',
      fontFamily: 'Roboto Regular',
    },
    
});
