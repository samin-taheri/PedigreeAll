import React, { useState } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Alert, Platform } from 'react-native'
import { Global } from './Global'
import { DataTable } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import Flag from "react-native-flags";
import MyHeader from '../component/MyHeader';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

function ImportantRacesDetail({ BackButton, navigation, route }) {
    const [time, setTime] = React.useState(true);
    const [getImportantRaces, setImportantRaces] = React.useState();
    const { HORSE_ID } = route.params;

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

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);


    React.useEffect(() => {

        const unsubscribe = navigation.addListener('focus', () => {

            readImportantRaces();

        });

        return () => {
            unsubscribe;
        };
    }, [navigation]);

    React.useEffect(() => {

        readImportantRaces();
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
            <MyHeader Title='Important Races'
                onPress={() => navigation.goBack()}
            >
                {time ?
                    <ActivityIndicator style={styles.Activity} size="large" color="rgba(52, 77, 169, 0.6)" />
                    :
                    <>
                        <ScrollView vertical={true}>
                            {getImportantRaces !== undefined &&

                                <ScrollView horizontal={true}>
                                    <DataTable>
                                        <DataTable.Header removeClippedSubviews={true}>
                                            <DataTable.Title style={{ width: 365 }}>Date</DataTable.Title>
                                            <DataTable.Title style={{ width: 365 }}>Name</DataTable.Title>
                                            <DataTable.Title style={styles.DataTableTitle}>Class</DataTable.Title>
                                            <DataTable.Title style={styles.DataTableTitle}>Point</DataTable.Title>
                                            <DataTable.Title style={styles.DataTableTitle}>Earning</DataTable.Title>
                                            <DataTable.Title style={styles.DataTableTitle}>Fam</DataTable.Title>
                                            <DataTable.Title style={styles.DataTableTitle}>Color</DataTable.Title>
                                            <DataTable.Title style={{ width: 420, lrft: '0.3%' }}>Sire</DataTable.Title>
                                            <DataTable.Title style={styles.DataTableTitle}>Dam</DataTable.Title>
                                            <DataTable.Title style={styles.DataTableTitle}>Broodmare Sire</DataTable.Title>
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
                                            <DataTable.Title style={styles.DataTableTitle}>PedigreeAll.com</DataTable.Title>
                                            <DataTable.Title style={{ width: 160 }}>Owner</DataTable.Title>
                                            <DataTable.Title style={{ width: 150 }}>Breeder</DataTable.Title>
                                            <DataTable.Title style={{ width: 150 }}>Coach</DataTable.Title>
                                            <DataTable.Title style={styles.DataTableTitle}>Dead</DataTable.Title>
                                            <DataTable.Title style={styles.DataTableTitle}>Country</DataTable.Title>
                                            <DataTable.Title style={styles.DataTableTitle}>City</DataTable.Title>
                                            <DataTable.Title style={styles.DataTableTitle}>Race Group</DataTable.Title>
                                            <DataTable.Title style={styles.DataTableTitle}>Distance</DataTable.Title>
                                            <DataTable.Title style={styles.DataTableTitle}>Runway</DataTable.Title>
                                            <DataTable.Title style={styles.DataTableTitle}>Class</DataTable.Title>
                                            <DataTable.Title style={styles.DataTableTitle}>Link</DataTable.Title>
                                        </DataTable.Header>

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
export default ImportantRacesDetail;

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
    }
})