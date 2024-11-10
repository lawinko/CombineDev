import React from "react"
import { View } from "react-native"

interface SpacerProps {
  vertical?: number
  horizontal?: number
}

const Spacer: React.FC<SpacerProps> = ({ vertical = 0, horizontal = 0 }) => {
  return <View testID="spacer" style={{ marginTop: vertical, marginLeft: horizontal }} />
}

export default Spacer
