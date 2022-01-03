import React, { useState, useRef } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Alert, Platform, Dimensions } from 'react-native'
import { Global } from './Global'
import { DataTable } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from "react-native-vector-icons/FontAwesome5";
import Flag from "react-native-flags";
import * as Animatable from 'react-native-animatable';
import { Ionicons } from '@expo/vector-icons';
import Feather from 'react-native-vector-icons/Feather';
import { useTranslation } from "react-i18next";
import i18n from "../component/i18n";
import MyHeader from '../component/MyHeader';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import RBSheet from "react-native-raw-bottom-sheet";
import { Translate } from '../component/Helper';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

function TJKRaceProgram({ navigation, route }) {
    const [time, setTime] = React.useState(true);
    const [getTJKReport, setTJKReport] = React.useState();
    const { t, i18n } = useTranslation();
    const bottomSheet = useRef();

    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);

    const onChange = (event, currentDate) => {
        setShow(Platform.OS === 'ios');
        setDate(new Date(currentDate))
        readTJKReport(moment(currentDate).format("DD.MM.YYYY"))
    };

    const readTJKReport = async (date) => {
        setTime(true)
        try {
            if (Global.Token !== null) {
                fetch('https://api.pedigreeall.com/Tjk/GetRaceProgram?p_sDate=' + date, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + Global.Token,
                    },
                }).then((response) => response.json())
                    .then((json) => {
                        if (json !== null) {
                            setTJKReport(json)
                            setTime(false)
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
            console.log("setTJKReport Error")
        }
    };
    React.useEffect(() => {
        let toDay = moment(new Date()).format("DD.MM.YYYY");
        readTJKReport(toDay);

    }, [])

    return (
        <View
            style={styles.Container}
            showsVerticalScrollIndicator={true}>
            <MyHeader Title={t('TJK Race Program')}
                onPress={() => navigation.goBack()}
            >
                {time ?
                    <ActivityIndicator style={styles.Activity} size="large" color="rgba(52, 77, 169, 0.6)" />
                    :
                    <>
                        <ScrollView vertical={true}>
                            <View style={styles.action}>
                                <TouchableOpacity onPress={() => {

                                    if (Platform.OS === "ios") {
                                        setShow(true)
                                        bottomSheet.current.open()
                                    } else {
                                        setShow(true)
                                    }
                                }}
                                    style={styles.InputTouchableContainer}>
                                    <Ionicons style={{ left: '25%' }} name="calendar-outline" size={22} color="#fff" />
                                    <Text style={[styles.InformationText, { left: 5 }]}>
                                        {moment(date).format("DD.MM.YYYY")}
                                    </Text>
                                    <View >
                                        {Platform.OS === "android" && show && (
                                            < DateTimePicker style={{ width: 200, }}
                                                name={"StartRequestDate"}
                                                value={date}
                                                mode='date'
                                                onChange={onChange}
                                            />
                                        )}
                                        <RBSheet hasDraggableIcon ref={bottomSheet}
                                            height={Dimensions.get('window').height / 3}
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
                                            {show && (
                                                <DateTimePicker style={{ width: Dimensions.get('window').width }}
                                                    locale={(Global.Language === 1 ? "tr_TR" : "en_GB")}
                                                    name={"StartRequestDate"}
                                                    value={date}
                                                    mode='date'
                                                    is24Hour={true}
                                                    onChange={onChange}
                                                    display="spinner"
                                                />
                                            )}
                                        </RBSheet>
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <ScrollView
                                style={{ marginTop: 15 }}
                                horizontal>
                                <DataTable>
                                    <DataTable.Header>
                                        <DataTable.Title style={{ width: 70 }}>N</DataTable.Title>
                                        <DataTable.Title style={{ width: 200, right: '0.45%' }}>{t('HorseName')}</DataTable.Title>
                                        <DataTable.Title style={styles.DataTableCell}>Y</DataTable.Title>
                                        <DataTable.Title style={{ width: 220, }}>{t('Sire - Mare')}</DataTable.Title>
                                        <DataTable.Title style={styles.DataTableCell}>Kg.</DataTable.Title>
                                        <DataTable.Title style={styles.DataTableCell}>Jockey</DataTable.Title>
                                        <DataTable.Title style={{ width: 220, }}>{t('CoachText')}</DataTable.Title>
                                        <DataTable.Title style={{ width: 220, }}>{t('OwnerText')}</DataTable.Title>
                                        <DataTable.Title style={styles.DataTableCell}>St</DataTable.Title>
                                        <DataTable.Title style={styles.DataTableCell}>HP</DataTable.Title>
                                        <DataTable.Title style={styles.DataTableCell}>S6Y</DataTable.Title>
                                        <DataTable.Title style={styles.DataTableCell}>Kgs</DataTable.Title>
                                        <DataTable.Title style={styles.DataTableCell}>Gny</DataTable.Title>
                                        <DataTable.Title style={styles.DataTableCell}>Agf</DataTable.Title>
                                        <DataTable.Title style={styles.DataTableCell}>{t('Class2')}</DataTable.Title>
                                        <DataTable.Title style={styles.DataTableCell}>{t('Point')}</DataTable.Title>
                                        <DataTable.Title style={styles.DataTableCell}>{t('EarningText')}</DataTable.Title>
                                        <DataTable.Title style={styles.DataTableCell}>{t('Fam')}</DataTable.Title>
                                        <DataTable.Title style={styles.DataTableCell}>{t('ColorText')}</DataTable.Title>
                                        <DataTable.Title style={{ width: 300, }}>{t('Sire')}</DataTable.Title>
                                        <DataTable.Title style={{ width: 300, }}>{t('Dam')}</DataTable.Title>
                                        <DataTable.Title style={{ width: 300, }}>{t('BroodmareSire')}</DataTable.Title>
                                        <DataTable.Title style={styles.DataTableCell}>{t('BirthD.')}</DataTable.Title>
                                        <DataTable.Title style={styles.DataTableCell}>{t('Race')}</DataTable.Title>
                                        <DataTable.Title style={styles.DataTableCell}>{t('1st')}</DataTable.Title>
                                        <DataTable.Title style={styles.DataTableCell}>{t('1st%')}</DataTable.Title>
                                        <DataTable.Title style={styles.DataTableCell}>{t('2nd')}</DataTable.Title>
                                        <DataTable.Title style={styles.DataTableCell}>{t('2nd%')}</DataTable.Title>
                                        <DataTable.Title style={styles.DataTableCell}>{t('3rd')}</DataTable.Title>
                                        <DataTable.Title style={styles.DataTableCell}>{t('3rd%')}</DataTable.Title>
                                        <DataTable.Title style={styles.DataTableCell}>{t('4th')}</DataTable.Title>
                                        <DataTable.Title style={styles.DataTableCell}>{t('4th%')}</DataTable.Title>
                                    </DataTable.Header>
                                    {getTJKReport[0].SUB_TAB[0].PROGRAM_LIST.map((item, index) => (

                                        <DataTable.Row centered={true} key={index}>
                                            <DataTable.Cell style={{ width: 50 }}>{item.SORT}</DataTable.Cell>
                                            <DataTable.Cell style={{ width: 220 }}>{item.HORSE_INFO.HORSE_NAME}</DataTable.Cell>
                                            <DataTable.Cell style={styles.DataTableCell}>{item.AGE}</DataTable.Cell>
                                            <DataTable.Cell style={{ width: 220 }}>{item.FATHER_MOTHER}</DataTable.Cell>
                                            <DataTable.Cell style={styles.DataTableCell}>{item.WEIGHT}</DataTable.Cell>
                                            <DataTable.Cell style={styles.DataTableCell}>{item.JOCKEY}</DataTable.Cell>
                                            <DataTable.Cell style={{ width: 220, }}>{item.COACH}</DataTable.Cell>
                                            <DataTable.Cell style={{ width: 220, }}>{item.OWNER}</DataTable.Cell>
                                            <DataTable.Cell style={styles.DataTableCell}>{item.START}</DataTable.Cell>
                                            <DataTable.Cell style={styles.DataTableCell}>{item.HANDICAP}</DataTable.Cell>
                                            <DataTable.Cell style={styles.DataTableCell}>{item.LAST_6_RACE}</DataTable.Cell>
                                            <DataTable.Cell style={styles.DataTableCell}>{item.KGS}</DataTable.Cell>
                                            <DataTable.Cell style={styles.DataTableCell}>{item.GNY}</DataTable.Cell>
                                            <DataTable.Cell style={styles.DataTableCell}>{item.AGF}</DataTable.Cell>
                                            <DataTable.Cell style={styles.DataTableCell}>{Translate(item.HORSE_INFO.WINNER_TYPE_OBJECT.WINNER_TYPE_TR, item.HORSE_INFO.WINNER_TYPE_OBJECT.WINNER_TYPE_EN)}</DataTable.Cell>
                                            <DataTable.Cell style={styles.DataTableCell}>{item.HORSE_INFO.POINT}</DataTable.Cell>
                                            <DataTable.Cell style={styles.DataTableCell}>{item.HORSE_INFO.EARN}</DataTable.Cell>
                                            <DataTable.Cell style={styles.DataTableCell}>{item.HORSE_INFO.FAMILY_TEXT}</DataTable.Cell>
                                            <DataTable.Cell style={styles.DataTableCell}>{item.HORSE_INFO.COLOR_TEXT}</DataTable.Cell>
                                            <DataTable.Cell style={{ width: 300 }}>{item.HORSE_INFO.FATHER_NAME}</DataTable.Cell>
                                            <DataTable.Cell style={{ width: 300 }}>{item.HORSE_INFO.MOTHER_NAME}</DataTable.Cell>
                                            <DataTable.Cell style={{ width: 300 }}>{item.HORSE_INFO.BM_SIRE_NAME}</DataTable.Cell>
                                            <DataTable.Cell style={styles.DataTableCell}>{item.HORSE_INFO.HORSE_BIRTH_DATE_TEXT}</DataTable.Cell>
                                            <DataTable.Cell style={styles.DataTableCell}>{item.HORSE_INFO.START_COUNT}</DataTable.Cell>
                                            <DataTable.Cell style={styles.DataTableCell}>{item.HORSE_INFO.FIRST}</DataTable.Cell>
                                            <DataTable.Cell style={styles.DataTableCell}>{item.HORSE_INFO.FIRST_PERCENTAGE}</DataTable.Cell>
                                            <DataTable.Cell style={styles.DataTableCell}>{item.HORSE_INFO.SECOND}</DataTable.Cell>
                                            <DataTable.Cell style={styles.DataTableCell}>{item.HORSE_INFO.SECOND_PERCENTAGE}</DataTable.Cell>
                                            <DataTable.Cell style={styles.DataTableCell}>{item.HORSE_INFO.THIRD}</DataTable.Cell>
                                            <DataTable.Cell style={styles.DataTableCell}>{item.HORSE_INFO.THIRD_PERCENTAGE}</DataTable.Cell>
                                            <DataTable.Cell style={styles.DataTableCell}>{item.HORSE_INFO.FOURTH}</DataTable.Cell>
                                            <DataTable.Cell style={styles.DataTableCell}>{item.HORSE_INFO.FOURTH_PERCENTAGE}</DataTable.Cell>
                                        </DataTable.Row>
                                    ))}
                                </DataTable>
                            </ScrollView>
                        </ScrollView>
                    </>
                }
            </MyHeader>
        </View>
    )
}
export default TJKRaceProgram;

const styles = StyleSheet.create({
    Container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff'
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
    DataTableTitle: {
        width: 100
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
    DataTableCell: {
        width: 100,
    },
    TableCellStyle: {
        width: 90,
    },
    TableCellStyle1: {
        width: 50,
    },
    FullScreenContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        shadowColor: "#000",
    },
    HorseImage: {
        width: '90%',
        height: '80%',
        resizeMode: 'contain',
        marginBottom: 20
    },
    InformationText: {
        fontSize: 15,
        marginLeft: 20,
        marginRight: 'auto',
        color: '#fff'
    },
    InputTouchableContainer: {
        width: '95%',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignSelf: 'center'
    },
    action: {
        flexDirection: 'row',
        marginVertical: 15,
        borderRadius: 10,
        backgroundColor: '#2e3f6e',
        width: 160,
        height: 40,
        left: '3%',
    },
})