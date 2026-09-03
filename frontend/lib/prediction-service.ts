import { RoadPredictionResult, RiskDriverItem, TimelineForecastPoint } from "@/types/prediction";
import { demoRoads, DemoRoadSegment } from "@/data/roads";
import { getHealthCategory } from "@/lib/road-health";

export const PROTOTYPE_PREDICTION_DISCLAIMER =
  "Prototype Prediction • Simulated Deterioration Model. This application does not use a validated real-world predictive ML model yet.";

/**
 * SERVICE INTERFACE:
 * Isolates predictive calculation.
 *
 * FASTAPI INTEGRATION HOOK:
 * When your FastAPI predictive model server is running, replace this function with:
 *
 * export async function fetchPrediction(roadId: string): Promise<RoadPredictionResult> {
 *   const res = await fetch(`http://localhost:8000/api/v1/predict/${roadId}`, {
 *     method: "GET",
 *     headers: { "Content-Type": "application/json" },
 *   });
 *   return await res.json();
 * }
 */
export async function getRoadPrediction(roadId: string): Promise<RoadPredictionResult> {
  // Simulate rapid async response
  await new Promise((resolve) => setTimeout(resolve, 150));

  const road: DemoRoadSegment =
    demoRoads.find((r) => r.id === roadId) || demoRoads[0];

  // Calculate degradation trajectory
  const currentHealth = road.healthScore;
  const currentRisk = road.riskPercentage;

  // Rate of decay increases for lower initial health scores (the "deterioration cliff")
  const decayMultiplier = currentHealth < 40 ? 1.5 : currentHealth < 60 ? 1.2 : 0.8;

  const h30 = Math.max(12, Math.round(currentHealth - 5 * decayMultiplier));
  const r30 = Math.min(99, Math.round(currentRisk + 6 * decayMultiplier));

  const h60 = Math.max(8, Math.round(currentHealth - 12 * decayMultiplier));
  const r60 = Math.min(99, Math.round(currentRisk + 13 * decayMultiplier));

  const h90 = Math.max(5, Math.round(currentHealth - 19 * decayMultiplier));
  const r90 = Math.min(99, Math.round(currentRisk + 21 * decayMultiplier));

  const h180 = Math.max(4, Math.round(currentHealth - 32 * decayMultiplier));
  const r180 = Math.min(99, Math.round(currentRisk + 34 * decayMultiplier));

  const timelineData: TimelineForecastPoint[] = [
    {
      dayLabel: "Today",
      daysOut: 0,
      projectedHealthScore: currentHealth,
      projectedRiskPercentage: currentRisk,
      projectedStatus: getHealthCategory(currentHealth),
    },
    {
      dayLabel: "+30 Days",
      daysOut: 30,
      projectedHealthScore: h30,
      projectedRiskPercentage: r30,
      projectedStatus: getHealthCategory(h30),
    },
    {
      dayLabel: "+60 Days",
      daysOut: 60,
      projectedHealthScore: h60,
      projectedRiskPercentage: r60,
      projectedStatus: getHealthCategory(h60),
    },
    {
      dayLabel: "+90 Days",
      daysOut: 90,
      projectedHealthScore: h90,
      projectedRiskPercentage: r90,
      projectedStatus: getHealthCategory(h90),
    },
    {
      dayLabel: "+180 Days",
      daysOut: 180,
      projectedHealthScore: h180,
      projectedRiskPercentage: r180,
      projectedStatus: getHealthCategory(h180),
    },
  ];

  // 5 required risk drivers: pothole density, road age, traffic exposure, rainfall, previous road condition
  const riskDrivers: RiskDriverItem[] = [
    {
      id: "driver-potholes",
      name: "Pothole Density",
      metricValue: `${road.potholeCount} cavities logged (${(road.potholeCount * 1.8).toFixed(1)} / 100m)`,
      impactLevel: road.potholeCount > 5 ? "Critical" : road.potholeCount > 2 ? "High" : "Moderate",
      description:
        "Surface void punch-throughs expose untreated aggregate layers to vehicular dynamic impact and localized rim damage.",
    },
    {
      id: "driver-age",
      name: "Road Age & Binder Oxidation",
      metricValue: `${(road.riskPercentage / 10).toFixed(1)} years since last deep mill`,
      impactLevel: road.healthScore < 50 ? "High" : "Moderate",
      description:
        "Bituminous binder has lost elasticity through UV and thermal cycling, causing brittle aggregate micro-ravelling.",
    },
    {
      id: "driver-traffic",
      name: "Traffic Exposure (ESALs)",
      metricValue: road.trafficAadt || "112,000 vehicles/day",
      impactLevel: "High",
      description:
        "Heavy multi-axle freight loading compounds shear stress on wheel paths, accelerating fatigue fissure propagation.",
    },
    {
      id: "driver-rainfall",
      name: "Rainfall & Freeze-Thaw Climate",
      metricValue: "42mm projected precipitation (3 freeze-thaw cycles)",
      impactLevel: road.crackCount > 10 ? "Critical" : "High",
      description:
        "Standing surface water penetrates unsealed longitudinal cracks, expanding by 9% during overnight freezes to shear asphalt edges.",
    },
    {
      id: "driver-history",
      name: "Previous Road Condition",
      metricValue: `${road.crackCount} fatigue fissures (${road.surfaceDamage} surface distress zones)`,
      impactLevel: road.healthScore < 60 ? "High" : "Moderate",
      description:
        "Prior season distress left untreated created hydraulic pathways for sub-base moisture infiltration.",
    },
  ];

  // Financial calculations
  const costPerSqYdCurrent = road.healthScore < 40 ? 48 : road.healthScore < 60 ? 16 : 2.5;
  const costPerSqYdDeferred = 48.0;
  const estimatedAreaSqYd = 12500;
  const currentCost = Math.round((estimatedAreaSqYd * costPerSqYdCurrent) / 1000) * 1000;
  const deferredCost = Math.round((estimatedAreaSqYd * costPerSqYdDeferred) / 1000) * 1000;
  const savings = Math.max(0, deferredCost - currentCost);

  return {
    roadId: road.id,
    roadName: road.name,
    milepost: road.milepost || "MP 142.0 - 146.5",
    trafficAadt: road.trafficAadt || "148,000 vehicles/day",
    currentHealthScore: currentHealth,
    currentRiskPercentage: currentRisk,
    currentCondition:
      road.healthScore < 40
        ? "Severe sub-base shear, active moisture penetration, and punch-through void risk"
        : road.healthScore < 60
        ? "Accelerating fatigue fissures, aggregate ravelling, and unsealed joint separation"
        : "Structurally sound pavement with early hairline fissures and routine weathering",
    forecasts: {
      thirtyDays: { health: h30, risk: r30, status: getHealthCategory(h30) },
      sixtyDays: { health: h60, risk: r60, status: getHealthCategory(h60) },
      ninetyDays: { health: h90, risk: r90, status: getHealthCategory(h90) },
    },
    timelineData,
    riskDrivers,
    deteriorationExplanation:
      road.healthScore < 50
        ? `This corridor has entered the accelerated deterioration phase. With ${road.potholeCount} active potholes and ${road.crackCount} unsealed fissure networks, impending rainfall will penetrate directly to the sub-base foundation. Dynamic loading from ${road.trafficAadt || "heavy freight traffic"} will turn trapped moisture into hydraulic pressure, causing rapid sub-base liquefaction and triggering catastrophic full-depth pavement failure within 60 to 90 days.`
        : `While this corridor maintains moderate surface integrity, active micro-cracks along the wheel paths are vulnerable to upcoming seasonal rainfall. Without proactive preventative sealing within the next 60 days, moisture will migrate into the sub-base, precipitating a 4x increase in cracking velocity and transitioning the corridor into the high-risk bracket by next season.`,
    recommendation: {
      title:
        road.healthScore < 40
          ? "Emergency Base Stabilization & Hot-Mix Overlay"
          : road.healthScore < 60
          ? "Polymer Micro-Surfacing & Joint Injection"
          : "Preventative Fog Seal & Crack Infill",
      action: road.recommendedAction,
      urgencyWindow:
        road.healthScore < 40
          ? "Execute within 14 Days"
          : road.healthScore < 60
          ? "Execute within 30 Days"
          : "Schedule within 60 Days",
      preservationCost: `$${currentCost.toLocaleString()}`,
      rebuildPenaltyIfDeferred: `$${deferredCost.toLocaleString()}`,
      netSavings: `$${savings.toLocaleString()}`,
    },
    modelMetadata: {
      isPrototypePrediction: true,
      confidenceScore: 94.6,
      disclaimer: PROTOTYPE_PREDICTION_DISCLAIMER,
      modelVersion: "RoadGuard-Predictive-v1.4-prototype",
    },
  };
}
