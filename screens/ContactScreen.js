import React, { useState, useRef, useEffect } from 'react'
import { View, Linking, Text, StyleSheet, Image, Dimensions, ScrollView, Platform, TouchableOpacity, TextInput, Alert, StatusBar } from 'react-native'
import Icon from "react-native-vector-icons/FontAwesome5";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';
import { Global } from './Global';
import { SocialIcon } from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Toast from 'react-native-toast-message';
import * as Haptics from 'expo-haptics';
import { showMessage } from '../Helpers';
import { Ionicons } from '@expo/vector-icons';
import { CardStyleInterpolators } from '@react-navigation/stack';
import MyHeader from '../component/MyHeader';
import MyButton from '../component/MyButton';

const STORAGE_KEY = "USER"

export function ContactScreen({ navigation }) {
  const refRBSheet = useRef();
  const [getName, setName] = React.useState("");
  const [getEmail, setEmail] = React.useState("");
  const [getPhone, setPhone] = React.useState("");
  const [getMessage, setMessage] = React.useState("");

  const alertDialog = (messageTitle, message) =>
    Alert.alert(
      messageTitle,
      message,
      [
        {
          text: "OK",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
      ],
      { cancelable: false }
    );


  const [panelProps, setPanelProps] = useState({
    openLarge: false,
    onlySmall: true,
    showCloseButton: true,

    onClose: () => closePanel(),
    onPressCloseButton: () => closePanel(),
    // ...or any prop you want
  });
  const [isPanelActive, setIsPanelActive] = useState(false);
  const openPanel = () => {
    setIsPanelActive(true);
  };

  const closePanel = () => {
    setIsPanelActive(false);
  };

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [getMessagePlaceholder, setMessagePlaceholder] = React.useState("")
  const [getSubmitButton, setSubmitButton] = React.useState("")

  React.useLayoutEffect(() => {
    if (Global.Language === 1) {
      setMessagePlaceholder("Mesaj")
      setSubmitButton("Gönder")
    }
    else {
      setMessagePlaceholder("Message")
      setSubmitButton("Submit")
    }
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 20 }}
          onPress={() => {
            refRBSheet.current.open()
          }}>
          <Icon name="cogs" size={24} color="#fff" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);


  const readSendEmail = async () => {
    try {
      const token = await AsyncStorage.getItem('TOKEN')
      if (token !== null) {
        fetch('https://api.pedigreeall.com/Email/SendEmail', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Basic " + token,
          },
          body: JSON.stringify({
            "BCC_EMAIL_LIST": [],
            "EMAIL_LIST": [
              "info@pedigreeall.com"
            ],
            "HTML_MESSAGE": getName + "<br/>" + getEmail + "<br/>" + getMessage,
            "SUBJECT": "Site Mesaj",
          })
        })
          .then((response) => response.json())
          .then((json) => {
            if (json.m_eProcessState === 1) {
              alertDialog("Congratulations", json.m_lUserMessageList[1])
              setName("")
              setEmail("")
              setMessage("")
            }
            else {
              alertDialog("Error", json.m_lUserMessageList[1])
            }
          })
          .catch((error) => {
            console.error(error);
          })
      }
      else {
        console.log("Basarisiz")
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <View style={styles.container}>
      <MyHeader
        onPress={() => navigation.goBack()}
        Title="Contact Us"
      >
            <View style={{ padding: 20 }}>
            <ScrollView >

        <Text style={styles.text_footer}>Name</Text>
        <View style={styles.action}>
          <Feather
            name="user"
            color="#2e3f6e"
            size={20}
          />
          <TextInput
            placeholder="Your Name"
            name={"username"}
            value={getName}
            onChangeText={setName}
            style={styles.textInput}
          />

        </View>

        <View >
          <Text style={styles.text_footer}>Email & Phone</Text>
          <View style={styles.action}>
            <Feather
              name="mail"
              color="#2e3f6e"
              size={20}
            />
            <TextInput
              placeholder="Your Email & Phone"
              keyboardType={"email-address"}
              name={"mail"}
              value={getEmail}
              onChangeText={setEmail}
              style={styles.textInput}
            />
          </View>

        </View>

        <View >
          <Text style={styles.text_footer}>Message</Text>
          <View style={[styles.action, { height: 70 }]}>
            <Feather
              name="message-square"
              color="#2e3f6e"
              size={20}
              style={{ marginBottom: 'auto' }}
            />
            <TextInput
              style={[styles.textInput, { marginBottom: 'auto' }]}
              placeholder="Type a Message"
              name={"message"}
              value={getMessage}
              onChangeText={setMessage}
              multiline={true}

            />
          </View>

        </View>

        <View style={{ marginTop: 10 }}>
          
          <MyButton
              Title="Submit"
              Icon="checkmark-circle-outline"
              IconSize={24}
              onPress={async (e) => {
                if (Platform.OS != "web")
                  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
                if (getEmail === '' || getEmail === '' || getMessage === '') {
                  Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: 'Hata',
                    text2: 'Please fill the blanks before you submit!',
                    visibilityTime: 4000,
                    autoHide: true,
                    topOffset: StatusBar.currentHeight || 42,
                    bottomOffset: 40,
                    onShow: () => { },
                    onHide: () => { },
                    onPress: () => { }
                  })
                }
                else {
                  if (Platform.OS != "web")
                    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
                  Toast.show({
                    type: 'success',
                    position: 'top',
                    text1: 'başarılı',
                    text2: 'Congrats! You have submitted successfully.',
                    visibilityTime: 4000,
                    autoHide: true,
                    topOffset: StatusBar.currentHeight || 42,
                    bottomOffset: 40,
                    onShow: () => { navigation.navigate("Home") },
                    onHide: () => { },
                    onPress: () => { }
  
                  })
                  readSendEmail();
                }
              }
  
              }
            >
            </MyButton>
        </View>
        <View style={{ alignItems: 'center', top: 20, color: '#2e3f6e', fontSize: 15 }}>
          <Text>Thank You For Contacting Us!</Text>
        </View>
        <View style={styles.Socialcontainer}>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={{ flexDirection: 'column' }}>


                <SocialIcon style={{ width: 40, height: 40, }}
                  type="facebook"
                  light
                  onPress={() => { Linking.openURL('https://www.facebook.com/pedigreeallcom'); }}

                />
              </View>
              <View style={{ flexDirection: 'column' }}>
                <SocialIcon style={{ width: 40, height: 40 }}
                  type="instagram"
                  light
                  onPress={() => { Linking.openURL('https://www.instagram.com/pedigreeallcom/'); }}
                />
              </View>
              <View style={{ flexDirection: 'column' }}>
                <SocialIcon style={{ width: 40, height: 40 }}
                  type="linkedin"
                  light
                  onPress={() => { Linking.openURL('https://www.linkedin.com/company/pedigreeall'); }}
                />
              </View>

              <View style={{ flexDirection: 'column' }}>
                <SocialIcon style={{ width: 40, height: 40 }}
                  type="twitter"
                  light
                  onPress={() => { Linking.openURL('https://twitter.com/pedigreeall'); }}
                />
              </View>
            </View>
          </View>
        </View>
        </ScrollView>
        </View>
           
      </MyHeader>
    </View>

  )
}

