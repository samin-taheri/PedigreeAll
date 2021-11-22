import React, { useState, useRef, useEffect } from 'react'
import { View, StyleSheet, Animated, TouchableOpacity, Text, Dimensions, ScrollView, ActivityIndicator, Image, Modal, FlatList } from 'react-native'
import Icon from "react-native-vector-icons/FontAwesome5";
import RBSheet from "react-native-raw-bottom-sheet";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SearchBar, ListItem } from "react-native-elements";
import { DataTable } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import faker from 'faker'
import { Checkbox } from 'react-native-paper';

faker.seed(10);
const SPACING = 18;
const AVATAR_SIZE = 55;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;

function CompareHorses() {

    const BottomSheetLong = React.useRef();

    const [getHorseData, setHorseData] = useState([])
    const [getHorseCompareListData, setHorseCompareListData] = useState([])
    const [searchValue, setSearchValue] = useState();
    const [loader, setLoader] = useState(false);
    const [LoadingForCompareHorses, setLoadingForCompareHorses] = useState(false)
    const [FullScreenVisible, setFullScreenVisible] = useState(false);
    const [getImageURL, setImageURL] = useState();

    const [checkBoxHorseSelection, setcheckBoxHorseSelection] = React.useState({ checked: [] });
    const [checkBoxHorseSelectionString, setcheckBoxHorseSelectionString] = React.useState({ checkedString: [] });

    const readHorseGetByNameData = async () => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                //console.log(atob('Z2ZydWx1dGFzQGhvdG1haWwuY29tOjEyMw=='))
                fetch('https://api.pedigreeall.com/Horse/GetByName', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
                    body: JSON.stringify({
                        ID: 1,
                        NAME: searchValue,
                    })
                })
                    .then((response) => response.json())
                    .then((json) => {
                        setHorseData(json.m_cData)
                        setLoader(false)
                    })
                    .catch((error) => {
                        console.error(error);
                    })
            }
            else {
                console.log("Basarisiz")
            }
        } catch (e) {
        }
    }

    const readHorseInfoGetCompareList = async (HorseID) => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                fetch('https://api.pedigreeall.com/HorseInfo/GetCompareList?p_sIdList=' + HorseID, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
                })
                    .then((response) => response.json())
                    .then((json) => {
                        setHorseCompareListData(json.m_cData)
                        setLoadingForCompareHorses(false)
                    })
                    .catch((error) => {
                        console.error(error);
                    })
            }
            else {
                console.log("Basarisiz")
            }
        } catch (e) {
        }
    }

    React.useEffect(() => {
        readHorseGetByNameData();
    }, [])

    const pressHorse = item => {   // The onPress method
        const { checked } = checkBoxHorseSelection;
        const { checkedString } = checkBoxHorseSelectionString;
        // These ensures that multiple checkboxes don't all get affected when one is clicked
        if (!checked.includes(item.HORSE_ID)) {
            setcheckBoxHorseSelection({ checked: [...checked, item.HORSE_ID] });
            setcheckBoxHorseSelectionString({ checkedString: [...checkedString, item.HORSE_NAME] })
        } else {
            setcheckBoxHorseSelection({ checked: checked.filter(a => a !== item.HORSE_ID) });
            setcheckBoxHorseSelectionString({ checkedString: checkedString.filter(a => a !== item.HORSE_NAME) });
        }
    }

    const scrollY = React.useRef(new Animated.Value(0)).current;

    return (
        <View style={styles.Container}>

            <RBSheet
                hasDraggableIcon={true}
                ref={BottomSheetLong}
                height={Dimensions.get('window').height - 100}
                closeOnDragDown={true}
                closeOnPressMask={true}
                animationType='fade'
                customStyles={{
                    container: {
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10
                    },
                    wrapper: {
                        backgroundColor: "#00000052"
                    },
                }}
            >
                <TouchableOpacity
                    onPress={() => {
                        if (checkBoxHorseSelection.checked.length > 0) {
                            setLoadingForCompareHorses(true)
                            readHorseInfoGetCompareList(checkBoxHorseSelection.checked)
                        }

                        BottomSheetLong.current.close()
                    }}
                    style={styles.SwipableCloseIcon}>

                    <Feather style={{bottom: '3%', left: '10%' }} name="filter" size={17} color="green" />
                    <Text style={{ color: 'green', bottom: '5%', left: '60%', fontWeight: '700', fontSize: 14 }}>Filter</Text>
                </TouchableOpacity>
                <View>

                    <SearchBar
                        placeholder="Search"
                        lightTheme
                        platform="ios"
                        cancelButtonTitle=""
                        inputStyle={{ fontSize: 12, minHeight: 'auto', height: 36 }}
                        containerStyle={{ backgroundColor: 'transparent', }}
                        inputContainerStyle={{ backgroundColor: '#F0F1F3', minHeight: 'auto', height: 'auto', top: '0%' }}
                        rightIconContainerStyle={{ margin: 0, padding: 0, minHeight: 'auto', height: 'auto' }}
                        leftIconContainerStyle={{ margin: 0, padding: 0, minHeight: 'auto', height: 'auto' }}
                        value={searchValue}
                        onChangeText={setSearchValue}
                        onSubmitEditing={() => {
                            setLoader(true);
                            readHorseGetByNameData();
                        }}
                        showLoading={true}
                    />
                    {getHorseData.length > 0 ?
                        <>
                            <Animated.FlatList
                                scrollEnabled={true}
                                bounces={false}
                                onScroll={Animated.event(
                                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                                    { useNativeDriver: true }
                                )}
                                style={styles.flatList2}
                                data={getHorseData}

                                renderItem={({ item, index }) => {
                                    const opacityInputRange = [
                                        -1,
                                        0,
                                        ITEM_SIZE * index,
                                        ITEM_SIZE * (index + .5)
                                    ]
                                    const inputRange = [
                                        -1,
                                        0,
                                        ITEM_SIZE * index,
                                        ITEM_SIZE * (index + 2)
                                    ]
                                    const scale = scrollY.interpolate({
                                        inputRange,
                                        outputRange: [1, 1, 1, 0]
                                    })
                                    const opacity = scrollY.interpolate({
                                        inputRange: opacityInputRange,
                                        outputRange: [1, 1, 1, 0]
                                    })
                                    return <TouchableOpacity style={[styles.latestItem, { opacity, transform: [{ scale }] }]}
                                        onPress={() => {
                                            pressHorse(item)
                                        }}
                                    >
                                        <ListItem.CheckBox
                                        containerStyle={{top: '3.5%', right: '15%'}}
                                            checked={checkBoxHorseSelection.checked.includes(item.HORSE_ID)}
                                            checkedIcon='circle'
                                            uncheckedIcon='circle'
                                            center={true}
                                            checkedColor='rgba(149, 162, 209, 4)'
                                            uncheckedColor='#EAEAEC'
                                            onPress={() => {
                                                pressHorse(item);
                                            }} />
                                        <Image style={styles.image}
                                            source={{ uri: item.IMAGE }}
                                            resizeMode="cover"
                                        />
                                        <View style={{ flexDirection: 'column' }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={[styles.textStyle2]}>Horse: </Text>

                                                <Text style={styles.textStyle}>
                                                    {item.HORSE_NAME}
                                                </Text>
                                            </View>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={[styles.textStyle2]}>Sire: </Text>

                                                <Text style={styles.textStyle}>
                                                    {item.FATHER_NAME}
                                                </Text>
                                            </View>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={[styles.textStyle2]}>Mare: </Text>
                                                <Text style={styles.textStyle}>
                                                    {item.MOTHER_NAME}
                                                </Text>
                                            </View>

                                        </View>

                                    </TouchableOpacity>
                                }}
                                keyExtractor={item => item.HORSE_ID.toString()}
                            />


                        </>

                        :
                        null
                    }

                    {loader ?
                        <ActivityIndicator style={styles.Activity} size="large" color="rgba(52, 77, 169, 0.6)" />

                        : null}


                </View>
            </RBSheet>

            <Modal
                animationType="fade"
                transparent={true}
                visible={FullScreenVisible}>
                <View style={styles.centeredView}>
                    <View style={[styles.FullScreenContainer]}>
                        <View style={{ width: '100%', justifyContent: 'flex-end' }}>
                            <TouchableOpacity
                                style={{ padding: 10 }}
                                onPress={() => {
                                    setFullScreenVisible(false);
                                }}>
                                <Icon name="times" size={26} color="silver" />
                            </TouchableOpacity>
                        </View>

                        <Image
                            style={{ height: 200, width: '95%', resizeMode: 'contain', justifyContent: 'center' }}
                            source={{ uri: getImageURL }}
                        />
                    </View>
                </View>
            </Modal>

            <View
                style={styles.AddingHorseButtonContainer}>
                <TouchableOpacity
                    onPress={() => {
                        BottomSheetLong.current.open();
                    }}
                    style={styles.AddingHorseButton}>
                    <Feather name="plus" size={20} color="#fff" style={{ alignSelf: 'center', marginRight: 10 }} />

                    <Text style={styles.AddingHorseButtonText}>Add Horse</Text>


                </TouchableOpacity>
            </View>

            <ScrollView>

                <ScrollView horizontal={true}>
                    <DataTable>

                        <DataTable.Header removeClippedSubviews={true}>
                            <DataTable.Title >Image</DataTable.Title>
                            <DataTable.Title style={{ marginLeft: 90 }}>Name</DataTable.Title>
                            <DataTable.Title style={{ marginLeft: 90 }}>Class</DataTable.Title>
                            <DataTable.Title style={{ marginLeft: 30 }}>Point</DataTable.Title>
                            <DataTable.Title style={{ marginLeft: 30 }}>Earning</DataTable.Title>
                            <DataTable.Title style={{ marginLeft: 30 }}>Fam</DataTable.Title>
                            <DataTable.Title style={{ marginLeft: 30 }}>Color</DataTable.Title>
                            <DataTable.Title style={{ marginLeft: 30 }}>Sire</DataTable.Title>
                            <DataTable.Title style={{ marginLeft: 70 }}>Dam</DataTable.Title>
                            <DataTable.Title style={{ marginLeft: 30 }}>Birth D.</DataTable.Title>
                            <DataTable.Title style={{ marginLeft: 30 }}>Start</DataTable.Title>
                            <DataTable.Title style={{ marginLeft: 40 }}>1st</DataTable.Title>
                            <DataTable.Title style={{ marginLeft: 40 }}>1st %</DataTable.Title>
                            <DataTable.Title style={{ marginLeft: 40 }}>2nd</DataTable.Title>
                            <DataTable.Title style={{ marginLeft: 40 }}>2nd %</DataTable.Title>
                            <DataTable.Title style={{ marginLeft: 40 }}>3rd</DataTable.Title>
                            <DataTable.Title style={{ marginLeft: 60 }}>3rd %</DataTable.Title>
                            <DataTable.Title style={{ marginLeft: 30 }}>4th</DataTable.Title>
                            <DataTable.Title style={{ marginLeft: 50 }}>4th %</DataTable.Title>
                            <DataTable.Title style={{ marginLeft: 30 }}>Price</DataTable.Title>
                            <DataTable.Title style={{ marginLeft: 30 }}>Dr. RM</DataTable.Title>
                            <DataTable.Title style={{ marginLeft: 30 }}>ANZ</DataTable.Title>
                            <DataTable.Title style={{ marginLeft: 30 }}>PedigreeAll</DataTable.Title>
                            <DataTable.Title style={{ marginLeft: 30 }}>Owner</DataTable.Title>
                            <DataTable.Title style={{ marginLeft: 50 }}>Breeder</DataTable.Title>
                            <DataTable.Title style={{ marginLeft: 80 }}>Coach</DataTable.Title>
                            <DataTable.Title style={{ marginLeft: 50 }}>Dead</DataTable.Title>
                            <DataTable.Title style={{ marginLeft: 10 }}>Update D.</DataTable.Title>
                        </DataTable.Header>

                        <>

                            {LoadingForCompareHorses ?

                                <ActivityIndicator size="large" color="#000" />
                                :
                                <>
                                    {getHorseCompareListData !== undefined &&

                                        <>
                                            {getHorseCompareListData.map((item, index) => (

                                                <DataTable.Row centered={true} key={index}>
                                                    <DataTable.Cell onPress={() => {
                                                        setImageURL(item.IMAGE)
                                                        setFullScreenVisible(true)
                                                    }} style={{ width: 145,  bottom: '25%'}}>
                                                        <Image style={{ width: 100, resizeMode: 'contain'}} source={{ uri: item.IMAGE }} />
                                                    </DataTable.Cell>
                                                    <DataTable.Cell onPress={() => { alert(item.HORSE_NAME) }} style={{ width: 100, height: 'auto' }}>{item.HORSE_NAME}</DataTable.Cell>

                                                    <DataTable.Cell onPress={() => { alert(item.HORSE_NAME) }} style={{ marginLeft: 15, width: 80, justifyContent: 'center' }}>{item.WINNER_TYPE_OBJECT.WINNER_TYPE_EN}</DataTable.Cell>

                                                    <DataTable.Cell onPress={() => { alert(item.HORSE_NAME) }} style={{ marginLeft: 0, width: 80, justifyContent: 'center' }} >{item.POINT}</DataTable.Cell>
                                                    <DataTable.Cell style={{ marginLeft: 0, width: 80, justifyContent: 'center' }} >{item.EARN} {item.EARN_ICON}</DataTable.Cell>
                                                    <DataTable.Cell onPress={() => { alert(item.HORSE_NAME) }} style={{ marginLeft: 0, width: 70, justifyContent: 'center' }} >{item.FAMILY_TEXT}</DataTable.Cell>
                                                    <DataTable.Cell style={{ marginLeft: 0, width: 80, justifyContent: 'center' }}>{item.COLOR_TEXT}</DataTable.Cell>
                                                    <DataTable.Cell onPress={() => { alert(item.HORSE_NAME) }} style={{ width: 100, height: 'auto', marginLeft: 20 }}>{item.FATHER_NAME}</DataTable.Cell>
                                                    <DataTable.Cell onPress={() => { alert(item.HORSE_NAME) }} style={{ width: 100, height: 'auto', marginLeft: 20 }}>{item.MOTHER_NAME}</DataTable.Cell>
                                                    <DataTable.Cell onPress={() => { alert(item.HORSE_NAME) }} style={{ marginLeft: 15, width: 80, justifyContent: 'center' }}>{item.HORSE_BIRTH_DATE_TEXT}</DataTable.Cell>
                                                    <DataTable.Cell onPress={() => { alert(item.HORSE_NAME) }} style={{ marginLeft: 0, width: 80, justifyContent: 'center' }} >{item.START_COUNT}</DataTable.Cell>
                                                    <DataTable.Cell onPress={() => { alert(item.HORSE_NAME) }} style={{ marginLeft: 0, width: 80, justifyContent: 'center' }} >{item.FIRST}</DataTable.Cell>
                                                    <DataTable.Cell onPress={() => { alert(item.HORSE_NAME) }} style={{ marginLeft: 0, width: 80, justifyContent: 'center' }} >{item.FIRST_PERCENTAGE} %</DataTable.Cell>
                                                    <DataTable.Cell onPress={() => { alert(item.HORSE_NAME) }} style={{ marginLeft: 0, width: 80, justifyContent: 'center' }} >{item.SECOND}</DataTable.Cell>
                                                    <DataTable.Cell onPress={() => { alert(item.HORSE_NAME) }} style={{ marginLeft: 0, width: 80, justifyContent: 'center' }}>{item.SECOND_PERCENTAGE} %</DataTable.Cell>
                                                    <DataTable.Cell onPress={() => { alert(item.HORSE_NAME) }} style={{ marginLeft: 0, width: 80, justifyContent: 'center' }} >{item.THIRD}</DataTable.Cell>
                                                    <DataTable.Cell onPress={() => { alert(item.HORSE_NAME) }} style={{ marginLeft: 0, width: 80, justifyContent: 'center' }} >{item.THIRD_PERCENTAGE} %</DataTable.Cell>
                                                    <DataTable.Cell onPress={() => { alert(item.HORSE_NAME) }} style={{ marginLeft: 0, width: 80, justifyContent: 'center' }}>{item.FOURTH}</DataTable.Cell>
                                                    <DataTable.Cell onPress={() => { alert(item.HORSE_NAME) }} style={{ marginLeft: 0, width: 80, justifyContent: 'center' }}>{item.FOURTH_PERCENTAGE} %</DataTable.Cell>
                                                    <DataTable.Cell onPress={() => { alert(item.HORSE_NAME) }} style={{ marginLeft: 0, width: 80, justifyContent: 'center' }} >{item.PRICE} {item.PRICE_ICON}</DataTable.Cell>
                                                    <DataTable.Cell onPress={() => { alert(item.HORSE_NAME) }} style={{ marginLeft: 0, width: 80, justifyContent: 'center' }}>{item.RM}</DataTable.Cell>
                                                    <DataTable.Cell onPress={() => { alert(item.HORSE_NAME) }} style={{ marginLeft: 0, width: 80, justifyContent: 'center' }}>{item.ANZ}</DataTable.Cell>
                                                    <DataTable.Cell onPress={() => { alert(item.HORSE_NAME) }} style={{ marginLeft: 0, width: 80, justifyContent: 'center' }}>{item.PA}</DataTable.Cell>
                                                    <DataTable.Cell onPress={() => { alert(item.HORSE_NAME) }} style={{ width: 100, height: 'auto', marginLeft: 20 }}>{item.OWNER}</DataTable.Cell>
                                                    <DataTable.Cell onPress={() => { alert(item.HORSE_NAME) }} style={{ width: 100, height: 'auto', marginLeft: 20 }}>{item.BREEDER}</DataTable.Cell>
                                                    <DataTable.Cell onPress={() => { alert(item.HORSE_NAME) }} style={{ width: 100, height: 'auto', marginLeft: 20 }}>{item.COACH}</DataTable.Cell>
                                                    {item.IS_DEAD ?
                                                        <>

                                                            <DataTable.Cell onPress={() => { alert(item.HORSE_NAME) }} style={{ marginLeft: 0, width: 80, justifyContent: 'center' }}>DEAD</DataTable.Cell>

                                                        </>
                                                        :
                                                        <>

                                                            <DataTable.Cell onPress={() => { alert(item.HORSE_NAME) }} style={{ marginLeft: 0, width: 80, justifyContent: 'center' }}>ALIVE</DataTable.Cell>

                                                        </>
                                                    }
                                                    <DataTable.Cell onPress={() => { alert(item.HORSE_NAME) }} style={{ marginLeft: 0, width: 80, justifyContent: 'center' }}>{item.EDIT_DATE_TEXT}</DataTable.Cell>
                                                </DataTable.Row>

                                            ))}
                                        </>
                                    }
                                </>
                            }

                        </>

                    </DataTable>
                </ScrollView>

            </ScrollView>
        </View>

    )
}
export default CompareHorses;
const styles = StyleSheet.create({
    Container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff'
    },
    Activity: {
        top: '30%', shadowColor: "#000",
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
    textStyle2: {
        left: 5,
        fontSize: 13,
        fontWeight: 'bold'
    },
    textStyle: {
        left: 5,

        fontSize: 12
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginRight: 10,
    },
    AddingHorseButtonContainer: {
        width: '100%',
        padding: 10,
        paddingLeft: 15,
        alignItems: 'flex-start'
    },
    AddingHorseButton: {
        flexDirection: 'row',
        backgroundColor: 'rgba(149, 162, 209, 4)',
        padding: 10,
        borderRadius: 6,
        elevation: 10,
        width: '35%'
    },
    AddingHorseButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '700',
        textAlign: 'center'
    },
    SwipableCloseIcon: {
        flexDirection: 'row',
        backgroundColor: '#B0D08A',
        padding: 10,
        borderRadius: 6,
        width: '25%',
        height: '5.6%',
        marginLeft: 'auto',
        right: '1.5%'
    },
    ErrorMessageContainer: {
        width: '100%',
        height: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    ErrorMessageTitle: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#222'
    },
    ErrorMessageText: {
        fontSize: 16,
        color: '#c7c1c1',
        textAlign: 'center',
        marginTop: 5
    },
    ErrorMessageButtonContainer: {
        width: '80%',
        marginTop: 40,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    ErrorMessageButton: {
        backgroundColor: 'rgb(232, 237, 241)',
        width: '40%',
        padding: 10,
        borderRadius: 8
    },
    ErrorMessageButtonText: {
        textAlign: 'center',
        color: '#2169ab',
        fontSize: 14,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 0,
        backgroundColor: '#6c6c6ca8'
    },
    FullScreenContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        shadowColor: "#000",
    },
    flatList: {
        paddingBottom: 20,
        paddingTop: 8,
        borderTopWidth: 0.5,
        borderTopColor: '#CFCFD5',
        marginTop: 10,
        marginLeft: -15,
        maxHeight: Dimensions.get('screen').height / 2.2,

    },
    flatList2: {
        paddingBottom: 20,
        paddingTop: 10,
        marginTop: 35,
        marginLeft: 15,
        bottom: 45,
        maxHeight: Dimensions.get('screen').height / 1.41,

    },
    item: {
        flexDirection: 'row',
        width: 360,
        left: -15,
        padding: 10,
        marginVertical: 7,
        marginHorizontal: 16,
        zIndex: 1,
        borderBottomWidth: 0.5,
        borderBottomColor: '#d6d3d3',

    },
    title: {
        fontSize: 32,
    },
    latestItem: {
        flexDirection: 'row',
        width: 360,
        left: -10,
        padding: 10,
        marginVertical: 7,
        marginHorizontal: 16,
        zIndex: 1,
        borderBottomWidth: 0.5,
        borderBottomColor: '#d6d3d3',
    },
})