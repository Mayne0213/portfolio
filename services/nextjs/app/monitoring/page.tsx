"use client";

import { useState } from "react";
import SectionHeader from "@/components/landing/section-header";
import { Button } from "@/components/ui/button";

type Section = "overview" | "resources" | "kubernetes" | "network";

const sections: { id: Section; label: string; panels: number }[] = [
  { id: "overview", label: "Overview", panels: 8 },
  { id: "resources", label: "Resources", panels: 8 },
  { id: "kubernetes", label: "Kubernetes", panels: 4 },
  { id: "network", label: "Network", panels: 6 },
];

export default function MonitoringPage() {
  const [activeSection, setActiveSection] = useState<Section>("overview");

  return (
    <main className="page-container">
      <SectionHeader
        title="Monitoring"
        description="Real-time Kubernetes cluster monitoring with Grafana dashboards"
      />

      {/* 섹션 선택 버튼 */}
      <div className="flex gap-2 flex-wrap justify-center">
        {sections.map((section) => (
          <Button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            variant={activeSection === section.id ? "default" : "outline"}
            className="transition-all"
          >
            {section.label}
            <span className="ml-2 text-sm opacity-60">
              ({section.panels} panels)
            </span>
          </Button>
        ))}
      </div>

      {/* Overview 섹션 */}
      {activeSection === "overview" && (
        <div className="flex gap-2 flex-wrap justify-center">
          {/* 왼쪽 2개 열 (CPU, RAM) */}
          <div className="flex gap-2">
            {/* Global CPU Usage 열 */}
            <div className="flex flex-col gap-2">
              {/* Global CPU Usage (id:77) - w:6, h:8 */}
              <div className="w-[400px] h-[320px] theme-background rounded-lg overflow-hidden">
                {/* iframe: panelId=77 */}
              </div>
              {/* CPU Usage (id:37) - w:6, h:4 */}
              <div className="w-[400px] h-[160px] theme-background rounded-lg overflow-hidden">
                {/* iframe: panelId=37 */}
              </div>
            </div>

            {/* Global RAM Usage 열 */}
            <div className="flex flex-col gap-2">
              {/* Global RAM Usage (id:78) - w:6, h:8 */}
              <div className="w-[400px] h-[320px] theme-background rounded-lg overflow-hidden">
                {/* iframe: panelId=78 */}
              </div>
              {/* RAM Usage (id:39) - w:6, h:4 */}
              <div className="w-[400px] h-[160px] theme-background rounded-lg overflow-hidden">
                {/* iframe: panelId=39 */}
              </div>
            </div>
          </div>

          {/* 가운데 좁은 열 (Nodes, Namespace, Running Pods) - w:2 */}
          <div className="flex flex-col gap-2">
            {/* Nodes (id:63) - w:2, h:4 */}
            <div className="w-[133px] h-[160px] theme-background rounded-lg overflow-hidden">
              {/* iframe: panelId=63 */}
            </div>
            {/* Namespaces (id:59) - w:2, h:4 */}
            <div className="w-[133px] h-[160px] theme-background rounded-lg overflow-hidden">
              {/* iframe: panelId=59 */}
            </div>
            {/* Running Pods (id:62) - w:2, h:4 */}
            <div className="w-[133px] h-[160px] theme-background rounded-lg overflow-hidden">
              {/* iframe: panelId=62 */}
            </div>
          </div>

          {/* 오른쪽 넓은 열 (Kubernetes Resource Count) */}
          {/* Kubernetes Resource Count (id:52) - w:10, h:12 */}
          <div className="w-[667px] h-[488px] theme-background rounded-lg overflow-hidden">
            {/* iframe: panelId=52 */}
          </div>
        </div>
      )}

      {/* Resources 섹션 */}
      {activeSection === "resources" && (
        <div className="flex flex-col gap-2">
          {/* Row 1 */}
          <div className="flex gap-2 flex-wrap justify-center">
            {/* Cluster CPU Utilization (id:72) - w:12, h:8 */}
            <div className="w-[800px] h-[320px] theme-background rounded-lg overflow-hidden">
              {/* iframe: panelId=72 */}
            </div>
            {/* Cluster Memory Utilization (id:55) - w:12, h:8 */}
            <div className="w-[800px] h-[320px] theme-background rounded-lg overflow-hidden">
              {/* iframe: panelId=55 */}
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex gap-2 flex-wrap justify-center">
            {/* CPU Utilization by namespace (id:46) - w:12, h:8 */}
            <div className="w-[800px] h-[320px] theme-background rounded-lg overflow-hidden">
              {/* iframe: panelId=46 */}
            </div>
            {/* Memory Utilization by namespace (id:50) - w:12, h:8 */}
            <div className="w-[800px] h-[320px] theme-background rounded-lg overflow-hidden">
              {/* iframe: panelId=50 */}
            </div>
          </div>

          {/* Row 3 */}
          <div className="flex gap-2 flex-wrap justify-center">
            {/* CPU Utilization by instance (id:54) - w:12, h:8 */}
            <div className="w-[800px] h-[320px] theme-background rounded-lg overflow-hidden">
              {/* iframe: panelId=54 */}
            </div>
            {/* Memory Utilization by instance (id:73) - w:12, h:8 */}
            <div className="w-[800px] h-[320px] theme-background rounded-lg overflow-hidden">
              {/* iframe: panelId=73 */}
            </div>
          </div>

          {/* Row 4 */}
          <div className="flex gap-2 flex-wrap justify-center">
            {/* CPU Throttled seconds by namespace (id:82) - w:12, h:8 */}
            <div className="w-[800px] h-[320px] theme-background rounded-lg overflow-hidden">
              {/* iframe: panelId=82 */}
            </div>
            {/* CPU Core Throttled by instance (id:83) - w:12, h:8 */}
            <div className="w-[800px] h-[320px] theme-background rounded-lg overflow-hidden">
              {/* iframe: panelId=83 */}
            </div>
          </div>
        </div>
      )}

      {/* Kubernetes 섹션 */}
      {activeSection === "kubernetes" && (
        <div className="flex flex-col gap-2">
          {/* Row 1 */}
          <div className="flex gap-2 flex-wrap justify-center">
            {/* Kubernetes Pods QoS classes (id:84) - w:12, h:9 */}
            <div className="w-[800px] h-[360px] theme-background rounded-lg overflow-hidden">
              {/* iframe: panelId=84 */}
            </div>
            {/* Kubernetes Pods Status Reason (id:85) - w:12, h:9 */}
            <div className="w-[800px] h-[360px] theme-background rounded-lg overflow-hidden">
              {/* iframe: panelId=85 */}
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex gap-2 flex-wrap justify-center">
            {/* OOM Events by namespace (id:87) - w:12, h:9 */}
            <div className="w-[800px] h-[360px] theme-background rounded-lg overflow-hidden">
              {/* iframe: panelId=87 */}
            </div>
            {/* Container Restarts by namespace (id:88) - w:12, h:9 */}
            <div className="w-[800px] h-[360px] theme-background rounded-lg overflow-hidden">
              {/* iframe: panelId=88 */}
            </div>
          </div>
        </div>
      )}

      {/* Network 섹션 */}
      {activeSection === "network" && (
        <div className="flex flex-col gap-2">
          {/* Row 1 */}
          <div className="flex gap-2 flex-wrap justify-center">
            {/* Global Network Utilization by device (id:44) - w:12, h:8 */}
            <div className="w-[800px] h-[320px] theme-background rounded-lg overflow-hidden">
              {/* iframe: panelId=44 */}
            </div>
            {/* Network Saturation - Packets dropped (id:53) - w:12, h:8 */}
            <div className="w-[800px] h-[320px] theme-background rounded-lg overflow-hidden">
              {/* iframe: panelId=53 */}
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex gap-2 flex-wrap justify-center">
            {/* Network Received by namespace (id:79) - w:12, h:8 */}
            <div className="w-[800px] h-[320px] theme-background rounded-lg overflow-hidden">
              {/* iframe: panelId=79 */}
            </div>
            {/* Total Network Received by instance (id:80) - w:12, h:8 */}
            <div className="w-[800px] h-[320px] theme-background rounded-lg overflow-hidden">
              {/* iframe: panelId=80 */}
            </div>
          </div>

          {/* Row 3 */}
          <div className="flex gap-2 flex-wrap justify-center">
            {/* Network Received (without loopback) by instance (id:56) - w:12, h:8 */}
            <div className="w-[800px] h-[320px] theme-background rounded-lg overflow-hidden">
              {/* iframe: panelId=56 */}
            </div>
            {/* Network Received (loopback only) by instance (id:81) - w:12, h:8 */}
            <div className="w-[800px] h-[320px] theme-background rounded-lg overflow-hidden">
              {/* iframe: panelId=81 */}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
