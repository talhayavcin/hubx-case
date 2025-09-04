import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { HomeIcon, DiagnoseIcon, ScanIcon, GardenIcon, ProfileIcon } from '../icons';

import HomeScreen from '../screens/Home';
import DiagnoseScreen from '../screens/Diagnose';
import MyGardenScreen from '../screens/MyGarden';
import ProfileScreen from '../screens/Profile';

export type BottomTabParamList = {
  Home: undefined;
  Diagnose: undefined;
  Scan: undefined;
  MyGarden: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabs = () => {
  const tabBarOptions = {
    headerShown: false,
    tabBarShowLabel: true,
    tabBarActiveTintColor: '#28AF6E',
    tabBarInactiveTintColor: '#979798',
    tabBarStyle: {
      height: 85,
      paddingBottom: 8,
      paddingTop: 4,
      backgroundColor: 'rgba(255, 255, 255, 0.92)',
      borderTopWidth: 0.5,
      borderTopColor: '#F4F6F6',
    },
    tabBarLabelStyle: {
      fontFamily: 'Rubik-Regular',
      fontSize: 10,
      marginTop: 4,
      letterSpacing: -0.24,
    },
  };

  return (
    <Tab.Navigator screenOptions={tabBarOptions}>
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => (
            <HomeIcon focused={focused} />
          )
        }}
      />
      <Tab.Screen 
        name="Diagnose" 
        component={DiagnoseScreen}
        options={{
          tabBarLabel: 'Diagnose',
          tabBarIcon: ({ focused }) => (
            <DiagnoseIcon focused={focused} />
          )
        }}
      />
      <Tab.Screen 
        name="Scan" 
        component={HomeScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: () => (
            <View style={styles.scanButtonContainer}>
              <View style={styles.shadowContainer}>
                <LinearGradient
                  colors={['rgba(0, 0, 0, 0.01)', 'rgba(0, 0, 0, 0.01)']}
                  style={styles.shadowGradient}
                />
              </View>
              
              <LinearGradient
                colors={['#28AF6E', '#2CCC80']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.scanButton}
              >
                <View style={styles.scanIconContainer}>
                  <ScanIcon />
                </View>
              </LinearGradient>
            </View>
          )
        }}
      />
      <Tab.Screen 
        name="MyGarden"
        component={MyGardenScreen}
        options={({ route }) => ({
          tabBarLabel: 'My Garden',
          tabBarIcon: ({ focused }) => (
            <GardenIcon focused={focused} />
          )
        })}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ focused }) => (
            <ProfileIcon focused={focused} />
          )
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  scanButtonContainer: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: 64,
    height: 64,
  },
  shadowContainer: {
    position: 'absolute',
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'transparent',
    shadowColor: '#000000',
    shadowOffset: {
        width: 0,
        height: 4,
    },
    shadowOpacity: 0.01,
    shadowRadius: 5,
  },
  shadowGradient: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  scanButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.24)',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
  scanIconContainer: {
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BottomTabs;