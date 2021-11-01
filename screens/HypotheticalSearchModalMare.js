
import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text, Dimensions, TouchableOpacity, Image, StatusBar, Alert, TextInput, Button, Keyboard } from 'react-native'
import { SearchBar, ListItem } from "react-native-elements";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Global } from './Global';
import { Ionicons } from '@expo/vector-icons';
import Myloader from '../constants/Myloader';

const HypotheticalSearchModalMare = ({ route, navigation }) => {

    const [searchText, setSearchText] = React.useState("");
    const [IsSire, setIsSire] = React.useState(false);
    const [getHorseId, setHorseId] = React.useState(0);

    const [getHorseGetByName, setHorseGetByName] = React.useState([]);
    const [loader, setLoader] = React.useState(false)
    const [loaderText, setLoaderText] = React.useState("Lütfen Bekleyin..")
    const [Data, SetData] = useState([]);

    const readHorseGetByName = async () => {

        let isMounted = true;
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                fetch('https://api.pedigreeall.com/Horse/GetByName', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
                    body: JSON.stringify({
                        ID: 1,
                        NAME: searchText,
                    })

                })
                    .then((response) => response.json())
                    .then((json) => {

                        var aa = [];
                        json.m_cData.map((i, index) => (
                            aa.push({
                                HORSE_DATA: i,
                                HORSE_ID: i.HORSE_ID,
                                HORSE_NAME: i.HORSE_NAME,
                                FATHER_NAME: i.FATHER_NAME,
                                MOTHER_NAME: i.MOTHER_NAME,
                                IMAGE: i.IMAGE,
                            })
                        ))

                        SetData(aa)
                        setLoader(false)
                        setHorseGetByName(json.m_cData)
                        setLoaderText('Lütfen Bekleyin..')
                    })

                    .catch((error) => {
                        console.error(error);
                    })
            }
            else {
                console.log("Basarisiz")
            }
        } catch (e) {
        }
    }

    const [getSearchPlaceholder, setSearchPlaceholder] = React.useState("")
    const [getDeleteButtonPlaceholder, setDeleteButtonPlaceholder] = React.useState("")

    React.useEffect(() => {

        setIsSire(route.params?.isSire)
        setHorseId(route.params?.HorseId)

        if (Global.Language === 1) {
            setSearchPlaceholder("Lütfen isim giriniz ve ara butonuna basınız ..")
            setDeleteButtonPlaceholder("Yükle")
        }
        else {
            setSearchPlaceholder("Please type here and press search .. ")
            setDeleteButtonPlaceholder("Search")
        }
    }, [])

    return (
        <View>
            <Myloader Show={loader} Text={loaderText} />
            <View style={styles.container}>
                <View style={styles.headerContainer}>

                    <View style={[styles.headerContainer2, { marginBottom: 'auto', top: 30 }]}>
                        <SearchBar
                            placeholder={getSearchPlaceholder}
                            lightTheme
                            platform="ios"
                            cancelButtonTitle=""
                            containerStyle={{ backgroundColor: 'transparent', }}
                            inputStyle={{ fontSize: 12, height: 45, justifyContent: 'center' }}
                            inputContainerStyle={{
                                width: '86%',
                                backgroundColor: "#fff",
                                borderRadius: 8,
                                flexDirection: 'row',
                                marginBottom: '0%',
                                fontSize: 25,
                                height: 45,
                                padding: 8,
                                bottom: '6.5%',
                                left: -5
                            }}
                            rightIconContainerStyle={{ margin: 0, padding: 0, minHeight: 'auto', height: 'auto' }}
                            leftIconContainerStyle={{ margin: 0, padding: 0, minHeight: 'auto', height: 'auto' }}
                            value={searchText}
                            onChangeText={(e) => {
                                setSearchText(e);
                            }}
                        />
                        <View style={{ left: '86%', bottom: '212%' }}>
                            <TouchableOpacity
                                onPress={() => {

                                    if (searchText) {
                                        setLoader(true)
                                        Keyboard.dismiss()
                                        readHorseGetByName();
                                    }
                                    else {
                                        alert("Please search the name first");
                                    }
                                }}
                                style={styles.searchButton}>
                                <Ionicons name="search-outline" size={20} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={styles.Container}>

                    {getHorseGetByName.length > 0 ?

                        <View style={{ paddingLeft: 20, padding: 10, bottom: Platform.OS == 'ios' ? '10%' : '20%' }}>
                            <View style={{ flexDirection: 'row' }}>
                            </View>
                            <FlatList
                                scrollEnabled={true}
                                bounces={false}
                                style={styles.flatList}
                                data={getHorseGetByName}

                                renderItem={({ item }) => (
                                    <TouchableOpacity style={styles.latestItem}
                                        onPress={() => {
                                            if (searchText) {
                                                navigation.navigate({
                                                    name: 'TabHypotheticalSearch',
                                                    params: { HorseName: item.HORSE_NAME, isSire: IsSire, HorseId: item.HORSE_ID },

                                                });

                                            }
                                            else {
                                                alert("Please search the name first");
                                            }
                                        }}
                                    >
                                        <Image style={styles.image}
                                            source={{ uri: item.IMAGE }}
                                            resizeMode="cover"
                                        />
                                        <View style={{ flexDirection: 'column' }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={[styles.textStyle2]}>Horse: </Text>

                                                <Text style={styles.textStyle}>
                                                    {item.HORSE_NAME}
                                                </Text>
                                            </View>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={[styles.textStyle2]}>Sire: </Text>

                                                <Text style={styles.textStyle}>
                                                    {item.FATHER_NAME}
                                                </Text>
                                            </View>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={[styles.textStyle2]}>Mare: </Text>
                                                <Text style={styles.textStyle}>
                                                    {item.MOTHER_NAME}
                                                </Text>
                                            </View>

                                        </View>

                                    </TouchableOpacity>)}
                                keyExtractor={item => item.HORSE_ID.toString()}
                            />
                        </View>
                        :
                        null
                    }
                </View>
                <View style={{
                    flex: 1, flexDirection: 'column',
                    justifyContent: 'flex-end', marginBottom: 'auto', bottom: 10, width: '95%', left: 10
                }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={[styles.signIn, {
                            borderColor: '#2e3f6e',
                            borderWidth: 1,

                        }]}
                    >

                        <Text style={[styles.TextStyle, {
                            color: '#2e3f6e'
                        }]}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>

    )
}
export default HypotheticalSearchModalMare;
const { height } = Dimensions.get("screen");
const { width } = Dimensions.get("screen");
const height_logo = height * 0.1;
const width_logo = width * 0.90;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
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
    headerContainer2: {
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
        width: '96%',
        elevation: 10,
        height: 50,
        paddingTop: '4%',
    },
    headerContainer: {
        backgroundColor: '#2e3f6e',
        height: '15%',
    },
    InformationText4: {
        fontSize: 15,
        color: '#000',
        marginRight: 'auto',
        left: 20
    },
    Container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        margin: 0,
    },

    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 10
    },
    logo: {
        width: width_logo,
        height: height_logo,
        bottom: 25
    },
    HeaderText: {
        fontSize: 23,
        color: 'white',
        alignSelf: 'flex-start',
        top: '25%',
        left: '7%'
    },
    searchButton: {
        height: 45,
        alignItems: 'center',
        backgroundColor: '#2e3f6e',
        borderRadius: 8,
        width: 52,
        bottom: '3%',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    HeaderText2: {
        fontSize: 23,
        color: 'white',
        alignSelf: 'flex-start',
        top: '16%',
        left: '5%'
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
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        width: '90%',
        padding: 10,
        elevation: 10,
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
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 14
    },

    signInButton: {
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2e3f6e',
        borderRadius: 8,
        width: '95%',
        margin: 10,
        bottom: '3%',
        flexDirection: 'row'
    },
    textSign: {
        fontSize: 15,
    },
    TextStyle: {
        textAlign: 'center',
        fontSize: 15,
    },
    ButtonContainer: {
        alignItems: 'center'
    },
    SwipableCloseIcon: {
        width: '100%',
        flexDirection: 'row-reverse',
        marginRight: -25,
    },

    FullInputStyle: {
        marginVertical: 5,
        width: '100%',
        paddingLeft: 20,
        borderRadius: 8,
        fontSize: 15,
        margin: 0,
        padding: 10,
        borderColor: 'silver',
        borderWidth: 0.5,
    },
    TwoInformationInLineContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 365,
        alignSelf: 'center'
    },
    InformationContainer: {
        padding: 10,
        width: 385,
        alignSelf: 'center'
    },
    TwoValueInLineButton: {
        width: '47%',
        flexDirection: 'row',
        marginVertical: 8,
        padding: 10,
        justifyContent: 'space-between',
        borderWidth: 0.5,
        borderRadius: 8,
        borderColor: 'silver',
        alignItems: 'center'
    },
    TextInputContainer: {
        padding: 10,
        borderWidth: 0.5,
        borderColor: 'silver',
        borderRadius: 8,
        flexDirection: 'row',
        marginVertical: 5,
        alignSelf: 'center',
        width: 365
    },
    HalfInputStyle: {
        width: '90%',
        paddingLeft: 20,
        fontSize: 15,
        margin: 0,
    },
    OneValueInLine: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: 'silver',
        marginVertical: 7,
        padding: 10,
        width: 365,
        alignSelf: 'center'
    },
    InputTouchableContainer: {
        width: '95%',
        justifyContent: 'flex-start',
        flexDirection: 'row'
    },
    InformationText: {
        fontSize: 15,
        marginLeft: 20,
        marginRight: 'auto',
    },
    CurrencyContainer: {
        marginVertical: 30
    },
    EarningPriceItemContainer: {
        flexDirection: 'row',
        width: 365,

        justifyContent: 'space-between',
        borderRadius: 8,
        borderColor: 'silver',
        borderWidth: 0.5,
        marginVertical: 5,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    EarningPriceButtonContainer: {
        flexDirection: 'row',
        borderLeftWidth: 0.5,
        borderColor: 'silver',
        padding: 5,
        justifyContent: 'space-around',
        width: '30%',
    },
    EarningPriceInput: {
        padding: 5,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        width: '60%',
        fontSize: 15,
        marginLeft: 10,
        left: 20
    },
    EarningPriceButtonText: {
        fontSize: 15,
        marginRight: 5,
    },
    CoachOwnerContainer: {
        marginVertical: 10,
        width: 365,
        alignSelf: 'center'
    },
    ThreeValueInLineButton: {
        width: '100%',
        flexDirection: 'row',
        marginVertical: 5,
        padding: 10,
        justifyContent: 'space-between',
        borderWidth: 0.5,
        borderRadius: 8,
        borderColor: 'silver',
        alignItems: 'center'
    },
    action2: {
        flexDirection: 'row',
        marginVertical: 8,
        padding: 10,
        marginTop: 10,
        paddingBottom: 5,
        justifyContent: 'space-between',

        alignItems: 'center'
    },
    ButtonContainer: {
        alignItems: 'center'
    },
    SwipableCloseIcon: {
        width: '100%',
        flexDirection: 'row-reverse',
        marginRight: -25,
    },
    HorseName: {
        marginBottom: 10,
        fontWeight: '500',
        fontSize: 16,
    },
    textStyle: {
        left: 5,

        fontSize: 12
    },
    textStyle2: {
        left: 5,
        fontSize: 13,
        fontWeight: 'bold'
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginRight: 10,
    },
    heightText: {
        marginTop: 15,
        fontSize: 22,
        fontWeight: "700",
    },
    flatList: {
        paddingBottom: 20,
        paddingTop: 10,
        marginTop: '8%',
        marginLeft: -15,
        height: Dimensions.get('screen').height / 1.40,
    },
    item: {
        flexDirection: 'row',
        width: 360,
        left: -15,
        padding: 10,
        marginVertical: 7,
        marginHorizontal: 16,
        zIndex: 1,
        borderBottomWidth: 0.5,
        borderBottomColor: '#d6d3d3',

    },
    title: {
        fontSize: 32,
    },
    latestItem: {
        flexDirection: 'row',
        width: 360,
        left: -10,
        padding: 10,
        marginVertical: 7,
        marginHorizontal: 16,
        zIndex: 1,
    },

})
