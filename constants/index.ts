import { Platform } from "react-native"

const constants = {
  main: '#131a9e',
  primary: '#030014',
  secondary: '#0F0D23',
  light: '#A8B5DB',
  white: '#FFFFFF',
  info: '#D6C7FF',
  accent: '#AB8BFF',
  dark: '#151312',
  gray: 'gray',
  badge: '#221F3D',
  linearPrimary: '#FAF9F7',
  linearSecondary: '#9B9EA7',
  darkGray: '#666666',
  badgeText: '#9CA4AB',
  searchColor: '#D1C0FF',
  logoutText: '#7b7b0f',
  navbarBg: '#e2e2d9',
  mainAlt: '#131387',
  foundBg: '#000957',
  lightGray: '#cccccc',
  lightHeaderGray: '#ECECFF',
  mesageBg: '#f5dfdf',
  denger: '#f00000',
  success: '#00ff00',
  cancelBtn: '#555555'
}

const BASE_URL =
  Platform.OS === 'android'
    ? 'http://192.168.0.167:4000'
    : Platform.OS === 'ios'
    ? 'http://localhost:4000'
    : Platform.OS === 'web'
    ? 'http://localhost:4000'
    : 'http://192.168.0.167:4000'


export { constants, BASE_URL}
