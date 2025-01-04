import React, { useState, useEffect } from "react";
import { View, Alert, Dimensions, StyleSheet, Image } from "react-native";
import MapView, { Callout, Marker, Region } from "react-native-maps";
import { getPOIs } from "../services/api";  // Fetch POIs from the API
import { POI } from "../types";             // Import the mandatory POI type
import POIDetail from './POIDetail';        // Import POIDetail component
import POICallout from './POICallout';
import mapStyle from '../styles/map-style-light-green-brown.json';

const PragueMap: React.FC = () => {
  const [pointsOfInterest, setPointsOfInterest] = useState<POI[]>([]);
  const [selectedPOI, setSelectedPOI] = useState<POI | null>(null); // State to hold selected POI
  const [modalVisible, setModalVisible] = useState<boolean>(false); // State to control modal visibility

  const [region, setRegion] = useState<Region>({
    latitude: 50.0755,
    longitude: 14.4378,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  useEffect(() => {
    getPOIs()
      .then((pois) => {
        console.log("Fetched POIs:", pois); // Log the fetched data
        setPointsOfInterest(pois);         // Update the state with the fetched data
      })
      .catch((error) => {
        console.error("Error fetching POIs:", error); // Log the error
        Alert.alert("Error", "Failed to fetch POIs "); // Display an error alert
      });
  }, []);

  const handleMarkerPress = (poi: POI) => {
    setSelectedPOI(poi);      // Set the selected POI
  };

  const getIconSize = (importance: number) => {
    switch (importance) {
      case 1:
        return 50;  // Largest icons for importance 1
      case 2:
        return 47.5;
      case 3:
        return 45;
      case 4:
        return 42.5;
      case 5:
        return 40;  // Smallest icons for importance 5
      default:
        return 40;  // Default size
    }
  };

  /* const getImageSource = (iconName: string) => {
    // Return the image from the map if found, otherwise return the default icon
    return pointsOfIn || iconMap['default_pin'];
  }; */

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ width: Dimensions.get("window").width, height: Dimensions.get("window").height }}
        initialRegion={region}
        onRegionChangeComplete={(newRegion) => setRegion(newRegion)} // Track region changes
        zoomEnabled={true}
        scrollEnabled={true}
        showsUserLocation={true}
        customMapStyle={mapStyle}
        moveOnMarkerPress={false}

      >
        {pointsOfInterest.map((poi) => (
          <Marker
            zIndex={poi.importance * -1}
            key={poi.id}
            coordinate={{ latitude: poi.latitude, longitude: poi.longitude }}
            onPress={() => handleMarkerPress(poi)}
          //anchor={{ x: 0.5, y: 0.5 }}
          >
            <>
              <View
                style={{
                  width: getIconSize(poi.importance),
                  aspectRatio: 1,

                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "rgba(0, 0, 0, 0.1)", // Highlight touchable area for debugging
                  borderRadius: getIconSize(poi.importance) * 1.25, // Optional for rounded touch area
                }}
              >
                <Image
                  source={{ uri: poi.icon }} // Load the remote icon
                  style={{
                    width: "80%",
                    height: "80%",
                  }}
                  resizeMode="contain"
                />
              </View>
              <Callout onPress={() => setModalVisible(true)} tooltip={true}>
                <POICallout poi={poi} />
              </Callout>
            </>
          </Marker>
        ))}
      </MapView>

      {selectedPOI && (
        <POIDetail
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          poi={selectedPOI}
        />
      )}
    </View>
  );
};

export default PragueMap;
