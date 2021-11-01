import React, { useState, useEffect, useRef } from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Platform,
    Dimensions,
    ScrollView,
    ActivityIndicator,
    FlatList,
    Animated
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';
import RBSheet from "react-native-raw-bottom-sheet";
import { Global } from "./Global";
import HomeComponent from "../component/HomeComponent";
import MyButton from "../component/MyButton";
import Feather from 'react-native-vector-icons/Feather';
import { Ionicons } from '@expo/vector-icons';
import faker from 'faker'

faker.seed(10);
const SPACING = 18;
const AVATAR_SIZE = 55;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;

const GenerationData = [
    {
        id: "4",
        title: "Generation 4",
    },
    {
        id: "5",
        title: "Generation 5",
    },
    {
        id: "6",
        title: "Generation 6",
    },
    {
        id: "7",
        title: "Generation 7",
    },
    {
        id: "8",
        title: "Generation 8",
    },
    {
        id: "9",
        title: "Generation 9",
    },
];

export function TabEffectiveNickSearch({ navigation, route }) {

    useEffect(() => {

        setHorseText(route.params?.horseEffectiveNick)
        setHorseId(route.params?.HorseId)

    });
    const [getHorseText, setHorseText] = useState('')
    const [getHorseId, setHorseId] = useState(0)
    const OpenFullBottomSheet = useRef();
    const [loader, setLoader] = useState(false)
    const [loaderRegistration, setLoaderRegistration] = React.useState(false);
    const [state, setState] = React.useState({ checked: [] });
    const [chekedItem, setChekedItem] = React.useState(5)
    const [getRegisteredStallions, setRegisteredStallions] = React.useState([]);
    const [getRegisteredStallionsName, setRegisteredStallionsName] = React.useState("Stallion");
    const [getBottomSheetText, setBottomSheetText] = React.useState();

    const [getData, setData] = React.useState([]);

    const [getFirstHorseID, setFirstHorseID] = React.useState();
    const refRBSheetGeneration = useRef();
    const [GenerationTitle, setGenerationTitle] = React.useState("Generation 5");

    const readRegisteredStallions = async () => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                //console.log(atob('Z2ZydWx1dGFzQGhvdG1haWwuY29tOjEyMw=='))
                fetch('https://api.pedigreeall.com/StallionPage/GetLastSeasonRegisteredStallions?p_iRaceId=' + 1, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },

                })
                    .then((response) => response.json())
                    .then((json) => {
                        setRegisteredStallions(json.m_cData)
                        setLoader(false);
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
    const readHorseData = async (text) => {
        setData([])
        if (text === "")
            return
        else if (text.length < 3)
            return
        else {
            try {
                fetch('https://api.pedigreeall.com/Horse/GetByName', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + 'Z2ZydWx1dGFzQGhvdG1haWwuY29tOjE=',
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
                        console.log(aa)
                        setSearchHorseData(json)
                        setLoader(false)
                    })
                    .catch((error) => {
                        console.error(error);
                    })

            } catch (e) {
            }
        }
    }
    const readGetAsNameIdForStallion = async (ID) => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                fetch('https://api.pedigreeall.com/Registration/GetAsNameIdForStallion?p_iHorseId=' + ID + '&p_iLanguage=' + Global.Language, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
                })
                    .then((response) => response.json())
                    .then((json) => {
                        setStallionCodeData(json.m_cData)
                        setLoader(false);
                        setLoaderRegistration(true);
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

    React.useEffect(() => {
        setData([])
        readRegisteredStallions();
        readHorseData([]);

    }, [])
    const scrollY = React.useRef(new Animated.Value(0)).current;

    return (
        <ScrollView>
            <Animatable.View style={{ width: '100%', height: '100%', backgroundColor: '#fff' }}
                animation="fadeInDown"
            >

                <Animatable.View style={styles.footer}
                    animation="fadeInDown">

                    <RBSheet hasDraggableIcon
                        ref={OpenFullBottomSheet}
                        height={Dimensions.get('window').height / 2}
                        animationType='fade'
                        closeOnDragDown={true}
                        closeOnPressMask={true}
                        animationType='fade'
                        customStyles={{
                            container: {
                                borderTopLeftRadius: 10,
                                borderTopRightRadius: 10
                            },

                        }}
                    >
                        <View>
                            <View style={{ borderBottomWidth: 0.7, borderBottomColor: '#CFCFD5', paddingLeft: 20, padding: 20, flexDirection: 'row', paddingTop: 0 }}>
                                {Global.Language === 1 ?
                                    <Text style={{ fontSize: 22, left: 5 }}>Aygır:</Text>
                                    :
                                    <Text style={{ fontSize: 22, left: 5 }}>Stallions:</Text>
                                }

                            </View>
                            {getBottomSheetText === "RegisteredStallions" &&
                                <>
                                    {getRegisteredStallions.length > 0 ?

                                        <Animated.FlatList
                                            scrollEnabled={true}
                                            bounces={false}
                                            onScroll={Animated.event(
                                                [{nativeEvent: {contentOffset: {y: scrollY}}}],
                                                {useNativeDriver: true}
                                            )}
                                            
                                            style={styles.flatList2}
                                            data={getRegisteredStallions}
                                            renderItem={({ item, index }) => {
                                                const opacityInputRange = [
                                                    -1,
                                                    0,
                                                    ITEM_SIZE * index,
                                                    ITEM_SIZE * ( index + .5)
                                                ]
                                                const inputRange = [
                                                    -1,
                                                    0,
                                                    ITEM_SIZE * index,
                                                    ITEM_SIZE * ( index + 2)
                                                ]
                                                 const scale = scrollY.interpolate({
                                                     inputRange,
                                                     outputRange: [1,1,1,0]
                                                 })
                                                 const opacity = scrollY.interpolate({
                                                    inputRange: opacityInputRange,
                                                    outputRange: [1,1,1,0]
                                                })
                                                return <TouchableOpacity style={[styles.latestItem, {opacity, transform:[{scale}]}]}
                                                    onPress={() => {
                                                        OpenFullBottomSheet.current.close();
                                                        setRegisteredStallionsName(item.HORSE_NAME);
                                                        setRegisteredStallionsItemData(item);
                                                        setFirstHorseID(item.HORSE_ID);
                                                        readGetAsNameIdForStallion(item.HORSE_ID);
                                                    }}
                                                >

                                                    {item.REGISTRATION_ID === 3 &&
                                                        <View style={{ backgroundColor: '#21ba45', justifyContent: 'center', width: 25, height: 25, borderRadius: 0 }}>
                                                            <Text style={{ color: '#fff', fontWeight: '700', alignSelf: 'center', margin: 'auto' }}>P</Text>
                                                        </View>
                                                    }
                                                    <View style={{ flexDirection: 'column' }}>
                                                        {item.REGISTRATION_ID === 2 &&
                                                            <View style={{ backgroundColor: '#fbbd08', justifyContent: 'center', width: 25, height: 25, borderRadius: 0 }}>
                                                                <Text style={{ color: '#fff', fontWeight: '700', alignSelf: 'center', margin: 'auto' }}>A</Text>
                                                            </View>
                                                        }
                                                    </View>
                                                    {item.REGISTRATION_ID === 1 &&
                                                        <View style={{ backgroundColor: '#db2828', justifyContent: 'center', width: 25, height: 25, borderRadius: 0 }}>
                                                            <Text style={{ color: '#fff', fontWeight: '700', alignSelf: 'center', margin: 'auto' }}>S</Text>
                                                        </View>
                                                    }
                                                    <Text style={{ left: 20 }}>{item.HORSE_NAME}</Text>


                                                </TouchableOpacity>}}
                                            keyExtractor={item => item.HORSE_ID.toString()}
                                        />

                                        :
                                        null
                                    }

                                </>
                            }
                            {loader ?
                                <ActivityIndicator
                                    color="black"
                                    size="large"
                                    style={styles.ActivityIndicatorStyle}
                                />

                                : null}
                        </View>
                    </RBSheet>

                    <View style={{ marginTop: 15 }}>

                        <RBSheet hasDraggableIcon
                            ref={refRBSheetGeneration}
                            height={Dimensions.get('window').height / 2}
                            animationType='fade'
                            closeOnDragDown={true}
                            closeOnPressMask={true}
                            animationType='fade'
                            customStyles={{
                                container: {
                                    borderTopLeftRadius: 10,
                                    borderTopRightRadius: 10
                                },

                            }}
                        >

                            <View style={{ borderBottomWidth: 0.7, borderBottomColor: '#CFCFD5', paddingLeft: 20, padding: 20, flexDirection: 'row', paddingTop: 0 }}>
                                {Global.Language === 1 ?
                                    <Text style={{ fontSize: 22, left: 5 }}>Nesiller: </Text>
                                    :
                                    <Text style={{ fontSize: 22, left: 5 }}>Generations: </Text>
                                }

                            </View>
                            {GenerationData.length > 0 ?

                                <FlatList
                                    scrollEnabled={true}
                                    bounces={false}
                                    style={styles.flatList}
                                    data={GenerationData}

                                    renderItem={({ item, i }) => (
                                        <TouchableOpacity style={styles.latestItem}
                                            onPress={() => {
                                                setState({ checked: [state, item.id] });
                                                setChekedItem(item.id)
                                                setGenerationTitle("Generation " + item.id)
                                                refRBSheetGeneration.current.close();

                                            }}
                                        >
                                            <Ionicons name="arrow-forward-outline" size={16} color="black" />

                                            <View style={{ flexDirection: 'row' }}>

                                                <Text style={styles.textStyle}>
                                                    {item.title} {" "}
                                                </Text>

                                            </View>
                                        </TouchableOpacity>)}
                                    keyExtractor={item => item.id.toString()}
                                />
                                :
                                null
                            }


                        </RBSheet>
                    </View>
                    <View style={{ top: 5 }}>

                        <TouchableOpacity
                            style={styles.action}
                            onPress={() => {
                                setBottomSheetText("RegisteredStallions");
                                OpenFullBottomSheet.current.open();
                            }}>
                            <Ionicons
                                style={{ marginRight: 9, top: 3 }}
                                name="list-outline"
                                color="#2e3f6e"
                                size={22}
                            />
                            <Text style={{ paddingRight: 'auto', top: 4.5, left: 5 }}>{getRegisteredStallionsName}</Text>
                            <Feather style={{ paddingLeft: Dimensions.get('screen').width / 1.7, top: '1%' }} name="chevron-down" color="grey" size={20} />

                        </TouchableOpacity>

                    </View>
                    <View style={{ top: 0 }}>

                        <View style={styles.InputContainer}>
                            <Feather
                                style={{ top: 3, marginRight: 10 }}
                                name="search"
                                color="#2e3f6e"
                                size={20}
                            />
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate('EffectiveNickSearchModal', {
                                        HorseId: getHorseId
                                    })
                                }}
                                style={styles.TwoValueInLineButton}>
                                <Text style={{ alignSelf: 'center' }}>Mare Name: {getHorseText}</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                    <View style={{ bottom: 5 }}>

                        <TouchableOpacity
                            style={styles.action}
                            onPress={() => {
                                refRBSheetGeneration.current.open()
                            }}>
                            <Ionicons
                                style={{ marginRight: 9, top: 3 }}
                                name="aperture-outline"
                                color="#2e3f6e"
                                size={22}
                            />
                            <Text style={{ paddingRight: 'auto', top: 4.5, left: 5 }}>{GenerationTitle}</Text>
                            <Feather style={{ paddingLeft: Dimensions.get('screen').width / 2, top: '1%' }} name="chevron-down" color="grey" size={20} />

                        </TouchableOpacity>
                    </View>
                    <View style={{ bottom: 3 }}>
                        <MyButton
                            Title="EffectiveNick Search"
                            Icon="search-outline"
                            IconSize={18}
                            onPress={() => navigation.navigate('HorseDetail', {
                                HORSE_NAME: route.params?.horseEffectiveNick,
                                HORSE_ID: route.params?.HorseId,
                                Generation: chekedItem,
                                Stallion: getRegisteredStallionsName
                            })}
                        >
                        </MyButton>
                    </View>

                    <HomeComponent />
                </Animatable.View>
            </Animatable.View>
        </ScrollView>

    )
}

