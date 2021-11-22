import React from 'react'
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Image, Platform, Modal, Linking, TouchableOpacity } from 'react-native'
import { Global } from './Global'
import { DataTable } from 'react-native-paper';
import Icon from "react-native-vector-icons/FontAwesome5";
import * as Animatable from 'react-native-animatable';
import { Ionicons } from '@expo/vector-icons';
import Feather from 'react-native-vector-icons/Feather';

function HorseDetailScreenTJK({ navigation, route }) {
    const [getTJKReport, setTJKReport] = React.useState();
    const [time, setTime] = React.useState(true);
    const [moreDetail, setMoreDetail] = React.useState(false);
    const [showImage, setShowImage] = React.useState(false);
    const [showVideo, setShowVideo] = React.useState(false);
    const [videoURL, setVideoURL] = React.useState();
    const [imageURL, setImageURL] = React.useState();

    const readTJKReport = async () => {
        try {
            if (Global.Token !== null) {
                fetch('https://api.pedigreeall.com/Tjk/Get?p_iTjkId=60991', {
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
            console.log("setTJKReport Error")
        }
    };
    React.useEffect(() => {
        readTJKReport();
    }, [])

    const OpenURLButton = ({ url }) => {
        const handlePress = React.useCallback(async () => {
            const supported = await Linking.canOpenURL(url);

            if (supported) {
                await Linking.openURL(url);
            } else {
                Alert.alert(`Don't know how to open this URL: ${url}`);
            }
        }, [url]);

        return <Icon onPress={handlePress} name="video" size={20} color="#000" />;
    };

    return (
        <View style={styles.Container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={showImage}>
                <View style={styles.centeredView}>
                    <View style={[styles.FullScreenContainer]}>
                        <View style={{ width: '100%', justifyContent: 'flex-end' }}>
                            <TouchableOpacity
                                style={{ padding: 10, borderBottomWidth: 0.6, borderBottomColor: '#dedfe1', flexDirection: 'row' }}
                                onPress={() => {
                                    setShowImage(false);
                                }}>
                                <Ionicons name="close-outline" size={35} color="black" />
                                <Text style={{ padding: 8, left: 10, fontSize: 15, fontWeight: 'bold' }}>Image</Text>
                            </TouchableOpacity>
                        </View>
                        {imageURL !== undefined ?
                            <Image style={styles.HorseImage} source={{ uri: imageURL }} />
                            :
                            <Text>No Image</Text>}


                    </View>
                </View>
            </Modal>
            {time ?
                <ActivityIndicator style={styles.Activity} size="large" color="rgba(52, 77, 169, 0.6)" />

                :
                <ScrollView vertical={true}>
                    <Animatable.Image animation="flipInY"
                        style={styles.TJKImage} source={{ uri: 'https://www.pedigreeall.com//images/head2.jpg' }} />

                    {getTJKReport !== undefined &&

                        <ScrollView horizontal>
                            <View style={styles.rowView}>

                                <View style={styles.columnView}>
                                    <Text style={styles.TableTitle}> </Text>
                                    {getTJKReport[0].HORSE_HEADER.map((item, index) => (
                                        <Text key={index} style={styles.TableTitle}>{item.BASLIK}</Text>
                                    ))}
                                </View>
                                <View style={styles.columnView}>
                                    <Text style={styles.TableTitle}>K.</Text>
                                    {getTJKReport[0].HORSE_HEADER.map((item, index) => (
                                        <Text key={index} style={styles.TableText}>{item.K}</Text>
                                    ))}
                                </View>
                                <View style={styles.columnView}>

                                    <Text style={styles.TableTitle}>1st</Text>

                                    {getTJKReport[0].HORSE_HEADER.map((item, index) => (
                                        <Text key={index} style={styles.TableText}>{item.BIRINCILIK}</Text>
                                    ))}
                                </View>
                                <View style={styles.columnView}>

                                    <Text style={styles.TableTitle}>2nd</Text>

                                    {getTJKReport[0].HORSE_HEADER.map((item, index) => (
                                        <Text key={index} style={styles.TableText}>{item.IKINCILIK}</Text>
                                    ))}
                                </View>
                                <View style={styles.columnView}>

                                    <Text style={styles.TableTitle}>3rd</Text>

                                    {getTJKReport[0].HORSE_HEADER.map((item, index) => (
                                        <Text key={index} style={styles.TableText}>{item.UCUNCULUK}</Text>
                                    ))}
                                </View>
                                <View style={styles.columnView}>

                                    <Text style={styles.TableTitle}>4th</Text>


                                    {getTJKReport[0].HORSE_HEADER.map((item, index) => (
                                        <Text key={index} style={styles.TableText}>{item.DORDUNCULUK}</Text>
                                    ))}
                                </View>
                                <View style={styles.columnView}>

                                    <Text style={styles.TableTitle}>Earning</Text>

                                    {getTJKReport[0].HORSE_HEADER.map((item, index) => (
                                        <Text key={index} style={styles.TableText}>{item.KAZANC}</Text>
                                    ))}
                                </View>
                            </View>

                        </ScrollView>
                    }


                    <ScrollView
                        style={{ marginTop: 40 }}
                        horizontal>
                        <DataTable>

                            <DataTable.Header>
                                <DataTable.Title>Video</DataTable.Title>
                                <DataTable.Title>Image</DataTable.Title>
                                <DataTable.Title style={{right: '0.2%'}}>Date</DataTable.Title>
                                <DataTable.Title style={{left: '0.1%'}}>City</DataTable.Title>
                                <DataTable.Title style={{left: '0.6%'}}>Distance</DataTable.Title>
                                <DataTable.Title style={{right: '0.4%'}}>Runway</DataTable.Title>
                                <DataTable.Title style={{right: '1%'}}>S</DataTable.Title>
                                <DataTable.Title style={{left: '0.2%'}}>Degree</DataTable.Title>
                                <DataTable.Title style={{right: '0.3%'}}>Kg</DataTable.Title>
                                <DataTable.Title style={{left: '0.3%'}}>Taki</DataTable.Title>
                                <DataTable.Title style={{left: '0.9%'}}>Jockey</DataTable.Title>
                                <DataTable.Title style={{left: '0.4%'}}>St</DataTable.Title>
                                <DataTable.Title style={{left: '1.5%'}}>Gny</DataTable.Title>
                                <DataTable.Title style={{left: '1.9%'}}>Group</DataTable.Title>
                                <DataTable.Title style={{left: '1.7%'}}>K.No-K.Adı</DataTable.Title>
                                <DataTable.Title style={{left: '0.3%'}}>K. Cinsi</DataTable.Title>
                                <DataTable.Title style={{right: '0.3%'}}>Coach</DataTable.Title>
                                <DataTable.Title style={{right: '0.7%'}}>Owner</DataTable.Title>
                                <DataTable.Title style={{right: '0.8%'}}>HP</DataTable.Title>
                                <DataTable.Title style={{right: '0.2%'}}>Bonus</DataTable.Title>
                                <DataTable.Title style={{right: '0.4%'}}>S20</DataTable.Title>
                            </DataTable.Header>


                            {getTJKReport[0].HORSE_TABLE.map((item, index) => (
                                <DataTable.Row key={index}>
                                    <DataTable.Cell
                                        style={styles.TableCellStyle}
                                        onPress={() => {
                                            const supported = Linking.canOpenURL(item.VIDEO.replace('amp;', ''));
                                            if (supported) {
                                                Linking.openURL(item.VIDEO.replace('amp;', ''));
                                            } else {
                                                Alert.alert(`Don't know how to open this URL: ${item.VIDEO.replace('amp;', '')}`);
                                            }
                                        }}>
                                        <Feather name="video" size={19} color="#000" />

                                    </DataTable.Cell>
                                    <DataTable.Cell
                                        onPress={() => {
                                            setImageURL(item.FOTO)
                                            setShowImage(true);
                                        }}
                                        style={styles.TableCellStyle}>
                                        <Feather name="image" size={19} color="#000" />
                                    </DataTable.Cell>
                                    <DataTable.Cell style={styles.TableCellStyle}>{item.TARIH}</DataTable.Cell>
                                    <DataTable.Cell style={styles.TableCellStyle}>{item.SEHIR}</DataTable.Cell>
                                    <DataTable.Cell style={styles.TableCellStyle}>{item.MESAFE}</DataTable.Cell>
                                    <DataTable.Cell style={styles.TableCellStyle}>{item.PIST}</DataTable.Cell>
                                    <DataTable.Cell style={styles.TableCellStyle}>{item.S}</DataTable.Cell>
                                    <DataTable.Cell style={styles.TableCellStyle}>{item.DERECE}</DataTable.Cell>
                                    <DataTable.Cell style={styles.TableCellStyle}>{item.KG}</DataTable.Cell>
                                    <DataTable.Cell style={styles.TableCellStyle}>{item.TAKI}</DataTable.Cell>
                                    <DataTable.Cell style={styles.TableCellStyle}>{item.JOKEY}</DataTable.Cell>
                                    <DataTable.Cell style={styles.TableCellStyle}>{item.ST}</DataTable.Cell>
                                    <DataTable.Cell style={styles.TableCellStyle}>{item.GNY}</DataTable.Cell>
                                    <DataTable.Cell style={styles.TableCellStyle}>{item.GRUP}</DataTable.Cell>
                                    <DataTable.Cell style={styles.TableCellStyle}>{item.K_NO_K_ADI}</DataTable.Cell>
                                    <DataTable.Cell style={styles.TableCellStyle}>{item.K_CINS}</DataTable.Cell>
                                    <DataTable.Cell style={styles.TableCellStyle}>{item.ANTRENOR}</DataTable.Cell>
                                    <DataTable.Cell style={styles.TableCellStyle}>{item.SAHIP}</DataTable.Cell>
                                    <DataTable.Cell style={styles.TableCellStyle}>{item.HP}</DataTable.Cell>
                                    <DataTable.Cell style={styles.TableCellStyle}>{item.IKRAMIYE}</DataTable.Cell>
                                    <DataTable.Cell style={styles.TableCellStyle}>{item.S_20}</DataTable.Cell>
                                </DataTable.Row>
                            ))}



                        </DataTable>

                    </ScrollView>


                </ScrollView>

            }

        </View >
    )
}
export default HorseDetailScreenTJK;
const styles = StyleSheet.create({
    TableTitle: {
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '700',
    },
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
    TableText: {
        textAlign: 'center',
    },
    rowView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
        marginTop: 20,
    },
    columnView: {
        flexDirection: 'column',
        margin: 12
    },
    TJKImage: {
        width: 150,
        height: 75,
        alignSelf: 'flex-start',
        left: '5%',
        top: '0.5%'
    },
    MoreDetailButton: {
        alignSelf: 'center',
        padding: 15,
        backgroundColor: '#2169ab',
        borderRadius: 10,
        marginVertical: 20
    },
    MoreDetailButtonText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 16,
        textAlign: 'center',
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
    TableCellStyle: {
        width: 90,
    },TableCellStyle1: {
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
    }
})