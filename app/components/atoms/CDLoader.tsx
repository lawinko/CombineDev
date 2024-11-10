import { LoadingStatus } from "@/utils/customTypes";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleProp, View, ViewStyle } from "react-native";
import Modal from "react-native-modal";

export interface CDLoaderProps {
  statuses: LoadingStatus[];
  isModalEnable?: boolean;
  style?: StyleProp<ViewStyle>
}

export const CDLoader = (props: CDLoaderProps) => {
  const { statuses = [], isModalEnable = true, style } = props;
  const [isSpinning, setSpinning] = useState<boolean>(false);

  useEffect(() => {
    const containSpinning = statuses.some((status) => status === "loading");

    if (containSpinning) {
      setSpinning(true);
    } else {
      setSpinning(false);
    }
  }, [statuses]);

  return (
    isModalEnable ? (
      isSpinning && (
        <Modal
          testID="modal"
          isVisible={isSpinning}
          animationIn={"fadeIn"}
          animationOut={"fadeOut"}
          backdropOpacity={0.2}
          animationOutTiming={50}
        >
          <ActivityIndicator testID="spinner" size='large' />
        </Modal>
      )
    ) : (
      isSpinning && (
        <View style={[$container, style]}>
          <ActivityIndicator testID="spinner" size='large' />
        </View>
      )
    )
  )
};

const $container: ViewStyle = {
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  justifyContent: "center",
  alignItems: "center",
}