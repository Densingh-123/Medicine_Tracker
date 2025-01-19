import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getLocalStorage } from '../service/Storage';
import AntDesign from '@expo/vector-icons/AntDesign';

const Header = () => {
  const [user, setUser] = useState(null); // State to hold user info
  const [loading, setLoading] = useState(true); // State for loading indicator

  useEffect(() => {
    GetUserDetail();
  }, []);

  const GetUserDetail = async () => {
    try {
      const userInfo = await getLocalStorage('userDetail'); // Fetch user details from local storage
      setUser(userInfo);
    } catch (error) {
      console.error('Error fetching user details:', error);
    } finally {
      setLoading(false);
    }
  };

  const getUsername = (email) => {
    if (email && email.includes('@gmail.com')) {
      return `Hello ${email.split('@')[0]} 👋`;
    }
    return 'Hi User';
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={require('./../assets/images/wink.png')} style={styles.avatar} />
      <Text style={styles.username}>{getUsername(user?.email)}</Text>
      <AntDesign name="setting" size={28} color="gray" style={styles.icon} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Space between username and settings icon
    padding: 10,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    margin: 10,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    flex: 1, // Takes available space between avatar and icon
  },
  icon: {
    marginLeft: 40,
 
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
