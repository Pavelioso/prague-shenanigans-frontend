import { MaterialCommunityIcons } from '@expo/vector-icons';
import { POI } from "../types"; // Import the centralized POI type

//OLD
const BASE_URL = "http://192.168.0.144:3000";


type POIResponse = {
  pois: POI[];
};

const BASE_RAW_URL = "https://raw.githubusercontent.com/Pavelioso/prague-shenanigans-data/refs/heads/main/";
const ICONS_DIRECTORY = "icons/";
const MARKDOWN_DIRECTORY = "content/";

const GITHUB_POIS_URL = BASE_RAW_URL + "data/pois.json";



export const getPOIs = async (): Promise<POI[]> => {
  const response = await fetch(GITHUB_POIS_URL);
  console.log("Fetching POIs...");
  if (!response.ok) throw new Error("Error fetching POIs from GitHub");

  const data: { pois: POI[] } = await response.json();

  return data.pois.map((poi) => ({
    ...poi,
    description_md: `${BASE_RAW_URL}${MARKDOWN_DIRECTORY}${poi.description_md}`, // Full URL for markdown
    icon: `${BASE_RAW_URL}${ICONS_DIRECTORY}${poi.icon}`, // Full URL for icons
    type: poi.type || "Unknown",
    tags: poi.tags || [],
  }));
};



export const getRawImageUrl = (relativePath: string): string => {
  // Add the icons directory prefix if the path is for an icon
  return `${BASE_RAW_URL}${ICONS_DIRECTORY}${relativePath}`;
};



// Fetch all POIs - OLD
/* export const getPOIs = async (): Promise<POI[]> => {
  const response = await fetch(`${BASE_URL}/pois`);
  if (!response.ok) throw new Error("Error fetching POIs");

  const pois: POI[] = await response.json();

  // Ensure that each POI has mandatory fields with default values
  return pois.map((poi) => ({
    ...poi,
    type: poi.type || "Unknown",            // Provide a default value if missing
    icon: poi.icon || "map-marker",         // Provide a default icon if missing
    tags: poi.tags || [],                   // Provide an empty array if tags are missing
  }));
}; */

// Add a new POI
export const addPOI = async (poi: Omit<POI, "id">): Promise<POI> => {
  const response = await fetch(`${BASE_URL}/pois`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(poi),
  });
  if (!response.ok) throw new Error("Error adding POI");
  return response.json();
};

// Update a POI
export const updatePOI = async (poi: POI): Promise<POI> => {
  const response = await fetch(`${BASE_URL}/pois/${poi.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(poi),
  });
  if (!response.ok) throw new Error("Error updating POI");
  return response.json();
};

// Delete a POI
export const deletePOI = async (id: number): Promise<void> => {
  const response = await fetch(`${BASE_URL}/pois/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Error deleting POI");
};
