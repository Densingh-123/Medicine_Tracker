import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import moment from 'moment';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
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

    const currentTime = moment();
    const endTime = moment(endDate.toDate ? endDate.toDate() : endDate);

    const remainingTime = endTime.diff(currentTime);

    if (remainingTime <= 0) {
      return 'Time has passed';
    }

    return endTime.format('hh:mm A');
  };

  return (
    <View style={styles.card}>
      <View style={styles.rowContainer}>
        <Image
          source={{ uri: medicine?.type?.icon }}
          style={styles.icon}
        />
        <View style={styles.details}>
          <Text style={styles.name}>Name: {medicine?.name || 'N/A'}</Text>
          <Text style={styles.when}>When: {medicine?.when || 'N/A'}</Text>
          <Text style={styles.dose}>
            Dose: {medicine?.dose || 'N/A'} {medicine?.type?.name || ''}
          </Text>
          <Text style={styles.additional}>
            <Entypo name="back-in-time" size={18} color="black" />{' '}
            {calculateRemainderTime(medicine?.endDate)}
          </Text>
        </View>
        <View style={styles.statusContainer}>
      <AntDesign name="checkcircle" size={24} color="green" />
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
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 80,
    height: 80,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    marginRight: 15,
  },
  details: {
    flex: 1,
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
    fontWeight: 'bold',
  },
  statusContainer:{
    position:'absolute',
    top:5,
    padding:7
  }
});
