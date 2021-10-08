
import React, { useState, useEffect, useRef } from 'react';
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
import * as Font from 'expo-font';
import TabSearchStyles from './screens/TabSearch.styles';
import TabSearch from './screens/TabSearch';
import CustomHeader from './screens/CustomHeader';
import TabEffectiveNickSearch from './screens/TabEffectiveNickSearch';
import TabHypotheticalSearch from './screens/TabHypotheticalSearch';
import { SplashScreen } from './screens/SplashScreen';
import { ContactScreen } from './screens/ContactScreen';
import { BlogScreen } from './screens/BlogScreen';
import { BlogItemScreen } from './screens/BlogItemScreen';
import { AddAHorse } from './screens/AddAHorse';
import HorseDetailScreen from './screens/HorseDetailScreen';
import { Global } from './screens/Global';
import RBSheet from 'react-native-raw-bottom-sheet';
import Icon from "react-native-vector-icons/FontAwesome5";
import Flag from "react-native-flags";
import { AlertTriangle } from 'react-native-feather';
import { Ionicons } from '@expo/vector-icons';
import CheckBoxLanguage1 from './component/CheckBoxLanguage1';
import CheckBoxLanguage2 from './component/CheckBoxLanguage2';
import { MyAddingRequestScreen } from './screens/MyAddingRequestScreen';
import { RequestsEditAHorse } from './screens/RequestsEditAHorse';
import { MyEditRequestsScreen } from './screens/MyEditRequestsScreen';
import { TextInput } from 'react-native-gesture-handler';
import { MyAccountScreen } from './screens/MyAccountScreen'
import { DeleteAHorseScreen } from './screens/DeleteAHorseScreen';
import { MyDeleteRequestsScreen } from './screens/MyDeleteRequestsScreen';
import { AddAHorse2 } from './screens/AddAHorse2';
import ResultScreen from './screens/ResultScreen';
import ErrorScreen from './screens/ErrorScreen';
import Myloader from './constants/Myloader';

export const BASE_URL = 'http://api.pedigreeall.com/';



const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const navOptionHandler = () => ({
  headerShown: false,

})



