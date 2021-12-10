import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Image, useWindowDimensions, Dimensions, Platform, RefreshControl } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import Myloader from '../constants/Myloader';
import { useNavigation } from '@react-navigation/native';
import { Trans, useTranslation } from "react-i18next";
import i18n from "../component/i18n";
import { Translate } from './Helper';

function HomeComponent({ props }) {

    const { t, i18n } = useTranslation();
    const navigation = useNavigation();

    const [Data, SetData] = useState([]);
    const [LatestAddedData, setLatestAddedData] = useState([]);
    const [HorsesForSale, setHorsesForSale] = useState([]);
    const itemWidth = 360;
    const separatorWidth = 32;
    const totalItemWidth = itemWidth + separatorWidth;

    const itemWidth2 = 250;
    const separatorWidth2 = 30;
    const totalItemWidth2 = itemWidth2 + separatorWidth2;
    const [loader, setLoader] = React.useState(false)
    const [getHorseId, setHorseId] = useState(0)
    const [chekedItem, setChekedItem] = React.useState(5)

    const myFunctionRegistered = async () => {
        let isActive = true;
        const abortCtrl = new AbortController();
        const opts = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Basic " + "Z2ZydWx1dGFzQGhvdG1haWwuY29tOjE=",
            },

        };
        fetch('https://api.pedigreeall.com/StallionPage/GetRegisteredStallions?p_iRaceId=1&p_iTopCount=7', opts)
            .then((response) => response.json())
            .then((json) => {
                var aa = [];
                json.m_cData.map((i, index) => (
                    aa.push({
                        HORSE_DATA: i,
                        HORSE_ID: i.HORSE_ID,
                        HORSE_NAME: i.HORSE_NAME,
                        IMAGE: i.IMAGE,
                        PLACE: i.PLACE,
                        FEE_TEXT: i.FEE_TEXT,
                        NAME: i.NAME,
                        CELL_PHONE: i.CELL_PHONE,
                    })
                ))
                if (isActive) {
                    SetData(aa)
                    //console.log(aa)
                }
            })
            .catch((error) => {
                console.error(error);
            })
        return () => { abortCtrl.abort(), isActive = false };
    };

    const myFunctionLastAdded = async () => {
        let isActive = true;
        const abortCtrl = new AbortController();
        const opts = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Basic " + "Z2ZydWx1dGFzQGhvdG1haWwuY29tOjE=",
            },

        };
        fetch('https://api.pedigreeall.com/HorseInfo/GetLatest?p_iRaceId=1', opts)
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
                        BM_SIRE_NAME: i.BM_SIRE_NAME,
                        EARN_ICON: i.EARN_ICON,
                        EARN: i.EARN,
                        SEX_OBJECT: i.SEX_OBJECT,
                        POINT: i.POINT,
                        WINNER_TYPE_OBJECT: i.WINNER_TYPE_OBJECT,
                        IMAGE: i.IMAGE,
                    })
                ))
                if (isActive) {
                    setLatestAddedData(aa)

                }
            })
            .catch((error) => {
                console.error(error);
            })
        return () => { abortCtrl.abort(), isActive = false };
    };

    const myFunctionHorsesForSale = async () => {
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
                ADS_ID: -1,
                ADS_SORT_TYPE_ID: "1",
                BM_SIRE_ID: "",
                CATEGORY_ID: "",
                MARE_ID: "",
                OPEN_OFFER: "",
                PAGE_COUNT: 10,
                PAGE_NO: 1,
                RACE_GENDER_ID: "",
                RACE_ID: "",
                SHOW_CASE: 1,
                SIRE_ID: "",
                TOP_ROW: -1,
            })
        };
        fetch('https://api.pedigreeall.com/Ads/GetFilter', opts)
            .then((response) => response.json())
            .then((json) => {
                var aa = [];
                json.m_cData.map((i, index) => (
                    aa.push({
                        HORSE_DATA: i,
                        HORSE_ID: i.HORSE_ID,
                        ADS_ID: i.ADS_ID,
                        HEADER: i.HEADER,
                        ADS_CATEGORY: i.ADS_CATEGORY,
                        IMAGE_LIST: i.IMAGE_LIST,
                        LAST_TIME_TEXT: i.LAST_TIME_TEXT,
                        SEX: i.SEX,
                        RACE: i.RACE,
                        PRICE: i.PRICE,
                        CURRENCY: i.CURRENCY,
                        HORSE_MOTHER_NAME: i.HORSE_MOTHER_NAME,

                    }
                    )))
                if (isActive) {
                    setHorsesForSale(aa)

                }
            })
            .catch((error) => {
                console.error(error);
            })
        return () => { abortCtrl.abort(), isActive = false };
    };
    let maxlimit = 27;
    let addresslimit = 27;

    useEffect(() => {
        const abortCtrl = new AbortController();
        SetData([])
        myFunctionRegistered();
        myFunctionLastAdded();
        myFunctionHorsesForSale();
        return () => abortCtrl.abort()
    }, []);
    return (
        <ScrollView
            style={styles.container}>
            <Myloader Show={loader} />
            <View style={{ top: 20 }}>
                <Text style={[styles.heightText]}>{t('RegisteredStallions')}</Text>
                <FlatList horizontal={true}
                    pagingEnabled
                    horizontal
                    getItemLayout={(data, index) => ({
                        length: totalItemWidth,
                        offset: totalItemWidth * index,
                        index,
                    })}
                    snapToInterval={totalItemWidth}
                    decelerationRate="fast"
                    bounces={false}
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

                <Text style={styles.heightText}>{t('LastAdded')}</Text>
                <FlatList horizontal={true}
                    pagingEnabled
                    horizontal
                    getItemLayout={(data, index) => ({
                        length: totalItemWidth,
                        offset: totalItemWidth * index,
                        index,
                    })}
                    snapToInterval={totalItemWidth}
                    decelerationRate="fast"
                    bounces={false}
                    style={styles.flatList}
                    data={LatestAddedData}
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
                            <Image style={styles.image2}
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
                                    <Text style={styles.textStyle2}>{t('Sire2')}</Text>
                                    <Text style={styles.textStyle}>
                                        {item.FATHER_NAME}
                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                    <Text style={styles.textStyle2}>{t('Dam2')}</Text>
                                    <Text style={styles.textStyle}>
                                        {item.MOTHER_NAME}
                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                    <Text style={styles.textStyle2}>{t('BMSire')}</Text>
                                    <Text style={styles.textStyle}>
                                    {((item.BM_SIRE_NAME).length > maxlimit) ?
                                        (((item.BM_SIRE_NAME).substring(0, maxlimit - 3)) + '...') :
                                        item.BM_SIRE_NAME}
                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 5 }}>

                                    <Text style={[styles.textStyle2]}>{t('Gender')}</Text>
                                    <Text style={styles.textStyle}>
                                        {Translate(item.SEX_OBJECT.SEX_TR, item.SEX_OBJECT.SEX_EN)}
                                    </Text>

                                    <Text style={[styles.textStyle2, { paddingLeft: 20 }]}>{t('Class')}</Text>
                                    <Text style={styles.textStyle}>
                                        {Translate(item.WINNER_TYPE_OBJECT.WINNER_TYPE_TR, item.WINNER_TYPE_OBJECT.WINNER_TYPE_EN)}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>)}
                    keyExtractor={item => item.HORSE_ID.toString()}
                />

                <Text style={styles.heightText}>{t('HorsesForSale')}</Text>
                <FlatList horizontal={true}
                    pagingEnabled
                    horizontal
                    getItemLayout={(data, index) => ({
                        length: totalItemWidth,
                        offset: totalItemWidth * index,
                        index,
                    })}
                    snapToInterval={totalItemWidth}
                    decelerationRate="fast"
                    bounces={false}
                    style={[styles.flatList, { marginBottom: 25 }]}
                    data={HorsesForSale}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.item}
                            onPress={() => {
                                alert('Under Construction')
                            }}
                        >
                            <Image style={styles.image}
                                source={{ uri: item.IMAGE_LIST[0] }}
                                resizeMode="cover"
                            />
                            <View>
                                <Text numberOfLines={1} style={styles.HorseName}>
                                    {((item.HEADER).length > maxlimit) ?
                                        (((item.HEADER).substring(0, maxlimit - 3)) + '...') :
                                        item.HEADER}
                                </Text>
                                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                    <Ionicons name='female-outline' size={12} />

                                    <Text style={styles.textStyle}>
                                    {((item.HORSE_MOTHER_NAME).length > maxlimit) ?
                                        (((item.HORSE_MOTHER_NAME).substring(0, maxlimit - 3)) + '...') :
                                        item.HORSE_MOTHER_NAME}
                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                    <Ionicons name='copy-outline' size={12} />
                                    <Text style={styles.textStyle}>
                                        {Translate(item.ADS_CATEGORY.ADS_CATEGORY_TR, item.ADS_CATEGORY.ADS_CATEGORY_EN)} /{Translate(item.RACE.RACE_TR, item.RACE.RACE_EN)}

                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                    <Ionicons name='cash-outline' size={12} />
                                    <Text style={styles.textStyle}>
                                        {item.PRICE} {item.CURRENCY.ICON}

                                    </Text>
                                </View>
                            </View>

                        </TouchableOpacity>)}
                    keyExtractor={item => item.HORSE_ID.toString()}
                />


            </View>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
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
        alignItems: 'center'
    },
    image2: {
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
        borderTopWidth: 1,
        borderTopColor: '#d6d3d3',
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

});

export default HomeComponent;

