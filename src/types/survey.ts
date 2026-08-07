export interface SurveyStation {
  id: string;
  code: string;
  coordinates: [number, number]; // [Latitude, Longitude]
  elevation: number;
}