import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, TextInput, ToastAndroid, StyleSheet, StatusBar, ScrollView, Platform, TouchableOpacity, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import RNPickerSelect from 'react-native-picker-select';
import Toast from 'react-native-toast-message';
import * as Haptics from 'expo-haptics';
import CheckBox1 from '../component/CheckBox1';
import CheckBox2 from '../component/CheckBox2';
import MyHeader from '../component/MyHeader';
import MyButton from '../component/MyButton';
import { useTranslation } from "react-i18next";
import i18n from "../component/i18n";
import { Translate } from '../component/Helper';

function showMessage(data, navigation) {

    var durum = false;
    if (data.m_eProcessState > 0) {
        if (Platform.OS != "web")
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
        Toast.show({
            type: 'success',
            position: 'top',
            text1: 'başarılı',
            text2: data.m_lUserMessageList[0],
            visibilityTime: 4000,
            autoHide: true,
            topOffset: StatusBar.currentHeight || 42,
            bottomOffset: 40,
            onShow: () => { navigation.navigate("Login") },
            onHide: () => { },
            onPress: () => { }

        });
    }
    else {
        durum = false;
        if (Platform.OS != "web")
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
        Toast.show({
            type: 'error',
            position: 'top',
            text1: 'Hata',
            text2: data.m_lUserMessageList[0],
            visibilityTime: 4000,
            autoHide: true,
            topOffset: StatusBar.currentHeight || 42,
            bottomOffset: 40,
            onShow: () => { },
            onHide: () => { },
            onPress: () => { }
        });
    }
}




