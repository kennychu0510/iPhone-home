import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Images } from '../assets';
import AppItem from './AppItem';
import { useSharedValue } from 'react-native-reanimated';
import { IApp, Positions } from './types';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const apps: IApp[] = [
  {
    id: 'music',
    label: 'Music',
    icon: Images.APP_ICONS.APPLE_APPLE_MUSIC,
  },
  {
    id: 'mail',
    label: 'Mail',
    icon: Images.APP_ICONS.APPLE_MAIL,
  },
  {
    id: 'books',
    label: 'Book',
    icon: Images.APP_ICONS.APPLE_BOOKS,
  },
  {
    id: 'notes',
    label: 'Notes',
    icon: Images.APP_ICONS.APPLE_NOTES,
  },
  {
    id: 'files',
    label: 'Files',
    icon: Images.APP_ICONS.APPLE_FILES,
  },
  {
    id: 'news',
    label: 'News',
    icon: Images.APP_ICONS.APPLE_NEWS,
  },
  {
    id: 'reminders',
    label: 'Reminders',
    icon: Images.APP_ICONS.APPLE_REMINDERS,
  },
  {
    id: 'calculator',
    label: 'Calculator',
    icon: Images.APP_ICONS.APPLE_CALCULATOR,
  },
  {
    id: 'home',
    label: 'Home',
    icon: Images.APP_ICONS.APPLE_HOME,
  },
  {
    id: 'health',
    label: 'Health',
    icon: Images.APP_ICONS.APPLE_HEALTH,
  },
  {
    id: 'clips',
    label: 'Clips',
    icon: Images.APP_ICONS.APPLE_CLIPS,
  },
  {
    id: 'message',
    label: 'Message',
    icon: Images.APP_ICONS.APPLE_MESSAGES,
  },
  {
    id: 'stocks',
    label: 'Stocks',
    icon: Images.APP_ICONS.APPLE_STOCKS,
  },
  {
    id: 'safari',
    label: 'Safari',
    icon: Images.APP_ICONS.APPLE_SAFARI,
  },
  {
    id: 'appStore',
    label: 'AppStore',
    icon: Images.APP_ICONS.APPLE_APP_STORE,
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Images.APP_ICONS.APPLE_SETTINGS,
  },
  {
    id: 'weather',
    label: 'Weather',
    icon: Images.APP_ICONS.APPLE_WEATHER,
  },
  {
    id: 'findMy',
    label: 'Find My',
    icon: Images.APP_ICONS.APPLE_FIND_MY,
  },
  {
    id: 'wallet',
    label: 'Wallet',
    icon: Images.APP_ICONS.APPLE_WALLET,
  },
  {
    id: 'photos',
    label: 'Photos',
    icon: Images.APP_ICONS.APPLE_PHOTOS,
  },
];

const Home = () => {
  const positions = useSharedValue<Positions>(Object.assign({}, ...apps.map((child, index) => ({ [child.id]: index }))));

  return (
    <GestureHandlerRootView>
      <View style={{ flex: 1, marginVertical: 20 }}>
        {apps.map((app) => (
          <AppItem key={app.id} app={app} positions={positions} />
        ))}
      </View>
    </GestureHandlerRootView>
  );
};

export default Home;

const styles = StyleSheet.create({});
