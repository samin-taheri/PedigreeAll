import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator, ScrollView, Image, FlatList } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { SearchBar, ListItem } from 'react-native-elements';
import Feather from 'react-native-vector-icons/Feather';
import { Global } from './Global';
import Icon from "react-native-vector-icons/FontAwesome5";


const HorseDetailScreen = ({ route, navigation }) => {
    const { HORSE_NAME } = route.params;
    const { HORSE_GENERATION } = route.params;

    const [getData, setData] = React.useState([]);


    const readUser = async (text) => {
        try {
            fetch('https://api.pedigreeall.com/Horse/GetByName', opts, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': "Basic " + "Z2ZydWx1dGFzQGhvdG1haWwuY29tOjE=",
                },
                body: JSON.stringify({
                    ID: 1,
                    NAME: text,
                })
            })
                .then((response) => response.json())
                .then((json) => {
                    var aa = [];
                    json.m_cData.map((i, index) => (
                        aa.push({
                            HORSE_DATA: i,
                            HORSE_ID: i.HORSE_ID
                        })
                    ))
                    setData(aa)
                    //console.log(aa)
                })
                .catch((error) => {
                    console.error(error);
                })

        } catch (e) {
        }

    }


    const myFunction = async () => {
        let isActive = true;
        const abortCtrl = new AbortController();
        const opts = {
            signal: abortCtrl.signal,
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Basic " + "Z2ZydWx1dGFzQGhvdG1haWwuY29tOjE=",
            },
            body: JSON.stringify({
                ID: 1,
                NAME: HORSE_NAME,
                GENERATION: HORSE_GENERATION,
            })
        };
        fetch('https://api.pedigreeall.com/Horse/GetByName', opts)
            .then((response) => response.json())
            .then((json) => {
                var aa = [];
                json.m_cData.map((i, index) => (
                    aa.push({
                        HORSE_DATA: i,
                        HORSE_ID: i.HORSE_ID
                    })
                ))
                if (isActive) {
                    setData(aa)
                    //console.log(aa)
                }
            })
            .catch((error) => {
                console.error(error);
            })
        return () => { abortCtrl.abort(), isActive = false };
    };

    useEffect(() => {
        setData([])
        myFunction();
    }, []);

    return (
        <View style={{
            flex: 1, flexDirection: 'column',
            justifyContent: 'flex-end', marginBottom: 'auto', bottom: 10, width: '95%', left: 10
        }}>
            <View style={{ marginBottom: 'auto', justifyContent: 'center', top: 30, left: 10 }} >

                <Text>{HORSE_NAME}</Text>
                <Text>{HORSE_GENERATION}</Text>

            </View>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={[styles.signIn, {
                    borderColor: '#2e3f6e',
                    borderWidth: 1,
                    marginTop: 15
                }]}
            >

                <Text style={[styles.TextStyle, {
                    color: '#2e3f6e'
                }]}>Close</Text>
            </TouchableOpacity>
        </View>
    );

}
export default HorseDetailScreen;
const styles = StyleSheet.create({
    signIn: {
        width: '100%',
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        borderWidth: 3,
        borderColor: '#000',
    },
    signInButton: {
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2e3f6e',
        borderRadius: 8,
        flexDirection: 'row'
    },
    TextStyle: {
        textAlign: 'center',
        fontSize: 15,
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
        backgroundColor: '#fff',
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
        shadowColor: "rgba(0 ,79, 124, 0.24)",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 2,
        fontSize: 25,
        padding: 8,
        textAlign: 'center'
    },

})
