import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Linking, Dimensions, Pressable, Platform, Modal, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from "react-native-vector-icons/FontAwesome5";
import { DataTable } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import HorseDetailScreenPedigree from './HorseDetailScreenPedigree';
import HorseDetailScreenProfile from './HorseDetailScreenProfile';
import HorseDetailScreenProgency from './HorseDetailScreenProgency';
import HorseDetailScreenNick from './HorseDetailScreenNick';
import HorseDetailScreenFamily from './HorseDetailScreenFamily';
import HorseDetailScreenSiblingMare from './HorseDetailScreenSiblingMare';
import HorseDetailScreenSiblingSire from './HorseDetailScreenSiblingSire';
import HorseDetailScreenTJK from './HorseDetailScreenTJK';
import HorseDetailScreenSiblingBroodmareSire from './HorseDetailScreenSiblingBroodmareSire';
import HorseDetailScreenBroodMareSire from './HorseDetailScreenBroodMareSire';
import HorseDetailScreenTailFemale from './HorseDetailScreenTailFemale';
import HorseDetailScreenLinebreeding from './HorseDetailScreenLinebreeding';
import HorseDetailScreenFemaleFamily from './HorseDetailScreenFemaleFamily';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import WebView from 'react-native-webview';
import Flag from "react-native-flags";

