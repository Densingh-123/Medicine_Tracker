import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../../config/FirebaseConfig'
import { useRouter } from 'expo-router'
import Header from '../../components/Header'
import EmptyState from '../../components/EmptyState'
import MedicationList from '../../components/MedicationList'

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
    <View style={{padding:25,backgroundColor:'white',height:"100%"}}>
   <Header/>
   {/* <EmptyState/> */}
   <MedicationList/>
      {/* <Button title='Logout' onPress={handleLogout}  /> */}
    </View>
  );
}

export default Home

const styles = StyleSheet.create({});
