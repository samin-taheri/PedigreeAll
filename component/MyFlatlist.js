import React from 'react';
import { View, Easing, SafeAreaViewBase, Animated, StyleSheet, FlatList, Text, Dimensions, TouchableOpacity, Image, StatusBar, Alert, TextInput, Button, Keyboard, Platform } from 'react-native'
import * as Animatable from 'react-native-animatable';
import { Ionicons } from '@expo/vector-icons';
import faker from 'faker'

faker.seed(10);
const SPACING = 20;
const AVATAR_SIZE = 65;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;

const MyFlatlist = (props) => {

    const scrollY = React.useRef(new Animated.Value(0)).current;

    return (
        <View style={{ paddingLeft: 20, padding: 10, bottom: Platform.OS == 'ios' ? '10%' : '20%' }}>

            <Animated.FlatList
                scrollEnabled={true}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
                bounces={false}
                style={styles.flatList}
                data={props.data}
                contentContainerStyle={{
                    padding: SPACING,
                    paddingTop: StatusBar.currentHeight || 42
                }}
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
                        onPress={props.onPress}

                    >
                        <Image style={styles.image}
                            source={ props.source }
                            resizeMode="cover"
                        />
                        <View style={{ flexDirection: 'column' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={[styles.textStyle2]}>Horse: </Text>

                                <Text style={styles.textStyle}>
                                    {props.horseName}
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={[styles.textStyle2]}>Sire: </Text>

                                <Text style={styles.textStyle}>
                                    {props.SireName}
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={[styles.textStyle2]}>Mare: </Text>
                                <Text style={styles.textStyle}>
                                    {props.MareName}
                                </Text>
                            </View>

                        </View>

                    </TouchableOpacity>
                }}
                keyExtractor={item => item.HORSE_ID.toString()}
            />
        </View>

    );
}

const { height } = Dimensions.get("screen");
const { width } = Dimensions.get("screen");
export default MyFlatlist;


const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
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

    Container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        margin: 0,
    },
    TextStyle: {
        textAlign: 'center',
        fontSize: 15,
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
        width: AVATAR_SIZE,
        height: AVATAR_SIZE,
        borderRadius: AVATAR_SIZE,
        marginRight: SPACING / 2
    },
    flatList: {
        paddingBottom: 20,
        paddingTop: 5,
        marginTop: '8%',
        marginLeft: -15,
        height: Dimensions.get('screen').height / 1.40,
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
    latestItem: {
        flexDirection: 'row',
        padding: SPACING,
        marginBottom: SPACING,
        backgroundColor: '#fff',
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,

    },
})
