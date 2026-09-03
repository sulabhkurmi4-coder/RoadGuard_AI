/**
 * RoadGuard AI — Road Health Scoring Utility
 *
 * IMPORTANT PROTOTYPE NOTICE:
 * The scoring thresholds and risk classification rules implemented in this module
 * represent a simplified RoadGuard demonstration/prototype scoring model.
 * They are designed for user interface demonstration and mock telemetry evaluation,
 * and DO NOT represent an official civil engineering standard (such as ASTM D6433
 * Pavement Condition Index or AASHTO standard practice).
 *
 * Threshold Mapping:
 * - 80–100: Healthy   (Low Failure Risk)
 * - 60–79:  Moderate  (Moderate Wear & Surface Distress)
 * - 40–59:  High Risk (Accelerating Moisture & Sub-Base Infiltration)
 * - 0–39:   Critical  (Structural Base Disintegration & Cavity Hazard)
 */

export type RoadHealthCategory = "Healthy" | "Moderate" | "High Risk" | "Critical";

export type RoadRiskLevel = "LOW" | "MODERATE" | "HIGH" | "CRITICAL";

export interface RoadHealthStyling {
  textColor: string;
  bgColor: string;
  borderColor: string;
  progressColor: string;
  badgeClass: string;
}

export interface RoadHealthDetails {
  score: number;
  category: RoadHealthCategory;
  riskLevel: RoadRiskLevel;
  description: string;
  range: string;
  styling: RoadHealthStyling;
  isDemoThreshold: true;
}

/**
 * Validates, sanitizes, and clamps any numeric or undefined score input
 * into a safe integer in the range [0, 100].
 */
export function clampScore(score: unknown): number {
  if (typeof score !== "number" || Number.isNaN(score) || !Number.isFinite(score)) {
    return 0;
  }
  return Math.min(100, Math.max(0, Math.round(score)));
}

/**
 * 1. getHealthCategory(score)
 *
 * Returns the prototype road health category for a given score:
 * - 80–100 => "Healthy"
 * - 60–79  => "Moderate"
 * - 40–59  => "High Risk"
 * - 0–39   => "Critical"
 *
 * Note: Thresholds are prototype rules, not official engineering standards.
 */
export function getHealthCategory(score: unknown): RoadHealthCategory {
  const safeScore = clampScore(score);

  if (safeScore >= 80) {
    return "Healthy";
  }
  if (safeScore >= 60) {
    return "Moderate";
  }
  if (safeScore >= 40) {
    return "High Risk";
  }
  return "Critical";
}

/**
 * 2. getRiskLevel(score)
 *
 * Returns the uppercase risk classification identifier for a given score:
 * - 80–100 => "LOW"
 * - 60–79  => "MODERATE"
 * - 40–59  => "HIGH"
 * - 0–39   => "CRITICAL"
 *
 * Note: Thresholds are prototype rules, not official engineering standards.
 */
export function getRiskLevel(score: unknown): RoadRiskLevel {
  const safeScore = clampScore(score);

  if (safeScore >= 80) {
    return "LOW";
  }
  if (safeScore >= 60) {
    return "MODERATE";
  }
  if (safeScore >= 40) {
    return "HIGH";
  }
  return "CRITICAL";
}

/**
 * 3. getHealthDescription(score)
 *
 * Returns a descriptive assessment explaining the pavement condition
 * for a given score bracket.
 *
 * Note: Thresholds are prototype rules, not official engineering standards.
 */
export function getHealthDescription(score: unknown): string {
  const safeScore = clampScore(score);

  if (safeScore >= 80) {
    return "Pavement matrix is structurally sound with minimal surface oxidation. Routine monitoring scheduled.";
  }
  if (safeScore >= 60) {
    return "Moderate surface wear detected. Hairline transverse fissures and minor ravelling present. Ideal candidate for preventive seal coating.";
  }
  if (safeScore >= 40) {
    return "High risk condition: Accelerating moisture penetration, fatigue cracking, and sub-base void risk. Requires intervention within 14–30 days.";
  }
  return "Critical failure condition: Severe base shear, deep pothole cavities, and imminent sub-base collapse. Immediate emergency intervention required.";
}

/**
 * Returns tailored Tailwind styling classes matching the RoadGuard cyber-infrastructure theme.
 */
export function getHealthStyling(score: unknown): RoadHealthStyling {
  const category = getHealthCategory(score);

  switch (category) {
    case "Healthy":
      return {
        textColor: "text-emerald-400",
        bgColor: "bg-emerald-950/80",
        borderColor: "border-emerald-500/40",
        progressColor: "bg-emerald-500",
        badgeClass: "text-emerald-300 bg-emerald-950/80 border-emerald-500/40",
      };
    case "Moderate":
      return {
        textColor: "text-sky-400",
        bgColor: "bg-sky-950/80",
        borderColor: "border-sky-500/40",
        progressColor: "bg-sky-400",
        badgeClass: "text-sky-300 bg-sky-950/80 border-sky-500/40",
      };
    case "High Risk":
      return {
        textColor: "text-amber-400",
        bgColor: "bg-amber-950/80",
        borderColor: "border-amber-500/40",
        progressColor: "bg-amber-400",
        badgeClass: "text-amber-300 bg-amber-950/80 border-amber-500/40",
      };
    case "Critical":
      return {
        textColor: "text-rose-400",
        bgColor: "bg-rose-950/80",
        borderColor: "border-rose-500/40",
        progressColor: "bg-rose-500",
        badgeClass: "text-rose-300 bg-rose-950/80 border-rose-500/40",
      };
  }
}

/**
 * Returns a comprehensive health details object combining score, category,
 * risk level, description, and UI styling in a single reusable call.
 */
export function getHealthDetails(score: unknown): RoadHealthDetails {
  const safeScore = clampScore(score);
  const category = getHealthCategory(safeScore);
  const riskLevel = getRiskLevel(safeScore);
  const description = getHealthDescription(safeScore);
  const styling = getHealthStyling(safeScore);

  const range =
    category === "Healthy"
      ? "80–100"
      : category === "Moderate"
      ? "60–79"
      : category === "High Risk"
      ? "40–59"
      : "0–39";

  return {
    score: safeScore,
    category,
    riskLevel,
    description,
    range,
    styling,
    isDemoThreshold: true,
  };
}
