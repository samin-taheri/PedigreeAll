import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Linking, Dimensions, Pressable, Platform, Modal, ActivityIndicator } from 'react-native';
import * as Animatable from 'react-native-animatable';

const windowWidth = Dimensions.get('window').width / 3;

const EffectiveNickScreen = ({ route, navigation }) => {

  return (
      <View style={styles.Container}>
    <View style={styles.headerContainer}>
      <Animatable.View style={styles.headerContainer2}
        animation="fadeInDown">
      </Animatable.View>
    </View>
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
    flex: 1,
  },
  headerContainer: {
    backgroundColor: '#2e3f6e',
    height: '25%',
  },
  headerContainer2: {
    top: '50%',
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

