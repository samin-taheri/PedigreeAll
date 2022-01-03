import React, { useRef, useState, useEffect } from 'react'
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Platform,
  Dimensions
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyButton from '../component/MyButton';
import MyHeader from '../component/MyHeader';
import * as Animatable from 'react-native-animatable';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import RNPickerSelect from 'react-native-picker-select';
import { useTranslation } from "react-i18next";
import i18n from "../component/i18n";

function MyAccount({ navigation }) {

  const { t, i18n } = useTranslation();

  const [password, setPassword] = React.useState("");
  const [getIsLoading, setIsLoading] = React.useState(false);
  const [getSystemUserTypeData, setSystemUserTypeData] = React.useState();
  const [getPersonTypeData, setPersonTypeData] = React.useState([]);
  const [time, setTime] = React.useState(true);

  const [getPersonTypeID, setPersonTypeID] = React.useState("")
  const [getName, setName] = React.useState("")
  const [getSurname, setSurname] = React.useState("")
  const [getEmail, setEmail] = React.useState("")
  const [getTitle, setTitle] = React.useState("")
  const [getID, setID] = React.useState("")
  const [getTaxOffice, setTaxOffice] = React.useState("")
  const [getCountryID, setCountryID] = React.useState(0)
  const [getAddress, setAddress] = React.useState("")
  const [getCellPhone, setCellPhone] = React.useState("")

  const [CounrtyList, setCountryList] = useState([])
  const [getShowFlag, setShowFlag] = useState(false)
  const [getShowDetail, setShowDetail] = useState(false)


  const UpdateProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('TOKEN')
      if (token !== null) {
        fetch('https://api.pedigreeall.com/SystemUser/UpdateMyProfile', {

          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Basic " + token,
          },
          body: JSON.stringify({
            ADDRESS: getAddress,
            CELL_PHONE: getCellPhone,
            COUNTRY_OBJECT: {
              COUNTRY_ID: getCountryID
            },
            EMAIL: getEmail,
            ID: getID,
            NAME: getName,
            PASSWORD: password,
            PERSON_TYPE_OBJECT: {
              PERSON_TYPE_ID: getPersonTypeID
            },
            SURNAME: getSurname,
            TAX_OFFICE: getTaxOffice,
            TITLE: getTitle,
            IBAN: password,
            SHOW_DETAIL: getShowDetail,
            SHOW_FLAG: getShowFlag

          })
        })
          .then((response) => response.json())
          .then((json) => {
            navigation.navigate('Result', {
              res: JSON.stringify(json)
            })
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

  const readPersonTypeList = async () => {
    try {
      const token = await AsyncStorage.getItem('TOKEN')
      if (token !== null) {
        fetch('https://api.pedigreeall.com/PersonType/Get', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Basic " + token,
          },
        })
          .then((response) => response.json())
          .then((json) => {
            var list = [];
            json.m_cData.map(item => (
              list.push({
                label: item.PERSON_TYPE_EN,
                value: item.PERSON_TYPE_ID,
                key: item.PERSON_TYPE_ID.toString()
              })
            ))
            setPersonTypeData(list)
          })
          .catch((error) => {
            console.error(error);
          })
      }
      else {
        console.log("Basarisiz")
      }
    } catch (e) {
    }
  }

  const readSystemUserTypeList = async () => {
    try {
      const token = await AsyncStorage.getItem('TOKEN')
      if (token !== null) {
        fetch('https://api.pedigreeall.com/SystemUserType/Get', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Basic " + token,
          },
        })
          .then((response) => response.json())
          .then((json) => {
            setSystemUserTypeData(json.m_cData)
            setIsLoading(false)
          })
          .catch((error) => {
            console.error(error);
          })
      }
      else {
        console.log("Basarisiz")
      }
    } catch (e) {
    }
  }

  const readMyProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('TOKEN')
      if (token !== null) {
        fetch('https://api.pedigreeall.com/SystemUser/GetByProfile', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Basic " + token,
          }
        })
          .then((response) => response.json())
          .then((json) => {
            
            let user = json.m_cData[0];
            setName(user.NAME)
            setSurname(user.SURNAME)
            setEmail(user.EMAIL)
            setPassword(user.PASSWORD)
            setTaxOffice(user.TAX_OFFICE)
            setTitle(user.TITLE)
            setID(user.ID)
            setAddress(user.ADDRESS)
            setCellPhone(user.CELL_PHONE)
            setCountryID(user.COUNTRY_OBJECT.COUNTRY_ID)
            setPersonTypeID(user.PERSON_TYPE_OBJECT.PERSON_TYPE_ID)
            setTime(false)
          })
          .catch((error) => {
            console.error(error);
          })
      }
      else {
        console.log("Basarisiz")
      }
    } catch (e) {
    }
  }

  const readCountryGet = async () => {
    try {
      const token = await AsyncStorage.getItem('TOKEN')
      if (token !== null) {
        fetch('https://api.pedigreeall.com/Country/Get', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Basic " + token,
          },
        })
          .then((response) => response.json())
          .then((json) => {
            var list = [];
            json.m_cData.map(item => (
              list.push({
                label: item.COUNTRY_EN,
                value: item.COUNTRY_ID,
                key: item.COUNTRY_ID.toString()
              })
            ))
            setCountryList(list)
          })
          .catch((error) => {
            console.error(error);
          })
      }
      else {
        console.log("Basarisiz")
      }
    } catch (e) {
    }
  }

  const [data, setData] = React.useState({
    email: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
    confirm_secureTextEntry: true,
  });

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry
    });
  }

  React.useEffect(() => {
    readPersonTypeList();
    readSystemUserTypeList();
    readCountryGet();
    readMyProfile();
  }, [])


  return (
    <View style={styles.container}>

      <MyHeader
        onPress={() => navigation.goBack()}
        Title={t('MyAccount')}
      >
        <View style={{ padding: 20 }}>
          {time ?
            <ActivityIndicator style={styles.Activity} color="rgba(52, 77, 169, 0.6)" size="large" />
            :
            <ScrollView style={{padding: '2%'}}>
              <Text style={styles.text_footer}>{t('EmailText')}</Text>
              <View style={styles.action}>
                <Feather
                  name="mail"
                  color="#2e3f6e"
                  size={20}
                />
                <TextInput
                  style={styles.HalfInputStyle}
                  keyboardType="email-address"
                  value={getEmail}

                  onChangeText={setEmail}
                />

              </View>

              <View >
                <Text style={styles.text_footer}>{t('PasswordText')}</Text>
                <View style={styles.action}>
                  <Feather
                    name="lock"
                    color="#2e3f6e"
                    size={20}
                  />
                  <TextInput
                    style={styles.textInput2}
                    autoCapitalize="none"
                    name={"password"}
                    value={password}
                    onChangeText={setPassword}
                  />
                  <TouchableOpacity
                    onPress={updateSecureTextEntry}
                  >

                  </TouchableOpacity>
                </View>
              </View>

              <View>
                <Text style={styles.text_footer}>{t('NameText')}</Text>
                <View style={styles.action}>
                  <Feather
                    name="user"
                    color="#2e3f6e"
                    size={20}
                  />
                  <TextInput
                    style={styles.HalfInputStyle}
                    value={getName}
                    onChangeText={setName}
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
              </View>
              <View >
                <Text style={styles.text_footer}>{t('SurnameText')}</Text>
                <View style={styles.action}>
                  <Feather
                    name="user"
                    color="#2e3f6e"
                    size={20}
                  />
                  <TextInput
                    style={styles.HalfInputStyle}
                    value={getSurname}
                    onChangeText={setSurname}
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
              </View>

              <View >
                <Text style={styles.text_footer}>{t('TaxOfficeText')}</Text>
                <View style={styles.action}>
                  <Feather
                    name="user-check"
                    color="#2e3f6e"
                    size={20}
                  />

                  <TextInput
                    style={styles.HalfInputStyle}
                    value={getTaxOffice}
                    onChangeText={setTaxOffice}
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
              </View>

              <View >
                <Text style={styles.text_footer}>{t('TitleText')}</Text>
                <View style={styles.action}>
                  <Feather
                    name="user-check"
                    color="#2e3f6e"
                    size={20}
                  />
                  <TextInput
                    style={styles.HalfInputStyle}
                    value={getTitle}
                    onChangeText={setTitle}
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
              </View>

              <View>
                <Text style={styles.text_footer}>{t('PassportText')}</Text>
                <View style={styles.action}>
                  <Feather
                    name="grid"
                    color="#2e3f6e"
                    size={20}
                  />
                  <TextInput
                    style={styles.HalfInputStyle}
                    value={getID}
                    onChangeText={setID}
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
              </View>

              <View >
                <Text style={styles.text_footer}>{t('CountryText')}</Text>
                <View style={styles.action}>
                  <Feather
                    name="globe"
                    color="#2e3f6e"
                    size={20}
                  />

                  <RNPickerSelect
                    placeholder={{}}

                    style={
                      pickerSelectStyles
                    }
                    Icon={() => {
                      return <FontAwesome5
                        name="angle-down"
                        color="gray"
                        size={20}
                      />;

                    }}

                    useNativeAndroidPickerStyle={false}
                    onValueChange={(value) => { setCountryID(value); }}
                    items={CounrtyList}
                    value={getCountryID}
                    key={getCountryID.toString()}
                  />


                </View>

              </View>

              <View >
                <Text style={styles.text_footer}>{t('AddressText')}</Text>
                <View style={styles.action}>
                  <Feather
                    name="map-pin"
                    color="#2e3f6e"
                    size={20}
                  />

                  <TextInput
                    style={styles.HalfInputStyle}
                    value={getAddress}
                    onChangeText={setAddress}
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
              </View>
              <View>
                <Text style={styles.text_footer}>{t('PhoneText')}</Text>
                <View style={styles.action}>
                  <Feather
                    name="phone"
                    color="#2e3f6e"
                    size={20}
                  />
                  <TextInput
                    style={styles.HalfInputStyle}
                    keyboardType="phone-pad"
                    value={getCellPhone.toString()}
                    onChangeText={setCellPhone}
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
              </View>
              <View >

                <Text style={styles.text_footer}>{t('MemberTypeText')}</Text>
                <View style={styles.action}>
                  <Feather
                    name="user-plus"
                    color="#2e3f6e"
                    size={20}
                  />

                  <RNPickerSelect
                    placeholder={{}}

                    style={
                      pickerSelectStyles
                    }
                    Icon={() => {
                      return <FontAwesome5
                        name="angle-down"
                        color="gray"
                        size={20}
                      />;

                    }}

                    useNativeAndroidPickerStyle={false}
                    onValueChange={(value) => { setPersonTypeID(value); }}
                    items={getPersonTypeData}
                    value={getPersonTypeID}
                    key={getPersonTypeID.toString()}
                  />

                </View>
              </View>

              <View style={{ marginTop: 15, marginBottom: 50 }}>

                <MyButton
                  Title={t('SubmitButtonText')}
                  Icon="checkmark-circle-outline"
                  IconSize={24}
                  onPress={() => {
                    UpdateProfile();
                  }}
                />
              </View>

            </ScrollView>
          }
        </View>
      </MyHeader>
    </View >
  )
}
const windowWidth = Dimensions.get('window').width - 100;

