import React, { useRef } from 'react'
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    Animated,
    Dimensions,
    ActivityIndicator,
    Platform
} from 'react-native'
import { Global } from './Global'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Flag from "react-native-flags";
import * as Progress from 'react-native-progress';
import Image from 'react-native-image-progress'
import { useTranslation } from "react-i18next";
import i18n from "../component/i18n";

function HorseDetailScreenProfile({ navigation, route, BackButton }) {
    const [images, setImageInfo] = React.useState([]);
    const [getHorseInfoByID, setHorseInfoByID] = React.useState();
    const [profileInfo, setProfileInfo] = React.useState();
    const [ReadMore, setReadMore] = React.useState(false);
    const [time, setTime] = React.useState(true);
    const [loading, setLoading] = React.useState(false);
    const { HORSE_ID } = route.params;
    const { t, i18n } = useTranslation();

    const readHorseInfoByID = async () => {
        try {
            if (Global.Token !== null) {
                fetch('https://api.pedigreeall.com/HorseInfo/GetById?p_iId=' + HORSE_ID, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + Global.Token,
                    },
                }).then((response) => response.json())
                    .then((json) => {
                        //setHorsePedigree(json)
                        if (json !== null) {
                            setHorseInfoByID(json.m_cData);
                            setTime(false);
                            if (json.m_cData[0].REF1 !== undefined) {
                                Global.TJK_ID = json.m_cData[0].REF1
                            }
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
            console.log("GetHorseInfoByID Error")
        }
    };

    const readImageInfo = async () => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                fetch('https://api.pedigreeall.com/ImageInfo/GetById?p_iHorseId=' + HORSE_ID, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
                }).then((response) => response.json())
                    .then((json) => {
                        setImageInfo(json.m_cData[0].IMAGE_LIST);
                        setProfileInfo(json.m_cData[0].INFO);
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
            console.log(e)
        }

    }
    React.useEffect(() => {
        readImageInfo();
        readHorseInfoByID();
        //readHorseInfo();
    }, [])

    const [getOpenModal, setOpenModal] = React.useState(false)
    const deviceWidth = Dimensions.get('window').width - 46.5
    const FIXED_BAR_WIDTH = 280
    const BAR_SPACE = 10

    let numItems = images.length
    let itemWidth = (FIXED_BAR_WIDTH / numItems) - ((numItems - 1) * BAR_SPACE)
    let animVal = new Animated.Value(0)
    let imageArray = []
    let barArray = []
    images.forEach((image, i) => {
        const thisImage = (

            <Image
                key={`image${i}`}
                source={{ uri: image }}
                style={{ width: deviceWidth, height: 200 }}
                indicator={Progress}
                indicatorProps={{
                    size: 30,
                    borderWidth: 0,
                    color: 'rgba(150, 150, 150, 1)',
                    unfilledColor: 'rgba(200, 200, 200, 0.2)'
                }}
                borderRadius={10}
            />
        )
        imageArray.push(thisImage)

        const scrollBarVal = animVal.interpolate({
            inputRange: [deviceWidth * (i - 1), deviceWidth * (i + 1)],
            outputRange: [-itemWidth, itemWidth],
            extrapolate: 'clamp',
        })

        const thisBar = (
            <View
                key={`bar${i}`}
                style={[
                    styles.track,
                    {
                        width: itemWidth,
                        marginLeft: i === 0 ? 0 : BAR_SPACE,
                    },
                ]}
            >
                <Animated.View

                    style={[
                        styles.bar,
                        {
                            width: itemWidth,
                            transform: [
                                { translateX: scrollBarVal },
                            ],
                        },
                    ]}
                />
            </View>
        )
        barArray.push(thisBar)
    })


    return (
        <ScrollView
            style={[styles.Container]}
            contentContainerStyle={{
                flexGrow: 1,
                paddingBottom: 23

            }}>
            <>

                
            </>
            {time ?
                <ActivityIndicator style={styles.Activity} size="large" color="rgba(52, 77, 169, 0.6)" />
                :

                <>
                    {getHorseInfoByID !== undefined &&
                        <>

                            <>

                                <View
                                    style={styles.container}
                                    flex={1}
                                >
                                    <ScrollView
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        scrollEventThrottle={10}
                                        pagingEnabled
                                        onScroll={Animated.event([
                                            {
                                                nativeEvent: {
                                                    contentOffset: {
                                                        x: animVal
                                                    }
                                                }
                                            }
                                        ], { useNativeDriver: false }
                                        )}
                                        style={{
                                            borderRadius: 10,
                                            bottom: 0,
                                        }}
                                    >
                                        {imageArray}

                                    </ScrollView>
                                    <View
                                        style={styles.barContainer}
                                    >
                                        {barArray}
                                    </View>
                                </View>

                                <View style={styles.ItemContainer}>
                                    <Text style={styles.ItemTitleText}>{t('NameTextTab')}</Text>
                                    <View style={styles.ItemFlexRowContainer}>
                                        <View style={styles.ItemFlagNameContainer}>
                                            <Flag style={{ top: '1%' }} code={getHorseInfoByID[0].ICON.toUpperCase()} size={16} />
                                            <Text style={styles.ItemNameText}>{getHorseInfoByID[0].HORSE_NAME}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.ItemContainer}>
                                    <Text style={styles.ItemTitleText}>{t('Sire2')}</Text>
                                    <View style={styles.ItemFlexRowContainer}>
                                        <View style={styles.ItemFlagNameContainer}>
                                            <Flag style={{ top: '1%' }} code={getHorseInfoByID[0].FATHER_ICON.toUpperCase()} size={16} />
                                            <Text style={styles.ItemNameText}>{getHorseInfoByID[0].FATHER_NAME}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.ItemContainer}>
                                    <Text style={styles.ItemTitleText}>{t('Dam2')}</Text>
                                    <View style={styles.ItemFlexRowContainer}>
                                        <View style={styles.ItemFlagNameContainer}>
                                            <Flag style={{ top: '1%' }} code={getHorseInfoByID[0].MOTHER_ICON.toUpperCase()} size={16} />
                                            <Text style={styles.ItemNameText}>{getHorseInfoByID[0].MOTHER_NAME}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.ItemContainer}>
                                    <Text style={styles.ItemTitleText}>{t('BMSire')}</Text>
                                    <View style={styles.ItemFlexRowContainer}>
                                        <View style={styles.ItemFlagNameContainer}>
                                            <Flag style={{ top: '1%' }} code={getHorseInfoByID[0].BM_SIRE_ICON.toUpperCase()} size={16} />
                                            <Text style={styles.ItemNameText}>{getHorseInfoByID[0].BM_SIRE_NAME}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.ItemContainer2}>
                                    <Text style={styles.ItemTitleText}>{t('Class')}</Text>
                                    <Text style={styles.ItemNameText}>{getHorseInfoByID[0].WINNER_TYPE_OBJECT.WINNER_TYPE_EN}</Text>
                                </View>
                                <View style={styles.ItemContainer2}>
                                    <Text style={styles.ItemTitleText}>{t('Sex')}</Text>
                                    <Text style={styles.ItemNameText}>{getHorseInfoByID[0].SEX_OBJECT.SEX_EN}</Text>
                                </View>
                                <View style={styles.ItemContainer2}>
                                    <Text style={styles.ItemTitleText}>{t('Earning')}</Text>
                                    <View style={styles.ItemFlagNameContainer}>
                                        <Text style={styles.ItemNameText}>{getHorseInfoByID[0].EARN} {getHorseInfoByID[0].EARN_ICON}</Text>

                                    </View>
                                </View>
                                <View style={styles.ItemContainer2}>
                                    <Text style={styles.ItemTitleText}>{t('Family2')}</Text>
                                    <Text style={styles.ItemNameText}>{getHorseInfoByID[0].FAMILY_TEXT}</Text>
                                </View>
                                <View style={styles.ItemContainer2}>
                                    <Text style={styles.ItemTitleText}>{t('Color')}</Text>
                                    <Text style={styles.ItemNameText}>{getHorseInfoByID[0].COLOR_TEXT}</Text>
                                </View>
                                <View style={styles.ItemContainer2}>
                                    <Text style={styles.ItemTitleText}>{t('BirthDate')}</Text>
                                    <Text style={styles.ItemNameText}>{getHorseInfoByID[0].HORSE_BIRTH_DATE_TEXT}</Text>
                                </View>
                                <View style={styles.ItemContainer2}>
                                    <Text style={styles.ItemTitleText}>{t('Starts')}</Text>
                                    <Text style={styles.ItemNameText}>{getHorseInfoByID[0].START_COUNT}</Text>
                                </View>
                                <View style={styles.ItemContainer2}>
                                    <Text style={styles.ItemTitleText}>{t('1st2')}</Text>
                                    <Text style={styles.ItemNameText}>{getHorseInfoByID[0].FIRST}</Text>
                                </View>
                                <View style={styles.ItemContainer2}>
                                    <Text style={styles.ItemTitleText}>{t('1st%2')}</Text>
                                    <Text style={styles.ItemNameText}>{getHorseInfoByID[0].FIRST_PERCENTAGE}</Text>
                                </View>
                                <View style={styles.ItemContainer2}>
                                    <Text style={styles.ItemTitleText}>{t('2nd2')}</Text>
                                    <Text style={styles.ItemNameText}>{getHorseInfoByID[0].SECOND}</Text>
                                </View>
                                <View style={styles.ItemContainer2}>
                                    <Text style={styles.ItemTitleText}>{t('2nd%2')}</Text>
                                    <Text style={styles.ItemNameText}>{getHorseInfoByID[0].SECOND_PERCENTAGE}</Text>
                                </View>
                                <View style={styles.ItemContainer2}>
                                    <Text style={styles.ItemTitleText}>{t('3rd2')}</Text>
                                    <Text style={styles.ItemNameText}>{getHorseInfoByID[0].THIRD}</Text>
                                </View>
                                <View style={styles.ItemContainer2}>
                                    <Text style={styles.ItemTitleText}>{t('3rd%2')}</Text>
                                    <Text style={styles.ItemNameText}>{getHorseInfoByID[0].THIRD_PERCENTAGE}</Text>
                                </View>
                                <View style={styles.ItemContainer2}>
                                    <Text style={styles.ItemTitleText}>{t('4th2')}</Text>
                                    <Text style={styles.ItemNameText}>{getHorseInfoByID[0].FOURTH}</Text>
                                </View>
                                <View style={styles.ItemContainer2}>
                                    <Text style={styles.ItemTitleText}>{t('4th%2')}</Text>
                                    <Text style={styles.ItemNameText}>{getHorseInfoByID[0].FOURTH_PERCENTAGE}</Text>
                                </View>
                                <View style={styles.ItemContainer2}>
                                    <Text style={styles.ItemTitleText}>{t('Price2')}</Text>
                                    <View style={styles.ItemFlagNameContainer}>
                                        <Text style={styles.ItemNameText}>{getHorseInfoByID[0].PRICE} {getHorseInfoByID[0].EARN_ICON}</Text>
                                    </View>
                                </View>
                                <View style={styles.ItemContainer2}>
                                    <Text style={styles.ItemTitleText}>Dr Roman Miller:</Text>
                                    <Text style={styles.ItemNameText}>{getHorseInfoByID[0].RM}</Text>
                                </View>
                                <View style={styles.ItemContainer2}>
                                    <Text style={styles.ItemTitleText}>ANZ:</Text>
                                    <Text style={styles.ItemNameText}>{getHorseInfoByID[0].ANZ}</Text>
                                </View>
                                <View style={styles.ItemContainer2}>
                                    <Text style={styles.ItemTitleText}>PedigreeAll.com:</Text>
                                    <Text style={styles.ItemNameText}>{getHorseInfoByID[0].PA}</Text>
                                </View>
                                <View style={styles.ItemContainer2}>
                                    <Text style={styles.ItemTitleText}>{t('OwnerText2')}</Text>
                                    <Text style={styles.ItemNameText}>{getHorseInfoByID[0].OWNER}</Text>
                                </View>
                                <View style={styles.ItemContainer2}>
                                    <Text style={styles.ItemTitleText}>{t('CoachText2')}</Text>
                                    <Text style={styles.ItemNameText}>{getHorseInfoByID[0].BREEDER}</Text>
                                </View>
                                <View style={styles.ItemContainer2}>
                                    <Text style={styles.ItemTitleText}>{t('BreederText2')}</Text>
                                    <Text style={styles.ItemNameText}>{getHorseInfoByID[0].COACH}</Text>
                                </View>
                                <View style={styles.ItemContainer2}>
                                    <Text style={styles.ItemTitleText}>{t('DeadText')}</Text>
                                    {getHorseInfoByID.IS_DEAD ?
                                        <Text style={styles.ItemNameText}>{t('DEAD')}</Text>
                                        :
                                        <Text style={styles.ItemNameText}>{t('ALIVE')}</Text>
                                    }

                                </View>
                                <View style={styles.ItemContainer2}>
                                    <Text style={styles.ItemTitleText}>{t('Point2')}</Text>
                                    <Text style={styles.ItemNameText}>{getHorseInfoByID[0].POINT}</Text>
                                </View>
                                <View style={styles.ItemContainer2}>
                                    <Text style={styles.ItemTitleText}>{t('UpdateDate2')}</Text>
                                    <Text style={styles.ItemNameText}>{getHorseInfoByID[0].EDIT_DATE_TEXT}</Text>
                                </View>


                            </>



                        </>

                    }
                </>

            }

        </ScrollView>

    )
}
export default HorseDetailScreenProfile;

