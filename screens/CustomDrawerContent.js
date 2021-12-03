import React, { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Linking,
  Text,
  Platform
} from 'react-native';
import { Global } from "./Global";
import { DrawerContentScrollView } from '@react-navigation/drawer';
import Animated from 'react-native-reanimated';
import { SocialIcon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from "react-i18next";
import i18n from "../component/i18n";



function CustomDrawerContent(props) {

  const { t, i18n } = useTranslation();
  const drawerItems = [
    {
      key: 'Home',
      title: t('Home'),
      Image: 'https://img.icons8.com/material-outlined/96/000000/home--v2.png',
      routes: [
        {
          nav: 'MainDrawer',
          routeName: 'Home',
          title: t('Home'),
        }
      ],
    },
    {
      key: 'EffectiveNick',
      title: 'EffectiveNick',
      forward:'https://img.icons8.com/material-rounded/96/000000/forward.png',
      Image: 'https://img.icons8.com/fluency-systems-regular/96/000000/graph-report.png',
      routes: [
        {
          nav: 'MainDrawer',
          routeName: 'CreateMatchReport',
          title: t('CreateMatchReport')
        },
        {
          nav: 'MainDrawer',
          routeName: 'RegisteredStallions',
          title: t('RegisteredStallions')
        },
      ],
    },
    {
      key: 'Breeders',
      title: t('Breeders'),
      forward:'https://img.icons8.com/material-rounded/96/000000/forward.png',
      Image: 'https://img.icons8.com/windows/96/000000/cowboy-hat.png',
  
      routes: [
        {
          nav: 'MainDrawer',
          routeName: 'PedigreeQuery',
          title: t('PedigreeQuery')
        },
        {
          nav: 'MainDrawer',
          routeName: 'HypoMating',
          title: t('HypoMating')
        },
        {
          nav: 'MainDrawer',
          routeName: 'MareMotherSiblingsScreen',
          title: t('Mare(Mother)Siblings')
        },
        {
          nav: 'MainDrawer',
          routeName: 'StallionFatherSiblings',
          title: t('Stallion(Father)Siblings')
        },
        {
          nav: 'MainDrawer',
          routeName: 'TailFemale',
          title: t('TailFemale')
        },
        {
          nav: 'MainDrawer',
          routeName: 'Progeny',
          title: t('Progeny')
        },
        {
          nav: 'MainDrawer',
          routeName: 'Profile',
          title: t('Profile')
        },
        {
          nav: 'MainDrawer',
          routeName: 'Linebreeding',
          title: 'Linebreeding'
        },
        {
          nav: 'MainDrawer',
          routeName: 'FemaleFamily',
          title: t('FemaleFamily')
        },
        {
          nav: 'MainDrawer',
          routeName: 'FoalsAsBroodMareSire',
          title: t('FoalsAsBroodMareSire')
        },
        {
          nav: 'MainDrawer',
          routeName: 'CompareHorses',
          title: t('CompareHorses')
        },
        {
          nav: 'MainDrawer',
          routeName: 'BroodmareSireSiblings',
          title: t('BroodmareSireSiblings')
        },
        {
          nav: 'MainDrawer',
          routeName: 'Search',
          title: t('Search')
        },
      ],
    },
    {
      key: 'Ads',
      title: t('Ads'),
      forward:'https://img.icons8.com/material-rounded/96/000000/forward.png',
      Image: 'https://img.icons8.com/fluency-systems-regular/96/000000/ad-banner.png',
  
      routes: [
               {
          nav: 'MainDrawer',
          routeName: 'HorsesForSale',
          title: t('HorsesForSale')
        },
        {
          nav: 'MainDrawer',
          routeName: 'RegisteredStallions',
          title: t('RegisteredStallions')
        }
      ],
    },
    {
      key: 'Requests',
      title: t('Requests'),
      forward:'https://img.icons8.com/material-rounded/96/000000/forward.png',
      Image: 'https://img.icons8.com/windows/96/000000/ask-question.png',
      routes: [
        {
          nav: 'MainDrawer',
          routeName: 'AddAHorse2',
          title: t('AddAHorse')
        },
        {
          nav: 'MainDrawer',
          routeName: 'MyAddingRequest',
          title: t('MyAddingRequests')
        },
        {
          nav: 'MainDrawer',
          routeName: 'EditAHorse',
          title: t('EditAHorse')
        },
        {
          nav: 'MainDrawer',
          routeName: 'MyEditRequests',
          title: t('MyEditRequest')
        },
        {
          nav: 'MainDrawer',
          routeName: 'DeleteAHorse',
          title: t('DeleteAHorse')
        },
        {
          nav: 'MainDrawer',
          routeName: 'MyDeleteRequests',
          title: t('MyDeleteRequest')
        },
      ],
    },
  
    {
      key: 'Blog',
      title: 'Blog',
      Image: 'https://img.icons8.com/windows/96/000000/google-blog-search.png',
      routes: [
        {
          nav: 'MainDrawer',
          routeName: 'Blog',
          title: 'Blog'
        }],
    },
    {
      key: 'Contact',
      title: t('Contact'),
      Image: 'https://img.icons8.com/fluency-systems-regular/96/000000/contact-card.png',
      routes: [
        {
          nav: 'MainDrawer',
          routeName: 'Contact',
          title: t('Contact')
        }],
    },
  ];


  const saveData = async (data) => {
    try {
      await AsyncStorage.setItem('USER', null)
      Global.SideNavigationData =[];
      setIsLoading(false)
      console.log('Data successfully saved')
    } catch (e) {
      console.log('Failed to save the data to the storage')
    }
  }

  const readData = async () => {
    try {
      const userKey = await AsyncStorage.getItem('USER')
      if (userKey !== null) {
        setUser(userKey)
        const user = JSON.parse(userKey)[0].PAGE_LIST
        setUserData(user);
        const mail = JSON.parse(userKey)[0].EMAIL
        setUserMail(mail);
        if (mail === "info@pedigreeall.com") {
          Global.IsLogin = false;
          Global.SideNavigationData = JSON.parse(userKey)[0].PAGE_LIST;
        }
        else {
          Global.IsLogin = true;
          Global.SideNavigationData = JSON.parse(userKey)[0].PAGE_LIST;
        }
        setIsLoading(false)
      }
      else {
        Global.IsLogin = false
        fetch('https://api.pedigreeall.com/systemuser/login', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            EMAIL: 'info@pedigreeall.com',
            PASSWORD: 'Ccoft2020'
          })
        })
          .then((response) => response.json())
          .then((json) => {
            if (json.m_cDetail.m_eProcessState > 0) {
              saveData(JSON.stringify(json.m_cData))
            }

          })
          .catch((error) => {
            console.error(error);
          })
      }
    } catch (e) {
    }
  }

  React.useEffect(() => {
    setIsLoading(true);
    readData();
  }, [])


  const removeData = async () => {
    try {
      await AsyncStorage.removeItem('USER')
      await AsyncStorage.removeItem('TOKEN')
     
      //console.log('Data successfully saved')
    } catch (e) {
      console.log('Failed to remove user')
    }
  }
  const [isLoading, setIsLoading] = React.useState(false);
  const [user, setUser] = useState();
  const [mainDrawer, setMainDrawer] = useState(true);
  const [filteredItems, setFilteredItems] = useState([]);

  const toggleMainDrawer = () => {
    setMainDrawer(true);
    setFilteredItems([]);
  };
  const onItemParentPress = (key) => {
    const filteredMainDrawerRoutes = drawerItems.find((e) => {
      return e.key === key;
    });
    if (filteredMainDrawerRoutes.routes.length === 1) {
      const selectedRoute = filteredMainDrawerRoutes.routes[0];
      props.navigation.toggleDrawer();
      props.navigation.navigate(selectedRoute.nav, {
        screen: selectedRoute.routeName,
      });
    } else {
      setMainDrawer(false);
      setFilteredItems(filteredMainDrawerRoutes);
    }
  };

  function renderMainDrawer() {
    return (
      <Animated.View style={{ flex: 1 }}>
        {drawerItems.map((parent) => (
          <View key={parent.key}>
            <TouchableOpacity
              key={parent.key}
              testID={parent.key}
              onPress={() => {
                onItemParentPress(parent.key);
              }}>
              <View style={styles.parentItem}>
                <Image style={{ width: 24, height: 24, position: 'absolute', left: 15 }}
                  source={{
                    uri: parent.Image
                  }}
                  resizeMode="contain"
                />
                <Image style={{ width: 22, height: 22, position: 'absolute', right: 15 }}
                  source={{
                    uri: parent.forward
                  }}
                  resizeMode="contain"
                />
                <Text style={[styles.title]}>{parent.title}</Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
        {renderLogoutBtn()}
      </Animated.View>
    );
  }

  function renderFilteredItemsDrawer() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.drawerContent}>

          <TouchableOpacity
            onPress={() => toggleMainDrawer()}
            style={{
              borderBottomWidth: 0.8, flexDirection: 'row',
              borderBottomColor: '#eaeaea',
              paddingBottom: 10,
            }}>
            <Image style={{ width: 25, height: 25, position: 'absolute', left: 15 }}
              source={{
                uri: 'https://img.icons8.com/material-two-tone/96/000000/back--v2.png'
              }}
              resizeMode="contain"
            />
            <Text style={{ left: 50, marginTop: 3, fontSize: 16 }}>{t('Back')}</Text>
          </TouchableOpacity>
          {filteredItems.routes.map((route) => {
            return (
              <TouchableOpacity
                key={route.routeName}
                testID={route.routeName}
                onPress={() =>
                  props.navigation.navigate(route.nav, {
                    screen: route.routeName,
                  })
                }
                style={styles.parentItem}>
                <Text style={styles.titleChild}>{route.title}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  }

  const renderLogoutBtn = () => {
    return (
      <View style={styles.LoginContainer}>
        <TouchableOpacity style={styles.PrimaryIconButton} activeOpacity={0.5}
          onPress={() => props.navigation.navigate('MyAccount')}
        >
          <Image source={require('../assets/myAccount.png')} style={styles.ImageIconStyle} />
          <View style={styles.SeparatorLine} />
          <Text style={styles.TextStyle}>{t('MyAccount')}</Text>
        </TouchableOpacity>

        {AsyncStorage.getItem('TOKEN') ? <TouchableOpacity style={styles.LogOutButtonStyle} activeOpacity={0.5}
          onPress={() => {
            props.navigation.navigate('Login');
            removeData();
            setUser(null)
            readData();
            Global.IsLogin = false
          }}
        >
          <Image source={require('../assets/logOutt.png')} style={styles.ImageIconStyle} />
          <View style={styles.SeparatorLine} />
          <Text style={[styles.TextStyle,{color:'#fff'}]}>{t('Logout')}</Text>
        </TouchableOpacity> : null}



        <View style={styles.Socialcontainer}>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={{ flexDirection: 'column' }}>
                <SocialIcon style={{ width: 40, height: 40, }}
                  type="facebook"
                  light
                  onPress={() => { Linking.openURL('https://www.facebook.com/pedigreeallcom'); }}

                />
              </View>
              <View style={{ flexDirection: 'column' }}>
                <SocialIcon style={{ width: 40, height: 40 }}
                  type="instagram"
                  light
                  onPress={() => { Linking.openURL('https://www.instagram.com/pedigreeallcom/'); }}
                />
              </View>
              <View style={{ flexDirection: 'column' }}>
                <SocialIcon style={{ width: 40, height: 40 }}
                  type="linkedin"
                  light
                  onPress={() => { Linking.openURL('https://www.linkedin.com/company/pedigreeall'); }}
                />
              </View>

              <View style={{ flexDirection: 'column' }}>
                <SocialIcon style={{ width: 40, height: 40 }}
                  type="twitter"
                  light
                  onPress={() => { Linking.openURL('https://twitter.com/pedigreeall'); }}
                />
              </View>
            </View>
          </View>
        </View>

      </View>

    );
  }
  return (
    <ScrollView style={styles.drawerContainer}>
      <SafeAreaView style={{ flex: 1 }} forceInset={{ top: 'always', horizontal: 'never' }}>
        
        <DrawerContentScrollView {...props}>
          <View style={styles.drawerContent}>

            <View >
              <Image
                source={
                  require('../assets/logo.png')
                }
                style={styles.container}
              />
            </View>
          </View>
        </DrawerContentScrollView>
        {mainDrawer ? renderMainDrawer() : renderFilteredItemsDrawer()}
      </SafeAreaView>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  headerContainer: {
    height: 100,
    flexDirection: 'row',
    paddingVertical: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    ...Platform.select({
      ios: {
        width: '75%', alignSelf: 'center', marginBottom: 25, height: 47
      },
      android: {
        width: '75%', alignSelf: 'center', marginBottom: 25, height: 47, margin: 25
      },
      default: {
        width: '75%', alignSelf: 'center', marginBottom: 25, height: 47, margin: 25
      }
    })


  },
  SideBarMenuIcon: {
    marginRight: 10

  },
  SideBarMenuIconLogout: {
    marginRight: 5
  },
  logo: {
    width: 50,
    height: 75,
  },
  drawerContainer: {
    backgroundColor: '#fff',
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
    paddingTop: 2,
    paddingBottom: 2,
  },
  centered: {
    alignItems: 'center',
  },
  parentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.8,
    borderBottomColor: '#eaeaea',
    paddingTop: 0.5,
    paddingBottom: 0,
  },
  parentItemTop: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 0.8,
    borderTopColor: '#eaeaea',
    paddingTop: 2,
    paddingBottom: 2,
  },

  backButtonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 17,
    paddingLeft: 3,
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
  },
  backButtonText: {
    marginLeft: 10,
    color: '#fff',
  },
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },

  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  headerContainer: {
    height: 100,
    flexDirection: 'row',
    paddingVertical: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 75,
  },
  drawerContainer: {
    backgroundColor: '#ffffff',
  },

  centered: {
    alignItems: 'center',
  },
  title: {
    margin: 16,
    color: '#000',
    paddingLeft: 35,
    textAlign: 'center',
    fontSize: 15,
  },
  titleChild: {
    margin: 16,
    color: '#000',
    paddingLeft: 5,
    textAlign: 'center',
    fontSize: 15,
  },
  backButtonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 17,
    paddingLeft: 3,
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
  },
  backButtonText: {
    marginLeft: 10,
    color: '#fff',
  },


  LoginContainer: {
    marginTop: 15,
    margin: 5,
  },
  PrimaryIconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0e1e2',
    borderWidth: .5,
    borderColor: '#fff',
    height: 40,
    borderRadius: 6,
    margin: 5,
  },

  LogOutButtonStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#C70039',
    borderWidth: .5,
    borderColor: '#fff',
    height: 40,
    borderRadius: 6,
    margin: 5,
  },
  ImageIconStyle: {
    padding: 10,
    marginLeft: 10,
    margin: 5,
    height: 22,
    width: 22,
  },

  TextStyle: {
    color: "#000",
    marginLeft: 5,
    fontSize: 16,
  },

  SeparatorLine: {
    backgroundColor: '#fff',
    width: 0.8,
    height: 40,
    marginLeft: 5,
    marginRight: 5,
  },
  Socialcontainer: {
    marginTop: 10,
    marginBottom: 25,
    alignItems: 'center',

  },

});

export default CustomDrawerContent;