
import React, { useState, useRef, useEffect } from 'react';
import { View, platform, SafeAreaViewBase, Animated, StyleSheet, FlatList, Text, Dimensions, TouchableOpacity, Image, StatusBar, Alert, TextInput, Button, Keyboard, Platform } from 'react-native'
import { SearchBar, ListItem } from "react-native-elements";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Global } from './Global';
import { Ionicons } from '@expo/vector-icons';
import Myloader from '../constants/Myloader';
import { SafeAreaView } from 'react-native-safe-area-context';
import MyHeader from '../component/MyHeader';
import RBSheet from "react-native-raw-bottom-sheet";
import MyButtonEditDelete from '../component/MyButtonEditDelete';
import faker from 'faker'

faker.seed(10);
const SPACING = 18;
const AVATAR_SIZE = 55;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;

function Search({ route, navigation }) {
    return(
        <View style={styles.Container}>
            <Text>gyrfkmdlsöbgufrkdgtıjnfkd</Text>
        </View>
    );
}
export default Search;
const { height } = Dimensions.get("screen");
const { width } = Dimensions.get("screen");
const height_logo = height * 0.1;
const width_logo = width * 0.90;

const styles = StyleSheet.create({
    HorseName: {
        marginBottom: 10,
        fontWeight: '500',
        fontSize: 16,
    },
    Container: {
        width: '100%',
        height: '100%',
        color: '#fff'
    },
    textStyle: {
        left: 5,
        top: -4,
        fontSize: 12
    },
    textStyle2: {
        left: 5,
        top: -4,
        fontSize: 13,
        fontWeight: 'bold'
    },
    image: {
        width: 120,
        height: 100,
        borderRadius: 4,
        marginRight: 10,
    },
    heightText: {
        marginTop: 15,
        fontSize: 22,
        fontWeight: "700",
    },
    flatList: {
        paddingBottom: 10,
        paddingTop: 10,
        marginTop: 10
    },

    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        paddingBottom: 10,
        margin: 0,
    },
    item: {
        flexDirection: 'row',
        margin: 25,
        borderRadius: 8,
        width: 360,
        left: -10,
        height: 120,
        backgroundColor: '#fff',
        padding: 10,
        marginVertical: 20,
        marginHorizontal: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.34,
        shadowRadius: 4,
        elevation: 8,
        zIndex: 1
    },
    title: {
        fontSize: 32,
    },
    latestItem: {
        flexDirection: 'row',
        borderRadius: 8,
        width: 360,
        left: -10,
        height: (Platform.OS == "ios" ? 120 : 140),
        backgroundColor: '#fff',
        padding: 10,
        marginVertical: 20,
        marginHorizontal: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.34,
        shadowRadius: 4,
        elevation: 8,
        zIndex: 1
    },
})
