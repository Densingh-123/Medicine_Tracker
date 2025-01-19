import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';

const MedicationCardItem = ({ medicine }) => {
  return (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        <Image
          source={{ uri: medicine?.type?.icon }}
          style={styles.icon}
        />
      </View>
      <View style={styles.details}>
        <Text style={styles.name}>{medicine?.name}</Text>
        <Text style={styles.when}>{medicine?.when}</Text>
        <Text style={styles.dose}>
          {medicine?.dose} {medicine?.type?.name}
        </Text>
      </View>
    </View>
  );
};

export default MedicationCardItem;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // For Android shadow
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
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
  },
});