const RegisterScreen = ({ route, navigation }) => {

    const [countryID, setCountryID] = React.useState(0);
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [password_again, setPassword_again] = React.useState("");
    const [name, setname] = React.useState("");
    const [surname, setsurname] = React.useState("");
    const [error, setError] = React.useState("");
    const [checked_1, toggleChecked_1] = useState(true);
    const [checked_2, toggleChecked_2] = useState(false);
    const [CounrtyList, setCountryList] = useState([]);
    const [checkedPersonal, setCkeckedPersonal] = useState(false);
    const [checkedLegal, setCkeckedLegal] = useState(false);
    const { t, i18n } = useTranslation();

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
                        label: Translate(item.COUNTRY_TR, item.COUNTRY_EN),
                        value: item.COUNTRY_ID,
                        key: item.COUNTRY_ID.toString()
                    })
                ))

                setCountryList(list)
            })
            .catch((error) => {
                console.error(error);
            })
    }


    React.useEffect(() => {
        readDataCountryList();        
    }, []);



    const [data, setData] = React.useState({
        email: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
        confirm_secureTextEntry: true,
    });

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry
        });
    }


    return (
        <View style={styles.container}>

            <MyHeader

                onPress={() => navigation.goBack()}
                showLogo={true}
            >
                <View style={{ padding: 20 }}>
                    <ScrollView >
                        <Text style={styles.text_footer}>{t('EmailText')}</Text>
                        <View style={styles.action}>
                            <Feather
                                name="mail"
                                color="#2e3f6e"
                                size={20}
                            />
                            <TextInput
                                placeholder={t('EnterYourEmail')}
                                name={"username"}
                                value={email}
                                keyboardType='email-address'
                                onChangeText={setEmail}
                                style={styles.textInput}
                                autoCapitalize="none"
                            />
                            {data.check_textInputChange ?
                                <Animatable.View
                                    animation="bounceIn"
                                >
                                    <Feather
                                        name="check-circle"
                                        color="green"
                                        size={20}
                                    />
                                </Animatable.View>
                                : null}
                        </View>

                        <View >
                            <Text style={styles.text_footer}>{t('PasswordText')}</Text>
                            <View style={styles.action}>
                                <Feather
                                    name="lock"
                                    color="#2e3f6e"
                                    size={20}
                                />
                                <TextInput
                                    placeholder={t('EnterYourPassword')}
                                    secureTextEntry={data.secureTextEntry ? true : false}
                                    style={styles.textInput}
                                    autoCapitalize="none"
                                    name={"password"}
                                    value={password}
                                    onChangeText={setPassword}
                                />
                                <TouchableOpacity
                                    onPress={updateSecureTextEntry}
                                >
                                    {data.secureTextEntry ?

                                        <Feather
                                            name="eye-off"
                                            color="grey"
                                            size={20}
                                        />
                                        :
                                        <Feather
                                            name="eye"
                                            color="grey"
                                            size={20}
                                        />
                                    }

                                </TouchableOpacity>
                            </View>

                        </View>
                        <View>
                            <Text style={styles.text_footer}>{t('Confirm Password')}</Text>
                            <View style={styles.action}>
                                <Feather
                                    name="lock"
                                    color="#2e3f6e"
                                    size={20}
                                />
                                <TextInput
                                    placeholder={t('EnterYourPasswordAgain')}
                                    secureTextEntry={data.confirm_secureTextEntry ? true : false}
                                    style={styles.textInput}
                                    autoCapitalize="none"
                                    name={"password"}
                                    value={password_again}
                                    onChangeText={setPassword_again}
                                />
                                <TouchableOpacity
                                    onPress={updateConfirmSecureTextEntry}
                                >
                                    {data.confirm_secureTextEntry ?
                                        <Feather
                                            name="eye-off"
                                            color="grey"
                                            size={20}
                                        />
                                        :
                                        <Feather
                                            name="eye"
                                            color="grey"
                                            size={20}
                                        />
                                    }
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View >
                            <Text style={styles.text_footer}>{t('NameText')}</Text>
                            <View style={styles.action}>
                                <Feather
                                    name="user"
                                    color="#2e3f6e"
                                    size={20}
                                />
                                <TextInput
                                    placeholder={t('EnterYourName')}
                                    style={styles.textInput}
                                    value={name}
                                    onChangeText={setname}
                                />
                                {data.check_textInputChange ?
                                    <Animatable.View
                                        animation="bounceIn"
                                    >
                                        <Feather
                                            name="check-circle"
                                            color="green"
                                            size={20}
                                        />
                                    </Animatable.View>
                                    : null}
                            </View>
                        </View>
                        <View>
                            <Text style={styles.text_footer}>{t('SurnameText')}</Text>
                            <View style={[styles.action, {}]}>
                                <Feather
                                    name="user"
                                    color="#2e3f6e"
                                    size={20}
                                />
                                <TextInput
                                    placeholder={t('EnterYourSurname')}
                                    style={styles.textInput}
                                    value={surname}
                                    onChangeText={setsurname}

                                />
                                {data.check_textInputChange ?
                                    <Animatable.View
                                        animation="bounceIn"
                                    >
                                        <Feather
                                            name="check-circle"
                                            color="green"
                                            size={20}
                                        />
                                    </Animatable.View>
                                    : null}
                            </View>
                        </View>

                        <View>
                            <Text style={styles.text_footer}>{t('CountryText')}</Text>
                            <View style={styles.action}>
                                <Feather
                                    name="globe"
                                    color="#2e3f6e"
                                    size={20}
                                />

                                <RNPickerSelect
                                    value={countryID}

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
                                    value={countryID}
                                    key={countryID.toString()}
                                />
                            </View>

                        </View>

                        <View>

                            <Text style={styles.text_footer}>{t('Member Type')}</Text>
                            <View style={styles.CheckboxView}>


                                <CheckBox1 label={t('Personal')} checked ={setCkeckedPersonal} status={checked_1 ? 'checked' : 'unchecked'} onPress={() => {
                                    if (checked_2 === true) {
                                        toggleChecked_1(!checked_1);
                                        toggleChecked_2(!checked_2);
                                    }
                                }} />
                                <CheckBox2 label={t('Legal Entity')} checked ={setCkeckedPersonal} status={checked_2 ? 'checked' : 'unchecked'} onPress={() => {
                                    if (checked_1 === true) {
                                        toggleChecked_2(!checked_2);
                                        toggleChecked_1(!checked_1);
                                    }
                                }} />

                            </View>
                        </View>



                        <View style={{ marginTop: 15, marginBottom: 50 }}>

                            <MyButton
                                Title={t('Sign Up')}
                                Icon="log-in-outline"
                                IconSize={24}
                                onPress={async (e) => {
                                    fetch('https://api.pedigreeall.com/systemuser/SignUp', {
                                        method: 'POST',
                                        headers: {
                                            Accept: 'application/json',
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({
                                            NAME: name,
                                            SURNAME: surname,
                                            EMAIL: email,
                                            PASSWORD: password,
                                            ADDRESS: password_again,
                                            COUNTRY_OBJECT: {
                                                COUNTRY_ID: countryID
                                            },
                                            PERSON_TYPE_OBJECT: {
                                                PERSON_TYPE_ID: (
                                                    checked_1 ? 1 : 2
                                                )
                                            }
                                        })
                                    })
                                        .then((response) => response.json())
                                        .then((json) => {
                                            showMessage(json, navigation);
                                        })
                                        .catch((error) => {
                                            console.error(error);
                                        })
                                }}
                            >
                            </MyButton>
                        </View>
                    </ScrollView>
                </View>
            </MyHeader>

        </View >
    );
};

