"use client";

import React, { useEffect, useRef, useState } from "react";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { MapRoadSegment } from "@/types/risk-map";
import { convertSegmentsToGeoJson } from "@/lib/risk-map-service";
import RiskMapLegend from "@/components/risk-map/RiskMapLegend";
import { AlertTriangleIcon, ActivityIcon, TruckIcon, RadarIcon } from "@/components/icons";

interface RiskMapContainerProps {
  segments: MapRoadSegment[];
  onSelectSegment?: (segment: MapRoadSegment | null) => void;
  selectedRoadId?: string;
}

export default function RiskMapContainer({
  segments,
  onSelectSegment,
  selectedRoadId,
}: RiskMapContainerProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const popupRef = useRef<maplibregl.Popup | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [activeSegment, setActiveSegment] = useState<MapRoadSegment | null>(null);

  // Initialize MapLibre GL instance
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Free OpenStreetMap-compatible Dark Carto tiles style (no API key needed)
    const mapStyle: maplibregl.StyleSpecification = {
      version: 8,
      sources: {
        "osm-dark-tiles": {
          type: "raster",
          tiles: [
            "https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png",
            "https://b.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png",
            "https://c.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png",
            "https://d.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png",
          ],
          tileSize: 256,
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        },
      },
      layers: [
        {
          id: "osm-dark-layer",
          type: "raster",
          source: "osm-dark-tiles",
          minzoom: 0,
          maxzoom: 19,
        },
      ],
    };

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: mapStyle,
      center: [-74.175, 40.735], // Metro corridor center
      zoom: 11.6,
      pitch: 25,
      attributionControl: false,
    });

    // Add navigation controls
    map.addControl(
      new maplibregl.NavigationControl({
        showCompass: true,
        visualizePitch: true,
      }),
      "top-right"
    );

    map.on("load", () => {
      // Add Road Segments GeoJSON source
      map.addSource("road-segments", {
        type: "geojson",
        data: convertSegmentsToGeoJson(segments),
      });

      // Layer 1: Dark Outer Casing
      map.addLayer({
        id: "road-segments-casing",
        type: "line",
        source: "road-segments",
        layout: {
          "line-cap": "round",
          "line-join": "round",
        },
        paint: {
          "line-color": "#070b14",
          "line-width": 8,
          "line-opacity": 0.9,
        },
      });

      // Layer 2: Glow
      map.addLayer({
        id: "road-segments-glow",
        type: "line",
        source: "road-segments",
        layout: {
          "line-cap": "round",
          "line-join": "round",
        },
        paint: {
          "line-color": ["get", "color"],
          "line-width": 6,
          "line-blur": 3,
          "line-opacity": 0.5,
        },
      });

      // Layer 3: Main Colored Road Line
      map.addLayer({
        id: "road-segments-line",
        type: "line",
        source: "road-segments",
        layout: {
          "line-cap": "round",
          "line-join": "round",
        },
        paint: {
          "line-color": ["get", "color"],
          "line-width": 4.5,
          "line-opacity": 0.95,
        },
      });

      // Layer 4: Transparent Hitbox for easy clicking
      map.addLayer({
        id: "road-segments-hitbox",
        type: "line",
        source: "road-segments",
        layout: {
          "line-cap": "round",
          "line-join": "round",
        },
        paint: {
          "line-color": "transparent",
          "line-width": 20,
        },
      });

      // Cursor pointer on hover
      map.on("mouseenter", "road-segments-hitbox", () => {
        map.getCanvas().style.cursor = "pointer";
      });
      map.on("mouseleave", "road-segments-hitbox", () => {
        map.getCanvas().style.cursor = "";
      });

      // Click on Road Segment -> Open Popup
      map.on("click", "road-segments-hitbox", (e) => {
        if (!e.features || e.features.length === 0) return;
        const feature = e.features[0];
        const props = feature.properties;
        if (!props) return;

        const matched = segments.find((s) => s.roadId === props.roadId);
        if (matched) {
          setActiveSegment(matched);
          if (onSelectSegment) onSelectSegment(matched);
        }

        const coordinates = e.lngLat;

        // Custom dark HTML popup
        const popupHtml = `
          <div style="font-family: monospace; padding: 14px; background: #090e1a; border: 1px solid #1e293b; border-radius: 12px; color: #f1f5f9; min-width: 260px; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.7);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <span style="font-size: 10px; font-weight: bold; background: #0e2038; color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.4); padding: 2px 6px; border-radius: 4px;">
                ${props.roadId}
              </span>
              <span style="font-size: 11px; font-weight: bold; color: ${props.color};">
                ${props.riskCategory}
              </span>
            </div>

            <div style="font-size: 13px; font-weight: bold; color: #ffffff; margin-bottom: 8px;">
              ${props.roadName}
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 11px; margin-bottom: 10px; padding: 6px 8px; background: #030712; border-radius: 6px; border: 1px solid #1f2937;">
              <div>
                <span style="color: #64748b; font-size: 9px; text-transform: uppercase;">Health Score:</span>
                <div style="font-weight: bold; color: ${props.color}; font-size: 14px;">${props.healthScore} / 100</div>
              </div>
              <div>
                <span style="color: #64748b; font-size: 9px; text-transform: uppercase;">Failure Risk:</span>
                <div style="font-weight: bold; color: #f87171; font-size: 14px;">${props.riskPercentage}%</div>
              </div>
            </div>

            <div style="font-size: 11px; margin-bottom: 8px;">
              <span style="color: #64748b; font-size: 10px;">Last Inspection: </span>
              <span style="color: #cbd5e1;">${props.lastInspection}</span>
            </div>

            <div style="font-size: 11px; margin-bottom: 12px; line-height: 1.35; color: #94a3b8; border-top: 1px solid #1e293b; padding-top: 6px;">
              <strong style="color: #38bdf8;">Recommended Action:</strong><br/>
              ${props.recommendedMaintenance}
            </div>

            <div style="display: flex; gap: 6px;">
              <a href="/maintenance" style="flex: 1; text-align: center; font-size: 10px; font-weight: bold; background: #0369a1; color: #ffffff; padding: 6px 8px; border-radius: 6px; text-decoration: none; border: 1px solid #38bdf8;">
                Add to Plan
              </a>
              <a href="/inspection" style="flex: 1; text-align: center; font-size: 10px; font-weight: bold; background: #1e293b; color: #e2e8f0; padding: 6px 8px; border-radius: 6px; text-decoration: none; border: 1px solid #475569;">
                Inspect
              </a>
            </div>
          </div>
        `;

        if (popupRef.current) {
          popupRef.current.remove();
        }

        popupRef.current = new maplibregl.Popup({
          closeButton: true,
          closeOnClick: true,
          className: "roadguard-map-popup",
          maxWidth: "340px",
        })
          .setLngLat(coordinates)
          .setHTML(popupHtml)
          .addTo(map);
      });

      setMapLoaded(true);
    });

    mapRef.current = map;

    return () => {
      if (popupRef.current) popupRef.current.remove();
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Update GeoJSON source when filtered segments change
  useEffect(() => {
    if (!mapRef.current || !mapLoaded) return;
    const source = mapRef.current.getSource("road-segments") as maplibregl.GeoJSONSource;
    if (source) {
      source.setData(convertSegmentsToGeoJson(segments));
    }
  }, [segments, mapLoaded]);

  // When a search query matches or a specific segment is targeted, fly to it
  useEffect(() => {
    if (!mapRef.current || !mapLoaded || !selectedRoadId) return;

    const matched = segments.find(
      (s) => s.roadId.toLowerCase() === selectedRoadId.toLowerCase()
    );

    if (matched && matched.coordinates.length > 0) {
      const midCoord = matched.coordinates[Math.floor(matched.coordinates.length / 2)];
      mapRef.current.flyTo({
        center: midCoord,
        zoom: 13.2,
        pitch: 35,
        essential: true,
        duration: 1200,
      });

      setActiveSegment(matched);
      if (onSelectSegment) onSelectSegment(matched);
    }
  }, [selectedRoadId, segments, mapLoaded, onSelectSegment]);

  return (
    <div className="relative w-full h-[620px] sm:h-[680px] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950">
      {/* MapLibre DOM Node */}
      <div ref={mapContainerRef} className="w-full h-full" />

      {/* Floating Legend Overlay (Bottom Left) */}
      <div className="absolute bottom-4 left-4 z-10">
        <RiskMapLegend />
      </div>

      {/* Telemetry Indicator Badge (Top Left) */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/90 border border-slate-800 backdrop-blur-md text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-slate-300">
            ACTIVE CORRIDORS: <strong className="text-white">{segments.length}</strong>
          </span>
          <span className="text-slate-500 hidden sm:inline">• OpenStreetMap Vector Tile Layer</span>
        </div>
      </div>
    </div>
  );
}
