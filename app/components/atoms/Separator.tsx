import { useAppTheme } from "@/utils/useAppTheme";
import { colors } from "app/theme";
import React, { } from "react"
import { ColorValue, StyleProp, View, ViewStyle } from "react-native"

export interface SeparatorProps {
  color?: ColorValue,
  thickness?: number,
  direction: 'horizontal' | 'vertical',
  style?: StyleProp<ViewStyle>
}

export const Separator = ({ color, thickness = 1, direction = 'horizontal', style }: SeparatorProps) => {
  const {
    theme: { colors },
  } = useAppTheme()

  return (
    <View
      testID="separator"
      style={[
        direction === 'horizontal' ? $horizontal : $vertical,
        { backgroundColor: color ?? colors.separator, width: direction === 'horizontal' ? '100%' : thickness, height: direction === 'horizontal' ? thickness : '100%' },
        style,
      ]}
    />
  );
};

const $horizontal: ViewStyle = {
  width: '100%',
  height: 1
}

const $vertical: ViewStyle = {
  width: 1,
  height: '100%',
}