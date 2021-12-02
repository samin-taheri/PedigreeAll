
import React, { useState, useEffect, useRef, createContext } from 'react';
import { Platform, NativeModules, Modal, TouchableOpacity, StyleSheet, ScrollView, View, Text, Switch, Button, StatusBar, Dimensions, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { drawerItemsMain } from './screens/drawerItemsMain';
import CustomDrawerContent from './screens/CustomDrawerContent.js';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import { SplashScreen } from './screens/SplashScreen';
import { ContactScreen } from './screens/ContactScreen';
import { BlogScreen } from './screens/BlogScreen';
import { BlogItemScreen } from './screens/BlogItemScreen';
import HorseDetailScreen from './screens/HorseDetailScreen';
import { Global } from './screens/Global';
import RBSheet from 'react-native-raw-bottom-sheet';
import { Ionicons } from '@expo/vector-icons';
import { MyAddingRequestScreen } from './screens/MyAddingRequestScreen';
import { RequestsEditAHorse } from './screens/RequestsEditAHorse';
import { MyEditRequestsScreen } from './screens/MyEditRequestsScreen';
import MyAccount from './screens/MyAccountScreen'
import { DeleteAHorseScreen } from './screens/DeleteAHorseScreen';
import { MyDeleteRequestsScreen } from './screens/MyDeleteRequestsScreen';
import { AddAHorse2 } from './screens/AddAHorse2';
import ResultScreen from './screens/ResultScreen';
import { SearchModal } from './screens/SearchModal';
import HypotheticalSearchModalSire from './screens/HypotheticalSearchModalSire';
import HypotheticalSearchModalMare from './screens/HypotheticalSearchModalMare';
import { EffectiveNickSearchModal } from './screens/EffectiveNickSearchModal';
import HorseDetailScreenPedigree from './screens/HorseDetailScreenPedigree';
import HorseDetailScreenProfile from './screens/HorseDetailScreenProfile';
import HorseDetailScreenProgency from './screens/HorseDetailScreenProgency';
import HorseDetailScreenNick from './screens/HorseDetailScreenNick';
import HorseDetailScreenFamily from './screens/HorseDetailScreenFamily';
import HorseDetailScreenSiblingMare from './screens/HorseDetailScreenSiblingMare';
import HorseDetailScreenSiblingSire from './screens/HorseDetailScreenSiblingSire';
import HorseDetailScreenTJK from './screens/HorseDetailScreenTJK';
import HorseDetailScreenSiblingBroodmareSire from './screens/HorseDetailScreenSiblingBroodmareSire';
import HorseDetailScreenBroodMareSire from './screens/HorseDetailScreenBroodMareSire';
import HorseDetailScreenTailFemale from './screens/HorseDetailScreenTailFemale';
import HorseDetailScreenLinebreeding from './screens/HorseDetailScreenLinebreeding';
import HorseDetailScreenFemaleFamily from './screens/HorseDetailScreenFemaleFamily';
import MareMotherSiblingsScreen from './screens/MareMotherSiblingsScreen';
import StallionFatherSiblings from './screens/StallionFatherSiblingsScreen';
import TailFemale from './screens/TailFemaleScreen';
import Progeny from './screens/ProgenyScreen';
import Profile from './screens/ProfileScreen';
import Linebreeding from './screens/LinebreedingScreen';
import FemaleFamily from './screens/FemaleFamilyScreen';
import BroodmareSireSiblings from './screens/BroodmareSireSiblingsScreen';
import HorseDetailScreenFoalsAsBroodMareSire from './screens/BreedersFoalsAsBroodMareSire';
import FoalsAsBroodMareSire from './screens/FoalsAsBroodMareSireScreen';
import Search from './screens/SearchScreen';
import EffectiveNickScreen from './screens/EffectiveNickScreen';
import CompareHorses from './screens/CompareHorsesScreen';
import HorsesForSale from './screens/HorsesForSaleScreen';
import RegisteredStallions from './screens/RegisteredStallionScreen';
import { useTranslation } from "react-i18next";
import i18n from "./component/i18n";
import { Dil } from './component/Helper';
import BreedersBroodmareSireSibling from './screens/BreedersBroodmareSireSibling';
import BreedersFemaleFamily from './screens/BreedersFemaleFamily';
import BreedersFoalsAsBroodMareSire from './screens/BreedersFoalsAsBroodMareSire';
import BreedersLinebreeding from './screens/BreedersLinebreeding';
import BreedersProfile from './screens/BreedersProfile';
import BreedersProgency from './screens/BreedersProgeny';
import BreedersSiblingMare from './screens/BreedersSiblingMare';
import BreedersSiblingSire from './screens/BreedersSiblingStallion';
import BreedersTailFemale from './screens/BreedersTailFemale';

export const BASE_URL = 'http://api.pedigreeall.com/';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const navOptionHandler = () => ({
  headerShown: false,

})

function MainDrawerNavigation() {
  
  const { t, i18n } = useTranslation();

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [isEnabled, setIsEnabled] = useState(false);
  const bottomSheet = useRef();

  const drawerOptionHandler = ({ navigation }) => ({
    headerShown: true,
    headerRight: () => (
      <View style={{ right: 25, padding: 10, flexDirection: 'row' }}>
        <TouchableOpacity style={{}}
          onPress={() => {
            navigation.navigate("MyAccount");
          }}

        >
          <Ionicons name="person-outline" size={22} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={{ left: 15 }}
          onPress={() => bottomSheet.current.open()}

        >
          <Ionicons name="options-outline" size={24} color="white" />
        </TouchableOpacity>

      </View>

    ),

    headerStyle: {
      backgroundColor: '#2e3f6e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      justifyContent: 'center',
    },
    headerTitle: () => (
      <Image style={{ height: 30, width: 130, left: 5 }} source={require("./assets/logoWhite.png")} />
    ),

  })


  return (
    <>
      <StatusBar hidden={true} />
      <RBSheet style={{ backgroundColor: '#00000000' }}

        hasDraggableIcon ref={bottomSheet}
        height={Dimensions.get('window').height / 3}
        closeOnDragDown={true}
        closeOnPressMask={true}
        animationType='fade'
        customStyles={{
          container: {
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10
          },

        }}
      >

        <View style={{ borderBottomWidth: 0.7, borderBottomColor: '#CFCFD5', paddingLeft: 20, padding: 10, flexDirection: 'row' }}>


          <Text style={{ fontSize: 22, left: 5 }}>{t('Settings')}</Text>


        </View>
        <View style={{ flexDirection: 'row' }}>

          <Ionicons style={{ left: 20, top: 30 }} name="notifications-outline" size={24} color="black" />

          <Text style={styles.SwipeablePanelText}>{t('Notifications')}:</Text>
        </View>

        <View style={{ right: 30, flexDirection: 'row', top: 5 }}>
          <Switch
            trackColor={{ false: "#D6D6D6", true: "#2e3f6e" }}
            thumbColor={isEnabled ? "#fff" : "#fff"}
            ios_backgroundColor="#D6D6D6"
            onValueChange={toggleSwitch}
            value={isEnabled}
            style={{ marginLeft: 'auto', }}
          />
        </View>

        <View style={{ flexDirection: 'row' }}>

          <Ionicons style={{ left: 20, top: 30 }} name="language-outline" size={24} color="black" />

          <Text style={styles.SwipeablePanelText}>{t('Languages')}</Text>


          <View style={styles.FlagContainer}>
            <TouchableOpacity
              onPress={() => {
                
                i18n.changeLanguage('tr');
                AsyncStorage.setItem('Dil', 0)
              }}>
              <Image
                style={{ height: 40, width: 40, bottom: -17 }}
                source={require('./assets/turkey.png')} />
            </TouchableOpacity>


            <TouchableOpacity
              onPress={() => {
                i18n.changeLanguage('en')
                AsyncStorage.setItem('Dil', 1)
              alert(Dil())
              }}>
              <Image
                style={{ height: 40, width: 40, bottom: -17 }}
                source={require('./assets/usa.png')} />
            </TouchableOpacity>
          </View>

        </View>

      </RBSheet>

      <Drawer.Navigator
        screenOptions={{
          presentation: 'modal'

        }}
        drawerType="front"
        headerShown={false}
        initialRouteName="Home"

        drawerContent={(props) => (
          <CustomDrawerContent drawerItems={drawerItemsMain} {...props} />
        )}>

        <Drawer.Screen name="Home" component={HomeScreen} options={drawerOptionHandler} />
        <Stack.Screen name="Contact" component={ContactScreen} options={navOptionHandler} />
        <Stack.Screen name="Blog" component={BlogScreen} options={navOptionHandler} />
        <Stack.Screen name="BlogItem" component={BlogItemScreen} options={navOptionHandler} />
        <Stack.Screen name="AddAHorse2" component={AddAHorse2} options={navOptionHandler} />
        <Stack.Screen name="MyAddingRequest" component={MyAddingRequestScreen} options={navOptionHandler} />
        <Stack.Screen name="EditAHorse" component={RequestsEditAHorse} options={navOptionHandler} />
        <Stack.Screen name="MyEditRequests" component={MyEditRequestsScreen} options={navOptionHandler} />
        <Stack.Screen name="DeleteAHorse" component={DeleteAHorseScreen} options={navOptionHandler} />
        <Stack.Screen name="MyDeleteRequests" component={MyDeleteRequestsScreen} options={navOptionHandler} />
        <Stack.Screen name="HorseDetail" component={HorseDetailScreen} options={navOptionHandler} />
        <Drawer.Screen name="PedigreeQuery" component={HomeScreen} options={drawerOptionHandler} />
        <Drawer.Screen name="HypoMating" component={HomeScreen} options={drawerOptionHandler} />
        <Drawer.Screen name="MareMotherSiblingsScreen" component={MareMotherSiblingsScreen} options={navOptionHandler} />
        <Drawer.Screen name="StallionFatherSiblings" component={StallionFatherSiblings} options={navOptionHandler} />
        <Drawer.Screen name="TailFemale" component={TailFemale} options={navOptionHandler} />
        <Drawer.Screen name="Progeny" component={Progeny} options={navOptionHandler} />
        <Drawer.Screen name="Profile" component={Profile} options={navOptionHandler} />
        <Drawer.Screen name="Linebreeding" component={Linebreeding} options={navOptionHandler} />
        <Drawer.Screen name="FemaleFamily" component={FemaleFamily} options={navOptionHandler} />
        <Drawer.Screen name="BroodmareSireSiblings" component={BroodmareSireSiblings} options={navOptionHandler} />
        <Drawer.Screen name="FoalsAsBroodMareSire" component={FoalsAsBroodMareSire} options={navOptionHandler} />
        <Drawer.Screen name="Search" component={Search} options={navOptionHandler} />
        <Drawer.Screen name="CreateMatchReport" component={HomeScreen} options={drawerOptionHandler} />
        <Drawer.Screen name="CompareHorses" component={CompareHorses} options={navOptionHandler} />
        <Drawer.Screen name="HorsesForSale" component={HorsesForSale} options={navOptionHandler} />
        <Drawer.Screen name="RegisteredStallions" component={RegisteredStallions} options={navOptionHandler} />
        <Drawer.Screen name="BreedersBroodmareSireSibling" component={BreedersBroodmareSireSibling} options={navOptionHandler} />
        <Drawer.Screen name="BreedersFemaleFamily" component={BreedersFemaleFamily} options={navOptionHandler} />
        <Stack.Screen name="BreedersFoalsAsBroodMareSire" component={BreedersFoalsAsBroodMareSire} options={navOptionHandler} />
        <Stack.Screen name="BreedersLinebreeding" component={BreedersLinebreeding} options={navOptionHandler} />
        <Stack.Screen name="BreedersProfile" component={BreedersProfile} options={navOptionHandler} />
        <Stack.Screen name="BreedersProgency" component={BreedersProgency} options={navOptionHandler} />
        <Stack.Screen name="BreedersSiblingMare" component={BreedersSiblingMare} options={navOptionHandler} />
        <Stack.Screen name="BreedersSiblingSire" component={BreedersSiblingSire} options={navOptionHandler} />
        <Stack.Screen name="BreedersTailFemale" component={BreedersTailFemale} options={navOptionHandler} />
        <Stack.Group screenOptions={{ presentation: 'modal' }}>

        </Stack.Group>

      </Drawer.Navigator>
    </>
  );
}

export default function App({ navigation }) {

  const [isLoading, setIsLoading] = React.useState(true);
  const [getLanguageClicking, setLanguageClicking] = React.useState(false)
  const [getUser, setUser] = React.useState(null)

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const [getLanguageLoading, setLanguageLoading] = React.useState(false);

  const [openingScreen, setOpeningScreen] = React.useState("Login");

  const bottomSheet2 = useRef();

  const saveData = async (data) => {
    try {
      await AsyncStorage.setItem('USER', data)
      setIsLoading(false)
      console.log('Data successfully saved')
    } catch (e) {
      console.log('Failed to save the data to the storage')
    }
  }



  const readData = async () => {
    try {
      const userKey = await AsyncStorage.getItem('USER')

      setUser(userKey)
      if (userKey !== null) {
        const mail = JSON.parse(userKey)[0].EMAIL
        if (mail === "info@pedigreeall.com") {
          Global.IsLogin = false;
          Global.SideNavigationData = JSON.parse(userKey)[0].PAGE_LIST;
          setOpeningScreen("Login")
        }
        else {
          Global.IsLogin = true;
          Global.SideNavigationData = JSON.parse(userKey)[0].PAGE_LIST;
          setOpeningScreen("MainDrawer")
        }
        setIsLoading(false)
      }
      else {
        setOpeningScreen("Login")
        Global.IsLogin = false
        fetch('https://api.pedigreeall.com/systemuser/login', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            EMAIL: 'info@pedigreeall.com',
            PASSWORD: 'Ccoft2020'
          })
        })
          .then((response) => response.json())
          .then((json) => {
            if (json.m_cDetail.m_eProcessState > 0) {
              saveData(JSON.stringify(json.m_cData))
            }

          })
          .catch((error) => {
            console.error(error);
          })
      }
    } catch (e) {
    }
  }


  const deviceLanguage =
    Platform.OS === 'ios'
      ? NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
      : Platform.OS === 'android' && NativeModules.I18nManager.localeIdentifier




  React.useEffect(() => {
    readData();
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
    }
    else {
      Global.Language = 2

    }
    setLanguageLoading(false)
  }


  if (isLoading) {
    return <SplashScreen />;
  }


  return (
    <>
      <StatusBar hidden={true} />
      <RBSheet style={{ backgroundColor: '#00000000' }}


        hasDraggableIcon ref={bottomSheet2}
        height={Dimensions.get('window').height / 3}
        animationType='fade'
        closeOnDragDown={true}
        closeOnPressMask={true}
        animationType='fade'
        customStyles={{
          container: {
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10
          },

        }}
      >

        <View style={{ borderBottomWidth: 0.7, borderBottomColor: '#CFCFD5', paddingLeft: 20, padding: 10 }}>
          <Ionicons name="construct-outline" size={24} color="black" />
          {Global.Language === 1 ?
            <Text style={{ fontSize: 22 }}>Ayarlar:</Text>
            :
            <Text style={{ fontSize: 22 }}>Settings:</Text>
          }

        </View>

        {Global.Language === 1 ?
          <Text style={styles.SwipeablePanelText}>Diller:</Text>
          :
          <Text style={styles.SwipeablePanelText}>Languages:</Text>
        }
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
            <Image
              style={{ height: 40, width: 40, top: -5 }}
              source={require('./assets/usa.png')} />
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
            <Image
              style={{ height: 40, width: 40, top: -5 }}
              source={require('./assets/turkey.png')} />
          </TouchableOpacity>
        </View>

        {Global.Language === 1 ?
          <Text style={styles.SwipeablePanelText}>Bildirimler:</Text>
          :
          <Text style={styles.SwipeablePanelText}>Notifications:</Text>
        }

        <View style={{ right: 30, flexDirection: 'row', top: 5 }}>
          <Switch
            trackColor={{ false: "#D6D6D6", true: "#77b5fe" }}
            thumbColor={isEnabled ? "#fff" : "#fff"}
            ios_backgroundColor="#D6D6D6"
            onValueChange={toggleSwitch}
            value={isEnabled}
            style={{ marginLeft: 'auto', }}
          />
        </View>


      </RBSheet>

      <NavigationContainer>
        {getUser == null ? (
          <Stack.Navigator >
            <Stack.Screen name="Login" component={LoginScreen} options={navOptionHandler} />
            <Stack.Screen name="Result" component={ResultScreen} options={navOptionHandler} />
            <Stack.Screen name="Register" component={RegisterScreen} options={navOptionHandler} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={navOptionHandler} />
            <Stack.Screen name="MainDrawer" component={MainDrawerNavigation} options={navOptionHandler} />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator>

            <Stack.Screen name="MainDrawer" component={MainDrawerNavigation} options={navOptionHandler} />
            <Stack.Screen name="Register" component={RegisterScreen} options={navOptionHandler} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={navOptionHandler} />
            <Stack.Screen name="MyAccount" component={MyAccount} options={navOptionHandler} />
            <Stack.Screen name="Login" component={LoginScreen} options={navOptionHandler} />
            <Stack.Screen name="Result" component={ResultScreen} options={navOptionHandler} />

            <Stack.Group screenOptions={{ presentation: 'modal' }}>
              <Stack.Screen name="SearchModal" component={SearchModal} options={navOptionHandler} />
              <Stack.Screen name="HypotheticalSearchModalSire" component={HypotheticalSearchModalSire} options={navOptionHandler} />
              <Stack.Screen name="HypotheticalSearchModalMare" component={HypotheticalSearchModalMare} options={navOptionHandler} />
              <Stack.Screen name="EffectiveNickSearchModal" component={EffectiveNickSearchModal} options={navOptionHandler} />
              <Stack.Screen name="HorseDetailScreenPedigree" component={HorseDetailScreenPedigree} options={navOptionHandler} />
              <Stack.Screen name="HorseDetailScreenProfile" component={HorseDetailScreenProfile} options={navOptionHandler} />
              <Stack.Screen name="HorseDetailScreenProgency" component={HorseDetailScreenProgency} options={navOptionHandler} />
              <Stack.Screen name="HorseDetailScreenNick" component={HorseDetailScreenNick} options={navOptionHandler} />
              <Stack.Screen name="HorseDetailScreenFamily" component={HorseDetailScreenFamily} options={navOptionHandler} />
              <Stack.Screen name="HorseDetailScreenSiblingMare" component={HorseDetailScreenSiblingMare} options={navOptionHandler} />
              <Stack.Screen name="HorseDetailScreenSiblingSire" component={HorseDetailScreenSiblingSire} options={navOptionHandler} />
              <Stack.Screen name="HorseDetailScreenTJK" component={HorseDetailScreenTJK} options={navOptionHandler} />
              <Stack.Screen name="HorseDetailScreenSiblingBroodmareSire" component={HorseDetailScreenSiblingBroodmareSire} options={navOptionHandler} />
              <Stack.Screen name="HorseDetailScreenBroodMareSire" component={HorseDetailScreenBroodMareSire} options={navOptionHandler} />
              <Stack.Screen name="HorseDetailScreenTailFemale" component={HorseDetailScreenTailFemale} options={navOptionHandler} />
              <Stack.Screen name="HorseDetailScreenLinebreeding" component={HorseDetailScreenLinebreeding} options={navOptionHandler} />
              <Stack.Screen name="HorseDetailScreenFemaleFamily" component={HorseDetailScreenFemaleFamily} options={navOptionHandler} />
              <Stack.Screen name="EffectiveNickScreen" component={EffectiveNickScreen} options={navOptionHandler} />
            </Stack.Group>
          </Stack.Navigator>
        )}
      </NavigationContainer>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </>
  );
}
const windowWidth = Dimensions.get('window').width - 10;
const windowWidth2 = Dimensions.get('window').width - 10;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: 'center'
  },
  rightTopIcon: {
    padding: 10,
    right: 15,
  },
  rightTopIconAccount: {

  },
  Button: {
    marginTop: 100,
    padding: 10,
    backgroundColor: "blue",
    borderRadius: 8
  },
  swipeContainer: {
    width: "100%",
  },
  SwipeablePanelContainer: {
    padding: 20,
  },
  SwipeablePanelItem: {
    marginVertical: 30,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',

  },
  SwipeablePanelText: {
    fontSize: 18,
    top: 30,
    left: 30
  },
  FlagContainer: {
    flexDirection: 'row-reverse',
    left: 220,
    top: 10
  },
  FlagContainer2: {
    flexDirection: 'row-reverse',
    right: 50,
    top: 10
  },
  SwipableCloseIcon: {
    width: '100%',
    flexDirection: 'row-reverse',
    marginRight: -25
  }

});
