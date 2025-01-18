import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../../config/FirebaseConfig'
import { useRouter } from 'expo-router'

const Home = () => {
  const router = useRouter();  // Initialize router

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
       
        router.push('/login/Index');
      })
      .catch((error) => {
        console.error("Error signing out: ", error.message);
      });
  };

  return (
    <View>
      <Text>Home</Text>
      <Button title='Logout' onPress={handleLogout} />
    </View>
  );
}

export default Home

const styles = StyleSheet.create({});
