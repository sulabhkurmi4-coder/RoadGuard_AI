import { DetailedInspectionResult } from "@/types/inspection-results";

export const demoInspectionResult: DetailedInspectionResult = {
  inspectionId: "INS-2026-0941",
  roadId: "RD-I95-NB-1428",
  roadName: "Interstate 95 Northbound • Corridor Sector 4 (MP 142.8)",
  inspectionDate: "September 4, 2026 • 01:15 UTC",
  imageUrl:
    "data:image/svg+xml;utf8," +
    encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="900" height="520" viewBox="0 0 900 520">
        <rect width="900" height="520" fill="#141c2c"/>
        <line x1="0" y1="260" x2="900" y2="260" stroke="#1e293b" stroke-width="2"/>
        <!-- Alligator Cracking -->
        <g stroke="#f43f5e" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.9">
          <path d="M260,180 L290,210 L340,195 L370,230 L420,205 L450,240 L480,215"/>
          <path d="M290,210 L280,265 L325,275 L345,320 L395,295 L420,205"/>
          <path d="M340,195 L325,275 L370,285 L405,335 L450,240"/>
          <path d="M280,265 L235,295 L270,350 L315,335 L345,320"/>
          <path d="M370,285 L395,360 L440,345 L475,305 L450,240"/>
          <path d="M315,335 L350,400 L405,380 L395,360"/>
        </g>
        <!-- Pothole cavity -->
        <ellipse cx="620" cy="270" rx="65" ry="42" fill="#090d16" stroke="#f43f5e" stroke-width="3.5"/>
        <ellipse cx="620" cy="270" rx="45" ry="28" fill="#030508" stroke="#ef4444" stroke-width="2" stroke-dasharray="5,3"/>
        <!-- Transverse seam -->
        <line x1="120" y1="130" x2="780" y2="155" stroke="#f59e0b" stroke-width="2.5" opacity="0.8"/>
        <!-- Lane lines -->
        <line x1="0" y1="450" x2="900" y2="450" stroke="#e2e8f0" stroke-width="4" stroke-dasharray="40,30" opacity="0.3"/>
      </svg>
    `),
  healthScore: 52,
  status: "High Risk",
  statusColor: "text-amber-400 bg-amber-950/80 border-amber-500/40",
  statusDescription:
    "Accelerating pavement ravelling, sub-base shear depressions, and active moisture ingress.",
  defectSummary: {
    potholes: 4,
    cracks: 11,
    surfaceDamage: 3,
    totalDefects: 18,
  },
  severity: {
    low: 2,
    medium: 5,
    high: 8,
    critical: 3,
  },
  riskAssessment: {
    riskPercentage: 78,
    riskCategory: "High Risk (Sub-base Moisture Vulnerability)",
    explanation:
      "Multiple deep fatigue fissures intersect the primary wheel path with 38mm void depth. Water ingress during upcoming precipitation cycles will trigger sub-base liquefaction and rapid asphalt punch-through within 30 to 45 days.",
  },
  maintenanceRecommendation: {
    recommendedAction: "Polymer-modified micro-surfacing & sub-base void injection",
    priority: "P2",
    suggestedTimeline: "14–21 Days (Before upcoming freeze-thaw cycle)",
    prototypeEstimatedCost: "$184,000",
  },
  aiExplanation: {
    heading: "Why is this road considered high risk?",
    factors: [
      {
        title: "High Pothole Density",
        level: "Critical",
        description:
          "4 deep cavities per 100 meters, exceeding municipal safety thresholds and presenting immediate vehicle suspension impact risk.",
      },
      {
        title: "Surface Deterioration",
        level: "High",
        description:
          "Severe aggregate stripping and longitudinal micro-ravelling along the primary wheel path, accelerating frictional degradation.",
      },
      {
        title: "Road Age",
        level: "High",
        description:
          "Last resurfaced 8.4 years ago with asphalt binder showing advanced thermal oxidation and loss of elastic recovery.",
      },
      {
        title: "Traffic Exposure",
        level: "Moderate",
        description:
          "Daily freight volume exceeding 82,400 ESALs with continuous heavy axle loads compounding structural fatigue.",
      },
    ],
    demoNotice:
      "Prototype demonstration factors. Real-time machine learning telemetry will connect to Department of Transportation databases upon production deployment.",
  },
};