function MainDrawerNavigation() {

  const toggleDrawer = () =>
    props.navigation.dispatch(DrawerActions.toggleDrawer());

  const [getLanguageClicking, setLanguageClicking] = React.useState(false)
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [getBottomNavigationMainName, setBottomNavigationMainName] = React.useState();
  const [getBottomNavigationProfileName, setBottomNavigationProfileName] = React.useState()
  const [getBottomNavigationBasketName, setBottomNavigationBasketName] = React.useState()
  const [getBottomNavigationSearchName, setBottomNavigationSearchName] = React.useState()
  const [showEdition, setShowEdition] = React.useState(false)

  const [getLanguageLoading, setLanguageLoading] = React.useState(false);

  const refRBSheet = useRef();
  const [modalVisible, setModalVisible] = useState(false);
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
  const BlogOptionHandler = ({ navigation }) => ({
    headerShown: true,
    headerLeft: () => (
      <View>
        <TouchableOpacity
          style={{ padding: 10, flexDirection: 'row' }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="chevron-back-outline" size={24} color="white" />
        </TouchableOpacity>

      </View>
    ),
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
      <Text style={{ left: 5, fontSize: 20, color: 'white', fontWeight: 'bold' }}>Blog</Text>
    ),

  })
  const BlogItemsOptionHandler = ({ navigation }) => ({
    headerShown: true,
    headerLeft: () => (
      <View>
        <TouchableOpacity
          style={{ padding: 10, flexDirection: 'row' }}
          onPress={() => {
            navigation.navigate('Blog');
          }}
        >
          <Ionicons name="chevron-back-outline" size={24} color="white" />
        </TouchableOpacity>

      </View>
    ),
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
      <Text style={{ left: 5, fontSize: 20, color: 'white', fontWeight: 'bold' }}>Blog Items</Text>
    ),

  })
  const AddDrawerOptionHandler = ({ navigation }) => ({
    headerShown: true,
    headerLeft: () => (
      <View>
        <TouchableOpacity
          style={{ padding: 10, flexDirection: 'row' }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="chevron-back-outline" size={24} color="white" />
        </TouchableOpacity>

      </View>
    ),
    headerRight: () => (
      <View style={{ right: 25, padding: 10, flexDirection: 'row' }}>
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
      <Text style={{ left: 5, fontSize: 20, color: 'white', fontWeight: 'bold' }}>Add A Horse</Text>
    ),

  })
  const EditDrawerOptionHandler = ({ navigation }) => ({
    style: {
      shadowOpacity: 0, shadowOffset: { height: 0, width: 0, }, shadowRadius: 0, borderBottomWidth: 0
    },
    headerShown: true,
    style: {
      shadowColor: '#2e3f6e',
      borderBottomWidth: 5
    },
    headerLeft: () => (
      <View>
        <TouchableOpacity
          style={{ padding: 10, flexDirection: 'row' }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="chevron-back-outline" size={24} color="white" />
        </TouchableOpacity>

      </View>
    ),
    headerRight: () => (
      <View style={{ right: 25, padding: 10, flexDirection: 'row' }}>
        <TouchableOpacity style={{ left: 15 }}
          onPress={() => bottomSheet.current.open()}

        >
          <Ionicons name="options-outline" size={24} color="white" />
        </TouchableOpacity>

      </View>

    ),

    headerStyle: {
      backgroundColor: '#2e3f6e',
      borderBottomWidth: 2, borderBottomColor: '#2e3f6e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      justifyContent: 'center',
    },
    headerTitle: () => (
      <Text style={{ left: 5, fontSize: 20, color: 'white', fontWeight: 'bold' }}>Edit A Horse</Text>
    ),

  })
  const MyAddingDrawerOptionHandler = ({ navigation }) => ({
    headerShown: true,
    headerLeft: () => (
      <View>
        <TouchableOpacity
          style={{ padding: 10, flexDirection: 'row' }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="chevron-back-outline" size={24} color="white" />
        </TouchableOpacity>

      </View>
    ),
    headerRight: () => (
      <View style={{ right: 25, padding: 10, flexDirection: 'row' }}>
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
      <Text style={{ left: 5, fontSize: 20, color: 'white', fontWeight: 'bold' }}>My Adding Requests</Text>
    ),

  })
  const MyEditDrawerOptionHandler = ({ navigation }) => ({
    headerShown: true,

    headerLeft: () => (
      <View>
        <TouchableOpacity
          style={{ padding: 10, flexDirection: 'row' }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="chevron-back-outline" size={24} color="white" />
        </TouchableOpacity>

      </View>
    ),
    headerRight: () => (
      <View style={{ right: 25, padding: 10, flexDirection: 'row' }}>
        <TouchableOpacity style={{ left: 15 }}
          onPress={() => bottomSheet.current.open()}

        >
          <Ionicons name="options-outline" size={24} color="white" />
        </TouchableOpacity>

      </View>

    ),

    headerStyle: {
      backgroundColor: '#2e3f6e',
      borderBottomWidth: 2
    },

    headerTintColor: '#2e3f6e',
    headerTitleStyle: {
      justifyContent: 'center',
      borderBottomWidth: 2

    },
    headerTitle: () => (
      <Text style={{ left: 5, fontSize: 20, color: 'white', fontWeight: 'bold' }}>My Edit Requests</Text>
    ),

  })
  const DeleteDrawerOptionHandler = ({ navigation }) => ({
    headerShown: true,
    headerLeft: () => (
      <View>
        <TouchableOpacity
          style={{ padding: 10, flexDirection: 'row' }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="chevron-back-outline" size={24} color="white" />
        </TouchableOpacity>

      </View>
    ),
    headerRight: () => (
      <View style={{ right: 25, padding: 10, flexDirection: 'row' }}>
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
      <Text style={{ left: 5, fontSize: 20, color: 'white', fontWeight: 'bold' }}>Delete A Horse</Text>
    ),

  })
  const MyDeleteDrawerOptionHandler = ({ navigation }) => ({
    headerShown: true,
    headerLeft: () => (
      <View>
        <TouchableOpacity
          style={{ padding: 10, flexDirection: 'row' }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="chevron-back-outline" size={24} color="white" />
        </TouchableOpacity>

      </View>
    ),
    headerRight: () => (
      <View style={{ right: 25, padding: 10, flexDirection: 'row' }}>
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
      <Text style={{ left: 5, fontSize: 20, color: 'white', fontWeight: 'bold' }}>My Delete Requests</Text>
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

          {Global.Language === 1 ?
            <Text style={{ fontSize: 22, left: 5 }}>Ayarlar:</Text>
            :
            <Text style={{ fontSize: 22, left: 5 }}>Settings:</Text>
          }

        </View>
        <View style={{ flexDirection: 'row' }}>

          <Ionicons style={{ left: 20, top: 30 }} name="notifications-outline" size={24} color="black" />

          {Global.Language === 1 ?
            <Text style={styles.SwipeablePanelText}>Bildirimler:</Text>
            :
            <Text style={styles.SwipeablePanelText}>Notifications:</Text>
          }
        </View>

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
        <View style={{ flexDirection: 'row' }}>

          <Ionicons style={{ left: 20, top: 30 }} name="language-outline" size={24} color="black" />
        {Global.Language === 1 ?
          <Text style={styles.SwipeablePanelText}>Diller:</Text>
          :
          <Text style={styles.SwipeablePanelText}>Languages:</Text>
        }
        </View>
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

        <Stack.Group screenOptions={{ presentation: 'modal' }}>

        </Stack.Group>

      </Drawer.Navigator>
    </>
  );
}


function ModalScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 30 }}>This is a modal!</Text>
      <Button onPress={() => navigation.goBack()} title="Dismiss" />
    </View>
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


  const BackDrawerOptionHandler = ({ navigation }) => ({
    headerShown: true,
    headerLeft: () => (
      <View>
        <TouchableOpacity
          style={{ padding: 10, flexDirection: 'row' }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="chevron-back-outline" size={24} color="white" />
        </TouchableOpacity>

      </View>
    ),
    headerRight: () => (
      <View style={{ right: 25, padding: 10, flexDirection: 'row' }}>
        <TouchableOpacity style={{ left: 15 }}
          onPress={() => bottomSheet2.current.open()}

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
      <Text style={{ left: 5, fontSize: 20, color: 'white', fontWeight: 'bold' }}>Profile</Text>
    ),

  })

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
    //Global.getBasket();
    //console.log(deviceLanguage)
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
            <Stack.Screen name="MyAccount" component={MyAccountScreen} options={navOptionHandler} />
            <Stack.Screen name="Login" component={LoginScreen} options={navOptionHandler} />
            <Stack.Screen name="Result" component={ResultScreen} options={navOptionHandler} />

            <Stack.Group screenOptions={{ presentation: 'modal' }}>
              <Stack.Screen name="HorseDetail" component={HorseDetailScreen} options={navOptionHandler} />
            </Stack.Group>
          </Stack.Navigator>
        )}
      </NavigationContainer>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </>
  );
}
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
    right: 20,
    top: 10
  },
  SwipableCloseIcon: {
    width: '100%',
    flexDirection: 'row-reverse',
    marginRight: -25
  }

});


