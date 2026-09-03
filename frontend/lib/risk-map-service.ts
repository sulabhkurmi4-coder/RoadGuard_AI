import { MapRoadSegment, RiskMapFilter, RoadSegmentGeoJsonProperties } from "@/types/risk-map";
import { RoadHealthCategory } from "@/lib/road-health";
import { demoRoads } from "@/data/roads";

/**
 * Category color mappings matching RoadGuard AI's cyber-infrastructure design system.
 */
export const RISK_CATEGORY_COLORS: Record<RoadHealthCategory, string> = {
  Healthy: "#10b981",    // Emerald
  Moderate: "#38bdf8",   // Sky Blue
  "High Risk": "#f59e0b", // Amber
  Critical: "#f43f5e",   // Rose
};

/**
 * Maps the 20 unified demo road segments from @/data/roads into MapLibre GL LineString segments.
 * Provides rich geometry centered around each road's latitude and longitude.
 */
export const demoRoadSegments: MapRoadSegment[] = demoRoads.map((road, idx) => {
  // Generate smooth multi-point highway path based on segment orientation
  const angle = (idx * 37 * Math.PI) / 180; // Varying corridor headings
  const len = 0.024;
  const cos = Math.cos(angle) * len;
  const sin = Math.sin(angle) * len;

  return {
    id: `SEG-${idx + 1}`,
    roadId: road.id,
    roadName: road.name,
    healthScore: road.healthScore,
    riskPercentage: road.riskPercentage,
    riskCategory: road.riskLevel,
    lastInspection: road.lastInspection,
    recommendedMaintenance: road.recommendedAction,
    milepost: road.milepost || `MP ${idx * 5}.0 - ${idx * 5 + 4}.5`,
    trafficAadt: road.trafficAadt || "85,000 vehicles/day",
    coordinates: [
      [road.longitude - cos, road.latitude - sin],
      [road.longitude - cos * 0.45, road.latitude - sin * 0.45],
      [road.longitude, road.latitude],
      [road.longitude + cos * 0.45, road.latitude + sin * 0.45],
      [road.longitude + cos, road.latitude + sin],
    ],
  };
});

/**
 * SERVICE INTERFACE:
 * Isolates road data fetching so it can later be wired directly to
 * a FastAPI endpoint (e.g. GET /api/v1/roads/geojson).
 */
export async function getRoadSegments(
  filter: RiskMapFilter = "All",
  searchQuery: string = ""
): Promise<MapRoadSegment[]> {
  return demoRoadSegments.filter((seg) => {
    // Category filter
    const matchesCategory = filter === "All" || seg.riskCategory === filter;

    // Search query filter (matches road ID or name)
    const normalizedQuery = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !normalizedQuery ||
      seg.roadId.toLowerCase().includes(normalizedQuery) ||
      seg.roadName.toLowerCase().includes(normalizedQuery);

    return matchesCategory && matchesQuery;
  });
}

/**
 * Converts road segments to a standard GeoJSON FeatureCollection for MapLibre GL JS.
 */
export function convertSegmentsToGeoJson(
  segments: MapRoadSegment[]
): GeoJSON.FeatureCollection<GeoJSON.LineString, RoadSegmentGeoJsonProperties> {
  return {
    type: "FeatureCollection",
    features: segments.map((seg) => ({
      type: "Feature",
      id: seg.id,
      geometry: {
        type: "LineString",
        coordinates: seg.coordinates,
      },
      properties: {
        id: seg.id,
        roadId: seg.roadId,
        roadName: seg.roadName,
        healthScore: seg.healthScore,
        riskPercentage: seg.riskPercentage,
        riskCategory: seg.riskCategory,
        lastInspection: seg.lastInspection,
        recommendedMaintenance: seg.recommendedMaintenance,
        milepost: seg.milepost,
        trafficAadt: seg.trafficAadt,
        color: RISK_CATEGORY_COLORS[seg.riskCategory],
      },
    })),
  };
}
