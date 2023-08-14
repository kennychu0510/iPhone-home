import { StatusBar } from 'expo-status-bar';
import { ImageBackground, SafeAreaView, StyleSheet } from 'react-native';
import Home from './app/Home';
import { HORIZONTAL_MARGIN } from './app/config';
import { Images } from './assets';

export default function App() {
  return (
    <ImageBackground source={Images.background} style={styles.container}>
      <StatusBar style='light' />
      <SafeAreaView style={styles.appContainer}>
        <Home />
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
