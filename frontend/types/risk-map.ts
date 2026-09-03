import { RoadHealthCategory } from "@/lib/road-health";

export type RiskMapFilter = "All" | RoadHealthCategory;

export interface MapRoadSegment {
  id: string;
  roadId: string;
  roadName: string;
  healthScore: number; // 0–100
  riskPercentage: number; // 0–100 (%)
  riskCategory: RoadHealthCategory;
  lastInspection: string;
  recommendedMaintenance: string;
  milepost: string;
  trafficAadt: string;
  coordinates: [number, number][]; // [longitude, latitude] pairs
}

export interface RoadSegmentGeoJsonProperties {
  id: string;
  roadId: string;
  roadName: string;
  healthScore: number;
  riskPercentage: number;
  riskCategory: RoadHealthCategory;
  lastInspection: string;
  recommendedMaintenance: string;
  milepost: string;
  trafficAadt: string;
  color: string;
}
