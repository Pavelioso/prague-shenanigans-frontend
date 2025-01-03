import React, { useState, useEffect } from "react";
import { View, ScrollView, Image, ActivityIndicator, Dimensions } from "react-native";
import { Modal, Button, Chip, Surface, Card, Title, Paragraph, Text } from "react-native-paper";
import Markdown from "react-native-markdown-display"; // Library for rendering markdown
import { POI } from "../types"; // Import the shared POI interface

const screenHeight = Dimensions.get("window").height;

interface POIDetailProps {
  visible: boolean;
  onClose: () => void;
  poi: POI; // Now using the shared POI interface
}

const POIDetail: React.FC<POIDetailProps> = ({ visible, onClose, poi }) => {
  const [markdownContent, setMarkdownContent] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMarkdown = async () => {
      try {
        setLoading(true);
        const response = await fetch(poi.description_md); // Fetch markdown content
        if (!response.ok) throw new Error("Failed to load markdown content");
        const text = await response.text();
        setMarkdownContent(text);
      } catch (error) {
        console.error(error);
        setMarkdownContent("Failed to load detailed content.");
      } finally {
        setLoading(false);
      }
    };

    if (visible) fetchMarkdown();
  }, [poi.description_md, visible]);

  console.log(poi.icon);

  return (
    <Modal visible={visible} onDismiss={onClose} contentContainerStyle={{ padding: 20 }}>
      <Surface style={{ elevation: 1, borderRadius: 10 }}>
        <Card>
          <Card.Title
            title={poi.type + " | " + poi.title}
            subtitle={poi.description}
            left={(props) => (
              <Image
                {...props}
                source={{ uri: poi.icon }} // Load the icon from the URI/path specified
                style={{ width: 60, height: 60, marginLeft: -10 }} // Adjust the size accordingly
              />
            )}
          />

          {/* Constrain Card.Content to 80% of the vertical screen space */}
          <Card.Content style={{ height: screenHeight * 0.7 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

              {loading ? (
                <ActivityIndicator size="large" style={{ marginVertical: 20 }} />
              ) : (
                <Markdown style={{ body: { fontSize: 16 } }}>
                  {markdownContent || "No detailed content available."}
                </Markdown>
              )}

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
