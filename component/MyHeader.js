import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Dimensions, Platform, Text } from 'react-native'
import * as Animatable from 'react-native-animatable';
import { Ionicons } from '@expo/vector-icons';

const { height } = Dimensions.get("screen");

const MyHeader = (props) => {
    return (
        <>
            <View style={styles.topShadow}>
                {props.showLogo
                    ?
                    <View>
                        <Animatable.Image
                            animation="fadeInDown"
                            resizeMode="center"
                            style={{ right: '50%' }}
                            source={require('../assets/logoWhite.png')}
                        />
                        
                        <TouchableOpacity
                            onPress={props.onPress}
                            style={{ bottom: 160, left: '5%' }}
                        >
                            <Ionicons
                                name="arrow-back-outline"
                                color="#fff"
                                size={30}
                            />

                        </TouchableOpacity>

                    </View>
                   :
                   
                    (props.showLogoWithoutBack
                      ?  
                      <Animatable.Image
                      animation="fadeInDown"
                      resizeMode="center"
                      style={{ right: '50%' }}
                      source={require('../assets/logoWhite.png')}
                  />
                      :  <View>
                      <TouchableOpacity
                          onPress={props.onPress}
                          style={styles.HeaderText2
                          }>
                          <Ionicons
                              name="arrow-back-outline"
                              color="#fff"
                              size={30}
                          />
                      </TouchableOpacity>
  
                      <Animatable.Text style={styles.HeaderText} animation="fadeInDown">{props.Title}</Animatable.Text>
                  </View>
                    ) 
                   }
                <Image
                    style={{ width: '100%', height: '100%', marginLeft: 'auto', right: -100, top: -40, position: 'absolute', zIndex: -1, resizeMode: 'center' }}
                    source={require('../assets/tile3.png')}
                />
            </View>
            
            <Animatable.View style={styles.boxView} animation="fadeInUp">
                {props.children}
            </Animatable.View>
         
        </>
    );
}

export default MyHeader;


const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#000'
    },
    HeaderText: {
        fontSize: 23,
        color: 'white',
        alignSelf: 'flex-start',
        top: '70%',
        left: '7%'
    },
    HeaderText2: {
        fontSize: 23,
        color: 'white',
        alignSelf: 'flex-start',
        top: '50%',
        left: '5%',
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
        shadowColor: "rgba(0,0,0,0)",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        width: '93%',
        elevation: 10,
        maxHeight: height - (Platform.OS == 'ios' ? 230 : 200),
        paddingTop: '4%',

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

})
