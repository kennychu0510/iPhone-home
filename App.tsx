import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, ImageBackground, View, SafeAreaView } from 'react-native';
import { Images } from './assets';
import AppItem from './AppItem';
import { HORIZONTAL_MARGIN } from './config';
import { IApp, Positions } from './types';
import { useSharedValue } from 'react-native-reanimated';

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
];

export default function App() {
  const positions = useSharedValue<Positions>(Object.assign({}, ...apps.map((child, index) => ({ [child.id]: index }))));

  return (
    <ImageBackground source={Images.background} style={styles.container}>
      <StatusBar style='light' />
      <SafeAreaView style={styles.appContainer}>
        <View style={{ flex: 1 }}>
          {apps.map((app) => (
            <AppItem key={app.id} app={app} positions={positions} />
          ))}
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appContainer: {
    marginHorizontal: HORIZONTAL_MARGIN,
    flex: 1,
  },
});
