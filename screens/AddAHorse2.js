import React, { useState, useRef, useEffect, Component } from 'react'
import { View, Text, StyleSheet, Switch, TouchableOpacity, Platform, FlatList, Image, TextInput, ActivityIndicator, SafeAreaView, StatusBar } from 'react-native'
import { SearchBar, ListItem, Input } from "react-native-elements";
import Flag from "react-native-flags";
import * as ImagePicker from 'expo-image-picker';
import { ScrollView } from 'react-native-gesture-handler';
import RBSheet from "react-native-raw-bottom-sheet";
import { Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { Global } from './Global';
import Feather from 'react-native-vector-icons/Feather';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import RNPickerSelect from 'react-native-picker-select';
import InputSpinner from "react-native-input-spinner";
import MyHeader from '../component/MyHeader';
import MyButton from '../component/MyButton';
import MyButtonWhite from '../component/MyButtonWhite';
import Myloader from '../constants/Myloader';
import { useTranslation } from "react-i18next";
import i18n from "../component/i18n";
import { Translate } from '../component/Helper';

export function AddAHorse2({ navigation }) {

  const [getImage, setImage] = React.useState("");

  const BottomSheetRef = useRef();
  const [isDetail, setIsDetail] = useState(false);

  const [imageList, setImagelist] = useState([]);
  const [sexList, setSexList] = useState([])
  const [sexText, setSexText] = useState("Select a Gender")
  const [WinnerTypeList, setWinnerTypeList] = useState([])
  const [winnerText, setWinnerText] = useState("Select a Class")
  const [CurrencyTypeList, setCurrencyList] = useState([])
  const [earningText, setEarningText] = useState("$")
  const [priceText, setPriceText] = useState("$")
  const [isEarning, setEarning] = useState(false)
  const [CounrtyList, setCountryList] = useState([])
  const [CounrtyText, setCounrtyText] = useState("Select a Country")
  const [ColorList, setColorList] = useState([])
  const [ColorText, setColorText] = useState("Select a Color")
  const [searchValue, setSearchValue] = React.useState("")
  const [loader, setLoader] = React.useState(false)
  const [loaderText, setLoaderText] = React.useState("")
  const [getOwnerBreederName, setOwnerBreederName] = React.useState("")
  const [getCoachBreederOwner, setCoachBreederOwner] = React.useState("");
  const [getOwnerText, setOwnerText] = React.useState('');
  const [getBreederText, setBreederText] = React.useState('')
  const [getCoachText, setCoachText] = React.useState('')
  const [isLoading, SetisLoading] = React.useState(true);

  const [SireMareHorseData, setSireMareHorseData] = React.useState([]);
  const [SireMareHorseName, setSireMareHorseName] = React.useState([]);
  const [getOwnerBreederData, setOwnerBreederData] = React.useState([]);
  const [getCheckHorseAvaibleData, setCheckHorseAvaibleData] = React.useState([]);
  const [SireData, setSireData] = React.useState([]);
  const [MareData, setMareData] = React.useState([]);
  const [SireText, setSireText] = React.useState("");
  const [MareText, setMareText] = React.useState("");
  const bottomSheet = useRef();

  const [DeadCheckBox, setDeadCheckBox] = React.useState(false)
  const [AliveCheckBox, setAliveCheckBox] = React.useState(false)


  const [getHorseName, setHorseName] = React.useState("");
  const [getFatherObject, setFatherObject] = React.useState([])
  const [getMotherObject, setMotherObject] = React.useState([]);
  const [getRef1, setRef1] = React.useState(0);
  const [getHorseBirthDate, setHorseBirthDate] = React.useState(new Date());
  const [getRef2, setRef2] = React.useState(0);
  const [getEarn, setEarn] = React.useState("");
  const [getPrice, setPrice] = React.useState("");
  const [getOwner, setOwner] = React.useState("");
  const [getBreeder, setBreeder] = React.useState("");
  const [getCoach, setCoach] = React.useState("");
  const [getHeader, setHeader] = React.useState("");
  const [getInfo, setInfo] = React.useState("");
  const [getStartCount, setStartCount] = React.useState(0);
  const [getFirst, setFirst] = React.useState(0);
  const [getSecond, setSecond] = React.useState(0);
  const [getThird, setThird] = React.useState(0);
  const [getFourth, setFourth] = React.useState(0);
  const [getB, setB] = React.useState(0);
  const [getI, setI] = React.useState(0);
  const [getC, setC] = React.useState(0);
  const [getS, setS] = React.useState(0);
  const [getP, setP] = React.useState(0);
  const [getRmB, setRmB] = React.useState(0);
  const [getRmI, setRmI] = React.useState(0);
  const [getRmC, setRmC] = React.useState(0);
  const [getRmS, setRmS] = React.useState(0);
  const [getRmP, setRmP] = React.useState(0);
  const [getAnzB, setAnzB] = React.useState(0);
  const [getAnzI, setAnzI] = React.useState(0);
  const [getAnzC, setAnzC] = React.useState(0);
  const [getAnzS, setAnzS] = React.useState(0);
  const [getAnzP, setAnzP] = React.useState(0);

  const [getFatherName, setFatherName] = React.useState("");
  const [getMotherName, setMotherName] = React.useState("");
  const [getFatherID, setFatherID] = React.useState(-1);
  const [getMotherID, setMotherID] = React.useState(-1);
  const [getSexID, setSexID] = React.useState(1);
  const [getCountryID, setCountryID] = React.useState(1);
  const [SexID, SetSexID] = React.useState(1);

  const [getEarnCurrencyID, setEarnCurrencyID] = React.useState(1)
  const [getPriceCurrencyID, setPriceCurrencyID] = React.useState(1)
  const [getOwnerSystemUserID, setOwnerSystemUserID] = React.useState(1)
  const [getBreederSystemUserID, setBreederSystemUserID] = React.useState(1)
  const [getCoachSystemUserID, setCoachSystemUserID] = React.useState(1)
  const [getWinnerTypeID, setWinnerTypeID] = React.useState(1)
  const [getFamilyID, setFamilyID] = React.useState(1)
  const [getColorID, setColorID] = React.useState(1)

  const [checked_1, toggleChecked_1] = useState(true);
  const [checked_2, toggleChecked_2] = useState(false);

  const [checkStateMultiRM, setcheckStateMultiRM] = React.useState({ checked: [] });
  const [checkStateMultiANZ, setcheckStateMultiANZ] = React.useState({ checked: [] });
  const [checkStateMultiPA, setcheckStateMultiPA] = React.useState({ checked: [] });
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [isEnabled, setIsEnabled] = useState(false);
  const [BottomSheet, setBottomSheet] = useState()

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [photo, setPhoto] = React.useState(null);

  const handleChoosePhoto = () => {
    launchImageLibrary({ noData: true }, (response) => {
      // console.log(response);
      if (response) {
        setPhoto(response);
      }
    });
  };
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(new Date(currentDate))

  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };



  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
    });


    if (!result.cancelled) {
      setImagelist([])
      var fromList = [];
      fromList = imageList;
      var isHas = fromList.every(item => item.uri == result.uri);
      fromList.push(result);
      for (let index = 0; index < fromList.length; index++) {
        fromList[index].key = index;
      }
      setImagelist(fromList)
    }
  };


  const readDataSexList = async () => {
    let isMounted = true;
    let isActive = true;
    const abortCtrl = new AbortController();
    const opts = {
      signal: abortCtrl.signal,
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    };
    fetch('https://api.pedigreeall.com/Sex/Get', opts)
      .then((response) => response.json())
      .then((json) => {
        var list = [];
        json.m_cData.map(item => (
          list.push({
            label: Translate(item.SEX_TR, item.SEX_EN),
            value: item.SEX_ID,
            key: item.SEX_ID.toString()

          })
        ))
        if (isActive) {
          setSexList(list)
        }


      })
      .catch((error) => {
        console.error(error);
      })
    return () => { abortCtrl.abort(), isActive = false, isMounted = false };

  }

  const readDataWinnerList = async () => {
    let isMounted = true;
    let isActive = true;
    const abortCtrl = new AbortController();
    const opts = {
      signal: abortCtrl.signal,
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    };
    fetch('https://api.pedigreeall.com/WinnerType/Get', opts)
      .then((response) => response.json())
      .then((json) => {
        var list = [];
        json.m_cData.map(item => (
          list.push({
            label: Translate(item.WINNER_TYPE_TR, item.WINNER_TYPE_EN),
            value: item.WINNER_TYPE_ID,
            key: item.WINNER_TYPE_ID.toString()

          })
        ))
        if (isActive) {
          setWinnerTypeList(list)
        }
      })
      .catch((error) => {
        console.error(error);
      })
    return () => { abortCtrl.abort(), isActive = false, isMounted = false };

  };


  const readDataCurrencyList = async () => {
    let isMounted = true;
    let isActive = true;
    const abortCtrl = new AbortController();
    const opts = {
      signal: abortCtrl.signal,
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    };
    fetch('https://api.pedigreeall.com/Currency/Get', opts)
      .then((response) => response.json())
      .then((json) => {
        var list = [];
        json.m_cData.map(item => (
          list.push({
            label: item.ICON,
            value: item.CURRENCY_ID,
            key: item.CURRENCY_ID.toString()


          })
        ))
        if (isActive) {
          setCurrencyList(list)
        }


      })
      .catch((error) => {
        console.error(error);
      })
    return () => { abortCtrl.abort(), isActive = false, isMounted = false };

  }

  const readDataCountryList = async () => {
    let isMounted = true;
    let isActive = true;
    const abortCtrl = new AbortController();
    const opts = {
      signal: abortCtrl.signal,
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    };
    fetch('https://api.pedigreeall.com/Country/Get', opts)
      .then((response) => response.json())
      .then((json) => {
        var list = [];
        json.m_cData.map(item => (
          list.push({
            label: Translate(item.COUNTRY_TR, item.COUNTRY_EN),
            value: item.COUNTRY_ID,
            key: item.COUNTRY_ID.toString()

          })
        ))
        if (isActive) {
          setCountryList(list)
        }


      })
      .catch((error) => {
        console.error(error);
      })
    return () => { abortCtrl.abort(), isActive = false, isMounted = false };

  }

  const readDataColorList = async () => {
    let isMounted = true;
    let isActive = true;
    const abortCtrl = new AbortController();
    const opts = {
      signal: abortCtrl.signal,
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    };
    fetch('https://api.pedigreeall.com/Color/Get', opts)
      .then((response) => response.json())
      .then((json) => {
        var list = [];
        json.m_cData.map(item => (
          list.push({
            label: item.COLOR_TEXT,
            value: item.COLOR_ID,
            key: item.COLOR_ID.toString()

          })
        ))
        if (isActive) {
          setColorList(list)

        }


      })
      .catch((error) => {
        console.error(error);
      })
    return () => { abortCtrl.abort(), isActive = false, isMounted = false };
  };

  const readGetOwnerBreeder = async () => {
    try {
      const token = await AsyncStorage.getItem('TOKEN')
      if (token !== null) {
        fetch('https://api.pedigreeall.com/SystemUser/GetOwnerBreederByName?p_sName=' + getOwnerBreederName, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Basic " + token,
          },
        })
          .then((response) => response.json())
          .then((json) => {
            setOwnerBreederData(json.m_cData);
            SetisLoading(false)
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

  const readUser = async () => {


    try {
      const token = await AsyncStorage.getItem('TOKEN')
      if (token !== null) {
        fetch('https://api.pedigreeall.com/Horse/GetByName', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Basic " + token,
          },
          body: JSON.stringify({
            ID: 1,
            NAME: searchValue,
          })

        })
          .then((response) => response.json())
          .then((json) => {
            setLoaderText("Lütfen bekleyin..")
            setSireMareHorseData(json.m_cData)
            SetisLoading(false)
          })
          .catch((error) => {
            console.error(error);
          })
      }
      else {
        alert("Giriş Yapın")
      }
    } catch (e) {
    }
  }
  const readAddAHorse = async (fromApiImageList) => {
    try {
      const token = await AsyncStorage.getItem('TOKEN')
      if (token !== null) {
        let sendObj = {
          "HORSE_NAME": getHorseName,
          "FATHER_OBJECT": {
            "HORSE_ID": getFatherID
          },
          "MOTHER_OBJECT": {
            "HORSE_ID": getMotherID
          },
          "HORSE_BIRTH_DATE": getHorseBirthDate,
          "SEX_OBJECT": {
            "SEX_ID": getSexID
          },
          "COUNTRY_OBJECT": {
            "COUNTRY_ID": getCountryID
          },
          "PRICE": getPrice,
          "PRICE_CURRENCY_OBJECT": {
            'CURRENCY_ID': getPriceCurrencyID
          },
          "OWNER_OBJECT": {
            "SYSTEM_USER_ID": getOwnerSystemUserID
          },
          "OWNER": getOwner,
          "BREEDER_OBJECT": {
            "SYSTEM_USER_ID": getBreederSystemUserID
          },
          "BREEDER": getBreeder,
          "COACH_OBJECT": {
            "SYSTEM_USER_ID": getCoachSystemUserID
          },
          "COACH": getCoach,
          "HEADER": getHeader,
          "INFO": getInfo,
          "START_COUNT": getStartCount,
          "FIRST": getFirst,
          "SECOND": getSecond,
          "THIRD": getThird,
          "FOURTH": getFourth,
          "IS_DEAD_OBJECT": {
            "BOOL_ID": DeadCheckBox ? 1 : 0,
            "BOOL_ID": AliveCheckBox ? 1 : 0

          },
          "WINNER_TYPE_OBJECT": {
            "WINNER_TYPE_ID": getWinnerTypeID
          },
          "REF1": getRef1,
          "REF2": getRef2,
          "EARN": getEarn,
          "EARN_CURRENCY_OBJECT": {
            'CURRENCY_ID': getEarnCurrencyID
          },
          "IMAGE": fromApiImageList,
          "B": getB,
          "I": getI,
          "C": getC,
          "S": getS,
          "P": getP,
          "RM_B": getRmB,
          "RM_I": getRmI,
          "RM_C": getRmC,
          "RM_S": getRmS,
          "RM_P": getRmP,
          "ANZ_B": getAnzB,
          "ANZ_I": getAnzI,
          "ANZ_C": getAnzC,
          "ANZ_S": getAnzS,
          "ANZ_P": getAnzP,
          "RACE_ID": 1,
          "FAMILY_OBJECT": {
            "FAMILY_ID": getFamilyID
          },
          "COLOR_OBJECT": {
            "COLOR_ID": getColorID
          },
        };
        console.log(sendObj)
        fetch('https://api.pedigreeall.com/Horse/Add', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Basic " + token,
          },
          body: JSON.stringify(sendObj)
        })
          .then((response) => response.json())
          .then((json) => {
            setLoader(false)
            if (json.m_eProcessState === 1) {
              setIsDetail(false)
              setHorseName("")
              setFatherObject([])
              setMotherObject([])
              setHorseBirthDate("")
              setRef1("")
              setRef2("")
              setEarn("")
              setPrice("")
              setOwner("")
              setBreeder("")
              setCoach("")
              setHeader("")
              setInfo("")
              setStartCount("")
              setFirst("")
              setSecond("")
              setThird("")
              setFourth("")
              setImage("")
              setB(0)
              setI(0)
              setC(0)
              setS(0)
              setP(0)
              setRmB(0)
              setRmI(0)
              setRmC(0)
              setRmS(0)
              setRmP(0)
              setAnzB(0)
              setAnzC(0)
              setAnzI(0)
              setAnzP(0)
              setAnzS(0)
              setFatherID(-1)
              setMotherID(-1)
              setSexID(1)
              setCountryID(0)
              setEarnCurrencyID(1)
              setPriceCurrencyID(1)
              setOwnerSystemUserID(1)
              setBreederSystemUserID(1)
              setCoachSystemUserID(1)
              setWinnerTypeID(1)
              setFamilyID(1)
              setColorID(1)
              setSireText("")
              setMareText("")
              setSexText("Select a Gender")
              setCounrtyText("Select a Country")
              setWinnerText("Select a Class")
              setColorText("Select a Color")
              setDeadCheckBox(false)
              setAliveCheckBox(false)
              setEarningText("$")
              setPriceText("$")
              setOwnerText("")
              setBreederText("")
              setCoachText("")
              setImagelist([]);
            }

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

  const saveImage = async () => {
    const fromData = new FormData();
    imageList.map(item => {

      let filename = item.uri.substring(item.uri.lastIndexOf('/') + 1, item.uri.length)
      fromData.append("file", {
        name: filename,
        type: item.type,
        uri: Platform.OS === "android" ? item.uri : item.uri.replace("file://", "")
      });
    })
    try {
      const token = await AsyncStorage.getItem('TOKEN')
      if (token !== null) {
        fetch('https://api.pedigreeall.com/File/Horse?Race_Id=1', {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data; ',
            'Authorization': "Basic " + token,
          },
          body: fromData
        })
          .then((response) => response.json())
          .then((json) => {
            readAddAHorse(json)
          })
          .catch((error) => {
            console.log('error', error);
          })
      }
      else {
        console.log("Basarisiz")
      }
    } catch (e) {
    }

  }
  const readCheckHorseAvaible = async () => {
    setLoader(true)
    try {
      const token = await AsyncStorage.getItem('TOKEN')
      if (token !== null) {
        fetch('https://api.pedigreeall.com/Horse/CheckHorseAvailable?p_sName=' + getHorseName +
          '&p_iFatherId=' + getFatherObject.HORSE_ID +
          '&p_iMotherId=' + getMotherObject.HORSE_ID
          , {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Authorization': "Basic " + token,
            },
          })
          .then((response) => response.json())
          .then((json) => {
            console.log(JSON.stringify(json))

            setCheckHorseAvaibleData(json)
            if (json.m_cDetail.m_eProcessState < 0) {
              readAddAHorse();
              saveImage();
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
    }
  }
  const { t, i18n } = useTranslation();
  React.useEffect(() => {
    const abortCtrl = new AbortController();
    setSexList([])
    setWinnerTypeList([])
    setCurrencyList([])
    setCountryList([])
    setColorList([])

    readDataSexList();
    readDataWinnerList();
    readDataCurrencyList();
    readDataCountryList();
    readDataColorList();
    readUser()
    readGetOwnerBreeder()

    setOwnerText("")
    setBreederText("")
    setCoach("")
    return () => { abortCtrl.abort() };

  }, [])

  return (

    <View style={styles.Container}>
      <Myloader Show={loader} Text={t('LoaderText')} />
      <MyHeader Title={t('AddAHorse')}
        onPress={() => navigation.goBack()}
      >
        <RBSheet
          hasDraggableIcon={true}
          ref={BottomSheetRef}
          height={Dimensions.get('window').height - 100}
          closeOnDragDown={true}
          closeOnPressMask={true}
          animationType='fade'
          customStyles={{
            container: {
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10
            },
            wrapper: {
              backgroundColor: "#00000052"
            },
          }}
        >
          <View>

            {BottomSheet === "WinnerList" && (
              <View>
                {WinnerTypeList !== undefined &&
                  <ScrollView>
                    {WinnerTypeList.filter((x) => x.WINNER_TYPE_EN).map(
                      (item, i) => (
                        <ListItem
                          key={i}
                          bottomDivider
                          button
                          onPress={() => {
                            setWinnerText(item.WINNER_TYPE_EN)
                            setWinnerTypeID(item.WINNER_TYPE_ID)
                            BottomSheetRef.current.close()
                          }} >
                          <ListItem.Content>
                            <ListItem.Title>{item.WINNER_TYPE_EN}</ListItem.Title>
                          </ListItem.Content>
                          <ListItem.Chevron />
                        </ListItem>
                      ))}
                  </ScrollView>
                }
              </View>
            )
              || (BottomSheet === "CurrencyList" &&
                <View>
                  {CurrencyTypeList !== undefined &&
                    <ScrollView>
                      {CurrencyTypeList.filter((x) => x.ICON).map(
                        (item, i) => (
                          <ListItem
                            key={i}
                            bottomDivider
                            button
                            onPress={() => {
                              if (isEarning === true) {
                                setEarningText(item.ICON)
                                setEarnCurrencyID(item.CURRENCY_ID)
                              }
                              else if (isEarning === false) {
                                setPriceText(item.ICON)
                                setPriceCurrencyID(item.CURRENCY_ID)
                              }
                              BottomSheetRef.current.close()
                            }} >
                            <ListItem.Content>
                              <ListItem.Title>{item.ICON}</ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Chevron />
                          </ListItem>
                        ))}
                    </ScrollView>
                  }
                </View>
              )
              || (BottomSheet === "CountryList" &&
                <View>
                  {CounrtyList !== undefined &&
                    <ScrollView>
                      {CounrtyList.filter((x) => x.COUNTRY_EN).map(
                        (item, i) => (
                          <ListItem
                            key={i}
                            bottomDivider
                            button
                            onPress={() => {
                              setCounrtyText(item.COUNTRY_EN)
                              setCountryID(item.COUNTRY_ID)
                              BottomSheetRef.current.close()
                            }} >
                            <Flag code={item.ICON.toUpperCase()} size={24} />
                            <ListItem.Content>
                              <ListItem.Title>{item.COUNTRY_EN}</ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Chevron />
                          </ListItem>
                        ))}
                    </ScrollView>
                  }
                </View>
              )
              || (BottomSheet === "ColorList" &&
                <View>
                  {ColorList !== undefined &&
                    <ScrollView>
                      {ColorList.filter((x) => x.COLOR_TEXT).map(
                        (item, i) => (
                          <ListItem
                            key={i}
                            bottomDivider
                            button
                            onPress={() => {
                              setColorText(item.COLOR_TEXT)
                              setColorID(item.COLOR_ID)
                              BottomSheetRef.current.close();
                            }} >
                            <ListItem.Content>
                              <ListItem.Title>{item.COLOR_TEXT}</ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Chevron />
                          </ListItem>
                        ))}
                    </ScrollView>
                  }
                </View>
              )
              || (BottomSheet === "SireMareObject" &&
                <>
                  <SearchBar
                    placeholder="Search"
                    lightTheme
                    platform="ios"
                    cancelButtonTitle=""
                    inputStyle={{ fontSize: 12, minHeight: 'auto', height: 36 }}
                    containerStyle={{ backgroundColor: 'transparent', }}
                    inputContainerStyle={{ backgroundColor: '#F0F1F3', minHeight: 'auto', height: 'auto', top: '3%' }}
                    rightIconContainerStyle={{ margin: 0, padding: 0, minHeight: 'auto', height: 'auto' }}
                    leftIconContainerStyle={{ margin: 0, padding: 0, minHeight: 'auto', height: 'auto' }}
                    value={searchValue}
                    onChangeText={setSearchValue}
                    onSubmitEditing={() => {
                      SetisLoading(true);
                      readUser();
                    }}
                    showLoading={false}
                  />
                  {isLoading && (
                    <View style={{ width: "100%", zIndex: 1, }}>
                      <Image style={{ width: '100%', resizeMode: 'center', height: Dimensions.get('screen').height / 2.3 }} source={require('../assets/horseRun2.gif')} />
                    </View>
                  )}
                  {SireMareHorseData.length > 0 ?

                    <FlatList
                      scrollEnabled={true}
                      bounces={false}
                      style={styles.flatList2}
                      data={SireMareHorseData}
                      renderItem={({ item }) => (
                        <TouchableOpacity style={styles.item}
                          onPress={() => {
                            setSearchValue("")
                            if (SireMareHorseName === 'Sire') {

                              setSireText(item.HORSE_NAME);
                              setSireData(item);
                              setFatherID(item.HORSE_ID)
                              setFatherName(item.HORSE_NAME)
                              setFatherObject(item)

                            }
                            else if (SireMareHorseName === 'Mare') {
                              setMareText(item.HORSE_NAME);
                              setMareData(item);
                              setMotherID(item.HORSE_ID)
                              setMotherName(item.HORSE_NAME)
                              setMotherObject(item)
                            }
                            setSireMareHorseData([])
                            BottomSheetRef.current.close();
                          }}
                        >
                          <Image style={styles.image}
                            source={{ uri: item.IMAGE }}
                            resizeMode="cover"
                          />
                          <View style={{ flexDirection: 'column' }}>
                            <View style={{ flexDirection: 'row' }}>
                              <Text style={[styles.textStyle2]}>{t('HorseText')}</Text>

                              <Text style={styles.textStyle}>
                                {item.HORSE_NAME}
                              </Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                              <Text style={[styles.textStyle2]}>{t('SireText2')}</Text>

                              <Text style={styles.textStyle}>
                                {item.FATHER_NAME}
                              </Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                              <Text style={[styles.textStyle2]}>{t('MareText2')}</Text>
                              <Text style={styles.textStyle}>
                                {item.MOTHER_NAME}
                              </Text>
                            </View>

                          </View>

                        </TouchableOpacity>)}
                      keyExtractor={item => item.HORSE_ID.toString()}
                    />

                    :
                    null
                  }

                </>
              )
              || (BottomSheet === "Owner" &&

                <>
                  <SearchBar
                    placeholder="Search"
                    lightTheme
                    platform="ios"
                    cancelButtonTitle=""
                    inputStyle={{ fontSize: 12, minHeight: 'auto', height: 36 }}
                    containerStyle={{ backgroundColor: 'transparent', }}
                    inputContainerStyle={{ backgroundColor: '#F0F1F3', minHeight: 'auto', height: 'auto', top: '3%' }}
                    rightIconContainerStyle={{ margin: 0, padding: 0, minHeight: 'auto', height: 'auto' }}
                    leftIconContainerStyle={{ margin: 0, padding: 0, minHeight: 'auto', height: 'auto' }}
                    value={getOwnerBreederName}
                    onChangeText={setOwnerBreederName}
                    onSubmitEditing={() => {
                      SetisLoading(true);
                      readGetOwnerBreeder();
                    }}
                    showLoading={false}
                  />

                  {isLoading && (
                    <View style={{ width: "100%", zIndex: 1, }}>
                      <Image style={{ width: '100%', resizeMode: 'center', height: Dimensions.get('screen').height / 2.3 }} source={require('../assets/horseRun2.gif')} />
                    </View>
                  )}
                  {getOwnerBreederData.length > 0 ?

                    <FlatList
                      scrollEnabled={true}
                      bounces={false}
                      style={styles.flatList2}
                      data={getOwnerBreederData}
                      renderItem={({ item }) => (
                        <TouchableOpacity style={styles.item}
                          onPress={() => {
                            if (getCoachBreederOwner === "Owner") {
                              setOwnerText(item.NAME)
                              setOwnerSystemUserID(item.ID)
                              setOwner(item.NAME)

                            }
                            else if (getCoachBreederOwner === "Breeder") {
                              setBreederText(item.NAME)
                              setBreederSystemUserID(item.ID)
                              setBreeder(item.NAME)
                            }
                            else if (getCoachBreederOwner === "Coach") {
                              setCoachText(item.NAME)
                              setCoachSystemUserID(item.ID)
                              setCoach(item.NAME)
                            }

                            BottomSheetRef.current.close();
                          }}
                        >

                          <View style={{ flexDirection: 'column' }}>
                            <View style={{ flexDirection: 'row' }}>
                              <Text style={styles.textStyle}>
                                {item.NAME}
                              </Text>
                            </View>


                          </View>

                        </TouchableOpacity>)}
                      keyExtractor={item => item.NAME.toString()}
                    />
                    :
                    null
                  }
                </>

              )

              || BottomSheet === "RomanMiller" &&

              <>
                {RomanMillerData.map((item, i) => (
                  <ListItem
                    key={i}
                    bottomDivider
                    onPress={() => {
                      pressRM(item)

                    }}
                  >
                    <ListItem.CheckBox
                      checked={checkStateMultiRM.checked.includes(item.title)}
                      checkedIcon='circle'
                      uncheckedIcon='circle'
                      center={true}
                      checkedColor='#2169ab'
                      uncheckedColor='rgb(232, 237, 241)'
                      onPress={() => {
                        pressRM(item)
                      }} />
                    <ListItem.Content>
                      <ListItem.Title>{item.title}</ListItem.Title>
                    </ListItem.Content>

                  </ListItem>
                ))}
              </>

              || BottomSheet === "ANZ" &&

              <>
                {RomanMillerData.map((item, i) => (
                  <ListItem
                    key={i}
                    bottomDivider
                    onPress={() => {
                      pressANZ(item)

                    }}
                  >
                    <ListItem.CheckBox
                      checked={checkStateMultiANZ.checked.includes(item.title)}
                      checkedIcon='circle'
                      uncheckedIcon='circle'
                      center={true}
                      checkedColor='#2169ab'
                      uncheckedColor='rgb(232, 237, 241)'
                      onPress={() => {
                        pressANZ(item)
                      }} />
                    <ListItem.Content>
                      <ListItem.Title>{item.title}</ListItem.Title>
                    </ListItem.Content>

                  </ListItem>
                ))}
              </>

              || BottomSheet === "PA" &&

              <>
                {RomanMillerData.map((item, i) => (
                  <ListItem
                    key={i}
                    bottomDivider
                    onPress={() => {
                      pressPA(item)

                    }}
                  >
                    <ListItem.CheckBox
                      checked={checkStateMultiPA.checked.includes(item.title)}
                      checkedIcon='circle'
                      uncheckedIcon='circle'
                      center={true}
                      checkedColor='#2e3f6e'
                      uncheckedColor='rgb(232, 237, 241)'
                      onPress={() => {
                        pressPA(item)
                      }} />
                    <ListItem.Content>
                      <ListItem.Title>{item.title}</ListItem.Title>
                    </ListItem.Content>

                  </ListItem>
                ))}
              </>
            }


          </View>
        </RBSheet>

        <ScrollView style={styles.header}>


          <ScrollView style={{ padding: 10, top: 15 }}>
            <View style={{ marginTop: 20 }}>

              <Text style={styles.text_footer}>{t('NameText')}</Text>
              <View style={[styles.action]}>
                <Ionicons name="person-outline" size={25} color="#2e3f6e" />
                <TextInput
                  placeholder={t('NameText')}
                  name={"username"}
                  value={getHorseName}
                  onChangeText={setHorseName}
                  style={styles.textInput}

                />

              </View>
              <Text style={styles.text_footer}>{t('SireText')}</Text>
              <View style={styles.action}>
                <TouchableOpacity
                  onPress={() => {
                    setBottomSheet('SireMareObject')
                    setSireMareHorseName('Sire')
                    BottomSheetRef.current.open();
                  }}
                  style={styles.TwoValueInLineButton}>
                  <Ionicons name="male-outline" size={22} color="#2e3f6e" />
                  <Text style={styles.InformationText3}>{t('SireText2')}{SireText}
                  </Text>
                  <Feather name="plus" size={22} color="silver" />
                </TouchableOpacity>
              </View>
              <Text style={styles.text_footer}>{t('MareText')}</Text>
              <View style={styles.action}>
                <TouchableOpacity
                  onPress={() => {
                    setBottomSheet('SireMareObject')
                    setSireMareHorseName('Mare')
                    BottomSheetRef.current.open()
                  }}
                  style={styles.TwoValueInLineButton}>
                  <Ionicons name="female-outline" size={22} color="#2e3f6e" />
                  <Text style={styles.InformationText3}>{t('MareText2')}{MareText}
                  </Text>
                  <Feather name="plus" size={22} color="silver" />
                </TouchableOpacity>
              </View>
              <Text style={styles.text_footer}>{t('BirthDateText')}</Text>
              <View style={styles.action}>
                <TouchableOpacity onPress={() => {

                  if (Platform.OS === "ios") {
                    setShow(true)
                    bottomSheet.current.open()
                  } else {
                    setShow(true)

                  }
                }}
                  style={styles.InputTouchableContainer}>
                  <Ionicons name="calendar-outline" size={22} color="#2e3f6e" />
                  <Text style={[styles.InformationText, { left: 5 }]}>
                    {moment(date).format("DD.MM.YYYY")}
                  </Text>

                  <View >

                    {Platform.OS === "android" && show && (
                      <DateTimePicker style={{ width: 200, }}

                        name={"StartRequestDate"}
                        value={date}
                        mode={mode}

                        is24Hour={true}
                        onChange={onChange}
                        display="spinner"

                      />
                    )}

                    <RBSheet hasDraggableIcon ref={bottomSheet}


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
                      <View style={{ borderBottomWidth: 0.7, borderBottomColor: '#CFCFD5', paddingLeft: 20, padding: 10, bottom: 5 }}>
                        <Text style={{ fontSize: 22 }}>{t('BirthDateText')}</Text>
                      </View>
                      {show && (
                        <DateTimePicker style={{ width: Dimensions.get('window').width }}
                          locale={(Global.Language === 1 ? "tr_TR" : "en_GB")}
                          name={"StartRequestDate"}
                          value={date}
                          mode={mode}
                          is24Hour={true}
                          onChange={onChange}
                          display="spinner"
                        />
                      )}
                    </RBSheet>
                  </View>
                </TouchableOpacity>

              </View>

              <Text style={styles.text_footer}>{t('SexText')}</Text>
              <View style={styles.action}>
                <Ionicons name="transgender-outline" size={22} color="#2e3f6e" />

                <RNPickerSelect
                  placeholder={{}}

                  style={
                    pickerSelectStyles
                  }
                  Icon={() => {
                    return <Ionicons style={{ paddingRight: '20%' }} name="chevron-down-outline" size={20} color="silver" />;

                  }}


                  useNativeAndroidPickerStyle={false}
                  onValueChange={(value) => { setSexID(value); }}
                  items={sexList}
                  value={getSexID}
                  key={getSexID}

                />
              </View>
              <Text style={styles.text_footer}>{t('CountryText')}</Text>
              <View style={styles.action}>
                <Ionicons name="flag-outline" size={22} color="#2e3f6e" />

                <RNPickerSelect
                  placeholder={{}}
                  style={
                    pickerSelectStyles
                  }
                  Icon={() => {
                    return <Ionicons style={{ paddingRight: '20%' }} name="chevron-down-outline" size={20} color="silver" />;
                  }}
                  useNativeAndroidPickerStyle={false}
                  onValueChange={(value) => { setCountryID(value); }}
                  items={CounrtyList}
                  value={getCountryID}
                  key={getCountryID}
                />
              </View>


              <Text style={styles.text_footer}>{t('ClassText')}</Text>
              <View style={styles.action}>
                <Ionicons name="list-outline" size={22} color="#2e3f6e" />

                <RNPickerSelect
                  placeholder={{}}
                  style={
                    pickerSelectStyles
                  }
                  Icon={() => {
                    return <Ionicons style={{ paddingRight: '20%' }} name="chevron-down-outline" size={20} color="silver" />;

                  }}


                  useNativeAndroidPickerStyle={false}
                  onValueChange={(value) => { setWinnerTypeID(value); }}
                  items={WinnerTypeList}
                  value={getWinnerTypeID}
                  key={getWinnerTypeID}


                />
              </View>
              <Text style={styles.text_footer}>{t('ColorText')}</Text>
              <View style={styles.action}>
                <Ionicons name="color-filter-outline" size={22} color="#2e3f6e" />

                <RNPickerSelect
                  placeholder={{}}

                  style={
                    pickerSelectStyles
                  }
                  Icon={() => {
                    return <Ionicons style={{ paddingRight: '20%' }} name="chevron-down-outline" size={20} color="silver" />;

                  }}


                  useNativeAndroidPickerStyle={false}
                  onValueChange={(value) => { setColorID(value); }}
                  items={ColorList}
                  value={getColorID}
                  key={getColorID}


                />
              </View>

              <View style={styles.TextInputContainer}>
                <Text style={[styles.text_footer, { top: 25 }]}>{t('FirstPlaceText')}</Text>
                <View style={styles.action5}>

                  <InputSpinner
                    step={1}
                    colorMax={"#f04048"}
                    colorMin={"#40c5f4"}
                    colorLeft={"rgba(149, 162, 209, 0.6)"}
                    colorRight={"rgba(149, 162, 209, 0.6)"}
                    colorPress={"#40c5f4"}
                    longStep={5}
                    editable={false}

                    colorPress={"#2e3f6e"}
                    inputStyle={{ width: 45 }}
                    value={getFirst}
                    onChange={(num) => {
                      setFirst(num)
                    }}
                  />
                </View>
                <Text style={[styles.text_footer, { top: 25 }]}>{t('SecondPlaceText')}</Text>
                {/*<Feather name="award" size={22} color="#2e3f6e" />*/}
                <View style={styles.action5}>

                  <InputSpinner
                    step={1}
                    colorMax={"#f04048"}
                    colorMin={"#40c5f4"}
                    colorLeft={"rgba(149, 162, 209, 0.6)"}
                    colorRight={"rgba(149, 162, 209, 0.6)"}
                    colorPress={"#40c5f4"}
                    longStep={5}
                    editable={false}
                    colorPress={"#2e3f6e"}
                    inputStyle={{ width: 45 }}
                    value={getSecond}
                    onChange={(num) => {
                      setSecond(num)
                    }}
                  />
                </View>
                <Text style={[styles.text_footer, { top: 25 }]}>{t('ThirdPlaceText')}</Text>
                <View style={styles.action5}>
                  <InputSpinner
                    step={1}
                    colorMax={"#f04048"}
                    colorMin={"#40c5f4"}
                    colorLeft={"rgba(149, 162, 209, 0.6)"}
                    colorRight={"rgba(149, 162, 209, 0.6)"}
                    colorPress={"#40c5f4"}
                    longStep={5}
                    editable={false}
                    colorPress={"#2e3f6e"}
                    inputStyle={{ width: 45 }}
                    value={getThird}
                    onChange={(num) => {
                      setThird(num)
                    }}
                  />
                </View>
                <Text style={[styles.text_footer, { top: 25 }]}>{t('FourthPlaceText')}</Text>
                <View style={styles.action5}>
                  <InputSpinner
                    step={1}
                    colorMax={"#f04048"}
                    colorMin={"#40c5f4"}
                    colorLeft={"rgba(149, 162, 209, 0.6)"}
                    colorRight={"rgba(149, 162, 209, 0.6)"}
                    colorPress={"#2e3f6e"}
                    editable={false}
                    longStep={5}
                    colorPress={"#77b5fe"}
                    inputStyle={{ width: 45 }}
                    value={getFourth}
                    onChange={(num) => {
                      setFourth(num)
                    }}
                  />
                </View>
                <Text style={[styles.text_footer, { top: 25 }]}>{t('StartText')}</Text>
                <View style={styles.action5}>
                  <InputSpinner
                    step={1}
                    colorMax={"#40c5f4"}
                    colorLeft={"rgba(149, 162, 209, 0.6)"}
                    colorRight={"rgba(149, 162, 209, 0.6)"}
                    colorMin={"#40c5f4"}
                    editable={false}
                    longStep={5}
                    colorPress={"#2e3f6e"}
                    inputStyle={{ width: 45 }}
                    value={getStartCount}
                    onChange={(num) => {
                      setStartCount(num)
                    }}
                  />
                </View>
              </View>
              <View style={[styles.action, { bottom: 30, paddingTop: 15 }]}>
                <Text style={styles.text_footer}>{t('DeadText')}</Text>
                <Switch
                  trackColor={{ false: "#D6D6D6", true: "#2e3f6e" }}
                  thumbColor={isEnabled ? "#fff" : "#fff"}
                  ios_backgroundColor="#D6D6D6"
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                  style={{ marginRight: 'auto', left: 30, bottom: Platform.OS == 'ios' ? 5 : 0 }}
                />

              </View>

              <View style={{}}>
                <Text style={styles.text_footer}>{t('EarningText')}</Text>
                <View style={styles.action4}>
                  <View style={{ left: 0, top: 10 }}>
                    <Ionicons name="cash-outline" size={22} color="#2e3f6e" /></View>
                  <TextInput
                    style={styles.EarningPriceInput}
                    placeholder={t('EarningText')}
                    keyboardType="numeric"
                    value={getEarn}
                    onChangeText={setEarn}
                  />

                  <RNPickerSelect

                    placeholder={{}}

                    style={
                      pickerMiniStyle
                    }
                    Icon={() => {
                      return <Ionicons style={{ paddingRight: '15%', paddingBottom: -3, top: 10 }} name="chevron-down-outline" size={20} color="silver" />;

                    }}


                    useNativeAndroidPickerStyle={false}
                    onValueChange={(value) => { setEarnCurrencyID(value); }}
                    items={CurrencyTypeList}
                    value={getEarnCurrencyID}
                    key={getEarnCurrencyID}


                  />
                </View>

                <Text style={styles.text_footer}>{t('PriceText')}</Text>
                <View style={styles.action4}>
                  <View style={{ left: 0, top: 10 }}>
                    <Ionicons name="wallet-outline" size={22} color="#2e3f6e" /></View>
                  <TextInput
                    style={styles.EarningPriceInput}
                    placeholder={t('PriceText')}
                    keyboardType="numeric"
                    value={getPrice}
                    onChangeText={setPrice}
                  />

                  <RNPickerSelect
                    placeholder={{}}

                    style={
                      pickerMiniStyle
                    }
                    Icon={() => {
                      return <Ionicons style={{ paddingRight: '15%', paddingBottom: -3, top: 10 }} name="chevron-down-outline" size={20} color="silver" />;

                    }}


                    useNativeAndroidPickerStyle={false}
                    onValueChange={(value) => { setPriceCurrencyID(value); }}
                    items={CurrencyTypeList}
                    value={getPriceCurrencyID}
                    key={getPriceCurrencyID}


                  />
                </View>

              </View>


              <View style={styles.CoachOwnerContainer}>
                <Text style={styles.text_footer}>{t('OwnerText')}</Text>
                <TouchableOpacity
                  onPress={() => {
                    setBottomSheet("Owner")
                    setCoachBreederOwner("Owner")
                    BottomSheetRef.current.open()
                  }}
                  style={styles.action}>
                  <Ionicons name="person-outline" size={22} color="#2e3f6e" />
                  <Text style={styles.InformationText4}>{t('OwnerText2')}{getOwnerText}</Text>
                  <Ionicons name="add-outline" size={24} color="silver" />
                </TouchableOpacity>
                <Text style={styles.text_footer}>{t('CoachText')}</Text>
                <TouchableOpacity
                  onPress={() => {
                    setBottomSheet("Owner")
                    setCoachBreederOwner("Coach")
                    BottomSheetRef.current.open()
                  }}
                  style={styles.action}>
                  <Ionicons name="person-outline" size={22} color="#2e3f6e" />
                  <Text style={styles.InformationText4}>{t('CoachText2')}{getCoachText}</Text>
                  <Ionicons name="add-outline" size={24} color="silver" />
                </TouchableOpacity>
                <Text style={styles.text_footer}>{t('BreederText')}</Text>
                <TouchableOpacity
                  onPress={() => {
                    setBottomSheet("Owner")
                    setCoachBreederOwner("Breeder")
                    BottomSheetRef.current.open()
                  }}
                  style={styles.action}>
                  <Ionicons name="person-outline" size={22} color="#2e3f6e" />
                  <Text style={styles.InformationText4}>{t('BreederText2')}{getBreederText}</Text>
                  <Feather name="plus" size={22} color="silver" />
                </TouchableOpacity>
              </View>

              <View style={{ marginVertical: 15 }}>
                <Text style={styles.text_footer}>{t('HeaderText')}</Text>
                <TextInput
                  style={styles.action}
                  placeholder={t('HeaderText')}
                  name={"Header"}
                  value={getHeader}
                  onChangeText={setHeader}
                  numberOfLines={1}
                />
                <Text style={styles.text_footer}>{t('ParagraphText')}</Text>
                <TextInput
                  style={[styles.action4, { height: 100, textAlignVertical: 'top', }]}
                  placeholder={t('ParagraphText')}
                  name={"Paragraph"}
                  value={getInfo}
                  onChangeText={setInfo}
                  multiline={true}
                />
              </View>
              <ScrollView horizontal={true}>
                <View style={{
                  paddingTop: 0,
                  flex: 1,
                  flexDirection: 'row',
                }}>


                  {imageList.map((prop, key) => {

                    return (
                      <View
                        key={prop.key}
                        style={{

                          width: 100,
                          height: 100,
                          margin: 5,
                          borderWidth: 1,
                          borderColor: '#a3a19d',
                          borderRadius: 4,
                          padding: 2,

                        }}>
                        <TouchableOpacity
                          style={{ position: 'absolute', left: 5, top: 5, zIndex: 1, backgroundColor: '#D51515', borderRadius: 50 }}
                          onPress={() => {
                            // this doesn't work yet
                            var newList = imageList.filter((item) => item !== prop);
                            console.log(newList)

                            setImagelist(newList);

                          }}>
                          <Ionicons name="close-outline" size={24} color="#fff" />
                        </TouchableOpacity>
                        <Image style={{ width: 90, height: 89, resizeMode: 'cover' }} source={{ uri: prop.uri }} />
                      </View>
                    );
                  })}
                </View>
              </ScrollView>
              <MyButtonWhite
                Title={t('UploadButton')}
                Icon="cloud-upload-outline"
                IconSize={24}
                onPress={pickImage}>
              </MyButtonWhite>
              <View style={{ marginTop: '5%', marginBottom: 40, paddingBottom: 40 }}>
                <MyButton
                  Title={t('AddButton')}
                  Icon="add-circle-outline"
                  IconSize={24}
                  onPress={async (e) => {
                    if (getFatherID !== -1 && getMotherID !== -1) {
                      readCheckHorseAvaible()
                    }
                    else {
                      alert(t('TabSearchAlert'))
                    }
                  }
                  }
                >
                </MyButton>
              </View>

            </View>
          </ScrollView>
        </ScrollView>
      </MyHeader>

    </View>
  )



}
const { height } = Dimensions.get("screen");
const { width } = Dimensions.get("screen");
const height_logo = height * 0.1;
const width_logo = width * 0.90;
const windowWidth = Dimensions.get('window').width - 100;

const styles = StyleSheet.create({
  Container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff'
  },
  PrimaryIconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0e1e2',
    borderWidth: .5,
    borderColor: '#fff',
    height: 40,
    borderRadius: 6,
    margin: 5,
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
  AddAHorseContainer: {
    position: "absolute",
    height: "100%",
    width: "100",
  },
  Title: {
    fontSize: 24,
    fontWeight: '500',
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  ButtonsContainer: {
    marginVertical: 20
  },
  OneValueInLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: 'silver',
    marginVertical: 5,
    padding: 10
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
  HalfInputStyle: {
    //backgroundColor:'#e8e8e8',

    flexDirection: 'row',
    justifyContent: 'space-between',
    width: windowWidth + 60,
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    paddingTop: 8,
    color: '#000',
  },
  HalfInputStyleNew: {
    width: '90%',
    paddingLeft: 20,
    fontSize: 15,
    margin: 0,
    alignSelf: 'center'
  },
  LongImputStyle: {
    marginVertical: 5,
    width: '100%',
    height: 100,
    paddingLeft: 20,
    borderRadius: 8,
    fontSize: 15,
    margin: 0,
    padding: 10,
    borderColor: 'silver',
    borderWidth: 0.5,
    lineHeight: 23,
    textAlignVertical: 'top',
  },
  HeaderStyle: {
    padding: 8,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: 'silver',
    fontSize: 15,
    paddingLeft: 20,
    height: 43
  },
  SubmitButton: {
    marginVertical: 15,
    padding: 10,
    width: '100%',
    color: 'blue',
  },
  SwipableCloseIcon: {
    width: '100%',
    flexDirection: 'row-reverse',
    marginRight: -25
  },
  TwoValueInLineButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: windowWidth + 40,
    paddingTop: 10,
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 5,
    color: '#05375a',
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
  InformationText: {
    fontSize: 15,
    marginLeft: 20,
    marginRight: 'auto',
  },
  InformationText2: {
    fontSize: 15,
    left: 15,

    color: '#000',
  },
  InformationText3: {
    fontSize: 15,
    left: 20,
    marginRight: 'auto',
    color: '#000',

  },
  InformationText4: {
    fontSize: 15,
    color: '#000',
    marginRight: 'auto',
    left: 20
  },
  InformationText5: {
    fontSize: 15,
    color: '#000',
    alignItems: 'center'
  },

  InputText: {
    fontSize: 15,
    color: '#000',
    marginLeft: 15
  },
  InputTouchableContainer: {
    width: '95%',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignSelf: 'center'

  },
  EarningPriceItemContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    borderRadius: 8,
    borderColor: 'silver',
    borderWidth: 0.5,
    marginVertical: 5
  },
  EarningPriceButtonContainer: {
    flexDirection: 'row',
    borderLeftWidth: 0.5,
    borderColor: 'silver',
    padding: 5,
    justifyContent: 'space-around',
    width: '20%',
    top: 0,
    color: 'black'
  },
  EarningPriceInput: {
    padding: 5,
    width: '60%',
    fontSize: 15,
    marginLeft: 15,
    height: 43,
    paddingBottom: 5

  },
  EarningPriceButtonText: {
    fontSize: 15,
    marginRight: 5,
  },
  TwoInformationInLineContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ImagePickerContainer: {
    marginVertical: 8,
    width: "100%",
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: 'silver',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  ImagePickerImage: {
    marginLeft: 10,
    width: 300,
    height: 100,
    resizeMode: 'stretch'
  },
  TextInputContainerDate: {
    padding: 5,
    borderWidth: 0.5,
    borderColor: 'silver',
    borderRadius: 8,
    flexDirection: 'row',
    marginVertical: 5
  },
  TextInputContainer: {
    marginVertical: 30,

  },
  TextInputLineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'silver',
    padding: 5,
    borderRadius: 8,
    marginVertical: 5
  },
  CurrencyContainer: {
    marginVertical: 10
  },
  CoachOwnerContainer: {
    marginVertical: 0,

  },
  ImageContainer: {
    padding: 10,
    alignItems: 'center'
  },
  TextInputHeader: {
    fontSize: 15,
    fontWeight: 'bold',
    alignSelf: 'center',
    left: 10
  },
  header: {
    flex: 1,

    paddingHorizontal: 20,
    paddingBottom: 10
  },
  headFooter: {
    backgroundColor: '#2e3f6e',
    borderBottomRightRadius: 30,
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30
  },

  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 10,
    marginVertical: 20
  },
  action2: {
    flexDirection: 'row',
    marginVertical: 8,
    padding: 10,
    marginTop: 10,
    paddingBottom: 5,
    justifyContent: 'space-between',
    borderWidth: 0.5,
    borderRadius: 8,
    borderColor: 'silver',
    alignItems: 'center'
  },
  action3: {
    flexDirection: 'row',
    marginTop: 10,
    paddingBottom: 5
  },
  action4: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 0,
    marginVertical: 20,


  },
  action5: {
    flexDirection: 'row-reverse',
    marginTop: -8,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 10,
    marginVertical: 20,
    paddingLeft: 'auto',
    right: 10
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5
  },
  logo: {
    width: width_logo,
    height: height_logo,
    bottom: 25
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 20,
    paddingTop: 8,
    color: '#05375a',
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
    borderWidth: 1,
    borderColor: '#2e3f6e',
    top: 10,
    flexDirection: 'row'
  },
  signInButton: {
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2e3f6e',
    borderRadius: 8,
    flexDirection: 'row',
    top: 30,
  },
  textSign: {
    fontSize: 15,
  },
  TextStyle: {
    textAlign: 'center',
    fontSize: 15,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 14,
  },
  pickerSelectStyles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: windowWidth + 40,
    top: 5,
    left: 15,
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -5,
    paddingLeft: 10,
    paddingTop: 8,
    color: '#000',
  },
  HorseName: {
    marginBottom: 10,
    fontWeight: '500',
    fontSize: 16,
  },
  textStyle: {
    left: 5,

    fontSize: 12
  },
  textStyle2: {
    left: 5,
    fontSize: 13,
    fontWeight: 'bold'
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 10,
  },
  heightText: {
    marginTop: 15,
    fontSize: 22,
    fontWeight: "700",
  },
  flatList: {
    paddingBottom: 20,
    paddingTop: 10,
    borderTopWidth: 0.5,
    borderTopColor: '#CFCFD5',
    marginTop: 10,
    marginLeft: -15,
    maxHeight: Dimensions.get('screen').height / 2.2,

  },
  flatList2: {
    paddingBottom: 20,
    paddingTop: 10,
    marginTop: 10,
    marginLeft: 15,
    maxHeight: Dimensions.get('screen').height / 1.4,

  },
  item: {
    flexDirection: 'row',
    width: 360,
    left: -15,
    padding: 10,
    marginVertical: 7,
    marginHorizontal: 16,
    zIndex: 1,
    borderBottomWidth: 0.5,
    borderBottomColor: '#d6d3d3',

  },
  title: {
    fontSize: 32,
  },
  latestItem: {
    flexDirection: 'row',
    width: 360,
    left: -10,
    padding: 10,
    marginVertical: 7,
    marginHorizontal: 16,
    zIndex: 1,
    borderBottomWidth: 0.5,
    borderBottomColor: '#d6d3d3',
  },

})

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: windowWidth + 40,
    bottom: 5,
    left: 15,
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    paddingTop: 8,
    color: '#000',
  },
  inputAndroid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: windowWidth + 60,
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    paddingTop: 8,
    color: '#000',
    left: 15
  },
  placeholder: { color: '#9a9aa1', fontSize: 14, bottom: 10 },

});

const pickerMiniStyle = StyleSheet.create({
  inputIOS: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: windowWidth - 210,
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -10,
    paddingTop: 8,
    color: '#000',
    top: 10,

  },
  inputAndroid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: windowWidth - 210,
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -10,
    paddingTop: 8,
    color: '#000',
    top: 10,


  },
});

