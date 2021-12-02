import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Pressable, Platform, Modal, ActivityIndicator } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Ionicons } from '@expo/vector-icons';
import WebView from 'react-native-webview';
import { Global } from './Global';
import { useTranslation } from "react-i18next";
import i18n from "../component/i18n";

const windowWidth = Dimensions.get('window').width / 3;

const EffectiveNickScreen = ({ route, navigation }) => {

  const { HORSE_ID } = route.params;
  const { StallionId } = route.params;
  const { StallionName } = route.params;

  const [getEffectiveNickReport, setEffectiveNickReport] = React.useState();
  const [time, setTime] = React.useState(true);
  const { t, i18n } = useTranslation();

  const EffectiveNickReport = async () => {
    try {
      if (Global.Token !== null) {
        fetch('https://api.pedigreeall.com/Analysis/CreateReport?p_iHorseId1='+ StallionId +'&p_iHorseId2='+ HORSE_ID +'&p_iRegistrationId=1&p_iLanguageId=2', {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Basic " + Global.Token,
          },
        }).then((response) => response.json())
          .then((json) => {
            if (json !== null) {
              setEffectiveNickReport(json.m_cData)
              setTime(false)
            }
          })
          .catch((error) => {
            console.error(error);
          })
      }
      else {
        console.log("Basarisiz")
      }
    }
    catch (e) {
      console.log(e)
    }
  
  };
  
  React.useEffect(() => {
    EffectiveNickReport()
    });

    const webViewScript = `
    setTimeout(function() { 
      window.ReactNativeWebView.postMessage(document.documentElement.scrollHeight); 
    }, 2000);
    true; // note: this is required, or you'll sometimes get silent failures
  `;
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
          <Animatable.Image
            animation="fadeIn"
            style={{ width: '100%', height: '100%', marginLeft: 'auto', right: '50%', bottom: '0%', position: 'absolute', zIndex: -1, resizeMode: 'center' }}
            source={require('../assets/ver.png')}
          />
          <Animatable.Text style={styles.textStyles}>{StallionName}</Animatable.Text>
          </View>
        </View>
        <Animatable.View style={styles.headerContainer3}>
        {time ?
        <>
          <ActivityIndicator style={styles.Activity} size="large" color="rgba(52, 77, 169, 0.6)" />
          <Text style={{top: '42%', textAlign: 'center', color: 'rgba(52, 77, 169, 0.6)', fontSize: 16, margin: 20, fontWeight: '500'}}>{t('Please wait, It may take some time..')}</Text>
          </>
          :
          <>
            {getEffectiveNickReport !== undefined &&
              <>
                <WebView
                  source={{ html: getEffectiveNickReport}}
                  startInLoadingState={true}
                  javaScriptEnabledAndroid={true}
                  showsHorizontalScrollIndicator={true}
                  automaticallyAdjustContentInsets={false}
                  javaScriptEnabled={true}
                  scrollEnabled={true}
                  showsVerticalScrollIndicator={true}
                  injectedJavaScript={webViewScript}
  
                />
               
              </>
            }
          </>}
        </Animatable.View>
      </View>
    );
  }
const { height } = Dimensions.get("screen");

  export default EffectiveNickScreen;
  const styles = StyleSheet.create({
    Container: {
      backgroundColor: '#fff',
      width: '100%',
      height: '100%',
      
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
      top: '20%',
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
      height: Platform.OS == 'ios' ? 640 : 540,
      paddingTop: '4%',
      paddingLeft: 10,
      paddingRight: 10
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
      left: '90%'
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
      top: '40%', shadowColor: "#000",
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