const HorseDetailScreen = ({ route, navigation }) => {

  const { HORSE_NAME } = route.params;
  const { MARE_NAME } = route.params;
  const { HORSE_ID } = route.params;
  const { SECOND_ID } = route.params;
  const { Generation } = route.params;

  const [getHorseId, setHorseId] = React.useState(-1);
  const [getMareId, setMareId] = React.useState(-1);

  const [HorseInformationData, setSearchHorseData] = React.useState();
  const [getData, setData] = React.useState([]);
  const [ModalText, setModalText] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [FullScreenVisible, setFullScreenVisible] = useState(false);
  const [HorseInfo, setHorseInfo] = React.useState();
  const [SocialMedia, setSocialMedia] = React.useState([]);
  const [GenerationCount, setGenerationCount] = React.useState();
  const [getHorseGetByName, setHorseGetByName] = useState();
  const [getStatisticInfo, setStatisticInfo] = React.useState();
  const [getFoalInfo, setFoalInfo] = React.useState();
  const [getFoalNum, setFoalNum] = React.useState(1);
  const [time, setTime] = React.useState(true);
  const [header, setHeader] = React.useState([]);

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
  const [getHorseData, setHorseData] = React.useState(HORSE_ID)
  const [isTJK, setIsTJK] = React.useState(false);
  const [showHeader, setShowHeader] = useState(false)
  const [Type, setType] = useState(1)

  const readUser = async () => {
    try {
      const token = await AsyncStorage.getItem('TOKEN')
      if (token !== null) {
        fetch('https://api.pedigreeall.com/Pedigree/GetPedigree?p_iGenerationCount=' + Generation + '&p_iFirstId=' + HORSE_ID + '&p_iSecondId=' + SECOND_ID, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Basic " + token,
          },
        })
          .then((response) => response.json())
          .then((json) => {
            setHeader(json)
            setSearchHorseData(json)

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
  const readSocialMedia = async () => {
    try {
      const token = await AsyncStorage.getItem('TOKEN')
      if (token !== null) {
        fetch('https://api.pedigreeall.com/BitMap/GetSocialMediaImageForAllHorses?p_iHorseId=' + HORSE_ID + '&p_iLanguageId=2&p_iType=2', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Basic " + token,
          },
        }).then((response) => response.json())
          .then((json) => {
            setSocialMedia(json);
          })
          .catch((error) => {
            console.error(error);
          })
      }
      else { console.log("Basarisiz") }
    }
    catch (e) { console.log(e) }
  }
  const readGenerationCount = async () => {
    try {
      const token = await AsyncStorage.getItem('TOKEN')
      if (token !== null) {
        fetch('https://api.pedigreeall.com/Pedigree/GetPedigree?p_iGenerationCount=1&p_iFirstId=' + HORSE_ID + '&p_iSecondId=' + SECOND_ID, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Basic " + token,
          },
        }).then((response) => response.json())
          .then((json) => {
            setGenerationCount(json.m_cData);
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
        fetch('https://api.pedigreeall.com/ParentPage/GetByIdAsNameAndId?p_iHorseId=' + HORSE_ID + "&p_iLanguageId=2", {
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
        fetch('https://api.pedigreeall.com/HorseInfo/GetFoals?p_iHorseId=' + HORSE_ID + "&p_iTypeId=1", {
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
            setSearchHorseData(json)
            var aa = [];
            json.m_cData.map((i) => (
              aa.push({
                HORSE_DATA: i,
                HORSE_ID: i.HORSE_ID
              })
            ))
            setData(aa)
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


  useEffect(() => {
    setHorseId(route.params?.HorseId)
    setMareId(route.params?.MareId)
    readUser()
    readHorseGetByName()
    readHorseInfo();
    readFoalInfo();
    readGenerationCount()
    readStatisticInfo()
    readSocialMedia()
  }, []);


  return (
    <View style={styles.Container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >

        <View style={styles.FullScreenContainer}>
          <View style={{ width: '100%', justifyContent: 'flex-end' }}>

            <Pressable
              style={{ paddingLeft: Platform.OS== 'ios'? 25: 10, paddingTop: Platform.OS== 'ios'? 25: 10, paddingBottom: Platform.OS== 'ios'? 0: 5, borderBottomWidth: 0.6, borderBottomColor: '#dedfe1', flexDirection: 'row' }}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Ionicons name="close-outline" size={35} color="black" />
              <Text style={{ padding: Platform.OS== 'ios'? 15: 8, left: 10, fontSize: 15, fontWeight: 'bold' }}>{ModalText}</Text>
            </Pressable>
          </View>

          {ModalText === "Information" &&
            <>
              {HorseInfo !== undefined ?
                <View style={styles.ModalItemContainer}>
                  <WebView
                    source={{ html: "<body class='scrollHeight'>" + HorseInfo[0].INFO + "</body>" }}
                    startInLoadingState={true}
                    bounces={true}
                    style={{ width: '100%', height: '100%' }}
                    automaticallyAdjustContentInsets={true}
                    javaScriptEnabledAndroid={true}
                    scrollEnabled={true}
                    renderLoading={() => (
                      <ActivityIndicator
                        style={styles.Activity}
                        color='rgba(52, 77, 169, 0.6)'
                        size='large'
                      />)} />
                </View>
                : <Text>There is no information</Text>
              }

            </>
            || ModalText === "Image" &&

            <>
              <Image style={styles.HorseImage} source={{ uri: HorseInfo[0].IMAGE_LIST[0] }} />
            </>
            || ModalText === "Instagram" &&

            <>
              <Image style={styles.HorseImage} source={{ uri: SocialMedia }} />
            </>
            || ModalText === "Statistics" &&
            <>
              {time ?
                <ActivityIndicator style={styles.Activity} color="rgba(52, 77, 169, 0.6)" size="large" />
                :
                <>
                  <ScrollView horizontal>
                    <DataTable>
                      <DataTable.Header>
                        <DataTable.Title style={{ width: 350 }}>Name</DataTable.Title>
                        <DataTable.Title style={[styles.DataTableText, { left: '0.3%' }]}>Class</DataTable.Title>
                        <DataTable.Title style={[styles.DataTableText, { left: '0.3%' }]}>Point</DataTable.Title>
                        <DataTable.Title style={[styles.DataTableText, { left: '0.2%' }]}>Earning</DataTable.Title>
                        <DataTable.Title style={[styles.DataTableText, { left: '0.2%' }]}>Fam</DataTable.Title>
                        <DataTable.Title style={[styles.DataTableText, { left: '0.1%' }]}>Color</DataTable.Title>
                        <DataTable.Title style={{ width: 400, left: '0.1%' }}>Dam</DataTable.Title>
                        <DataTable.Title style={{ width: 400, left: '0.5%' }}>BroodMare Sire</DataTable.Title>
                        <DataTable.Title style={[styles.DataTableText, { left: '0.9%' }]}>Birth D.</DataTable.Title>
                        <DataTable.Title style={[styles.DataTableText, { left: '0.8%' }]}>Start</DataTable.Title>
                        <DataTable.Title style={[styles.DataTableText, { left: '0.7%' }]}>1st</DataTable.Title>
                        <DataTable.Title style={[styles.DataTableText, { left: '0.7%' }]}>1st %</DataTable.Title>
                        <DataTable.Title style={[styles.DataTableText, { left: '0.6%' }]}>2nd</DataTable.Title>
                        <DataTable.Title style={[styles.DataTableText, { left: '0.6%' }]}>2nd %</DataTable.Title>
                        <DataTable.Title style={[styles.DataTableText, { left: '0.5%' }]}>3rd</DataTable.Title>
                        <DataTable.Title style={[styles.DataTableText, { left: '0.5%' }]}>3rd %</DataTable.Title>
                        <DataTable.Title style={[styles.DataTableText, { left: '0.4%' }]}>4th</DataTable.Title>
                        <DataTable.Title style={[styles.DataTableText, { left: '0.4%' }]}>4th %</DataTable.Title>
                        <DataTable.Title style={[styles.DataTableText, { left: '0.4%' }]}>Price</DataTable.Title>
                        <DataTable.Title style={[styles.DataTableText, { left: '0.3%' }]}>Dr. RM</DataTable.Title>
                        <DataTable.Title style={[styles.DataTableText, { left: '0.3%' }]}>ANZ</DataTable.Title>
                        <DataTable.Title style={[styles.DataTableText, { left: '0.3%' }]}>PedigreeAll</DataTable.Title>
                        <DataTable.Title style={{ width: 150, left: '0.2%' }}>Owner</DataTable.Title>
                        <DataTable.Title style={{ width: 150, left: '0.2%' }}>Breeder</DataTable.Title>
                        <DataTable.Title style={{ width: 150, left: '0.15%' }}>Coach</DataTable.Title>
                        <DataTable.Title style={[styles.DataTableText, { left: '0.1%' }]}>Dead</DataTable.Title>
                        <DataTable.Title style={[styles.DataTableText, { left: '0.1%' }]}>Update D.</DataTable.Title>
                      </DataTable.Header>

                      {getStatisticInfo.map((item, index) => (
                        <View key={index}>
                          <DataTable.Row centered={true} key={index}>
                            <DataTable.Cell style={{ top: Platform.OS == 'ios' ? '8%' : '0%', bottom: Platform.OS == 'ios' ? '0%' : '4%' }}>
                              <Flag code={item.ICON.toUpperCase()} size={16} />
                            </DataTable.Cell>
                            <DataTable.Cell
                              onPress={() => { alert(item.HORSE_NAME) }}
                              style={{ width: 350, left: '0.4%' }}>
                              {item.HORSE_NAME}
                            </DataTable.Cell>
                            <DataTable.Cell style={styles.DataTableText}>{item.WINNER_TYPE_OBJECT.WINNER_TYPE_EN}</DataTable.Cell>

                            <DataTable.Cell style={styles.DataTableText}>{item.POINT}</DataTable.Cell>
                            <DataTable.Cell style={styles.DataTableText} >{item.EARN} {item.EARN_ICON}</DataTable.Cell>
                            <DataTable.Cell style={styles.DataTableText}>{item.FAMILY_TEXT}</DataTable.Cell>
                            <DataTable.Cell style={styles.DataTableText}>{item.COLOR_TEXT}</DataTable.Cell>
                            <DataTable.Cell style={{ top: Platform.OS == 'ios' ? '8%' : '0%', bottom: Platform.OS == 'ios' ? '0%' : '4%' }}>
                              <Flag code={item.MOTHER_ICON.toUpperCase()} size={16} />
                            </DataTable.Cell>
                            <DataTable.Cell
                              onPress={() => { alert(item.MOTHER_NAME) }}
                              style={{ width: 400, left: '0.4%' }}>
                              {item.MOTHER_NAME}
                            </DataTable.Cell>
                            <DataTable.Cell style={{ top: Platform.OS == 'ios' ? '8%' : '0%', bottom: Platform.OS == 'ios' ? '0%' : '4%' }}>
                              <Flag code={item.BM_SIRE_ICON.toUpperCase()} size={16} />
                            </DataTable.Cell>
                            <DataTable.Cell
                              onPress={() => { alert(item.BM_SIRE_NAME) }}
                              style={{ width: 400, left: '0.4%' }}>
                              {item.BM_SIRE_NAME}
                            </DataTable.Cell>
                            <DataTable.Cell style={styles.DataTableText}>{item.HORSE_BIRTH_DATE_TEXT}</DataTable.Cell>
                            <DataTable.Cell style={styles.DataTableText}>{item.START_COUNT}</DataTable.Cell>
                            <DataTable.Cell style={styles.DataTableText}>{item.FIRST}</DataTable.Cell>
                            <DataTable.Cell style={styles.DataTableText}>{item.FIRST_PERCENTAGE} %</DataTable.Cell>
                            <DataTable.Cell style={styles.DataTableText}>{item.SECOND}</DataTable.Cell>
                            <DataTable.Cell style={styles.DataTableText}>{item.SECOND_PERCENTAGE} %</DataTable.Cell>
                            <DataTable.Cell style={styles.DataTableText}>{item.THIRD}</DataTable.Cell>
                            <DataTable.Cell style={styles.DataTableText}>{item.THIRD_PERCENTAGE} %</DataTable.Cell>
                            <DataTable.Cell style={styles.DataTableText}>{item.FOURTH}</DataTable.Cell>
                            <DataTable.Cell style={styles.DataTableText}>{item.FOURTH_PERCENTAGE} %</DataTable.Cell>
                            <DataTable.Cell style={styles.DataTableText}>{item.PRICE} {item.PRICE_ICON}</DataTable.Cell>
                            <DataTable.Cell style={styles.DataTableText}>{item.RM}</DataTable.Cell>
                            <DataTable.Cell style={styles.DataTableText}>{item.ANZ}</DataTable.Cell>
                            <DataTable.Cell style={styles.DataTableText}>{item.PA}</DataTable.Cell>
                            <DataTable.Cell
                              onPress={() => { alert(item.OWNER) }}
                              style={{ width: 150 }}>
                              {item.OWNER}
                            </DataTable.Cell>
                            <DataTable.Cell
                              onPress={() => { alert(item.BREEDER) }}
                              style={{ width: 150 }}>
                              {item.BREEDER}
                            </DataTable.Cell>
                            <DataTable.Cell
                              onPress={() => { alert(item.COACH) }}
                              style={{ width: 150 }}>
                              {item.COACH}
                            </DataTable.Cell>
                            {item.IS_DEAD ?
                              <>
                                <DataTable.Cell style={styles.DataTableText}>DEAD</DataTable.Cell>
                              </>
                              :
                              <>
                                <DataTable.Cell style={styles.DataTableText}>ALIVE</DataTable.Cell>
                              </>
                            }
                            <DataTable.Cell style={styles.DataTableText}>{item.EDIT_DATE_TEXT}</DataTable.Cell>
                          </DataTable.Row>
                        </View>
                      ))}
                    </DataTable>
                  </ScrollView>
                </>}
            </>
          }
        </View>

      </Modal>

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
          {/*<Text style={styles.textStyles}>{HorseInformationData.m_cData.HEADER_OBJECT.ROW1_GENERAL}</Text>*/}
          <Text style={styles.textStyles}>{HORSE_NAME}  {MARE_NAME}</Text>
        </View>

        <View style={{ bottom: '12%' }}>
          <View style={styles.StabilInformationButtonContainer3Value}>
            <TouchableOpacity
              onPress={() => {
                setModalText("Information");
                setModalVisible(true)
              }}
              style={styles.StabilInformationButton}>
              <Feather name="info" size={16} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setModalText("Statistics")
                setModalVisible(true)
              }}
              style={styles.StabilInformationButton}>
              <Ionicons name="stats-chart-outline" size={16} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setModalText("Image");
                setModalVisible(true)
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
                setModalText("Instagram");
                setModalVisible(true)
              }}
              style={styles.StabilInformationButton}>
              <Ionicons name="logo-instagram" size={16} color="#fff" />
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
            <HorseDetailScreenProgency BackButton={false} navigation={navigation} route={route} />
            || getScreenName === "SiblingMare" &&
            <HorseDetailScreenSiblingMare BackButton={false} navigation={navigation} route={route} />
            || getScreenName === "SiblingSire" &&
            <HorseDetailScreenSiblingSire BackButton={false} navigation={navigation} route={route} />
            || getScreenName === "SiblingBroodmareSire" &&
            <HorseDetailScreenSiblingBroodmareSire BackButton={false} navigation={navigation} route={route} />
            || getScreenName === "TailFemale" &&
            <HorseDetailScreenTailFemale BackButton={false} navigation={navigation} route={route} />
            || getScreenName === "BroodmareSire" &&
            <HorseDetailScreenBroodMareSire BackButton={false} navigation={navigation} route={route} />
            || getScreenName === "Linebreeding" &&
            <HorseDetailScreenLinebreeding BackButton={false} navigation={navigation} route={route} />
            || getScreenName === "FemaleFamily" &&
            <HorseDetailScreenFemaleFamily BackButton={false} navigation={navigation} route={route} />
            || getScreenName === "TJK" &&
            <HorseDetailScreenTJK BackButton={false} navigation={navigation} route={route} />
            || getScreenName === "Nick" &&
            <HorseDetailScreenNick navigation={navigation} route={route} />
            || getScreenName === "Family" &&
            <HorseDetailScreenFamily navigation={navigation} route={route} />
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  FullScreenContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    shadowColor: "#000",
  },
  ModalItemContainer: {
    width: '100%',
    padding: 15,
    height: '95%',
  },
  DataTableText: {
    width: 100
  },
  Activity: {
    bottom: '50%', shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.27,
    elevation: 4,
    backgroundColor: '#fff',
    width: '12%',
    height: Platform.OS == 'ios' ? '5.5%' : '7%',
    paddingLeft: Platform.OS == 'ios' ? 3 : 0,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  StatisticFoalContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignSelf: 'baseline',
    padding: 10,
    borderBottomWidth: 0.5,
  },
  StatisticFoalButtonText: {
    fontWeight: '700',
    fontSize: 15,
    color: '#000'
  },
  StatisticFoalButton: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: 'silver',
    marginLeft: 5,
    backgroundColor: '#2169ab',
    elevation: 2
  },
})

