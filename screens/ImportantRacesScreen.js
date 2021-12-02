import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Modal, Text, ActivityIndicator, Platform, FlatList, StatusBar, Image, TextInput } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome5";
import { ScrollView } from 'react-native-gesture-handler';
import { Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DataTable } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import { Ionicons } from '@expo/vector-icons';
import Feather from 'react-native-vector-icons/Feather';
import MyHeader from '../component/MyHeader';
import MyButtonEditDelete from '../component/MyButtonEditDelete';
import { useTranslation } from "react-i18next";
import i18n from "../component/i18n";

function ImportantRaces({ navigation }) {

    const itemWidth = 360;
    const separatorWidth = 32;
    const totalItemWidth = itemWidth + separatorWidth;
    const { t, i18n } = useTranslation();

    const [CounrtyList, setCountryList] = useState([])
    const [RaceTitleList, setRaceTitleList] = useState([])
    const [RaceGroupList, setRaceGroupList] = useState([])
    const [FloorList, setFloorList] = useState([])
    const [DistanceList, setDistanceList] = useState([])
    const [getCountryID, setCountryID] = React.useState("");
    const [getDistanceID, setDistanceID] = React.useState("");
    const [getFloorID, setFloorID] = React.useState("");
    const [getRaceGroupID, setRaceGroupID] = React.useState("")

    const [showReport, setShowReport] = React.useState(false);
    const [getLoadingForTable, setLoadingForTable] = React.useState(false)
    const [getTime, setTime] = React.useState(true);
    const [getHorseGetFilter, setHorseGetFilter] = React.useState();
    const [getMoreInfo, setMoreInfo] = React.useState(false)

    const [getImportantRaces, setImportantRaces] = React.useState();

    const readImportantRaces = async () => {
        try {
            if (Global.Token !== null) {
                fetch('https://api.pedigreeall.com/ImportantRace/GetById?p_iId=3', {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + Global.Token,
                    },
                }).then((response) => response.json())
                    .then((json) => {
                        if (json !== null) {
                            setImportantRaces(json.m_cData);
                            setTime(false);
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                    })
            }
            else {
                console.log("Basarisiz")
            }
        }
        catch (e) {
            console.log("GetSiblingMare Error")
        }
    };
    const readRaceTitleList = async () => {
        let isActive = true;
        const abortCtrl = new AbortController();
        const opts = {

            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Basic " + "Z2ZydWx1dGFzQGhvdG1haWwuY29tOjE=",
            },
            body: JSON.stringify({
                COUNTRY_ID: getCountryID,
                RACE_DISTANCE_ID: getDistanceID,
                RACE_FLOOR_ID: getFloorID,
                RACE_GROUP_ID: getRaceGroupID,
            })
        };
        fetch('https://api.pedigreeall.com/RaceTitle/GetFilter', opts)
            .then((response) => response.json())
            .then((json) => {
                var aa = [];
                json.m_cData.map((i, index) => (
                    aa.push({
                        RACE_DATA: i,
                        RACE_ID: i.RACE_ID,
                        RACE_TITLE_EN: i.RACE_TITLE_EN,
                        RACE_TITLE_ID: i.RACE_TITLE_ID,
                        RACE_TITLE_TR: i.RACE_TITLE_TR,
                        RACE_CITY: i.RACE_CITY,
                        IMAGE: i.IMAGE,
                        COUNTER: i.COUNTER,
                    }
                    )))
                if (isActive) {
                    setRaceTitleList(aa)
                    setTime(false)
                }
            })
            .catch((error) => {
                console.error(error);
            })
        return () => { abortCtrl.abort(), isActive = false };
    };

    const readHorseRaceGetFilter = async () => {
        let isActive = true;
        const abortCtrl = new AbortController();
        const opts = {

            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Basic " + "Z2ZydWx1dGFzQGhvdG1haWwuY29tOjE=",
            },
            body: JSON.stringify({
                HORSE_RACE_ID: "",
                HORSE_RACE_TITLE: "",
                COUNTRY_ID: "",
                CITY_ID: "",
                RACE_ID: "",
                RACE_DISTANCE_ID: "",
                RACE_FLOOR_ID: "",
                RACE_TYPE_ID: "",
                START_DATE: "",
                MIN_PRIZE: "",
                MAX_PRIZE: "",
                ACTIVE: "",
                PAGE_NO: 1,
                PAGE_COUNT: 100,
            })
        };
        fetch('https://api.pedigreeall.com/HorseRace/GetFilter', opts)
            .then((response) => response.json())
            .then((json) => {
                if (isActive) {
                    setHorseGetFilter(json.m_cData)
                    setTime(false)
                    setLoadingForTable(false)
                }
            })
            .catch((error) => {
                console.error(error);
            })
        return () => { abortCtrl.abort(), isActive = false };
    };

    const readDataCountryList = async () => {
        let isMounted = true;
        let isActive = true;
        const abortCtrl = new AbortController();
        const opts = {
            signal: abortCtrl.signal,
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        };
        fetch('https://api.pedigreeall.com/Country/GetAsNameIdForRaceCity?p_iLanguage=2', opts)
            .then((response) => response.json())
            .then((json) => {
                var list = [];
                json.m_cData.map(item => (
                    list.push({
                        label: item.NAME,
                        value: item.ID,
                        key: item.ID.toString()
                    })
                ))
                if (isActive) {
                    setCountryList(list)
                }
            })
            .catch((error) => {
                console.error(error);
            })
        return () => { abortCtrl.abort(), isActive = false, isMounted = false };

    }

    const readDataRaceGroupList = async (RaceID) => {
        let isMounted = true;
        let isActive = true;
        const abortCtrl = new AbortController();
        const opts = {
            signal: abortCtrl.signal,
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Basic " + "Z2ZydWx1dGFzQGhvdG1haWwuY29tOjE=",
            },
        };
        fetch('https://api.pedigreeall.com/RaceGroup/GetAsNameId?p_iLanguage=2&p_sRaceId=1', opts)
            .then((response) => response.json())
            .then((json) => {
                var list = [];
                json.m_cData.map(item => (
                    list.push({
                        label: item.NAME,
                        value: item.ID,
                        key: item.ID.toString()
                    })
                ))
                if (isActive) {
                    setRaceGroupList(list)
                }
            })
            .catch((error) => {
                console.error(error);
            })
        return () => { abortCtrl.abort(), isActive = false, isMounted = false };

    }

    const readDataDistanceList = async () => {
        let isMounted = true;
        let isActive = true;
        const abortCtrl = new AbortController();
        const opts = {
            signal: abortCtrl.signal,
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Basic " + "Z2ZydWx1dGFzQGhvdG1haWwuY29tOjE=",
            },
        };
        fetch('https://api.pedigreeall.com/RaceDistance/Get', opts)
            .then((response) => response.json())
            .then((json) => {
                var list = [];
                json.m_cData.map(item => (
                    list.push({
                        label: item.DISTANCE.toString(),
                        value: item.RACE_DISTANCE_ID,
                        key: item.RACE_DISTANCE_ID.toString()
                    })
                ))
                if (isActive) {
                    setDistanceList(list)
                }
            })
            .catch((error) => {
                console.error(error);
            })
        return () => { abortCtrl.abort(), isActive = false, isMounted = false };

    }

    const readDataRunwayList = async () => {
        let isMounted = true;
        let isActive = true;
        const abortCtrl = new AbortController();
        const opts = {
            signal: abortCtrl.signal,
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Basic " + "Z2ZydWx1dGFzQGhvdG1haWwuY29tOjE=",
            },
        };
        fetch('https://api.pedigreeall.com/RaceFloor/GetAsNameId?p_iLanguage=2', opts)
            .then((response) => response.json())
            .then((json) => {
                var list = [];
                json.m_cData.map(item => (
                    list.push({
                        label: item.NAME,
                        value: item.ID,
                        key: item.ID.toString()

                    })
                ))
                if (isActive) {
                    setFloorList(list)
                }

            })
            .catch((error) => {
                console.error(error);
            })
        return () => { abortCtrl.abort(), isActive = false, isMounted = false };

    }

    let maxlimit = 27;

    React.useEffect(() => {
        readDataCountryList();
        readHorseRaceGetFilter();
        readDataDistanceList();
        readDataRunwayList();
        readDataRaceGroupList();
        readRaceTitleList();
        readImportantRaces();
    }, [])

    return (
        <View style={styles.Container}>
            <MyHeader Title={t('ImportantRaces')}
                onPress={() => navigation.goBack()}
            >
                {/*
                <View style={styles.ScrollViewContainer}>
                    {showReport ?
                        <>
                            <View>
                                <TouchableOpacity
                                    onPress={() => {
                                        setShowReport(false)
                                    }}
                                    style={{ flexDirection: 'row', marginBottom: 20, padding: 10, borderRadius: 20, borderColor: 'silver', width: 150, height: 28, alignContent: 'center', top: 10, left: 10, backgroundColor: '#2e3f6e' }}>
                                    <Image style={{ width: 25, height: 25, position: 'absolute' }}

                                        source={require('../assets/backWhite.png')}

                                        resizeMode="contain"
                                    />

                                    <Text style={{ fontSize: 16, marginLeft: 10, left: 10, alignSelf: 'center', color: 'white', marginTop: Platform.OS == 'ios' ? -5 : -4 }}>{t('BackToSearch')}</Text>


                                </TouchableOpacity>
                            </View>

                            {getLoadingForTable ?
                                <View style={{ width: '100%', height: '100%', alignItems: 'center' }}>
                                    <ActivityIndicator style={styles.Activity} size="large" color="rgba(52, 77, 169, 0.6)" />

                                </View>
                                :
                                <>
                                    {RaceTitleList !== undefined ?
                                        <>
                                            {RaceTitleList.length === 0 ?
                                                <View style={styles.ErrorMessageContainer}>
                                                    <>
                                                        <Text style={styles.ErrorMessageTitle}>{t('Nodatafound')}</Text>
                                                    </>
                                                </View>
                                                :
                                                <>
                                                    {getTime ?
                                                        <ActivityIndicator style={styles.Activity} size="large" color="rgba(52, 77, 169, 0.6)" />
                                                        :
                                                        <>
                                                            <FlatList
                                                                showsVerticalScrollIndicator={true}
                                                                style={styles.flatList}
                                                                data={RaceTitleList}
                                                                renderItem={({ item }) => (
                                                                    <TouchableOpacity style={styles.item}
                                                                        onPress={() => {
                                                                            alert(item.RACE_TITLE_EN)
                                                                        }}
                                                                    >
                                                                        <Image style={styles.image}
                                                                            source={{ uri: item.IMAGE }}
                                                                            resizeMode="cover"
                                                                        />
                                                                        <View>
                                                                            <Text numberOfLines={1} style={styles.HorseName}>
                                                                                {((item.RACE_TITLE_EN).length > maxlimit) ?
                                                                                    (((item.RACE_TITLE_EN).substring(0, maxlimit - 3)) + '...') :
                                                                                    item.RACE_TITLE_EN}
                                                                            </Text>
                                                                        </View>

                                                                    </TouchableOpacity>)}
                                                                keyExtractor={item => item.RACE_TITLE_ID.toString()}
                                                            />
                                                        </>
                                                    }
                                                </>
                                            }
                                        </>
                                        :
                                        null
                                    }
                                </>
                            }
                        </>

                        :

                        <>
                            <View style={styles.InformationContainer}>

                                <View style={[styles.action, { top: 5 }]}>
                                    <Ionicons name="flag-outline" size={22} color="#2e3f6e" />

                                    <RNPickerSelect
                                        placeholder={{}}
                                        style={
                                            pickerSelectStyles
                                        }
                                        Icon={() => {
                                            return <Feather style={{ paddingRight: Platform.OS == 'ios' ? '12%' : '15%', top: '1%' }} name="chevron-down" color="grey" size={20} />
                                        }}
                                        useNativeAndroidPickerStyle={false}
                                        onValueChange={(value) => {
                                            setCountryID(value)
                                        }}
                                        items={CounrtyList}
                                        value={getCountryID}
                                        key={getCountryID}
                                    />
                                </View>
                                <View style={styles.action}>
                                    <Ionicons name="locate-outline" size={22} color="#2e3f6e" />

                                    <RNPickerSelect
                                        placeholder={{}}

                                        style={
                                            pickerSelectStyles
                                        }
                                        Icon={() => {
                                            return <Feather style={{ paddingRight: Platform.OS == 'ios' ? '12%' : '15%', top: '1%' }} name="chevron-down" color="grey" size={20} />

                                        }}


                                        useNativeAndroidPickerStyle={false}
                                        onValueChange={(value) => {
                                            setDistanceID(value)
                                        }}
                                        items={DistanceList}
                                        value={getDistanceID}
                                        key={getDistanceID}

                                    />
                                </View>
                                <View style={styles.action}>
                                    <Icon style={{ left: '18%' }} name="pagelines" size={20} color="#2e3f6e" />

                                    <RNPickerSelect
                                        placeholder={{}}

                                        style={
                                            pickerSelectStyles
                                        }
                                        Icon={() => {
                                            return <Feather style={{ paddingRight: Platform.OS == 'ios' ? '12%' : '13%', top: '1%' }} name="chevron-down" color="grey" size={20} />

                                        }}


                                        useNativeAndroidPickerStyle={false}
                                        onValueChange={(value) => {
                                            setFloorID(value)
                                        }}
                                        items={FloorList}
                                        value={getFloorID}
                                        key={getFloorID}

                                    />
                                </View>
                                <View style={styles.action}>
                                    <Ionicons name="people-outline" size={22} color="#2e3f6e" />
                                    <RNPickerSelect
                                        placeholder={{}}

                                        style={
                                            pickerSelectStyles
                                        }
                                        Icon={() => {
                                            return <Feather style={{ paddingRight: Platform.OS == 'ios' ? '12%' : '15%', top: '1%' }} name="chevron-down" color="grey" size={20} />

                                        }}

                                        useNativeAndroidPickerStyle={false}
                                        onValueChange={(value) => {
                                            setRaceGroupID(value)
                                        }}
                                        items={RaceGroupList}
                                        value={getRaceGroupID}
                                        key={getRaceGroupID}

                                    />
                                </View>

                            </View>
                            <View style={{ marginBottom: 25 }}>
                                <MyButtonEditDelete
                                    Title={t('Search')}
                                    Icon="search-outline"
                                    IconSize={18}
                                    onPress={() => {
                                        setLoadingForTable(true)
                                        readHorseRaceGetFilter();
                                        setShowReport(true)
                                    }}
                                />
                            </View>
                        </>
                    }
                */}
                    <>
                        {getTime ?
                            <ActivityIndicator style={styles.Activity} size="large" color="rgba(52, 77, 169, 0.6)" />
                            :
                            <>
                                <FlatList
                                    showsVerticalScrollIndicator={true}
                                    style={styles.flatList}
                                    data={RaceTitleList}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity style={styles.item}
                                            onPress={() => {
                                                alert(item.RACE_TITLE_EN)
                                            }}
                                        >
                                            <Image style={styles.image}
                                                source={{ uri: item.IMAGE }}
                                                resizeMode="cover"
                                            />
                                            <View>
                                                <Text numberOfLines={1} style={styles.HorseName}>
                                                    {((item.RACE_TITLE_EN).length > maxlimit) ?
                                                        (((item.RACE_TITLE_EN).substring(0, maxlimit - 3)) + '...') :
                                                        item.RACE_TITLE_EN}
                                                </Text>
                                            </View>

                                        </TouchableOpacity>)}
                                    keyExtractor={item => item.RACE_TITLE_ID.toString()}
                                />
                            </>
                        }
                    </>
            </MyHeader>
        </View>
    )
}
const windowWidth = Dimensions.get('window').width - 100;

