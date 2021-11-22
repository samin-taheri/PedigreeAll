
import React, { useState } from 'react'
import { View, StyleSheet, ScrollView, ActivityIndicator, Platform, Text, Alert } from 'react-native'
import { Global } from './Global'
import { DataTable } from 'react-native-paper';
import Icon from "react-native-vector-icons/FontAwesome5";
import Flag from "react-native-flags";

function HorseDetailScreenLinebreeding({ BackButton, navigation, route }) {

    const [LinebreedingHorse, setLinebreedingHorse] = React.useState();
    const [loader, setLoader] = useState(true)
    const { HORSE_ID } = route.params;
    const { SECOND_ID } = route.params;
    const { Generation } = route.params;

    const readLinebreedingHorse = async () => {
        try {
            if (Global.Token !== null) {
                fetch('https://api.pedigreeall.com/Linebreeding/GetLinebreedingReport?p_iFirstId=' + HORSE_ID + "&p_iSecondId=" + SECOND_ID + "&p_iGenerationCount=" + Generation + "&p_iMinCross=2", {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + Global.Token,
                    },
                })
                    .then((response) => response.json())
                    .then((json) => {
                        setLinebreedingHorse(json.m_cData)
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
            console.log(e)
        }
    }
    React.useEffect(() => {
        readLinebreedingHorse();
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


            {loader ?
                <ActivityIndicator style={styles.Activity} size="large" color="rgba(52, 77, 169, 0.6)" />
                :
                <>
                <ScrollView vertical={true}>
                    {LinebreedingHorse !== undefined &&

                        <ScrollView horizontal={true}>

                            <DataTable>

                                <DataTable.Header>
                                    <DataTable.Title style={{ width: 350 }}>Name</DataTable.Title>
                                    <DataTable.Title style={[styles.DataTableText, {left: '0.3%'}]}>Inbreeding Statistics</DataTable.Title>
                                    <DataTable.Title style={[styles.DataTableText, {left: '0.3%'}]}> X </DataTable.Title>
                                    <DataTable.Title style={[styles.DataTableText, {left: '0.3%'}]}>Lines</DataTable.Title>
                                    <DataTable.Title style={[styles.DataTableText, {left: '0.3%'}]}>Blood%</DataTable.Title>
                                    <DataTable.Title style={[styles.DataTableText, {left: '0.3%'}]}>Influence</DataTable.Title>
                                    <DataTable.Title style={[styles.DataTableText, {left: '0.3%'}]}>AGR</DataTable.Title>
                                    <DataTable.Title style={[styles.DataTableText, {left: '0.3%'}]}>Class</DataTable.Title>
                                    <DataTable.Title style={[styles.DataTableText, {left: '0.3%'}]}>Sex</DataTable.Title>
                                    <DataTable.Title style={[styles.DataTableText, {left: '0.3%'}]}>Earning</DataTable.Title>
                                    <DataTable.Title style={[styles.DataTableText, {left: '0.2%'}]}>Family</DataTable.Title>
                                    <DataTable.Title style={[styles.DataTableText, {left: '0.2%'}]}>Color</DataTable.Title>
                                    <DataTable.Title style={{ width: 400 , left: '0.2%'}}>Sire</DataTable.Title>
                                    <DataTable.Title style={{ width: 400, left: '0.2%' }}>Dam</DataTable.Title>
                                    <DataTable.Title style={{ width: 400 , left: '0.2%'}}>Broodmare Sire</DataTable.Title>
                                    <DataTable.Title style={[styles.DataTableText, {left: '0.2%'}]}>Birth D.</DataTable.Title>
                                    <DataTable.Title style={[styles.DataTableText, {left: '0.2%'}]}>Start</DataTable.Title>
                                    <DataTable.Title style={[styles.DataTableText, {left: '0.2%'}]}>1st</DataTable.Title>
                                    <DataTable.Title style={[styles.DataTableText, {left: '0.2%'}]}>1st %</DataTable.Title>
                                    <DataTable.Title style={[styles.DataTableText, {left: '0.1%'}]}>2nd</DataTable.Title>
                                    <DataTable.Title style={[styles.DataTableText, {left: '0.2%'}]}>2nd %</DataTable.Title>
                                    <DataTable.Title style={[styles.DataTableText, {left: '0.1%'}]}>3rd</DataTable.Title>
                                    <DataTable.Title style={[styles.DataTableText, {left: '0.2%'}]}>3rd %</DataTable.Title>
                                    <DataTable.Title style={[styles.DataTableText, {left: '0.1%'}]}>4th</DataTable.Title>
                                    <DataTable.Title style={[styles.DataTableText, {left: '0.1%'}]}>4th %</DataTable.Title>
                                    <DataTable.Title style={[styles.DataTableText, {left: '0.1%'}]}>Price</DataTable.Title>
                                    <DataTable.Title style={[styles.DataTableText, {left: '0.1%'}]}>Dr. RM</DataTable.Title>
                                    <DataTable.Title style={[styles.DataTableText, {left: '0.1%'}]}>ANZ</DataTable.Title>
                                    <DataTable.Title style={[styles.DataTableText, {left: '0.1%'}]}>PedigreeAll</DataTable.Title>
                                    <DataTable.Title style={{ width: 150, left: '0.1%' }}>Owner</DataTable.Title>
                                    <DataTable.Title style={{ width: 150, left: '0.1%' }}>Breeder</DataTable.Title>
                                    <DataTable.Title style={{ width: 150 , left: '0.1%'}}>Coach</DataTable.Title>
                                    <DataTable.Title style={[styles.DataTableText, {left: '0.1%'}]}>Dead</DataTable.Title>
                                    <DataTable.Title style={[styles.DataTableText, {left: '0.1%'}]}>Point</DataTable.Title>
                                    <DataTable.Title style={[styles.DataTableText, {left: '0.1%'}]}>Update D.</DataTable.Title>
                                </DataTable.Header>



                                {LinebreedingHorse.LINEBREEDING_LIST !== undefined &&
                                    <>
                                        {LinebreedingHorse.LINEBREEDING_LIST.map((item, index) => (
                                            <DataTable.Row key={index}>
                                                <DataTable.Cell style={{ top: Platform.OS == 'ios' ? '8%' : '0%', bottom: Platform.OS == 'ios' ? '0%' : '4%' }}>
                                                    <Flag code={item.HORSE_INFO_OBJECT.ICON.toUpperCase()} size={16} />
                                                </DataTable.Cell>
                                                <DataTable.Cell
                                                    style={{ width: 350, left: '0.4%' }}
                                                    onPress={() => {
                                                        alertDialog("Name", item.HORSE_INFO_OBJECT.HORSE_NAME)
                                                    }}
                                                >{item.HORSE_INFO_OBJECT.HORSE_NAME}</DataTable.Cell>
                                                <DataTable.Cell style={styles.DataTableText}>{item.STATISTICS}</DataTable.Cell>
                                                <DataTable.Cell style={styles.DataTableText}>{item.CROSS}</DataTable.Cell>
                                                <DataTable.Cell style={styles.DataTableText}>{item.LINES}</DataTable.Cell>
                                                <DataTable.Cell style={styles.DataTableText}>{item.BLOOD} %</DataTable.Cell>
                                                <DataTable.Cell style={styles.DataTableText}>{item.INFLUENCE} %</DataTable.Cell>
                                                <DataTable.Cell style={styles.DataTableText}>{item.AGR} %</DataTable.Cell>

                                                <DataTable.Cell style={styles.DataTableText}>{item.HORSE_INFO_OBJECT.WINNER_TYPE_OBJECT.WINNER_TYPE_EN}</DataTable.Cell>



                                                <DataTable.Cell style={styles.DataTableText}>{item.HORSE_INFO_OBJECT.SEX_OBJECT.SEX_EN}</DataTable.Cell>



                                                <DataTable.Cell style={styles.DataTableText}>{item.HORSE_INFO_OBJECT.EARN} {item.HORSE_INFO_OBJECT.EARN_ICON}</DataTable.Cell>
                                                <DataTable.Cell style={styles.DataTableText}>{item.HORSE_INFO_OBJECT.FAMILY_TEXT}</DataTable.Cell>
                                                <DataTable.Cell style={styles.DataTableText}>{item.HORSE_INFO_OBJECT.COLOR_TEXT}</DataTable.Cell>
                                                <DataTable.Cell
                                                    onPress={() => { alertDialog("Sire", item.HORSE_INFO_OBJECT.FATHER_NAME) }}
                                                    style={{ width: 400 }}>
                                                    {item.HORSE_INFO_OBJECT.FATHER_NAME}
                                                </DataTable.Cell>
                                                <DataTable.Cell
                                                    onPress={() => { alertDialog("Dam", item.HORSE_INFO_OBJECT.MOTHER_NAME) }}
                                                    style={{ width: 400 }}>
                                                    {item.HORSE_INFO_OBJECT.MOTHER_NAME}
                                                </DataTable.Cell>
                                                <DataTable.Cell
                                                    onPress={() => { alertDialog("Broodmare Sire", item.HORSE_INFO_OBJECT.BM_SIRE_NAME) }}
                                                    style={{ width: 400 }}>
                                                    {item.HORSE_INFO_OBJECT.BM_SIRE_NAME}
                                                </DataTable.Cell>
                                                <DataTable.Cell style={styles.DataTableText}>{item.HORSE_INFO_OBJECT.HORSE_BIRTH_DATE_TEXT}</DataTable.Cell>
                                                <DataTable.Cell style={styles.DataTableText}>{item.HORSE_INFO_OBJECT.START_COUNT}</DataTable.Cell>
                                                <DataTable.Cell style={styles.DataTableText}>{item.HORSE_INFO_OBJECT.FIRST}</DataTable.Cell>
                                                <DataTable.Cell style={styles.DataTableText}>{item.HORSE_INFO_OBJECT.FIRST_PERCENTAGE}</DataTable.Cell>
                                                <DataTable.Cell style={styles.DataTableText}>{item.HORSE_INFO_OBJECT.SECOND}</DataTable.Cell>
                                                <DataTable.Cell style={styles.DataTableText}>{item.HORSE_INFO_OBJECT.SECOND_PERCENTAGE}</DataTable.Cell>
                                                <DataTable.Cell style={styles.DataTableText}>{item.HORSE_INFO_OBJECT.THIRD}</DataTable.Cell>
                                                <DataTable.Cell style={styles.DataTableText}>{item.HORSE_INFO_OBJECT.THIRD_PERCENTAGE}</DataTable.Cell>
                                                <DataTable.Cell style={styles.DataTableText}>{item.HORSE_INFO_OBJECT.FOURTH}</DataTable.Cell>
                                                <DataTable.Cell style={styles.DataTableText}>{item.HORSE_INFO_OBJECT.FOURTH_PERCENTAGE}</DataTable.Cell>
                                                <DataTable.Cell style={styles.DataTableText}>{item.HORSE_INFO_OBJECT.PRICE} {item.HORSE_INFO_OBJECT.PRICE_ICON}</DataTable.Cell>
                                                <DataTable.Cell style={styles.DataTableText}>{item.HORSE_INFO_OBJECT.RM}</DataTable.Cell>
                                                <DataTable.Cell style={styles.DataTableText}>{item.HORSE_INFO_OBJECT.ANZ}</DataTable.Cell>
                                                <DataTable.Cell style={styles.DataTableText}>{item.HORSE_INFO_OBJECT.PA}</DataTable.Cell>
                                                <DataTable.Cell
                                                    onPress={() => { alertDialog("Owner", item.HORSE_INFO_OBJECT.OWNER) }}
                                                    style={{ width: 150 }}>
                                                    {item.HORSE_INFO_OBJECT.OWNER}
                                                </DataTable.Cell>
                                                <DataTable.Cell
                                                    onPress={() => { alertDialog("Breeder", item.HORSE_INFO_OBJECT.BREEDER) }}
                                                    style={{ width: 150 }}>
                                                    {item.HORSE_INFO_OBJECT.BREEDER}
                                                </DataTable.Cell>
                                                <DataTable.Cell
                                                    onPress={() => { alertDialog("Coach", item.HORSE_INFO_OBJECT.COACH) }}
                                                    style={{ width: 150 }}>
                                                    {item.HORSE_INFO_OBJECT.COACH}
                                                </DataTable.Cell>
                                                {item.HORSE_INFO_OBJECT.IS_DEAD ?
                                                    <>

                                                        <DataTable.Cell style={styles.DataTableText}>DEAD</DataTable.Cell>
                                                    </>
                                                    :
                                                    <>

                                                        <DataTable.Cell style={styles.DataTableText}>ALIVE</DataTable.Cell>
                                                    </>
                                                }

                                                <DataTable.Cell style={styles.DataTableText}>{item.HORSE_INFO_OBJECT.POINT}</DataTable.Cell>
                                                <DataTable.Cell style={styles.DataTableText}>{item.HORSE_INFO_OBJECT.EDIT_DATE_TEXT}</DataTable.Cell>

                                            </DataTable.Row>
                                        ))}
                                    </>

                                }
                            </DataTable>
                        </ScrollView>

                    }
                    </ScrollView>
                </>
            }



        </View>
    )
}
export default HorseDetailScreenLinebreeding;
const styles = StyleSheet.create({
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
    Container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff'
    },
    DataTableText: {
        width: 100
    }
})