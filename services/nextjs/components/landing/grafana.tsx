"use client";

import { useState, useRef } from "react";
import { useTheme } from "next-themes";
import SectionHeader from "@/components/landing/section-header";
import { Button } from "@/components/ui/button";

type Section = "overview" | "resources" | "kubernetes" | "network";

const sections: { id: Section; label: string; panels: number }[] = [
  { id: "overview", label: "Overview", panels: 8 },
  { id: "resources", label: "Resources", panels: 8 },
  { id: "kubernetes", label: "Kubernetes", panels: 4 },
  { id: "network", label: "Network", panels: 6 },
];

export default function GrafanaPage() {
  const [activeSection, setActiveSection] = useState<Section>("overview");
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLDivElement>(null);


  // Grafana iframe URL 생성 함수
  const getGrafanaUrl = (panelId: number, themeType: "dark" | "light") => {
    const baseUrl = "https://grafana0213.kro.kr/d-solo/k8s_views_global/kubernetes-views-global";
    return `${baseUrl}?orgId=1&refresh=30s&theme=${themeType}&panelId=${panelId}`;
  };

  // iframe 래퍼 컴포넌트
  const GrafanaPanel = ({ panelId }: { panelId: number }) => {
    const [loaded, setLoaded] = useState(false);

    // Grafana 섹션이 화면에 보이지 않으면 로딩하지 않음
    // if (!isVisible) {
    //   return (
    //     <div className="relative w-full h-full">
    //       <LoadingSkeleton />
    //     </div>
    //   );
    // }

    return (
      <div className="relative w-full h-full">
        {/* {(!loaded || isLoading) && <LoadingSkeleton />} */}
        {theme === "dark" ? (
          <iframe
            key={`${panelId}-dark-${theme}`}
            src={getGrafanaUrl(panelId, "dark")}
            className="w-full h-full"
            style={{ display: loaded ? 'block' : 'none' }}
            onLoad={() => setLoaded(true)}
          />
        ) : (
          <iframe
            key={`${panelId}-light-${theme}`}
            src={getGrafanaUrl(panelId, "light")}
            className="w-full h-full"
            style={{ display: loaded ? 'block' : 'none' }}
            onLoad={() => setLoaded(true)}
          />
        )}
      </div>
    );
  };

  return (
    <main className="page-container" ref={sectionRef}>
      <SectionHeader
        title="Monitoring"
        description="Real-time Kubernetes cluster monitoring with Grafana dashboards"
      />

      {/* 섹션 선택 버튼 */}
      <div className="flex gap-2 flex-wrap justify-center mb-4">
        {sections.map((section) => (
          <Button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            variant={activeSection === section.id ? "default" : "outline"}
            className="transition-all text-xs sm:text-sm"
          >
            {section.label}
            <span className="ml-1 sm:ml-2 text-xs opacity-60">
              ({section.panels})
            </span>
          </Button>
        ))}
      </div>

      {/* Overview 섹션 */}
      {activeSection === "overview" && (
        <div className="flex flex-col lg:flex-row gap-2 justify-center w-full h-full">
          {/* 왼쪽 2개 열 (CPU, RAM) */}
          <div className="flex flex-col sm:flex-row gap-2 w-full lg:flex-1">
            {/* Global CPU Usage 열 */}
            <div className="flex flex-col gap-2 w-full sm:flex-1">
              {/* Global CPU Usage (id:77) - w:6, h:8 */}
              <div className="w-full aspect-5/4 theme-background rounded-lg overflow-hidden">
                <GrafanaPanel panelId={77} />
              </div>
              {/* CPU Usage (id:37) - w:6, h:4 */}
              <div className="w-full aspect-5/2 theme-background rounded-lg overflow-hidden">
                <GrafanaPanel panelId={37} />
              </div>
            </div>

            {/* Global RAM Usage 열 */}
            <div className="flex flex-col gap-2 w-full sm:flex-1">
              {/* Global RAM Usage (id:78) - w:6, h:8 */}
              <div className="w-full aspect-5/4 theme-background rounded-lg overflow-hidden">
                <GrafanaPanel panelId={78} />
              </div>
              {/* RAM Usage (id:39) - w:6, h:4 */}
              <div className="w-full aspect-5/2 theme-background rounded-lg overflow-hidden">
                <GrafanaPanel panelId={39} />
              </div>
            </div>
          </div>

          {/* 오른쪽 넓은 열 (Kubernetes Resource Count) */}
          {/* Kubernetes Resource Count (id:52) - w:10, h:12 */}
          <div className="w-full lg:flex-1 lg:max-w-[40%] theme-background rounded-lg overflow-hidden flex items-stretch">
            <GrafanaPanel panelId={52} />
          </div>
        </div>
      )}

      {/* Resources 섹션 */}
      {activeSection === "resources" && (
        <div className="flex flex-col gap-2 w-full">
          {/* Row 1 */}
          <div className="flex flex-col lg:flex-row gap-2 justify-center w-full">
            {/* Cluster CPU Utilization (id:72) - w:12, h:8 */}
            <div className="w-full lg:flex-1 aspect-video theme-background rounded-lg overflow-hidden">
              <GrafanaPanel panelId={72} />
            </div>
            {/* Cluster Memory Utilization (id:55) - w:12, h:8 */}
            <div className="w-full lg:flex-1 aspect-video theme-background rounded-lg overflow-hidden">
              <GrafanaPanel panelId={55} />
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex flex-col lg:flex-row gap-2 justify-center w-full">
            {/* CPU Utilization by namespace (id:46) - w:12, h:8 */}
            <div className="w-full lg:flex-1 aspect-video theme-background rounded-lg overflow-hidden">
              <GrafanaPanel panelId={46} />
            </div>
            {/* Memory Utilization by namespace (id:50) - w:12, h:8 */}
            <div className="w-full lg:flex-1 aspect-video theme-background rounded-lg overflow-hidden">
              <GrafanaPanel panelId={50} />
            </div>
          </div>

          {/* Row 3 */}
          <div className="flex flex-col lg:flex-row gap-2 justify-center w-full">
            {/* CPU Utilization by instance (id:54) - w:12, h:8 */}
            <div className="w-full lg:flex-1 aspect-video theme-background rounded-lg overflow-hidden">
              <GrafanaPanel panelId={54} />
            </div>
            {/* Memory Utilization by instance (id:73) - w:12, h:8 */}
            <div className="w-full lg:flex-1 aspect-video theme-background rounded-lg overflow-hidden">
              <GrafanaPanel panelId={73} />
            </div>
          </div>

          {/* Row 4 */}
          <div className="flex flex-col lg:flex-row gap-2 justify-center w-full">
            {/* CPU Throttled seconds by namespace (id:82) - w:12, h:8 */}
            <div className="w-full lg:flex-1 aspect-video theme-background rounded-lg overflow-hidden">
              <GrafanaPanel panelId={82} />
            </div>
            {/* CPU Core Throttled by instance (id:83) - w:12, h:8 */}
            <div className="w-full lg:flex-1 aspect-video theme-background rounded-lg overflow-hidden">
              <GrafanaPanel panelId={83} />
            </div>
          </div>
        </div>
      )}

      {/* Kubernetes 섹션 */}
      {activeSection === "kubernetes" && (
        <div className="flex flex-col gap-2 w-full">
          {/* Row 1 */}
          <div className="flex flex-col lg:flex-row gap-2 justify-center w-full">
            {/* Kubernetes Pods QoS classes (id:84) - w:12, h:9 */}
            <div className="w-full lg:flex-1 aspect-video theme-background rounded-lg overflow-hidden">
              <GrafanaPanel panelId={84} />
            </div>
            {/* Kubernetes Pods Status Reason (id:85) - w:12, h:9 */}
            <div className="w-full lg:flex-1 aspect-video theme-background rounded-lg overflow-hidden">
              <GrafanaPanel panelId={85} />
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex flex-col lg:flex-row gap-2 justify-center w-full">
            {/* OOM Events by namespace (id:87) - w:12, h:9 */}
            <div className="w-full lg:flex-1 aspect-video theme-background rounded-lg overflow-hidden">
              <GrafanaPanel panelId={87} />
            </div>
            {/* Container Restarts by namespace (id:88) - w:12, h:9 */}
            <div className="w-full lg:flex-1 aspect-video theme-background rounded-lg overflow-hidden">
              <GrafanaPanel panelId={88} />
            </div>
          </div>
        </div>
      )}

      {/* Network 섹션 */}
      {activeSection === "network" && (
        <div className="flex flex-col gap-2 w-full">
          {/* Row 1 */}
          <div className="flex flex-col lg:flex-row gap-2 justify-center w-full">
            {/* Global Network Utilization by device (id:44) - w:12, h:8 */}
            <div className="w-full lg:flex-1 aspect-video theme-background rounded-lg overflow-hidden">
              <GrafanaPanel panelId={44} />
            </div>
            {/* Network Saturation - Packets dropped (id:53) - w:12, h:8 */}
            <div className="w-full lg:flex-1 aspect-video theme-background rounded-lg overflow-hidden">
              <GrafanaPanel panelId={53} />
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex flex-col lg:flex-row gap-2 justify-center w-full">
            {/* Network Received by namespace (id:79) - w:12, h:8 */}
            <div className="w-full lg:flex-1 aspect-video theme-background rounded-lg overflow-hidden">
              <GrafanaPanel panelId={79} />
            </div>
            {/* Total Network Received by instance (id:80) - w:12, h:8 */}
            <div className="w-full lg:flex-1 aspect-video theme-background rounded-lg overflow-hidden">
              <GrafanaPanel panelId={80} />
            </div>
          </div>

          {/* Row 3 */}
          <div className="flex flex-col lg:flex-row gap-2 justify-center w-full">
            {/* Network Received (without loopback) by instance (id:56) - w:12, h:8 */}
            <div className="w-full lg:flex-1 aspect-video theme-background rounded-lg overflow-hidden">
              <GrafanaPanel panelId={56} />
            </div>
            {/* Network Received (loopback only) by instance (id:81) - w:12, h:8 */}
            <div className="w-full lg:flex-1 aspect-video theme-background rounded-lg overflow-hidden">
              <GrafanaPanel panelId={81} />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