const { height } = Dimensions.get("screen");
const { width } = Dimensions.get("screen");
const height_logo = height * 0.1;
const width_logo = width * 0.90;

export default ContactScreen;

const styles = StyleSheet.create({
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30
  },
  text_footer: {
    color: '#05375a',
    fontSize: 14
  },

  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5
  }, logo: {
    width: width_logo,
    height: height_logo
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    paddingTop: 8,
    color: '#05375a',
    marginBottom: 10,
    bottom: Platform.OS === 'ios' ? 5 : 0,
    paddingLeft: 20

  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 50
  },
  signIn: {
    width: '100%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 3,
    borderColor: '#000',
  },
  Socialcontainer: {
    marginTop: 10,
    alignItems: 'center',
    padding: 20
  },

  signInButton: {
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2e3f6e',
    borderRadius: 8,
    flexDirection: 'row'
  },
  textSign: {
    fontSize: 15,
  },
  TextStyle: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600'
  },
  container: {
    width: '100%',
    height: '100%',
  },
  InformationText4: {
    fontSize: 15,
    color: '#000',
    marginRight: 'auto',
    left: 20
  },

  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 10
  },
  logo: {
    width: width_logo,
    height: height_logo,
    bottom: 25
  },
  HeaderText: {
    fontSize: 23,
    color: 'white',
    alignSelf: 'flex-start',
    top: '25%',
    left: '7%'
  },
  HeaderText2: {
    fontSize: 23,
    color: 'white',
    alignSelf: 'flex-start',
    top: '16%',
    left: '5%'
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 0,
    marginVertical: 10,
    marginBottom: 20
  },
  boxView: {
    top: '22.5%',
    position: 'absolute',
    backgroundColor: '#fff',
    margin: 'auto',
    alignSelf: 'center',
    borderTopEndRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    width: '90%',
    padding: 10,
    elevation: 10,
  },
  topShadow: {
    top: 0,
    right: 0,
    left: 0,
    width: '100%',
    height: '35%',
    backgroundColor: '#2e3f6e',
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,


    elevation: 10,
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30
  },
  text_footer: {
    color: '#05375a',
    fontSize: 14
  },

  textSign: {
    fontSize: 15,
  },
  TextStyle: {
    textAlign: 'center',
    fontSize: 15,
  },
  ButtonContainer: {
    alignItems: 'center'
  },
  SwipableCloseIcon: {
    width: '100%',
    flexDirection: 'row-reverse',
    marginRight: -25,
  },

  FullInputStyle: {
    marginVertical: 5,
    width: '100%',
    paddingLeft: 20,
    borderRadius: 8,
    fontSize: 15,
    margin: 0,
    padding: 10,
    borderColor: 'silver',
    borderWidth: 0.5,
  },
  TwoInformationInLineContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 365,
    alignSelf: 'center'
  },
  InformationContainer: {
    padding: 10,
    width: 385,
    alignSelf: 'center'
  },
  TwoValueInLineButton: {
    width: '47%',
    flexDirection: 'row',
    marginVertical: 8,
    padding: 10,
    justifyContent: 'space-between',
    borderWidth: 0.5,
    borderRadius: 8,
    borderColor: 'silver',
    alignItems: 'center'
  },
  TextInputContainer: {
    padding: 10,
    borderWidth: 0.5,
    borderColor: 'silver',
    borderRadius: 8,
    flexDirection: 'row',
    marginVertical: 5,
    alignSelf: 'center',
    width: 365
  },
  HalfInputStyle: {
    width: '90%',
    paddingLeft: 20,
    fontSize: 15,
    margin: 0,
  },
  OneValueInLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: 'silver',
    marginVertical: 7,
    padding: 10,
    width: 365,
    alignSelf: 'center'
  },
  InputTouchableContainer: {
    width: '95%',
    justifyContent: 'flex-start',
    flexDirection: 'row'
  },
  InformationText: {
    fontSize: 15,
    marginLeft: 20,
    marginRight: 'auto',
  },
  CurrencyContainer: {
    marginVertical: 30
  },
  EarningPriceItemContainer: {
    flexDirection: 'row',
    width: 365,

    justifyContent: 'space-between',
    borderRadius: 8,
    borderColor: 'silver',
    borderWidth: 0.5,
    marginVertical: 5,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  EarningPriceButtonContainer: {
    flexDirection: 'row',
    borderLeftWidth: 0.5,
    borderColor: 'silver',
    padding: 5,
    justifyContent: 'space-around',
    width: '30%',
  },
  EarningPriceInput: {
    padding: 5,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    width: '60%',
    fontSize: 15,
    marginLeft: 10,
    left: 20
  },
  EarningPriceButtonText: {
    fontSize: 15,
    marginRight: 5,
  },
  CoachOwnerContainer: {
    marginVertical: 10,
    width: 365,
    alignSelf: 'center'
  },
  ThreeValueInLineButton: {
    width: '100%',
    flexDirection: 'row',
    marginVertical: 5,
    padding: 10,
    justifyContent: 'space-between',
    borderWidth: 0.5,
    borderRadius: 8,
    borderColor: 'silver',
    alignItems: 'center'
  },
  action2: {
    flexDirection: 'row',
    marginVertical: 8,
    padding: 10,
    marginTop: 10,
    paddingBottom: 5,
    justifyContent: 'space-between',

    alignItems: 'center'
  },
  ButtonContainer: {
    alignItems: 'center'
  },
  SwipableCloseIcon: {
    width: '100%',
    flexDirection: 'row-reverse',
    marginRight: -25,
  },
  label: {
    margin: 8,
  },
  checkbox: {
    alignSelf: "stretch",

  },
  CheckboxView: {
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  FlagContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    padding: 4,

  },

  footer: {
    flex: 3,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30
  },
  text_footer: {
    color: '#05375a',
    fontSize: 14
  },

  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5
  }, logo: {
    width: width_logo,
    height: height_logo
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    paddingTop: 8,
    color: '#05375a',
    marginBottom: 10,
    bottom: Platform.OS === 'ios' ? 5 : 0,
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  picker: {
    left: 10
  },
  button: {
    alignItems: 'center',
    marginTop: 50
  },

});
