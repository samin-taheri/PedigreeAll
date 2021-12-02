import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import * as Haptics from 'expo-haptics';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from "react-i18next";
import i18n from "../component/i18n";

const ResultScreen = ({ route, navigation }) => {
    const { res } = route.params;
    const { t, i18n } = useTranslation();
    var object = JSON.parse(res);
console.log(object)

    let MyColor = "";
    let MyImage = "";
    if (object.m_eProcessState > 0) {
        MyColor= 'green',
        MyImage= require('../assets/check2.png')
    }
    else{
    MyColor= 'red',
    MyImage= require('../assets/error2.png')

    }
    React.useEffect(() => {
    

        if (Platform.OS != "web")
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }, []);
    return (

        <SafeAreaView style={{ alignItems: 'center' }}>

            <Image style={{bottom: '10%'}} source={(object.m_eProcessState > 0 ? require('../assets/IconSuccess.png') : require('../assets/IconError.png'))} resizeMode='center' />

            <Text style={{ fontSize: 50, fontWeight: 'bold', color: (object.m_eProcessState > 0 ? 'green' : 'red'), bottom: '30%', }}>{(object.m_eProcessState > 0 ? 'Başarılı' : 'Hata')}</Text>
            <Text style={{ fontSize: 22, padding: 20, color: '#383838', bottom: '25%',  textAlign: 'center', justifyContent: 'center', alignSelf: 'center', }}>{object.m_lUserMessageList[0]}</Text>
            <TouchableOpacity
                onPress={() => {
                    Haptics.selectionAsync()

                    if (object.m_eProcessState > 0) {
                        navigation.navigate("Home")
                    }
                    else
                    {
                        navigation.goBack()

                    }
                }}
                style={{
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: (object.m_eProcessState > 0 ? 'green' : 'red'),
                    borderRadius: 35,
                    flexDirection: 'row',
                    width: '70%',
                    bottom: '10%',

                }}>
                <Text style={[styles.TextStyle, { color: '#fff' }]}>{t('OK')}</Text>

            </TouchableOpacity>

        </SafeAreaView>
    )
}

export default ResultScreen;
const styles = StyleSheet.create({

    signInButton: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green',
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


