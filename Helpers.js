import Toast from 'react-native-toast-message';
import * as Haptics from 'expo-haptics';
import { StatusBar, Platform } from "react-native";
import { useCallback } from 'react';

export function showMessage(object, navigation) {

    var durum = false;
    if (object.m_cDetail.m_eProcessState > 0) {
        durum = true;
        if (Platform.OS != "web")
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        Toast.show({
            type: 'success',
            position: 'top',
            text1: 'başarılı',
            text2: object.m_cDetail.m_lUserMessageList[0],
            visibilityTime: 4000,
            autoHide: true,
            topOffset: StatusBar.currentHeight || 42,
            bottomOffset: 40,
            onShow: () => { },
            onHide: () => { },
            onPress: () => { }

        });


    } else {
        durum = false;
        if (Platform.OS != "web")
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
        Toast.show({
            type: 'error',
            position: 'top',
            text1: 'Hata',
            text2: object.m_cDetail.m_lUserMessageList[0],
            visibilityTime: 4000,
            autoHide: true,
            topOffset: StatusBar.currentHeight || 42,
            bottomOffset: 40,
            onShow: () => { },
            onHide: () => { },
            onPress: () => { }
        });
    }

    return durum;

};


/*

export function getToken() {
    try {
        const token = await AsyncStorage.getItem('TOKEN');
        if (token !== null) {
        }
    } catch (error) {
        console.log("Token Error");
    }
};
*/