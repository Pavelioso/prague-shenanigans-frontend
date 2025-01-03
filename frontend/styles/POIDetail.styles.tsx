import { StyleSheet } from "react-native";

const POIDetailStyles = StyleSheet.create({
  backgroundImage: {
    height: 120, // Increased height for the title area
    justifyContent: "flex-end", // Align title content to the bottom
  },
  backgroundImageStyle: {
    borderTopLeftRadius: 10, // Match Card radius
    borderTopRightRadius: 10, // Match Card radius
  },
  gradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "100%", // Cover the entire background image
    borderTopLeftRadius: 10, // Match Card radius
    borderTopRightRadius: 10, // Match Card radius
  },
  titleContainer: {
    padding: 10, // Padding for the title and subtitle
  },
  title: {
    color: "white", // Ensure the title is readable on the dark gradient
    fontSize: 16, // Larger font size for the title
    fontWeight: "bold",
  },
  subtitle: {
    color: "white", // Ensure the subtitle is readable on the dark gradient
    fontSize: 14,
  },
});

export default POIDetailStyles;
