import { Dimensions } from 'react-native';
import { runOnUI } from 'react-native-reanimated';

export const HORIZONTAL_MARGIN = 15;
export const ITEM_WIDTH = (Dimensions.get('window').width - 2 * HORIZONTAL_MARGIN) / 4;
export const COL = 4;
export const ITEM_HEIGHT = ITEM_WIDTH;
export const rotateAmount = 0.2;

export const getPosition = (order: number) => {
  return {
    x: (order % COL) * ITEM_WIDTH,
    y: Math.floor(order / COL) * ITEM_HEIGHT,
  };
};

export const getOrder = (x: number, y: number) => {
  const col = Math.round(x / ITEM_WIDTH);
  const row = Math.round(y / ITEM_HEIGHT);
  return row * COL + col;
};
