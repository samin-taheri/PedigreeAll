import React, { Component } from 'react'
import {View, ImageBackground, Image, StyleSheet,ActivityIndicator} from 'react-native'

export function SplashScreen({navigation}) {
   
    return (
      <ImageBackground
        source={require('../assets/backgroundImage.png')}
        style={styles.background}
        //blurRadius={5}
        >
        <View
        style = {styles.imageContainer}>
          <Image
          resizeMode={'contain'}
          source={require('../assets/logoWhite.png')}
          style={styles.image}>
          </Image>
        </View>
      </ImageBackground>
    )
  }

const styles= StyleSheet.create({
  background:{
    height:"100%", 
    width:"100%"
  },
  imageContainer:{
    flex:1, 
    alignItems:'center',
    justifyContent: "space-around",
  },
  image:{
    top:150,
    width: "100%",
    height: "9%", 
    position:'absolute'
  },
  
  container: {
    justifyContent: "center",
    //marginTop:100, //sor
  },
  ActivityIndicator:{
    top:350,
    position:'absolute'
    //bottom:500
  }
});