const { height } = Dimensions.get("screen");
const { width } = Dimensions.get("screen");
const height_logo = height * 0.1;
const width_logo = width * 0.90;
const windowWidth = Dimensions.get('window').width - 100;

export default RegisterScreen;


const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        paddingHorizontal: 16,
        fontSize: 15,
        flex: 1,
        marginTop: -20,
        minHeight: 56,
        maxHeight: 56,
        width: '100%',
        bottom: 5,
        left: 15,
        borderRadius: 4,
        marginBottom: 0,
        justifyContent: 'center',
        paddingTop: 5,
    },
    viewContainer: {
        flex: 1,
    },
    inputAndroid: {
        marginLeft: 10,
        color: 'black',
        marginTop: -20,
        fontSize: 15,
        flex: 1,
        minHeight: 56,
        maxHeight: 56,
        width: windowWidth,
        borderRadius: 4,
        justifyContent: 'center',
        paddingTop: 8,
        left: 10,
    },
    placeholder: { color: '#9a9aa1', fontSize: 14 },
});


const styles = StyleSheet.create({
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
        fontWeight: 'bold',
        fontSize: 30
    },
    CheckboxView: {
        marginVertical: 10,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },

    text_footer: {
        color: '#05375a',
        fontSize: 14
    },

    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    }, logo: {
        width: width_logo,
        height: height_logo
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        paddingTop: 8,
        color: '#05375a',
        marginBottom: 10,
        bottom: Platform.OS === 'ios' ? 5 : 0,
        paddingLeft: 20

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
        borderWidth: 3,
        borderColor: '#000',
    },
    signInButton: {
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2e3f6e',
        borderRadius: 8,
        flexDirection: 'row'
    },
    textSign: {
        fontSize: 15,
    },
    TextStyle: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600'
    },
    container: {
        width: '100%',
        height: '100%',
    },
    InformationText4: {
        fontSize: 15,
        color: '#000',
        marginRight: 'auto',
        left: 20
    },

    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 10
    },
    logo: {
        width: width_logo,
        height: height_logo,
        bottom: 25
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
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 0,
        marginVertical: 10,
        marginBottom: 20
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
        width: '90%',
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
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 14
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
        width: '47%',
        flexDirection: 'row',
        marginVertical: 8,
        padding: 10,
        justifyContent: 'space-between',
        borderWidth: 0.5,
        borderRadius: 8,
        borderColor: 'silver',
        alignItems: 'center'
    },
    TextInputContainer: {
        padding: 10,
        borderWidth: 0.5,
        borderColor: 'silver',
        borderRadius: 8,
        flexDirection: 'row',
        marginVertical: 5,
        alignSelf: 'center',
        width: 365
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
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        width: '60%',
        fontSize: 15,
        marginLeft: 10,
        left: 20
    },
    EarningPriceButtonText: {
        fontSize: 15,
        marginRight: 5,
    },
    CoachOwnerContainer: {
        marginVertical: 10,
        width: 365,
        alignSelf: 'center'
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
    ButtonContainer: {
        alignItems: 'center'
    },
    SwipableCloseIcon: {
        width: '100%',
        flexDirection: 'row-reverse',
        marginRight: -25,
    },
});