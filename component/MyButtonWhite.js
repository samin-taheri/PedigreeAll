import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Dimensions, Platform, Text } from 'react-native'
import * as Animatable from 'react-native-animatable';
import { Ionicons } from '@expo/vector-icons';

const { height } = Dimensions.get("screen");

const MyButtonWhite = (props) => {
    return (
        <>
            <View style={{ top: '0.5%' }}>
                <TouchableOpacity
                    style={styles.PrimaryIconButton}
                    onPress={props.onPress}
                >
                    <Ionicons name={props.Icon} size={props.IconSize} style={{ color: '#2e3f6e', marginRight: 15, left: 10 }} />
                    <View style={styles.SeparatorLine} />
                    <Text style={[styles.TextStyle, { color: '#2e3f6e', fontSize: 15, right: '10%' }]}>{props.Title}</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

export default MyButtonWhite;


const styles = StyleSheet.create({
    PrimaryIconButton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#fff',
        height: 45,
        margin: 5,
        borderRadius: 8,
        width: '100%',
        left: -5,
        borderColor: '#2e3f6e',
    },

    SeparatorLine: {
        backgroundColor: '#2e3f6e',
        width: 1,
        height: 45,
        marginLeft: 5,
        marginRight: 5,
    },
    TextStyle: {
        textAlign: 'center',
        fontSize: 15,
        left: 15
    },
})
