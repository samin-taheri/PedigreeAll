import React, { useState, useRef, useEffect } from 'react'
import { View, Linking, Text, StyleSheet, Image, Dimensions, Switch, Platform, TouchableOpacity, TextInput, Alert, StatusBar } from 'react-native'
import Flag from "react-native-flags";
import { Global } from './Global';
import { Ionicons } from '@expo/vector-icons';

export function SettingsScreen({ navigation }) {

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [getLanguageClicking, setLanguageClicking] = React.useState(false)
  const [getBottomNavigationMainName, setBottomNavigationMainName] = React.useState();
  const [getBottomNavigationProfileName, setBottomNavigationProfileName] = React.useState()
  const [getBottomNavigationBasketName, setBottomNavigationBasketName] = React.useState()
  const [getBottomNavigationSearchName, setBottomNavigationSearchName] = React.useState()

  return (
    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end' }}>
      <View style={{ height: "50%", width: '100%', backgroundColor: "#fff" }}>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.title}>Settings</Text>
        <Ionicons style={{top: 20, left: -50}}name="settings-outline" size={24} color="black" />
        </View>
        <TouchableOpacity style={styles.close}
        
        onPress={()=>{

          navigation.goBack()

        }}
        >
          <Text style={{ color: 'blue', fontSize: 15 }}>Close</Text>
        </TouchableOpacity>

        <View style={styles.lineStyle} />
        <View style={{marginVertical: 15,
          flexDirection: 'row',
          justifyContent: 'space-between',}}>
            <Text style={styles.SwipeablePanelText}>Notifications: </Text>
          <Switch
            trackColor={{ false: "#a3a3a3", true: "#2f406f" }}
            thumbColor={isEnabled ? "#fff" : "#fff"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
            style={{ marginLeft: 'auto', right: 15, top: 10 }}
          />
        </View>
        <View style={{marginVertical: 15,
          flexDirection: 'row',
          justifyContent: 'space-between',}}>
        <Text style={styles.SwipeablePanelText}>Languages: </Text>
        <View style={styles.FlagContainer}>
                <TouchableOpacity
                  onPress={() => {
                    setLanguageClicking(true)
                    Global.Language = 2;
              setBottomNavigationMainName("Main")
              setBottomNavigationProfileName("Profile")
              setBottomNavigationBasketName("Basket")
              setBottomNavigationSearchName("Search")

                  }}
                  style={{ marginRight: 5 }}>
                  <Flag code='US' size={24} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setLanguageClicking(true)
                    Global.Language = 1;

              setBottomNavigationMainName("Anasayfa")
              setBottomNavigationProfileName("Profil")
              setBottomNavigationBasketName("Sepet")
              setBottomNavigationSearchName("Arama")
                  }}
                  style={{ marginRight: 5 }} >
                  <Flag code='TR' size={24} />
                </TouchableOpacity>
              </View>
        </View>
      </View>
      
    </View>
  )
}

var styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    top: 20,
    left: 50,
  },
  close: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  lineStyle: {
    borderWidth: 0.5,
    borderColor: '#8c8c8c',
    margin: 10,
    marginTop: 30,
  },
  SwipeablePanelText: {
    fontSize: 18,
    top: 10,
    left: 20
  },
  FlagContainer: {
    flexDirection: 'row-reverse',
    right: 20,
    top: 15
  },
});