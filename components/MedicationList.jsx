import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Animated,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { getDateRangeToDiplay } from '../service/ConvertDateTime';
import moment from 'moment';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { getLocalStorage } from '../service/Storage';
import { db } from '../config/FirebaseConfig';
import MedicationCardItem from './MedicationCardItem';

const MedicationList = () => {
  const [medList, setMedList] = useState([]);
  const [dateRange, setDateRange] = useState([]);
  const [selectedDate, setSelectedDate] = useState(moment().format('MM/DD/YYYY'));
  const [scale] = useState(new Animated.Value(1));

  useEffect(() => {
    fetchDateRangeList();
  }, []);

  useEffect(() => {
    fetchMedicationList(selectedDate);
  }, [selectedDate]);

  const fetchDateRangeList = () => {
    const dateRange = getDateRangeToDiplay();
    setDateRange(dateRange);
  };

  const handlePress = (formatDate) => {
    setSelectedDate(formatDate);
    Animated.spring(scale, {
      toValue: 0.95,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start(() => {
      Animated.spring(scale, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }).start();
    });
  };

  const fetchMedicationList = async (selectedDate) => {
    const user = await getLocalStorage('userDetail');
    if (!user || !user.email) {
      console.error('User details are missing.');
      return;
    }

    try {
      const q = query(
        collection(db, 'medications'),
        where('userEmail', '==', user.email),
        where('dates', 'array-contains', selectedDate)
      );

      const querySnapshot = await getDocs(q);
      const medications = [];
      querySnapshot.forEach((doc) => {
        medications.push({ id: doc.id, ...doc.data() });
      });

      setMedList(medications);
    } catch (error) {
      console.error('Error fetching medication list:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('./../assets/images/med1.jpg')} style={styles.image} />

      {/* Date Range Selector */}
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={dateRange}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handlePress(item.formatDate)}
            activeOpacity={0.7}
            style={[
              styles.dateGroup,
              {
                backgroundColor: item?.formatDate === selectedDate ? '#1e90ff' : 'white',
                borderColor: item?.formatDate === selectedDate ? '#1e90ff' : '#f0f0f0',
              },
            ]}
          >
            <Animated.View style={{ transform: [{ scale }] }}>
              <Text style={[styles.day, { color: item?.formatDate === selectedDate ? 'white' : '#333' }]}>
                {item.day}
              </Text>
              <Text style={[styles.date, { color: item?.formatDate === selectedDate ? 'white' : '#1e90ff' }]}>
                {item.date}
              </Text>
            </Animated.View>
          </TouchableOpacity>
        )}
      />

      {/* Medication List */}
      <FlatList
        data={medList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MedicationCardItem medicine={item} />}
        ListEmptyComponent={<Text style={styles.noData}>No medications found for this date.</Text>}
      />
    </View>
  );
};

export default MedicationList;

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    paddingHorizontal: 10,
  },
  image: {
    borderRadius: 15,
    width: '100%',
    height: 200,
    marginBottom: 15,
  },
  dateGroup: {
    padding: 15,
    marginRight: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 10,
    borderWidth: 2,
  },
  day: {
    fontSize: 18,
    fontWeight: '500',
  },
  date: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  noData: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});
