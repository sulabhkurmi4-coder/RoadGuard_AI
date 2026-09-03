"use client";

import React from "react";
import ResultsHeader from "@/components/inspection-results/ResultsHeader";
import InspectedImageSection from "@/components/inspection-results/InspectedImageSection";
import RoadHealthCard from "@/components/inspection-results/RoadHealthCard";
import DefectSummaryCard from "@/components/inspection-results/DefectSummaryCard";
import RiskAssessmentCard from "@/components/inspection-results/RiskAssessmentCard";
import MaintenanceRecommendationCard from "@/components/inspection-results/MaintenanceRecommendationCard";
import AiExplanationCard from "@/components/inspection-results/AiExplanationCard";
import ResultsActionFooter from "@/components/inspection-results/ResultsActionFooter";
import { demoInspectionResult } from "@/lib/inspection-results-demo";

export default function InspectionResultsPage() {
  const result = demoInspectionResult;

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
