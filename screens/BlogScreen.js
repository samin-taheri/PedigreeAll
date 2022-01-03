import React, { useCallback, useState, useRef, Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  FlatList,
  useWindowDimensions,
  ActivityIndicator,
  Platform
} from 'react-native'
import { WebView } from 'react-native-webview';
import { Card, Button } from 'react-native-elements';
import Icon from "react-native-vector-icons/FontAwesome5";
import { ScrollView } from 'react-native-gesture-handler';
import RBSheet from "react-native-raw-bottom-sheet";
import Moment from 'react-moment';
import 'moment-timezone';
import MyHeader from '../component/MyHeader';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from "react-i18next";
import i18n from "../component/i18n";
import { Translate } from '../component/Helper';

export function BlogScreen({ navigation }) {
  const { t, i18n } = useTranslation();

  const BottomSheetCategory = useRef();
  const [textShown, setTextShown] = useState(false);
  const [lengthMore, setLengthMore] = useState(false);
  const [BlogList, setBlogList] = useState([])
  const [CategoryList, setCategoryList] = useState([])
  const { width: windowWidth } = useWindowDimensions();
  const [selectedCategory, setSelectedCategory] = useState(false)
  const [selectedBlog, setSelectedBlog] = useState()
  const [selectedCategoryID, setSelectedCategoryID] = useState()
  const [BlogIsAvaible, setBlogIsAvaible] = useState()
  const [BlogHeader, setBlogHeader] = useState("Blog")
  const [time, setTime] = React.useState(true);

  const readDataBlogList = async (data) => {
    fetch('https://api.pedigreeall.com/Blog/Get?p_iBlogCategoryId=' + -1 + '&p_iSelection=' + 1, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setBlogList(json.m_cData)
        setTime(false)
      })
      .catch((error) => {
        console.error(error);
      })
  }

  const readDataCategoryList = async (data) => {
    fetch('https://api.pedigreeall.com/BlogCategory/Get?p_iSelection=' + 1, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setCategoryList(json.m_cData)
      })
      .catch((error) => {
        console.error(error);
      })
  }

  React.useEffect(() => {

    readDataBlogList();
    readDataCategoryList();

  }, [])

  const onTextLayout = useCallback(e => {
    setLengthMore(e.nativeEvent.lines.length >= 4); //to check the text is more than 4 lines or not
  }, []);

  const webviewRef = React.useRef(null);
  function onMessage(data) {
    alert(data.nativeEvent.data);
    props.navigation.navigate("Home");
  }

  return (
    <View style={styles.Container}>
      <MyHeader Title="Blog"
        onPress={() => navigation.goBack()}
      >
        {time ?
          <>
            <ActivityIndicator style={styles.Activity} size="large" color="rgba(52, 77, 169, 0.6)" />
          </>
          :
          <>
            <RBSheet
              ref={BottomSheetCategory}
              closeOnDragDown={true}
              closeOnPressMask={true}
              height={Dimensions.get('window').height - 50}
              customStyles={{
                container: {
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10
                },

              }}
            >
              <>
                {CategoryList.length > 0 ?
                  <View>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={{ fontSize: 20, paddingLeft: 20, paddingRight: 20 }}>{t('Filter')}</Text>
                    </View>
                    <FlatList
                      scrollEnabled={true}
                      bounces={false}
                      style={styles.flatList}
                      data={CategoryList}
                      renderItem={({ item }) => (
                        <TouchableOpacity style={styles.latestItem}
                          onPress={() => {
                            setBlogIsAvaible(false)
                            setSelectedCategory(true);
                            setSelectedCategoryID(item.BLOG_CATEGORY_ID);
                            BottomSheetCategory.current.close();
                            BlogList.map((i) => {
                              if (i.BLOG_CATEGORY_OBJECT.BLOG_CATEGORY_ID === item.BLOG_CATEGORY_ID) {
                                setBlogIsAvaible(true)
                              }
                            })
                          }}
                        >
                          <View style={{ flexDirection: 'row' }}>
                            <Ionicons name="chevron-forward-outline" size={16} color="black" />

                            <Text style={styles.textStyle}>
                              {Translate(item.BLOG_CATEGORY_TR ,item.BLOG_CATEGORY_EN)}
                            </Text>
                          </View>
                        </TouchableOpacity>)}
                      keyExtractor={item => item.BLOG_CATEGORY_ID.toString()}
                    />
                  </View>
                  :
                  null
                }
              </>
            </RBSheet>
          </>
        }

        <TouchableOpacity
          style={styles.CategoriesContainer}
          onPress={() => { BottomSheetCategory.current.open(); }}>
          <Icon name="filter" size={16} color="#fff" style={{ justifyContent: 'center' }} />
        </TouchableOpacity>

        {BlogIsAvaible === false ?

          <View style={styles.ErrorMessageContainer}>
            <Icon style={{ marginBottom: 40 }} name="exclamation-circle" size={150} color="#e54f4f" />

            <>
              <Text style={styles.ErrorMessageTitle}>{t('Nodatafound')}</Text>
            </>

            <View style={styles.ErrorMessageButtonContainer}>
              <TouchableOpacity
                style={[styles.ErrorMessageButton, { right: 20 }]}
                onPress={() => { BottomSheetCategory.current.open(); }}
              >
                <Text style={styles.ErrorMessageButtonText}>{t('GotoCategories')}</Text>

              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.ErrorMessageButton, { backgroundColor: '#2e3f6e' }]}
                onPress={() => {
                  setSelectedCategory(false);
                  setBlogIsAvaible(true)
                }}
              >
                <Text style={[styles.ErrorMessageButtonText, { color: 'rgb(232, 237, 241)' }]}>{t('GotoBlog')}</Text>
              </TouchableOpacity>
            </View>
          </View>

          :
          <>

            {BlogList !== undefined ?
              <ScrollView style={{ marginTop: 0, marginBottom: 10 }}>
                {BlogList.map((i) => {
                  return (
                    <View key={i.BLOG_ID}>
                      {selectedCategory ?
                        <>
                          {selectedCategoryID === i.BLOG_CATEGORY_OBJECT.BLOG_CATEGORY_ID &&
                            <>

                              <TouchableOpacity onPress={() => {
                                navigation.navigate('BlogItem', {
                                  selectedBlog: i
                                })
                                setSelectedBlog(i)
                                setBlogHeader(i.BLOG_CATEGORY_OBJECT.BLOG_CATEGORY_TR)
                              }
                              }>
                                <Card
                                  containerStyle={{ elevation: 0, borderWidth: 0.5, borderRadius: 10, padding: 10, borderColor: 'silver', marginBottom: 20 }}
                                >
                                  <Card.Title>{Translate(i.HEADER_TR, i.HEADER_EN)}</Card.Title>
                                  <Card.Image
                                    style={{ borderRadius: 3, }}
                                    source={{ uri: i.IMAGE }} />
                                  <Text
                                    style={{ marginBottom: 10, marginTop: 10 }}
                                    onTextLayout={onTextLayout}
                                    numberOfLines={textShown ? undefined : 3}>
                                    {Translate(i.SUMMARY_TR ,i.SUMMARY_EN)}
                                  </Text>

                                  <Card.Divider />
                                  <View style={styles.ButtonContainer}>
                                    <View style={styles.IconsContainer}>
                                      <Icon name="calendar" size={15} color="#000" />
                                      <Moment style={{ marginLeft: 5, }} element={Text} format="YYYY/MM/DD"><Text>{i.DATE}</Text></Moment>

                                    </View>
                                    <View style={styles.IconsContainer}>
                                      <Icon name="eye" size={15} color="#000" />
                                      <Text style={styles.IconText}>{i.COUNTER}</Text>
                                    </View>
                                  </View>
                                </Card>
                              </TouchableOpacity>
                            </>
                          }
                        </>

                        :
                        <View
                          style={{ width: windowWidth }}>
                          <TouchableOpacity onPress={() => {
                            //BottomSheetBlogSelected.current.open();
                            setSelectedBlog(i)
                            navigation.navigate('BlogItem', {
                              selectedBlog: i
                            })

                          }}>
                            <Card
                              containerStyle={{ width: '85%', elevation: 0, borderWidth: 0.5, borderRadius: 10, padding: 10, borderColor: 'silver', marginBottom: 20 }}
                            >
                              <Card.Title> {Translate(i.HEADER_TR, i.HEADER_EN)}</Card.Title>
                              <Card.Image
                                style={{ borderRadius: 3, resizeMode: "contain" }}
                                source={{ uri: i.IMAGE }} />
                              <View style={[styles.IconsContainer, { marginTop: 10 }]}>
                                <Icon name="tags" size={15} color="#000" />
                                <Text style={styles.IconText}>{Translate(i.BLOG_CATEGORY_OBJECT.BLOG_CATEGORY_TR, i.BLOG_CATEGORY_OBJECT.BLOG_CATEGORY_EN)}</Text>

                              </View>
                              <Text
                                style={{ marginBottom: 10, marginTop: 10 }}
                                onTextLayout={onTextLayout}
                                numberOfLines={textShown ? undefined : 3}>
                                {Translate(i.SUMMARY_TR, i.SUMMARY_EN)}
                              </Text>

                              <Card.Divider />

                              <View style={styles.ButtonContainer}>

                                <View style={styles.IconsContainer}>
                                  <Icon name="calendar" size={15} color="#000" />
                                  <Moment style={{ marginLeft: 5, }} element={Text} format="YYYY/MM/DD"><Text>{i.DATE}</Text></Moment>

                                </View>

                                <View style={styles.IconsContainer}>
                                  <Icon name="eye" size={15} color="#000" />
                                  <Text style={styles.IconText}>{i.COUNTER}</Text>
                                </View>


                              </View>

                            </Card>
                          </TouchableOpacity>

                        </View>
                      }
                    </View>


                  );
                })}
              </ScrollView>
              :
              <ActivityIndicator
                color="#2e3f6e"
                size="large"
                style={styles.ActivityIndicatorStyle}
              />
            }
          </>
        }

      </MyHeader>
    </View >
  );
}

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
    paddingLeft: Platform.OS == 'ios' ? 3 : 0,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
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
  ReadMoreButton: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#2169ab',
    marginVertical: 20
  },
  ButtonText: {
    color: 'white',
  },
  IconsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  IconText: {
    paddingLeft: 5,
  },
  swipeContainer: {
    width: "100%",
  },
  SwipeablePanelContainer: {
    padding: 20,
  },
  SwipeablePanelItem: {
    marginVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  SwipeablePanelText: {
    fontSize: 18,
  },
  FlagContainer: {
    flexDirection: 'row',
  },
  ScrollViewContainer: {
    marginBottom: 40
  },
  SwipableCloseIcon: {
    width: '100%',
    flexDirection: 'row-reverse',
    marginRight: -25
  },
  normalDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: "silver",
    marginHorizontal: 4
  },
  indicatorContainer: {
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
  textContainer: {
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: 5,
    padding: 10
  },
  infoText: {
    marginVertical: 8,
    width: Dimensions.get('screen').width - 50,
    color: "black",
    fontSize: 16,
    fontWeight: 'normal'
  },
  CategoriesContainer: {
    position: 'absolute',
    padding: 20,
    backgroundColor: '#2e3f6e',
    borderBottomWidth: 0.5,
    borderColor: 'silver',
    flexDirection: 'row',
    bottom: 10,
    right: 10,
    borderRadius: 50,
    zIndex: 1
  },
  CategoriesText: {
    fontSize: 16,
    paddingLeft: 10,
    justifyContent: 'center'
  },
  CategoryDataNotFound: {
    width: '100%',
    height: '100%',
    flex: 1,
    backgroundColor: 'pink'
  },
  BottomSheetBlogImageContainer: {
    marginTop: 10
  },
  BottomSheetTitleContainer: {
    marginTop: 20,
    margin: 5
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
    width: '50%',
    padding: 10,
    borderRadius: 8,


  },
  ErrorMessageButtonText: {
    textAlign: 'center',
    color: '#2e3f6e',
    fontSize: 14,
  },
  ActivityIndicatorStyle: {
    position: 'absolute',
    zIndex: 1,
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  },
  flatList: {
    paddingBottom: 20,
    paddingTop: 10,
    borderTopWidth: 0.5,
    borderTopColor: '#CFCFD5',
    marginTop: 10,
    maxHeight: Dimensions.get('screen').height,
    width: '100%',
    left: 10,


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
  textStyle: {
    left: 10,

    fontSize: 12
  },
  textStyle2: {
    left: 5,
    fontSize: 13,
    fontWeight: 'bold'
  },
})

class RenderHTML extends Component {
  render() {
    return (
      <WebView
        originWhitelist={['*']}
        source={{ html: '<h1>Hello world</h1>' }}
      />
    );
  }
}

