import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, TextInput, ToastAndroid, StyleSheet, StatusBar, ScrollView, Platform, TouchableOpacity, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import RNPickerSelect from 'react-native-picker-select';
import { Global } from './Global';
import * as Haptics from 'expo-haptics';
import { SafeAreaView } from 'react-native-safe-area-context';


const ErrorScreen = ({ route, navigation }) => {
 
    React.useEffect(() => {
        if (Platform.OS != "web")
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }, []);
    return (

        <SafeAreaView style={{ alignItems: 'center' }}>

            <Animatable.Image animation="flipInX" style={{ bottom: '10%', resizeMode: 'center', width: '100%' }} source={require('../assets/error2.png')} />

            <Text style={{ fontSize: 50, fontWeight: 'bold', color: 'red', bottom: '30%', }}>Başarısız!</Text>
            <Text style={{ fontSize: 25, color: 'grey', bottom: '25%' }}>Sorry!</Text>
            <Text style={{ fontSize: 25, color: 'grey', bottom: '24%' }}>Something went wrong.</Text>
            <TouchableOpacity
                onPress={() => {
                    Haptics.selectionAsync()
                }}
                style={styles.signInButton}>
                <Text style={[styles.TextStyle, { color: '#fff' }]}>Tamam</Text>

            </TouchableOpacity>


        </SafeAreaView>
    )
}

export default ErrorScreen;
const styles = StyleSheet.create({

    signInButton: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
        borderRadius: 35,
        flexDirection: 'row',
        width: '70%',

        top: '0%'
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    textSign: {
        fontSize: 15,
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    TextStyle: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '600'
    },
});


