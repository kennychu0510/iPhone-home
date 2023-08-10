import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ITEM_WIDTH, getPosition, rotateAmount } from './config';
import { IApp, Positions } from './types';
import { SharedValue, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

type Props = {
  app: IApp;
  positions: SharedValue<Positions>;
};


const AppItem = (props: Props) => {
  const { app, positions } = props;
  const position = getPosition(positions.value[app.id]);
  const translateX = useSharedValue(position.x);
  const translateY = useSharedValue(position.y);
  const isGestureActive = useSharedValue(false);
  const rotationY = useSharedValue(-rotateAmount);

  const animatedStyle = useAnimatedStyle(() => {
    const zIndex = isGestureActive.value ? 100 : 0;
    return {
      zIndex: zIndex,
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
        {
          rotateZ: rotationY.value + 'deg',
        },
      ],
    };
  }, []);
  
  return (
    <View style={[styles.container, animatedStyle]}>
      <Image source={app.icon} style={styles.icon}></Image>
      <Text style={styles.label}>AppItem</Text>
    </View>
  );
};

export default AppItem;

const styles = StyleSheet.create({
  container: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH,
    // backgroundColor: 'pink',
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  label: {
    marginTop: 5,
    color: 'white',
  },
});
