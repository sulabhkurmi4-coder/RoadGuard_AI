import {
  DashboardData,
  NetworkStatistics,
  RoadHealthOverviewData,
  RiskDistributionSegment,
  MaintenancePriorityItem,
  RecentInspection,
  HighRiskRoadSegment,
  AiInsight,
} from "@/types/dashboard";
import { demoRoads } from "@/data/roads";

/**
 * NOTICE: The data below represents a simulated demonstration model for
 * civil transportation intelligence. It is structured for plug-and-play API replacement.
 */

export const DEMO_DATA_DISCLAIMER =
  "Simulated Demonstration Environment • Synthetic DOT Highway Telemetry";

export const demoNetworkStats: NetworkStatistics = {
  totalRoadNetworkKm: 225720,
  totalRoadNetworkMiles: 140280,
  roadsInspectedKm: 187120,
  roadsInspectedMiles: 116270,
  inspectedPercentage: 82.9,
  criticalRoadsKm: 7740,
  criticalRoadsMiles: 4810,
  criticalPercentage: 3.4,
  highRiskRoadsKm: 19690,
  highRiskRoadsMiles: 12240,
  highRiskPercentage: 8.7,
  lastUpdated: "Just now (Live Grid Sync)",
};

export const demoHealthOverview: RoadHealthOverviewData = {
  averagePci: 73,
  healthy: {
    key: "healthy",
    label: "Healthy",
    pciRange: "PCI 85 – 100",
    laneMiles: 85570,
    percentage: 61.0,
    color: "#10b981",
    textColor: "text-emerald-400",
    bgColor: "bg-emerald-950/40",
    borderColor: "border-emerald-500/30",
    description: "Stable pavement matrix. No structural intervention required.",
  },
  moderate: {
    key: "moderate",
    label: "Moderate",
    pciRange: "PCI 60 – 84",
    laneMiles: 37660,
    percentage: 26.9,
    color: "#38bdf8",
    textColor: "text-sky-400",
    bgColor: "bg-sky-950/40",
    borderColor: "border-sky-500/30",
    description: "Surface micro-fissures detected. Target for proactive sealing.",
  },
  highRisk: {
    key: "highRisk",
    label: "High Risk",
    pciRange: "PCI 40 – 59",
    laneMiles: 12240,
    percentage: 8.7,
    color: "#f59e0b",
    textColor: "text-amber-400",
    bgColor: "bg-amber-950/40",
    borderColor: "border-amber-500/30",
    description: "Accelerated ravelling & seam separation. Mill & overlay window.",
  },
  critical: {
    key: "critical",
    label: "Critical",
    pciRange: "PCI < 40",
    laneMiles: 4810,
    percentage: 3.4,
    color: "#f43f5e",
    textColor: "text-rose-400",
    bgColor: "bg-rose-950/40",
    borderColor: "border-rose-500/30",
    description: "Sub-base disintegration and pothole void inception.",
  },
};

export const demoRiskDistribution: RiskDistributionSegment[] = [
  {
    classification: "Interstate Highways",
    laneMiles: 42800,
    percentage: 30.5,
    averagePci: 76,
    criticalCount: 4,
    color: "#06b6d4",
  },
  {
    classification: "State Arterial Corridors",
    laneMiles: 54600,
    percentage: 38.9,
    averagePci: 71,
    criticalCount: 7,
    color: "#3b82f6",
  },
  {
    classification: "Urban Transit Arterials",
    laneMiles: 26400,
    percentage: 18.8,
    averagePci: 68,
    criticalCount: 9,
    color: "#a855f7",
  },
  {
    classification: "Rural Freight Connectors",
    laneMiles: 16480,
    percentage: 11.8,
    averagePci: 62,
    criticalCount: 4,
    color: "#f59e0b",
  },
];

