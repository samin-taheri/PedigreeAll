import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Dimensions, Platform, Text } from 'react-native'
import * as Animatable from 'react-native-animatable';
import { Ionicons } from '@expo/vector-icons';

const { height } = Dimensions.get("screen");

const MyButton = (props) => {
    return (
        <>
            <View style={{ bottom: '1%' }}>
                <TouchableOpacity
                    style={styles.PrimaryIconButton }

                    onPress={props.onPress}
                >
                    <Ionicons name={props.Icon} size={props.IconSize} style={{ color: '#fff', marginRight: 15, left: 10 }} />
                    <View style={styles.SeparatorLine} />
                    <Text style={[styles.TextStyle, { color: '#fff' }]}>{props.Title}</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

export default MyButton;


const styles = StyleSheet.create({
    PrimaryIconButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2e3f6e',
        borderWidth: .5,
        borderColor: '#fff',
        height: 45,
        margin: 5,
        borderRadius: 8,
        width: '100%',
        left: -5
    },

    SeparatorLine: {
        backgroundColor: '#fff',
        width: 0.8,
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
