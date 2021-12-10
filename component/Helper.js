import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { useTranslation } from "react-i18next";
import i18n from "../component/i18n";
import { Global } from "../screens/Global";



export function Translate(Turkce, inglizce) {
    if (global.dil === "tr")
        return Turkce;
    else
        return inglizce;
}