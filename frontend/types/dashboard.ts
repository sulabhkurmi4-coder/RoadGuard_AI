/**
 * TypeScript Data Models for RoadGuard AI Dashboard
 * Structured to be seamlessly replaced with live API responses.
 */

export interface NetworkStatistics {
  totalRoadNetworkKm: number;
  totalRoadNetworkMiles: number;
  roadsInspectedKm: number;
  roadsInspectedMiles: number;
  inspectedPercentage: number;
  criticalRoadsKm: number;
  criticalRoadsMiles: number;
  criticalPercentage: number;
  highRiskRoadsKm: number;
  highRiskRoadsMiles: number;
  highRiskPercentage: number;
  lastUpdated: string;
}

export interface RoadHealthCategory {
  key: "healthy" | "moderate" | "highRisk" | "critical";
  label: string;
  pciRange: string;
  laneMiles: number;
  percentage: number;
  color: string;
  textColor: string;
  bgColor: string;
  borderColor: string;
  description: string;
}

export interface RoadHealthOverviewData {
  healthy: RoadHealthCategory;
  moderate: RoadHealthCategory;
  highRisk: RoadHealthCategory;
  critical: RoadHealthCategory;
  averagePci: number;
}

export interface RiskDistributionSegment {
  classification: string;
  laneMiles: number;
  percentage: number;
  averagePci: number;
  criticalCount: number;
  color: string;
}

export interface MaintenancePriorityItem {
  id: string;
  priorityLevel: "P1_URGENT" | "P2_HIGH" | "P3_MEDIUM";
  title: string;
  corridor: string;
  milepost: string;
  defectSummary: string;
  recommendedAction: string;
  estimatedCost: string;
  deferralPenalty: string;
  targetResolutionDate: string;
  assignedUnit: string;
  materialsNeeded: string;
}

export interface RecentInspection {
  id: string;
  sessionId: string;
  corridorName: string;
  milepostRange: string;
  timestamp: string;
  sensorType: "Mobile LiDAR" | "FLIR 8K Optical" | "Drone Survey" | "Fleet Dashcam";
  defectsDetected: number;
  pciScore: number;
  confidenceScore: number;
  severity: "Critical" | "Moderate" | "Good";
}

export interface HighRiskRoadSegment {
  id: string;
  segmentCode: string;
  corridor: string;
  milepostStart: number;
  milepostEnd: number;
  direction: "Northbound" | "Southbound" | "Eastbound" | "Westbound" | "Both";
  pci: number;
  primaryDefect: string;
  defectCategory: "Fatigue Cracking" | "Pothole Cavity" | "Joint Spall" | "Sub-Base Void" | "Rutting";
  trafficVolumeEsal: string;
  urgency: "Immediate (7 Days)" | "Critical (14 Days)" | "High (30 Days)";
  recommendedTreatment: string;
  estimatedBudget: string;
}

export interface AiInsight {
  id: string;
  category: "Economic Preservation" | "Climate Hazard Alert" | "Structural Anomaly" | "Fleet Optimization";
  title: string;
  description: string;
  impactMetric: string;
  actionRecommendation: string;
  confidence: number;
  timestamp: string;
}

export interface RoadHealthChartItem {
  name: string;
  value: number;
  percentage: number;
  color: string;
  pci: string;
}

export interface RiskTrendDataPoint {
  month: string;
  averagePci: number;
  healthyMiles: number;
  highRiskMiles: number;
  criticalMiles: number;
}

export interface MaintenancePriorityChartItem {
  category: string;
  preservationCost: number; // in thousands ($k)
  deferredPenalty: number;  // in thousands ($k)
  workOrders: number;
}

export interface DashboardData {
  networkStats: NetworkStatistics;
  healthOverview: RoadHealthOverviewData;
  riskDistribution: RiskDistributionSegment[];
  maintenancePriorities: MaintenancePriorityItem[];
  recentInspections: RecentInspection[];
  highRiskSegments: HighRiskRoadSegment[];
  aiInsights: AiInsight[];
  roadHealthChart?: RoadHealthChartItem[];
  riskTrendChart?: RiskTrendDataPoint[];
  maintenancePriorityChart?: MaintenancePriorityChartItem[];
}
