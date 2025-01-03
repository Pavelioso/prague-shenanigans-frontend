// components/POIDetail.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import { Modal, Text, Surface, Card } from "react-native-paper";
import { POI } from "../types"; // Import the shared POI interface

interface POICalloutProps {
  poi: POI; // Now using the shared POI interface
}

const POICallout: React.FC<POICalloutProps> = ({ poi }) => {
  return (
    
    
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.title}>{poi.title}</Text>
            <Text style={styles.description}>{poi.description}</Text>
          </Card.Content>
        </Card>
      
    
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  surface: {
    elevation: 4,
    borderRadius: 10,
  },
  card: {
    borderRadius: 10,
    width: 200, // Set a fixed width for the pop-up
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: 'gray',
    marginTop: 4,
  },
});

export default POICallout;
