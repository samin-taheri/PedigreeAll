import React, { useRef, useState, useEffect } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  Text,
  Platform,
  StatusBar,
  ScrollView, Switch, NativeModules,
  SafeAreaView,
} from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import Feather from 'react-native-vector-icons/Feather';
import BottomSheet from "react-native-gesture-bottom-sheet";
import RBSheet from 'react-native-raw-bottom-sheet';
import Icon from "react-native-vector-icons/FontAwesome5";
import Flag from "react-native-flags";
import { Global } from './Global';
import CheckBoxLanguage1 from '../component/CheckBoxLanguage1';
import CheckBoxLanguage2 from '../component/CheckBoxLanguage2';

function CustomHeader(props) {
  const toggleDrawer = () =>
    props.navigation.dispatch(DrawerActions.toggleDrawer());
  const bottomSheet = useRef();
  const [getLanguageClicking, setLanguageClicking] = React.useState(false)
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [getBottomNavigationMainName, setBottomNavigationMainName] = React.useState();
  const [getBottomNavigationProfileName, setBottomNavigationProfileName] = React.useState()
  const [getBottomNavigationBasketName, setBottomNavigationBasketName] = React.useState()
  const [getBottomNavigationSearchName, setBottomNavigationSearchName] = React.useState()

  const [getLanguageLoading, setLanguageLoading] = React.useState(false);

  const refRBSheet = useRef();

  const [checked_1, toggleChecked_1] = useState(true);
  const [checked_2, toggleChecked_2] = useState(false);
  const deviceLanguage =
    Platform.OS === 'ios'
      ? NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
      : Platform.OS === 'android' && NativeModules.I18nManager.localeIdentifier


  React.useEffect(() => {
    //Global.getBasket();
    //console.log(deviceLanguage)


    if (getLanguageClicking === false) {
      changeLanguage();
    }


    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);


  const changeLanguage = () => {
    if (deviceLanguage === "tr_TR") {
      Global.Language = 1
      setBottomNavigationMainName("Arama")
      setBottomNavigationProfileName("Profil")
      setBottomNavigationBasketName("Varsayımsal Eşleşme")
      setBottomNavigationSearchName("EffectiveNick")

    }
    else {
      Global.Language = 2
      setBottomNavigationMainName("Search")
      setBottomNavigationProfileName("Profile")
      setBottomNavigationBasketName("Hypothetical Search")
      setBottomNavigationSearchName("EffectiveNick")

    }
    setLanguageLoading(false)
  }
  const MyStatusBar = ({ backgroundColor, ...props }) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
      <SafeAreaView>
        <StatusBar translucent hidden={true} backgroundColor={backgroundColor} {...props} />
      </SafeAreaView>
    </View>
  );

  return (
    <SafeAreaView>
  <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            onPress={toggleDrawer}
            style={styles.leftButton}
            testID="CustomHeader-toggleDrawer">
            <Feather name='menu' size={25} color='white' />
          </TouchableOpacity>
        </View>
        <View style={styles.header}>
          <Image style={{ height: 55, width: 110, left: 30 }}
            source={require('../assets/logoWhite.png')}
            resizeMode="contain"
          />
          <TouchableOpacity
            style={styles.rightButton}
            onPress={() => bottomSheet.current.open()}>
            <Feather name='sliders' size={20} color='white' />

          </TouchableOpacity>
          <Text style={styles.headerTxt}></Text>
          <View style={styles.headerLeft}>




          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 100 : 56;


const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#2e3f6e',
    minHeight: 60,
  },
  SwipeablePanelText: {
    fontSize: 17,
    top: 20,
    left: 20
  },
  CheckboxView: {
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  FlagContainer: {
    flexDirection: 'row-reverse',
    right: -15,
    top: -10,
  },
  headerLeft: {
    flexDirection: 'row',
    left: 10
  },
  leftButton: {
    marginLeft: 10,
  },
  rightButton: {
    marginLeft: 220,
    top: 15
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  buttonTxt: {
    color: '#ddd',
    fontWeight: 'bold',
  },
  headerTxt: {
    color: '#ddd',
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
    backgroundColor: '#000'

  },
  appBar: {
    backgroundColor:'#000',
    height: APPBAR_HEIGHT,
  },
});

export default CustomHeader;

/*
import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text,
  SafeAreaView,
} from 'react-native';
import {DrawerActions} from '@react-navigation/native';

function CustomHeader(props) {
  const toggleDrawer = () =>
    props.navigation.dispatch(DrawerActions.toggleDrawer());

  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            onPress={toggleDrawer}
            style={styles.leftButton}
            testID="CustomHeader-toggleDrawer">
            <Image style={{ width: 25, height: 25}}
              source={require('../assets/menuu.png')}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.header}>
          <Text style={styles.headerTxt}>HEADER</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#222222',
    minHeight: 40,
  },
  headerLeft: {
    flexDirection: 'row',
  },
  leftButton: {
    marginLeft: 10,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingRight: 40,
  },
  buttonTxt: {
    color: '#ddd',
    fontWeight: 'bold',
  },
  headerTxt: {
    color: '#ddd',
  },
});

export default CustomHeader;
*/