export default MyAccount;

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    paddingHorizontal: 16,
    fontSize: 15,
    flex: 1,
    marginTop: -20,
    minHeight: 56,
    maxHeight: 56,
    width: '100%',
    bottom: 5,
    left: 15,
    borderRadius: 4,
    marginBottom: 0,
    justifyContent: 'center',
    paddingTop: 5,
  },
  viewContainer: {
    flex: 1,
  },
  inputAndroid: {
    marginLeft: 10,
    color: 'black',
    marginTop: -20,
    fontSize: 15,
    flex: 1,
    minHeight: 56,
    maxHeight: 56,
    width: windowWidth,
    borderRadius: 4,
    justifyContent: 'center',
    paddingTop: 8,
    left: 13,
  },
  placeholder: { color: '#9a9aa1', fontSize: 14 },
});

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
  textInput2: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 20,
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
  Container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff'
  },
  BottomSheetInputsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 0.5,
    borderRadius: 8,
    borderColor: 'silver',
    padding: 10,
    marginVertical: 2
  },
  OneValueInLineButton: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  InformationText: {
    fontSize: 16,
    marginLeft: 5
  },
  SwipableCloseIcon: {
    width: '100%',
    flexDirection: 'row-reverse',
    marginRight: -25
  },
  ButtonContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20
  },
  FullInputStyle: {
    marginVertical: 5,
    width: '100%',
    paddingLeft: 20,
    borderRadius: 8,
    fontSize: 18,
    margin: 0,
    padding: 10,
    borderColor: 'silver',
    borderWidth: 0.5,
  },
  TextInputContainer: {
    padding: 10,
    borderWidth: 0.5,
    borderColor: 'silver',
    borderRadius: 8,
    flexDirection: 'row',
    marginVertical: 5
  },
  TextInputHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  HalfInputStyle: {
    width: '90%',
    paddingLeft: 20,
    fontSize: 16,
    margin: 0,
  },

  ErrorMessageContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  ErrorMessageTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222'
  },
  ErrorMessageText: {
    fontSize: 16,
    color: '#c7c1c1',
    textAlign: 'center',
    marginTop: 5
  },
  ErrorMessageButtonContainer: {
    width: '80%',
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  SortTypeContainer: {
    width: '100%',
    padding: 10,
    paddingRight: 15,
    alignItems: 'flex-end'
  },
  SortTypeButton: {
    flexDirection: 'row',
    backgroundColor: '#2169ab',
    padding: 10,
    borderRadius: 6,
    elevation: 10,
    width: '50%'
  },
  SortTypeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center'
  },
  Activity: {
    bottom: '30%', shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.27,
    elevation: 4,
    backgroundColor: '#fff',
    width: 50,
    height: 50,
    paddingLeft: Platform.OS == 'ios' ? 3 : 0,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
})