export const demoMaintenancePriorities: MaintenancePriorityItem[] = [
  {
    id: "WO-P1-01",
    priorityLevel: "P1_URGENT",
    title: "Alligator Base Shear & Void Infiltration",
    corridor: "Interstate 95 Northbound",
    milepost: "MP 142.8 - 144.2",
    defectSummary: "Severe interlocking fissure network with 38mm sub-base depression.",
    recommendedAction: "Polymer-modified slurry micro-surfacing within 7 days",
    estimatedCost: "$184,000",
    deferralPenalty: "$1,420,000 (if left to full depth failure)",
    targetResolutionDate: "Sept 11, 2026",
    assignedUnit: "District 4 Road Maintenance Unit #2",
    materialsNeeded: "4.2 Tons Polymer Slurry Emulsion",
  },
  {
    id: "WO-P1-02",
    priorityLevel: "P1_URGENT",
    title: "Pothole Cavity Hazard & Rim Impact Zone",
    corridor: "Port Access Freight Expressway",
    milepost: "Gate 3 to Rail Junction",
    defectSummary: "High-impact 52mm deep asphalt punch-through from container transport.",
    recommendedAction: "Deep hot-mix asphalt compaction & foundation stabilization",
    estimatedCost: "$92,000",
    deferralPenalty: "$640,000 (Freight lane shutdown)",
    targetResolutionDate: "Sept 08, 2026",
    assignedUnit: "City DPW Rapid Patch Unit 1",
    materialsNeeded: "1.8 Tons Hot-Mix Bituminous Type S",
  },
  {
    id: "WO-P2-03",
    priorityLevel: "P2_HIGH",
    title: "Transverse Joint Spall & Expansion Seal",
    corridor: "State Route 101 Coastal",
    milepost: "MP 91.4 - 93.0",
    defectSummary: "Pre-winter water penetration risk along 240 linear feet of seam.",
    recommendedAction: "High-flexibility rubberized silicone joint injection",
    estimatedCost: "$38,500",
    deferralPenalty: "$280,000 (Freeze-thaw blowout)",
    targetResolutionDate: "Sept 18, 2026",
    assignedUnit: "Contractor Sealing Partner Alpha",
    materialsNeeded: "240 LF Silicone Sealant",
  },
  {
    id: "WO-P3-04",
    priorityLevel: "P3_MEDIUM",
    title: "Shoulder Edge Ravelling & Drop-off",
    corridor: "Metro Ring Arterial (SR-4)",
    milepost: "Exit 14 Right Shoulder",
    defectSummary: "Edge drop-off exceeding 25mm along auxiliary deceleration lane.",
    recommendedAction: "Graded aggregate shoulder rebuilding & compaction",
    estimatedCost: "$18,200",
    deferralPenalty: "$95,000",
    targetResolutionDate: "Sept 25, 2026",
    assignedUnit: "District 4 Highway Patch Crew",
    materialsNeeded: "3.0 Tons Graded Aggregate Base",
  },
];

export const demoRecentInspections: RecentInspection[] = [
  {
    id: "INSP-4091",
    sessionId: "SESSION-2026-0904-A",
    corridorName: "I-95 Northbound Corridor",
    milepostRange: "MP 142.8 - 148.5",
    timestamp: "18 mins ago",
    sensorType: "FLIR 8K Optical",
    defectsDetected: 24,
    pciScore: 44,
    confidenceScore: 98.7,
    severity: "Critical",
  },
  {
    id: "INSP-4090",
    sessionId: "SESSION-2026-0904-B",
    corridorName: "Highway Survey Van #02 Run",
    milepostRange: "US-101 MP 88.2 - 94.0",
    timestamp: "1 hour ago",
    sensorType: "Mobile LiDAR",
    defectsDetected: 7,
    pciScore: 68,
    confidenceScore: 99.1,
    severity: "Moderate",
  },
  {
    id: "INSP-4089",
    sessionId: "SESSION-2026-0904-C",
    corridorName: "Port Access Freight Express",
    milepostRange: "Terminal Gate 3 - 3.1 mi",
    timestamp: "3 hours ago",
    sensorType: "Fleet Dashcam",
    defectsDetected: 19,
    pciScore: 38,
    confidenceScore: 97.4,
    severity: "Critical",
  },
  {
    id: "INSP-4088",
    sessionId: "SESSION-2026-0904-D",
    corridorName: "DOT Drone Aerial Overflight",
    milepostRange: "Metro SR-4 Exits 12 - 19",
    timestamp: "5 hours ago",
    sensorType: "Drone Survey",
    defectsDetected: 2,
    pciScore: 88,
    confidenceScore: 99.5,
    severity: "Good",
  },
];

export const demoHighRiskSegments: HighRiskRoadSegment[] = demoRoads
  .filter((road) => road.riskLevel === "Critical" || road.riskLevel === "High Risk")
  .slice(0, 6)
  .map((road, idx) => ({
    id: `SEG-0${idx + 1}`,
    segmentCode: road.id,
    corridor: road.name.split("•")[0].trim(),
    direction: road.name.includes("Northbound")
      ? "Northbound"
      : road.name.includes("Southbound")
      ? "Southbound"
      : road.name.includes("Westbound")
      ? "Westbound"
      : "Both",
    milepostStart: Number((idx * 2.5 + 1.2).toFixed(1)),
    milepostEnd: Number((idx * 2.5 + 3.8).toFixed(1)),
    pci: road.healthScore,
    primaryDefect:
      road.potholeCount > 5
        ? "Pothole Cavity Inception & Sub-Base Shear"
        : road.crackCount > 15
        ? "Severe Fatigue Cracking (Alligator)"
        : "Transverse Joint Spall & Moisture Seam",
    defectCategory: road.potholeCount > 5 ? "Sub-Base Void" : "Fatigue Cracking",
    trafficVolumeEsal: road.trafficAadt || "78,000 ESALs/day",
    urgency: road.riskLevel === "Critical" ? "Immediate (7 Days)" : "Critical (14 Days)",
    recommendedTreatment: road.recommendedAction,
    estimatedBudget: `$${Math.round(road.riskPercentage * 2.15)},000`,
  }));