const windowWidth = Dimensions.get('window').width - 100;
const styles = StyleSheet.create({
    container: {
        marginTop: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "#fff",
    },
    ScreensContainer: {
        width: '100%',
        height: '100%',
        //backgroundColor:'white'
    },
    action: {
        flexDirection: 'row',
        backgroundColor: '#fff',
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
    InputContainer: {
        width: '100%',
        backgroundColor: "#fff",
        borderRadius: 8,
        flexDirection: 'row',
        marginTop: 0,
        borderWidth: 1,
        borderColor: '#d4d2d2',
        marginBottom: 15,
        zIndex: 99,
        fontSize: 25,
        height: 45,

        padding: 8,
        color: '#000',
    },
    SeacrhScreenContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        alignItems: 'center',
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        paddingHorizontal: 20,
        paddingVertical: 30, top: -18
    },
    flatList: {
        paddingBottom: 10,
        borderTopWidth: 0,
        borderTopColor: '#CFCFD5',
        marginTop: 5,
        maxHeight: Dimensions.get('screen').height,
        width: '100%',
        left: 10
    },
    flatList2: {
        paddingBottom: 20,
        paddingTop: 5,
        marginTop: 0,
        marginLeft: 15,
        maxHeight: Dimensions.get('screen').height / 1.4,
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
    TwoValueInLineButton: {
        flexDirection: 'row',
        width: windowWidth + 40,
        paddingTop: 10,
        flex: 1,
        marginTop: Platform.OS === 'ios' ? -10 : -12,
        paddingLeft: 5,
        color: '#05375a',
        
      },
    latestItem: {
        flexDirection: 'row',
        width: 360,
        left: -10,
        padding: 8,
        marginVertical: 7,
        marginHorizontal: 16,
        zIndex: 1,
        borderBottomWidth: 0.5,
        borderBottomColor: '#d6d3d3',
    },
    textStyle: {
        left: 5,
        fontSize: 12
    },
    textStyle2: {
        left: 5,
        fontSize: 13,
        fontWeight: 'bold',
        left: 15,
        color: '#000',
        top: 5
    },

    SearchButtonStyle: {
        width: '90%',
        padding: 10,
        marginVertical: 20,
        borderColor: '#2e3f6e',
        borderRadius: 8,
        elevation: 8,
        shadowColor: 'silver',
        shadowOpacity: 0.4,
        shadowOffset: { height: 10, width: 0 },
        shadowRadius: 20,
        marginTop: 12,
        marginRight: 5,
        backgroundColor: "#2e3f6e"

    },
    SearchButtonText: {
        alignSelf: "center",
        fontSize: 16,
        color: "#fff",
        fontWeight: '500'
    },
    SireMareButtonContainer: {
        backgroundColor: "#e8edf1",
        padding: 8,
        borderRadius: 8,
        height: 36,
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12,
        marginRight: 5,
        marginLeft: 5,
        alignSelf: 'center'
    },
    GenerationButtonContainer: {
        backgroundColor: "#e8edf1",
        padding: 10,
        borderRadius: 8,
        height: 36,
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12,
        marginRight: 5
    },
    buttonContainer: {
        flex: 1,
    },
    TabBarContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    Title: {
        paddingTop: 40,
        fontSize: 24,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'center',
        textDecorationLine: 'underline'
    },
    Subtitle: {
        paddingTop: 20,
        fontSize: 18,
        fontWeight: '200',
        textAlign: 'center'
    },
    LatestViewItem: {
        width: '100%',
        flex: 1,
        flexDirection: 'row',
    },
    LatestCardTitle: {
        marginLeft: 5,
        fontWeight: '500',
        fontSize: 18
    },
    LatestCardItemTitle: {
        fontSize: 14,
        fontWeight: '500'
    },
    swipeContainer: {
        width: "100%",
    },
    SwipeablePanelContainer: {
        padding: 20,
    },
    SwipeablePanelItem: {
        marginVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    SwipeablePanelText: {
        fontSize: 18,
    },
    FlagContainer: {
        flexDirection: 'row',
    },
    SearchButtonContainer: {
        marginTop: 20,
        padding: 10,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around'
    },
    SearchButtons: {
        width: '45%',
        padding: 15,
        borderWidth: 0.5,
        borderColor: '#2e3f6e',
        borderRadius: 10,
        elevation: 8,
        paddingVertical: 10,
        paddingHorizontal: 12,
        shadowColor: 'silver',
        shadowOpacity: 0.4,
        shadowOffset: { height: 10, width: 0 },
        shadowRadius: 20,
        backgroundColor: "#2169ab"
    },
    SearchButtonsText: {
        alignSelf: "center",
        textTransform: "uppercase",
        fontSize: 16,
        color: "#fff",
        fontWeight: '500'
    },
    SeacrhContainer: {
        width: '100%',
        paddingBottom: 10,
        padding: 10
    },
    SearchButton: {
        width: '100%',
        padding: 10,
        borderRadius: 10,
        elevation: 8,
        backgroundColor: '#2169ab',
        alignItems: 'center'
    },
    GenerationContainer: {
        flexDirection: 'row',
        padding: 20,
        justifyContent: 'space-between'
    },
    GenerationView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    HypotheticalTitlesContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    HypotheticalTitles: {
        flexDirection: 'row',
        width: '50%',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    HypotheticalTitlesText: {
        marginLeft: 10,
        fontSize: 16,
        color: 'silver'
    },
    FlatListItemView: {
        paddingTop: 15,
        borderBottomWidth: 0.2
    },
    scrollContainer: {
        height: 300,
        alignItems: "center",
        justifyContent: "center"
    },
    card: {
        flex: 1,
        marginVertical: 4,
        marginHorizontal: 16,
        borderRadius: 5,
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "center"
    },
    textContainer: {
        backgroundColor: "rgba(0,0,0, 0.7)",
        paddingHorizontal: 24,
        paddingVertical: 8,
        borderRadius: 5
    },
    infoText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold"
    },
    normalDot: {
        height: 8,
        width: 8,
        borderRadius: 4,
        backgroundColor: "silver",
        marginHorizontal: 4
    },
    indicatorContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    SwipableCloseIcon: {
        width: '100%',
        flexDirection: 'row-reverse',
        marginRight: -25
    },
    ActivityIndicatorStyle: {
        zIndex: 1,
        width: '100%',
        height: '60%',
        alignContent: 'center'
    },
    ErrorMessageContainer: {
        width: '100%',
        height: '50%',
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
    ErrorMessageButton: {
        backgroundColor: 'rgb(232, 237, 241)',
        width: '40%',
        padding: 10,
        borderRadius: 8
    },
    ErrorMessageButtonText: {
        textAlign: 'center',
        color: '#2169ab',
        fontSize: 14,
    },
    autocompleteContainer: {
        borderWidth: 1,
        zIndex: 999,
        borderColor: '#87ceeb',
        width: '80%',
        backgroundColor: '#e8edf1'
    },

});