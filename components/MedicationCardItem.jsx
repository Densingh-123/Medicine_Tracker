import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import moment from 'moment';
import Entypo from '@expo/vector-icons/Entypo';
const MedicationCardItem = ({ medicine }) => {
  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    if (timestamp.seconds) {
      return moment(timestamp.toDate()).format('MM/DD/YYYY');
    }
    return timestamp; // Already formatted
  };

  const calculateRemainderTime = (endDate) => {
    if (!endDate) return 'N/A';
    
    // Current time
    const currentTime = moment();
    
    // End time (medicine end date)
    const endTime = moment(endDate.toDate ? endDate.toDate() : endDate);

    // Calculate the remaining time
    const remainingTime = endTime.diff(currentTime);

    if (remainingTime <= 0) {
      return 'Time has passed';
    }

    // Format the remaining time as 'HH:mm A' (e.g., '7:00 PM')
    return endTime.format('hh:mm A');
  };

  return (
    <View style={styles.card}>
      {/* Row Section for Icon and Details */}
      <View style={styles.rowContainer}>
        {/* Icon Section */}
        <Image
          source={{ uri: medicine?.type?.icon }}
          style={styles.icon}
        />

        {/* Details Section */}
        <View style={styles.details}>
          <Text style={styles.name}>Name: {medicine?.name || 'N/A'}</Text>
          <Text style={styles.when}>When: {medicine?.when || 'N/A'}</Text>
          <Text style={styles.dose}>
            Dose: {medicine?.dose || 'N/A'} {medicine?.type?.name || ''}
          </Text>
          {/* <Text style={styles.additional}>
            Start Date: {formatDate(medicine?.startDate)}
          </Text>
          <Text style={styles.additional}>
            End Date: {formatDate(medicine?.endDate)}
          </Text> */}
          <Text style={styles.additional}>
          <Entypo name="back-in-time" size={18} color="black" />
          {calculateRemainderTime(medicine?.endDate)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default MedicationCardItem;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginVertical: 10, // Space between cards
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Shadow for Android
  },
  rowContainer: {
    flexDirection: 'row', // Align items horizontally
    alignItems: 'center', // Vertically center the items
  },
  icon: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    marginRight: 15, // Add spacing between the icon and the details
  },
  details: {
    flex: 1, // Ensure the details take up the remaining space
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  when: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  dose: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1e90ff',
    marginBottom: 5,
  },
  additional: {
    fontSize: 14,
    color: '#555',
    marginBottom: 3,
    position:'absolute',
    right:0,
    bottom:-20,
    fontWeight:'bold',
    gap:10,
   
  },
  noData: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});
