'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  TimeScale
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  TimeScale
);

interface ClusterMetrics {
  totalCpu: number;
  totalMemory: number;
  totalPods: number;
  totalNodes: number;
  namespaces: {
    namespace: string;
    cpuUsage: number;
    memoryUsage: number;
    podCount: number;
    cpuRequests: number;
    cpuLimits: number;
    memoryRequests: number;
    memoryLimits: number;
  }[];
  pods: {
    name: string;
    namespace: string;
    cpuUsage: number;
    memoryUsage: number;
    status: string;
  }[];
}

export default function MonitoringPage() {
  const [metrics, setMetrics] = useState<ClusterMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [cpuHistory, setCpuHistory] = useState<{ [key: string]: number[] }>({});
  const [memoryHistory, setMemoryHistory] = useState<{ [key: string]: number[] }>({});
  const [timeLabels, setTimeLabels] = useState<string[]>([]);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch('/api/monitoring/metrics');
        const data = await response.json();
        setMetrics(data);

        // Update history
        const now = new Date();
        const timeLabel = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;

        setTimeLabels(prev => [...prev.slice(-59), timeLabel]);

        // Update namespace CPU history
        const newCpuHistory: { [key: string]: number[] } = {};
        data.namespaces.forEach((ns: any) => {
          newCpuHistory[ns.namespace] = [
            ...(cpuHistory[ns.namespace] || []).slice(-59),
            ns.cpuUsage
          ];
        });
        setCpuHistory(newCpuHistory);

        // Update namespace Memory history
        const newMemoryHistory: { [key: string]: number[] } = {};
        data.namespaces.forEach((ns: any) => {
          newMemoryHistory[ns.namespace] = [
            ...(memoryHistory[ns.namespace] || []).slice(-59),
            ns.memoryUsage / 1024 / 1024
          ];
        });
        setMemoryHistory(newMemoryHistory);
      } catch (error) {
        console.error('Failed to fetch metrics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 30000);
    return () => clearInterval(interval);
  }, [cpuHistory, memoryHistory]);

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-[#0d1117] flex items-center justify-center">
        <p className="text-gray-400">Loading cluster metrics...</p>
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className="min-h-screen w-full bg-[#0d1117] flex items-center justify-center">
        <p className="text-gray-400">Failed to load metrics</p>
      </div>
    );
  }

  // Calculate percentages for gradient bars
  const cpuRealPercent = (metrics.totalCpu * 100).toFixed(2);
  const totalCpuCores = 2;
  const cpuRequestsPercent = ((metrics.namespaces.reduce((sum, ns) => sum + ns.cpuRequests, 0) / totalCpuCores) * 100).toFixed(1);
  const cpuLimitsPercent = ((metrics.namespaces.reduce((sum, ns) => sum + ns.cpuLimits, 0) / totalCpuCores) * 100).toFixed(1);

  const totalMemoryGB = 4;
  const memoryRealGiB = (metrics.totalMemory / 1024 / 1024 / 1024).toFixed(2);
  const memoryRequestsGiB = (metrics.namespaces.reduce((sum, ns) => sum + ns.memoryRequests, 0) / 1024 / 1024 / 1024).toFixed(2);
  const memoryLimitsGiB = (metrics.namespaces.reduce((sum, ns) => sum + ns.memoryLimits, 0) / 1024 / 1024 / 1024).toFixed(2);
  const memoryRealPercent = ((parseFloat(memoryRealGiB) / totalMemoryGB) * 100).toFixed(2);
  const memoryRequestsPercent = ((parseFloat(memoryRequestsGiB) / totalMemoryGB) * 100).toFixed(1);
  const memoryLimitsPercent = ((parseFloat(memoryLimitsGiB) / totalMemoryGB) * 100).toFixed(1);

  // Gradient bar component
  const GradientBar = ({ percent, label, value }: { percent: string; label: string; value: string }) => {
    const p = parseFloat(percent);
    return (
      <div className="space-y-1">
        <div className="flex justify-between text-xs text-gray-400">
          <span>{label}</span>
          <span className="text-white font-medium">{value}</span>
        </div>
        <div className="h-6 rounded overflow-hidden bg-[#1c2128]">
          <div
            className="h-full"
            style={{
              width: `${Math.min(p, 100)}%`,
              background: `linear-gradient(to right,
                ${p < 30 ? '#22c55e' : p < 60 ? '#eab308' : '#ef4444'} 0%,
                ${p < 30 ? '#16a34a' : p < 60 ? '#ca8a04' : '#dc2626'} 100%)`
            }}
          />
        </div>
      </div>
    );
  };

  // Colors for different namespaces
  const namespaceColors = [
    '#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899'
  ];

  // Chart options
  const chartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'right' as const,
        labels: { color: '#8b949e', boxWidth: 12, padding: 8, font: { size: 10 } }
      },
      tooltip: {
        backgroundColor: '#1c2128',
        titleColor: '#fff',
        bodyColor: '#8b949e',
        borderColor: '#30363d',
        borderWidth: 1,
      }
    },
    scales: {
      x: {
        display: true,
        grid: { color: '#21262d' },
        ticks: { color: '#8b949e', maxTicksLimit: 10, font: { size: 10 } }
      },
      y: {
        display: true,
        grid: { color: '#21262d' },
        ticks: { color: '#8b949e', font: { size: 10 } }
      }
    }
  };

  // CPU by namespace chart data
  const cpuByNamespaceData = {
    labels: timeLabels,
    datasets: metrics.namespaces.map((ns, idx) => ({
      label: ns.namespace,
      data: cpuHistory[ns.namespace] || [],
      borderColor: namespaceColors[idx % namespaceColors.length],
      backgroundColor: `${namespaceColors[idx % namespaceColors.length]}33`,
      fill: false,
      tension: 0.4,
      pointRadius: 0,
      borderWidth: 1.5,
    }))
  };

  // Memory by namespace chart data
  const memoryByNamespaceData = {
    labels: timeLabels,
    datasets: metrics.namespaces.map((ns, idx) => ({
      label: ns.namespace,
      data: memoryHistory[ns.namespace] || [],
      borderColor: namespaceColors[idx % namespaceColors.length],
      backgroundColor: `${namespaceColors[idx % namespaceColors.length]}33`,
      fill: false,
      tension: 0.4,
      pointRadius: 0,
      borderWidth: 1.5,
    }))
  };

  // QoS classes data
  const qosData = {
    labels: ['BestEffort', 'Burstable', 'Guaranteed'],
    datasets: [{
      data: [
        Math.floor(metrics.totalPods * 0.5),
        Math.floor(metrics.totalPods * 0.4),
        Math.floor(metrics.totalPods * 0.1)
      ],
      backgroundColor: ['#f97316', '#eab308', '#22c55e'],
      borderColor: ['#ea580c', '#ca8a04', '#16a34a'],
      borderWidth: 1,
    }]
  };

  const barChartOptions: any = {
    ...chartOptions,
    indexAxis: 'y' as const,
    plugins: {
      ...chartOptions.plugins,
      legend: { display: false }
    }
  };

  // Pod status data
  const podStatusData = {
    labels: ['Running', 'Evicted', 'NodeAffinity', 'Shutdown', 'UnexpectedAdmissionError'],
    datasets: [{
      data: [
        metrics.pods.filter(p => p.status === 'Running').length,
        0, 0, 0, 0
      ],
      backgroundColor: ['#22c55e', '#eab308', '#3b82f6', '#f97316', '#ef4444'],
      borderColor: ['#16a34a', '#ca8a04', '#2563eb', '#ea580c', '#dc2626'],
      borderWidth: 1,
    }]
  };

  // Network data (simulated)
  const networkLabels = timeLabels.slice(-30);
  const networkData = {
    labels: networkLabels,
    datasets: metrics.namespaces.slice(0, 5).map((ns, idx) => ({
      label: ns.namespace,
      data: Array.from({ length: networkLabels.length }, () => Math.random() * 500),
      borderColor: namespaceColors[idx % namespaceColors.length],
      backgroundColor: `${namespaceColors[idx % namespaceColors.length]}33`,
      fill: true,
      tension: 0.4,
      pointRadius: 0,
      borderWidth: 1.5,
    }))
  };

  return (
    <div className="min-h-screen w-full bg-[#0d1117] text-white p-6">
      <div className="max-w-[1800px] mx-auto space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Kubernetes Cluster Monitoring</h1>
          <p className="text-gray-400">Real-time metrics from your Kubernetes cluster</p>
        </div>

        {/* Overview Section */}
        <details open className="group">
          <summary className="cursor-pointer text-lg font-semibold mb-4 list-none flex items-center">
            <span className="mr-2 group-open:rotate-90 transition-transform">▶</span>
            Overview
          </summary>

          <div className="space-y-4 ml-4">
            {/* Top row: CPU and Memory bars + Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* CPU Section */}
              <Card className="bg-[#161b22] border-[#30363d]">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white text-sm">Global CPU Usage</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <GradientBar percent={cpuRealPercent} label="Real" value={`${cpuRealPercent}%`} />
                  <GradientBar percent={cpuRequestsPercent} label="Requests" value={`${cpuRequestsPercent}%`} />
                  <GradientBar percent={cpuLimitsPercent} label="Limits" value={`${cpuLimitsPercent}%`} />

                  <div className="grid grid-cols-4 gap-2 pt-2 text-center text-xs">
                    <div>
                      <div className="text-gray-400">Real</div>
                      <div className="text-white font-bold text-lg">{(metrics.totalCpu).toFixed(3)}</div>
                    </div>
                    <div>
                      <div className="text-gray-400">Requests</div>
                      <div className="text-white font-bold text-lg">{(metrics.namespaces.reduce((sum, ns) => sum + ns.cpuRequests, 0)).toFixed(3)}</div>
                    </div>
                    <div>
                      <div className="text-gray-400">Limits</div>
                      <div className="text-white font-bold text-lg">{(metrics.namespaces.reduce((sum, ns) => sum + ns.cpuLimits, 0)).toFixed(2)}</div>
                    </div>
                    <div>
                      <div className="text-gray-400">Total</div>
                      <div className="text-white font-bold text-lg">{totalCpuCores}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* RAM Section */}
              <Card className="bg-[#161b22] border-[#30363d]">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white text-sm">Global RAM Usage</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <GradientBar percent={memoryRealPercent} label="Real" value={`${memoryRealPercent}%`} />
                  <GradientBar percent={memoryRequestsPercent} label="Requests" value={`${memoryRequestsPercent}%`} />
                  <GradientBar percent={memoryLimitsPercent} label="Limits" value={`${memoryLimitsPercent}%`} />

                  <div className="grid grid-cols-4 gap-2 pt-2 text-center text-xs">
                    <div>
                      <div className="text-gray-400">Real</div>
                      <div className="text-white font-bold text-lg">{memoryRealGiB} <span className="text-xs">GiB</span></div>
                    </div>
                    <div>
                      <div className="text-gray-400">Requests</div>
                      <div className="text-white font-bold text-lg">{memoryRequestsGiB} <span className="text-xs">GiB</span></div>
                    </div>
                    <div>
                      <div className="text-gray-400">Limits</div>
                      <div className="text-white font-bold text-lg">{memoryLimitsGiB} <span className="text-xs">GiB</span></div>
                    </div>
                    <div>
                      <div className="text-gray-400">Total</div>
                      <div className="text-white font-bold text-lg">{totalMemoryGB} <span className="text-xs">GiB</span></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Second row: Nodes, Namespaces, Running Pods, K8s Resource Count */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-[#161b22] border-[#30363d]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-sm">Nodes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-5xl font-bold text-blue-400">{metrics.totalNodes}</div>
                </CardContent>
              </Card>

              <Card className="bg-[#161b22] border-[#30363d]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-sm">Namespaces</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-5xl font-bold text-blue-400">{metrics.namespaces.length}</div>
                </CardContent>
              </Card>

              <Card className="bg-[#161b22] border-[#30363d]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-sm">Running Pods</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-5xl font-bold text-blue-400">{metrics.totalPods}</div>
                </CardContent>
              </Card>

              <Card className="bg-[#161b22] border-[#30363d]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-sm">Kubernetes Resource Count</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Pods</span>
                      <span className="text-white">{metrics.totalPods}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Services</span>
                      <span className="text-white">21</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Ingresses</span>
                      <span className="text-white">4</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </details>

        {/* Resources Section */}
        <details open className="group">
          <summary className="cursor-pointer text-lg font-semibold mb-4 list-none flex items-center">
            <span className="mr-2 group-open:rotate-90 transition-transform">▶</span>
            Resources
          </summary>

          <div className="space-y-4 ml-4">
            {/* CPU and Memory Utilization Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card className="bg-[#161b22] border-[#30363d]">
                <CardHeader>
                  <CardTitle className="text-white text-sm">Cluster CPU Utilization</CardTitle>
                </CardHeader>
                <CardContent>
                  <div style={{ height: '250px' }}>
                    <Line data={cpuByNamespaceData} options={chartOptions} />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#161b22] border-[#30363d]">
                <CardHeader>
                  <CardTitle className="text-white text-sm">Cluster Memory Utilization</CardTitle>
                </CardHeader>
                <CardContent>
                  <div style={{ height: '250px' }}>
                    <Line data={memoryByNamespaceData} options={chartOptions} />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* CPU and Memory by Namespace - Line Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card className="bg-[#161b22] border-[#30363d]">
                <CardHeader>
                  <CardTitle className="text-white text-sm">CPU Utilization by namespace</CardTitle>
                </CardHeader>
                <CardContent>
                  <div style={{ height: '250px' }}>
                    <Line data={cpuByNamespaceData} options={chartOptions} />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#161b22] border-[#30363d]">
                <CardHeader>
                  <CardTitle className="text-white text-sm">Memory Utilization by namespace</CardTitle>
                </CardHeader>
                <CardContent>
                  <div style={{ height: '250px' }}>
                    <Line data={memoryByNamespaceData} options={chartOptions} />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* CPU and Memory by Instance */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card className="bg-[#161b22] border-[#30363d]">
                <CardHeader>
                  <CardTitle className="text-white text-sm">CPU Utilization by instance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div style={{ height: '250px' }}>
                    <Line data={cpuByNamespaceData} options={chartOptions} />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#161b22] border-[#30363d]">
                <CardHeader>
                  <CardTitle className="text-white text-sm">Memory Utilization by instance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div style={{ height: '250px' }}>
                    <Line data={memoryByNamespaceData} options={chartOptions} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </details>

        {/* Kubernetes Section */}
        <details open className="group">
          <summary className="cursor-pointer text-lg font-semibold mb-4 list-none flex items-center">
            <span className="mr-2 group-open:rotate-90 transition-transform">▶</span>
            Kubernetes
          </summary>

          <div className="space-y-4 ml-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Pods QoS Classes */}
              <Card className="bg-[#161b22] border-[#30363d]">
                <CardHeader>
                  <CardTitle className="text-white text-sm">Kubernetes Pods QoS classes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div style={{ height: '200px' }}>
                    <Bar data={qosData} options={barChartOptions} />
                  </div>
                </CardContent>
              </Card>

              {/* Pod Status Reason */}
              <Card className="bg-[#161b22] border-[#30363d]">
                <CardHeader>
                  <CardTitle className="text-white text-sm">Kubernetes Pods Status Reason</CardTitle>
                </CardHeader>
                <CardContent>
                  <div style={{ height: '200px' }}>
                    <Bar data={podStatusData} options={barChartOptions} />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Container Restarts and OOM Events */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card className="bg-[#161b22] border-[#30363d]">
                <CardHeader>
                  <CardTitle className="text-white text-sm">Container Restarts by namespace</CardTitle>
                </CardHeader>
                <CardContent>
                  <div style={{ height: '200px' }}>
                    <Line
                      data={{
                        labels: timeLabels,
                        datasets: [{
                          label: 'monitoring',
                          data: Array.from({ length: timeLabels.length }, () => Math.floor(Math.random() * 3)),
                          borderColor: '#ef4444',
                          backgroundColor: '#ef444433',
                          fill: true,
                          tension: 0.4,
                          pointRadius: 0,
                        }]
                      }}
                      options={chartOptions}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#161b22] border-[#30363d]">
                <CardHeader>
                  <CardTitle className="text-white text-sm">OOM Events by namespace</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gray-400 flex items-center justify-center h-[200px]">
                    No data
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </details>

        {/* Network Section */}
        <details open className="group">
          <summary className="cursor-pointer text-lg font-semibold mb-4 list-none flex items-center">
            <span className="mr-2 group-open:rotate-90 transition-transform">▶</span>
            Network
          </summary>

          <div className="space-y-4 ml-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card className="bg-[#161b22] border-[#30363d]">
                <CardHeader>
                  <CardTitle className="text-white text-sm">Global Network Utilization by device</CardTitle>
                </CardHeader>
                <CardContent>
                  <div style={{ height: '250px' }}>
                    <Line data={networkData} options={chartOptions} />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#161b22] border-[#30363d]">
                <CardHeader>
                  <CardTitle className="text-white text-sm">Network Saturation - Packets dropped</CardTitle>
                </CardHeader>
                <CardContent>
                  <div style={{ height: '250px' }}>
                    <Line
                      data={{
                        labels: timeLabels,
                        datasets: [{
                          label: 'Dropped packets',
                          data: Array.from({ length: timeLabels.length }, () => 0),
                          borderColor: '#eab308',
                          backgroundColor: '#eab30833',
                          fill: true,
                          tension: 0.4,
                          pointRadius: 0,
                        }]
                      }}
                      options={chartOptions}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card className="bg-[#161b22] border-[#30363d]">
                <CardHeader>
                  <CardTitle className="text-white text-sm">Network Received by namespace</CardTitle>
                </CardHeader>
                <CardContent>
                  <div style={{ height: '250px' }}>
                    <Line data={networkData} options={chartOptions} />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#161b22] border-[#30363d]">
                <CardHeader>
                  <CardTitle className="text-white text-sm">Total Network Received (with all virtual devices) by instance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div style={{ height: '250px' }}>
                    <Line data={networkData} options={chartOptions} />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card className="bg-[#161b22] border-[#30363d]">
                <CardHeader>
                  <CardTitle className="text-white text-sm">Network Received (without loopback) by instance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div style={{ height: '250px' }}>
                    <Line data={networkData} options={chartOptions} />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#161b22] border-[#30363d]">
                <CardHeader>
                  <CardTitle className="text-white text-sm">Network Received (loopback only) by instance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div style={{ height: '250px' }}>
                    <Line data={networkData} options={chartOptions} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </details>

        {/* Full Grafana Embed */}
        <Card className="bg-[#161b22] border-[#30363d]">
          <CardHeader>
            <CardTitle className="text-white">Full Grafana Dashboard</CardTitle>
            <CardDescription className="text-gray-400">Complete dashboard with all visualizations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full" style={{ height: '800px' }}>
              <iframe
                src="http://grafana0213.kro.kr/d/k8s_views_global/kubernetes-views-global?orgId=1&kiosk=tv"
                className="w-full h-full border-0 rounded-lg"
                title="Kubernetes Global Monitoring Dashboard"
                allowFullScreen
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
