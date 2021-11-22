import React from 'react'
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity, Alert, Modal, Platform } from 'react-native'
import { Global } from './Global'
import { DataTable, List } from 'react-native-paper';
import Flag from "react-native-flags";
import { Ionicons } from '@expo/vector-icons';

function HorseDetailScreenNick({ navigation, route }) {

    const [getNickSuccessData, setNickSuccessData] = React.useState()
    const [getLoader, setLoader] = React.useState(true)
    const [getMoreInfo, setMoreInfo] = React.useState(false)
    const [getSelectedItem, setSelectedItem] = React.useState()
    const [expanded, setExpanded] = React.useState(false);
    const { HORSE_ID } = route.params;
    const [getHorseInfoByID, setHorseInfoByID] = React.useState();

    const handlePress = () => setExpanded(!expanded);

    const readNickSuccessGetHorseID = async () => {
        try {
            if (Global.Token !== null) {
                fetch('https://api.pedigreeall.com/NickSuccess/Get?p_iHorseId=' + HORSE_ID, {
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
                            setNickSuccessData(json.m_cData)
                            setLoader(false)
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
            console.log("GetPedigreeReport Error")
        }
    };

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

    React.useEffect(() => {
        readNickSuccessGetHorseID();
    }, [])

    return (
        <View style={styles.Container}>

            <Modal
                animationType="slide"
                transparent={true}
                visible={getMoreInfo}>
                <View style={styles.centeredView}>
                    <View style={[styles.FullScreenContainer]}>
                        <View style={{ width: '100%', justifyContent: 'flex-end' }}>
                            <TouchableOpacity
                                style={{ padding:10, borderBottomWidth: 0.6, borderBottomColor: '#dedfe1', flexDirection: 'row' }}
                                onPress={() => {
                                    setMoreInfo(false);
                                }}>
                                <Ionicons name="close-outline" size={35} color="black" />
                            </TouchableOpacity>
                        </View>

                        {getSelectedItem !== undefined &&

                            <ScrollView horizontal={true}>


                                <DataTable>
                                    
                                        <DataTable.Header removeClippedSubviews={true}>
                                            <DataTable.Title style={{ width: 300 }}>Name</DataTable.Title>
                                            <DataTable.Title style={styles.DataTableTitle}>Class</DataTable.Title>
                                            <DataTable.Title style={styles.DataTableTitle}>Point</DataTable.Title>
                                            <DataTable.Title style={styles.DataTableTitle}>Earning</DataTable.Title>
                                            <DataTable.Title style={styles.DataTableTitle}>Fam</DataTable.Title>
                                            <DataTable.Title style={styles.DataTableTitle}>Color</DataTable.Title>
                                            <DataTable.Title style={{ width: 300 }}>Dam</DataTable.Title>
                                            <DataTable.Title style={styles.DataTableTitle}>Birth. Date</DataTable.Title>
                                            <DataTable.Title style={styles.DataTableTitle}>Start</DataTable.Title>
                                            <DataTable.Title style={styles.DataTableTitle}>1st</DataTable.Title>
                                            <DataTable.Title style={styles.DataTableTitle}>1st %</DataTable.Title>
                                            <DataTable.Title style={styles.DataTableTitle}>2nd</DataTable.Title>
                                            <DataTable.Title style={styles.DataTableTitle}>2nd %</DataTable.Title>
                                            <DataTable.Title style={styles.DataTableTitle}>3rd</DataTable.Title>
                                            <DataTable.Title style={styles.DataTableTitle}>3rd %</DataTable.Title>
                                            <DataTable.Title style={styles.DataTableTitle}>4th</DataTable.Title>
                                            <DataTable.Title style={styles.DataTableTitle}>4th %</DataTable.Title>
                                            <DataTable.Title style={styles.DataTableTitle}>Prize</DataTable.Title>
                                            <DataTable.Title style={styles.DataTableTitle}>Dr. RM</DataTable.Title>
                                            <DataTable.Title style={styles.DataTableTitle}>ANZ</DataTable.Title>
                                            <DataTable.Title style={styles.DataTableTitle}>PedigreeAll</DataTable.Title>
                                            <DataTable.Title style={{ width: 150 }}>Owner</DataTable.Title>
                                            <DataTable.Title style={{ width: 150 }}>Breeder</DataTable.Title>
                                            <DataTable.Title style={{ width: 150 }}>Coach</DataTable.Title>
                                            <DataTable.Title style={styles.DataTableTitle}>Dead</DataTable.Title>
                                            <DataTable.Title style={styles.DataTableTitle}>Update D.</DataTable.Title>
                                        </DataTable.Header>
                                    


                                    {getSelectedItem.HORSE_INFO.map((item, index) => (

                                        <DataTable.Row centered={true} key={index}>
                                            <DataTable.Cell
                                                onPress={() => {
                                                    alertDialog("Name", item.HORSE_NAME)
                                                }}
                                                style={{ width: 300 }}>{item.HORSE_NAME} {item.ICON.toUpperCase()}
                                            </DataTable.Cell>
                                           
                                                <DataTable.Cell style={styles.DataTableText}>{item.WINNER_TYPE_OBJECT.WINNER_TYPE_EN}</DataTable.Cell>

                                            <DataTable.Cell style={styles.DataTableText}>{item.POINT}</DataTable.Cell>
                                            <DataTable.Cell style={styles.DataTableText}>{item.EARN} {item.EARN_ICON}</DataTable.Cell>
                                            <DataTable.Cell style={styles.DataTableText}>{item.FAMILY_TEXT}</DataTable.Cell>
                                            <DataTable.Cell style={styles.DataTableText}>{item.COLOR_TEXT}</DataTable.Cell>
                                            <DataTable.Cell
                                                onPress={() => {
                                                    alertDialog("Dam", item.MOTHER_NAME)
                                                }}
                                                style={{ width: 300 }}>
                                                {item.MOTHER_NAME}
                                            </DataTable.Cell>
                                            <DataTable.Cell style={styles.DataTableText}>{item.HORSE_BIRTH_DATE_TEXT}</DataTable.Cell>
                                            <DataTable.Cell style={styles.DataTableText}>{item.START_COUNT}</DataTable.Cell>
                                            <DataTable.Cell style={styles.DataTableText}>{item.FIRST}</DataTable.Cell>
                                            <DataTable.Cell style={styles.DataTableText}>{item.FIRST_PERCENTAGE}</DataTable.Cell>
                                            <DataTable.Cell style={styles.DataTableText}>{item.SECOND}</DataTable.Cell>
                                            <DataTable.Cell style={styles.DataTableText}>{item.SECOND_PERCENTAGE}</DataTable.Cell>
                                            <DataTable.Cell style={styles.DataTableText}>{item.THIRD}</DataTable.Cell>
                                            <DataTable.Cell style={styles.DataTableText}>{item.THIRD_PERCENTAGE}</DataTable.Cell>
                                            <DataTable.Cell style={styles.DataTableText}>{item.FOURTH}</DataTable.Cell>
                                            <DataTable.Cell style={styles.DataTableText}>{item.PRICE} {item.PRICE_ICON}</DataTable.Cell>
                                            <DataTable.Cell style={styles.DataTableText}>{item.RM}</DataTable.Cell>
                                            <DataTable.Cell style={styles.DataTableText}>{item.ANZ}</DataTable.Cell>
                                            <DataTable.Cell style={styles.DataTableText}>{item.PA}</DataTable.Cell>
                                            <DataTable.Cell
                                                onPress={() => {
                                                    alertDialog("Owner", item.OWNER)
                                                }}
                                                style={{ width: 150 }}>
                                                {item.OWNER}
                                            </DataTable.Cell>
                                            <DataTable.Cell
                                                onPress={() => {
                                                    alertDialog("Breeder", item.BREEDER)
                                                }}
                                                style={{ width: 150 }}>
                                                {item.BREEDER}
                                            </DataTable.Cell>
                                            <DataTable.Cell
                                                onPress={() => {
                                                    alertDialog("Coach", item.COACH)
                                                }}
                                                style={{ width: 150 }}>
                                                {item.COACH}
                                            </DataTable.Cell>
                                            {item.IS_DEAD ?
                                                <>
                                                   
                                                        <DataTable.Cell style={styles.DataTableText}>DEAD</DataTable.Cell>
                                                </>
                                                :
                                                <>
                                                        <DataTable.Cell style={styles.DataTableText}>ALIVE</DataTable.Cell>
                                                </>
                                            }
                                            <DataTable.Cell style={styles.DataTableText}>{item.EDIT_DATE_TEXT}</DataTable.Cell>
                                        </DataTable.Row>
                                    ))}
                                </DataTable>
                            </ScrollView>


                        }

                    </View>
                </View>
            </Modal>

            {getLoader ?
                <ActivityIndicator style={styles.Activity} size="large" color="rgba(52, 77, 169, 0.6)" />
                :
                <>
                <ScrollView vertical={true}>
                    {getNickSuccessData !== undefined &&

                        <ScrollView horizontal={true}>


                            <DataTable>

                                <DataTable.Header removeClippedSubviews={true}>
                                    <DataTable.Title style={{ width: 50, justifyContent: 'center' }}> </DataTable.Title>
                                    <DataTable.Cell
                                    style={{left: '6%'}} >
                                        <Ionicons name="arrow-down-outline" color="rgba(52, 77, 169, 0.6)" size={16} />
                                    </DataTable.Cell>
                                    <DataTable.Title style={{ width: 395, right: '0.9%' }}>Broodmare Sire</DataTable.Title>
                                    <DataTable.Title style={styles.DataTableTitle}>Foals</DataTable.Title>
                                    <DataTable.Title style={styles.DataTableTitle}>Point</DataTable.Title>
                                    <DataTable.Title style={styles.DataTableTitle}>Start</DataTable.Title>
                                    <DataTable.Title style={styles.DataTableTitle}>Top 4</DataTable.Title>
                                    <DataTable.Title style={styles.DataTableTitle}>Top 4%</DataTable.Title>
                                    <DataTable.Title style={styles.DataTableTitle}>1st</DataTable.Title>
                                    <DataTable.Title style={styles.DataTableTitle}>1st %</DataTable.Title>
                                    <DataTable.Title style={styles.DataTableTitle} >2nd</DataTable.Title>
                                    <DataTable.Title style={styles.DataTableTitle}>2nd %</DataTable.Title>
                                    <DataTable.Title style={styles.DataTableTitle}>3rd</DataTable.Title>
                                    <DataTable.Title style={styles.DataTableTitle}>3rd %</DataTable.Title>
                                    <DataTable.Title style={styles.DataTableTitle}>4th</DataTable.Title>
                                    <DataTable.Title style={styles.DataTableTitle}>4th %</DataTable.Title>
                                </DataTable.Header>



                                {getNickSuccessData.map((item, index) => (
                                    <View key={index}>
                                        <DataTable.Row centered={true} key={index}>

                                            <DataTable.Cell
                                                onPress={() => {
                                                    setSelectedItem(item)
                                                    setMoreInfo(true)
                                                }}
                                                style={{ width: 50, justifyContent: 'center' , right:'0.3%'}}>
                                                <Ionicons name="caret-forward-outline" color="#222" size={16} />
                                            </DataTable.Cell>
                                            
                                            <DataTable.Cell style={{ top: Platform.OS == 'ios' ? '8%': 0 , bottom: Platform.OS == 'ios' ? '0%': '2.5%'}}>
                                            <Flag code={item.BM_SIRE_ICON.toUpperCase()} size={16} />
                                            </DataTable.Cell>
                                        
                                            <DataTable.Cell
                                                onPress={() => {
                                                    alertDialog("Broodmare Sire", item.BM_SIRE_NAME)
                                                }}
                                                style={{ width: 400, left: '0.6%' }}>
                                                {item.BM_SIRE_NAME}
                                            </DataTable.Cell>
                                            <DataTable.Cell style={styles.DataTableText}>{item.COUNTER}</DataTable.Cell>
                                            <DataTable.Cell style={styles.DataTableText}>{item.POINT}</DataTable.Cell>
                                            <DataTable.Cell style={styles.DataTableText}>{item.START}</DataTable.Cell>
                                            <DataTable.Cell style={styles.DataTableText}>{item.TOP4}</DataTable.Cell>
                                            <DataTable.Cell style={styles.DataTableText}>{item.TOP4_PERCENTAGE}</DataTable.Cell>
                                            <DataTable.Cell style={styles.DataTableText}>{item.FOURTH}</DataTable.Cell>
                                            <DataTable.Cell style={styles.DataTableText}>{item.FOURTH_PERCENTAGE}</DataTable.Cell>
                                            <DataTable.Cell style={styles.DataTableText}>{item.THIRD}</DataTable.Cell>
                                            <DataTable.Cell style={styles.DataTableText}>{item.THIRD_PERCENTAGE}</DataTable.Cell>
                                            <DataTable.Cell style={styles.DataTableText}>{item.SECOND}</DataTable.Cell>
                                            <DataTable.Cell style={styles.DataTableText}>{item.SECOND_PERCENTAGE}</DataTable.Cell>
                                            <DataTable.Cell style={styles.DataTableText}>{item.FIRST}</DataTable.Cell>
                                            <DataTable.Cell style={styles.DataTableText}>{item.FIRST_PERCENTAGE}</DataTable.Cell>

                                        </DataTable.Row>

                                    </View>
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
export default HorseDetailScreenNick;
const styles = StyleSheet.create({
    Container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff'
    },
    DataTableTitle: {
        width: 100,
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
    DataTableText: {
        width: 100
    },
    modalText: {
        marginBottom: 15,
    },
    ModalItemContainer: {
        width: '100%',
        height: '100%',

    },
    ModalContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
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
        shadowColor: "#000",
    },
})