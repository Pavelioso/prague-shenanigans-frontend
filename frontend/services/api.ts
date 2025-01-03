import { POI } from "../types";

const BASE_RAW_URL = "https://raw.githubusercontent.com/Pavelioso/prague-shenanigans-data/refs/heads/main/";
const ICONS_DIRECTORY = "icons/";
const CONTENT_DIRECTORY = "content/";
const GITHUB_POIS_URL = `${BASE_RAW_URL}data/pois.json`;

// Helper function to construct Markdown and Icon URLs
const getContentPath = (poiId: string, fileName: string): string =>
  `${BASE_RAW_URL}${CONTENT_DIRECTORY}${poiId}/${fileName}`;

// Fetch all POIs with resolved Markdown and Icon paths

export const getPOIs = async (): Promise<POI[]> => {
  const response = await fetch(GITHUB_POIS_URL);
  if (!response.ok) throw new Error("Error fetching POIs from GitHub");

  const data: { pois: POI[] } = await response.json();

  return data.pois.map((poi) => ({
    ...poi,
    description_md: `${BASE_RAW_URL}${CONTENT_DIRECTORY}${poi.id}/${poi.id}.md`, // Resolve Markdown path
    icon: poi.icon && poi.icon.trim() !== ""
      ? `${BASE_RAW_URL}${ICONS_DIRECTORY}${poi.icon}` // Resolve icon from the icons directory
      : `${BASE_RAW_URL}${ICONS_DIRECTORY}default_pin.png`, // Default fallback icon
    type: poi.type || "Unknown",
    tags: poi.tags || [],
  }));
};

// Fetch Markdown with resolved image paths
export const fetchMarkdown = async (markdownPath: string): Promise<string> => {
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
};



export const getRawImageUrl = (relativePath: string): string => {
  // Add the icons directory prefix if the path is for an icon
  return `${BASE_RAW_URL}${ICONS_DIRECTORY}${relativePath}`;
};