export default ImportantRaces;
const styles = StyleSheet.create({
    Container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff'
    },
    ScrollViewContainer: {
        width: '100%',
        height: '100%'
    },
    InformationContainer: {
        padding: 10
    },
    TextInputContainer: {
        padding: 10,
        borderWidth: 0.5,
        borderColor: 'silver',
        borderRadius: 8,
        flexDirection: 'row',
        marginVertical: 5
    },
    TextInputHeader: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    HalfInputStyle: {
        width: '90%',
        paddingLeft: 20,
        fontSize: 16,
        margin: 0,
    },
    BottomSheetInputsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 0.5,
        borderRadius: 8,
        borderColor: 'silver',
        padding: 10,
        marginVertical: 2
    },
    OneValueInLineButton: {
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    InformationText: {
        fontSize: 16,
        marginLeft: 5
    },
    SwipableCloseIcon: {
        width: '100%',
        flexDirection: 'row-reverse',
        marginRight: -25
    },
    TwoValueInLineButton: {
        width: '100%',
        flexDirection: 'row',
        marginVertical: 2,
        padding: 10,
        justifyContent: 'space-between',
        borderWidth: 0.5,
        borderRadius: 8,
        borderColor: 'silver',
        alignItems: 'center'
    },
    BirthDatePickerButton: {
        width: '80%',
        flexDirection: 'row'
    },
    BirthDateText: {
        marginLeft: 10,
        fontSize: 16
    },
    ButtonContainer: {
        alignItems: 'center',
        marginBottom: 20
    },
    ErrorMessageContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    ErrorMessageTitle: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#222'
    },
    ErrorMessageText: {
        fontSize: 16,
        color: '#c7c1c1',
        textAlign: 'center',
        marginTop: 5
    },
    ErrorMessageButtonContainer: {
        width: '80%',
        marginTop: 40,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    FullInputStyle: {
        marginVertical: 5,
        width: '100%',
        paddingLeft: 20,
        borderRadius: 8,
        fontSize: 18,
        margin: 0,
        padding: 10,
        borderColor: 'silver',
        borderWidth: 0.5,
    },
    action: {
        flexDirection: 'row',
        width: '100%',
        borderRadius: 8,
        marginTop: 0,
        height: 45,
        borderWidth: 1,
        borderColor: '#d4d2d2',
        borderBottomWidth: 1,
        padding: 8,
        paddingRight: 'auto',
        marginBottom: 15,
        zIndex: 99,
    },
    flatList: {
        paddingBottom: 10,
        paddingTop: 0,
        marginTop: 10,
        height: '33.6%'
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
        left: -5,
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
        elevation: 5.5,
        zIndex: 1
    },
    Activity: {
        top: '20%', shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.27,
        elevation: 4,
        backgroundColor: '#fff',
        width: 50,
        height: 50,
        paddingLeft: Platform.OS == 'ios' ? 3 : 0,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
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
    image: {
        width: 160,
        height: 100,
        borderRadius: 4,
        marginRight: 10,
    },
    DataTableTitle: {
        width: 100
    },
    DataTableText: {
        width: 100
    },
    modalText: {
        marginBottom: 15,
    },
    ModalItemContainer: {
        width: '100%',
        height: '100%',

    },
    ModalContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    FullScreenContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        shadowColor: "#000",
    },

})
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: windowWidth + 40,
        bottom: 5,
        left: 15,
        flex: 1,
        marginTop: 10,
        paddingLeft: 0,
        paddingTop: 8,
        color: '#000',
    },
    inputAndroid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: windowWidth + 60,
        flex: 1,
        marginBottom: -23,
        paddingLeft: 0,
        paddingTop: 8,
        color: '#000',
        left: 15
    },
    placeholder: { color: '#9a9aa1', fontSize: 14, bottom: 10 },
});