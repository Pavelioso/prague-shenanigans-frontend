import React, { useState, useEffect } from "react";
import { View, ScrollView, Image, ActivityIndicator } from "react-native";
import { Modal, Text, Button, Chip, Surface, Card, Title, Paragraph } from "react-native-paper";
import Markdown from "react-native-markdown-display"; // Library for rendering markdown
import { POI } from "../types"; // Import the shared POI interface

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
