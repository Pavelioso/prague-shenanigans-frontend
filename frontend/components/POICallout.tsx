import React from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import { Text, Card } from "react-native-paper";
import { POI } from "../types"; // Import the shared POI interface

interface POICalloutProps {
  poi: POI; // Now using the shared POI interface
}

const POICallout: React.FC<POICalloutProps> = ({ poi }) => {
  return (
    <Card style={styles.card}>
      <ImageBackground
        source={require("../assets/patterns/so-white.png")} // Dotted pattern image
        resizeMode="repeat"
        style={styles.background}
      >
        <Card.Content style={styles.content}>
          <Text style={styles.title}>{poi.title}</Text>
          <Text style={styles.description}>{poi.description}</Text>
        </Card.Content>
      </ImageBackground>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    //borderRadius: 10,
    //borderWidth: 1, // 2px black border
    //borderColor: "grey",
    overflow: "hidden", // Ensure the border radius applies to children
    width: 200, // Set a fixed width for the pop-up
  },
  background: {
    flex: 1,
    backgroundColor: "white", // Brownish background color
  },
  content: {
    padding: 10, // Add padding inside the card content
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    //color: "white", // Adjust text color to contrast the background
  },
  description: {
    fontSize: 14,
    //color: "lightgray", // Adjust text color for readability
    marginTop: 4,
  },
});

export default POICallout;
