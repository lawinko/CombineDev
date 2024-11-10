import { FC, useCallback, useEffect, useRef } from "react"
import { ImageStyle, View, ViewStyle } from "react-native"
import { AppStackScreenProps, MainStackScreenProps } from "@/navigators"
import { Button, Screen, Text } from "@/components"
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"
import { useAppDispatch, useAppSelector } from "@/store/store"
import { CDLoader } from "@/components/atoms/CDLoader"
import { getLocations } from "@/features/resource/resourceSlice"
import { refreshToken, resetAuth } from "@/features/auth/authSlice"
import { GeneralApiProblem } from "@/services/api/apiProblem"
// import { useNavigation } from "@react-navigation/native"
interface MapScreenProps extends MainStackScreenProps<"Map"> { }


export const MapScreen: FC<MapScreenProps> = () => {

  // Pull in navigation via hook
  // const navigation = useNavigation()

  const dispatch = useAppDispatch()
  const resource = useAppSelector((state) => state.resource)
  const authStatus = useAppSelector((state) => state.auth.status)
  const mapRef = useRef<MapView>(null);

  const loadLocations = () => {
    dispatch(getLocations()).unwrap()
      .catch((rejectedValueOrSerializedError: GeneralApiProblem) => {
        if (rejectedValueOrSerializedError.kind === "unauthorized") {
          dispatch(refreshToken()).unwrap().then(() => {
            dispatch(getLocations())
          })
        }
      })
  }

  useEffect(() => {
    loadLocations()
  }, [])

  useEffect(() => {
    if (resource.locations.length > 0) {
      fitAllMarkers();
    }
  }, [resource.locations]);

  const fitAllMarkers = () => {
    if (mapRef.current && resource.locations.length > 0) {
      console.log(resource.locations)
      mapRef.current.fitToCoordinates(
        resource.locations.map(location => ({
          latitude: location.latitude,
          longitude: location.longitude,
        })),
        {
          edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
          animated: true,
        }
      );
    }
  };

  const handleReloadLocation = () => {
    loadLocations()
  }

  const handleLogout = () => {
    dispatch(resetAuth())
  }

  const renderLocations = useCallback(() => {
    return (
      resource.locations.map((location, index) => (
        <Marker
          key={index}
          coordinate={{ latitude: location.latitude, longitude: location.longitude }}
          description={location.formattedAddress}
        />
      ))
    )
  }, [resource.locations])

  return (
    <Screen style={$root} preset="fixed"
      safeAreaEdges={["bottom"]}>
      <CDLoader statuses={[resource.status, authStatus]} />
      <View style={$mapContainer}>
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={$map}
          showsUserLocation={false}
        >
          {renderLocations()}
        </MapView>
      </View>
      <Button tx="mapScreen:reloadLocations" onPress={handleReloadLocation} style={$button} />
      <Button tx="mapScreen:logout" onPress={handleLogout} style={$button} />
    </Screen>
  )

}

const $root: ViewStyle = {
  flex: 1,
}

const $mapContainer: ViewStyle = {
  flexGrow: 1,
  width: "100%",
  backgroundColor: "red",
}

const $map: ViewStyle = {
  width: "100%",
  height: "100%",
}

const $centerMarkerContainer: ViewStyle = {
  position: 'absolute',
  justifyContent: 'center',
  alignItems: 'center',
}

const $marker: ImageStyle = {
  marginBottom: 40
}

const $button: ViewStyle = {
  marginVertical: 12,
}