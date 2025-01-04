// types.ts
export interface POI {
  id: string;           // Changed to string to match JSON structure
  title: string;        // Mandatory string
  description: string;  // Mandatory string
  markdown_content: string; // URL to the markdown file
  latitude: number;     // Mandatory number
  longitude: number;    // Mandatory number
  poi_type: string;         // Mandatory string
  icon?: string;         // Path or name of the icon
  tags: string[];       // Mandatory array of strings
  importance: number;   // Mandatory number (1 being the highest)
}

  