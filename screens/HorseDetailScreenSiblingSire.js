import React, { useState } from 'react'
import { View, StyleSheet, ScrollView, ActivityIndicator, Platform, Text, Alert } from 'react-native'
import { Global } from './Global'
import { DataTable } from 'react-native-paper';
import Icon from "react-native-vector-icons/FontAwesome5";
import Flag from "react-native-flags";

function HorseDetailScreenSiblingSire({ BackButton, navigation, route }) {
    const [time, setTime] = React.useState(true);
    const [getSiblingSire, setSiblingSire] = React.useState();
    const { HORSE_ID } = route.params;

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
                    text: "OK",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
            ],
            { cancelable: false }
        );

    return (
        <View style={styles.Container} showsVerticalScrollIndicator={true}>
            
            {time ?
                <ActivityIndicator style={styles.Activity} size="large" color="rgba(52, 77, 169, 0.6)" />
                :
                <>
                    <ScrollView vertical={true}>
                        {getSiblingSire !== undefined &&

                            <ScrollView horizontal={true}>


                                <DataTable>

                                    <DataTable.Header removeClippedSubviews={true}>
                                    <DataTable.Title style={{ width: 350 }}>Name</DataTable.Title>
                                    <DataTable.Title style={[styles.DataTableTitle, { left: '0.3%' }]}>Class</DataTable.Title>
                                    <DataTable.Title style={[styles.DataTableTitle, { left: '0.3%' }]}>Point</DataTable.Title>
                                    <DataTable.Title style={[styles.DataTableTitle, { left: '0.3%' }]}>Earning</DataTable.Title>
                                    <DataTable.Title style={[styles.DataTableTitle, { left: '0.3%' }]}>Fam</DataTable.Title>
                                    <DataTable.Title style={[styles.DataTableTitle, { left: '0.3%' }]}>Color</DataTable.Title>
                                    <DataTable.Title style={{ width: 340, left: '0.2%' }}>Dam</DataTable.Title>
                                    <DataTable.Title style={{ width: 450, left: '2.2%' }}>Broodmare Sire</DataTable.Title>
                                    <DataTable.Title style={[styles.DataTableTitle, { left: '1.3%' }]}>Birth D.</DataTable.Title>
                                    <DataTable.Title style={[styles.DataTableTitle, { left: '1.2%' } ]}>Start</DataTable.Title>
                                    <DataTable.Title style={[styles.DataTableTitle, { left: '1.2%' } ]}>1st</DataTable.Title>
                                    <DataTable.Title style={[styles.DataTableTitle, { left: '1.2%' } ]}>1st %</DataTable.Title>
                                    <DataTable.Title style={[styles.DataTableTitle, { left: '1.1%' } ]}>2nd</DataTable.Title>
                                    <DataTable.Title style={[styles.DataTableTitle, { left: '1.1%' } ]}>2nd %</DataTable.Title>
                                    <DataTable.Title style={[styles.DataTableTitle, { left: '1%' } ]}>3rd</DataTable.Title>
                                    <DataTable.Title style={[styles.DataTableTitle, { left: '1%' } ]}>3rd %</DataTable.Title>
                                    <DataTable.Title style={[styles.DataTableTitle, { left: '1%' } ]}>4th</DataTable.Title>
                                    <DataTable.Title style={[styles.DataTableTitle, { left: '1%' } ]}>4th %</DataTable.Title>
                                    <DataTable.Title style={[styles.DataTableTitle, { left: '0.9%' } ]}>Price</DataTable.Title>
                                    <DataTable.Title style={[styles.DataTableTitle, { left: '0.8%' } ]}>Dr. RM</DataTable.Title>
                                    <DataTable.Title style={[styles.DataTableTitle, { left: '0.8%' } ]}>ANZ</DataTable.Title>
                                    <DataTable.Title style={[styles.DataTableTitle, { left: '0.7%' } ]}>PedigreeAll</DataTable.Title>
                                    <DataTable.Title style={{ width: 150, left: '0.7%' }}>Owner</DataTable.Title>
                                    <DataTable.Title style={{ width: 170, left: '0.7%' }}>Breeder</DataTable.Title>
                                    <DataTable.Title style={{ width: 150 , left: '0.1%'}}>Coach</DataTable.Title>
                                    <DataTable.Title style={[styles.DataTableTitle, { left: '0.1%' }]}>Dead</DataTable.Title>
                                    <DataTable.Title style={[styles.DataTableTitle, { left: '0.1%' }]}>Update D.</DataTable.Title>
                                </DataTable.Header>


                                    {getSiblingSire.map((item, index) => (

                                        <DataTable.Row centered={true} key={index}>
                                            <DataTable.Cell style={{ top: Platform.OS == 'ios' ? '8%': '0%' , bottom: Platform.OS == 'ios' ? '0%': '4%'}}>
                                            <Flag code={item.ICON.toUpperCase()} size={16} />
                                        </DataTable.Cell>
                                            <DataTable.Cell
                                                onPress={() => { alertDialog("Name", item.HORSE_NAME) }}
                                                style={{ width: 350, left: '0.4%' }}>
                                                {item.HORSE_NAME}
                                            </DataTable.Cell>
                                            <DataTable.Cell style={styles.DataTableCell}>{item.WINNER_TYPE_OBJECT.WINNER_TYPE_TR}</DataTable.Cell>


                                            <DataTable.Cell style={styles.DataTableCell}>{item.POINT}</DataTable.Cell>
                                            <DataTable.Cell style={styles.DataTableCell} >{item.EARN} {item.EARN_ICON}</DataTable.Cell>
                                            <DataTable.Cell style={styles.DataTableCell}>{item.FAMILY_TEXT}</DataTable.Cell>
                                            <DataTable.Cell style={styles.DataTableCell}>{item.COLOR_TEXT}</DataTable.Cell>
                                            <DataTable.Cell style={{ top: Platform.OS == 'ios' ? '8%': '0%' , bottom: Platform.OS == 'ios' ? '0%': '4%'}}>
                                            <Flag code={item.MOTHER_ICON.toUpperCase()} size={16} />
                                        </DataTable.Cell>
                                            <DataTable.Cell
                                                onPress={() => { alertDialog("Dam", item.MOTHER_NAME) }}
                                                style={{ width: 400, left: '0.4%'  }}>
                                                {item.MOTHER_NAME}
                                            </DataTable.Cell>
                                            <DataTable.Cell style={{ top: Platform.OS == 'ios' ? '8%': '0%' , bottom: Platform.OS == 'ios' ? '0%': '4%'}}>
                                            <Flag code={item.BM_SIRE_ICON.toUpperCase()} size={16} />
                                        </DataTable.Cell>
                                            <DataTable.Cell
                                                onPress={() => { alertDialog("Broodmare Sire", item.BM_SIRE_NAME) }}
                                                style={{ width: 400, left: '0.4%'  }}>
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
                                                onPress={() => { alertDialog("Owner", item.OWNER) }}
                                                style={{ width: 150 }}>
                                                {item.OWNER}
                                            </DataTable.Cell>
                                            <DataTable.Cell
                                                onPress={() => { alertDialog("Breeder", item.BREEDER) }}
                                                style={{ width: 150 }}>
                                                {item.BREEDER}
                                            </DataTable.Cell>
                                            <DataTable.Cell
                                                onPress={() => { alertDialog("Coach", item.COACH) }}
                                                style={{ width: 150 }}>
                                                {item.COACH}
                                            </DataTable.Cell>
                                            {item.IS_DEAD ?
                                                <>

                                                    <DataTable.Cell style={styles.DataTableCell}>DEAD</DataTable.Cell>
                                                </>
                                                :
                                                <>
                                                    <DataTable.Cell style={styles.DataTableCell}>ALIVE</DataTable.Cell>
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
        </View>
    )
}
export default HorseDetailScreenSiblingSire;

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
        paddingLeft: Platform.OS == 'ios' ? 3: 0,
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