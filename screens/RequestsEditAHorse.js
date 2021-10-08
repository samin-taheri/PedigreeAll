import React, { useRef, useState } from 'react'
import { View, Alert, StyleSheet, FlatList, StatusBar, ScrollView, TouchableOpacity, Dimensions, Text, Image, TextInput, ActivityIndicator, Platform, Switch, SafeAreaView, Keyboard } from 'react-native'
import { SearchBar, ListItem } from "react-native-elements";
import RBSheet from "react-native-raw-bottom-sheet";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from "react-native-vector-icons/FontAwesome5";
import Flag from "react-native-flags";
import { Global } from './Global';
import { Ionicons } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import InputSpinner from "react-native-input-spinner";
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import Myloader from '../constants/Myloader';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome';
import MyHeader from '../component/MyHeader';
import * as ImagePicker from 'expo-image-picker';
import MyButtonWhite from '../component/MyButtonWhite';
import MyButton from '../component/MyButton';
import MyButtonEditDelete from '../component/MyButtonEditDelete';

const RomanMillerData = [
    {
        id: "1",
        title: "B",
    },
    {
        id: "2",
        title: "I",
    },
    {
        id: "3",
        title: "C",
    },
    {
        id: "4",
        title: "S",
    },
    {
        id: "5",
        title: "P",
    },
]


