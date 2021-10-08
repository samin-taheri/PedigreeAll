import React, { useState, useEffect } from 'react';
import { View, Alert, Text, Modal, Image, Error, TextInput, StyleSheet, StatusBar, Platform, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { decode as atob, encode as btoa } from 'base-64'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Global } from './Global';
import { Ionicons } from '@expo/vector-icons';
import MyHeader from '../component/MyHeader';
import MyButton from '../component/MyButton';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [checked, toggleChecked] = React.useState(false);
  const [focus_email, focus_email_toggle] = React.useState(true);

  const [getEmailPlaceholder, setEmailPlaceholder] = React.useState("")
  const [getSendPasswordButtonText, setSendPasswordButtonText] = React.useState("")
  const [getEmailText, setEmailText] = React.useState("")


  React.useEffect(() => {
    if (Global.Language === 1) {
      setEmailPlaceholder("Eposta adresini gir")
      setSendPasswordButtonText("Şifre Gönder")
      setEmailText("Eposta")
    }
    else {
      setEmailPlaceholder("Enter your email address")
      setSendPasswordButtonText("Send Password")
      setEmailText("Email")
    }
  }, []);

  return (
    <View style={styles.container}>
      <MyHeader
        onPress={() => navigation.goBack()}
        showLogo={true}
      >
        <View style={{ padding: 20 }}>

          <Text style={styles.text_footer}>{getEmailText}</Text>
          <View style={styles.action}>
            <Feather
              name="mail"
              color="#2e3f6e"
              size={20}
            />
            <TextInput
              placeholder={getEmailPlaceholder}
              name={"username"}
              value={email}
              keyboardType='email-address'
              onChangeText={setEmail}
              style={styles.textInput}
              autoCapitalize="none"
            />

          </View>
          <View style={{ marginTop: 10 }}>
            
            <MyButton
              Title="Send Password"
              Icon="send-outline"
              IconSize={18}
              onPress={async () => {
                fetch('https://api.pedigreeall.com/systemuser/RemindPassword?p_sEmail=' + email, {
                  method: 'GET',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                  },
                })
                  .then((response) => response.json())
                  .then((json) => {
                    alert(json.m_lUserMessageList[0])
                    navigation.navigate('Login')
                  })
                  .catch((error) => {
                    console.error(error);
                  })

              }}
            >
            </MyButton>
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

export default ForgotPasswordScreen;


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