import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { useTranslation } from "react-i18next";
import i18n from "../component/i18n";

export function Helper(Turkce, inglizce) {

    return 'Samin';

}
const Dil = async () => {
    try {
        const value = await AsyncStorage.getItem('Dil');
        if (value !== null) {
            return value;
        }
    } catch (error) {
        // Error retrieving data
    }
};