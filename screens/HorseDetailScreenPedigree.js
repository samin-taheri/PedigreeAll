import React from 'react'
import { View, Text, StyleSheet, Platform, Animated, ActivityIndicator, ScrollView, useWindowDimensions, Alert, Modal, Pressable } from 'react-native'
import { Global } from './Global'
import { Dimensions } from 'react-native';
import WebView from 'react-native-webview';
import { useTranslation } from "react-i18next";
import i18n from "../component/i18n";
let data;
const PedigreeHTML =
  "<style>.pedigree-table { font-size: 13px; line-height: normal; font-weight: bold; border-collapse: collapse; border-spacing: 1px; width: 100%; border: 1px solid #737373; table-layout: fixed; }.pedigree-table td.pedigree-cell { border: 1px solid #737373; padding: 2px; text-align: center; vertical-align: middle; } .background-M, .background-M A { color: #9c4d4d; } .background-M { border-radius: 1px; background-image: linear-gradient(to bottom,#dbe8f3 0,#c7e5ff 100%) } .HorseName { font-family: 'Verdana'; font-size: 7pt; font-weight: 600; color: #000 !important; } td p { font-size: 8pt; } .HorseName:hover { text-decoration: underline; } .background-F { border-radius: 1px; border-color: #ce8080; background-color: #fedcdc; background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgeG1sbnM9Imh0d…0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJ1cmwoI2xlc3NoYXQtZ2VuZXJhdGVkKSIgLz48L3N2Zz4=); background-image: -webkit-linear-gradient(top,#fff0f0 0,#ffe9e9 100%); background-image: -moz-linear-gradient(top,#fff0f0 0,#ffe9e9 100%); background-image: -o-linear-gradient(top,#fff0f0 0,#ffe9e9 100%); background-image: linear-gradient(to bottom,#fff0f0 0,#ffe9e9 100%); }</style>"
  ;

function HorseDetailScreenPedigree({ navigation, route }) {
  const [time, setTime] = React.useState(true);
  const [getPedigreeReport, setPedigreeReport] = React.useState();
  const [getHorseId, setHorseId] = React.useState(-1);
  const [getMareID, setMareId] = React.useState(-1);
  const { HORSE_ID } = route.params;
  const { SECOND_ID } = route.params;
  const { Generation } = route.params;
  const { t, i18n } = useTranslation();

  const readPedigreeReport = async () => {
    console.log(Generation)
    try {
      if (Global.Token !== null) {
        fetch('https://api.pedigreeall.com/Pedigree/GetPedigreeReport?p_iGenerationCount=' + Generation + "&p_iFirstId=" + HORSE_ID + "&p_iSecondId=" + SECOND_ID, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Basic " + Global.Token,
          },
        }).then((response) => response.json())
          .then((json) => {
            //setHorsePedigree(json)
            if (json !== null) {
              setPedigreeReport(json)
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
      console.log("GetPedigreeReport Error")
    }

  };

  function resolveAfter2Seconds() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve("data");
      }, 15000);
    });
  }

  React.useEffect(() => {

    const unsubscribe = navigation.addListener('focus', () => {
      readPedigreeReport()

    });

    return () => {
      unsubscribe;
    };
  }, [navigation]);

  React.useEffect(() => {
    setHorseId(route.params?.HorseId)
    setMareId(route.params?.MareId)
    readPedigreeReport();

  }, [])

  const webViewScript = `
  setTimeout(function() { 
    window.ReactNativeWebView.postMessage(document.documentElement.scrollHeight); 
  }, 2000);
  true; // note: this is required, or you'll sometimes get silent failures
`;
  return (
    <View style={{ width: '100%', height: '100%', backgroundColor: '#fff' }}>
      {time ?
        <ActivityIndicator style={styles.Activity} size="large" color="rgba(52, 77, 169, 0.6)" />
        :
        <>
          {getPedigreeReport !== undefined &&
            <>
              <WebView
                source={{ html: getPedigreeReport[2] + PedigreeHTML }}
                startInLoadingState={true}
                javaScriptEnabledAndroid={true}
                showsHorizontalScrollIndicator={true}
                automaticallyAdjustContentInsets={false}
                javaScriptEnabled={true}

                scrollEnabled={true}
                showsVerticalScrollIndicator={true}
                injectedJavaScript={webViewScript}

              />
              <Text style={styles.FamilyText}>{t('FamilySummary')}{getPedigreeReport[3]}</Text>
            </>
          }
        </>}
    </View>

  )
}
export default HorseDetailScreenPedigree;
const styles = StyleSheet.create({

  HorseDetailContainer: {
    flex: 1,
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
  HalfOfScreen: {
    height: Dimensions.get('window').height / 2.5,
    flexDirection: 'row'
  },
  FatherContainer: {
    backgroundColor: '#c7e5ff',
    flex: 1,
    borderWidth: 0.5,
    borderColor: 'silver'
  },
  MotherContainer: {
    backgroundColor: '#fedcdc',
    flex: 1,
    borderWidth: 0.5,
    borderColor: 'silver'
  },
  FamilyText: {
    textAlign: 'center',
    padding: 5,
    fontSize: 12,
    fontWeight: 'bold'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#6c6c6ca8'
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
  }


})


