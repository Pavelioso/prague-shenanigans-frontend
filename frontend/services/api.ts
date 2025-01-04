

// Fetch all POIs from the Django backend
import { POI } from "../types";

// CHANGE THIS TO LOCAL ADDRESS OF WHATEVER IS HOSTING DJANGO
const BASE_API_URL = "http://192.168.0.144:8000/api/";
const ICONS_DIRECTORY = "media/icons/";

// Fetch all POIs from the Django backend
export const getPOIs = async (): Promise<POI[]> => {
  const response = await fetch(`${BASE_API_URL}pois/`);
  
  if (!response.ok) {
    console.error("Error fetching POIs from the backend");
    throw new Error("Error fetching POIs from the backend");
  }

  const data = await response.json();

  // Log the raw API response for debugging
  //console.log("Raw API response:", data);

  // Transform the data to match the frontend's expected structure
  return data.map((poi: any) => ({
    id: poi.id,                                // Match Django's CharField (primary key)
    title: poi.title,                         // Match CharField
    description: poi.description,             // Match TextField
    markdown_content: poi.markdown_content,     // Match Markdown content
    latitude: poi.latitude,                   // Match FloatField
    longitude: poi.longitude,                 // Match FloatField
    poi_type: poi.poi_type,                       // Map poi_type to type
    icon: poi.icon                             // Use the full URL for icons
      ? `${BASE_API_URL}${ICONS_DIRECTORY}${poi.icon}`
      : `${BASE_API_URL}${ICONS_DIRECTORY}default_pin.png`, // Fallback for missing icons
    tags: poi.tags || [],                     // Match JSONField
    importance: poi.importance,               // Match IntegerField
  }));
};


// Fetch Markdown content for a specific POI
/* export const fetchMarkdown = async (markdownPath: string): Promise<string> => {
  const response = await fetch(markdownPath);
  if (!response.ok) throw new Error("Failed to load markdown content");

  const markdownContent = await response.text();

  // Replace relative image paths with absolute URLs
  const directoryPath = markdownPath.replace(/\/[^/]+\.md$/, "/");
  return markdownContent.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, relativePath) => {
    // Skip replacement for already absolute URLs
    if (relativePath.startsWith("http://") || relativePath.startsWith("https://")) {
      return match;
    }

    // Construct absolute URL for relative paths
    const absolutePath = `${directoryPath}${relativePath}`;
    return `![${alt}](${absolutePath})`;
  });
}; */

// Get raw image URL for an icon
/* export const getRawImageUrl = (relativePath: string): string => {
  return `${BASE_API_URL}${ICONS_DIRECTORY}${relativePath}`;
}; */
