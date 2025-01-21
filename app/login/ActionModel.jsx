import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import MedicationCardItem from '../../components/MedicationCardItem';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import { db } from '../../config/FirebaseConfig';
import { arrayUnion, doc, updateDoc, getDoc } from 'firebase/firestore';
import moment from 'moment';

const ActionModel = () => {
  const router = useRouter();
  const medicine = useLocalSearchParams();
  const [loading, setLoading] = useState(false);

  const updatedActionStatus = async (status) => {
    try {
      if (!medicine?.docId || !medicine?.selectedDate) {
        Alert.alert("Error", "Missing medication details.");
        return;
      }

      console.log("docId:", medicine?.docId);  // Debugging
      console.log("selectedDate:", medicine?.selectedDate);  // Debugging

      setLoading(true);
      
      // Check if document exists before updating
      const docRef = doc(db, 'medications', medicine?.docId);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        Alert.alert("Error", "Medication document not found.");
        setLoading(false);
        return;
      }

      // Proceed with update if document exists
      await updateDoc(docRef, {
        action: arrayUnion({
          status: status,
          time: moment().format('LT'),
          date: medicine?.selectedDate,
        }),
      });

      setLoading(false);
      Alert.alert(status, "Response Saved!..", [
        {
          text: 'OK',
          onPress: () => router.replace('(tabs)/Home'),
        },
      ]);
    } catch (e) {
      setLoading(false);
      console.log(e);  // Log the error for debugging
      Alert.alert("Error", "There was an issue saving the response.");
    }
  };

  // Safely parse the medicine type if it's a valid JSON string or handle other types (object, string)
  const parseMedicineType = (type) => {
    if (typeof type === 'string') {
      try {
        return JSON.parse(type);
      } catch (error) {
        console.error('Error parsing medicine type (invalid JSON):', error);
        return type;  // If not a valid JSON string, return as-is
      }
    }
    return type;  // If already an object or non-string, return it directly
  };

  // Safely parse the endDate
  const parseEndDate = (endDate) => {
    return endDate ? new Date(endDate) : undefined;
  };

  const parsedMedicine = {
    ...medicine,
    type: parseMedicineType(medicine?.type),
    endDate: parseEndDate(medicine?.endDate),
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <AntDesign name="closecircle" size={24} color="white" />
      </TouchableOpacity>

      <Image source={require('./../../assets/images/notification.png')} style={styles.image} />
      <Text style={styles.title}>{parsedMedicine?.name || 'Medication Reminder'}</Text>
      <Text style={styles.subText}>
        Dose: {parsedMedicine?.dose || 'Not Specified'} | Time: {parsedMedicine?.time || 'Not Specified'}
      </Text>

      <MedicationCardItem medicine={parsedMedicine} />

      {loading ? (
        <ActivityIndicator size="large" color="#1e90ff" style={styles.loadingIndicator} />
      ) : (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.missedButton} onPress={() => updatedActionStatus('Missed')}>
            <Entypo name="cross" size={24} color="white" />
            <Text style={styles.buttonText}>Missed</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.takenButton} onPress={() => updatedActionStatus('Taken')}>
            <AntDesign name="check" size={24} color="white" />
            <Text style={styles.buttonText}>Taken</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ActionModel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: '#1e90ff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 25,
    zIndex: 1,
  },
  image: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginVertical: 20,
    borderRadius: 15,
  
   
    padding: 5,

  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e90ff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
  },
  missedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e74c3c',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  takenButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2ecc71',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});
