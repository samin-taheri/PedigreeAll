import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, Switch, TouchableOpacity, Platform, Button, Image, TextInput, ActivityIndicator, Touchable, StatusBar } from 'react-native'
import { SearchBar, ListItem, Input } from "react-native-elements";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import Flag from "react-native-flags";
import Icon from "react-native-vector-icons/FontAwesome5";
import * as ImagePicker from 'expo-image-picker';
import { ScrollView } from 'react-native-gesture-handler';
import RBSheet from "react-native-raw-bottom-sheet";
import { Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { Global } from './Global';
import Feather from 'react-native-vector-icons/Feather';
import { Ionicons } from '@expo/vector-icons';
import { Checkbox } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import Toast from 'react-native-toast-message';
import * as Haptics from 'expo-haptics';
import RNPickerSelect from 'react-native-picker-select';

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


export function AddAHorse({ navigation }) {
  const refRBSheet = useRef();
  const BottomSheetRef = useRef();
  const [isDetail, setIsDetail] = useState(false);
  const [name, setName] = React.useState("");
  const [image1, setImage1] = useState(null);
  const [sexList, setSexList] = useState()
  const [sexText, setSexText] = useState("Select a Gender")
  const [WinnerTypeList, setWinnerTypeList] = useState()
  const [winnerText, setWinnerText] = useState("Select a Class")
  const [CurrencyTypeList, setCurrencyList] = useState()
  const [earningText, setEarningText] = useState("$")
  const [priceText, setPriceText] = useState("$")
  const [isEarning, setEarning] = useState(false)
  const [CounrtyList, setCountryList] = useState()
  const [CounrtyText, setCounrtyText] = useState("Select a Country")
  const [ColorList, setColorList] = useState()
  const [ColorText, setColorText] = useState("Select a Color")
  const [BottomSheet, setBottomSheet] = useState()
  const [searchValue, setSearchValue] = React.useState()
  const [loader, setLoader] = React.useState(false)
  const [getOwnerBreederName, setOwnerBreederName] = React.useState()
  const [getCoachBreederOwner, setCoachBreederOwner] = React.useState();
  const [getOwnerText, setOwnerText] = React.useState('Owner');
  const [getBreederText, setBreederText] = React.useState('Breeder')
  const [getCoachText, setCoachText] = React.useState('Coach')
  const [isLoading, SetisLoading] = React.useState(true);

  const [SireMareHorseData, setSireMareHorseData] = React.useState();
  const [SireMareHorseName, setSireMareHorseName] = React.useState();
  const [getOwnerBreederData, setOwnerBreederData] = React.useState();
  const [getCheckHorseAvaibleData, setCheckHorseAvaibleData] = React.useState();
  const [SireData, setSireData] = React.useState();
  const [MareData, setMareData] = React.useState();
  const [SireText, setSireText] = React.useState("Sire");
  const [MareText, setMareText] = React.useState("Mare");
  const bottomSheet = useRef();

  const [DeadCheckBox, setDeadCheckBox] = React.useState(false)
  const [AliveCheckBox, setAliveCheckBox] = React.useState(false)


  const [getHorseName, setHorseName] = React.useState("");
  const [getFatherObject, setFatherObject] = React.useState([])
  const [getMotherObject, setMotherObject] = React.useState([]);
  const [getRef1, setRef1] = React.useState("");
  const [getHorseBirthDate, setHorseBirthDate] = React.useState("");
  const [getRef2, setRef2] = React.useState("");
  const [getEarn, setEarn] = React.useState("");
  const [getPrice, setPrice] = React.useState("");
  const [getOwner, setOwner] = React.useState("");
  const [getBreeder, setBreeder] = React.useState("");
  const [getCoach, setCoach] = React.useState("");
  const [getHeader, setHeader] = React.useState("");
  const [getInfo, setInfo] = React.useState("");
  const [getStartCount, setStartCount] = React.useState("");
  const [getFirst, setFirst] = React.useState("");
  const [getSecond, setSecond] = React.useState("");
  const [getThird, setThird] = React.useState("");
  const [getFourth, setFourth] = React.useState("");
  const [getImage, setImage] = React.useState("");
  const [getB, setB] = React.useState("");
  const [getI, setI] = React.useState("");
  const [getC, setC] = React.useState("");
  const [getS, setS] = React.useState("");
  const [getP, setP] = React.useState("");
  const [getRmB, setRmB] = React.useState("");
  const [getRmI, setRmI] = React.useState("");
  const [getRmC, setRmC] = React.useState("");
  const [getRmS, setRmS] = React.useState("");
  const [getRmP, setRmP] = React.useState("");
  const [getAnzB, setAnzB] = React.useState("");
  const [getAnzI, setAnzI] = React.useState("");
  const [getAnzC, setAnzC] = React.useState("");
  const [getAnzS, setAnzS] = React.useState("");
  const [getAnzP, setAnzP] = React.useState("");


  const [getFatherID, setFatherID] = React.useState(-1);
  const [getMotherID, setMotherID] = React.useState(-1);
  const [getSexID, setSexID] = React.useState(1);
  const [getCountryID, setCountryID] = React.useState(0);
  const [SexID, SetSexID] = React.useState(0);

  const [getEarnCurrencyID, setEarnCurrencyID] = React.useState(1)
  const [getPriceCurrencyID, setPriceCurrencyID] = React.useState(1)
  const [getOwnerSystemUserID, setOwnerSystemUserID] = React.useState(1)
  const [getBreederSystemUserID, setBreederSystemUserID] = React.useState(1)
  const [getCoachSystemUserID, setCoachSystemUserID] = React.useState(1)
  const [getWinnerTypeID, setWinnerTypeID] = React.useState(1)
  const [getFamilyID, setFamilyID] = React.useState(1)
  const [getColorID, setColorID] = React.useState(1)

  const [checked_1, toggleChecked_1] = useState(true);
  const [checked_2, toggleChecked_2] = useState(false);
  const [isLoadingForAdding, setisLoadingForAdding] = React.useState(false)

  const [checkStateMultiRM, setcheckStateMultiRM] = React.useState({ checked: [] });
  const [checkStateMultiANZ, setcheckStateMultiANZ] = React.useState({ checked: [] });
  const [checkStateMultiPA, setcheckStateMultiPA] = React.useState({ checked: [] });
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [isEnabled, setIsEnabled] = useState(false);

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(new Date(currentDate))

  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };
  const datePicker = () => {
    showMode('datetime');
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
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });


    if (!result.cancelled) {
      if (image1 === null) {
        setImage1(result.uri);
      }
    }
  };

  const readDataSexList = async (data) => {
    fetch('https://api.pedigreeall.com/Sex/Get', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then((response) => response.json())
      .then((json) => {
        var list = [];
        json.m_cData.map(item => (
          list.push({
            label: item.SEX_EN,
            value: item.SEX_ID
          })
        ))

        setSexList(list)
      })
      .catch((error) => {
        console.error(error);
      })
  }

  const readDataWinnerList = async (data) => {
    fetch('https://api.pedigreeall.com/WinnerType/Get', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then((response) => response.json())
      .then((json) => {
        var list = [];
        json.m_cData.map(item => (
          list.push({
            label: item.WINNER_TYPE_EN,
            value: item.WINNER_TYPE_ID
          })
        ))

        this.setWinnerTypeList(list)
      })
      .catch((error) => {
        console.error(error);
      })
  }

  const readDataCurrencyList = async (data) => {
    fetch('https://api.pedigreeall.com/Currency/Get', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setCurrencyList(json.m_cData)
      })
      .catch((error) => {
        console.error(error);
      })
  }

  const readDataCountryList = async (data) => {
    fetch('https://api.pedigreeall.com/Country/Get', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    })

      .then((response) => response.json())
      .then((json) => {
        var list = [];
        json.m_cData.map(item => (
          list.push({
            label: item.COUNTRY_EN,
            value: item.COUNTRY_ID
          })
        ))

        setCountryList(list)
      })
      .catch((error) => {
        console.error(error);
      })
  }

  const readDataColorList = async () => {
    fetch('https://api.pedigreeall.com/Color/Get', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    })

      .then((response) => response.json())
      .then((json) => {
        var list = [];
        json.m_cData.map(item => (
          list.push({
            label: item.COLOR_TEXT,
            value: item.COLOR_ID
          })
        ))

        setColorList(list)
      })
      .catch((error) => {
        console.error(error);
      })
  }

  const readGetOwnerBreeder = async () => {
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

  const readUser = async () => {
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
            setSireMareHorseData(json)
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
    }
  }

  const readAddAHorse = async () => {
    try {
      const token = await AsyncStorage.getItem('TOKEN')
      if (token !== null) {
        fetch('https://api.pedigreeall.com/Horse/Add', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Basic " + token,
          },
          body: JSON.stringify({
            "HORSE_NAME": getHorseName,
            "FATHER_OBJECT": {
              "HORSE_ID": getFatherID.toString()
            },
            "MOTHER_OBJECT": {
              "HORSE_ID": getMotherID.toString()
            },
            "HORSE_BIRTH_DATE": getHorseBirthDate,
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
              "BOOL_ID": DeadCheckBox ? 1 : 0,
              "BOOL_ID": AliveCheckBox ? 1 : 0

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
            //setHorseAddRequestData(json.m_cData)
            //setTime(false)
            //console.log(json.m_cData)
            setisLoadingForAdding(false)
            alert(json.m_lUserMessageList[1])

            if (json.m_eProcessState === 1) {
              setIsDetail(false)
              setHorseName("")
              setFatherObject([])
              setMotherObject([])
              setHorseBirthDate("")
              setRef1("")
              setRef2("")
              setEarn("")
              setPrice("")
              setOwner("")
              setBreeder("")
              setCoach("")
              setHeader("")
              setInfo("")
              setStartCount("")
              setFirst("")
              setSecond("")
              setThird("")
              setFourth("")
              setImage("")
              setB(0)
              setI(0)
              setC(0)
              setS(0)
              setP(0)
              setRmB(0)
              setRmI(0)
              setRmC(0)
              setRmS(0)
              setRmP(0)
              setAnzB(0)
              setAnzC(0)
              setAnzI(0)
              setAnzP(0)
              setAnzS(0)
              setFatherID(-1)
              setMotherID(-1)
              setSexID(1)
              setCountryID(0)
              setEarnCurrencyID(1)
              setPriceCurrencyID(1)
              setOwnerSystemUserID(1)
              setBreederSystemUserID(1)
              setCoachSystemUserID(1)
              setWinnerTypeID(1)
              setFamilyID(1)
              setColorID(1)
              setSireText("Sire")
              setMareText("Mare")
              setSexText("Select a Gender")
              setCounrtyText("Select a Country")
              setWinnerText("Select a Class")
              setColorText("Select a Color")
              setDeadCheckBox(false)
              setAliveCheckBox(false)
              setEarningText("$")
              setPriceText("$")
              setOwnerText("Owner")
              setBreederText("Breeder")
              setCoachText("Coach")
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
      console.log(e)
    }
  }

  const readCheckHorseAvaible = async () => {
    try {
      const token = await AsyncStorage.getItem('TOKEN')
      if (token !== null) {
        //console.log(atob('Z2ZydWx1dGFzQGhvdG1haWwuY29tOjEyMw=='))
        fetch('https://api.pedigreeall.com/Horse/CheckHorseAvailable?p_sName=' + getHorseName +
          '&p_iFatherId=' + getFatherObject.HORSE_ID +
          '&p_iMotherId=' + getMotherObject.HORSE_ID
          , {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Authorization': "Basic " + token,
            },
          })
          .then((response) => response.json())
          .then((json) => {
            setCheckHorseAvaibleData(json)
            if (json !== undefined) {
              if (json.m_cDetail.m_eProcessState === -1) {
                readAddAHorse();
              }
              else {
                Alert("Kayit Bulundu")
              }

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


  const [getStartRequestDatePlaceholder, setStartRequestDatePlaceholder] = React.useState("")
  const [getFirstPlacePlaceholder, setFirstPlacePlaceholder] = React.useState("")
  const [getSecondPlacePlaceholder, setSecondPlacePlaceholder] = React.useState("")
  const [getThirdPlacePlaceholder, setThirdPlacePlaceholder] = React.useState("")
  const [getFourthPlacePlaceholder, setFourthPlacePlaceholder] = React.useState("")
  const [getStartsPlacePlaceholder, setStartsPlacePlaceholder] = React.useState("")
  const [getEarningPlaceholder, setEarningPlaceholder] = React.useState("")
  const [getPricePlaceholder, setPricePlaceholder] = React.useState("")
  const [getHeaderPlaceholder, setHeaderPlaceholder] = React.useState("")
  const [getParagraphPlaceholder, setParagraphPlaceholder] = React.useState("")
  const [getDeadCheckName, setDeadCheckName] = React.useState("")
  const [getNamePlaceholder, setNamePlaceholder] = React.useState("")
  const [getAddButtonName, setAddButtonName] = React.useState("")

  React.useEffect(() => {
    readDataSexList();
    readDataWinnerList();
    readDataCurrencyList();
    readDataCountryList();
    readDataColorList();
    readUser()
    readGetOwnerBreeder()

    if (Global.Language === 1) {
      setStartRequestDatePlaceholder("Doğum Tarihi (GG/AA/YYYY)")
      setFirstPlacePlaceholder("1'incilik Sayısı")
      setSecondPlacePlaceholder("2'ncilik Sayısı")
      setThirdPlacePlaceholder("3'üncülük Sayısı")
      setFourthPlacePlaceholder("4'üncülük Sayısı")
      setStartsPlacePlaceholder("Toplam Yarış Sayısı")
      setEarningPlaceholder("Kazanç")
      setPricePlaceholder("Fiyat")
      setHeaderPlaceholder("Başlık")
      setParagraphPlaceholder("Paragraf")
      setSexText("Cinsiyet Sec")
      setCounrtyText("Ulke Sec")
      setWinnerText("Sınıf Sec")
      setColorText("Renk Sec")
      setDeadCheckName("Ölü")
      setOwnerText("Sahip")
      setBreederText("Yetiştirici")
      setCoach("Antrenör")
      setNamePlaceholder("Adı")
      setSireText("Aygır")
      setMareText("Kısrak")
      setAddButtonName("Ekle")
    }
    else {
      setStartRequestDatePlaceholder("Birth Date (DD/MM/YYYY)")
      setFirstPlacePlaceholder("First Place")
      setSecondPlacePlaceholder("Second Place")
      setThirdPlacePlaceholder("Third Place")
      setFourthPlacePlaceholder("Fourth Place")
      setStartsPlacePlaceholder("Starts")
      setEarningPlaceholder("Earning")
      setPricePlaceholder("Price")
      setHeaderPlaceholder("Header")
      setParagraphPlaceholder("Paragraph")
      setSexText("Select a Gender")
      setCounrtyText("Select a Country")
      setWinnerText("Select a Class")
      setColorText("Select a Color")
      setDeadCheckName("Dead")
      setOwnerText("Owner")
      setBreederText("Breeder")
      setCoach("Coach")
      setNamePlaceholder("Name")
      setSireText("Sire")
      setMareText("Mare")
      setAddButtonName("Add")
    }
  }, [])

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 20 }}
          onPress={() => {
            refRBSheet.current.open()
          }}>
          <Icon name="cogs" size={24} color="#fff" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.Container}>

      <RBSheet
        ref={BottomSheetRef}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={Dimensions.get('window').height - 100}
        customStyles={{
          container: {
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10
          },

        }}
      >
        <TouchableOpacity
          onPress={() => {
            setRmB(0)
            setRmI(0)
            setRmC(0)
            setRmS(0)
            setRmP(0)
            setB(0)
            setI(0)
            setC(0)
            setS(0)
            setP(0)
            setAnzB(0)
            setAnzI(0)
            setAnzC(0)
            setAnzP(0)
            setAnzS(0)

            if (checkStateMultiRM.checked.length > 0) {
              for (let i = 0; i < checkStateMultiRM.checked.length; i++) {
                if (checkStateMultiRM.checked[i] === "B") {
                  setRmB(1)
                }
                if (checkStateMultiRM.checked[i] === "I") {
                  setRmI(1)
                }
                if (checkStateMultiRM.checked[i] === "C") {
                  setRmC(1)
                }
                if (checkStateMultiRM.checked[i] === "S") {
                  setRmS(1)
                }
                if (checkStateMultiRM.checked[i] === "P") {
                  setRmP(1)
                }
              }
            }

            if (checkStateMultiPA.checked.length > 0) {
              for (let i = 0; i < checkStateMultiPA.checked.length; i++) {
                if (checkStateMultiPA.checked[i] === "B") {
                  setB(1)
                }
                if (checkStateMultiPA.checked[i] === "I") {
                  setI(1)
                }
                if (checkStateMultiPA.checked[i] === "C") {
                  setC(1)
                }
                if (checkStateMultiPA.checked[i] === "S") {
                  setS(1)
                }
                if (checkStateMultiPA.checked[i] === "P") {
                  setP(1)
                }
              }
            }

            if (checkStateMultiANZ.checked.length > 0) {
              for (let i = 0; i < checkStateMultiANZ.checked.length; i++) {
                if (checkStateMultiANZ.checked[i] === "B") {
                  setAnzB(1)
                }
                if (checkStateMultiANZ.checked[i] === "I") {
                  setAnzI(1)
                }
                if (checkStateMultiANZ.checked[i] === "C") {
                  setAnzC(1)
                }
                if (checkStateMultiANZ.checked[i] === "S") {
                  setAnzS(1)
                }
                if (checkStateMultiANZ.checked[i] === "P") {
                  setAnzP(1)
                }
              }
            }
            BottomSheetRef.current.close()
          }}
          style={styles.SwipableCloseIcon}>
          <Feather name="x" size={25} color="silver" />
        </TouchableOpacity>
        <View>

          {BottomSheet === "WinnerList" && (
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
                          if (Global.Language === 1) {
                            setWinnerText(item.WINNER_TYPE_TR)
                          }
                          else {
                            setWinnerText(item.WINNER_TYPE_EN)
                          }
                          setWinnerTypeID(item.WINNER_TYPE_ID)
                          BottomSheetRef.current.close()
                        }} >
                        <ListItem.Content>
                          {Global.Language === 1 ?
                            <ListItem.Title>{item.WINNER_TYPE_TR}</ListItem.Title>
                            :
                            <ListItem.Title>{item.WINNER_TYPE_EN}</ListItem.Title>
                          }

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
                    {CurrencyTypeList.filter((x) => x.ICON).map(
                      (item, i) => (
                        <ListItem
                          key={i}
                          bottomDivider
                          button
                          onPress={() => {
                            if (isEarning === true) {
                              setEarningText(item.ICON)
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
                            if (Global.Language === 1) {
                              setCounrtyText(item.COUNTRY_TR)
                            }
                            else {
                              setCounrtyText(item.COUNTRY_EN)
                            }

                            setCountryID(item.COUNTRY_ID)
                            BottomSheetRef.current.close()
                          }} >
                          <Flag code={item.ICON.toUpperCase()} size={24} />
                          <ListItem.Content>
                            {Global.Language === 1 ?
                              <ListItem.Title>{item.COUNTRY_TR}</ListItem.Title>
                              :
                              <ListItem.Title>{item.COUNTRY_EN}</ListItem.Title>
                            }

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
                            setColorText(item.COLOR_TEXT)
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
            || (BottomSheet === "SireMareObject" &&
              <>
                <SearchBar
                  placeholder={searchValue}
                  lightTheme
                  platform="ios"
                  cancelButtonTitle=""
                  inputStyle={{ fontSize: 12, minHeight: 'auto', height: 36 }}
                  containerStyle={{ backgroundColor: 'transparent', }}
                  inputContainerStyle={{ backgroundColor: 'rgb(232, 237, 241)', minHeight: 'auto', height: 'auto' }}
                  rightIconContainerStyle={{ margin: 0, padding: 0, minHeight: 'auto', height: 'auto' }}
                  leftIconContainerStyle={{ margin: 0, padding: 0, minHeight: 'auto', height: 'auto' }}
                  value={searchValue}
                  onChangeText={setSearchValue}
                  onSubmitEditing={() => {
                    readUser();
                    setLoader(true);
                  }}
                  showLoading={true}
                />
                {SireMareHorseData !== undefined ?
                  <ScrollView style={{ marginBottom: 30 }}>
                    {SireMareHorseData.m_cData.filter((x) => x.HORSE_NAME).map(
                      (item, i) => (
                        <ListItem
                          key={i}
                          bottomDivider
                          button
                          onPress={() => {
                            BottomSheetRef.current.close();

                            if (SireMareHorseName === 'Sire') {
                              setSireText(item.HORSE_NAME);
                              setSireData(item);
                              setFatherObject(item)
                              setFatherID(item.HORSE_ID)
                            }
                            else if (SireMareHorseName === 'Mare') {
                              setMareText(item.HORSE_NAME);
                              setMareData(item);
                              setMotherObject(item)
                              setMotherID(item.HORSE_ID)
                            }
                          }} >
                          <Image
                            style={{ width: 70, height: 70, borderRadius: 50 }}
                            source={{ uri: item.IMAGE }}
                          />
                          <ListItem.Content>
                            <ListItem.Title>{item.HORSE_NAME}</ListItem.Title>
                            <ListItem.Subtitle>{item.FATHER_NAME}</ListItem.Subtitle>
                            <ListItem.Subtitle>{item.MOTHER_NAME}</ListItem.Subtitle>
                          </ListItem.Content>
                          <ListItem.Chevron />
                        </ListItem>
                      ))}
                  </ScrollView>
                  :
                  <View style={{ alignItems: 'center' }}>
                    <Icon style={{ marginBottom: 40, alignSelf: 'cneter' }} name="wifi" size={150} color="#222" />
                    <Text style={{ alignSelf: 'center' }}>No Internet Connection !</Text>
                    <Text style={{ alignSelf: 'center' }}>Make sure Wifi or cellular data is turned on and then try again.</Text>
                    <View style={{ alignSelf: 'center' }}>
                    </View>
                  </View>
                }

                {SireMareHorseData !== undefined &&
                  <>
                    {SireMareHorseData.m_cDetail !== undefined &&
                      <>
                        {SireMareHorseData.m_cDetail.m_eProcessState < 0 &&
                          <>
                            {loader === false &&
                              <View style={{ alignSelf: 'center' }}>
                                <Icon style={{ marginBottom: 40, alignSelf: 'center' }} name="exclamation-circle" size={150} color="#e54f4f" />
                                <Text style={{ alignSelf: 'center' }}>Oh No, Data Not Found !</Text>
                                <Text style={{ alignSelf: 'center' }}>Could not find any horses.</Text>
                                <Text style={{ alignSelf: 'center' }}>You can search again.</Text>
                                <View style={{ alignSelf: 'center' }}>
                                </View>
                              </View>
                            }
                          </>

                        }
                      </>
                    }

                  </>}


                {loader ?
                  <ActivityIndicator
                    color="black"
                    size="large"
                  />

                  : null}
              </>
            )
            || (BottomSheet === "Owner" &&

              <>
                <SearchBar
                  placeholder={getOwnerBreederName}
                  lightTheme
                  platform="ios"
                  cancelButtonTitle=""
                  inputStyle={{ fontSize: 12, minHeight: 'auto', height: 36 }}
                  containerStyle={{ backgroundColor: 'transparent', }}
                  inputContainerStyle={{ backgroundColor: 'rgb(232, 237, 241)', minHeight: 'auto', height: 'auto' }}
                  rightIconContainerStyle={{ margin: 0, padding: 0, minHeight: 'auto', height: 'auto' }}
                  leftIconContainerStyle={{ margin: 0, padding: 0, minHeight: 'auto', height: 'auto' }}
                  value={getOwnerBreederName}
                  onChangeText={setOwnerBreederName}
                  onSubmitEditing={() => {
                    SetisLoading(true);
                    readGetOwnerBreeder();
                  }}
                  showLoading={true}
                />

                {isLoading && (
                  <View style={{ width: "100%", justifyContent: "center", position: 'absolute', zIndex: 1 }}>
                    <ActivityIndicator
                      style={{ height: 100, top: 150 }}
                      color="blue"
                      size="large"
                    />
                  </View>
                )}
                <ScrollView style={styles.ScrollViewContainer}>
                  {getOwnerBreederData.map((item, i) => (
                    <ListItem
                      key={i}
                      bottomDivider
                      button
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

                      <ListItem.Content>
                        <ListItem.Title>{item.NAME}</ListItem.Title>
                      </ListItem.Content>
                      <ListItem.Chevron />
                    </ListItem>
                  )
                  )}
                </ScrollView>
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
                    checkedColor='#2e3f6e'
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

      <View style={styles.header}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              flexDirection: 'row',
              paddingBottom: 30, paddingLeft: 3
            }}>
            <FontAwesome5
              name="chevron-left"
              color="#fff"
              size={26}
            />
          </TouchableOpacity>
        </View>
        <Animatable.Image
          animation="fadeInDown"
          source={require('../assets/logoWhite.png')}
          resizeMode="stretch"
          style={styles.logo}
        />

      </View>
      <Animatable.View style={styles.footer}
        animation="fadeInUp">
        <ScrollView style={{ marginBottom: 0 }}>
          {isLoadingForAdding ?
            <ActivityIndicator color="#000" size="large" style={{ position: 'absolute', alignSelf: 'center', justifyContent: 'center', zIndex: 1 }} />
            :
            null}
          <View style={styles.ButtonsContainer}>

            <View>
              {isDetail ?
                <View style={{ marginVertical: 8 }}>

                  <View style={{ top: -10 }}>
                    <TouchableOpacity
                      onPress={() => {
                        setIsDetail(false)
                      }}
                      style={{
                        borderBottomWidth: 0.8, flexDirection: 'row',
                        borderBottomColor: '#eaeaea', paddingBottom: 10,
                      }}>
                      <Image style={{ width: 25, height: 25, position: 'absolute' }}
                        source={{
                          uri: 'https://img.icons8.com/material-two-tone/96/000000/back--v2.png'
                        }}
                        resizeMode="contain"
                      />
                      {Global.Language === 1 ?
                        <Text style={{ left: 30, marginTop: 1, fontSize: 16 }}>Geri</Text>
                        :
                        <Text style={{ left: 30, marginTop: 1, fontSize: 16 }}>Back</Text>
                      }
                    </TouchableOpacity>
                  </View>
                  {/*}
                      <View style={[styles.TextInputContainerDate]}>
                        <View style={{left: 5, top: 4}}>
                        <Feather name="calendar" size={20} color="#2e3f6e" style={{ alignSelf: 'center' }} />
                        </View>
                        <TextInput
                          style={styles.HalfInputStyle}
                          placeholder={getStartRequestDatePlaceholder}
                          name={"StartRequestDate"}
                          keyboardType="numeric"
                          value={getHorseBirthDate}
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
                      <Text style={styles.InformationText}>
                        {moment(date).format("DD.MM.YYYY")}

                      </Text>

                      <View >

                        {Platform.OS === "android" && show && (
                          <DateTimePicker style={{ width: 200, }}

                            name={"StartRequestDate"}
                            value={date}
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
                          <View style={{ borderBottomWidth: 0.7, borderBottomColor: '#CFCFD5', paddingLeft: 20, padding: 10, bottom: 5 }}>
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
                              value={date}
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

                  <Text style={styles.text_footer}>Cinsiyet</Text>
                  <View style={styles.action}>
                    <Ionicons name="transgender-outline" size={22} color="#2e3f6e" />

                    <RNPickerSelect
                      placeholder={{}}
                      value={SexID}

                      style={
                        pickerSelectStyles
                      }
                      Icon={() => {
                        return <FontAwesome5
                          name="angle-down"
                          color="gray"
                          size={20}
                        />;

                      }}


                      useNativeAndroidPickerStyle={false}
                      onValueChange={(value) => { SetSexID(value); }}
                      items={sexList}
                      value={SexID}

                    />
                  </View>
                  <Text style={styles.text_footer}>Ülke</Text>
                  <View style={styles.action}>
                    <Ionicons name="flag-outline" size={22} color="#2e3f6e" />

                    <RNPickerSelect
                      placeholder={{}}
                      value={getCountryID}

                      style={
                        pickerSelectStyles
                      }
                      Icon={() => {
                        return <FontAwesome5
                          name="angle-down"
                          color="gray"
                          size={20}
                        />;

                      }}


                      useNativeAndroidPickerStyle={false}
                      onValueChange={(value) => { setCountryID(value); }}
                      items={CounrtyList}
                      value={getCountryID}

                    />
                  </View>
                  <Text style={styles.text_footer}>Sınıf</Text>
                  <View style={styles.action}>
                    <Ionicons name="stats-chart-outline" size={22} color="#2e3f6e" />
                    <RNPickerSelect
                      placeholder={{}}
                      value={getWinnerTypeID}
                      style={
                        pickerSelectStyles
                      }
                      Icon={() => {
                        return <FontAwesome5
                          name="angle-down"
                          color="gray"
                          size={20}
                        />
                      }}
                      useNativeAndroidPickerStyle={false}
                      onValueChange={(value) => { setWinnerTypeID(value); }}
                      items={WinnerTypeList}
                      value={getWinnerTypeID}

                    />

                  </View>

                  <Text style={styles.text_footer}>Sınıf</Text>
                  <View style={styles.action}>
                    <Ionicons name="color-filter-outline" size={22} color="#2e3f6e" />

                    <RNPickerSelect
                      placeholder={{}}
                      value={getColorID}

                      style={
                        pickerSelectStyles
                      }
                      Icon={() => {
                        return <FontAwesome5
                          style={{ margin: 17 }}
                          name="angle-down"
                          color="gray"
                          size={20}
                        />;

                      }}


                      useNativeAndroidPickerStyle={false}
                      onValueChange={(value) => { setColorID(value); }}
                      items={ColorList}
                      value={getColorID}

                    />
                  </View>

                  <View style={styles.TextInputContainer}>
                    <View style={styles.TextInputLineContainer}>
                      <Feather name="award" size={22} color="#2e3f6e" style={{ marginLeft: 5 }} />
                      <TextInput
                        style={styles.HalfInputStyle}
                        placeholder={getFirstPlacePlaceholder}
                        value={getFirst}
                        keyboardType='numeric'
                        onChangeText={setFirst}
                      />
                    </View>
                    <View style={styles.TextInputLineContainer}>
                      <Feather name="award" size={22} color="#2e3f6e" style={{ marginLeft: 5 }} />
                      <TextInput
                        style={styles.HalfInputStyle}
                        placeholder={getSecondPlacePlaceholder}
                        value={getSecond}
                        keyboardType='numeric'
                        onChangeText={setSecond}
                      />
                    </View>
                    <View style={styles.TextInputLineContainer}>
                      <Feather name="award" size={22} color="#2e3f6e" style={{ marginLeft: 5 }} />
                      <TextInput
                        style={styles.HalfInputStyle}
                        placeholder={getThirdPlacePlaceholder}
                        value={getThird}
                        keyboardType='numeric'
                        onChangeText={setThird}
                      />
                    </View>

                    <View style={styles.TextInputLineContainer}>
                      <Feather name="award" size={22} color="#2e3f6e" style={{ marginLeft: 5 }} />
                      <TextInput
                        style={styles.HalfInputStyle}
                        placeholder={getFourthPlacePlaceholder}
                        value={getFourth}
                        keyboardType='numeric'
                        onChangeText={setFourth}
                      />
                    </View>

                    <View style={styles.TextInputLineContainer}>
                      <Feather name="award" size={22} color="#2e3f6e" style={{ marginLeft: 5 }} />
                      <TextInput
                        style={styles.HalfInputStyle}
                        placeholder={getStartsPlacePlaceholder}
                        value={getStartCount}
                        keyboardType='numeric'
                        onChangeText={setStartCount}
                      />
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ left: 5, fontSize: 18 }}>Dead: </Text>
                    <Switch
                      trackColor={{ false: "#a3a3a3", true: "#2f406f" }}
                      thumbColor={isEnabled ? "#fff" : "#fff"}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={toggleSwitch}
                      value={isEnabled}
                      style={{ marginRight: 'auto', left: 30, bottom: Platform.OS == 'ios' ? 5 : 0 }}
                    />

                  </View>

                  <View style={styles.CurrencyContainer}>

                    <View style={styles.EarningPriceItemContainer}>
                      <View style={{ left: 10, top: 10 }}>
                        <Ionicons name="cash-outline" size={22} color="#2e3f6e" /></View>
                      <TextInput
                        style={styles.EarningPriceInput}
                        placeholder={getEarningPlaceholder}
                        keyboardType="numeric"
                        value={getEarn}
                        onChangeText={setEarn}
                      />
                      <TouchableOpacity
                        onPress={() => {
                          setBottomSheet("CurrencyList");
                          BottomSheetRef.current.open();
                          setEarning(true);
                        }}
                        style={styles.EarningPriceButtonContainer}>
                        <Text style={styles.EarningPriceButtonText}>{earningText}</Text>
                        <Ionicons name="chevron-down-outline" size={20} color="silver" />
                      </TouchableOpacity>
                    </View>

                    <View style={styles.EarningPriceItemContainer}>
                      <View style={{ left: 10, top: 10 }}>
                        <Ionicons name="wallet-outline" size={22} color="#2e3f6e" /></View>
                      <TextInput
                        style={styles.EarningPriceInput}
                        placeholder={getPricePlaceholder}
                        keyboardType="numeric"
                        value={getPrice}
                        onChangeText={setPrice}
                      />

                      <TouchableOpacity
                        onPress={() => {
                          setBottomSheet("CurrencyList");
                          BottomSheetRef.current.open();
                          setEarning(false);
                        }}
                        style={styles.EarningPriceButtonContainer}>
                        <Text style={styles.EarningPriceButtonText}>{priceText}</Text>
                        <Ionicons name="chevron-down-outline" size={20} color="silver" />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={styles.CoachOwnerContainer}>
                    <TouchableOpacity
                      onPress={() => {
                        setBottomSheet("Owner")
                        setCoachBreederOwner("Owner")
                        BottomSheetRef.current.open()
                      }}
                      style={styles.ThreeValueInLineButton}>
                      <Ionicons name="person-outline" size={22} color="#2e3f6e" />
                      <Text style={styles.InformationText4}>{getOwnerText}</Text>
                      <Ionicons name="add-outline" size={24} color="silver" />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {
                        setBottomSheet("Owner")
                        setCoachBreederOwner("Coach")
                        BottomSheetRef.current.open()
                      }}
                      style={styles.ThreeValueInLineButton}>
                      <Ionicons name="person-outline" size={22} color="#2e3f6e" />
                      <Text style={styles.InformationText4}>{getCoachText}</Text>
                      <Ionicons name="add-outline" size={24} color="silver" />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {
                        setBottomSheet("Owner")
                        setCoachBreederOwner("Breeder")
                        BottomSheetRef.current.open()
                      }}
                      style={styles.ThreeValueInLineButton}>
                      <Ionicons name="person-outline" size={22} color="#2e3f6e" />
                      <Text style={styles.InformationText4}>{getBreederText}</Text>
                      <Feather name="plus" size={22} color="silver" />
                    </TouchableOpacity>
                  </View>




                  <View style={{ marginVertical: 15 }}>
                    <TextInput
                      style={styles.HeaderStyle}
                      placeholder={getHeaderPlaceholder}
                      name={"Header"}
                      value={getHeader}
                      onChangeText={setHeader}
                      numberOfLines={1}
                    />

                    <TextInput
                      style={styles.LongImputStyle}
                      placeholder={getParagraphPlaceholder}
                      value={getInfo}
                      onChangeText={setInfo}
                    />
                  </View>

                  {image1 ?
                    <View style={styles.ImagePickerContainer}>
                      <Image
                        source={{ uri: image1 }}
                        style={styles.ImagePickerImage} />
                      <TouchableOpacity
                        style={{}}
                        onPress={() => {
                          setImage1(null);
                        }}>
                        <Icon name="times-circle" size={24} color="silver" />
                      </TouchableOpacity>
                    </View>
                    :
                    <TouchableOpacity
                      style={styles.signIn}
                      onPress={pickImage}>
                      <View style={{ top: 10, right: 70, alignItems: 'center' }}>
                        <Ionicons name="cloud-upload-outline" size={24} color="#2e3f6e" />
                      </View>
                      {Global.Language === 1 ?
                        <Text style={{ color: '#000', fontSize: 15, textAlign: 'center', bottom: 15 }}>Resim Yükle</Text>
                        :
                        <Text style={{ color: '#000', fontSize: 15, textAlign: 'center', bottom: 15 }}>Upload Image</Text>
                      }

                    </TouchableOpacity>
                  }
                </View>

                :


                <View>
                  <Text style={styles.text_footer}>Name</Text>
                        <View style={styles.action}>
                    <Ionicons name="person-outline" size={25} color="#2e3f6e" />
                    <TextInput
                      placeholder={getNamePlaceholder}
                      name={"username"}
                      value={getHorseName}
                      onChangeText={setHorseName}
                      style={styles.textInput}

                    />

                  </View>
                  <Text style={styles.text_footer}>Sire</Text>
                  <View style={styles.action}>
                    <TouchableOpacity
                      onPress={() => {
                        setBottomSheet('SireMareObject')
                        setSireMareHorseName('Sire')
                        BottomSheetRef.current.open();
                      }}
                      style={styles.TwoValueInLineButton}>
                      <Ionicons name="male-outline" size={22} color="#2e3f6e" />
                      <Text style={styles.InformationText3}>{SireText}
                      </Text>
                      <Feather name="plus" size={22} color="silver" />
                    </TouchableOpacity>
                    </View>
                    <Text style={styles.text_footer}>Mare</Text>
                  <View style={styles.action}>
                    <TouchableOpacity
                      onPress={() => {
                        setBottomSheet('SireMareObject')
                        setSireMareHorseName('Mare')
                        BottomSheetRef.current.open()
                      }}
                      style={styles.TwoValueInLineButton}>
                      <Ionicons name="female-outline" size={22} color="#2e3f6e" />
                      <Text style={styles.InformationText3}>{MareText}
                      </Text>
                      <Feather name="plus" size={22} color="silver" />
                    </TouchableOpacity>
                    </View>

                  <TouchableOpacity
                    onPress={() => { setIsDetail(true) }}
                    style={[styles.signIn, {
                      borderColor: '#2e3f6e',
                      borderWidth: 1,
                      marginTop: 15
                    }]}>
                    {Global.Language === 1 ?
                      <Text style={{ color: '#000', textAlign: 'center', fontSize: 15, }}>Ayrıntılar İçin Devam Ediniz</Text>
                      :
                      <Text style={{ color: '#000', textAlign: 'center', fontSize: 15, }}>Continue for Details</Text>
                    }

                  </TouchableOpacity>
                  <View style={{ top: 15 }}>
                    {Global.Language === 1 ?
                      <Text style={{ textAlign: 'center' }}>Ya Da</Text>
                      :
                      <Text style={{ textAlign: 'center', }}>Or</Text>
                    }
                  </View>
                </View>
              }
            </View>

            <View style={{ marginTop: 0, marginBottom: 50 }}>
              <TouchableOpacity
                style={styles.signInButton}
                onPress={async (e) => {
                  if (getFatherID !== -1 && getMotherID !== -1) {
                    setisLoadingForAdding(true)
                    readCheckHorseAvaible()

                  }

                  else {
                    alert("Please fill the required fields.")
                  }
                }
                }
              >
                <Text style={[styles.TextStyle, { color: '#fff', fontSize: 15 }]}>{getAddButtonName}</Text>
              </TouchableOpacity>

            </View>
          </View>
        </ScrollView>
      </Animatable.View>
    </View>

  )
}
const { height } = Dimensions.get("screen");
const { width } = Dimensions.get("screen");
const height_logo = height * 0.1;
const width_logo = width * 0.90;
const windowWidth = Dimensions.get('window').width - 100;

const styles = StyleSheet.create({
  Container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#2e3f6e'
  },
  AddAHorseContainer: {
    position: "absolute",
    height: "100%",
    width: "100",
  },
  Title: {
    fontSize: 24,
    fontWeight: '500',
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  ButtonsContainer: {
    marginVertical: 20
  },
  OneValueInLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: 'silver',
    marginVertical: 5,
    padding: 10
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
  HalfInputStyle: {
    //backgroundColor:'#e8e8e8',
    marginVertical: 2,
    width: '100%',
    paddingLeft: 20,
    fontSize: 15,
    height: 30,
    margin: 0,
  },
  HalfInputStyleNew: {
    width: '90%',
    paddingLeft: 20,
    fontSize: 15,
    margin: 0,
    alignSelf: 'center'
  },
  LongImputStyle: {
    marginVertical: 5,
    width: '100%',
    height: 100,
    paddingLeft: 20,
    borderRadius: 8,
    fontSize: 15,
    margin: 0,
    padding: 10,
    borderColor: 'silver',
    borderWidth: 0.5,
    lineHeight: 23,
    textAlignVertical: 'top',
  },
  HeaderStyle: {
    padding: 8,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: 'silver',
    fontSize: 15,
    paddingLeft: 20,
    height: 43
  },
  SubmitButton: {
    marginVertical: 15,
    padding: 10,
    width: '100%',
    color: 'blue',
  },
  SwipableCloseIcon: {
    width: '100%',
    flexDirection: 'row-reverse',
    marginRight: -25
  },
  TwoValueInLineButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: windowWidth + 40,
    marginVertical: 8,
    padding: 10,
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
  InformationText: {
    fontSize: 15,
    left: 13,
    top: 5,
    color: '#000',
  },
  InformationText2: {
    fontSize: 15,
    left: 15,

    color: '#000',
  },
  InformationText3: {
    fontSize: 15,
    left: 10,
    marginRight: 'auto',
    color: '#000',

  },
  InformationText4: {
    fontSize: 15,
    color: '#000',
    marginRight: 'auto',
    left: 20
  },
  InformationText5: {
    fontSize: 15,
    color: '#000',
    alignItems: 'center'
  },

  InputText: {
    fontSize: 15,
    color: '#000',
    marginLeft: 15
  },
  InputTouchableContainer: {
    width: '95%',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignSelf: 'center'

  },
  EarningPriceItemContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    borderRadius: 8,
    borderColor: 'silver',
    borderWidth: 0.5,
    marginVertical: 5
  },
  EarningPriceButtonContainer: {

  
  },
  EarningPriceInput: {
    padding: 5,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    width: '60%',
    fontSize: 15,
    marginLeft: 25,
    height: 43
  },
  EarningPriceButtonText: {
    fontSize: 15,
    marginRight: 5,
  },
  TwoInformationInLineContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ImagePickerContainer: {
    marginVertical: 8,
    width: "100%",
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: 'silver',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  ImagePickerImage: {
    marginLeft: 10,
    width: 300,
    height: 100,
    resizeMode: 'stretch'
  },
  TextInputContainerDate: {
    padding: 5,
    borderWidth: 0.5,
    borderColor: 'silver',
    borderRadius: 8,
    flexDirection: 'row',
    marginVertical: 5
  },
  TextInputContainer: {
    marginVertical: 30,

  },
  TextInputLineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'silver',
    padding: 5,
    borderRadius: 8,
    marginVertical: 5
  },
  CurrencyContainer: {
    marginVertical: 10
  },
  CoachOwnerContainer: {
    marginVertical: 0,

  },
  ImageContainer: {
    padding: 10,
    alignItems: 'center'
  },
  TextInputHeader: {
    fontSize: 15,
    fontWeight: 'bold',
    alignSelf: 'center',
    left: 10
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 10
  },
  headFooter: {
    backgroundColor: '#2e3f6e',
    borderBottomRightRadius: 30,
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30
  },

  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 10,
    marginVertical: 20
  },
  action2: {
    flexDirection: 'row',
    marginVertical: 8,
    padding: 10,
    marginTop: 10,
    paddingBottom: 5,
    justifyContent: 'space-between',
    borderWidth: 0.5,
    borderRadius: 8,
    borderColor: 'silver',
    alignItems: 'center'
  },
  action3: {
    flexDirection: 'row',
    marginTop: 10,
    paddingBottom: 5
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5
  },
  logo: {
    width: width_logo,
    height: height_logo,
    bottom: 25
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    paddingTop: 8,
    color: '#05375a',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 50
  },
  signIn: {
    width: '100%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#000',
    top: 10
  },
  signInButton: {
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2e3f6e',
    borderRadius: 8,
    flexDirection: 'row',
    top: 20,
  },
  textSign: {
    fontSize: 15,
  },
  TextStyle: {
    textAlign: 'center',
    fontSize: 15,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 14
  },

})


const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: windowWidth + 40,
    top: 5,
    left: 15,
  },
  inputAndroid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    width: windowWidth + 60,
    padding: 9

  },
});
