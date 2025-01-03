import { MaterialCommunityIcons } from '@expo/vector-icons';

// Updated POI type to include type, icon, and tags
export type POI = {
  id: number; // Change from number to string
  title: string;
  description: string;
  description_md: string;
  latitude: number;
  longitude: number;
  type: string;
  icon: string;
  tags: string[];
  importance: number;
};


type POIResponse = {
  pois: POI[];
};


const BASE_URL = "http://192.168.0.144:3000";


const GITHUB_POIS_URL = "https://raw.githubusercontent.com/Pavelioso/prague-shenanigans-data/refs/heads/main/data/pois.json";

export const getPOIs = async (): Promise<POI[]> => {
  const response = await fetch(GITHUB_POIS_URL);
  if (!response.ok) throw new Error("Error fetching POIs from GitHub");

  const data: POIResponse = await response.json(); // Explicitly type the response

  // Ensure all POIs have mandatory fields
  return data.pois.map((poi) => ({
    ...poi,
    type: poi.type || "Unknown",
    icon: poi.icon || "map-marker",
    tags: poi.tags || [],
  }));
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