export const demoAiInsights: AiInsight[] = [
  {
    id: "INSIGHT-01",
    category: "Economic Preservation",
    title: "Immediate Sealing on I-95 Will Save $1.2M Reconstruction",
    description:
      "Neural models indicate Section I95NB-1428 is within 22 days of sub-base water penetration. Sealing now at $2.50/sq.yd eliminates 2027 full depth rebuild at $48/sq.yd.",
    impactMetric: "$1.23M Deferred Cost",
    actionRecommendation: "Approve Work Order #WO-P1-01 for DPW Unit 2",
    confidence: 98.7,
    timestamp: "12m ago",
  },
  {
    id: "INSIGHT-02",
    category: "Climate Hazard Alert",
    title: "Freeze-Thaw Precipitation Warning for Route 101",
    description:
      "Meteorological sensors predict 4 overnight freeze-thaw cycles next week. Unsealed transverse seams on MP 91.4 will experience 400% accelerated spalling if untreated.",
    impactMetric: "4x Degradation Rate",
    actionRecommendation: "Schedule rapid joint injection before Sept 12",
    confidence: 94.2,
    timestamp: "1h ago",
  },
  {
    id: "INSIGHT-03",
    category: "Structural Anomaly",
    title: "Heavy Axle Overload Pattern at Port Express Gate 3",
    description:
      "LiDAR point clouds show 18mm localized rutting correlated with overweight container transport trucks exceeding 80,000 lbs gross weight.",
    impactMetric: "+42% Structural Stress",
    actionRecommendation: "Deploy portable weigh-in-motion sensor to Gate 3",
    confidence: 96.8,
    timestamp: "3h ago",
  },
];

export const demoRoadHealthChartData = [
  { name: "Healthy (PCI 85-100)", value: 85570, percentage: 61.0, color: "#10b981", pci: "85-100" },
  { name: "Moderate (PCI 60-84)", value: 37660, percentage: 26.9, color: "#38bdf8", pci: "60-84" },
  { name: "High Risk (PCI 40-59)", value: 12240, percentage: 8.7, color: "#f59e0b", pci: "40-59" },
  { name: "Critical (PCI < 40)", value: 4810, percentage: 3.4, color: "#f43f5e", pci: "<40" },
];

export const demoRiskTrendChartData = [
  { month: "Apr", averagePci: 69.2, healthyMiles: 79200, highRiskMiles: 15800, criticalMiles: 6100 },
  { month: "May", averagePci: 70.1, healthyMiles: 80400, highRiskMiles: 14900, criticalMiles: 5700 },
  { month: "Jun", averagePci: 71.0, healthyMiles: 82100, highRiskMiles: 14100, criticalMiles: 5400 },
  { month: "Jul", averagePci: 71.8, healthyMiles: 83500, highRiskMiles: 13400, criticalMiles: 5100 },
  { month: "Aug", averagePci: 72.4, healthyMiles: 84600, highRiskMiles: 12800, criticalMiles: 4950 },
  { month: "Sep", averagePci: 73.0, healthyMiles: 85570, highRiskMiles: 12240, criticalMiles: 4810 },
];

export const demoMaintenancePriorityChartData = [
  { category: "P1 Urgent", preservationCost: 276, deferredPenalty: 2060, workOrders: 4 },
  { category: "P2 High", preservationCost: 142, deferredPenalty: 980, workOrders: 6 },
  { category: "P3 Medium", preservationCost: 68, deferredPenalty: 420, workOrders: 8 },
  { category: "P4 Routine", preservationCost: 24, deferredPenalty: 140, workOrders: 12 },
];

export const fullDemoDashboardData: DashboardData = {
  networkStats: demoNetworkStats,
  healthOverview: demoHealthOverview,
  riskDistribution: demoRiskDistribution,
  maintenancePriorities: demoMaintenancePriorities,
  recentInspections: demoRecentInspections,
  highRiskSegments: demoHighRiskSegments,
  aiInsights: demoAiInsights,
  roadHealthChart: demoRoadHealthChartData,
  riskTrendChart: demoRiskTrendChartData,
  maintenancePriorityChart: demoMaintenancePriorityChartData,
};
