import { RoadRiskCategory } from "@/data/roads";

export type MaintenancePriority = "P1" | "P2" | "P3";

export type MaintenanceFilter = "All" | MaintenancePriority;

export type MaintenanceSortOption = "highest-risk" | "lowest-health" | "priority";

export interface MaintenanceItem {
  id: string;
  roadId: string;
  roadName: string;
  milepost: string;
  trafficAadt: string;
  healthScore: number;
  riskPercentage: number;
  riskCategory: RoadRiskCategory;
  recommendedAction: string;
  priority: MaintenancePriority;
  priorityLabel: string; // "P1 - Immediate", "P2 - Urgent", "P3 - Scheduled"
  timeline: string;      // "Within 7 Days", "Within 14 Days", etc.
  estimatedCost: number; // in USD
  formattedCost: string; // e.g. "$184,000"
  potholeCount: number;
  crackCount: number;
  surfaceDamage: number;
  lastInspection: string;
  assignedCrew: string;
  materialsManifest: string;
  trafficControlPlan: string;
}

export interface MaintenancePlanForm {
  planName: string;
  corridorIds: string[];
  budgetCap: number;
  targetTimelineDays: number;
  priorityThreshold: MaintenancePriority;
}
