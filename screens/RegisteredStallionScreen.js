import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    Text,
    StatusBar,
    FlatList,
    Image,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyHeader from '../component/MyHeader';
import { Ionicons } from '@expo/vector-icons';
import faker from 'faker'
import { useTranslation } from "react-i18next";
import i18n from "../component/i18n";

faker.seed(10);
const SPACING = 18;
const AVATAR_SIZE = 55;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;

function RegisteredStallion({ navigation }) {
    const [getTime, setTime] = React.useState(true);
    const [Data, SetData] = useState([]);
    const { t, i18n } = useTranslation();

    let maxlimit = 27;
    let addresslimit = 27;

    const ReadRegisteredStallion = async () => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                fetch('https://api.pedigreeall.com/StallionPage/GetRegisteredStallions?p_iRaceId=-1&p_iTopCount=5', {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + "Z2ZydWx1dGFzQGhvdG1haWwuY29tOjE=",
                    },
                })
                    .then((response) => response.json())
                    .then((json) => {
                        SetData(json.m_cData)
                        setTime(false)
                    })
                    .catch((error) => {
                        console.error(error);
                    })
            }
            else {
                console.log("Basarisiz")
            }
        } catch (e) {
            console.log(e)
        }
    }

    React.useEffect(() => {
        ReadRegisteredStallion();

    }, [])

    return (
        <View style={styles.Container}>
            <MyHeader Title={t('RegisteredStallions')}
                onPress={() => navigation.goBack()}
            >
                {getTime ?
                    <ActivityIndicator style={styles.Activity} size="large" color="rgba(52, 77, 169, 0.6)" />
                    :
                    <>

                        <FlatList showsVerticalScrollIndicator={true}
                            style={styles.flatList}
                            data={Data}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.item}
                                    onPress={() => {
                                        navigation.navigate('HorseDetail', {
                                            HORSE_NAME: item.HORSE_NAME,
                                            HORSE_ID: item.HORSE_ID,
                                            SECOND_ID: -1,
                                            Generation: 5
                                        })
                                    }}
                                >
                                    <Image style={styles.image}
                                        source={{ uri: item.IMAGE }}
                                        resizeMode="cover"
                                    />
                                    <View>
                                        <Text numberOfLines={1} style={styles.HorseName}>
                                            {((item.HORSE_NAME).length > maxlimit) ?
                                                (((item.HORSE_NAME).substring(0, maxlimit - 3)) + '...') :
                                                item.HORSE_NAME}
                                        </Text>
                                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                            <Ionicons name='cash-outline' size={12} />
                                            <Text style={styles.textStyle}>
                                                {item.FEE_TEXT}
                                            </Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                            <Ionicons name='call-outline' size={12} />
                                            <Text style={styles.textStyle}>
                                                {item.CELL_PHONE}
                                            </Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                            <Ionicons name='location-outline' size={12} />
                                            <Text numberOfLines={1} style={styles.textStyle}>
                                                {((item.PLACE).length > addresslimit) ?
                                                    (((item.PLACE).substring(0, addresslimit - 3)) + '...') :
                                                    item.PLACE}
                                            </Text>
                                        </View>
                                    </View>

                                </TouchableOpacity>)}
                            keyExtractor={item => item.HORSE_ID.toString()}
                        />
                    </>
                }
            </MyHeader>
        </View>
    )
}
export default RegisteredStallion;
const styles = StyleSheet.create({
    Container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff'
    },
    HorseName: {
        marginBottom: 10,
        fontWeight: '500',
        fontSize: 16,
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
        paddingTop: 0,
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
        width: 350,
        left: 0,
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
        width: 350,
        left: 0,
        height: (Platform.OS == "ios" ? 100 : 120),
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

    Activity: {
        top: '40%', shadowColor: "#000",
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
    CardInformationContainer: {
        marginTop: 20,
        padding: 10
    },
    CardInformationTextAndIconContainer: {
        flexDirection: 'row',
        marginVertical: 5
    },
    CardInformationText: {
        marginLeft: 10
    },
    CardInformationTextViewContainer: {
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    CardInformationTextContainer: {
        flexDirection: 'row',
    },
    SortTypeContainer: {
        width: '100%',
        padding: 10,
        paddingRight: 15,
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    SortTypeButton: {
        flexDirection: 'row',
        backgroundColor: '#2169ab',
        padding: 10,
        borderRadius: 6,
        elevation: 10,
        width: '40%'
    },
    SortTypeButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '700',
        textAlign: 'center'
    },
    SwipableCloseIcon: {
        width: '100%',
        flexDirection: 'row-reverse',
        marginRight: -25,
    },
    FilteringContainer: {
        position: 'absolute',
        padding: 20,
        backgroundColor: '#2169ab',
        borderBottomWidth: 0.5,
        borderColor: 'silver',
        flexDirection: 'row',
        bottom: 10,
        right: 10,
        borderRadius: 50,
        zIndex: 1,
        elevation: 10
    },
    SearchButtonStyle: {
        width: '80%',
        padding: 15,
        marginVertical: 20,
        borderColor: '#2e3f6e',
        borderRadius: 8,
        elevation: 8,
        shadowColor: 'silver',
        shadowOpacity: 0.4,
        shadowOffset: { height: 10, width: 0 },
        shadowRadius: 20,
        backgroundColor: "#2169ab",
        alignSelf: 'center'

    },
    SearchButtonText: {
        alignSelf: "center",
        textTransform: "uppercase",
        fontSize: 16,
        color: "#e8edf1",
        fontWeight: '500'
    },

    DetailButtonStyle: {
        width: '80%',
        padding: 15,
        marginVertical: 20,
        borderColor: '#2e3f6e',
        borderRadius: 8,
        elevation: 8,
        shadowColor: 'silver',
        shadowOpacity: 0.4,
        shadowOffset: { height: 10, width: 0 },
        shadowRadius: 20,
        backgroundColor: "#e8edf1",
        alignSelf: 'center'

    },
    DetailButtonText: {
        alignSelf: "center",
        textTransform: "uppercase",
        fontSize: 16,
        color: "#2e3f6e",
        fontWeight: '500'
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
    TwoInformationInLineContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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
    InformationText: {
        fontSize: 16,
        marginLeft: 10
    },
    BottomSheetContainer: {
        padding: 20
    },
    OneValueInLine: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: 'silver',
        marginVertical: 7,
        padding: 10
    },
    InformationText: {
        fontSize: 16,
        marginLeft: 10
    },
    InputTouchableContainer: {
        width: '95%',
        justifyContent: 'flex-start',
        flexDirection: 'row'
    },
    HalfInputStyle: {
        width: '90%',
        paddingLeft: 20,
        fontSize: 16,
        margin: 0,
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
    TextInputLineContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: 'silver',
        padding: 5,
        borderRadius: 8,
        marginVertical: 5
    },
    ErrorMessageContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginVertical: 30
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
})