// components/POIDetail.tsx
import React from "react";
import { View, ScrollView, Image } from "react-native";
import { Modal, Text, Button, Chip, Surface, Card, Title, Paragraph } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { POI } from "../types"; // Import the shared POI interface

interface POIDetailProps {
  visible: boolean;
  onClose: () => void;
  poi: POI; // Now using the shared POI interface
}

const POIDetail: React.FC<POIDetailProps> = ({ visible, onClose, poi }) => {
  return (
    <Modal visible={visible} onDismiss={onClose} contentContainerStyle={{ padding: 20 }}>
      <Surface style={{ elevation: 1, borderRadius: 10 }}>
        <Card>
          <Card.Title
            title={poi.type}
            subtitle={poi.description}
            left={(props) => (
              <Image
                {...props}
                source={{ uri: poi.icon }} // Here, the icon is loaded from the URI/path specified in your db.json
                style={{ width: 40, height: 40 }} // Adjust the size accordingly
              />
            )}
          />

          <Card.Content>
            <ScrollView>
              <Image
                style={{ width: "100%", height: 200, borderRadius: 10, marginBottom: 20 }}
                source={{ uri: "https://via.placeholder.com/300" }}
              />

              <Title style={{ fontSize: 22 }}>{poi.title}</Title>
              <Paragraph>{poi.description}</Paragraph>

              <Paragraph>{`Detailed information about ${poi.title}`}</Paragraph>

              <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 10 }}>
                {poi.tags.map((tag, index) => (
                  <Chip key={index} style={{ margin: 2 }}>
                    {tag}
                  </Chip>
                ))}
              </View>
            </ScrollView>
          </Card.Content>

          <Card.Actions>
            <Button onPress={onClose} mode="contained" style={{ marginTop: 10 }}>
              Close
            </Button>
          </Card.Actions>
        </Card>
      </Surface>
    </Modal>
  );
};

export default POIDetail;
