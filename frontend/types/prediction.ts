import { RoadHealthCategory } from "@/lib/road-health";

export interface TimelineForecastPoint {
  dayLabel: string; // "Current", "+30 Days", "+60 Days", "+90 Days", "+180 Days"
  daysOut: number;
  projectedHealthScore: number;
  projectedRiskPercentage: number;
  projectedStatus: RoadHealthCategory;
}

export interface RiskDriverItem {
  id: string;
  name: string; // "Pothole Density", "Road Age", "Traffic Exposure", "Rainfall & Climate", "Previous Road Condition"
  metricValue: string;
  impactLevel: "Critical" | "High" | "Moderate" | "Low";
  description: string;
}

export interface RoadPredictionResult {
  roadId: string;
  roadName: string;
  milepost: string;
  trafficAadt: string;
  currentHealthScore: number;
  currentRiskPercentage: number;
  currentCondition: string;
  forecasts: {
    thirtyDays: { health: number; risk: number; status: RoadHealthCategory };
    sixtyDays: { health: number; risk: number; status: RoadHealthCategory };
    ninetyDays: { health: number; risk: number; status: RoadHealthCategory };
  };
  timelineData: TimelineForecastPoint[];
  riskDrivers: RiskDriverItem[];
  deteriorationExplanation: string;
  recommendation: {
    title: string;
    action: string;
    urgencyWindow: string;
    preservationCost: string;
    rebuildPenaltyIfDeferred: string;
    netSavings: string;
  };
  modelMetadata: {
    isPrototypePrediction: boolean;
    confidenceScore: number;
    disclaimer: string;
    modelVersion: string;
  };
}
