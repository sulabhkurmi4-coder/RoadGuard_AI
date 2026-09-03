"use client";

import React, { useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import NetworkStats from "@/components/dashboard/NetworkStats";
import RoadHealthOverview from "@/components/dashboard/RoadHealthOverview";
import RoadHealthChart from "@/components/dashboard/charts/RoadHealthChart";
import RiskTrendChart from "@/components/dashboard/charts/RiskTrendChart";
import MaintenancePriorityChart from "@/components/dashboard/charts/MaintenancePriorityChart";
import MaintenancePrioritySection from "@/components/dashboard/MaintenancePrioritySection";
import RecentInspectionsList from "@/components/dashboard/RecentInspectionsList";
import HighRiskSegmentsTable from "@/components/dashboard/HighRiskSegmentsTable";
import AiInsightsPanel from "@/components/dashboard/AiInsightsPanel";
import { fullDemoDashboardData } from "@/lib/dashboard-demo-data";

export default function DashboardPage() {
  const [district, setDistrict] = useState("District 4 (State Highway Grid)");
  // Structured data state (ready to connect to useEffect + fetch('/api/dashboard') later)
  const [data, setData] = useState(fullDemoDashboardData);

  const handleRefresh = () => {
    // Simulated live refresh
    setData({ ...fullDemoDashboardData });
  };

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Header: "Infrastructure Command Center" + Disclaimer & Filter Controls */}
      <DashboardHeader
        selectedDistrict={district}
        onSelectDistrict={setDistrict}
        onRefresh={handleRefresh}
      />

      {/* 2. Network Statistics: Total Road Network, Roads Inspected, Critical Roads, High Risk Roads */}
      <NetworkStats stats={data.networkStats} />

      {/* 3. Road Health Overview & Recharts Road Health Distribution Chart */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Road Health Breakdown Cards (7 cols) */}
        <div className="xl:col-span-7">
          <RoadHealthOverview healthData={data.healthOverview} />
        </div>

        {/* Recharts Road Health Distribution Donut (5 cols) */}
        <div className="xl:col-span-5">
          <RoadHealthChart data={data.roadHealthChart} />
        </div>
      </div>

      {/* 4. Recharts Predictive Analytics: Risk Trend & Maintenance Priority Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Risk Trend Chart (Area Chart) */}
        <RiskTrendChart data={data.riskTrendChart} />

        {/* Maintenance Priority Chart (Bar Chart) */}
        <MaintenancePriorityChart data={data.maintenancePriorityChart} />
      </div>

      {/* 5. AI Insights Panel (Placed prominently for civil decision makers) */}
      <AiInsightsPanel insights={data.aiInsights} />

      {/* 6. Maintenance Priority Section (P1 Urgent, P2 High, P3 Medium Action Triage) */}
      <MaintenancePrioritySection priorities={data.maintenancePriorities} />

      {/* 7. High Risk Road Segments Table */}
      <HighRiskSegmentsTable segments={data.highRiskSegments} />

      {/* 8. Recent AI Inspections Feed */}
      <RecentInspectionsList inspections={data.recentInspections} />
    </div>
  );
}
