import React from 'react'
import {
    View,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    Text,
    StatusBar,
    Linking,
    FlatList,
    Image,
    Platform
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyHeader from '../component/MyHeader';
import { useTranslation } from "react-i18next";
import i18n from "../component/i18n";

function Search({ navigation }) {
    const [getHorseGetFilter, setHorseGetFilter] = React.useState()
    const [getConfirmation, setConfirmation] = React.useState("Confirmation")
    const [getSortTypeIDGlobal, setSortTypeIDGlobal] = React.useState(1)
    const [getYearIDGlobal, setYearIDGlobal] = React.useState("7")
    const [getTime, setTime] = React.useState(true);
    const { t, i18n } = useTranslation();

    const [getHorseID, setHorseID] = React.useState("");
    const [getHorseName, setHorseName] = React.useState("");
    const [getFatherID, setFatherID] = React.useState("");
    const [getMotherID, setMotherID] = React.useState("");
    const [getBmSireID, setBmSireID] = React.useState("");
    const [getConfirm, setConfirm] = React.useState("");
    const [getCountryID, setCountryID] = React.useState("");
    const [getStartBirthdate, setStartBirthdate] = React.useState("");
    const [getEndBirthdate, setEndBirthdate] = React.useState("");
    const [getSexID, setSexID] = React.useState("");
    const [getWinnerTypeID, setWinnerTypeID] = React.useState("");
    const [getMinEarning, setMinEarning] = React.useState("");
    const [getMaxEarning, setMaxEarning] = React.useState("");
    const [getMinPrice, setMinPrice] = React.useState("");
    const [getMaxPrice, setMaxPrice] = React.useState("");
    const [getOwnerID, setOwnerID] = React.useState("");
    const [getBreederID, setBreederID] = React.useState("");
    const [getCoachID, setCoachID] = React.useState("");
    const [getIsDead, setIsDead] = React.useState("");
    const [getMinStartsCount, setMinStartsCount] = React.useState("");
    const [getMaxStartsCount, setMaxStartsCount] = React.useState("");
    const [getMinFirst, setMinFirst] = React.useState("");
    const [getMaxFirst, setMaxFirst] = React.useState("");
    const [getMinSecond, setMinSecond] = React.useState("");
    const [getMaxSecond, setMaxSecond] = React.useState("");
    const [getMinThird, setMinThird] = React.useState("");
    const [getMaxThird, setMaxThird] = React.useState("");
    const [getMinFourth, setMinFourth] = React.useState("");
    const [getMaxFourth, setMaxFourth] = React.useState("");
    const [getReference1, setReference1] = React.useState("");
    const [getReference2, setReference2] = React.useState("");
    const [getB, setB] = React.useState("");
    const [getI, setI] = React.useState("");
    const [getC, setC] = React.useState("");
    const [getS, setS] = React.useState("");
    const [getP, setP] = React.useState("");
    const [getRmB, setRmB] = React.useState("");
    const [getRmI, setRmI] = React.useState("");
    const [getRmC, setRmC] = React.useState("");
    const [getRmS, setRmS] = React.useState("");
    const [getRmP, setRmP] = React.useState("");
    const [getAnzB, setAnzB] = React.useState("");
    const [getAnzI, setAnzI] = React.useState("");
    const [getAnzC, setAnzC] = React.useState("");
    const [getAnzS, setAnzS] = React.useState("");
    const [getAnzP, setAnzP] = React.useState("");

    const [getMinEarningAsFoal, setMinEarningAsFoal] = React.useState()
    const [getMaxEarningAsFoal, setMaxEarningAsFoal] = React.useState()
    const [getMinStartsAsFoal, setMinStartAsFoal] = React.useState()
    const [getMaxStartsAsFoal, setMaxStartsAsFoal] = React.useState()
    const [getMinFirstAsFoal, setMinFirstAsFoal] = React.useState();
    const [getMaxFirstAsFoal, setMaxFirstAsFoal] = React.useState()
    const [getMinSecondAsFoal, setMinSecondAsFoal] = React.useState()
    const [getMaxSecondAsFoal, setMaxSecondAsFoal] = React.useState()
    const [getMinThirdAsFoal, setMinThirdAsFoal] = React.useState()
    const [getMaxThirdAsFoal, setMaxThirdAsFoal] = React.useState()
    const [getMinFourthAsFoal, setMinFourthAsFoal] = React.useState()
    const [getMaxFourthAsFoal, setMaxFourthAsFoal] = React.useState()
    const [getMinBWinnerFoal, setMinBWinnerFoal] = React.useState()
    const [getMaxBWinnerFoal, setMaxBWinnerFoal] = React.useState()
    const [getMinGWinnerFoal, setMinGWinnerFoal] = React.useState()
    const [getMaxGWinnerFoal, setMaxGWinnerFoal] = React.useState()
    const [getMinWinnerFoal, setMinWinnerFoal] = React.useState()
    const [getMaxWinnerFoal, setMaxWinnerFoal] = React.useState()
    const [getMinRaceFoal, setMinRaceFoal] = React.useState()
    const [getMaxRaceFoal, setMaxRaceFoal] = React.useState()
    const [getMinFoal, setMinFoal] = React.useState()
    const [getMaxFoal, setMaxFoal] = React.useState()
    const [getPlaceID, setPlaceID] = React.useState("");
    const [getRegistrationTypeID, setRegistrationTypeID] = React.useState("")

    let maxlimit = 27;

    const readHorseGetFilter = async (getSortTypeID, getYearID) => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                fetch('https://api.pedigreeall.com/StallionPage/GetFilter', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
                    body: JSON.stringify({
                        "MIN_EARNING_AS_FOAL": getMinEarningAsFoal,
                        "MAX_EARNING_AS_FOAL": getMaxEarningAsFoal,
                        "MIN_STARTS_AS_FOAL": getMinStartsAsFoal,
                        "MAX_STARTS_AS_FOAL": getMaxStartsAsFoal,
                        "MIN_FIRST_AS_FOAL": getMinFirstAsFoal,
                        "MAX_FIRST_AS_FOAL": getMaxFirstAsFoal,
                        "MIN_SECOND_AS_FOAL": getMinSecondAsFoal,
                        "MAX_SECOND_AS_FOAL": getMaxSecondAsFoal,
                        "MIN_THIRD_AS_FOAL": getMinThirdAsFoal,
                        "MAX_THIRD_AS_FOAL": getMaxThirdAsFoal,
                        "MIN_FOURTH_AS_FOAL": getMinFourthAsFoal,
                        "MAX_FOURTH_AS_FOAL": getMaxFourthAsFoal,
                        "MIN_B_WINNER_FOAL": getMinBWinnerFoal,
                        "MAX_B_WINNER_FOAL": getMaxBWinnerFoal,
                        "MIN_G_WINNER_FOAL": getMinGWinnerFoal,
                        "MAX_G_WINNER_FOAL": getMaxGWinnerFoal,
                        "MIN_WINNER_FOAL": getMinWinnerFoal,
                        "MAX_WINNER_FOAL": getMaxWinnerFoal,
                        "MIN_RACE_FOAL": getMinRaceFoal,
                        "MAX_RACE_FOAL": getMaxRaceFoal,
                        "MIN_FOAL": getMinFoal,
                        "MAX_FOAL": getMaxFoal,
                        "REGISTRATION_TYPE_ID": getRegistrationTypeID,
                        "PLACE_ID": getPlaceID,
                        "YEAR_ID": getYearID,
                        "HORSE_ID": getHorseID,
                        "HORSE_NAME": getHorseName,
                        "FATHER_ID": getFatherID,
                        "MOTHER_ID": getMotherID,
                        "BM_SIRE_ID": getBmSireID,
                        "CONFIRM": getConfirm,
                        "COUNTRY_ID": getCountryID,
                        "START_bIRTHDATE": getStartBirthdate,
                        "END_BIRTHDATE": getEndBirthdate,
                        "SEX_ID": getSexID,
                        "WINNER_TYPE_ID": getWinnerTypeID,
                        "MIN_EARNING": getMinEarning,
                        "MAX_EARNING": getMaxEarning,
                        "MIN_PRICE": getMinPrice,
                        "MAX_PRICE": getMaxPrice,
                        "OWNER_ID": getOwnerID,
                        "BREEDER_ID": getBreederID,
                        "COACH_ID": getCoachID,
                        "IS_DEAD": getIsDead,
                        "MIN_STARTS_COUNT": getMinStartsCount,
                        "MAX_STARTS_COUNT": getMaxStartsCount,
                        "MIN_FIRST": getMinFirst,
                        "MAX_FIRST": getMaxFirst,
                        "MIN_SECOND": getMinSecond,
                        "MAX_SECOND": getMaxSecond,
                        "MIN_THIRD": getMinThird,
                        "MAX_THIRD": getMaxThird,
                        "MIN_FOURTH": getMinFourth,
                        "MAX_FOURTH": getMaxFourth,
                        "REFERENCE_1": getReference1,
                        "REFERENCE_2": getReference2,
                        "B": getB,
                        "I": getI,
                        "C": getC,
                        "S": getS,
                        "P": getP,
                        "RM_B": getRmB,
                        "RM_I": getRmI,
                        "RM_C": getRmC,
                        "RM_S": getRmS,
                        "RM_P": getRmP,
                        "ANZ_B": getAnzB,
                        "ANZ_I": getAnzI,
                        "ANZ_C": getAnzC,
                        "ANZ_S": getAnzS,
                        "ANZ_P": getAnzP,
                        "SORT_TYPE_ID": getSortTypeID,
                        "PAGE_NO": 1,
                        "PAGE_COUNT": 15,
                        "RACE_ID": 1
                    })
                })
                    .then((response) => response.json())
                    .then((json) => {
                        setHorseGetFilter(json.m_cData)
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
        readHorseGetFilter(getSortTypeIDGlobal, getYearIDGlobal);

    }, [])

    return (
        <View style={styles.Container}>
            <MyHeader Title={t('Search')}
                onPress={() => navigation.goBack()}
            >
                {getTime ?
                    <ActivityIndicator style={styles.Activity} size="large" color="rgba(52, 77, 169, 0.6)" />
                    :
                    <>

                        <FlatList showsVerticalScrollIndicator={true}
                            style={styles.flatList}
                            data={getHorseGetFilter}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.latestItem}
                                    onPress={() => {
                                        navigation.navigate('HorseDetail', {
                                            HORSE_NAME: item.HORSE_NAME,
                                            HORSE_ID: item.HORSE_ID,
                                            Generation: 5,
                                            SECOND_ID: -1,
                                        })
                                    }}
                                >
                                    <Image style={styles.image}
                                        source={{ uri: item.IMAGE }}
                                        resizeMode="cover"
                                    />
                                    <View styel={{ left: 0 }}>

                                        <Text numberOfLines={1} style={styles.HorseName}>
                                            {((item.HORSE_NAME).length > maxlimit) ?
                                                (((item.HORSE_NAME).substring(0, maxlimit - 3)) + '...') :
                                                item.HORSE_NAME}
                                        </Text>
                                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                            <Text style={styles.textStyle2}>{t('Place')}</Text>
                                            <Text style={styles.textStyle}>
                                                {((item.PLACE).length > maxlimit) ?
                                                    (((item.PLACE).substring(0, maxlimit - 3)) + '...') :
                                                    item.PLACE}
                                            </Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                            <Text style={styles.textStyle2}>{t('CellPhone')}</Text>
                                            <Text style={styles.textStyle}>
                                                {item.CELL_PHONE}
                                            </Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                            <Text style={styles.textStyle2}>{t('NameTextTab')}</Text>
                                            <Text style={styles.textStyle}>
                                                {item.NAME}
                                            </Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginTop: 5 }}>

                                            <Text style={[styles.textStyle2]}>{t('Breeding')}</Text>
                                            <Text style={styles.textStyle}>
                                                {item.COUNT}
                                            </Text>
                                            {item.REF1 > 0 ?
                                                <TouchableOpacity
                                                style={{left: 70, bottom: '4%'}}
                                                    onPress={() => {
                                                        Linking.openURL("https://www.tjk.org/TR/YarisSever/Query/ConnectedPage/AtKosuBilgileri?1=1&QueryParameter_AtId=" + item.REF1)
                                                    }}>

                                                    <Image
                                                        style={{ width: 40, height: 30, alignSelf: 'center' }}
                                                        source={{ uri: "https://www.pedigreeall.com//images/head2.jpg" }}
                                                    />
                                                </TouchableOpacity>
                                                :

                                                null}
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
export default Search;
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
        height: 123,
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
        width: 350,
        left: 0,
        height: (Platform.OS == "ios" ? 125 : 145),
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