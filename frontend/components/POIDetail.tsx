import React, { useState, useEffect } from "react";
import { ScrollView, Image, ActivityIndicator, Dimensions, View, StyleSheet, ImageBackground } from "react-native";
import { Modal, Button, Chip, Surface, Card } from "react-native-paper";
import Markdown from "react-native-markdown-display";
import { LinearGradient } from "expo-linear-gradient"; // Install expo-linear-gradient if not already installed
import { fetchMarkdown } from "../services/api";
import { POI } from "../types";
import POIDetailStyles from "../styles/POIDetail.styles";

const screenHeight = Dimensions.get("window").height;

interface POIDetailProps {
  visible: boolean;
  onClose: () => void;
  poi: POI;
}

const POIDetail: React.FC<POIDetailProps> = ({ visible, onClose, poi }) => {
  const [markdownContent, setMarkdownContent] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const backgroundImageUri = `${poi.description_md.replace(/\/[^/]+\.md$/, "/")}main.png`;

  useEffect(() => {
    const loadMarkdown = async () => {
      try {
        setLoading(true);
        const resolvedMarkdown = await fetchMarkdown(poi.description_md);
        console.log(resolvedMarkdown);
        setMarkdownContent(resolvedMarkdown);
      } catch (error) {
        console.error(error);
        setMarkdownContent("Failed to load detailed content.");
      } finally {
        setLoading(false);
      }
    };

    if (visible) loadMarkdown();
  }, [poi.description_md, visible]);

  return (
    <Modal visible={visible} onDismiss={onClose} contentContainerStyle={{ padding: 20 }}>
      <Surface style={{ elevation: 1, borderRadius: 10 }}>
        <Card>
          {/* Card.Title with a background image and gradient overlay */}
          <ImageBackground
            source={{ uri: backgroundImageUri }}
            style={POIDetailStyles.backgroundImage}
            imageStyle={POIDetailStyles.backgroundImageStyle}
          >
            {/* Gradient overlay */}
            <LinearGradient
              colors={["rgba(0, 0, 0, 0.7)", "rgba(0, 0, 0, 0)"]}
              style={POIDetailStyles.gradient}
              start={{ x: 0.5, y: 1 }} // Start from the bottom center
              end={{ x: 0.5, y: -0.5 }} 
            />
            <View style={POIDetailStyles.titleContainer}>
              <Card.Title
                title={`${poi.type} | ${poi.title}`}
                subtitle={poi.description}
                titleStyle={POIDetailStyles.title}
                subtitleStyle={POIDetailStyles.subtitle}
                left={(props) => (
                  <Image
                    {...props}
                    source={{ uri: poi.icon }}
                    style={{ width: 60, height: 60, marginLeft: -10 }}
                  />
                )}
              />
            </View>
          </ImageBackground>

          <Card.Content style={{ height: screenHeight * 0.65, paddingTop: 40 }}>
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
