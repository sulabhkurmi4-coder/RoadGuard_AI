import { demoRoads } from "@/data/roads";
import {
  MaintenanceItem,
  MaintenanceFilter,
  MaintenanceSortOption,
  MaintenancePriority,
} from "@/types/maintenance";
import { formatCurrency } from "@/lib/format-utils";

export const PROTOTYPE_COST_DISCLAIMER =
  "Prototype Cost Estimate — Based on modeled regional unit rates. Actual DOT contract bids and bid-letting values will vary.";

/**
 * Converts demoRoads into rich actionable maintenance items.
 */
export const demoMaintenanceItems: MaintenanceItem[] = demoRoads
  .filter((r) => r.healthScore < 80) // Focus maintenance triage on degraded and moderate roads
  .map((road, idx) => {
    let priority: MaintenancePriority = "P3";
    let priorityLabel = "P3 - Preventative";
    let timeline = "Within 45 Days";
    let cost = 42000;

    if (road.healthScore < 40) {
      priority = "P1";
      priorityLabel = "P1 - Critical";
      timeline = "Within 7 Days";
      cost = Math.round((road.riskPercentage * 2600 + road.potholeCount * 8000) / 1000) * 1000;
    } else if (road.healthScore < 60) {
      priority = "P2";
      priorityLabel = "P2 - Urgent";
      timeline = "Within 14 Days";
      cost = Math.round((road.riskPercentage * 1800 + road.crackCount * 2500) / 1000) * 1000;
    } else {
      priority = "P3";
      priorityLabel = "P3 - Scheduled";
      timeline = "Within 30 Days";
      cost = Math.round((road.riskPercentage * 900 + 15000) / 1000) * 1000;
    }

    return {
      id: `MAINT-${idx + 101}`,
      roadId: road.id,
      roadName: road.name,
      milepost: road.milepost || `MP ${idx * 4}.0 - ${idx * 4 + 4}.2`,
      trafficAadt: road.trafficAadt || "85,000 vehicles/day",
      healthScore: road.healthScore,
      riskPercentage: road.riskPercentage,
      riskCategory: road.riskLevel,
      recommendedAction: road.recommendedAction,
      priority,
      priorityLabel,
      timeline,
      estimatedCost: cost,
      formattedCost: formatCurrency(cost),
      potholeCount: road.potholeCount,
      crackCount: road.crackCount,
      surfaceDamage: road.surfaceDamage,
      lastInspection: road.lastInspection,
      assignedCrew:
        priority === "P1"
          ? "District 4 Rapid Emergency Asphalt Unit"
          : priority === "P2"
          ? "Regional Micro-Surfacing Taskforce"
          : "Municipal Joint Seal Contractor Unit",
      materialsManifest:
        priority === "P1"
          ? "4.8 Tons Hot-Mix Bituminous (Type S) & Sub-base aggregate infill"
          : priority === "P2"
          ? "3.2 Tons Polymer Modified Emulsion & Joint Slurry"
          : "240 Linear Feet Silicone Joint Sealant & Tack Coat",
      trafficControlPlan:
        priority === "P1"
          ? "Full Right-Lane Night Closure (22:00 - 05:00) with TMA Attenuator"
          : "Rolling Lane Taper with Arrow Board & Police Escort",
    };
  });

/**
 * Filter and sort maintenance items.
 */
export function getFilteredMaintenanceItems(
  filter: MaintenanceFilter = "All",
  sortBy: MaintenanceSortOption = "highest-risk",
  searchQuery: string = ""
): MaintenanceItem[] {
  let items = [...demoMaintenanceItems];

  // Search filter (road ID or road name)
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase().trim();
    items = items.filter(
      (item) =>
        item.roadId.toLowerCase().includes(q) ||
        item.roadName.toLowerCase().includes(q)
    );
  }

  // Priority filter (All, P1, P2, P3)
  if (filter !== "All") {
    items = items.filter((item) => item.priority === filter);
  }

  // Sort
  items.sort((a, b) => {
    if (sortBy === "highest-risk") {
      return b.riskPercentage - a.riskPercentage;
    }
    if (sortBy === "lowest-health") {
      return a.healthScore - b.healthScore;
    }
    if (sortBy === "priority") {
      const priorityOrder: Record<MaintenancePriority, number> = {
        P1: 1,
        P2: 2,
        P3: 3,
      };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return 0;
  });

  return items;
}

/**
 * Summary metrics for KPI cards.
 */
export function getMaintenanceSummary() {
  const critical = demoMaintenanceItems.filter((i) => i.priority === "P1").length;
  const highRisk = demoMaintenanceItems.filter((i) => i.priority === "P2").length;
  const pending = demoMaintenanceItems.length;
  const totalCost = demoMaintenanceItems.reduce((acc, i) => acc + i.estimatedCost, 0);

  return {
    criticalRoads: critical,
    highRiskRoads: highRisk,
    pendingMaintenance: pending,
    estimatedMaintenanceBudget: totalCost,
    formattedBudget: `$${(totalCost / 1000000).toFixed(2)}M`,
  };
}
