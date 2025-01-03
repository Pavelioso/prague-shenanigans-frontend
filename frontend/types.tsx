import { MaterialCommunityIcons } from '@expo/vector-icons';

// types.ts (or models.ts, or types/interfaces.ts)
export interface POI {
  id: number;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  type: string;      // Mandatory string
  icon: string; 
  tags: string[];    // Mandatory array of strings
  importance: number
}
  