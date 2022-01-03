import React, { Component, useState } from 'react'
import { View, Dimensions, Image, StyleSheet, Platform, ScrollView } from 'react-native';
import TabSearch from './TabSearch';
import { TabHypotheticalSearch } from './TabHypotheticalSearch';
import { TabEffectiveNickSearch } from './TabEffectiveNickSearch';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import * as Animatable from 'react-native-animatable';
import * as Haptics from 'expo-haptics';
import { useTranslation } from "react-i18next";
import i18n from "../component/i18n";

const Tab = createMaterialTopTabNavigator();
const windowWidth = Dimensions.get('window').width / 3;

function HomeScreen() {

  const { t, i18n } = useTranslation();
  const [getSearchTabBarText, setSearchTabBarText] = React.useState()
  const [getHypotheticalTabBarText, setHypotheticalTabBarText] = React.useState()
  const [getEffectiveNickTabBarText, setEffectiveNickTabBarText] = React.useState()
  const [BgHeader, SetBgHeader] = React.useState(require('../assets/main3.jpg'))
  const [bgCount, SetbgCount] = React.useState(1)

  React.useEffect(() => {
    setSearchTabBarText("Arama")
    setHypotheticalTabBarText("Varsayımsal Eşleştirme")
    setEffectiveNickTabBarText("EffectiveNick")

  }, []);

  return (
    <>
      <View style={{ backgroundColor: '#fff', height: 200 }}>
        <Animatable.Image useNativeDriver={true} style={styles.backgroundImage} source={(bgCount == 1 ? require('../assets/main1.jpg') : bgCount == 2 ? require('../assets/main2.jpg') : require('../assets/main3.jpg'))} animation={(bgCount == 1 ? "fadeInLeftBig" : bgCount == 2 ? "fadeInUpBig" : "fadeInRightBig")} />
      </View>

      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: {
            fontSize: 12, color: '#2e3f6e',
          },
          tabBarItemStyle: { width: windowWidth, },
          tabBarStyle: {
            shadowColor: "#2962ff",
            shadowOffset: {
              width: 0,
              height: 4,

            },
            shadowOpacity: 0.30,
            shadowRadius: 4.65,
            elevation: 8,
            height: 50
          },

        }}
      >

        <Tab.Screen
          listeners={({ navigation, route }) => ({
            focus: e => {
              SetbgCount(1);

              if (Platform.OS == "ios")
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
            },
          })}
          name="TabSearch" component={TabSearch} options={{
            title: t('Search'), headerShown: false,

          }}
        />

        <Tab.Screen name="TabHypotheticalSearch"
          listeners={({ navigation, route }) => ({
            focus: e => {
              SetbgCount(2);

              if (Platform.OS == "ios")
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
            },
          })}
          component={TabHypotheticalSearch} options={{ title: t('Hypothetical'), headerShown: false }} />
        <Tab.Screen name="TabEffectiveNickSearch"
          listeners={({ navigation, route }) => ({
            focus: e => {
              SetbgCount(3);

              if (Platform.OS == "ios")
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
            },
          })}
          component={TabEffectiveNickSearch} options={{ title: t('EffectiveNick'), headerShown: false }} />

      </Tab.Navigator>


    </>
  );
}
export default HomeScreen;


var styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch',
    justifyContent: 'center',
    width: '100%'
  }
});