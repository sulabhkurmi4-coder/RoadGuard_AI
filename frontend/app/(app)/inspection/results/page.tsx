"use client";

import React, { useState, useEffect } from "react";
import ResultsHeader from "@/components/inspection-results/ResultsHeader";
import InspectedImageSection from "@/components/inspection-results/InspectedImageSection";
import RoadHealthCard from "@/components/inspection-results/RoadHealthCard";
import DefectSummaryCard from "@/components/inspection-results/DefectSummaryCard";
import RiskAssessmentCard from "@/components/inspection-results/RiskAssessmentCard";
import MaintenanceRecommendationCard from "@/components/inspection-results/MaintenanceRecommendationCard";
import AiExplanationCard from "@/components/inspection-results/AiExplanationCard";
import ResultsActionFooter from "@/components/inspection-results/ResultsActionFooter";
import { demoInspectionResult } from "@/lib/inspection-results-demo";
import { DetailedInspectionResult, RoadHealthStatus } from "@/types/inspection-results";

export default function InspectionResultsPage() {
  const [result, setResult] = useState<DetailedInspectionResult>(demoInspectionResult);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = sessionStorage.getItem("latest_road_inspection");
      if (!stored) return;
      const parsed = JSON.parse(stored);
      if (!parsed || !parsed.inspection_id) return;

      const totalDefects = (parsed.potholes || 0) + (parsed.cracks || 0) + (parsed.surface_damage || 0);
      const isCritical = parsed.risk_level?.toUpperCase().includes("CRITICAL") || parsed.health_score < 45;
      const isHigh = parsed.risk_level?.toUpperCase().includes("HIGH") || parsed.health_score < 65;
      const isModerate = parsed.risk_level?.toUpperCase().includes("MODERATE") || parsed.health_score < 80;

      const status: RoadHealthStatus = isCritical
        ? "Critical"
        : isHigh
        ? "High Risk"
        : isModerate
        ? "Moderate"
        : "Healthy";

      const mapped: DetailedInspectionResult = {
        inspectionId: parsed.inspection_id,
        roadId: "SEG-" + parsed.inspection_id.replace(/^INS-/, ""),
        roadName: parsed.fileName || "Uploaded Road Inspection Target",
        inspectionDate: new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }) + " • " + new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
        imageUrl: parsed.imageUrl || demoInspectionResult.imageUrl,
        healthScore: parsed.health_score,
        status,
        statusColor: isCritical
          ? "border-rose-500/60 bg-rose-950/20 text-rose-400"
          : isHigh
          ? "border-amber-500/60 bg-amber-950/20 text-amber-400"
          : isModerate
          ? "border-sky-500/60 bg-sky-950/20 text-sky-400"
          : "border-emerald-500/60 bg-emerald-950/20 text-emerald-400",
        statusDescription: isCritical
          ? "Severe structural degradation requiring immediate intervention"
          : isHigh
          ? "Substantial pavement fatigue and cracking present"
          : isModerate
          ? "Moderate surface wear within serviceable tolerance"
          : "Road surface is in optimal structural condition",
        defectSummary: {
          potholes: parsed.potholes || 0,
          cracks: parsed.cracks || 0,
          surfaceDamage: parsed.surface_damage || 0,
          totalDefects,
        },
        severity: {
          critical: parsed.potholes > 2 ? parsed.potholes : 0,
          high: parsed.cracks > 5 ? parsed.cracks : (parsed.potholes > 0 ? 1 : 0),
          medium: parsed.surface_damage || (parsed.cracks > 0 ? 2 : 0),
          low: parsed.health_score > 70 ? 1 : 0,
        },
        riskAssessment: {
          riskPercentage: parsed.risk_percentage || (100 - parsed.health_score),
          riskCategory: parsed.risk_level || "MODERATE",
          explanation: parsed.is_demo_fallback
            ? "Demo Fallback: Synthetic highway preset distress pattern with modeled decay."
            : `Optical Computer Vision analysis identified ${parsed.potholes || 0} cavity void(s), ${parsed.cracks || 0} linear fissure(s), and ${parsed.surface_damage || 0} surface stripping zone(s).`,
        },
        maintenanceRecommendation: {
          recommendedAction: parsed.recommendation || "Preventative pavement maintenance",
          priority: (parsed.priority as "P1" | "P2" | "P3" | "P4") || "P2",
          suggestedTimeline: parsed.priority === "P1" ? "Within 7 Days" : parsed.priority === "P2" ? "Within 21 Days" : "Within 60 Days",
          prototypeEstimatedCost: parsed.priority === "P1" ? "$85,000" : parsed.priority === "P2" ? "$38,000" : "$12,500",
        },
        aiExplanation: {
          heading: parsed.is_demo_fallback
            ? "Why was this preset risk level assigned?"
            : `Why was ${parsed.risk_level || "this road"} classified at ${parsed.health_score}/100 health score?`,
          factors: [
            {
              title: parsed.potholes > 0 ? "Pothole Cavity Depressions" : "Surface Smoothness Profile",
              level: parsed.potholes > 2 ? "Critical" : parsed.potholes > 0 ? "High" : "Moderate",
              description: parsed.potholes > 0
                ? `Detected ${parsed.potholes} optical cavity depressions on pavement.`
                : "No major cavity voids detected across inspected surface.",
            },
            {
              title: parsed.cracks > 0 ? "Linear Fissure Fractures" : "Pavement Cohesion",
              level: parsed.cracks > 5 ? "Critical" : parsed.cracks > 0 ? "High" : "Moderate",
              description: parsed.cracks > 0
                ? `Detected ${parsed.cracks} directional gradient edge fracture patterns.`
                : "Negligible structural crack propagation identified.",
            },
          ],
          demoNotice: parsed.is_demo_fallback
            ? "Demo Fallback Notice: Synthetic demonstration preset result."
            : `Analysis quantified live by ${parsed.analysis_method || "Optical Computer Vision (ASTM D6433 standard)"}.`,
        },
      };

      setResult(mapped);
    } catch {
      // fallback to demo
    }
  }, []);

  return (
    <div className="space-y-8 pb-16">
      {/* 1. Header: AI Inspection Results, Inspection ID, Road ID, Inspection date */}
      <ResultsHeader
        inspectionId={result.inspectionId}
        roadId={result.roadId}
        roadName={result.roadName}
        inspectionDate={result.inspectionDate}
      />

      {/* 2 & 3. Inspected Image Section & Road Health Card */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Inspected Road Image with "Inspection Image" label (7 cols) */}
        <div className="xl:col-span-7">
          <InspectedImageSection
            imageUrl={result.imageUrl}
            roadName={result.roadName}
          />
        </div>

        {/* 3. Road Health Score Card (5 cols) */}
        <div className="xl:col-span-5">
          <RoadHealthCard
            score={result.healthScore}
            status={result.status}
            statusDescription={result.statusDescription}
          />
        </div>
      </div>

      {/* 4 & 5. Defect Summary (Potholes, Cracks, Surface Damage, Total Defects) & Severity */}
      <DefectSummaryCard
        defectSummary={result.defectSummary}
        severity={result.severity}
      />

      {/* 6 & 7. Risk Assessment & Maintenance Recommendation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* 6. Risk Assessment (Risk %, Category, Explanation) */}
        <RiskAssessmentCard
          riskPercentage={result.riskAssessment.riskPercentage}
          riskCategory={result.riskAssessment.riskCategory}
          explanation={result.riskAssessment.explanation}
        />

        {/* 7. Maintenance Recommendation (Action, Priority, Timeline, Cost) */}
        <MaintenanceRecommendationCard
          recommendedAction={result.maintenanceRecommendation.recommendedAction}
          priority={result.maintenanceRecommendation.priority}
          suggestedTimeline={result.maintenanceRecommendation.suggestedTimeline}
          prototypeEstimatedCost={result.maintenanceRecommendation.prototypeEstimatedCost}
        />
      </div>

      {/* 8. AI Explanation: "Why is this road considered high risk?" */}
      <AiExplanationCard
        heading={result.aiExplanation.heading}
        factors={result.aiExplanation.factors}
        demoNotice={result.aiExplanation.demoNotice}
      />

      {/* 9. Actions: Back to Inspection, View on Risk Map, Add to Maintenance Plan */}
      <ResultsActionFooter />
    </div>
  );
}
