import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Linking, Dimensions, Animated, Platform, Modal, ActivityIndicator } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Global } from './Global';
import Icon from "react-native-vector-icons/FontAwesome5";
import MyHeader from '../component/MyHeader';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { DataTable } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import LoginScreen from './LoginScreen';
import HorseDetailScreenPedigree from './HorseDetailScreenPedigree';
import HorseDetailScreenProfile from './HorseDetailScreenProfile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import WebView from 'react-native-webview';

const Tab = createMaterialTopTabNavigator();
const windowWidth = Dimensions.get('window').width / 3;

const HorseDetailScreen = ({ route, navigation }) => {

  const { HORSE_NAME } = route.params;
  const { HORSE_ID } = route.params;
  const { HORSE_NAME2 } = route.params;
  const { Generation } = route.params;
  const { Stallion } = route.params;

  const [getHorseId, setHorseId] = React.useState(0);

  const [HorseInformationData, setSearchHorseData] = useState();
  Global.Generation = Generation;
  const [getData, setData] = React.useState([]);
  const [ModalText, setModalText] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [FullScreenVisible, setFullScreenVisible] = useState(false);
  const [HorseInfo, setHorseInfo] = React.useState();
  const [getHorseGetByName, setHorseGetByName] = useState();
  const [getStatisticInfo, setStatisticInfo] = React.useState();
  const [getFoalInfo, setFoalInfo] = React.useState();
  const [getFoalNum, setFoalNum] = React.useState(1);
  const [time, setTime] = React.useState(true);

  const [getScreenName, setScreenName] = React.useState("Pedigree")
  const scrollRef = useRef(ScrollView);

  const [getPedigreeLineColor, setPedigreeLineColor] = React.useState("rgba(52, 77, 169, 0.6)");
  const [getPedigreeColor, setPedigreeColor] = React.useState("rgba(52, 77, 169, 0.6)");

  const [getProfileLineColor, setProfileLineColor] = React.useState("#fff");
  const [getProfileColor, setProfileColor] = React.useState("#000");
  const [getProgencyLineColor, setProgencyLineColor] = React.useState("#fff");
  const [getProgencyColor, setProgencyColor] = React.useState("#000");

  const [getSiblingsMareLineColor, setSiblingsMareLineColor] = React.useState("#fff");
  const [getSiblingsMareColor, setSiblingsMareColor] = React.useState("#000");
  const [getSiblingsSireLineColor, setSiblingsSireLineColor] = React.useState("#fff");
  const [getSiblingsSireColor, setSiblingsSireColor] = React.useState("#000");

  const [getSiblingsBroodmareSireLineColor, setSiblingsBroodmareSireLineColor] = React.useState("#fff");
  const [getSiblingsBroodmareSireColor, setSiblingsBroodmareSireColor] = React.useState("#000");

  const [getTailFemaleLineColor, setTailFemaleLineColor] = React.useState("#fff");
  const [getTailFemaleColor, setTailFemaleColor] = React.useState("#000");

  const [getBroodmareSireLineColor, setBroodmareSireLineColor] = React.useState("#fff");
  const [getBroodmareSireColor, setBroodmareSireColor] = React.useState("#000");

  const [getLinebreedingLineColor, setLinebreedingLineColor] = React.useState("#fff");
  const [getLinebreedingColor, setLinebreedingColor] = React.useState("#000");

  const [getFemaleFamilyLineColor, setFemaleFamilyLineColor] = React.useState("#fff");
  const [getFemaleFamilyColor, setFemaleFamilyColor] = React.useState("#000");

  const [getTJKLineColor, setTJKLineColor] = React.useState("#fff");
  const [gettJKColor, setTJKColor] = React.useState("#000");
  const [getNickLineColor, setNickLineColor] = React.useState("#fff");
  const [getNickColor, setNickColor] = React.useState("#000");

  const [getFamilyLineColor, setFamilyLineColor] = React.useState("#fff");
  const [getFamilyColor, setFamilyColor] = React.useState("#000");


  const readHorseInfo = async () => {
    try {
      const token = await AsyncStorage.getItem('TOKEN')
      if (token !== null) {
        fetch('https://api.pedigreeall.com/ImageInfo/GetById?p_iHorseId=' + HORSE_ID, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Basic " + token,
          },
        }).then((response) => response.json())
          .then((json) => {
            //console.log(json);
            setHorseInfo(json.m_cData);
          })
          .catch((error) => {
            console.error(error);
          })
      }
      else { console.log("Basarisiz") }
    }
    catch (e) { console.log(e) }
  }
  const readFoalInfo = async () => {
    try {
      const token = await AsyncStorage.getItem('TOKEN')
      if (token !== null) {
        fetch('https://api.pedigreeall.com/ParentPage/GetByIdAsNameAndId?p_iHorseId=' + HORSE_ID + "&p_iLanguageId=" + Global.Language, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Basic " + token,
          },
        }).then((response) => response.json())
          .then((json) => {
            setFoalInfo(json.m_cData);
          })
          .catch((error) => {
            console.error(error);
          })
      }
      else { console.log("Basarisiz") }
    }
    catch (e) { console.log(e) }
  }
  const readStatisticInfo = async (FoalNum) => {
    try {
      const token = await AsyncStorage.getItem('TOKEN')
      if (token !== null) {
        fetch('https://api.pedigreeall.com/HorseInfo/GetFoals?p_iHorseId=' + HORSE_ID + "&p_iTypeId=" + FoalNum, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Basic " + token,
          },
        }).then((response) => response.json())
          .then((json) => {
            setStatisticInfo(json.m_cData);
            setTime(false)
          })
          .catch((error) => {
            console.error(error);
          })
      }
      else { console.log("Basarisiz") }
    }
    catch (e) { console.log(e) }
  }

  const readHorseGetByName = async () => {
    try {
      const token = await AsyncStorage.getItem('TOKEN')
      if (token !== null) {
        //console.log(atob('Z2ZydWx1dGFzQGhvdG1haWwuY29tOjEyMw=='))
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
            setHorseGetByName(json.m_cData)
            setLoader(false)
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

  const myFunction = async () => {
    let isActive = true;
    let isSubscribed = true;
    const abortCtrl = new AbortController();
    const opts = {
      signal: abortCtrl.signal,
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "Basic " + "Z2ZydWx1dGFzQGhvdG1haWwuY29tOjE=",
      },
      body: JSON.stringify({
        ID: 1,
        NAME: HORSE_NAME,
      })
    };
    fetch('https://api.pedigreeall.com/Horse/GetByName', opts)
      .then((response) => response.json())
      .then((json) => {
        setSearchHorseData(json)
        var aa = [];
        json.m_cData.map((i, index) => (
          aa.push({
            HORSE_DATA: i,
            HORSE_ID: i.HORSE_ID
          })
        ))

        if (isSubscribed) {
          setData(aa)
          //console.log(aa)
        }

      })
      .catch((error) => {

        console.error(error);

      })

    return () => { abortCtrl.abort(), isActive = false, isSubscribed = false };
  };

  useEffect(() => {
    setHorseId(route.params?.HorseId)
    myFunction()
    readHorseGetByName()
    readHorseInfo();
    readFoalInfo();
  }, []);

  return (
    <View style={styles.Container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            padding: 25
          }}>
          <Ionicons
            name="arrow-back-outline"
            color="#fff"
            size={30}
          />
        </TouchableOpacity>
        <View style={{ marginBottom: 'auto', flexDirection: 'row', bottom: '3%', left: '25%' }}>
          <Text style={styles.textStyles}>{HORSE_NAME}</Text>
          {/*
          <Text style={styles.textStyles}> {Generation}</Text>
          <Text style={styles.textStyles}> {Stallion}</Text>
        */}
        </View>



        <View style={{ bottom: '12%' }}>
          <View style={styles.StabilInformationButtonContainer3Value}>
            <TouchableOpacity
              onPress={() => {

              }}
              style={styles.StabilInformationButton}>
              <Feather name="info" size={16} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
              }}
              style={styles.StabilInformationButton}>
              <Ionicons name="stats-chart-outline" size={16} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
              }}
              style={styles.StabilInformationButton}>
              <Feather name="image" size={16} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                const supported = Linking.canOpenURL('https://www.pedigreeall.com//pdf/Pedigree.ashx?FIRST_ID=' + HORSE_ID + '&SECOND_ID=-1');
                if (supported) {
                  Linking.openURL('https://www.pedigreeall.com//pdf/Pedigree.ashx?FIRST_ID=' + HORSE_ID + '&SECOND_ID=-1');
                } else {
                  Alert.alert(`Don't know how to open this URL: ${'https://www.pedigreeall.com//pdf/Pedigree.ashx?FIRST_ID=' + HORSE_ID + '&SECOND_ID=-1'}`);
                }
              }}
              style={styles.StabilInformationButton}>
              <Feather name="file-text" size={16} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                //checkPermission();
              }}
              style={styles.StabilInformationButton}>
              <Feather name="image" size={16} color="#fff" />
            </TouchableOpacity>
          </View>

        </View>

      </View>
      <Animatable.View style={styles.headerContainer2}
        animation="fadeInDown">
        <ScrollView
          ref={scrollRef}
          style={{ height: 30, bottom: '3%' }}
          showsHorizontalScrollIndicator={false}
          horizontal={true}>
          <View style={styles.TabNavigationContainer}>
            <TouchableOpacity
              style={[styles.TabNavigationItem, { borderColor: getPedigreeLineColor }]}
              onPress={() => {
                setScreenName("Pedigree")
                setPedigreeLineColor("rgba(52, 77, 169, 0.6)")
                setPedigreeColor("rgba(52, 77, 169, 0.6)")


                setNickLineColor("#fff")
                setNickColor("#222")

                setFamilyLineColor("#fff")
                setFamilyColor("#222")

                setProfileLineColor("#fff")
                setProfileColor("#222")

                setProgencyLineColor("#fff")
                setProgencyColor("#222")

                setSiblingsMareLineColor("#fff")
                setSiblingsMareColor("#222")

                setSiblingsSireLineColor("#fff")
                setSiblingsSireColor("#222")

                setSiblingsBroodmareSireLineColor("#fff")
                setSiblingsBroodmareSireColor("#222")

                setTailFemaleLineColor("#fff")
                setTailFemaleColor("#222")

                setBroodmareSireLineColor("#fff")
                setBroodmareSireColor("#222")

                setLinebreedingLineColor("#fff")
                setLinebreedingColor("#222")

                setFemaleFamilyLineColor("#fff")
                setFemaleFamilyColor("#222")

                setTJKLineColor("#fff")
                setTJKColor("#222")
              }}
            >
              <Icon name="network-wired" size={14} color={getPedigreeColor} style={{ alignSelf: 'center' }} />
              <Text style={{ color: getPedigreeColor, paddingLeft: 5 }}>Pedigree</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.TabNavigationItem, { borderColor: getProfileLineColor }]}
              onPress={() => {
                setScreenName("Profile")
                setPedigreeLineColor("#fff")
                setPedigreeColor("#222")

                setNickLineColor("#fff")
                setNickColor("#222")

                setFamilyLineColor("#fff")
                setFamilyColor("#222")

                setProfileLineColor("rgba(52, 77, 169, 0.6)")
                setProfileColor("rgba(52, 77, 169, 0.6)")

                setProgencyLineColor("#fff")
                setProgencyColor("#222")

                setSiblingsMareLineColor("#fff")
                setSiblingsMareColor("#222")

                setSiblingsSireLineColor("#fff")
                setSiblingsSireColor("#222")

                setSiblingsBroodmareSireLineColor("#fff")
                setSiblingsBroodmareSireColor("#222")

                setTailFemaleLineColor("#fff")
                setTailFemaleColor("#222")

                setBroodmareSireLineColor("#fff")
                setBroodmareSireColor("#222")

                setLinebreedingLineColor("#fff")
                setLinebreedingColor("#222")

                setFemaleFamilyLineColor("#fff")
                setFemaleFamilyColor("#222")

                setTJKLineColor("#fff")
                setTJKColor("#222")
              }}
            >
              <Icon name="id-card" size={14} color={getProfileColor} style={{ alignSelf: 'center' }} />
              <Text style={{ color: getProfileColor, paddingLeft: 5 }}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.TabNavigationItem, { borderColor: getProgencyLineColor }]}
              onPress={() => {
                setScreenName("Progency")

                setProgencyLineColor("rgba(52, 77, 169, 0.6)")
                setProgencyColor("rgba(52, 77, 169, 0.6)")

                setNickLineColor("#fff")
                setNickColor("#222")

                setFamilyLineColor("#fff")
                setFamilyColor("#222")

                setPedigreeLineColor("#fff")
                setPedigreeColor("#222")

                setProfileLineColor("#fff")
                setProfileColor("#222")

                setSiblingsMareLineColor("#fff")
                setSiblingsMareColor("#222")

                setSiblingsSireLineColor("#fff")
                setSiblingsSireColor("#222")

                setSiblingsBroodmareSireLineColor("#fff")
                setSiblingsBroodmareSireColor("#222")

                setTailFemaleLineColor("#fff")
                setTailFemaleColor("#222")

                setBroodmareSireLineColor("#fff")
                setBroodmareSireColor("#222")
                setLinebreedingLineColor("#fff")
                setLinebreedingColor("#222")

                setFemaleFamilyLineColor("#fff")
                setFemaleFamilyColor("#222")

                setTJKLineColor("#fff")
                setTJKColor("#222")


              }}
            >
              <Icon name="cloudsmith" size={14} color={getProgencyColor} style={{ alignSelf: 'center' }} />
              <Text style={{ color: getProgencyColor, paddingLeft: 5 }}>Progeny</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.TabNavigationItem, { borderColor: getNickLineColor }]}
              onPress={() => {
                setScreenName("Nick")
                setNickLineColor("rgba(52, 77, 169, 0.6)")
                setNickColor("rgba(52, 77, 169, 0.6)")

                setFamilyLineColor("#fff")
                setFamilyColor("#222")

                setProgencyLineColor("#fff")
                setProgencyColor("#222")

                setPedigreeLineColor("#fff")
                setPedigreeColor("#222")

                setProfileLineColor("#fff")
                setProfileColor("#222")

                setSiblingsMareLineColor("#fff")
                setSiblingsMareColor("#222")

                setSiblingsSireLineColor("#fff")
                setSiblingsSireColor("#222")

                setSiblingsBroodmareSireLineColor("#fff")
                setSiblingsBroodmareSireColor("#222")

                setTailFemaleLineColor("#fff")
                setTailFemaleColor("#222")

                setBroodmareSireLineColor("#fff")
                setBroodmareSireColor("#222")

                setLinebreedingLineColor("#fff")
                setLinebreedingColor("#222")

                setFemaleFamilyLineColor("#fff")
                setFemaleFamilyColor("#222")

                setTJKLineColor("#fff")
                setTJKColor("#222")

              }}
            >
              <Icon name="cloudsmith" size={14} color={getNickColor} style={{ alignSelf: 'center' }} />
              <Text style={{ color: getNickColor, paddingLeft: 5 }}>Nick</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.TabNavigationItem, { borderColor: getFamilyLineColor }]}
              onPress={() => {
                setScreenName("Family")
                setFamilyLineColor("rgba(52, 77, 169, 0.6)")
                setFamilyColor("rgba(52, 77, 169, 0.6)")

                setNickLineColor("#fff")
                setNickColor("#222")
                setProgencyLineColor("#fff")
                setProgencyColor("#222")

                setPedigreeLineColor("#fff")
                setPedigreeColor("#222")

                setProfileLineColor("#fff")
                setProfileColor("#222")

                setSiblingsMareLineColor("#fff")
                setSiblingsMareColor("#222")

                setSiblingsSireLineColor("#fff")
                setSiblingsSireColor("#222")

                setSiblingsBroodmareSireLineColor("#fff")
                setSiblingsBroodmareSireColor("#222")

                setTailFemaleLineColor("#fff")
                setTailFemaleColor("#222")

                setBroodmareSireLineColor("#fff")
                setBroodmareSireColor("#222")

                setLinebreedingLineColor("#fff")
                setLinebreedingColor("#222")

                setFemaleFamilyLineColor("#fff")
                setFemaleFamilyColor("#222")
                setTJKLineColor("#fff")
                setTJKColor("#222")
              }}
            >
              <Icon name="cloudsmith" size={14} color={getFamilyColor} style={{ alignSelf: 'center' }} />
              <Text style={{ color: getFamilyColor, paddingLeft: 5 }}>Family</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.TabNavigationItem, { borderColor: getSiblingsMareLineColor }]}
              onPress={() => {
                setScreenName("SiblingMare")
                setSiblingsMareLineColor("rgba(52, 77, 169, 0.6)")
                setSiblingsMareColor("rgba(52, 77, 169, 0.6)")
                setFamilyLineColor("#fff")
                setFamilyColor("#222")
                setNickLineColor("#fff")
                setNickColor("#222")

                setProgencyLineColor("#fff")
                setProgencyColor("#222")
                setPedigreeLineColor("#fff")
                setPedigreeColor("#222")
                setProfileLineColor("#fff")
                setProfileColor("#222")

                setSiblingsSireLineColor("#fff")
                setSiblingsSireColor("#222")

                setSiblingsBroodmareSireLineColor("#fff")
                setSiblingsBroodmareSireColor("#222")
                setTailFemaleLineColor("#fff")
                setTailFemaleColor("#222")

                setBroodmareSireLineColor("#fff")
                setBroodmareSireColor("#222")

                setLinebreedingLineColor("#fff")
                setLinebreedingColor("#222")
                setFemaleFamilyLineColor("#fff")
                setFemaleFamilyColor("#222")

                setTJKLineColor("#fff")
                setTJKColor("#222")
              }}
            >
              <Icon name="cloudsmith" size={14} color={getSiblingsMareColor} style={{ alignSelf: 'center' }} />
              <Text style={{ color: getSiblingsMareColor, paddingLeft: 5 }}>Sibling (Mare)</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.TabNavigationItem, { borderColor: getSiblingsSireLineColor }]}
              onPress={() => {
                setScreenName("SiblingSire")

                setSiblingsSireLineColor("rgba(52, 77, 169, 0.6)")
                setSiblingsSireColor("rgba(52, 77, 169, 0.6)")
                setFamilyLineColor("#fff")
                setFamilyColor("#222")

                setNickLineColor("#fff")
                setNickColor("#222")
                setSiblingsMareLineColor("#fff")
                setSiblingsMareColor("#222")

                setProgencyLineColor("#fff")
                setProgencyColor("#222")
                setPedigreeLineColor("#fff")
                setPedigreeColor("#222")

                setProfileLineColor("#fff")
                setProfileColor("#222")
                setSiblingsBroodmareSireLineColor("#fff")
                setSiblingsBroodmareSireColor("#222")

                setTailFemaleLineColor("#fff")
                setTailFemaleColor("#222")

                setBroodmareSireLineColor("#fff")
                setBroodmareSireColor("#222")

                setLinebreedingLineColor("#fff")
                setLinebreedingColor("#222")

                setFemaleFamilyLineColor("#fff")
                setFemaleFamilyColor("#222")

                setTJKLineColor("#fff")
                setTJKColor("#222")
              }}
            >
              <Icon name="cloudsmith" size={14} color={getSiblingsSireColor} style={{ alignSelf: 'center' }} />
              <Text style={{ color: getSiblingsSireColor, paddingLeft: 5 }}>Sibling (Sire)</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.TabNavigationItem, { borderColor: getSiblingsBroodmareSireLineColor }]}
              onPress={() => {
                setScreenName("SiblingBroodmareSire")
                setSiblingsBroodmareSireLineColor("rgba(52, 77, 169, 0.6)")
                setSiblingsBroodmareSireColor("rgba(52, 77, 169, 0.6)")

                setNickLineColor("#fff")
                setNickColor("#222")

                setFamilyLineColor("#fff")
                setFamilyColor("#222")

                setSiblingsSireLineColor("#fff")
                setSiblingsSireColor("#222")

                setSiblingsMareLineColor("#fff")
                setSiblingsMareColor("#222")

                setProgencyLineColor("#fff")
                setProgencyColor("#222")

                setPedigreeLineColor("#fff")
                setPedigreeColor("#222")
                setProfileLineColor("#fff")
                setProfileColor("#222")

                setTailFemaleLineColor("#fff")
                setTailFemaleColor("#222")

                setBroodmareSireLineColor("#fff")
                setBroodmareSireColor("#222")

                setLinebreedingLineColor("#fff")
                setLinebreedingColor("#222")

                setFemaleFamilyLineColor("#fff")
                setFemaleFamilyColor("#222")

                setTJKLineColor("#fff")
                setTJKColor("#222")
              }}
            >
              <Icon name="cloudsmith" size={14} color={getSiblingsBroodmareSireColor} style={{ alignSelf: 'center' }} />
              <Text style={{ color: getSiblingsBroodmareSireColor, paddingLeft: 5 }}>Sibling (Broodmare Sire)</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.TabNavigationItem, { borderColor: getTailFemaleLineColor }]}
              onPress={() => {
                setScreenName("TailFemale")

                setTailFemaleLineColor("rgba(52, 77, 169, 0.6)")
                setTailFemaleColor("rgba(52, 77, 169, 0.6)")
                setSiblingsBroodmareSireLineColor("#fff")
                setSiblingsBroodmareSireColor("#222")
                setFamilyLineColor("#fff")
                setFamilyColor("#222")

                setNickLineColor("#fff")
                setNickColor("#222")

                setSiblingsSireLineColor("#fff")
                setSiblingsSireColor("#222")

                setSiblingsMareLineColor("#fff")
                setSiblingsMareColor("#222")

                setProgencyLineColor("#fff")
                setProgencyColor("#222")

                setPedigreeLineColor("#fff")
                setPedigreeColor("#222")

                setProfileLineColor("#fff")
                setProfileColor("#222")
                setBroodmareSireLineColor("#fff")
                setBroodmareSireColor("#222")

                setLinebreedingLineColor("#fff")
                setLinebreedingColor("#222")

                setFemaleFamilyLineColor("#fff")
                setFemaleFamilyColor("#222")

                setTJKLineColor("#fff")
                setTJKColor("#222")
              }}
            >
              <Icon name="cloudsmith" size={14} color={getTailFemaleColor} style={{ alignSelf: 'center' }} />
              <Text style={{ color: getTailFemaleColor, paddingLeft: 5 }}>Tail Female</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.TabNavigationItem, { borderColor: getBroodmareSireLineColor }]}
              onPress={() => {
                setScreenName("BroodmareSire")

                setBroodmareSireLineColor("rgba(52, 77, 169, 0.6)")
                setBroodmareSireColor("rgba(52, 77, 169, 0.6)")

                setFamilyLineColor("#fff")
                setFamilyColor("#222")

                setSiblingsBroodmareSireLineColor("#fff")
                setSiblingsBroodmareSireColor("#222")

                setNickLineColor("#fff")
                setNickColor("#222")

                setSiblingsSireLineColor("#fff")
                setSiblingsSireColor("#222")

                setSiblingsMareLineColor("#fff")
                setSiblingsMareColor("#222")

                setProgencyLineColor("#fff")
                setProgencyColor("#222")

                setPedigreeLineColor("#fff")
                setPedigreeColor("#222")

                setProfileLineColor("#fff")
                setProfileColor("#222")

                setTailFemaleLineColor("#fff")
                setTailFemaleColor("#222")

                setLinebreedingLineColor("#fff")
                setLinebreedingColor("#222")

                setFemaleFamilyLineColor("#fff")
                setFemaleFamilyColor("#222")

                setTJKLineColor("#fff")
                setTJKColor("#222")
              }}
            >
              <Icon name="cloudsmith" size={14} color={getBroodmareSireColor} style={{ alignSelf: 'center' }} />
              <Text style={{ color: getBroodmareSireColor, paddingLeft: 5 }}>Broodmare Sire</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.TabNavigationItem, { borderColor: getLinebreedingLineColor }]}
              onPress={() => {
                setScreenName("Linebreeding")
                setLinebreedingLineColor("rgba(52, 77, 169, 0.6)")
                setLinebreedingColor("rgba(52, 77, 169, 0.6)")

                setFamilyLineColor("#fff")
                setFamilyColor("#222")

                setBroodmareSireLineColor("#fff")
                setBroodmareSireColor("#222")

                setNickLineColor("#fff")
                setNickColor("#222")

                setSiblingsBroodmareSireLineColor("#fff")
                setSiblingsBroodmareSireColor("#222")

                setSiblingsSireLineColor("#fff")
                setSiblingsSireColor("#222")

                setSiblingsMareLineColor("#fff")
                setSiblingsMareColor("#222")

                setProgencyLineColor("#fff")
                setProgencyColor("#222")

                setPedigreeLineColor("#fff")
                setPedigreeColor("#222")

                setProfileLineColor("#fff")
                setProfileColor("#222")

                setTailFemaleLineColor("#fff")
                setTailFemaleColor("#222")

                setFemaleFamilyLineColor("#fff")
                setFemaleFamilyColor("#222")

                setTJKLineColor("#fff")
                setTJKColor("#222")
              }}
            >
              <Icon name="cloudsmith" size={14} color={getLinebreedingColor} style={{ alignSelf: 'center' }} />
              <Text style={{ color: getLinebreedingColor, paddingLeft: 5 }}>Linebreeding</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.TabNavigationItem, { borderColor: getFemaleFamilyLineColor }]}
              onPress={() => {
                setScreenName("FemaleFamily")

                setFemaleFamilyLineColor("rgba(52, 77, 169, 0.6)")
                setFemaleFamilyColor("rgba(52, 77, 169, 0.6))")
                setFamilyLineColor("#fff")
                setFamilyColor("#222")
                setLinebreedingLineColor("#fff")
                setLinebreedingColor("#222")

                setNickLineColor("#fff")
                setNickColor("#222")

                setBroodmareSireLineColor("#fff")
                setBroodmareSireColor("#222")

                setSiblingsBroodmareSireLineColor("#fff")
                setSiblingsBroodmareSireColor("#222")

                setSiblingsSireLineColor("#fff")
                setSiblingsSireColor("#222")
                setSiblingsMareLineColor("#fff")
                setSiblingsMareColor("#222")

                setProgencyLineColor("#fff")
                setProgencyColor("#222")

                setPedigreeLineColor("#fff")
                setPedigreeColor("#222")

                setProfileLineColor("#fff")
                setProfileColor("#222")

                setTailFemaleLineColor("#fff")
                setTailFemaleColor("#222")

                setTJKLineColor("#fff")
                setTJKColor("#222")
              }}
            >
              <Icon name="cloudsmith" size={14} color={getFemaleFamilyColor} style={{ alignSelf: 'center' }} />
              <Text style={{ color: getFemaleFamilyColor, paddingLeft: 5 }}>Female Family</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.TabNavigationItem, { borderColor: getTJKLineColor }]}
              onPress={() => {
                setScreenName("TJK")

                setTJKLineColor("rgba(52, 77, 169, 0.6)")
                setTJKColor("#rgba(52, 77, 169, 0.6)")
                setFamilyLineColor("#fff")
                setFamilyColor("#222")

                setFemaleFamilyLineColor("#fff")
                setFemaleFamilyColor("#222")

                setNickLineColor("#fff")
                setNickColor("#222")

                setLinebreedingLineColor("#fff")
                setLinebreedingColor("#222")

                setBroodmareSireLineColor("#fff")
                setBroodmareSireColor("#222")

                setSiblingsBroodmareSireLineColor("#fff")
                setSiblingsBroodmareSireColor("#222")

                setSiblingsSireLineColor("#fff")
                setSiblingsSireColor("#222")

                setSiblingsMareLineColor("#fff")
                setSiblingsMareColor("#222")

                setProgencyLineColor("#fff")
                setProgencyColor("#222")

                setPedigreeLineColor("#fff")
                setPedigreeColor("#222")

                setProfileLineColor("#fff")
                setProfileColor("#222")

                setTailFemaleLineColor("#fff")
                setTailFemaleColor("#222")
              }}
            >
              <Image
                style={{ width: 25, height: 18, top: 2 }}
                source={{ uri: 'https://www.pedigreeall.com//images/head2.jpg' }}
              />
              <Text style={{ color: gettJKColor, paddingLeft: 5 }}>TJK</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animatable.View>

      <View style={{ marginTop: 40 }}>

        <Animatable.View style={styles.headerContainer3}
          animation='fadeInUp'>
          {getScreenName === "Pedigree" ?
            <View style={{ marginTop: 20, height: 400 }}>
              <HorseDetailScreenPedigree navigation={navigation} route={route} />
            </View>
            : null
          }
          {getScreenName === "Profile" &&
            <HorseDetailScreenProfile BackButton={false} navigation={navigation} route={route} />
            || getScreenName === "Progency" &&
            <HorseDetailScreenProfile BackButton={false} navigation={navigation} route={route} />
            || getScreenName === "SiblingMare" &&
            <HorseDetailScreenProfile BackButton={false} navigation={navigation} route={route} />
            || getScreenName === "SiblingSire" &&
            <HorseDetailScreenProfile BackButton={false} navigation={navigation} route={route} />
            || getScreenName === "SiblingBroodmareSire" &&
            <HorseDetailScreenProfile />
            || getScreenName === "TailFemale" &&
            <HorseDetailScreenProfile BackButton={false} navigation={navigation} route={route} />
            || getScreenName === "BroodmareSire" &&
            <HorseDetailScreenProfile />
            || getScreenName === "Linebreeding" &&
            <HorseDetailScreenProfile BackButton={false} navigation={navigation} route={route} />
            || getScreenName === "FemaleFamily" &&
            <HorseDetailScreenProfile BackButton={false} navigation={navigation} route={route} />
            || getScreenName === "TJK" &&
            <HorseDetailScreenProfile />
            || getScreenName === "Nick" &&
            <HorseDetailScreenProfile />
            || getScreenName === "Family" &&
            <HorseDetailScreenProfile />
          }
        </Animatable.View>

      </View>

    </View>

  );

}
const { height } = Dimensions.get("screen");

