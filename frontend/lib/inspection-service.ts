import {
  InspectionAnalysisResult,
  SamplePreset,
  FastApiInspectionResponse,
} from "@/types/inspection";
import { formatTimeString } from "@/lib/format-utils";

export const INSPECTION_DISCLAIMER =
  "Simulated Demonstration Analysis • Synthetic Model Output (Demo Mode)";

// Pre-packaged realistic sample presets for instant 1-click testing
export const samplePresets: SamplePreset[] = [
  {
    id: "sample-i95",
    name: "I-95 North MP 142.8",
    description: "Severe alligator fatigue cracking with sub-base depression",
    thumbnailColor: "from-rose-950 to-slate-900 border-rose-500/40",
    primaryDefect: "Alligator Cracking (Level 4)",
    previewUrl: "data:image/svg+xml;utf8," + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
        <rect width="800" height="500" fill="#182030"/>
        <!-- Road surface texture -->
        <rect width="800" height="500" fill="none" stroke="#253248" stroke-width="2"/>
        <path d="M0,250 Q200,240 400,250 T800,250" stroke="#334155" stroke-width="1" fill="none"/>
        <!-- Alligator Cracking Network -->
        <g stroke="#f43f5e" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.85">
          <path d="M220,180 L250,210 L290,200 L320,230 L360,210 L390,240 L410,220"/>
          <path d="M250,210 L240,260 L280,270 L300,310 L340,290 L360,210"/>
          <path d="M290,200 L280,270 L320,280 L350,330 L390,240"/>
          <path d="M240,260 L200,290 L230,340 L270,330 L300,310"/>
          <path d="M320,280 L340,350 L380,340 L410,300 L390,240"/>
          <path d="M270,330 L300,390 L350,370 L340,350"/>
        </g>
        <!-- Transverse seam -->
        <line x1="500" y1="120" x2="720" y2="140" stroke="#f59e0b" stroke-width="2.5" opacity="0.8"/>
        <!-- Lane divider -->
        <line x1="0" y1="420" x2="800" y2="420" stroke="#e2e8f0" stroke-width="4" stroke-dasharray="30,30" opacity="0.3"/>
      </svg>
    `),
  },
  {
    id: "sample-port",
    name: "Port Access Freight MP 2.4",
    description: "Deep pothole cavity resulting from overweight container axle loads",
    thumbnailColor: "from-amber-950 to-slate-900 border-amber-500/40",
    primaryDefect: "Pothole Cavity (52mm Depth)",
    previewUrl: "data:image/svg+xml;utf8," + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
        <rect width="800" height="500" fill="#131926"/>
        <!-- Pothole Void -->
        <ellipse cx="420" cy="260" rx="90" ry="60" fill="#090d16" stroke="#f43f5e" stroke-width="4"/>
        <ellipse cx="420" cy="260" rx="70" ry="45" fill="#04060a" stroke="#ef4444" stroke-width="2" stroke-dasharray="6,4"/>
        <path d="M350,240 Q400,220 490,250" stroke="#f59e0b" stroke-width="2" fill="none"/>
        <path d="M360,280 Q420,310 480,280" stroke="#f59e0b" stroke-width="2" fill="none"/>
        <!-- Radial stress cracks -->
        <g stroke="#f59e0b" stroke-width="2" fill="none" opacity="0.75">
          <line x1="330" y1="260" x2="270" y2="250"/>
          <line x1="510" y1="260" x2="570" y2="280"/>
          <line x1="420" y1="200" x2="440" y2="150"/>
          <line x1="420" y1="320" x2="410" y2="380"/>
        </g>
        <line x1="0" y1="420" x2="800" y2="420" stroke="#e2e8f0" stroke-width="4" stroke-dasharray="30,30" opacity="0.3"/>
      </svg>
    `),
  },
  {
    id: "sample-route101",
    name: "Route 101 Coastal MP 91.4",
    description: "Thermal expansion joint spalling and longitudinal ravelling",
    thumbnailColor: "from-sky-950 to-slate-900 border-sky-500/40",
    primaryDefect: "Transverse Joint Spall",
    previewUrl: "data:image/svg+xml;utf8," + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
        <rect width="800" height="500" fill="#161f2e"/>
        <!-- Joint line across pavement -->
        <line x1="80" y1="180" x2="720" y2="220" stroke="#06b6d4" stroke-width="4" stroke-dasharray="40,6"/>
        <!-- Spall chunks -->
        <g stroke="#f59e0b" stroke-width="2" fill="none">
          <path d="M240,185 L260,165 L290,195 L270,210 Z" fill="#0f172a" opacity="0.8"/>
          <path d="M440,200 L470,180 L500,215 L460,225 Z" fill="#0f172a" opacity="0.8"/>
        </g>
        <line x1="0" y1="420" x2="800" y2="420" stroke="#e2e8f0" stroke-width="4" stroke-dasharray="30,30" opacity="0.3"/>
      </svg>
    `),
  },
];

/**
 * MOCK FASTAPI CLIENT INTERFACE:
 * To connect to a live FastAPI model endpoint, simply replace the mock return below with:
 *
 *   const formData = new FormData();
 *   formData.append('file', file);
 *   const res = await fetch('http://localhost:8000/api/v1/inspect', { method: 'POST', body: formData });
 *   return await res.json();
 */
export async function analyzeRoadImage(
  fileOrUrl: File | string,
  sampleId?: string
): Promise<InspectionAnalysisResult> {
  // Simulate neural model inference latency (1600ms)
  await new Promise((resolve) => setTimeout(resolve, 1600));

  const isFile = fileOrUrl instanceof File;
  const fileName = isFile ? fileOrUrl.name : "survey_camera_frame_8k.jpg";
  const fileSizeBytes = isFile ? fileOrUrl.size : 2418000;

  // Choose appropriate preset findings or default findings
  if (sampleId === "sample-port") {
    return {
      analysisId: "RG-ANL-9042",
      analyzedAt: formatTimeString(),
      fileName,
      fileSizeBytes,
      imageUrl: typeof fileOrUrl === "string" ? fileOrUrl : URL.createObjectURL(fileOrUrl),
      roadHealthScore: 38,
      riskLevel: "Critical Risk",
      riskColor: "text-rose-400 bg-rose-950/80 border-rose-500/40",
      inspectionSummary:
        "Severe sub-base punch-through forming a 52mm deep pothole cavity. Heavy freight axle impacts have sheared surrounding asphalt matrix, causing immediate rim hazard. Immediate cold milling and full base stabilization required within 7 days.",
      defectCount: 2,
      defects: [
        {
          id: "DEF-01",
          distressType: "Pothole Cavity Hazard (ASTM D6433)",
          category: "Pothole",
          severity: "Critical",
          severityColor: "text-rose-400 bg-rose-950/80 border-rose-500/40",
          confidence: 0.991,
          dimensions: { areaSqM: 0.38, depthMm: 52, volumeCubicM: 0.02 },
          boundingBox: { topPercent: 38, leftPercent: 40, widthPercent: 24, heightPercent: 28 },
          pciDeduction: 32,
          treatmentRecommendation: "Deep hot-mix asphalt compaction & foundation stabilization",
          estimatedCost: "$92,000",
          actionUrgency: "Immediate (7 Days)",
        },
        {
          id: "DEF-02",
          distressType: "Radial Wheel Path Shear Cracking",
          category: "Fatigue Cracking",
          severity: "High",
          severityColor: "text-amber-400 bg-amber-950/80 border-amber-500/40",
          confidence: 0.954,
          dimensions: { lengthM: 2.8, widthMm: 12 },
          boundingBox: { topPercent: 34, leftPercent: 28, widthPercent: 44, heightPercent: 38 },
          pciDeduction: 16,
          treatmentRecommendation: "Polymer crack injection sealing",
          estimatedCost: "$18,000",
          actionUrgency: "Urgent (14 Days)",
        },
      ],
      modelMetadata: {
        modelName: "RoadGuard-YOLOv11-Pavement",
        modelVersion: "v4.2-synthetic-demo",
        inferenceLatencyMs: 18.2,
        isSyntheticDemo: true,
      },
    };
  }

  if (sampleId === "sample-route101") {
    return {
      analysisId: "RG-ANL-9043",
      analyzedAt: formatTimeString(),
      fileName,
      fileSizeBytes,
      imageUrl: typeof fileOrUrl === "string" ? fileOrUrl : URL.createObjectURL(fileOrUrl),
      roadHealthScore: 68,
      riskLevel: "Moderate Wear",
      riskColor: "text-amber-400 bg-amber-950/80 border-amber-500/40",
      inspectionSummary:
        "Thermal expansion joint sealant failure with localized spall erosion. Sub-surface moisture penetration risk is high ahead of upcoming winter freeze-thaw cycles. Recommend preventative silicone joint injection to protect base gravel.",
      defectCount: 2,
      defects: [
        {
          id: "DEF-01",
          distressType: "Transverse Joint Spall (ASTM D6433)",
          category: "Joint Distress",
          severity: "Moderate",
          severityColor: "text-amber-400 bg-amber-950/80 border-amber-500/40",
          confidence: 0.968,
          dimensions: { lengthM: 14.5, widthMm: 22, depthMm: 18 },
          boundingBox: { topPercent: 32, leftPercent: 12, widthPercent: 78, heightPercent: 18 },
          pciDeduction: 18,
          treatmentRecommendation: "High-flexibility silicone joint injection sealant",
          estimatedCost: "$38,500",
          actionUrgency: "Scheduled (30 Days)",
        },
        {
          id: "DEF-02",
          distressType: "Localized Shoulder Ravelling",
          category: "Surface Ravelling",
          severity: "Low",
          severityColor: "text-sky-400 bg-sky-950/80 border-sky-500/40",
          confidence: 0.932,
          dimensions: { areaSqM: 1.2 },
          boundingBox: { topPercent: 54, leftPercent: 60, widthPercent: 22, heightPercent: 16 },
          pciDeduction: 8,
          treatmentRecommendation: "Slurry seal top coat during scheduled cycle",
          estimatedCost: "$8,200",
          actionUrgency: "Routine (60 Days)",
        },
      ],
      modelMetadata: {
        modelName: "RoadGuard-YOLOv11-Pavement",
        modelVersion: "v4.2-synthetic-demo",
        inferenceLatencyMs: 16.8,
        isSyntheticDemo: true,
      },
    };
  }

  // Default findings (e.g. Interstate 95 or custom uploaded images)
  return {
    analysisId: "RG-ANL-9041",
    analyzedAt: formatTimeString(),
    fileName,
    fileSizeBytes,
    imageUrl: typeof fileOrUrl === "string" ? fileOrUrl : URL.createObjectURL(fileOrUrl),
    roadHealthScore: 48,
    riskLevel: "Critical Risk",
    riskColor: "text-rose-400 bg-rose-950/80 border-rose-500/40",
    inspectionSummary:
      "Interlocking alligator fissure pattern detected across wheel paths indicating sub-base structural fatigue. Aggregate stripping has commenced. If left untreated over 60 days, moisture infiltration will cause complete asphalt punching and multiply repair costs by 19x.",
    defectCount: 3,
    defects: [
      {
        id: "DEF-01",
        distressType: "Severe Fatigue / Alligator Cracking",
        category: "Fatigue Cracking",
        severity: "Critical",
        severityColor: "text-rose-400 bg-rose-950/80 border-rose-500/40",
        confidence: 0.987,
        dimensions: { areaSqM: 3.4, depthMm: 38 },
        boundingBox: { topPercent: 28, leftPercent: 24, widthPercent: 32, heightPercent: 35 },
        pciDeduction: 28,
        treatmentRecommendation: "Polymer-modified slurry micro-surfacing within 14 days",
        estimatedCost: "$184,000",
        actionUrgency: "Immediate (14 Days)",
      },
      {
        id: "DEF-02",
        distressType: "Transverse Seam Spalling",
        category: "Joint Distress",
        severity: "Moderate",
        severityColor: "text-amber-400 bg-amber-950/80 border-amber-500/40",
        confidence: 0.948,
        dimensions: { lengthM: 3.2, widthMm: 16 },
        boundingBox: { topPercent: 20, leftPercent: 62, widthPercent: 28, heightPercent: 15 },
        pciDeduction: 12,
        treatmentRecommendation: "Rubberized joint sealant injection",
        estimatedCost: "$24,000",
        actionUrgency: "Urgent (30 Days)",
      },
      {
        id: "DEF-03",
        distressType: "Wheel Path Rutting Depressions",
        category: "Rutting",
        severity: "Moderate",
        severityColor: "text-amber-400 bg-amber-950/80 border-amber-500/40",
        confidence: 0.962,
        dimensions: { depthMm: 18, lengthM: 4.5 },
        boundingBox: { topPercent: 55, leftPercent: 20, widthPercent: 55, heightPercent: 25 },
        pciDeduction: 12,
        treatmentRecommendation: "Cold micro-milling and thin bituminous overlay",
        estimatedCost: "$46,000",
        actionUrgency: "Scheduled (45 Days)",
      },
    ],
    modelMetadata: {
      modelName: "RoadGuard-YOLOv11-Pavement",
      modelVersion: "v4.2-synthetic-demo",
      inferenceLatencyMs: 19.4,
      isSyntheticDemo: true,
    },
  };
}

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

/**
 * LIVE FASTAPI BACKEND CLIENT:
 * Submits an uploaded road image to the FastAPI endpoint POST /api/inspection/analyze
 * Supports resilient fallback between localhost, 127.0.0.1, and Next.js proxy rewrite.
 */
export async function analyzeRoadWithFastApi(
  fileOrBlob: File | Blob,
  filename: string = "road_inspection.jpg"
): Promise<FastApiInspectionResponse> {
  const createFormData = () => {
    const formData = new FormData();
    if (fileOrBlob instanceof File) {
      formData.append("file", fileOrBlob, fileOrBlob.name || filename);
    } else {
      formData.append("file", fileOrBlob, filename || "road_inspection.jpg");
    }
    return formData;
  };

  // Build list of candidate endpoints to try for maximum resilience on Windows (IPv4/IPv6 localhost resolution)
  const candidateUrls: string[] = [];
  const primaryUrl = `${API_BASE_URL.replace(/\/+$/, "")}/api/inspection/analyze`;
  candidateUrls.push(primaryUrl);

  if (API_BASE_URL.includes("localhost:8000")) {
    candidateUrls.push("http://127.0.0.1:8000/api/inspection/analyze");
  } else if (API_BASE_URL.includes("127.0.0.1:8000")) {
    candidateUrls.push("http://localhost:8000/api/inspection/analyze");
  }

  // Also include same-origin relative proxy via Next.js rewrites
  if (typeof window !== "undefined") {
    candidateUrls.push("/api/inspection/analyze");
  }

  // Deduplicate candidate URLs
  const uniqueUrls = Array.from(new Set(candidateUrls));

  for (const endpoint of uniqueUrls) {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: createFormData(),
      });

      if (!response.ok) {
        let errorDetail = `Backend inspection failed (HTTP ${response.status})`;
        try {
          const errorJson = await response.json();
          if (errorJson.detail) errorDetail = errorJson.detail;
        } catch {
          // fallback
        }
        throw new Error(errorDetail);
      }

      return await response.json();
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error(String(err));
      // If it was an HTTP status error (e.g., 400 Bad Request), don't retry other hosts
      if (error.message && !error.message.includes("Failed to fetch") && !error.message.includes("NetworkError")) {
        throw error;
      }
      // Continue to next candidate URL on network connection failure
    }
  }

  // If all candidate endpoints failed with network errors
  throw new Error(
    `Failed to connect to FastAPI backend at ${API_BASE_URL}. ` +
      `Please ensure the FastAPI server is running on port 8000 (e.g., 'python backend/main.py' or 'uvicorn app.main:app --reload --port 8000').`
  );
}

/**
 * MOCK ANALYSIS UTILITY:
 * Returns structured inspection data conforming to the user's specification.
 */
export async function runMockRoadAnalysis(
  fileOrUrl: File | string,
  sampleId?: string
): Promise<import("@/types/inspection").RoadInspectionAnalysis> {
  // Simulate network inference latency without freezing the main thread
  await new Promise((resolve) => setTimeout(resolve, 1400));

  if (sampleId === "sample-port") {
    return {
      potholes: 6,
      cracks: 8,
      surfaceDamage: 5,
      totalDefects: 19,
      healthScore: 38,
      riskLevel: "CRITICAL",
      roadCondition: "Critical / Failed (Severe sub-base void punch-through)",
      defectSeverity: "Critical (Level 4)",
      recommendation: "Emergency base stabilization & hot-mix overlay",
      priority: "P1",
      confidence: 97.2,
      analysisTimestamp: formatTimeString(),
      isSimulatedDemo: true,
    };
  }

  if (sampleId === "sample-route101") {
    return {
      potholes: 1,
      cracks: 14,
      surfaceDamage: 2,
      totalDefects: 17,
      healthScore: 68,
      riskLevel: "MODERATE",
      roadCondition: "Fair Condition (Thermal seam spalling and ravelling)",
      defectSeverity: "Moderate (Level 2)",
      recommendation: "High-flexibility silicone joint sealing",
      priority: "P3",
      confidence: 93.6,
      analysisTimestamp: formatTimeString(),
      isSimulatedDemo: true,
    };
  }

  // Default structured output matching user's requested specification:
  return {
    potholes: 4,
    cracks: 11,
    surfaceDamage: 3,
    totalDefects: 18,
    healthScore: 62,
    riskLevel: "HIGH",
    roadCondition: "Fair to Poor (Early aggregate stripping & moisture infiltration)",
    defectSeverity: "High (Level 3)",
    recommendation: "Preventive resurfacing",
    priority: "P2",
    confidence: 94.8,
    analysisTimestamp: formatTimeString(),
    isSimulatedDemo: true,
  };
}
