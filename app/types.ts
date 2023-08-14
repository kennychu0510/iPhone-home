import { ImageSourcePropType } from "react-native";

export type IApp = {
  id: string;
  label: string;
  icon: ImageSourcePropType;
}

export interface Positions {
  [id: string]: number;
}
