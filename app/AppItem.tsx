import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ITEM_WIDTH, animationConfig, getOrder, getPosition, rotateAmount } from './config';
import { IApp, Positions } from './types';
import Animated, { Easing, SharedValue, useAnimatedGestureHandler, useAnimatedReaction, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';

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
  const rotationZ = useSharedValue(-rotateAmount);
  const isEditMode = useSharedValue(false);
  const vibrationOffset = useSharedValue(0.4)

  const animatedStyle = useAnimatedStyle(() => {
    const zIndex = isGestureActive.value ? 100 : 0;
    return {
      zIndex: zIndex,
      transform: [
        {
          translateX: translateX.value + vibrationOffset.value,
        },
        {
          translateY: translateY.value + vibrationOffset.value,
        },
        {
          rotateZ: rotationZ.value + 'deg',
        },
      ],
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      rotationZ.value = withRepeat(withTiming(rotateAmount, { duration: 100, easing: Easing.ease}), -1, true)
      vibrationOffset.value = withRepeat(withTiming(-0.4, { duration: 100, easing: Easing.ease}), -1, true)
    }, Math.random() * 200)
  }, [])

  useAnimatedReaction(
    () => positions.value[props.app.id],
    (newOrder) => {
      const newPosition = getPosition(newOrder);
      translateX.value = withTiming(newPosition.x, animationConfig);
      translateY.value = withTiming(newPosition.y, animationConfig);
    }
  );

  const onGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, { x: number; y: number }>({
    onStart: (_, ctx) => {
      if (!isEditMode) return;
      isGestureActive.value = true;
      ctx.x = translateX.value;
      ctx.y = translateY.value;
    },
    onActive: ({ translationX, translationY, absoluteY }, ctx) => {
      if (!isEditMode) return;
      translateY.value = ctx.y + translationY;
      translateX.value = ctx.x + translationX;
      const oldOrder = positions.value[props.app.id];
      const newOrder = getOrder(translateX.value, translateY.value);
      if (oldOrder !== newOrder) {
        const idToSwap = Object.keys(positions.value).find((key) => positions.value[key] === newOrder);
        if (idToSwap) {
          const newPositions = JSON.parse(JSON.stringify(positions.value));
          newPositions[props.app.id] = newOrder;
          newPositions[idToSwap] = oldOrder;
          positions.value = newPositions;
        }
      }
    },
    onEnd: () => {
      if (!isEditMode) return;
      const destination = getPosition(positions.value[props.app.id]);
      translateX.value = withTiming(destination.x, animationConfig, () => {
        isGestureActive.value = false;
      });
      translateY.value = withTiming(destination.y, animationConfig);
    },
  });

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={styles.appInner}>
          <Image source={app.icon} style={styles.icon}></Image>
          <Text style={styles.label}>{props.app.label}</Text>
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
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
  appInner: {
    alignItems: 'center',
  },
});