export default HorseDetailScreen;
const styles = StyleSheet.create({
  Container: {
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
    flex: 1,
  },
  headerContainer: {
    backgroundColor: '#2e3f6e',
    height: '25%',
  },
  headerContainer2: {
    top: '22.5%',
    position: 'absolute',
    backgroundColor: '#fff',
    margin: 'auto',
    alignSelf: 'center',
    borderTopEndRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    width: '96%',
    elevation: 10,
    height: 50,
    paddingTop: '4%',
  },
  headerContainer3: {
    top: '25%',
    position: 'absolute',
    backgroundColor: '#fff',
    margin: 'auto',
    alignSelf: 'center',
    borderTopEndRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    width: '96%',
    elevation: 10,
    height: Platform.OS == 'ios' ? 590 : 490,
    paddingTop: '4%',
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
  textStyles: {
    color: 'white',
    fontSize: 15,
  },
  TabNavigationContainer: {
    padding: 5,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  TabNavigationItem: {
    marginLeft: 10,
    marginRight: 10,
    padding: 5,
    paddingBottom: 4,
    flexDirection: 'row',
    borderBottomWidth: 1
  },
  signInButton: {
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2e3f6e',
    borderRadius: 8,
    flexDirection: 'row'
  },
  StabilInformationButton: {
    flexDirection: 'row',
    backgroundColor: 'rgba(149, 162, 209, 0.6)',
    padding: 12,
    borderRadius: 20,
    alignItems: 'center'
  },
  StabilInformationButtonContainer3Value: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10
  },
  TextStyle: {
    textAlign: 'center',
    fontSize: 15,
  },
  TabNavigationItemText: {
    fontSize: 16,
    alignSelf: 'flex-end',
    right: 15,
    top: -30,
    padding: 5,

  },
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    alignItems: 'center'
  },
  text: {
    fontSize: 20,
    color: '#101010',
    marginTop: 60,
    fontWeight: '700'
  },
  listItem: {
    marginTop: 10,
    padding: 20,
    alignItems: 'center',
    width: '100%'
  },
  listItemText: {
    fontSize: 18
  },
  InputContainer: {
    width: '100%',
    backgroundColor: "#fff",
    borderRadius: 4,
    height: 50,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#d4d2d2',
    marginBottom: 35,
    fontSize: 25,
    padding: 8,
    textAlign: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  HorseImage: {
    width: '90%',
    height: '80%',
    resizeMode: 'contain',
    marginBottom: 20
  },
})

