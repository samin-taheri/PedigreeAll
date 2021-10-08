import React, { useCallback, useState, useRef, Component } from 'react'
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image
} from 'react-native'
import WebView from 'react-native-webview';
import { Card, Button } from 'react-native-elements';
import Icon from "react-native-vector-icons/FontAwesome5";
import { ScrollView } from 'react-native-gesture-handler';
import Moment from 'react-moment';
import 'moment-timezone';
import { Global } from './Global';
import { Ionicons } from '@expo/vector-icons';
import MyHeader from '../component/MyHeader';

export function BlogItemScreen({ route, navigation }) {
  const { selectedBlog } = route.params;
  return (

    <View style={styles.Container}>
      <MyHeader Title={selectedBlog.BLOG_CATEGORY_OBJECT.BLOG_CATEGORY_TR}
        onPress={() => navigation.navigate('Blog')}
      >

        {selectedBlog !== undefined &&
          <Card
            containerStyle={{ elevation: 0, borderWidth: 0.5, borderRadius: 10, padding: 10 , borderColor: 'silver', marginBottom: 20}}
            scrollEnabled={true}
          >

            <View style={styles.ButtonContainer}>
              <View style={styles.IconsContainer}>
                <Icon name="calendar" size={15} color="#000" />
                <Moment style={{ marginLeft: 5, }} element={Text} format="YYYY/MM/DD"><Text>{selectedBlog.DATE}</Text></Moment>
              </View>
              <View style={styles.IconsContainer}>
                <Icon name="eye" size={15} color="#000" />
                <Text style={styles.IconText}>{selectedBlog.COUNTER}</Text>
              </View>
            </View>
            <View style={[styles.IconsContainer, { marginTop: 10 }]}>
              <Icon name="tags" size={15} color="#000" />
              {Global.Language === 1 ?
                <Text style={styles.IconText}>{selectedBlog.BLOG_CATEGORY_OBJECT.BLOG_CATEGORY_TR}</Text>
                :
                <Text style={styles.IconText}>{selectedBlog.BLOG_CATEGORY_OBJECT.BLOG_CATEGORY_EN}</Text>
              }

            </View>
            <ScrollView>
              <Card.Image
                style={{ borderRadius: 3, resizeMode: 'contain', height: 200, marginTop: 10 }}
                source={{ uri: selectedBlog.IMAGE }} />


              {Global.Language === 1 ?
                <WebView
                  source={{ baseUrl: '', html: selectedBlog.BLOG_TR + '<meta name="viewport" content="width=device-width, initial-scale=1">' }}
                  originWhitelist={['*']}
                  automaticallyAdjustContentInsets={true}
                  javaScriptEnabledAndroid={true}
                  scrollEnabled={true}
                  startInLoadingState={true}
                  bounces={true}
                  style={{ width: '100%', height: 200 }}
                  renderLoading={() => <ActivityIndicator color='#000' size='large' />}
                />
                :
                <WebView
                  source={{ baseUrl: '', html: selectedBlog.BLOG_EN + '<meta name="viewport" content="width=device-width, initial-scale=1">' }}
                  originWhitelist={['*']}
                  automaticallyAdjustContentInsets={true}
                  javaScriptEnabledAndroid={true}
                  scrollEnabled={true}
                  startInLoadingState={true}
                  bounces={true}
                  style={{ width: '100%', height: 200 }}
                  renderLoading={() => <ActivityIndicator color='#000' size='large' />}
                />
              }
            </ScrollView>
          </Card>
        }

      </MyHeader>
    </View>

  )
}


const styles = StyleSheet.create({
  Container: {
    backgroundColor: '#fff',
    flex: 1,
    width: '100%',
    height: '100%'
  },
  Title: {
    fontSize: 24,
    fontWeight: '500',
    textAlign: 'center',
    marginVertical: 20,
    textTransform: 'uppercase'
  },
  ButtonContainer: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexDirection: 'row'
  },
  IconsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  IconText: {
    paddingLeft: 5,
  },
  card: {
    flex: 1,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 5,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    resizeMode: 'cover'
  },
})