export function RequestsEditAHorse({ navigation }) {
    const list = [
        {
            name: 'Amy Farha',
            subtitle: 'Vice President'
        },
        {
            name: 'Chris Jackson',
            avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
            subtitle: 'Vice Chairman'
        },
    ]
    const BottomSheetLong = React.useRef();
    const BottomSheetRef = useRef();

    const [searchText, setSearchText] = React.useState("");
    const [searchValue, setSearchValue] = React.useState("")
    const [showEdition, setShowEdition] = React.useState(false)
    const bottomSheet = useRef();

    const [getHorseGetByName, setHorseGetByName] = React.useState([]);
    const [getHorseGetByName2, setHorseGetByName2] = React.useState([]);

    const [getHorseGetByIDForUpdate, setHorseGetByIDForUpdate] = React.useState([]);

    const [getFamily, setFamily] = React.useState([]);

    const [sexList, setSexList] = useState([])
    const [WinnerTypeList, setWinnerTypeList] = useState([])
    const [CurrencyTypeList, setCurrencyList] = useState([])
    const [isEarning, setEarning] = useState(false)
    const [CounrtyList, setCountryList] = useState([])
    const [ColorList, setColorList] = useState([])
    const [BottomSheet, setBottomSheet] = useState()
    const [loader, setLoader] = React.useState(false)
    const [loaderText, setLoaderText] = React.useState("Lütfen Bekleyin..")
    const [getOwnerBreederName, setOwnerBreederName] = React.useState("")
    const [getCoachBreederOwner, setCoachBreederOwner] = React.useState("");
    const [getOwnerText, setOwnerText] = React.useState('Owner');
    const [getBreederText, setBreederText] = React.useState('Breeder')
    const [getCoachText, setCoachText] = React.useState('Coach')
    const [isLoading, SetisLoading] = React.useState(true);

    const [getFatherName, setFatherName] = React.useState("");
    const [getMotherName, setMotherName] = React.useState("");
    const toggleSwitch = () => setDeadCheckBox(previousState => !previousState);
    const [DeadCheckBox, setDeadCheckBox] = React.useState(false)

    const [getHorseID, setHorseID] = React.useState(0);
    const [getHorseNameForUpdate, setHorseNameForUpdate] = React.useState("");
    const [getHorseBirthDate, setHorseBirthDate] = React.useState(new Date())
    const [getRef1, setRef1] = React.useState(0);
    const [getRef2, setRef2] = React.useState(0);
    const [getEarn, setEarn] = React.useState("");
    const [getPrice, setPrice] = React.useState("");
    const [getOwner, setOwner] = React.useState("");
    const [getBreeder, setBreeder] = React.useState("");
    const [getCoach, setCoach] = React.useState("");
    const [getHeader, setHeader] = React.useState("");
    const [getInfo, setInfo] = React.useState("");
    const [getStartCount, setStartCount] = React.useState(0);
    const [getFirst, setFirst] = React.useState(0);
    const [getSecond, setSecond] = React.useState(0);
    const [getThird, setThird] = React.useState(0);
    const [getFourth, setFourth] = React.useState(0);
    const [getImage, setImage] = React.useState("");
    const [getB, setB] = React.useState(0);
    const [getI, setI] = React.useState(0);
    const [getC, setC] = React.useState(0);
    const [getS, setS] = React.useState(0);
    const [getP, setP] = React.useState(0);
    const [getRmB, setRmB] = React.useState(0);
    const [getRmI, setRmI] = React.useState(0);
    const [getRmC, setRmC] = React.useState(0);
    const [getRmS, setRmS] = React.useState(0);
    const [getRmP, setRmP] = React.useState(0);
    const [getAnzB, setAnzB] = React.useState(0);
    const [getAnzI, setAnzI] = React.useState(0);
    const [getAnzC, setAnzC] = React.useState(0);
    const [getAnzS, setAnzS] = React.useState(0);
    const [getAnzP, setAnzP] = React.useState(0);

    const [getFatherID, setFatherID] = React.useState(0);
    const [getMotherID, setMotherID] = React.useState(0);
    const [getSexID, setSexID] = React.useState(1);
    const [getCountryID, setCountryID] = React.useState(0);
    const [getEarnCurrencyID, setEarnCurrencyID] = React.useState(0)
    const [getPriceCurrencyID, setPriceCurrencyID] = React.useState(0)
    const [getOwnerSystemUserID, setOwnerSystemUserID] = React.useState(0)
    const [getBreederSystemUserID, setBreederSystemUserID] = React.useState(0)
    const [getCoachSystemUserID, setCoachSystemUserID] = React.useState(0)
    const [getWinnerTypeID, setWinnerTypeID] = React.useState(0)
    const [getFamilyID, setFamilyID] = React.useState(0)
    const [getColorID, setColorID] = React.useState(0)

    const [SireMareHorseData, setSireMareHorseData] = React.useState([]);
    const [SireMareHorseName, setSireMareHorseName] = React.useState("");
    const [getOwnerBreederData, setOwnerBreederData] = React.useState([]);

    const [checkStateMultiRM, setcheckStateMultiRM] = React.useState({ checked: [] });
    const [checkStateMultiANZ, setcheckStateMultiANZ] = React.useState({ checked: [] });
    const [checkStateMultiPA, setcheckStateMultiPA] = React.useState({ checked: [] });

    const [SireData, setSireData] = React.useState([]);
    const [MareData, setMareData] = React.useState([]);
    const [SireText, setSireText] = React.useState("Sire");
    const [MareText, setMareText] = React.useState("Mare");

    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [Data, SetData] = useState([]);
    const itemWidth = 360;
    const separatorWidth = 32;
    const totalItemWidth = itemWidth + separatorWidth;
    const [imageList, setImagelist] = useState([]);
    const [photo, setPhoto] = React.useState(null);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || getHorseBirthDate;
        setShow(Platform.OS === 'ios');
        setHorseBirthDate(new Date(currentDate))


    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };
    const pressRM = item => {   // The onPress method
        const { checked } = checkStateMultiRM;
        // These ensures that multiple checkboxes don't all get affected when one is clicked
        if (!checked.includes(item.title)) {
            setcheckStateMultiRM({ checked: [...checked, item.title] });
        } else {
            setcheckStateMultiRM({ checked: checked.filter(a => a !== item.title) });
        }
    }

    const pressANZ = item => {   // The onPress method
        const { checked } = checkStateMultiANZ;
        // These ensures that multiple checkboxes don't all get affected when one is clicked
        if (!checked.includes(item.title)) {
            setcheckStateMultiANZ({ checked: [...checked, item.title] });
        } else {
            setcheckStateMultiANZ({ checked: checked.filter(a => a !== item.title) });
        }
    }

    const pressPA = item => {   // The onPress method
        const { checked } = checkStateMultiPA;
        // These ensures that multiple checkboxes don't all get affected when one is clicked
        if (!checked.includes(item.title)) {
            setcheckStateMultiPA({ checked: [...checked, item.title] });
        } else {
            setcheckStateMultiPA({ checked: checked.filter(a => a !== item.title) });
        }
    }
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
        });


        if (!result.cancelled) {
            setImagelist([])
            var fromList = [];
            fromList = imageList;
            var isHas = fromList.every(item => item.uri == result.uri);
            fromList.push(result);
            for (let index = 0; index < fromList.length; index++) {
                fromList[index].key = index;
            }
            setImagelist(fromList)
        }
    };


    const saveImage = async () => {
        const fromData = new FormData();
        imageList.map(item => {

            let filename = item.uri.substring(item.uri.lastIndexOf('/') + 1, item.uri.length)
            fromData.append("file", {
                name: filename,
                type: item.type,
                uri: Platform.OS === "android" ? item.uri : item.uri.replace("file://", "")
            });
        })

        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                fetch('https://api.pedigreeall.com/File/Horse?Race_Id=1', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data; ',
                        'Authorization': "Basic " + token,
                    },
                    body: fromData
                })
                    .then((response) => response.json())
                    .then((json) => {
                        console.log(json)


                        readAddAHorse(json)
                    })
                    .catch((error) => {
                        console.log('error', error);
                    })
            }
            else {
                console.log("Basarisiz")
            }
        } catch (e) {
        }

    }

    const readHorseGetByName = async () => {

        let isMounted = true;
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                fetch('https://api.pedigreeall.com/Horse/GetByName', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
                    body: JSON.stringify({
                        ID: 1,
                        NAME: searchText,
                    })

                })
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
                                IMAGE: i.IMAGE,
                            })
                        ))
                        SetData(aa)
                        setLoader(false)
                        setHorseGetByName(json.m_cData)

                        setSireMareHorseData(json.m_cData)
                        SetisLoading(false)

                        saveImage()

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

    const readHorseGetByName2 = async () => {

        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
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
                        setHorseGetByName2([])
                        setSireMareHorseData([])
                        setLoader(false)
                        setHorseGetByName2(json.m_cData)
                        setSireMareHorseData(json.m_cData)
                        SetisLoading(false)

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


    const readHorseGetByIdForUpdate = async (HorseID) => {

        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                fetch('https://api.pedigreeall.com/Horse/GetByIdForUpdate?p_iId=' + HorseID, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
                })
                    .then((response) => response.json())
                    .then((json) => {
                        setHorseGetByIDForUpdate(json.m_cData)

                        if (json.m_cData !== undefined) {
                            setHorseID(json.m_cData[0].HORSE_ID)
                            setHorseNameForUpdate(json.m_cData[0].HORSE_NAME)
                            setFatherID(json.m_cData[0].FATHER_OBJECT.HORSE_ID)
                            setMotherID(json.m_cData[0].MOTHER_OBJECT.HORSE_ID)

                            setFatherName(json.m_cData[0].FATHER_OBJECT.HORSE_NAME)
                            setMotherName(json.m_cData[0].MOTHER_OBJECT.HORSE_NAME)


                            setHorseBirthDate(new Date(json.m_cData[0].HORSE_BIRTH_DATE))
                            setRef1(json.m_cData[0].REF1)
                            setRef2(json.m_cData[0].REF2)
                            setEarn(json.m_cData[0].EARN)
                            setPrice(json.m_cData[0].PRICE)
                            setOwner(json.m_cData[0].OWNER)
                            setBreeder(json.m_cData[0].BREEDER)
                            setCoach(json.m_cData[0].COACH)
                            setHeader(json.m_cData[0].HEADER)
                            setInfo(json.m_cData[0].INFO)
                            setStartCount(json.m_cData[0].START_COUNT)
                            setFirst(json.m_cData[0].FIRST)
                            setSecond(json.m_cData[0].SECOND)
                            setThird(json.m_cData[0].THIRD)
                            setFourth(json.m_cData[0].FOURTH)
                            setImage(json.m_cData[0].IMAGE)
                            setB(json.m_cData[0].B)
                            setI(json.m_cData[0].I)
                            setC(json.m_cData[0].C)
                            setS(json.m_cData[0].S)
                            setP(json.m_cData[0].P)
                            setRmB(json.m_cData[0].RM_B)
                            setRmI(json.m_cData[0].RM_I)
                            setRmC(json.m_cData[0].RM_C)
                            setRmS(json.m_cData[0].RM_S)
                            setRmP(json.m_cData[0].RM_P)
                            setAnzB(json.m_cData[0].ANZ_B)
                            setAnzI(json.m_cData[0].ANZ_I)
                            setAnzC(json.m_cData[0].ANZ_C)
                            setAnzS(json.m_cData[0].ANZ_S)
                            setAnzP(json.m_cData[0].ANZ_P)


                            const paArray = []

                            if (json.m_cData[0].B === 1) {
                                paArray.push("B")
                            }
                            if (json.m_cData[0].I === 1) {
                                paArray.push("I")
                            }
                            if (json.m_cData[0].C === 1) {
                                paArray.push("C")
                            }
                            if (json.m_cData[0].S === 1) {
                                paArray.push("S")
                            }
                            if (json.m_cData[0].P === 1) {
                                paArray.push("P")
                            }
                            setcheckStateMultiPA({ checked: paArray })

                            const rmArray = []

                            if (json.m_cData[0].RM_B === 1) {
                                rmArray.push("B")
                            }
                            if (json.m_cData[0].RM_I === 1) {
                                rmArray.push("I")
                            }
                            if (json.m_cData[0].RM_C === 1) {
                                rmArray.push("C")
                            }
                            if (json.m_cData[0].RM_S === 1) {
                                rmArray.push("S")
                            }
                            if (json.m_cData[0].RM_P === 1) {
                                rmArray.push("P")
                            }
                            setcheckStateMultiRM({ checked: rmArray })


                            const anzArray = []

                            if (json.m_cData[0].ANZ_B === 1) {
                                anzArray.push("B")
                            }
                            if (json.m_cData[0].ANZ_I === 1) {
                                anzArray.push("I")
                            }
                            if (json.m_cData[0].ANZ_C === 1) {
                                anzArray.push("C")
                            }
                            if (json.m_cData[0].ANZ_S === 1) {
                                anzArray.push("S")
                            }
                            if (json.m_cData[0].ANZ_P === 1) {
                                anzArray.push("P")
                            }
                            setcheckStateMultiANZ({ checked: anzArray })



                            if (json.m_cData[0].IS_DEAD_OBJECT.BOOL_ID === 0) {
                                setDeadCheckBox(false)
                            }
                            else if (json.m_cData[0].IS_DEAD_OBJECT.BOOL_ID === 1) {
                                setDeadCheckBox(true)
                            }


                            setSexID(json.m_cData[0].SEX_OBJECT.SEX_ID)
                            setCountryID(json.m_cData[0].COUNTRY_OBJECT.COUNTRY_ID)
                            setEarnCurrencyID(json.m_cData[0].EARN_CURRENCY_OBJECT.CURRENCY_ID)
                            setPriceCurrencyID(json.m_cData[0].PRICE_CURRENCY_OBJECT.CURRENCY_ID)
                            setOwnerSystemUserID(json.m_cData[0].OWNER_OBJECT.SYSTEM_USER_ID)
                            setOwnerText(json.m_cData[0].OWNER_OBJECT.NAME + ' ' + json.m_cData[0].OWNER_OBJECT.SURNAME)
                            setCoachSystemUserID(json.m_cData[0].COACH_OBJECT.SYSTEM_USER_ID)
                            setCoachText(json.m_cData[0].COACH_OBJECT.NAME + ' ' + json.m_cData[0].COACH_OBJECT.SURNAME)

                            setBreederSystemUserID(json.m_cData[0].BREEDER_OBJECT.SYSTEM_USER_ID)
                            setBreederText(json.m_cData[0].BREEDER_OBJECT.NAME + ' ' + json.m_cData[0].BREEDER_OBJECT.SURNAME)

                            setWinnerTypeID(json.m_cData[0].WINNER_TYPE_OBJECT.WINNER_TYPE_ID)
                            setFamilyID(json.m_cData[0].FAMILY_OBJECT.FAMILY_ID)
                            setColorID(json.m_cData[0].COLOR_OBJECT.COLOR_ID)
                            setLoaderText('Lütfen Bekleyin..')

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
        } catch (e) {
        }
    }


    const readHorseSex = async () => {
        let isMounted = true;
        let isActive = true;
        setSexList([])
        try {
            const abortCtrl = new AbortController();
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {

                const opts = {
                    signal: abortCtrl.signal,
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
                };
                fetch('https://api.pedigreeall.com/Sex/Get', opts)
                    .then((response) => response.json())
                    .then((json) => {
                        var list = [];
                        json.m_cData.map(item => (
                            list.push({
                                label: item.SEX_EN,
                                value: item.SEX_ID,
                                key: item.SEX_ID.toString()

                            })
                        ))
                        if (isMounted) {
                            setSexList(json.m_cData)
                        }


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
        return () => { abortCtrl.abort(), isActive = false, isMounted = false };

    }


    const readCountry = async () => {
        setCountryList([])
        let isMounted = true;
        let isActive = true;
        try {
            const abortCtrl = new AbortController();
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {

                const opts = {
                    signal: abortCtrl.signal,
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
                };
                fetch('https://api.pedigreeall.com/Country/Get', opts)
                    .then((response) => response.json())
                    .then((json) => {
                        var list = [];
                        json.m_cData.map(item => (
                            list.push({
                                label: item.COUNTRY_EN,
                                value: item.COUNTRY_ID,
                                key: item.COUNTRY_ID.toString()

                            })
                        ))
                        if (isMounted) {
                            setCountryList(json.m_cData)
                        }


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
        return () => { abortCtrl.abort(), isActive = false, isMounted = false };

    }


    const readWinnerType = async () => {
        let isMounted = true;
        let isActive = true;
        setWinnerTypeList([])
        try {
            const abortCtrl = new AbortController();
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {

                const opts = {
                    signal: abortCtrl.signal,
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
                };
                fetch('https://api.pedigreeall.com/WinnerType/Get', opts)
                    .then((response) => response.json())
                    .then((json) => {
                        var list = [];
                        json.m_cData.map(item => (
                            list.push({
                                label: item.WINNER_TYPE_EN,
                                value: item.WINNER_TYPE_ID,
                                key: item.WINNER_TYPE_ID.toString()

                            })
                        ))
                        if (isMounted) {
                            setWinnerTypeList(json.m_cData)
                        }


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
        return () => { abortCtrl.abort(), isActive = false, isMounted = false };

    }




    const readCurrency = async () => {
        let isMounted = true;
        let isActive = true;
        setCurrencyList([])
        try {
            const abortCtrl = new AbortController();
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {

                const opts = {
                    signal: abortCtrl.signal,
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
                };
                fetch('https://api.pedigreeall.com/Currency/Get', opts)
                    .then((response) => response.json())
                    .then((json) => {
                        var list = [];
                        json.m_cData.map(item => (
                            list.push({
                                label: item.ICON,
                                value: item.CURRENCY_ID,
                                key: item.CURRENCY_ID.toString()

                            })
                        ))
                        if (isMounted) {
                            setCurrencyList(json.m_cData)
                        }


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
        return () => { abortCtrl.abort(), isActive = false, isMounted = false };

    }
    const readColor = async () => {
        let isMounted = true;
        let isActive = true;
        setColorList([])
        try {
            const abortCtrl = new AbortController();
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {

                const opts = {
                    signal: abortCtrl.signal,
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
                };
                fetch('https://api.pedigreeall.com/Color/Get', opts)
                    .then((response) => response.json())
                    .then((json) => {
                        var list = [];
                        json.m_cData.map(item => (
                            list.push({
                                label: item.COLOR_TEXT,
                                value: item.COLOR_ID,
                                key: item.COLOR_ID.toString()

                            })
                        ))
                        if (isMounted) {
                            setColorList(json.m_cData)
                        }


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
        return () => { abortCtrl.abort(), isActive = false, isMounted = false };

    }

    const readFamily = async () => {
        setFamily([])
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                fetch('https://api.pedigreeall.com/Family/Get?p_iRaceId=' + 1, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
                })
                    .then((response) => response.json())
                    .then((json) => {
                        setFamily(json.m_cData)
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

    const readGetOwnerBreeder = async () => {
        setOwnerBreederData([])
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                fetch('https://api.pedigreeall.com/SystemUser/GetOwnerBreederByName?p_sName=' + getOwnerBreederName, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
                })
                    .then((response) => response.json())
                    .then((json) => {
                        setOwnerBreederData(json.m_cData);
                        SetisLoading(false)
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

    const readUpdateAHorse = async () => {
        setLoader(true)
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                fetch('https://api.pedigreeall.com/Horse/Update', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
                    body: JSON.stringify({
                        "HORSE_ID": getHorseID,
                        "HORSE_NAME": getHorseNameForUpdate,
                        "FATHER_OBJECT": {
                            "HORSE_ID": getFatherID.toString()
                        },
                        "MOTHER_OBJECT": {
                            "HORSE_ID": getMotherID.toString()
                        },
                        "HORSE_BIRTH_DATE": moment(getHorseBirthDate).format('YYYY-MM-DD'),
                        "SEX_OBJECT": {
                            "SEX_ID": getSexID.toString()
                        },
                        "COUNTRY_OBJECT": {
                            "COUNTRY_ID": getCountryID
                        },
                        "PRICE": getPrice,
                        "PRICE_CURRENCY_OBJECT": {
                            'CURRENCY_ID': getPriceCurrencyID.toString()
                        },
                        "OWNER_OBJECT": {
                            "SYSTEM_USER_ID": getOwnerSystemUserID.toString()
                        },
                        "OWNER": getOwner,
                        "BREEDER_OBJECT": {
                            "SYSTEM_USER_ID": getBreederSystemUserID.toString()
                        },
                        "BREEDER": getBreeder,
                        "COACH_OBJECT": {
                            "SYSTEM_USER_ID": getCoachSystemUserID.toString()
                        },
                        "COACH": getCoach,
                        "HEADER": getHeader,
                        "INFO": getInfo,
                        "START_COUNT": getStartCount,
                        "FIRST": getFirst,
                        "SECOND": getSecond,
                        "THIRD": getThird,
                        "FOURTH": getFourth,
                        "IS_DEAD_OBJECT": {
                            "BOOL_ID": DeadCheckBox ? 1 : 0
                        },
                        "WINNER_TYPE_OBJECT": {
                            "WINNER_TYPE_ID": getWinnerTypeID.toString()
                        },
                        "REF1": getRef1,
                        "REF2": getRef2,
                        "EARN": getEarn,
                        "EARN_CURRENCY_OBJECT": {
                            'CURRENCY_ID': getEarnCurrencyID.toString()
                        },
                        "IMAGE": getImage,
                        "B": getB,
                        "I": getI,
                        "C": getC,
                        "S": getS,
                        "P": getP,
                        "RM_B": getRmB,
                        "RM_I": getRmI,
                        "RM_C": getRmC,
                        "RM_S": getRmS,
                        "RM_P": getRmP,
                        "ANZ_B": getAnzB,
                        "ANZ_I": getAnzI,
                        "ANZ_C": getAnzC,
                        "ANZ_S": getAnzS,
                        "ANZ_P": getAnzP,
                        "RACE_ID": 1,
                        "FAMILY_OBJECT": {
                            "FAMILY_ID": getFamilyID.toString()
                        },
                        "COLOR_OBJECT": {
                            "COLOR_ID": getColorID.toString()
                        },
                    })
                })
                    .then((response) => response.json())
                    .then((json) => {

                        if (json.m_eProcessState === 1) {

                            setSearchText("");
                            setSearchValue("")
                            setShowEdition(false)

                            setHorseGetByName([]);
                            setHorseGetByIDForUpdate([]);

                            setFamily([]);

                            setSexList([])
                            setWinnerTypeList([])
                            setCurrencyList([])
                            setEarning(false)
                            setCountryList([])
                            setColorList([])
                            setBottomSheet()
                            setLoader(false)
                            setLoaderText("Lütfen Bekleyin..")
                            setOwnerBreederName("")
                            setCoachBreederOwner("");
                            setOwnerText('Owner');
                            setBreederText('Breeder')
                            setCoachText('Coach')
                            SetisLoading(true);

                            setFatherName("");
                            setMotherName("");
                            setDeadCheckBox(false)
                            setHorseID(0);
                            setHorseNameForUpdate("");
                            setHorseBirthDate(new Date())
                            setRef1(0);
                            setRef2(0);
                            setEarn("");
                            setPrice("");
                            setOwner("");
                            setBreeder("");
                            setCoach("");
                            setHeader("");
                            setInfo("");
                            setStartCount(0);
                            setFirst(0);
                            setSecond(0);
                            setThird(0);
                            setFourth(0);
                            setImage("");
                            setB(0);
                            setI(0);
                            setC(0);
                            setS(0);
                            setP(0);
                            setRmB(0);
                            setRmI(0);
                            setRmC(0);
                            setRmS(0);
                            setRmP(0);
                            setAnzB(0);
                            setAnzI(0);
                            setAnzC(0);
                            setAnzS(0);
                            setAnzP(0);


                            setSireData([]);
                            setMareData([]);
                            setSireText("Sire");
                            setMareText("Mare");

                            setFatherID([]);
                            setMotherID([]);
                            setSexID(1);
                            setCountryID(0);
                            setEarnCurrencyID(0)
                            setPriceCurrencyID(0)
                            setOwnerSystemUserID(0)
                            setBreederSystemUserID(0)
                            setCoachSystemUserID(0)
                            setWinnerTypeID(0)
                            setFamilyID(0)
                            setColorID(0)

                            setSireMareHorseData([]);
                            setSireMareHorseName("");
                            setOwnerBreederData([]);

                        }
                        setLoader(false)

                        navigation.navigate('Result', {
                            res: JSON.stringify(json)
                        })


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

    const [getSearchPlaceholder, setSearchPlaceholder] = React.useState("")
    const [getEditButtonName, setEditButtonName] = React.useState("")
    const [getFirstPlaceholder, setFirstPlaceholder] = React.useState("")
    const [getSecondPlaceholder, setSecondPlaceholder] = React.useState("")
    const [getThirdPlaceholder, setThirdPlaceholder] = React.useState("")
    const [getFourthPlaceholder, setFourthPlaceholder] = React.useState("")
    const [getStartPlaceholder, setStartPlaceholder] = React.useState("")
    const [getEarningPlaceholder, setEarningPlaceholder] = React.useState("")
    const [getPricePlaceholder, setPricePlaceholder] = React.useState("")
    const [getHeaderPlaceholder, setHeaderPlaceholder] = React.useState("")
    const [getParagraphPlaceholder, setParagraphPlaceholder] = React.useState("")
    const [getDeadCheckName, setDeadCheckName] = React.useState("")
    const isMountedRef = useRef(null);

    React.useEffect(() => {
        let isActive = true;
        let isMounted = true;
        const abortCtrl = new AbortController();
        if (isMounted) {

            setSearchText("");
            setSearchValue("")
            setHorseGetByName("");
            readHorseSex();
            readCountry();
            readWinnerType()
            readCurrency();
            readColor()
            readFamily()
            readGetOwnerBreeder();
            readHorseGetByIdForUpdate();

        }

        if (Global.Language === 1) {
            setSearchPlaceholder("Lütfen isim giriniz ve ara butonuna basınız .. ")
            setEditButtonName("Ara")
            setFirstPlaceholder("1'incilik Sayısı")
            setSecondPlaceholder("2'ncilik Sayısı")
            setThirdPlaceholder("3'üncülük Sayısı")
            setFourthPlaceholder("3'üncülük Sayısı")
            setStartPlaceholder("Toplam Yarış Sayısı")
            setEarningPlaceholder("Kazanç")
            setPricePlaceholder("Fiyat")
            setHeaderPlaceholder("Başlık")
            setParagraphPlaceholder("Paragraf")
            setDeadCheckName("Ölü")
        }
        else {
            setSearchPlaceholder("Please type here and press enter .. ")
            setEditButtonName("Search")
            setFirstPlaceholder("First Place")
            setSecondPlaceholder("Second Place")
            setThirdPlaceholder("Third Place")
            setFourthPlaceholder("Fourth Place")
            setStartPlaceholder("Starts")
            setEarningPlaceholder("Earning")
            setPricePlaceholder("Price")
            setHeaderPlaceholder("Header")
            setParagraphPlaceholder("Paragraph")
            setDeadCheckName("Dead")
        }
        return () => { abortCtrl.abort(), isActive = false, isMounted = false };
    }, [])

    return (
        <View>
            <Myloader Show={loader} Text={loaderText} />

            <View style={styles.container}>
                <MyHeader Title="Edit A Horse"
                    onPress={() => navigation.goBack()}
                >
                    {/*
                    <RBSheet
                        hasDraggableIcon={true}
                        ref={BottomSheetLong}
                        height={Dimensions.get('window').height - 50}
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
                    */}

                    {/*
                    </RBSheet>*/}
                    <RBSheet
                        ref={BottomSheetRef}
                        closeOnDragDown={true}
                        closeOnPressMask={true}
                        height={Dimensions.get('window').height - 100}
                        customStyles={{
                            container: {
                                borderTopLeftRadius: 10,
                                borderTopRightRadius: 10
                            }
                        }}

                    >

                        <View>
                            {(BottomSheet === "SexList" &&
                                <View>
                                    {sexList !== undefined &&
                                        <ScrollView

                                            scrollEnabled={true}

                                            showsVerticalScrollIndicator={true}
                                        >

                                            {sexList.filter((x) => x.SEX_EN).map(
                                                (item, i) => (
                                                    <ListItem
                                                        key={i}
                                                        bottomDivider
                                                        button
                                                        onPress={() => {

                                                            //console.log(item.SEX_EN)
                                                            setSexID(item.SEX_ID)
                                                            BottomSheetRef.current.close();
                                                        }} >
                                                        <ListItem.Content>
                                                            <ListItem.Title>{item.SEX_EN}</ListItem.Title>
                                                        </ListItem.Content>
                                                        <ListItem.Chevron />
                                                    </ListItem>
                                                ))}
                                        </ScrollView>
                                    }
                                </View>
                            )
                                || (BottomSheet === "WinnerList" &&
                                    <View>
                                        {WinnerTypeList !== undefined &&
                                            <ScrollView>
                                                {WinnerTypeList.filter((x) => x.WINNER_TYPE_EN).map(
                                                    (item, i) => (
                                                        <ListItem
                                                            key={i}
                                                            bottomDivider
                                                            button
                                                            onPress={() => {
                                                                setWinnerTypeID(item.WINNER_TYPE_ID)
                                                                BottomSheetRef.current.close()
                                                            }} >
                                                            <ListItem.Content>
                                                                <ListItem.Title>{item.WINNER_TYPE_EN}</ListItem.Title>
                                                            </ListItem.Content>
                                                            <ListItem.Chevron />
                                                        </ListItem>
                                                    ))}
                                            </ScrollView>
                                        }
                                    </View>
                                )
                                || (BottomSheet === "CurrencyList" &&
                                    <View>
                                        {CurrencyTypeList !== undefined &&
                                            <ScrollView>
                                                {CurrencyTypeList.map(
                                                    (item, i) => (
                                                        <ListItem
                                                            key={i}
                                                            bottomDivider
                                                            button
                                                            onPress={() => {
                                                                if (isEarning === true) {
                                                                    setEarnCurrencyID(item.CURRENCY_ID)
                                                                }
                                                                else if (isEarning === false) {
                                                                    setPriceText(item.ICON)
                                                                    setPriceCurrencyID(item.CURRENCY_ID)
                                                                }
                                                                BottomSheetRef.current.close()
                                                            }} >
                                                            <ListItem.Content>
                                                                <ListItem.Title>{item.ICON}</ListItem.Title>
                                                            </ListItem.Content>
                                                            <ListItem.Chevron />
                                                        </ListItem>
                                                    ))}
                                            </ScrollView>
                                        }
                                    </View>
                                )
                                || (BottomSheet === "CountryList" &&
                                    <View>
                                        {CounrtyList !== undefined &&
                                            <ScrollView>
                                                {CounrtyList.filter((x) => x.COUNTRY_EN).map(
                                                    (item, i) => (
                                                        <ListItem
                                                            key={i}
                                                            bottomDivider
                                                            button
                                                            onPress={() => {
                                                                setCountryID(item.COUNTRY_ID)
                                                                BottomSheetRef.current.close()
                                                            }} >
                                                            <Flag code={item.ICON.toUpperCase()} size={24} />
                                                            <ListItem.Content>
                                                                <ListItem.Title>{item.COUNTRY_EN}</ListItem.Title>
                                                            </ListItem.Content>
                                                            <ListItem.Chevron />
                                                        </ListItem>
                                                    ))}
                                            </ScrollView>
                                        }
                                    </View>
                                )
                                || (BottomSheet === "ColorList" &&
                                    <View>
                                        {ColorList !== undefined &&
                                            <ScrollView>
                                                {ColorList.filter((x) => x.COLOR_TEXT).map(
                                                    (item, i) => (
                                                        <ListItem
                                                            key={i}
                                                            bottomDivider
                                                            button
                                                            onPress={() => {
                                                                setColorID(item.COLOR_ID)
                                                                BottomSheetRef.current.close();
                                                            }} >
                                                            <ListItem.Content>
                                                                <ListItem.Title>{item.COLOR_TEXT}</ListItem.Title>
                                                            </ListItem.Content>
                                                            <ListItem.Chevron />
                                                        </ListItem>
                                                    ))}
                                            </ScrollView>
                                        }
                                    </View>
                                )
                                || (BottomSheet === "Family" &&

                                    <View>
                                        {getFamily !== undefined &&
                                            <ScrollView>
                                                {getFamily.filter((x) => x.FAMILY_ID).map(
                                                    (item, i) => (
                                                        <ListItem
                                                            key={i}
                                                            bottomDivider
                                                            button
                                                            onPress={() => {
                                                                setFamilyID(item.FAMILY_ID)
                                                                BottomSheetRef.current.close();
                                                            }} >
                                                            <ListItem.Content>
                                                                <ListItem.Title>{item.FAMILY_TEXT}</ListItem.Title>
                                                            </ListItem.Content>
                                                            <ListItem.Chevron />
                                                        </ListItem>
                                                    ))}
                                            </ScrollView>
                                        }
                                    </View>

                                )
                                || (BottomSheet === "SireMareObject" &&
                                    <>

                                        <SearchBar
                                            placeholder="Search"
                                            lightTheme
                                            platform="ios"
                                            cancelButtonTitle=""
                                            inputStyle={{ fontSize: 12, minHeight: 'auto', height: 36 }}
                                            containerStyle={{ backgroundColor: 'transparent', }}
                                            inputContainerStyle={{ backgroundColor: '#F0F1F3', minHeight: 'auto', height: 'auto', top: '3%' }}
                                            rightIconContainerStyle={{ margin: 0, padding: 0, minHeight: 'auto', height: 'auto' }}
                                            leftIconContainerStyle={{ margin: 0, padding: 0, minHeight: 'auto', height: 'auto' }}
                                            value={searchValue}
                                            onChangeText={setSearchValue}
                                            onSubmitEditing={() => {
                                                setSireMareHorseData([])
                                                SetisLoading(true);
                                                readHorseGetByName2();
                                            }}
                                            showLoading={false}
                                        />
                                        {isLoading && (
                                            <View style={{ width: "100%", zIndex: 1, }}>
                                                <Image style={{ width: '100%', resizeMode: 'center', height: Dimensions.get('screen').height / 2.3 }} source={require('../assets/horseRun2.gif')} />
                                            </View>
                                        )}
                                        <>
                                            {getHorseGetByName2.length > 0 ?

                                                <FlatList
                                                    scrollEnabled={true}
                                                    bounces={false}
                                                    style={styles.flatList2}
                                                    data={SireMareHorseData}
                                                    renderItem={({ item }) => (
                                                        <TouchableOpacity style={styles.item}
                                                            onPress={() => {
                                                                setSearchValue("")
                                                                if (SireMareHorseName === 'Sire') {

                                                                    setSireText(item.HORSE_NAME);
                                                                    setSireData(item);
                                                                    setFatherID(item.HORSE_ID)
                                                                    setFatherName(item.HORSE_NAME)
                                                                }
                                                                else if (SireMareHorseName === 'Mare') {
                                                                    setMareText(item.HORSE_NAME);
                                                                    setMareData(item);
                                                                    setMotherID(item.HORSE_ID)
                                                                    setMotherName(item.HORSE_NAME)
                                                                }
                                                                setSireMareHorseData([])
                                                                BottomSheetRef.current.close();
                                                            }}
                                                        >
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

                                                        </TouchableOpacity>)}
                                                    keyExtractor={item => item.HORSE_ID.toString()}
                                                />

                                                :
                                                null
                                            }

                                        </>


                                        {SireMareHorseData.length == 0 &&
                                            <>
                                                {SireMareHorseData.m_cDetail !== undefined &&
                                                    <>

                                                        {loader === false &&
                                                            <View style={styles.ErrorMessageContainer}>
                                                                <Icon style={{ marginBottom: 40 }} name="exclamation-circle" size={150} color="#e54f4f" />
                                                                <Text style={styles.ErrorMessageTitle}>Oh No, Data Not Found !</Text>
                                                                <Text style={styles.ErrorMessageText}>Could not find any horses.</Text>
                                                                <Text style={styles.ErrorMessageText}>You can search again.</Text>
                                                                <View style={styles.ErrorMessageButtonContainer}>
                                                                </View>
                                                            </View>
                                                        }
                                                    </>

                                                }
                                            </>
                                        }

                                    </>

                                )
                                || (BottomSheet === "Owner" &&

                                    <>
                                        <SearchBar
                                            placeholder="Search"
                                            lightTheme
                                            platform="ios"
                                            cancelButtonTitle=""
                                            inputStyle={{ fontSize: 12, minHeight: 'auto', height: 36 }}
                                            containerStyle={{ backgroundColor: 'transparent', }}
                                            inputContainerStyle={{ backgroundColor: '#F0F1F3', minHeight: 'auto', height: 'auto',top: '3%' }}
                                            rightIconContainerStyle={{ margin: 0, padding: 0, minHeight: 'auto', height: 'auto' }}
                                            leftIconContainerStyle={{ margin: 0, padding: 0, minHeight: 'auto', height: 'auto' }}
                                            value={getOwnerBreederName}
                                            onChangeText={setOwnerBreederName}
                                            onSubmitEditing={() => {
                                                SetisLoading(false);
                                                readGetOwnerBreeder();
                                            }}
                                            showLoading={false}
                                        />


                                        {getOwnerBreederData.length > 0 ?

                                            <FlatList
                                                scrollEnabled={true}
                                                bounces={false}
                                                style={styles.flatList2}
                                                data={getOwnerBreederData}
                                                renderItem={({ item }) => (
                                                    <TouchableOpacity style={styles.item}
                                                        onPress={() => {
                                                            if (getCoachBreederOwner === "Owner") {
                                                                setOwnerText(item.NAME)
                                                                setOwnerSystemUserID(item.ID)
                                                                setOwner(item.NAME)

                                                            }
                                                            else if (getCoachBreederOwner === "Breeder") {
                                                                setBreederText(item.NAME)
                                                                setBreederSystemUserID(item.ID)
                                                                setBreeder(item.NAME)
                                                            }
                                                            else if (getCoachBreederOwner === "Coach") {
                                                                setCoachText(item.NAME)
                                                                setCoachSystemUserID(item.ID)
                                                                setCoach(item.NAME)
                                                            }

                                                            BottomSheetRef.current.close();
                                                        }}
                                                    >

                                                        <View style={{ flexDirection: 'column' }}>
                                                            <View style={{ flexDirection: 'row' }}>
                                                                <Text style={styles.textStyle}>
                                                                    {item.NAME}
                                                                </Text>
                                                            </View>


                                                        </View>

                                                    </TouchableOpacity>)}
                                                keyExtractor={item => item.NAME.toString()}
                                            />
                                            :
                                            null
                                        }
                                    </>

                                )

                                || BottomSheet === "RomanMiller" &&

                                <>
                                    {RomanMillerData.map((item, i) => (
                                        <ListItem
                                            key={i}
                                            bottomDivider
                                            onPress={() => {
                                                pressRM(item)

                                            }}
                                        >
                                            <ListItem.CheckBox
                                                checked={checkStateMultiRM.checked.includes(item.title)}
                                                checkedIcon='circle'
                                                uncheckedIcon='circle'
                                                center={true}
                                                checkedColor='#2169ab'
                                                uncheckedColor='rgb(232, 237, 241)'
                                                onPress={() => {
                                                    pressRM(item)
                                                }} />
                                            <ListItem.Content>
                                                <ListItem.Title>{item.title}</ListItem.Title>
                                            </ListItem.Content>

                                        </ListItem>
                                    ))}
                                </>

                                || BottomSheet === "ANZ" &&

                                <>
                                    {RomanMillerData.map((item, i) => (
                                        <ListItem
                                            key={i}
                                            bottomDivider
                                            onPress={() => {
                                                pressANZ(item)

                                            }}
                                        >
                                            <ListItem.CheckBox
                                                checked={checkStateMultiANZ.checked.includes(item.title)}
                                                checkedIcon='circle'
                                                uncheckedIcon='circle'
                                                center={true}
                                                checkedColor='#2169ab'
                                                uncheckedColor='rgb(232, 237, 241)'
                                                onPress={() => {
                                                    pressANZ(item)
                                                }} />
                                            <ListItem.Content>
                                                <ListItem.Title>{item.title}</ListItem.Title>
                                            </ListItem.Content>

                                        </ListItem>
                                    ))}
                                </>

                                || BottomSheet === "PA" &&

                                <>
                                    {RomanMillerData.map((item, i) => (
                                        <ListItem
                                            key={i}
                                            bottomDivider
                                            onPress={() => {
                                                pressPA(item)

                                            }}
                                        >

                                            <ListItem.CheckBox
                                                checked={checkStateMultiPA.checked.includes(item.title)}
                                                checkedIcon='circle'
                                                uncheckedIcon='circle'
                                                center={true}
                                                checkedColor='#2169ab'
                                                uncheckedColor='rgb(232, 237, 241)'
                                                onPress={() => {
                                                    pressPA(item)
                                                }} />
                                            <ListItem.Content>
                                                <ListItem.Title>{item.title}</ListItem.Title>
                                            </ListItem.Content>

                                        </ListItem>
                                    ))}
                                </>

                            }
                        </View>
                    </RBSheet>


                    {showEdition ?

                        <>
                            <View>
                                <TouchableOpacity
                                    onPress={() => {
                                        setShowEdition(false)
                                    }}
                                    style={{ flexDirection: 'row', marginBottom: 25, padding: 10, borderRadius: 20, borderColor: 'silver', width: 150, height: 28, alignContent: 'center', top: 10, left: 10, backgroundColor: '#2e3f6e' }}>
                                    <Image style={{ width: 25, height: 25, position: 'absolute' }}

                                        source={require('../assets/backWhite.png')}

                                        resizeMode="contain"
                                    />

                                    <Text style={{ fontSize: 16, marginLeft: 10, left: 10, alignSelf: 'center', color: 'white', marginTop: Platform.OS == 'ios' ? -5 : -4 }}>Back to Search</Text>


                                </TouchableOpacity>
                            </View>
                            {getHorseGetByIDForUpdate !== undefined &&
                                <ScrollView style={styles.header}>


                                    <ScrollView>
                                        <View style={{ padding: 10, top: 15 }}>
                                            <Text style={styles.text_footer}>Name</Text>

                                            <View style={styles.action}>
                                                <Ionicons name="person-outline" size={25} color="#2e3f6e" />
                                                <TextInput
                                                    style={{ left: 20 }}
                                                    placeholder={getHorseGetByIDForUpdate[0].HORSE_NAME}
                                                    name={"HorseName"}
                                                    value={getHorseNameForUpdate}
                                                    onChangeText={setHorseNameForUpdate}
                                                />

                                            </View>
                                            <Text style={styles.text_footer}>Sire</Text>

                                            <View style={styles.action}>
                                                <TouchableOpacity
                                                    onPress={() => {

                                                        setSireMareHorseName('Sire')
                                                        setBottomSheet('SireMareObject')
                                                        BottomSheetRef.current.open();
                                                    }}
                                                    style={styles.TwoValueInLineButton}>
                                                    <Ionicons name="male-outline" size={22} color="#2e3f6e" />
                                                    <Text style={styles.InformationText}>{getFatherName}</Text>
                                                    <Ionicons name="add-outline" size={24} color="silver" />
                                                </TouchableOpacity>
                                            </View>
                                            <Text style={styles.text_footer}>Mare</Text>

                                            <View style={styles.action}>

                                                <TouchableOpacity
                                                    onPress={() => {
                                                        setSireMareHorseName('Mare')
                                                        setBottomSheet('SireMareObject')
                                                        BottomSheetRef.current.open()
                                                    }}
                                                    style={styles.TwoValueInLineButton}>
                                                    <Ionicons name="female-outline" size={22} color="#2e3f6e" />
                                                    <Text style={styles.InformationText}>{getMotherName}</Text>
                                                    <Ionicons name="add-outline" size={24} color="silver" />
                                                </TouchableOpacity>
                                            </View>
                                            {/*
                                <View style={[styles.action, { marginTop: 30 }]}>
                                    <Ionicons name="calendar-outline" size={24} color="#2e3f6e" />
                                    <TextInput
                                        style={styles.HalfInputStyle}
                                        placeholder={"Set a Birth Date"}
                                        name={"BirthDate"}
                                        keyboardType="numeric"
                                        value={getHorseBirthDate.toString()}
                                        onChangeText={setHorseBirthDate}
                                    />
                                </View>
*/}


                                            <Text style={styles.text_footer}>Birth Date</Text>
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
                                                    <Ionicons name="calendar-outline" size={22} color="#2e3f6e" />
                                                    <Text style={[styles.InformationText, {left: 5}]}>
                                                        {moment(getHorseBirthDate).format("DD.MM.YYYY")}
                                                    </Text>

                                                    <View >

                                                        {Platform.OS === "android" && show && (
                                                            <DateTimePicker style={{ width: 200, }}

                                                                name={"StartRequestDate"}
                                                                value={getHorseBirthDate}
                                                                mode={mode}

                                                                is24Hour={true}
                                                                onChange={onChange}
                                                                display="spinner"

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
                                                            <View style={{ borderBottomWidth: 0.5, borderBottomColor: '#CFCFD5', paddingLeft: 20, padding: 10, bottom: 5 }}>
                                                                {Global.Language === 1 ?
                                                                    <Text style={{ fontSize: 22 }}>Doğum Tarihi</Text>
                                                                    :
                                                                    <Text style={{ fontSize: 22 }}>Birth Date</Text>
                                                                }

                                                            </View>
                                                            {show && (
                                                                <DateTimePicker style={{ width: Dimensions.get('window').width }}
                                                                    locale={(Global.Language === 1 ? "tr_TR" : "en_GB")}
                                                                    name={"StartRequestDate"}
                                                                    value={getHorseBirthDate}
                                                                    mode={mode}
                                                                    is24Hour={true}
                                                                    onChange={onChange}
                                                                    display="spinner"
                                                                />
                                                            )}
                                                        </RBSheet>
                                                    </View>
                                                </TouchableOpacity>

                                            </View>
                                            <Text style={styles.text_footer}>Sex</Text>
                                            <View style={styles.action}>
                                                <Ionicons name="transgender-outline" size={22} color="#2e3f6e" />

                                                <RNPickerSelect
                                                    placeholder={{}}

                                                    style={
                                                        pickerSelectStyles
                                                    }
                                                    Icon={() => {
                                                        return <Ionicons style={{ paddingRight: '20%' }} name="chevron-down-outline" size={20} color="silver" />;

                                                    }}


                                                    useNativeAndroidPickerStyle={false}
                                                    onValueChange={(value) => { setSexID(value); }}
                                                    items={
                                                        sexList.map(item => (
                                                            {
                                                                key: item.SEX_ID,
                                                                label: item.SEX_EN,
                                                                value: item.SEX_ID
                                                            }
                                                        ))}
                                                    value={getSexID}
                                                    key={getSexID}

                                                >

                                                </RNPickerSelect>

                                            </View>
                                            <Text style={styles.text_footer}>Country</Text>

                                            <View style={styles.action}>
                                                <Ionicons name="flag-outline" size={22} color="#2e3f6e" />

                                                <RNPickerSelect
                                                    placeholder={{}}

                                                    style={
                                                        pickerSelectStyles
                                                    }
                                                    Icon={() => {
                                                        return <Ionicons style={{ paddingRight: '20%' }} name="chevron-down-outline" size={20} color="silver" />;

                                                    }}


                                                    useNativeAndroidPickerStyle={false}
                                                    onValueChange={(value) => { setCountryID(value); }}
                                                    items={
                                                        CounrtyList.map(item => (
                                                            {
                                                                key: item.COUNTRY_ID,
                                                                label: item.COUNTRY_EN,
                                                                value: item.COUNTRY_ID
                                                            }
                                                        ))}

                                                    value={getCountryID}
                                                    key={getCountryID}

                                                >

                                                </RNPickerSelect>

                                            </View>

                                            <Text style={styles.text_footer}>Class</Text>
                                            <View style={styles.action}>
                                                <Ionicons name="list-outline" size={22} color="#2e3f6e" />

                                                <RNPickerSelect
                                                    placeholder={{}}

                                                    style={
                                                        pickerSelectStyles
                                                    }
                                                    Icon={() => {
                                                        return <Ionicons style={{ paddingRight: '20%' }} name="chevron-down-outline" size={20} color="silver" />;

                                                    }}


                                                    useNativeAndroidPickerStyle={false}
                                                    onValueChange={(value) => { setWinnerTypeID(value); }}
                                                    items={
                                                        WinnerTypeList.map(item => (
                                                            {
                                                                key: item.WINNER_TYPE_ID,
                                                                label: item.WINNER_TYPE_EN,
                                                                value: item.WINNER_TYPE_ID
                                                            }
                                                        ))}

                                                    value={getWinnerTypeID}
                                                    key={getWinnerTypeID}

                                                >

                                                </RNPickerSelect>

                                            </View>

                                            <Text style={styles.text_footer}>Color</Text>

                                            <View style={styles.action}>
                                                <Ionicons name="color-filter-outline" size={22} color="#2e3f6e" />

                                                <RNPickerSelect
                                                    placeholder={{}}

                                                    style={
                                                        pickerSelectStyles
                                                    }
                                                    Icon={() => {
                                                        return <Ionicons style={{ paddingRight: '20%' }} name="chevron-down-outline" size={20} color="silver" />;

                                                    }}


                                                    useNativeAndroidPickerStyle={false}
                                                    onValueChange={(value) => { setColorID(value); }}
                                                    items={
                                                        ColorList.map(item => (
                                                            {
                                                                key: item.COLOR_ID,
                                                                label: item.COLOR_TEXT,
                                                                value: item.COLOR_ID
                                                            }
                                                        ))}

                                                    value={getColorID}
                                                    key={getColorID}

                                                >

                                                </RNPickerSelect>

                                            </View>

                                            <Text style={[styles.text_footer, { top: 25 }]}>First Place</Text>
                                            <View style={[styles.action5]}>

                                                <InputSpinner
                                                    step={1}
                                                    colorMax={"#f04048"}
                                                    colorMin={"#40c5f4"}
                                                    colorLeft={"#77b5fe"}
                                                    colorRight={"#77b5fe"}
                                                    colorPress={"#40c5f4"}
                                                    longStep={5}
                                                    editable={false}
                                                    colorPress={"#2e3f6e"}
                                                    inputStyle={{ width: 45 }}
                                                    value={getFirst}
                                                    onChange={(num) => {
                                                        setFirst(num)
                                                    }}
                                                />
                                            </View>
                                            <Text style={[styles.text_footer, { top: 25 }]}>Second Place</Text>
                                            {/*<Feather name="award" size={22} color="#2e3f6e" />*/}
                                            <View style={styles.action5}>

                                                <InputSpinner
                                                    step={1}
                                                    colorMax={"#f04048"}
                                                    colorMin={"#40c5f4"}
                                                    colorLeft={"#77b5fe"}
                                                    colorRight={"#77b5fe"}
                                                    colorPress={"#40c5f4"}
                                                    longStep={5}
                                                    editable={false}
                                                    colorPress={"#2e3f6e"}
                                                    inputStyle={{ width: 45 }}
                                                    value={getSecond}
                                                    onChange={(num) => {
                                                        setSecond(num)
                                                    }}
                                                />
                                            </View>
                                            <Text style={[styles.text_footer, { top: 25 }]}>Third Place</Text>
                                            <View style={styles.action5}>
                                                <InputSpinner
                                                    step={1}
                                                    colorMax={"#f04048"}
                                                    colorMin={"#40c5f4"}
                                                    colorLeft={"#77b5fe"}
                                                    colorRight={"#77b5fe"}
                                                    colorPress={"#40c5f4"}
                                                    longStep={5}
                                                    editable={false}
                                                    colorPress={"#2e3f6e"}
                                                    inputStyle={{ width: 45 }}
                                                    value={getThird}
                                                    onChange={(num) => {
                                                        setThird(num)
                                                    }}
                                                />
                                            </View>

                                            <Text style={[styles.text_footer, { top: 25 }]}>Forth Place</Text>
                                            <View style={styles.action5}>
                                                <InputSpinner
                                                    step={1}
                                                    colorMax={"#f04048"}
                                                    colorMin={"#40c5f4"}
                                                    colorLeft={"#77b5fe"}
                                                    colorRight={"#77b5fe"}
                                                    colorPress={"#40c5f4"}
                                                    editable={false}
                                                    longStep={5}
                                                    colorPress={"#2e3f6e"}
                                                    inputStyle={{ width: 45 }}
                                                    value={getFourth}
                                                    onChange={(num) => {
                                                        setFourth(num)
                                                    }}
                                                />
                                            </View>

                                            <Text style={[styles.text_footer, { top: 25 }]}>Start</Text>
                                            <View style={styles.action5}>
                                                <InputSpinner
                                                    step={1}
                                                    colorMax={"#40c5f4"}
                                                    colorLeft={"#77b5fe"}
                                                    colorRight={"#77b5fe"}
                                                    colorMin={"#40c5f4"}
                                                    editable={false}
                                                    longStep={5}
                                                    colorPress={"#2e3f6e"}
                                                    inputStyle={{ width: 45 }}
                                                    value={getStartCount}
                                                    onChange={(num) => {
                                                        setStartCount(num)
                                                    }}
                                                />
                                            </View>


                                            <View style={[styles.action, { bottom: 30, paddingTop: 40 }]}>
                                                <Text style={styles.text_footer}>Dead: </Text>
                                                <Switch
                                                    trackColor={{ false: "#D6D6D6", true: "#77b5fe" }}
                                                    thumbColor={DeadCheckBox ? "#fff" : "#fff"}
                                                    ios_backgroundColor="#D6D6D6"
                                                    onValueChange={toggleSwitch}
                                                    value={DeadCheckBox}
                                                    style={{ marginRight: 'auto', left: 30, bottom: Platform.OS == 'ios' ? 5 : 0 }}
                                                />

                                            </View>

                                            <Text style={styles.text_footer}>Earning</Text>

                                            <View style={styles.action4}>
                                                <View style={{ top: 10 }}>
                                                    <Ionicons name="cash-outline" size={22} color="#2e3f6e" /></View>
                                                <TextInput
                                                    style={styles.EarningPriceInput}
                                                    placeholder={getEarningPlaceholder}
                                                    keyboardType="numeric"
                                                    name={"Earning"}
                                                    value={getEarn.toString()}
                                                    onChangeText={setEarn}
                                                />

                                                <RNPickerSelect
                                                    placeholder={{}}

                                                    style={
                                                        pickerMiniStyle
                                                    }
                                                    Icon={() => {
                                                        return <Ionicons style={{ paddingRight: '15%', paddingBottom: -3, top: 10 }} name="chevron-down-outline" size={20} color="silver" />;

                                                    }}


                                                    useNativeAndroidPickerStyle={false}
                                                    onValueChange={(value) => { setEarnCurrencyID(value); }}
                                                    items={
                                                        CurrencyTypeList.map(item => (
                                                            {
                                                                key: item.CURRENCY_ID,
                                                                label: item.ICON,
                                                                value: item.CURRENCY_ID
                                                            }
                                                        ))}

                                                    value={getEarnCurrencyID}
                                                    key={getEarnCurrencyID}

                                                >

                                                </RNPickerSelect>
                                            </View>
                                            <Text style={styles.text_footer}>Price</Text>

                                            <View style={styles.action4}>
                                                <View style={{ top: 10 }}>
                                                    <Ionicons name="wallet-outline" size={22} color="#2e3f6e" /></View>
                                                <TextInput
                                                    style={styles.EarningPriceInput}
                                                    placeholder={getPricePlaceholder}
                                                    keyboardType="numeric"
                                                    name={"Price"}
                                                    value={getPrice.toString()}
                                                    onChangeText={setPrice}
                                                />
                                                <RNPickerSelect
                                                    placeholder={{}}

                                                    style={
                                                        pickerMiniStyle
                                                    }
                                                    Icon={() => {
                                                        return <Ionicons style={{ paddingRight: '15%', paddingBottom: -3, top: 10 }} name="chevron-down-outline" size={20} color="silver" />;

                                                    }}


                                                    useNativeAndroidPickerStyle={false}
                                                    onValueChange={(value) => { setPriceCurrencyID(value); }}
                                                    items={
                                                        CurrencyTypeList.map(item => (
                                                            {
                                                                key: item.CURRENCY_ID,
                                                                label: item.ICON,
                                                                value: item.CURRENCY_ID
                                                            }
                                                        ))}

                                                    value={getPriceCurrencyID}
                                                    key={getPriceCurrencyID}

                                                >

                                                </RNPickerSelect>
                                            </View>





                                            <Text style={styles.text_footer}>Owner</Text>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setBottomSheet("Owner")
                                                    setCoachBreederOwner("Owner")
                                                    BottomSheetRef.current.open()
                                                }}
                                                style={styles.action}>
                                                <Ionicons name="person-outline" size={22} color="#2e3f6e" />

                                                <Text style={styles.InformationText4}>{getOwnerText}</Text>
                                                <Ionicons name="add-outline" size={24} color="silver" />
                                            </TouchableOpacity>
                                            <Text style={styles.text_footer}>Coach</Text>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setBottomSheet("Owner")
                                                    setCoachBreederOwner("Coach")
                                                    BottomSheetRef.current.open()
                                                }}
                                                style={styles.action}>
                                                <Ionicons name="person-outline" size={22} color="#2e3f6e" />
                                                <Text style={styles.InformationText4}>{getCoachText}</Text>
                                                <Ionicons name="add-outline" size={24} color="silver" />
                                            </TouchableOpacity>
                                            <Text style={styles.text_footer}>Breeder</Text>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setBottomSheet("Owner")
                                                    setCoachBreederOwner("Breeder")
                                                    BottomSheetRef.current.open()
                                                }}
                                                style={styles.action}>
                                                <Ionicons name="person-outline" size={22} color="#2e3f6e" />
                                                <Text style={styles.InformationText4}>{getBreederText}</Text>
                                                <Ionicons name="add-outline" size={24} color="silver" />
                                            </TouchableOpacity>
                                            <View style={{ marginVertical: 15 }}>
                                                <Text style={styles.text_footer}>Header</Text>


                                                <TextInput
                                                    style={styles.action}
                                                    placeholder={getHeaderPlaceholder}
                                                    name={"Header"}
                                                    value={getHeader}
                                                    onChangeText={setHeader}
                                                    numberOfLines={1}
                                                />
                                            </View>
                                            <Text style={styles.text_footer}>Paragraph</Text>
                                            <TextInput
                                                style={[styles.action, { height: 100, textAlignVertical: 'top', }]}
                                                placeholder="Paragraph"
                                                name={"Paragraph"}
                                                value={getInfo.toString()}
                                                onChangeText={setInfo}
                                                multiline={true}
                                            />

                                            <ScrollView horizontal={true}>
                                                <View style={{
                                                    paddingTop: 0,
                                                    flex: 1,
                                                    flexDirection: 'row',
                                                }}>


                                                    {imageList.map((prop, key) => {

                                                        return (
                                                            <View
                                                                key={prop.key}
                                                                style={{

                                                                    width: 100,
                                                                    height: 100,
                                                                    margin: 5,
                                                                    borderWidth: 1,
                                                                    borderColor: '#a3a19d',
                                                                    borderRadius: 4,
                                                                    padding: 2,

                                                                }}>
                                                                <TouchableOpacity
                                                                    style={{ position: 'absolute', left: 5, top: 5, zIndex: 1, backgroundColor: '#D51515', borderRadius: 50 }}
                                                                    onPress={() => {
                                                                        // this doesn't work yet
                                                                        var newList = imageList.filter((item) => item !== prop);
                                                                        console.log(newList)

                                                                        setImagelist(newList);

                                                                    }}>
                                                                    <Ionicons name="close-outline" size={24} color="#fff" />
                                                                </TouchableOpacity>
                                                                <Image style={{ width: 90, height: 89, resizeMode: 'cover' }} source={{ uri: prop.uri }} />
                                                            </View>
                                                        );
                                                    })}
                                                </View>
                                            </ScrollView>

                                            <MyButtonWhite
                                                Title="Upload"
                                                Icon="cloud-upload-outline"
                                                IconSize={24}
                                                onPress={pickImage}>
                                            </MyButtonWhite>



                                            <View style={{ marginTop: '5%', marginBottom: 40, paddingBottom: 40 }}>
                                                <MyButton
                                                    Title="Add"
                                                    Icon="add-circle-outline"
                                                    IconSize={24}
                                                    onPress={() => {
                                                        readUpdateAHorse();
                                                    }}
                                                >
                                                </MyButton>
                                            </View>

                                        </View>
                                    </ScrollView>
                                </ScrollView>

                            }

                        </>

                        :
                        <>


                            <View >

                                <SearchBar
                                    placeholder={getSearchPlaceholder}
                                    lightTheme
                                    platform="ios"
                                    cancelButtonTitle=""
                                    inputStyle={{ fontSize: 12, height: 45, justifyContent: 'center' }}
                                    inputContainerStyle={{
                                        width: '95%',
                                        backgroundColor: "#fff",
                                        borderRadius: 8,
                                        flexDirection: 'row',
                                        marginBottom: '0%',
                                        borderWidth: 1,
                                        borderColor: '#d4d2d2',
                                        zIndex: 99,
                                        fontSize: 25,
                                        height: 45,
                                        padding: 8,
                                        borderBottomWidth: 1,
                                        bottom: '1%'
                                    }}
                                    rightIconContainerStyle={{ margin: 0, padding: 0, minHeight: 'auto', height: 'auto' }}
                                    leftIconContainerStyle={{ margin: 0, padding: 0, minHeight: 'auto', height: 'auto' }}
                                    value={searchText}
                                    onChangeText={(e) => {
                                        setSearchText(e);
                                    }}
                                    onBlur={(e) => {
                                        console.log(e)
                                    }}
                                />


                                <MyButtonEditDelete
                                    Title="Search"
                                    Icon="search-outline"
                                    IconSize={18}
                                    onPress={() => {

                                        if (searchText) {
                                            setLoader(true)
                                            Keyboard.dismiss()
                                            readHorseGetByName();
                                        } else {
                                            alert("Please search the name first");
                                        }
                                    }}
                                >
                                </MyButtonEditDelete>

                                <View style={styles.Container}>
                                    <>

                                        {getHorseGetByName.length > 0 ?

                                            <View style={{ borderBottomWidth: 0.5, borderBottomColor: '#CFCFD5', paddingLeft: 20, padding: 10, paddingBottom: '2%' }}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={{ fontSize: 12 }}>Search results found ({getHorseGetByName.length}) records</Text>
                                                    <Ionicons style={{ marginLeft: 'auto', right: 10 }} name="chevron-down-outline" size={20} color="grey" />
                                                </View>
                                                <FlatList
                                                    scrollEnabled={true}
                                                    bounces={false}
                                                    style={styles.flatList}
                                                    data={getHorseGetByName}

                                                    renderItem={({ item }) => (
                                                        <TouchableOpacity style={styles.latestItem}
                                                            onPress={() => {
                                                                setLoaderText(item.HORSE_NAME + "\n" + ' Verileri Yükleniyor..')
                                                                setLoader(true)
                                                                setTimeout(() => {
                                                                    readHorseGetByIdForUpdate(item.HORSE_ID)
                                                                    setShowEdition(true)
                                                                }, 1500);
                                                            }}
                                                        >
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

                                                        </TouchableOpacity>)}
                                                    keyExtractor={item => item.HORSE_ID.toString()}
                                                />
                                            </View>



                                            :
                                            null
                                        }
                                    </>
                                </View>
                            </View>
                        </>
                    }
                </MyHeader>

            </View>

        </View>

    )
}
const { height } = Dimensions.get("screen");
const { width } = Dimensions.get("screen");
const height_logo = height * 0.1;
const width_logo = width * 0.90;
const windowWidth = Dimensions.get('window').width - 100;
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: windowWidth + 40,
        bottom: 5,
        left: 15,
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        paddingTop: 8,
        color: '#000',
    },
    inputAndroid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: windowWidth + 60,
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        paddingTop: 8,
        color: '#000',
        left: 15
    },
    placeholder: { color: '#9a9aa1', fontSize: 14, },

});
const styles = StyleSheet.create({
    Container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        margin: 0,
    },
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff'
    },
    HeaderText: {
        fontSize: 23,
        color: 'white',
        alignSelf: 'flex-start',
        top: '25%',
        left: '7%'
    },
    HeaderText2: {
        fontSize: 23,
        color: 'white',
        alignSelf: 'flex-start',
        top: '16%',
        left: '5%'
    },
    boxView: {
        top: '22.5%',
        position: 'absolute',
        backgroundColor: '#fff',
        margin: 'auto',
        alignSelf: 'center',
        borderTopEndRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        width: '100%',
        padding: 10,
        elevation: 10,
    },
    topShadow: {
        top: 0,
        right: 0,
        left: 0,
        width: '100%',
        height: '35%',
        backgroundColor: '#2e3f6e',
        borderBottomLeftRadius: 35,
        borderBottomRightRadius: 35,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,


        elevation: 10,
    },
    InformationText4: {
        fontSize: 15,
        color: '#000',
        marginRight: 'auto',
        left: 20
    },
    header: {
        flex: 1,
        paddingHorizontal: 20,
        paddingBottom: 10
    },
    logo: {
        width: width_logo,
        height: height_logo,
        bottom: 25
    },
    action4: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 0,
        marginVertical: 20,


    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 30
    },

    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 10,
        marginVertical: 20
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 14
    },
    action5: {
        flexDirection: 'row-reverse',
        marginTop: -8,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 10,
        marginVertical: 20,
        paddingLeft: 'auto',
        right: 10
    },
    signIn: {
        width: '100%',
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#2e3f6e',
        top: 10,
        flexDirection: 'row'
    },
    signInButton: {
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2e3f6e',
        borderRadius: 8,
        width: '95%',
        margin: 10,
        flexDirection: 'row',
        bottom: '3%',
        marginBottom: -10

    },
    signInButton2: {
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2e3f6e',
        borderRadius: 8,
        flexDirection: 'row',
        width: '100%',
        left: 0, marginTop: 30, marginBottom: 60

    },
    textSign: {
        fontSize: 15,
    },
    TextStyle: {
        textAlign: 'center',
        fontSize: 15,
    },
    ButtonContainer: {
        alignItems: 'center'
    },
    SwipableCloseIcon: {
        width: '100%',
        flexDirection: 'row-reverse',
        marginRight: -25,
    },

    FullInputStyle: {
        marginVertical: 5,
        width: '100%',
        paddingLeft: 20,
        borderRadius: 8,
        fontSize: 15,
        margin: 0,
        padding: 10,
        borderColor: 'silver',
        borderWidth: 0.5,
    },
    TwoInformationInLineContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 365,
        alignSelf: 'center'
    },
    InformationContainer: {
        padding: 10,
        width: 385,
        alignSelf: 'center'
    },
    TwoValueInLineButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: windowWidth + 40,
        paddingTop: 10,
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 5,
        color: '#05375a',
    },
    TextInputContainer: {
        marginVertical: 30,


    },
    HalfInputStyle: {
        width: '90%',
        paddingLeft: 20,
        fontSize: 15,
        margin: 0,
    },
    OneValueInLine: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: 'silver',
        marginVertical: 7,
        padding: 10,
        width: 365,
        alignSelf: 'center'
    },
    InputTouchableContainer: {
        width: '95%',
        justifyContent: 'flex-start',
        flexDirection: 'row'
    },
    InformationText: {
        fontSize: 15,
        marginLeft: 20,
        marginRight: 'auto',
    },
    CurrencyContainer: {
        marginVertical: 30
    },
    EarningPriceItemContainer: {
        flexDirection: 'row',
        width: 365,

        justifyContent: 'space-between',
        borderRadius: 8,
        borderColor: 'silver',
        borderWidth: 0.5,
        marginVertical: 5,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    EarningPriceButtonContainer: {
        flexDirection: 'row',
        borderLeftWidth: 0.5,
        borderColor: 'silver',
        padding: 5,
        justifyContent: 'space-around',
        width: '30%',
    },
    EarningPriceInput: {
        padding: 5,
        width: '60%',
        fontSize: 15,
        marginLeft: 15,
        height: 43,
        paddingBottom: 5

    },
    EarningPriceButtonText: {
        fontSize: 15,
        marginRight: 5,
    },
    CoachOwnerContainer: {
        marginVertical: 0,
        width: 365,
        alignSelf: 'center',
        marginTop: 10,
        marginVertical: 20

    },
    ThreeValueInLineButton: {
        width: '100%',
        flexDirection: 'row',
        marginVertical: 5,
        padding: 10,
        justifyContent: 'space-between',
        borderWidth: 0.5,
        borderRadius: 8,
        borderColor: 'silver',
        alignItems: 'center'
    },
    action2: {
        flexDirection: 'row',
        marginVertical: 8,
        padding: 10,
        marginTop: 10,
        paddingBottom: 5,
        justifyContent: 'space-between',

        alignItems: 'center'
    },
    HorseName: {
        marginBottom: 10,
        fontWeight: '500',
        fontSize: 16,
    },
    textStyle: {
        left: 5,

        fontSize: 12
    },
    textStyle2: {
        left: 5,
        fontSize: 13,
        fontWeight: 'bold'
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginRight: 10,
    },
    heightText: {
        marginTop: 15,
        fontSize: 22,
        fontWeight: "700",
    },
    flatList: {
        paddingBottom: 20,
        paddingTop: 10,
        borderTopWidth: 0.5,
        borderTopColor: '#CFCFD5',
        marginTop: 10,
        marginLeft: -15,
        maxHeight: Dimensions.get('screen').height / 2.2,

    },
    flatList2: {
        paddingBottom: 20,
        paddingTop: 10,
        marginTop: 10,
        marginLeft: 15,
        maxHeight: Dimensions.get('screen').height / 1.4,

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
const pickerMiniStyle = StyleSheet.create({
    inputIOS: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: windowWidth - 210,
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -10,
        paddingTop: 8,
        color: '#000',
        top: 10,



    },
    inputAndroid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: windowWidth - 210,
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -10,
        paddingTop: 8,
        color: '#000',
        top: 10,

    },
});