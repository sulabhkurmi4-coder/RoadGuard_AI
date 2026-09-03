"use client";

import React, { useState, useEffect } from "react";
import PredictionRoadSelector from "@/components/predictions/PredictionRoadSelector";
import CurrentConditionCard from "@/components/predictions/CurrentConditionCard";
import FutureRiskHorizon from "@/components/predictions/FutureRiskHorizon";
import RiskProgressionChart from "@/components/predictions/RiskProgressionChart";
import RiskDriversList from "@/components/predictions/RiskDriversList";
import PredictionExplanationCard from "@/components/predictions/PredictionExplanationCard";
import RiskExplanation from "@/components/ai/RiskExplanation";
import { RoadPredictionResult } from "@/types/prediction";
import { getRoadPrediction, PROTOTYPE_PREDICTION_DISCLAIMER } from "@/lib/prediction-service";
import { TrendingDownIcon } from "@/components/icons";

export default function PredictionsPage() {
  const [selectedRoadId, setSelectedRoadId] = useState("RD-I95-142");
  const [prediction, setPrediction] = useState<RoadPredictionResult | null>(null);
  const [loading, setLoading] = useState(true);

  // Load prediction whenever selected road ID changes
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    getRoadPrediction(selectedRoadId).then((result) => {
      if (isMounted) {
        setPrediction(result);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [selectedRoadId]);

  return (
    <div className="space-y-8 pb-16">
      {/* Page Header */}
      <div className="space-y-2 pb-4 border-b border-slate-800/80">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-[11px] font-mono text-purple-400">
            <TrendingDownIcon size={12} />
            <span>AI STRUCTURAL PREDICTIVE INTELLIGENCE</span>
          </div>

          <span className="px-2.5 py-1 rounded bg-amber-950/60 border border-amber-500/30 text-[10px] font-mono text-amber-300 font-bold">
            PROTOTYPE PREDICTION ENGINE
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Predictive Degradation & Capital Models
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-3xl">
          Forecast pavement asset deterioration trajectories across 30, 60, 90, and 180-day horizons to schedule preventative maintenance before structural foundation collapse.
        </p>
      </div>

      {/* 1. Road Selector */}
      <PredictionRoadSelector
        selectedRoadId={selectedRoadId}
        onSelectRoad={setSelectedRoadId}
      />

      {loading || !prediction ? (
        <div className="p-12 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-center font-mono text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
            <span>Computing AI structural degradation trajectory...</span>
          </div>
        </div>
      ) : (
        <>
          {/* 2 & 3. Current Condition & Future Risk Horizon Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch">
            {/* 2. Current Condition Card (5 cols) */}
            <div className="xl:col-span-5 flex">
              <div className="w-full">
                <CurrentConditionCard
                  healthScore={prediction.currentHealthScore}
                  currentRisk={prediction.currentRiskPercentage}
                  currentCondition={prediction.currentCondition}
                  roadName={prediction.roadName}
                  roadId={prediction.roadId}
                />
              </div>
            </div>

            {/* 3. Future Risk Horizon (7 cols): 30, 60, 90 Days */}
            <div className="xl:col-span-7 flex">
              <div className="w-full">
                <FutureRiskHorizon
                  thirtyDays={prediction.forecasts.thirtyDays}
                  sixtyDays={prediction.forecasts.sixtyDays}
                  ninetyDays={prediction.forecasts.ninetyDays}
                />
              </div>
            </div>
          </div>

          {/* 4. Line Chart Showing Risk Progression (180-Day Decay Curve) */}
          <RiskProgressionChart
            timelineData={prediction.timelineData}
            roadName={prediction.roadName}
          />

          {/* Explainable AI (XAI) Section: Horizontal Contribution Chart (SHAP Attribution) */}
          <RiskExplanation
            title="Why is this road high risk?"
            roadName={prediction.roadName}
            factors={[
              {
                name: "Pothole density",
                contributionPercentage: prediction.currentHealthScore < 40 ? 38 : 28,
                metricValue: prediction.riskDrivers[0]?.metricValue || "6.4 voids / 100m",
                color: "#f43f5e",
                description:
                  "Surface cavity punch-throughs expose untreated aggregate layers to dynamic hydraulic impact.",
              },
              {
                name: "Rainfall",
                contributionPercentage: 24,
                metricValue: "42mm (3 freeze cycles)",
                color: "#f59e0b",
                description:
                  "Precipitation penetrates unsealed transverse seams, expanding 9% during overnight freezes.",
              },
              {
                name: "Traffic exposure",
                contributionPercentage: prediction.currentHealthScore < 40 ? 20 : 22,
                metricValue: prediction.trafficAadt,
                color: "#38bdf8",
                description:
                  "Heavy freight truck axle repetitions compound shear stress along wheel track lines.",
              },
              {
                name: "Road age",
                contributionPercentage: 14,
                metricValue: "8.4 years since mill",
                color: "#a855f7",
                description:
                  "Thermal UV oxidation has oxidized bitumen binder, reducing aggregate flexibility.",
              },
              {
                name: "Previous road condition",
                contributionPercentage: prediction.currentHealthScore < 40 ? 4 : 12,
                metricValue: "Fatigue & ravelling history",
                color: "#10b981",
                description:
                  "Prior season micro-fissures created established sub-surface moisture migration routes.",
              },
            ]}
          />

          {/* 5. Risk Drivers: Pothole density, road age, traffic exposure, rainfall, previous condition */}
          <RiskDriversList drivers={prediction.riskDrivers} />

          {/* 6 & 7. Explanation ("Why is this road expected to deteriorate?") & Recommendation */}
          <PredictionExplanationCard
            explanation={prediction.deteriorationExplanation}
            recommendation={prediction.recommendation}
            disclaimer={prediction.modelMetadata.disclaimer}
          />
        </>
      )}
    </div>
  );
}