const styles = StyleSheet.create({
    Container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff'
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
    container: {
        padding: 15,
    },
    scrollContainer: {
        height: 300,
        alignItems: "center",
        justifyContent: "center"
    },
    scrollViewStyle: {
        paddingBottom: 40
    },
    ItemRankingContainer: {
        flexDirection: 'row',
    },
    card: {
        flex: 1,
        marginVertical: 0,
        marginHorizontal: 25,
        borderRadius: 5,
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "center"
    },
    normalDot: {
        height: 6,
        width: 2,
        borderRadius: 4,
        backgroundColor: "#2e3f6e",
        marginHorizontal: 4
    },
    barContainer: {
        position: 'absolute',
        zIndex: 2,
        top: '120%',
        alignSelf: 'center',
        flexDirection: 'row',
    },
    track: {
        backgroundColor: '#ccc',
        overflow: 'hidden',
        height: 2,
    },
    bar: {
        backgroundColor: 'rgba(52, 77, 169, 0.6)',
        height: 2,
        left: 0,
        top: 0,
    },
    indicatorContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    ItemContainer: {
        padding: 5,
        marginTop: 5,
        top: 25,
        borderBottomWidth: 0.4,
        borderColor: 'silver',
        width: '93%',
        left: '3%',
    },
    ItemContainer2: {
        paddingBottom: 13,
        marginTop: 13,
        top: 25,
        borderBottomWidth: 0.4,
        borderColor: 'silver',
        width: '93%',
        left: '1%',
        flexDirection: 'row'
    },
    ItemContainerForRanking: {
        paddingBottom: 13,
        paddingTop: 13,
        borderBottomWidth: 0.4,
        borderColor: 'silver',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 10,
        top: 25,
        borderBottomWidth: 0.4,
        borderColor: 'silver',
        width: '93%',
        left: '1%',

    },
    ItemFlexRowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'center',
        width: '100%'
    },
    ItemFlagNameContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '100%',
    },
    ItemNameText: {
        marginLeft: 10,
        fontSize: 14
    },
    ItemIconContainer: {
        flexDirection: 'row',
        width: '20%',
    },
    ItemTitleText: {
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    ItemTitleText2: {
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 20,
    },
    ReadMoreButtonContainer: {
        padding: 10,
        backgroundColor: '#2169ab',
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 8,
        elevation: 8,
        marginLeft: 10,
        width: 100
    },
    ReadMoreText: {
        fontWeight: 'bold',
        color: '#fff'
    },
    BackButton: {
        flexDirection: 'row',
        alignSelf: 'baseline',
        padding: 10,
        width: '100%',
        borderBottomWidth: 0.5,
        borderColor: 'silver',
        marginBottom: 10
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    ModalItemContainer: {
        width: '100%',
        height: '95%',

    },
    ModalContainer: {
        width: '95%',
        height: '95%',
        backgroundColor: '#fff',
        alignItems: 'center',
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
        alignItems: 'center',
        shadowColor: "#000",
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 0,
        backgroundColor: '#6c6c6ca8'
    },
})