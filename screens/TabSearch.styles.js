import { StyleSheet } from 'react-native';
import { colors, screenStyles } from '../constants';

export default StyleSheet.create({
  ...screenStyles,
  logo: {
    height: 24,
    width: 150,
    left: 20,
    top: -20
  },
  tabsWrapper: {
    paddingVertical: 12,
  },
  tabTextContainerStyle: {
    backgroundColor: colors.transparent,
    borderRadius: 18,
  },
  tabTextContainerActiveStyle: {
    backgroundColor: colors.darkMint,
  },
  icon: {
    width: 16,
    height: 16,
    marginTop: -30,
    right: 350
  },
  tabText: {
    fontSize: 16,
    lineHeight: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: colors.white,
    fontFamily: 'AvertaStd-Semibold',
  },
  modalStyle: {
    margin: 0,
  },
  modalContentContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  homeScreenHeader: {
    backgroundColor: colors.primaryGreen,
  },
});
