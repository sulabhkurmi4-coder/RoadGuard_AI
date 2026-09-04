/**
 * TypeScript Data Models for AI Road Inspection
 * Designed to cleanly map to a future FastAPI AI backend endpoint.
 */

export interface BoundingBox {
  topPercent: number;
  leftPercent: number;
  widthPercent: number;
  heightPercent: number;
}

export interface DefectDetection {
  id: string;
  distressType: string;
  category: "Fatigue Cracking" | "Pothole" | "Joint Distress" | "Surface Ravelling" | "Rutting";
  severity: "Critical" | "High" | "Moderate" | "Low";
  severityColor: string;
  confidence: number; // 0.0 to 1.0
  dimensions: {
    widthMm?: number;
    lengthM?: number;
    depthMm?: number;
    areaSqM?: number;
    volumeCubicM?: number;
  };
  boundingBox: BoundingBox;
  pciDeduction: number;
  treatmentRecommendation: string;
  estimatedCost: string;
  actionUrgency: string;
}

export interface InspectionAnalysisResult {
  analysisId: string;
  analyzedAt: string;
  fileName: string;
  fileSizeBytes: number;
  imageUrl: string;
  roadHealthScore: number; // PCI 0 - 100
  riskLevel: "Critical Risk" | "High Risk" | "Moderate Wear" | "Healthy / Good";
  riskColor: string;
  inspectionSummary: string;
  defectCount: number;
  defects: DefectDetection[];
  modelMetadata: {
    modelName: string;
    modelVersion: string;
    inferenceLatencyMs: number;
    isSyntheticDemo: boolean;
  };
}

export interface RoadInspectionAnalysis {
  potholes: number;
  cracks: number;
  surfaceDamage: number;
  totalDefects: number;
  healthScore: number;
  riskLevel: "CRITICAL" | "HIGH" | "MODERATE" | "LOW";
  roadCondition: string;
  defectSeverity: string;
  recommendation: string;
  priority: "P1" | "P2" | "P3" | "P4";
  confidence: number;
  analysisTimestamp: string;
  isSimulatedDemo: boolean;
}

export interface SamplePreset {
  id: string;
  name: string;
  description: string;
  thumbnailColor: string;
  primaryDefect: string;
  previewUrl: string;
}

export interface FastApiInspectionResponse {
  inspection_id: string;
  potholes: number;
  cracks: number;
  surface_damage: number;
  health_score: number;
  risk_percentage: number;
  risk_level: string;
  recommendation: string;
  priority: string;
  is_demo_fallback?: boolean;
  analysis_method?: string;
  diagnostics?: Record<string, any>;
}



