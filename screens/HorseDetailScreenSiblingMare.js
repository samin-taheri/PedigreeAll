import React, { useState } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Alert, Platform } from 'react-native'
import { Global } from './Global'
import { DataTable } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from "react-native-vector-icons/FontAwesome5";
import Flag from "react-native-flags";

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

function HorseDetailScreenSiblingMare({ BackButton, navigation, route }) {
    const [time, setTime] = React.useState(true);
    const [getSiblingMare, setSiblingMare] = React.useState();
    const { HORSE_ID } = route.params;

    const readSiblingMare = async () => {
        try {
            if (Global.Token !== null) {
                fetch('https://api.pedigreeall.com/Sibling/GetSiblingFromMother?p_iHorseId=' + HORSE_ID, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + Global.Token,
                    },
                }).then((response) => response.json())
                    .then((json) => {
                        if (json !== null) {
                            setSiblingMare(json.m_cData);
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

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);


    React.useEffect(() => {

        const unsubscribe = navigation.addListener('focus', () => {
            
            readSiblingMare();

        });

        return () => {
            unsubscribe;
        };
    }, [navigation]);

    React.useEffect(() => {
        
        readSiblingMare();
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
        <View
            style={styles.Container}
            showsVerticalScrollIndicator={true}>

            {time ?
                <ActivityIndicator style={styles.Activity} size="large" color="rgba(52, 77, 169, 0.6)" />
                :
                <>
                <ScrollView vertical={true}>
                    {getSiblingMare !== undefined &&

                        <ScrollView horizontal={true}>


                            <DataTable>
                                <DataTable.Header removeClippedSubviews={true}>
                                    <DataTable.Title style={{ width: 365 }}>Name</DataTable.Title>
                                    <DataTable.Title style={styles.DataTableTitle}>Class</DataTable.Title>
                                    <DataTable.Title style={styles.DataTableTitle}>Point</DataTable.Title>
                                    <DataTable.Title style={styles.DataTableTitle}>Earning</DataTable.Title>
                                    <DataTable.Title style={styles.DataTableTitle}>Fam</DataTable.Title>
                                    <DataTable.Title style={styles.DataTableTitle}>Color</DataTable.Title>
                                    <DataTable.Title style={{ width: 420 , lrft: '0.3%'}}>Sire</DataTable.Title>
                                    <DataTable.Title style={styles.DataTableTitle}>Birth D.</DataTable.Title>
                                    <DataTable.Title style={styles.DataTableTitle}>Start</DataTable.Title>
                                    <DataTable.Title style={styles.DataTableTitle}>1st</DataTable.Title>
                                    <DataTable.Title style={styles.DataTableTitle}>1st %</DataTable.Title>
                                    <DataTable.Title style={styles.DataTableTitle}>2nd</DataTable.Title>
                                    <DataTable.Title style={styles.DataTableTitle}>2nd %</DataTable.Title>
                                    <DataTable.Title style={styles.DataTableTitle}>3rd</DataTable.Title>
                                    <DataTable.Title style={styles.DataTableTitle}>3rd %</DataTable.Title>
                                    <DataTable.Title style={styles.DataTableTitle}>4th</DataTable.Title>
                                    <DataTable.Title style={styles.DataTableTitle}>4th %</DataTable.Title>
                                    <DataTable.Title style={styles.DataTableTitle}>Price</DataTable.Title>
                                    <DataTable.Title style={styles.DataTableTitle}>Dr. RM</DataTable.Title>
                                    <DataTable.Title style={styles.DataTableTitle}>ANZ</DataTable.Title>
                                    <DataTable.Title style={styles.DataTableTitle}>PedigreeAll</DataTable.Title>
                                    <DataTable.Title style={{ width: 160 }}>Owner</DataTable.Title>
                                    <DataTable.Title style={{ width: 150 }}>Breeder</DataTable.Title>
                                    <DataTable.Title style={{ width: 150 }}>Coach</DataTable.Title>
                                    <DataTable.Title style={styles.DataTableTitle}>Dead</DataTable.Title>
                                    <DataTable.Title style={styles.DataTableTitle}>Update D.</DataTable.Title>
                                </DataTable.Header>

                                {getSiblingMare.HORSE_INFO_LIST.map((item, index) => (

                                    <DataTable.Row centered={true} key={index}>
                                       <DataTable.Cell style={{ top: Platform.OS == 'ios' ? '8%': '0%' , bottom: Platform.OS == 'ios' ? '0%': '4%'}}>
                                            <Flag code={item.ICON.toUpperCase()} size={16} />
                                        </DataTable.Cell>
                                        <DataTable.Cell
                                            onPress={() => { alertDialog("Name", item.HORSE_NAME) }}
                                            style={{
                                                width: 350, left: '0.4%'
                                            }}>
                                            {item.HORSE_NAME}
                                        </DataTable.Cell>

                                        <DataTable.Cell style={styles.DataTableCell}>{item.WINNER_TYPE_OBJECT.WINNER_TYPE_EN}</DataTable.Cell>

                                        <DataTable.Cell style={styles.DataTableCell} >{item.POINT}</DataTable.Cell>
                                        <DataTable.Cell style={styles.DataTableCell} >{item.EARN} {item.EARN_ICON}</DataTable.Cell>
                                        <DataTable.Cell style={styles.DataTableCell} >{item.FAMILY_TEXT}</DataTable.Cell>
                                        <DataTable.Cell style={styles.DataTableCell}>{item.COLOR_TEXT}</DataTable.Cell>
                                        <DataTable.Cell style={{ top: Platform.OS == 'ios' ? '8%': '0%' , bottom: Platform.OS == 'ios' ? '0%': '4%'}}>
                                            <Flag code={item.FATHER_ICON.toUpperCase()} size={16} />
                                        </DataTable.Cell>
                                        <DataTable.Cell
                                            onPress={() => { alertDialog("Sire", item.FATHER_NAME) }}
                                            style={{
                                                width: 400, left: '0.4%'
                                            }}>
                                            {item.FATHER_NAME}
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
                                            style={{
                                                width: 150, 
                                            }}>
                                            {item.OWNER}
                                        </DataTable.Cell>
                                        <DataTable.Cell
                                            onPress={() => { alertDialog("Breeder", item.BREEDER) }}
                                            style={{
                                                width: 150, 
                                            }}>
                                            {item.BREEDER}
                                        </DataTable.Cell>
                                        <DataTable.Cell
                                            onPress={() => { alertDialog("Coach", item.COACH) }}
                                            style={{
                                                width: 150,
                                            }}>
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
export default HorseDetailScreenSiblingMare;

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
        paddingLeft: Platform.OS == 'ios' ? 3: 0,
        borderRadius: 30, 
        alignItems: 'center', 
        justifyContent: 'center', 
        alignSelf: 'center'
    },
    DataTableCell: {
        width: 100,
    }
})