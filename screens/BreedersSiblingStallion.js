import React, { useState } from 'react'
import { View, StyleSheet, ScrollView, ActivityIndicator, Platform, Text, Alert } from 'react-native'
import { Global } from './Global'
import { DataTable } from 'react-native-paper';
import Icon from "react-native-vector-icons/FontAwesome5";
import Flag from "react-native-flags";
import { useTranslation } from "react-i18next";
import i18n from "../component/i18n";
import MyHeader from '../component/MyHeader';

function BreedersSiblingSire({ BackButton, navigation, route }) {
    const [time, setTime] = React.useState(true);
    const [getSiblingSire, setSiblingSire] = React.useState();
    const { HORSE_ID } = route.params;
    const { HORSE_NAME } = route.params;
    const { t, i18n } = useTranslation();

    const readSiblingSire = async () => {
        try {
            if (Global.Token !== null) {
                fetch('https://api.pedigreeall.com/HorseInfo/GetSiblingsFromFatherByHorseId?p_iHorseId=' + HORSE_ID, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + Global.Token,
                    },
                }).then((response) => response.json())
                    .then((json) => {
                        if (json !== null) {
                            setSiblingSire(json.m_cData);
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
            console.log("GetSiblingSire Error")
        }
    };


    React.useEffect(() => {
        readSiblingSire();
    }, [])

    const alertDialog = (messageTitle, message) =>
        Alert.alert(
            messageTitle,
            message,
            [
                {
                    text: t('OK'),
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
            ],
            { cancelable: false }
        );

    return (
        <View style={styles.Container} showsVerticalScrollIndicator={true}>
            <MyHeader Title={HORSE_NAME}
                onPress={() => navigation.navigate('StallionFatherSiblings')}
            >
                {time ?
                    <>
                        <ActivityIndicator style={styles.Activity} size="large" color="rgba(52, 77, 169, 0.6)" />
                        <Text style={{ top: '42%', textAlign: 'center', color: 'rgba(52, 77, 169, 0.6)', fontSize: 16, margin: 20, fontWeight: '500' }}>{t('Please wait, It may take some time..')}</Text>
                    </>
                    :
                    <>
                        <ScrollView vertical={true}>
                            {getSiblingSire !== undefined &&

                                <ScrollView horizontal={true}>


                                    <DataTable>

                                        <DataTable.Header removeClippedSubviews={true}>
                                            <DataTable.Title style={{ width: 340 }}>{t('Name')}</DataTable.Title>
                                            <DataTable.Title style={[styles.DataTableTitle]}>{t('Class2')}</DataTable.Title>
                                            <DataTable.Title style={[styles.DataTableTitle]}>{t('Point')}</DataTable.Title>
                                            <DataTable.Title style={[styles.DataTableTitle, { left: '0.4%' }]}>{t('EarningText')}</DataTable.Title>
                                            <DataTable.Title style={[styles.DataTableTitle, { left: '0.4%' }]}>{t('Fam')}</DataTable.Title>
                                            <DataTable.Title style={[styles.DataTableTitle, { left: '0.4%' }]}>{t('ColorText')}</DataTable.Title>
                                            <DataTable.Title style={{ width: 400, left: '0.4%' }}>{t('Sire')}</DataTable.Title>
                                            <DataTable.Title style={{ width: 410, left: '0.8%' }}>{t('BroodmareSire')}</DataTable.Title>
                                            <DataTable.Title style={[styles.DataTableTitle, { left: '0.9%' }]}>{t('BirthD.')}</DataTable.Title>
                                            <DataTable.Title style={[styles.DataTableTitle]}>{t('StartText')}</DataTable.Title>
                                            <DataTable.Title style={[styles.DataTableTitle]}>{t('1st')}</DataTable.Title>
                                            <DataTable.Title style={[styles.DataTableTitle]}>{t('1st%')}</DataTable.Title>
                                            <DataTable.Title style={[styles.DataTableTitle]}>{t('2nd')}</DataTable.Title>
                                            <DataTable.Title style={[styles.DataTableTitle]}>{t('2nd%')}</DataTable.Title>
                                            <DataTable.Title style={[styles.DataTableTitle]}>{t('3rd')}</DataTable.Title>
                                            <DataTable.Title style={[styles.DataTableTitle]}>{t('3rd%')}</DataTable.Title>
                                            <DataTable.Title style={[styles.DataTableTitle]}>{t('4th')}</DataTable.Title>
                                            <DataTable.Title style={[styles.DataTableTitle]}>{t('4th%')}</DataTable.Title>
                                            <DataTable.Title style={[styles.DataTableTitle, { left: '0.2%' }]}>{t('PriceText')}</DataTable.Title>
                                            <DataTable.Title style={[styles.DataTableTitle, { left: '0.3%' }]}>{t('DR.RM')}</DataTable.Title>
                                            <DataTable.Title style={[styles.DataTableTitle, { left: '0.3%' }]}>{t('ANZ')}</DataTable.Title>
                                            <DataTable.Title style={[styles.DataTableTitle, { left: '0.3%' }]}>{t('PedigreeAll')}</DataTable.Title>
                                            <DataTable.Title style={{ width: 150, left: '0.4%' }}>{t('OwnerText')}</DataTable.Title>
                                            <DataTable.Title style={{ width: 150, left: '0.4%' }}>{t('BreederText')}</DataTable.Title>
                                            <DataTable.Title style={{ width: 150, left: '0.4%' }}>{t('CoachText')}</DataTable.Title>
                                            <DataTable.Title style={[styles.DataTableTitle, { right: '0.8%' }]}>{t('Dead')}</DataTable.Title>
                                            <DataTable.Title style={[styles.DataTableTitle, { right: '0.8%' }]}>{t('UpdateD.')}</DataTable.Title>
                                        </DataTable.Header>


                                        {getSiblingSire.map((item, index) => (

                                            <DataTable.Row centered={true} key={index}>
                                                <DataTable.Cell style={{ top: Platform.OS == 'ios' ? '8%' : '0%', bottom: Platform.OS == 'ios' ? '0%' : '4%' }}>
                                                    <Flag code={item.ICON.toUpperCase()} size={16} />
                                                </DataTable.Cell>
                                                <DataTable.Cell
                                                    onPress={() => { alertDialog(t('Name'), item.HORSE_NAME) }}
                                                    style={{ width: 350, left: '0.4%' }}>
                                                    {item.HORSE_NAME}
                                                </DataTable.Cell>
                                                <DataTable.Cell style={styles.DataTableCell}>{item.WINNER_TYPE_OBJECT.WINNER_TYPE_TR}</DataTable.Cell>


                                                <DataTable.Cell style={styles.DataTableCell}>{item.POINT}</DataTable.Cell>
                                                <DataTable.Cell style={styles.DataTableCell} >{item.EARN} {item.EARN_ICON}</DataTable.Cell>
                                                <DataTable.Cell style={styles.DataTableCell}>{item.FAMILY_TEXT}</DataTable.Cell>
                                                <DataTable.Cell style={styles.DataTableCell}>{item.COLOR_TEXT}</DataTable.Cell>
                                                <DataTable.Cell style={{ top: Platform.OS == 'ios' ? '8%' : '0%', bottom: Platform.OS == 'ios' ? '0%' : '4%' }}>
                                                    <Flag code={item.MOTHER_ICON.toUpperCase()} size={16} />
                                                </DataTable.Cell>
                                                <DataTable.Cell
                                                    onPress={() => { alertDialog(t('Dam'), item.MOTHER_NAME) }}
                                                    style={{ width: 400, left: '0.4%' }}>
                                                    {item.MOTHER_NAME}
                                                </DataTable.Cell>
                                                <DataTable.Cell style={{ top: Platform.OS == 'ios' ? '8%' : '0%', bottom: Platform.OS == 'ios' ? '0%' : '4%' }}>
                                                    <Flag code={item.BM_SIRE_ICON.toUpperCase()} size={16} />
                                                </DataTable.Cell>
                                                <DataTable.Cell
                                                    onPress={() => { alertDialog(t('BroodmareSire'), item.BM_SIRE_NAME) }}
                                                    style={{ width: 400, left: '0.4%' }}>
                                                    {item.BM_SIRE_NAME}
                                                </DataTable.Cell>
                                                <DataTable.Cell style={styles.DataTableCell}>{item.HORSE_BIRTH_DATE_TEXT}</DataTable.Cell>
                                                <DataTable.Cell style={styles.DataTableCell} >{item.START_COUNT}</DataTable.Cell>
                                                <DataTable.Cell style={styles.DataTableCell} >{item.FIRST}</DataTable.Cell>
                                                <DataTable.Cell style={styles.DataTableCell} >{item.FIRST_PERCENTAGE} %</DataTable.Cell>
                                                <DataTable.Cell style={styles.DataTableCell} >{item.SECOND}</DataTable.Cell>
                                                <DataTable.Cell style={styles.DataTableCell}>{item.SECOND_PERCENTAGE} %</DataTable.Cell>
                                                <DataTable.Cell style={styles.DataTableCell} >{item.THIRD}</DataTable.Cell>
                                                <DataTable.Cell style={styles.DataTableCell} >{item.THIRD_PERCENTAGE} %</DataTable.Cell>
                                                <DataTable.Cell style={styles.DataTableCell}>{item.FOURTH}</DataTable.Cell>
                                                <DataTable.Cell style={styles.DataTableCell}>{item.FOURTH_PERCENTAGE} %</DataTable.Cell>
                                                <DataTable.Cell style={styles.DataTableCell} >{item.PRICE} {item.PRICE_ICON}</DataTable.Cell>
                                                <DataTable.Cell style={styles.DataTableCell}>{item.RM}</DataTable.Cell>
                                                <DataTable.Cell style={styles.DataTableCell}>{item.ANZ}</DataTable.Cell>
                                                <DataTable.Cell style={styles.DataTableCell}>{item.PA}</DataTable.Cell>
                                                <DataTable.Cell
                                                    onPress={() => { alertDialog(t('OwnerText'), item.OWNER) }}
                                                    style={{ width: 150 }}>
                                                    {item.OWNER}
                                                </DataTable.Cell>
                                                <DataTable.Cell
                                                    onPress={() => { alertDialog(t('BreederText'), item.BREEDER) }}
                                                    style={{ width: 150 }}>
                                                    {item.BREEDER}
                                                </DataTable.Cell>
                                                <DataTable.Cell
                                                    onPress={() => { alertDialog(t('CoachText'), item.COACH) }}
                                                    style={{ width: 150 }}>
                                                    {item.COACH}
                                                </DataTable.Cell>
                                                {item.IS_DEAD ?
                                                    <>

                                                        <DataTable.Cell style={styles.DataTableCell}>{t('DEAD')}</DataTable.Cell>
                                                    </>
                                                    :
                                                    <>
                                                        <DataTable.Cell style={styles.DataTableCell}>{t('ALIVE')}</DataTable.Cell>
                                                    </>
                                                }
                                                <DataTable.Cell style={styles.DataTableCell}>{item.EDIT_DATE_TEXT}</DataTable.Cell>
                                            </DataTable.Row>



                                        ))}

                                    </DataTable>


                                </ScrollView>

                            }
                        </ScrollView>
                    </>
                }
            </MyHeader>
        </View>
    )
}
export default BreedersSiblingSire;

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
    DataTableTitle: {
        width: 100,
        left: '0.7%'
    },
    DataTableCell: {
        width: 100
    }

})