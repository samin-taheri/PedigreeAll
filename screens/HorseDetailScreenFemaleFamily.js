import React from 'react'
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Platform , TouchableOpacity} from 'react-native'
import { Global } from './Global'
import Icon from "react-native-vector-icons/FontAwesome5";
import Flag from "react-native-flags";
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from "react-i18next";
import i18n from "../component/i18n";

function HorseDetailScreenFemaleFamily({ BackButton, navigation, route }) {


    const [time, setTime] = React.useState(true)
    const [getFemaleFamilyReport, setFemaleFamilyReport] = React.useState();
    const [upward, setUpward] = React.useState(false);
    const { HORSE_ID } = route.params;
    const { SECOND_ID } = route.params;
    const { Horse_Second_ID_Female_Family } = route.params;
    const { Generation } = route.params;
    const { MinCross_Fename_Family } = route.params;
    const { t, i18n } = useTranslation();

    const readFemaleFamilyReport = async () => {
        try {
            if (Global.Token !== null) {
                fetch('https://api.pedigreeall.com/FemaleFamily/GetFemaleFamilyReport?p_iFirstId=' + HORSE_ID+ '&p_iSecondId='+ SECOND_ID +'&p_iDamCount=' + Generation + '&p_iGenerationCount=2' ,{
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + Global.Token,
                    },
                }).then((response) => response.json())
                    .then((json) => {
                        if (json !== null) {
                            setFemaleFamilyReport(json.m_cData)
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
            console.log("GetFemaleFamilyReport Error")
        }
    };
    React.useEffect(() => {
        readFemaleFamilyReport();
    }, [])


    return (
        <View style={styles.Container}>

            {time ?
                <ActivityIndicator style={styles.Activity} size="large" color="rgba(52, 77, 169, 0.6)" />
                :
                <>
                <ScrollView vertical={true}>
                {getFemaleFamilyReport !== undefined &&
                    <ScrollView style={{marginBottom: 10}}>
                        {getFemaleFamilyReport.HORSE_INFO_LIST.map((item, index) => (
                            <View
                                style={styles.NodeOfTreeContainer}
                                key={index}>
                                {item.HORSE_INFO_OBJECT.IS_SIRE ?
                                    <View
                                        style={styles.NodeOfTreeSire}>
                                        <View style={styles.TitleContainer}>
                                            <Flag code={item.HORSE_INFO_OBJECT.ICON.toUpperCase()} size={16} style={styles.IconStyle} />
                                            <Text style={styles.TitleStyle}>{item.HORSE_INFO_OBJECT.HORSE_NAME.replace('<b>', '').replace('</b>', '')}</Text>
                                        </View>
                                        <Text style={styles.TextStyle}>by {item.HORSE_INFO_OBJECT.FATHER_NAME}</Text>
                                        <View style={styles.InformationIconContainer}>
                                            <Icon name="male" size={14} color="#000" style={{ marginRight: 5 }} />
                                            <Icon name="exclamation-circle" size={14} color="#000" style={{ marginRight: 5 }} />
                                            <Icon name="image" size={14} color="#000" style={{ marginRight: 5 }} />
                                            <Icon name="chart-line" size={14} color="#000"></Icon>
                                        </View>
                                    </View>
                                    :
                                    <View
                                        style={styles.NodeOfTreeNotSire}>
                                        <View style={styles.TitleContainer}>
                                            <Flag code={item.HORSE_INFO_OBJECT.ICON.toUpperCase()} size={16} style={styles.IconStyle} />
                                            <Text style={styles.TitleStyle}>{item.HORSE_INFO_OBJECT.HORSE_NAME.replace('<b>', '').replace('</b>', '')}</Text>
                                        </View>
                                        <Text style={styles.TextStyle}>by {item.HORSE_INFO_OBJECT.FATHER_NAME}</Text>
                                        <View style={styles.InformationIconContainer}>
                                            <TouchableOpacity>
                                                <Icon name="female" size={14} color="#000" style={{ marginRight: 5 }} />
                                            </TouchableOpacity>

                                            <Icon name="exclamation-circle" size={14} color="#000" style={{ marginRight: 5 }} />
                                            <Icon name="image" size={14} color="#000" style={{ marginRight: 5 }} />
                                            <Icon name="chart-line" size={14} color="#000"></Icon>
                                        </View>
                                    </View>

                                }


                                {item.CHILDREN_LIST.map((itemChildren, indexChildren) => (
                                    <View
                                        style={styles.LeafOfTreeContainer}
                                        key={indexChildren}>
                                        {itemChildren.HORSE_INFO_OBJECT.IS_SIRE ?
                                            <View style={styles.ChildrenCotainer}>
                                                <Ionicons style={styles.icon} name="arrow-forward-outline" size={18} color="#000" style={styles.IconStyle} />
                                                <View
                                                    style={styles.LeafOfTreeSire}>
                                                    <View style={styles.TitleContainer}>
                                                        <Flag code={itemChildren.HORSE_INFO_OBJECT.ICON.toUpperCase()} size={16} style={styles.IconStyle} />
                                                        <Text style={styles.TitleStyle}>{itemChildren.HORSE_INFO_OBJECT.HORSE_NAME.replace('<b>', '').replace('</b>', '')}</Text>
                                                    </View>
                                                    <Text style={styles.TextStyle}>by {item.HORSE_INFO_OBJECT.FATHER_NAME}</Text>
                                                    <View style={styles.InformationIconContainer}>
                                                        <Icon name="male" size={14} color="#000" style={{ marginRight: 5 }} />
                                                        <Icon name="exclamation-circle" size={14} color="#000" style={{ marginRight: 5 }} />
                                                        <Icon name="image" size={14} color="#000" style={{ marginRight: 5 }} />
                                                        <Icon name="chart-line" size={14} color="#000"></Icon>
                                                    </View>
                                                </View>
                                            </View>

                                            :
                                            <View style={styles.ChildrenCotainer}>
                                                <Ionicons style={styles.icon} name="arrow-forward-outline" size={18} color="#000" style={styles.IconStyle} />
                                                <View
                                                    style={styles.LeafOfTreeNotSire}>
                                                    <View style={styles.TitleContainer}>
                                                        <Flag code={itemChildren.HORSE_INFO_OBJECT.ICON.toUpperCase()} size={16} style={styles.IconStyle} />
                                                        <Text style={styles.TitleStyle}>{itemChildren.HORSE_INFO_OBJECT.HORSE_NAME.replace('<b>', '').replace('</b>', '')}</Text>
                                                    </View>
                                                    <Text style={styles.TextStyle}>by {item.HORSE_INFO_OBJECT.FATHER_NAME}</Text>
                                                    <View style={styles.InformationIconContainer}>
                                                        <Icon name="female" size={14} color="#000" style={{ marginRight: 5 }} />
                                                        <Icon name="exclamation-circle" size={14} color="#000" style={{ marginRight: 5 }} />
                                                        <Icon name="image" size={14} color="#000" style={{ marginRight: 5 }} />
                                                        <Icon name="chart-line" size={14} color="#000"></Icon>
                                                    </View>
                                                </View>
                                            </View>

                                        }

                                    </View>
                                ))}


                            </View>
                        ))}
                    </ScrollView>

                }
                </ScrollView>
            </>
            }

        </View>
    )
}
export default HorseDetailScreenFemaleFamily;

const styles = StyleSheet.create({
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
        paddingLeft: Platform.OS == 'ios' ? 3: 0,
        borderRadius: 30, 
        alignItems: 'center', 
        justifyContent: 'center', 
        alignSelf: 'center'
    },
    NodeOfTreeContainer: {
        padding: 15
    },
    NodeOfTreeSire: {
        padding: 20,
        backgroundColor: '#b9cdf5bf',
        borderRadius: 10,
        width: '100%',
    },
    NodeOfTreeNotSire: {
        padding: 20,
        backgroundColor: '#f8cdffd4',
        borderRadius: 10,
        width: '100%',
    },
    LeafOfTreeContainer: {
        padding: 4,
        marginLeft: 20,
    },
    ChildrenCotainer: {
        flexDirection: 'row',
    },
    TextStyle:{
        fontSize: 12,
    },
    LeafOfTreeSire: {
        padding: 8,
        backgroundColor: '#b9cdf5bf',
        borderRadius: 10,
        marginLeft: 5,
        width: '95%',
    },
    LeafOfTreeNotSire: {
        padding: 8,
        backgroundColor: '#f8cdffd4',
        borderRadius: 10,
        marginLeft: 5,
        width: '95%',
    },
    IconStyle: {
        alignSelf: 'center',
        bottom: '0.1%'
    },
    TitleContainer: {
        flexDirection: 'row'
    },
    TitleStyle: {
        marginLeft: 10,
        width: '90%',
        fontSize: 12,
        fontWeight: '700'
    },
    InformationIconContainer: {
        flexDirection: 'row',
        marginTop: 10,
        marginLeft: 5
    },
    BackButton:{
        flexDirection:'row',
        alignSelf:'baseline',
        padding:10,
        width:'100%',
        borderBottomWidth:0.5, 
        borderColor:'silver',
        marginBottom:10
      },
      
})