import React, { useState, useEffect, useContext } from 'react';
import { View, Alert, Text, Modal, Error, TextInput, StyleSheet, StatusBar, Platform, Dimensions, ImageBackground, Button } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import { showMessage } from '../Helpers';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { decode as atob, encode as btoa } from 'base-64'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Global } from './Global';
import MyHeader from '../component/MyHeader';
import MyButton from '../component/MyButton';
import MyButtonWhite from '../component/MyButtonWhite';

const STORAGE_KEY = "USER"
//const axios = require('axios').default;

const LoginScreen = ({ navigation }) => {

  const [data, setData] = React.useState({

    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });
  const updateSecureTExtEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry
    });
  }

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [getEmailPlaceholder, setEmailPlaceholder] = React.useState("")
  const [getPasswordPlaceholder, setPasswordPlaceholder] = React.useState("")
  const [getForgotPasswordText, setFotgotPasswordText] = React.useState("")
  const [getSignInButtonText, setSignInButtonText] = React.useState("")
  const [getNewToPedigreeText, setNewToPedigreeText] = React.useState("")
  const [getSignUpText, setSignUpText] = React.useState("")
  const [getEmailPlaceholderText, setEmailPlaceholderText] = React.useState("")
  const [getPasswordPlaceholderText, setPasswordPlaceholderText] = React.useState("")

  const saveData = async (data, email, password) => {
    try {
      const user = AsyncStorage.getItem('USER')
      if (user !== null) {
        await AsyncStorage.removeItem('USER')
        await AsyncStorage.setItem(STORAGE_KEY, data)
        await AsyncStorage.setItem('TOKEN', btoa(email + ":" + password))
        Global.Token = btoa(email + ":" + password);
        console.log('Data successfully saved')
      }
      else {
        await AsyncStorage.setItem(STORAGE_KEY, data)
        await AsyncStorage.setItem('TOKEN', btoa(email + ":" + password))
        Global.Token = btoa(email + ":" + password);
        console.log('Data successfully saved')
      }
      Global.IsLogin = true;
      Global.SideNavigationData = JSON.parse(data)[0].PAGE_LIST

    } catch (e) {
      console.log('Failed to save the data to the storage')
    }
  }

  const AlertMessage = (Title, Message) =>
    Alert.alert(
      Title,
      Message,
      [
        { text: "OK" }
      ]
    );
  React.useEffect(() => {
    setEmailPlaceholder("Enter Your Email")
    setPasswordPlaceholder("Enter Your Password")
    setFotgotPasswordText("Forgot Password ?")
    setSignInButtonText("Sign In")
    setNewToPedigreeText("New to PedigreeAll")
    setSignUpText("Sign Up")
    setEmailPlaceholderText("Email")
    setPasswordPlaceholderText("Password")

  }, []);

  return (
    <View style={styles.container}>
      <MyHeader
        showLogoWithoutBack={true}
      >
        <View style={{ padding: 20 }}>
          <Text style={styles.txt_footer}>{getEmailPlaceholderText}</Text>

          <View style={styles.action}>
            <Feather
              name="mail"
              color="#2e3f6e"
              size={20}
            />
            <TextInput
              placeholder={getEmailPlaceholder}
              //onChangeText={(email) => setEmail(email)}
              name={"username"}
              value={email}
              onChangeText={setEmail}
              style={styles.textInput}

              autoCapitalize="none"
              keyboardType='email-address'
            />
            {data.check_textInputChange ?
              <Animatable.View
                animation="bounceIn"
              >
                <Feather
                  name="check-circle"
                  color="green"
                  size={20}
                />
              </Animatable.View>
              : null}
          </View>

          <View>
            <Text style={styles.txt_footer}>{getPasswordPlaceholderText}</Text>
            <View style={styles.action}>
              <Feather
                name="lock"
                color="#2e3f6e"
                size={20}
              />
              <TextInput
                placeholder={getPasswordPlaceholder}
                //onChangeText={(password) => setPassword(password)}
                secureTextEntry={data.secureTextEntry ? true : false}
                name={"password"}
                value={password}
                onChangeText={setPassword}
                style={styles.textInput}
                autoCapitalize="none"
              />
              <TouchableOpacity
                onPress={updateSecureTExtEntry}
              >
                {data.secureTextEntry ?

                  <Feather
                    name="eye-off"
                    color="grey"
                    size={20}
                  />
                  :
                  <Feather
                    name="eye"
                    color="grey"
                    size={20}
                  />
                }

              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => {
              navigation.navigate("ForgotPassword");
            }}>
              <Text style={{ color: '#2e3f6e', marginTop: 15, marginTop: 0 }}>{getForgotPasswordText}</Text>
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: 35 }}>


            <MyButton
              Title="Sign In"
              Icon="log-in-outline"
              IconSize={24}
              onPress={() =>
                fetch('https://api.pedigreeall.com/systemuser/login', {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    EMAIL: email,
                    PASSWORD: password
                  })
                })
                  .then((response) => response.json())
                  .then((json) => {
                    {/*
                  navigation.navigate('Result', {
                    res: JSON.stringify(json)
                  })
                */}

                    if (showMessage(json)) {
                      Global.IsLogin = true;
                      saveData(JSON.stringify(json.m_cData), email, password)
                      navigation.navigate('MainDrawer')
                    }

                  })
                  .catch((error) => {
                    console.error(error);
                  })
              }
            ></MyButton>
            <MyButtonWhite
              Title="Sign Up"
              Icon="log-in-outline"
              IconSize={24}
              onPress={() => navigation.navigate('Register')}>
            </MyButtonWhite>
          </View>
        </View>
      </MyHeader>
    </View>
  );
};

const { height } = Dimensions.get("screen");
const { width } = Dimensions.get("screen");
const height_logo = height * 0.1;
const width_logo = width * 0.90;

export default LoginScreen;


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
});

