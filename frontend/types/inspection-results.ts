/**
 * TypeScript Data Models for /inspection/results
 */

export type RoadHealthStatus = "Healthy" | "Moderate" | "High Risk" | "Critical";

export interface SeverityCounts {
  low: number;
  medium: number;
  high: number;
  critical: number;
}

export interface RiskFactor {
  title: string;
  level: "Critical" | "High" | "Moderate";
  description: string;
}

export interface DetailedInspectionResult {
  inspectionId: string;
  roadId: string;
  roadName: string;
  inspectionDate: string;
  imageUrl: string;
  healthScore: number; // 0–100
  status: RoadHealthStatus;
  statusColor: string;
  statusDescription: string;
  defectSummary: {
    potholes: number;
    cracks: number;
    surfaceDamage: number;
    totalDefects: number;
  };
  severity: SeverityCounts;
  riskAssessment: {
    riskPercentage: number;
    riskCategory: string;
    explanation: string;
  };
  maintenanceRecommendation: {
    recommendedAction: string;
    priority: "P1" | "P2" | "P3" | "P4";
    suggestedTimeline: string;
    prototypeEstimatedCost: string;
  };
  aiExplanation: {
    heading: string;
    factors: RiskFactor[];
    demoNotice: string;
  };
}
