import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput, Text, Button, Dimensions, Image, Platform } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome5";
import { ScrollView } from 'react-native-gesture-handler';
import RBSheet from "react-native-raw-bottom-sheet";
import { ListItem } from "react-native-elements";
import { DataTable } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import MyHeader from '../component/MyHeader';
import RNPickerSelect from 'react-native-picker-select';
import MyButton from '../component/MyButton';
import { Trans, useTranslation } from "react-i18next";
import i18n from "../component/i18n";
import { Translate } from '../component/Helper';

export function MyAddingRequestScreen({ navigation }) {
  const { t, i18n } = useTranslation();

  const refRBSheet = useRef();
  const BottomSheetRequestsStatus = useRef();
  const BottomSheetViewRequest = useRef();
  const [RequestDateStart, SetRequestDateStart] = useState(new Date());
  const [RequestDateEnd, SetRequestDateEnd] = useState(new Date());
  const [LastActionDateStart, setLastActionDateStart] = useState(new Date());
  const [LastActionDateEnd, setLastActionDateEnd] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [showRequestDateStart, setShowRequestDateStart] = useState(false);
  const [showRequestDateEnd, setShowRequestDateEnd] = useState(false);
  const [showLastActionDateStart, setShowLastActionDateStart] = useState(false);
  const [showLastActionDateEnd, setShowLastActionDateEnd] = useState(false);
  const [birthdate, setBirthdate] = useState('Date')
  const [searchText, setSearchText] = React.useState("");
  const [requestStatusList, setRequestStatusList] = useState([])
  const [requestStatusText, setRequestStatusText] = useState("Select A Request Status")

  const [showReport, setShowReport] = useState(false)

  const [getHorseAddRequestData, setHorseAddRequestData] = React.useState();

  const [getAddRequestID, setAddRequestID] = React.useState()
  const [getHorseName, setHorseName] = React.useState("")
  const [getFatherName, setFatherName] = React.useState("")
  const [getMotherName, setMotherName] = React.useState("")
  const [getRequestStatusID, setRequestStatusID] = React.useState(1)
  const [getStartRequestDate, setStartRequestDate] = React.useState();
  const [getEndRequestDate, setEndRequestDate] = React.useState();
  const [getStartLastActionDate, setStartLastActionDate] = React.useState();
  const [getEndLastActionDate, setEndLastActionDate] = React.useState();
  const [getRequestOwnerID, setRequestOwnerID] = React.useState("")
  const [getEditorID, setEditorID] = React.useState("")

  const bottomSheet = useRef();

  const RequestDateStartChange = (event, selectedDate) => {
    setShowRequestDateStart(Platform.OS === 'ios');
    SetRequestDateStart(new Date(selectedDate))

  };
  const RequestDateEndChange = (event, selectedDate) => {
    setShowRequestDateEnd(Platform.OS === 'ios');
    SetRequestDateEnd(new Date(selectedDate))
  };
  const LastActionDateStartChange = (event, selectedDate) => {
    setShowLastActionDateStart(Platform.OS === 'ios');
    setLastActionDateStart(new Date(selectedDate))

  };
  const LastActionDateEndChange = (event, selectedDate) => {
    setShowLastActionDateEnd(Platform.OS === 'ios');
    setLastActionDateEnd(new Date(selectedDate))
  };

  const showMode = (currentMode) => {
    setShowRequestDateStart(true);
    setShowRequestDateEnd(true);
    setShowLastActionDateStart(true);
    setShowLastActionDateEnd(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };
  const datePicker = () => {
    showMode('datetime');
  };

  const readDataRequestStatusList = async () => {
    let isMounted = true;
    let isActive = true;
    const abortCtrl = new AbortController();
    const opts = {
      signal: abortCtrl.signal,
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    };
    fetch('https://api.pedigreeall.com/RequestStatus/Get', opts)
      .then((response) => response.json())
      .then((json) => {
        var list = [];
        json.m_cData.map(item => (
          list.push({
            label: Translate(item.REQUEST_STATUS_TR, item.REQUEST_STATUS_EN),
            value: item.REQUEST_STATUS_ID,
            key: item.REQUEST_STATUS_ID.toString()

          })
        ))
        if (isActive) {
          setRequestStatusList(list)
        }


      })
      .catch((error) => {
        console.error(error);
      })
    return () => { abortCtrl.abort(), isActive = false, isMounted = false };

  }
  const readGetHorseAddRequest = async () => {
    try {
      const token = await AsyncStorage.getItem('TOKEN')
      if (token !== null) {
        fetch('https://api.pedigreeall.com/HorseAddRequest/Get', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Basic " + token,
          },
          body: JSON.stringify({
            "ADD_REQUEST_ID": getAddRequestID,
            "HORSE_NAME": getHorseName,
            "FATHER_NAME": getFatherName,
            "MOTHER_NAME": getMotherName,
            "REQUEST_STATUS_ID": getRequestStatusID,
            "START_REQUEST_DATE": getStartRequestDate,
            "END_REQUEST_DATE": getEndRequestDate,
            "START_LAST_ACTION_DATE": getStartLastActionDate,
            "END_LAST_ACTION_DATE": getEndLastActionDate,
            "REQUEST_OWNER_ID": getRequestOwnerID,
            "EDITOR_ID": getEditorID,
            "PAGE_NO": 1,
            "PAGE_COUNT": 100,
            "RACE_ID": 1,
          })
        })
          .then((response) => response.json())
          .then((json) => {
            setHorseAddRequestData(json.m_cData)
            //setTime(false)
            //console.log(json.m_cData)
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

  const [getStartRequestDatePlaceholder, setStartRequestDatePlaceholder] = React.useState("")
  const [getEndRequestDatePlaceholder, setEndRequestDatePlaceholder] = React.useState("")
  const [getStartLastActionDatePlaceholder, setStartLastActionDatePlaceholder] = React.useState("")
  const [getEndLastActionDatePlaceholder, setEndLastActionDatePlaceholder] = React.useState("")
  const [getViewButton, setViewButton] = React.useState("")

  React.useEffect(() => {
    readDataRequestStatusList();
    readGetHorseAddRequest()
    setRequestStatusText("Select A Request Status")
    setStartRequestDatePlaceholder("Request Date (Start)")
    setEndRequestDatePlaceholder("Request Date (End)")
    setStartLastActionDatePlaceholder("Last Action Date (Start)")
    setEndLastActionDatePlaceholder("Last Action Date (End)")
    setViewButton("view")

  }, [])


  return (
    <MyHeader Title={t('MyAddingRequest')}
      onPress={() => navigation.goBack()}
    >
      <RBSheet
        ref={BottomSheetRequestsStatus}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          container: {
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10
          },

        }}
      >
        <TouchableOpacity
          onPress={() => { BottomSheetRequestsStatus.current.close() }}
          style={styles.SwipableCloseIcon}>
          <Icon name="times" size={20} color="#adb5bd" />
        </TouchableOpacity>
        <View>
          {requestStatusList !== undefined &&
            <ScrollView>
              {requestStatusList.filter((x) => Translate(x.REQUEST_STATUS_TR, x.REQUEST_STATUS_EN)).map(
                (item, i) => (
                  <ListItem
                    key={i}
                    bottomDivider
                    button
                    onPress={() => {
                      setRequestStatusText(Translate(item.REQUEST_STATUS_TR, item.REQUEST_STATUS_EN))
                      setRequestStatusID(item.REQUEST_STATUS_ID)
                      BottomSheetRequestsStatus.current.close();
                    }} >
                    <ListItem.Content>
                      <ListItem.Title>{Translate(item.REQUEST_STATUS_TR, item.REQUEST_STATUS_EN)}</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                  </ListItem>
                ))}
            </ScrollView>
          }
        </View>
      </RBSheet>


      <ScrollView>


        {showReport ?

          <>
            <TouchableOpacity
              onPress={() => {
                setShowReport(false)
              }}
              style={{ flexDirection: 'row', marginBottom: 20, padding: 10, borderRadius: 20, borderColor: 'silver', width: 150, height: 28, alignContent: 'center', top: 10, left: 10, backgroundColor: '#2e3f6e' }}>
              <Image style={{ width: 25, height: 25, position: 'absolute' }}

                source={require('../assets/backWhite.png')}

                resizeMode="contain"
              />

              <Text style={{ fontSize: 16, marginLeft: 10, left: 10, alignSelf: 'center', color: 'white', marginTop: Platform.OS == 'ios' ? -5 : -4 }}>{t('BackToSearch')}</Text>


            </TouchableOpacity>

            {getHorseAddRequestData !== undefined ?
              <>
                {getHorseAddRequestData.length === 0 ?
                  <View style={styles.ErrorMessageContainer}>

                    <>
                      <Text style={styles.ErrorMessageTitle}>{t('Nodatafound')}</Text>
                    </>

                  </View>
                  :
                  <ScrollView horizontal={true}>

                    <DataTable>
                      <DataTable.Header>
                        <DataTable.Title style={{ width: 120 }}>{t('ID')}</DataTable.Title>
                        <DataTable.Title style={{ width: 120 }}>{t('Name')}</DataTable.Title>
                        <DataTable.Title style={{ width: 120 }}>{t('Sire')}</DataTable.Title>
                        <DataTable.Title style={{ width: 120 }}>{t('Dam')}</DataTable.Title>
                        <DataTable.Title style={{ width: 120 }}>{t('RequestStatus')}</DataTable.Title>
                        <DataTable.Title style={{ width: 120 }}>{t('RequestDate')}</DataTable.Title>
                        <DataTable.Title style={{ width: 120 }}>{t('LastActionDate')}</DataTable.Title>
                        <DataTable.Title style={{ width: 120 }}>{t('Action')}</DataTable.Title>
                      </DataTable.Header>

                      {getHorseAddRequestData.map((item, i) => (
                        <DataTable.Row key={i}>
                          <DataTable.Cell style={{ width: 120 }} >{item.HORSE_ID}</DataTable.Cell>
                          <DataTable.Cell style={{ width: 120 }}>{item.HORSE_NAME}</DataTable.Cell>
                          <DataTable.Cell style={{ width: 120 }}>{item.FATHER_NAME}</DataTable.Cell>
                          <DataTable.Cell style={{ width: 120 }}>{item.MOTHER_NAME}</DataTable.Cell>
                          <DataTable.Cell style={{ width: 120 }}>{item.REQUEST_STATUS_OBJECT.REQUEST_STATUS_EN}</DataTable.Cell>
                          <DataTable.Cell style={{ width: 120 }}>{item.DATE.substring(0, 10)}</DataTable.Cell>
                          <DataTable.Cell style={{ width: 120 }}>{item.EDIT_DATE.substring(0, 10)}</DataTable.Cell>
                          <DataTable.Cell style={{ width: 120 }}>-</DataTable.Cell>

                        </DataTable.Row>
                      )
                      )}
                    </DataTable>

                  </ScrollView>
                }
              </>
              :
              <View style={styles.ErrorMessageContainer}>
                <Image style={{ width: '100%', resizeMode: 'center', height: 200, bottom: '15%' }} source={require('../assets/horseRun2.gif')} />
              </View>
            }
          </>
          :
          <>


            <ScrollView style={[styles.header]}>
              <View >
                <Text style={[styles.text_footer, { marginTop: 10 }]}>{t('ID')}</Text>
                <View style={styles.action}>
                  <Ionicons name="card-outline" size={23} color="#2e3f6e" />
                  <TextInput
                    style={styles.textInput}
                    placeholder={"Enter Horse ID"}
                    name={"ID"}
                    keyboardType="numeric"
                    value={getAddRequestID}
                    onChangeText={setAddRequestID}
                  />


                </View>
                <Text style={[styles.text_footer, { marginTop: 10 }]}>{t('Name')}</Text>
                <View style={styles.action}>
                  <Ionicons name="person-outline" size={23} color="#2e3f6e" />

                  <TextInput
                    style={styles.textInput}
                    placeholder={"Enter Horse Name"}
                    name={"HorseName"}
                    value={getHorseName}
                    onChangeText={setHorseName}
                  />
                </View>

                <Text style={[styles.text_footer, { marginTop: 10 }]}>{t('Sire')}</Text>
                <View style={styles.action}>
                  <Ionicons name="male-outline" size={23} color="#2e3f6e" />

                  <TextInput
                    style={styles.textInput}
                    placeholder={"Enter Sire Name"}
                    name={"FatherName"}
                    value={getFatherName}
                    onChangeText={setFatherName}
                  />
                </View>
                <Text style={[styles.text_footer, { marginTop: 10 }]}>{t('Dam')}</Text>
                <View style={styles.action}>
                  <Ionicons name="female-outline" size={23} color="#2e3f6e" />

                  <TextInput
                    style={styles.textInput}
                    placeholder={"Enter Mare Name"}
                    name={"username"}
                    value={getMotherName}
                    onChangeText={setMotherName}
                  />
                </View>

              </View>

              <View>
                <Text style={[styles.text_footer, { marginTop: 30 }]}>{t('RequestStatus')}</Text>
                <View style={[styles.action, { paddingTop: 10 }]}>
                  <Ionicons name="stats-chart-outline" size={22} color="#2e3f6e" />

                  <RNPickerSelect
                    placeholder={{}}

                    style={
                      pickerSelectStyles
                    }
                    Icon={() => {
                      return <Ionicons style={{ paddingRight: '20%' }} name="chevron-down-outline" size={20} color="silver" />;

                    }}


                    useNativeAndroidPickerStyle={false}
                    onValueChange={(value) => { setRequestStatusID(value); }}
                    items={requestStatusList}
                    value={getRequestStatusID}
                    key={getRequestStatusID}


                  />
                  <TouchableOpacity>
                    <Ionicons name="chevron-down-outline" size={20} color="silver" />
                  </TouchableOpacity>
                </View>
                <Text style={[styles.text_footer, { marginTop: 30 }]}>{t('RequestDateStart')}</Text>
                <View style={[styles.action, { paddingTop: 10 }]}>
                  <TouchableOpacity onPress={() => {

                    if (Platform.OS === "ios") {
                      setShowRequestDateStart(true)
                      bottomSheet.current.open()
                    } else {
                      setShowRequestDateStart(true)
                    }
                  }}
                    style={styles.InputTouchableContainer}>
                    <Ionicons name="calendar-outline" size={22} color="#2e3f6e" />
                    <Text style={styles.InformationText}>
                      {moment(RequestDateStart).format("DD.MM.YYYY")}

                    </Text>

                    <View >

                      {Platform.OS === "android" && showRequestDateStart && (
                        <DateTimePicker style={{ width: 200, }}

                          name={"StartRequestDate"}
                          value={RequestDateStart}
                          mode={mode}
                          is24Hour={true}
                          onChange={RequestDateStartChange}
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
                        {showRequestDateStart && (
                          <DateTimePicker style={{ width: Dimensions.get('window').width }}

                            name={"StartRequestDate"}
                            value={RequestDateStart}
                            mode={mode}
                            is24Hour={true}
                            onChange={RequestDateStartChange}
                            display="spinner"
                          />
                        )}
                      </RBSheet>
                    </View>
                  </TouchableOpacity>

                </View>
              </View>
              <Text style={[styles.text_footer, { marginTop: 20 }]}>{t('RequestDateEnd')}</Text>
              <View style={[styles.action, { paddingTop: 10 }]}>
                <TouchableOpacity onPress={() => {

                  if (Platform.OS === "ios") {
                    setShowRequestDateEnd(true)
                    bottomSheet.current.open()
                  } else {
                    setShowRequestDateEnd(true)
                  }
                }}
                  style={styles.InputTouchableContainer}>
                  <Ionicons name="calendar-outline" size={22} color="#2e3f6e" />
                  <Text style={styles.InformationText}>
                    {moment(RequestDateEnd).format("DD.MM.YYYY")}

                  </Text>

                  <View >

                    {Platform.OS === "android" && showRequestDateEnd && (
                      <DateTimePicker style={{ width: 200, }}

                        name={"StartRequestDate"}
                        value={RequestDateEnd}
                        mode={mode}
                        is24Hour={true}
                        onChange={RequestDateEndChange}
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
                      {showRequestDateEnd && (
                        <DateTimePicker style={{ width: Dimensions.get('window').width }}

                          name={"StartRequestDate"}
                          value={RequestDateEnd}
                          mode={mode}
                          is24Hour={true}
                          onChange={RequestDateEndChange}
                          display="spinner"
                        />
                      )}
                    </RBSheet>
                  </View>
                </TouchableOpacity>

              </View>
              <Text style={[styles.text_footer, { marginTop: 20 }]}>{t('LastActionDateStart')}</Text>
              <View style={[styles.action, { paddingTop: 10 }]}>
                <TouchableOpacity onPress={() => {

                  if (Platform.OS === "ios") {
                    setShowLastActionDateStart(true)
                    bottomSheet.current.open()
                  } else {
                    setShowLastActionDateStart(true)
                  }
                }}
                  style={styles.InputTouchableContainer}>
                  <Ionicons name="calendar-outline" size={22} color="#2e3f6e" />
                  <Text style={styles.InformationText}>
                    {moment(LastActionDateStart).format("DD.MM.YYYY")}

                  </Text>

                  <View >

                    {Platform.OS === "android" && showLastActionDateStart && (
                      <DateTimePicker style={{ width: 200, }}

                        name={"StartRequestDate"}
                        value={LastActionDateStart}
                        mode={mode}
                        is24Hour={true}
                        onChange={LastActionDateStartChange}
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
                      {showLastActionDateStart && (
                        <DateTimePicker style={{ width: Dimensions.get('window').width }}

                          name={"StartRequestDate"}
                          value={LastActionDateStart}
                          mode={mode}
                          is24Hour={true}
                          onChange={LastActionDateStartChange}
                          display="spinner"
                        />
                      )}
                    </RBSheet>
                  </View>
                </TouchableOpacity>

              </View>
              <Text style={[styles.text_footer, { marginTop: 20 }]}>{t('LastActionDateEnd')}</Text>
              <View style={[styles.action, { paddingTop: 10 }]}>
                <TouchableOpacity onPress={() => {

                  if (Platform.OS === "ios") {
                    setShowLastActionDateEnd(true)
                    bottomSheet.current.open()
                  } else {
                    setShowLastActionDateEnd(true)
                  }
                }}
                  style={styles.InputTouchableContainer}>
                  <Ionicons name="calendar-outline" size={22} color="#2e3f6e" />
                  <Text style={styles.InformationText}>
                    {moment(LastActionDateEnd).format("DD.MM.YYYY")}

                  </Text>

                  <View >

                    {Platform.OS === "android" && showLastActionDateEnd && (
                      <DateTimePicker style={{ width: 200, }}

                        name={"StartRequestDate"}
                        value={LastActionDateEnd}
                        mode={mode}
                        is24Hour={true}
                        onChange={LastActionDateEndChange}
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
                      {showLastActionDateEnd && (
                        <DateTimePicker style={{ width: Dimensions.get('window').width }}

                          name={"StartRequestDate"}
                          value={LastActionDateEnd}
                          mode={mode}
                          is24Hour={true}
                          onChange={LastActionDateEndChange}
                          display="spinner"
                        />
                      )}
                    </RBSheet>
                  </View>
                </TouchableOpacity>

              </View>


              <View style={{
                marginTop: 50,
                marginBottom: 50
              }}>

                <MyButton
                  Title={t('Search')}
                  Icon="search-outline"
                  IconSize={18}
                  onPress={() => {
                    setShowReport(true);
                    readGetHorseAddRequest()

                  }}
                >
                </MyButton>
              </View>
            </ScrollView>
          </>
        }
      </ScrollView>
    </MyHeader>
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
    left: 10,

  },
  placeholder: { color: '#9a9aa1', fontSize: 14, bottom: 10 },

});
const styles = StyleSheet.create({
  Container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    flex: 1,
  },
  HeaderText: {
    fontSize: 23,
    color: 'white',
    alignSelf: 'flex-start',
    top: '32%',
    left: '7%'
  },
  HeaderText2: {
    fontSize: 23,
    color: 'white',
    alignSelf: 'flex-start',
    top: '23%',
    left: '5%'
  },
  boxView: {
    top: '20%',
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
    width: '90%',
    padding: 10,
    elevation: 10,
  },
  topShadow: {
    top: 0,
    right: 0,
    left: 0,
    width: '100%',
    height: '20%',
    backgroundColor: '#2e3f6e',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,


    elevation: 10,
  },
  AddAHorseContainer: {
    position: "absolute",
    height: "100%",
    width: "100%",
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
    marginVertical: 7,
    top: 30,
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
    marginVertical: 20,
    width: '100%',
    paddingLeft: 20,
    fontSize: 14,
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
    paddingLeft: 20
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
    width: '48%',
    flexDirection: 'row',
    marginVertical: 8,
    padding: 10,
    justifyContent: 'space-between',
    borderWidth: 0.5,
    borderRadius: 8,
    borderColor: 'silver',
    alignItems: 'center'
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
    left: 20,
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
    flexDirection: 'row',
    borderLeftWidth: 0.5,
    borderColor: 'silver',
    padding: 5,
    justifyContent: 'space-around',
    width: '30%'
  },
  EarningPriceInput: {
    padding: 5,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    width: '60%',
    fontSize: 15,
    marginLeft: 25
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
    position: 'absolute',
    marginVertical: 20,
    height: "100%",
    width: "100%",
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
    fontSize: 20,
    alignSelf: 'center',
    left: 20,

  },
  header: {
    flex: 1,
    paddingHorizontal: 30,
    top: 20,
    marginBottom: 40
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
    paddingVertical: 30
  },
  text_header: {
    color: '#fff',
    fontSize: 30
  },
  text_footer: {
    color: '#05375a',
    fontSize: 14
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
    paddingTop: 0
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
    paddingLeft: 15,
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
    borderRadius: 12,
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

  },
  textSign: {
    fontSize: 15,
  },
  TextStyle: {
    textAlign: 'center',
    fontSize: 15,
  },
  SwipableCloseIcon: {
    width: '100%',
    flexDirection: 'row-reverse',
    marginRight: -25
  },
  InformationContainer: {
    padding: 10,
    alignSelf: 'center',
    width: '100%'
  },
  TwoInformationInLineContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  HalfInputStyle: {
    width: '90%',
    paddingLeft: 20,
    fontSize: 16,
    margin: 0,
  },
  BirthDateText: {
    marginLeft: 10,
    fontSize: 16
  },
  TextInputHeader: {
    fontSize: 15,
  },

  TextInputContainer: {
    padding: 10,
    borderWidth: 0.5,
    borderColor: 'silver',
    borderRadius: 8,
    flexDirection: 'row',
    marginVertical: 5
  },
  FullInputStyle: {
    marginVertical: 5,
    backgroundColor: '#e8e8e8',
    width: '100%',
    paddingLeft: 20,
    borderRadius: 8,
    fontSize: 18,
    margin: 0,
    padding: 10
  },
  OneValueInLineButton: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center'
  },

  TwoValueInLineButton: {
    width: '100%',
    flexDirection: 'row',
    marginVertical: 8,
    padding: 10,
    justifyContent: 'space-between',
    borderWidth: 0.5,
    borderRadius: 8,
    borderColor: 'silver',
    alignItems: 'center'
  },
  BirthDatePickerButton: {
    width: '80%',
    flexDirection: 'row'
  },
  RequestStatusConatiner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 0.5,
    borderRadius: 8,
    borderColor: 'silver',
    padding: 10,
  },
  ErrorMessageContainer: {
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
})