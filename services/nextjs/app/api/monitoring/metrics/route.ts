import { NextResponse } from 'next/server';

const PROMETHEUS_URL = process.env.PROMETHEUS_URL || 'http://prometheus.monitoring.svc.cluster.local:9090';
const USE_MOCK_DATA = process.env.NODE_ENV === 'development' && !process.env.PROMETHEUS_URL;

interface PrometheusResult {
  metric: {
    [key: string]: string;
  };
  value: [number, string];
}

// Mock 데이터 - 전체 클러스터 메트릭
const MOCK_CLUSTER_METRICS = {
  totalCpu: 0.252,
  totalMemory: 1228 * 1024 * 1024, // 1.2 GB
  totalPods: 28,
  totalNodes: 1,
  namespaces: [
    {
      namespace: 'argocd',
      cpuUsage: 0.042,
      memoryUsage: 256 * 1024 * 1024,
      podCount: 5,
      cpuRequests: 0.25,
      cpuLimits: 0.5,
      memoryRequests: 256 * 1024 * 1024,
      memoryLimits: 512 * 1024 * 1024,
    },
    {
      namespace: 'jovies',
      cpuUsage: 0.018,
      memoryUsage: 128 * 1024 * 1024,
      podCount: 3,
      cpuRequests: 0.1,
      cpuLimits: 0.2,
      memoryRequests: 128 * 1024 * 1024,
      memoryLimits: 256 * 1024 * 1024,
    },
    {
      namespace: 'portfolio',
      cpuUsage: 0.015,
      memoryUsage: 96 * 1024 * 1024,
      podCount: 1,
      cpuRequests: 0.05,
      cpuLimits: 0.15,
      memoryRequests: 100 * 1024 * 1024,
      memoryLimits: 200 * 1024 * 1024,
    },
    {
      namespace: 'todo',
      cpuUsage: 0.021,
      memoryUsage: 112 * 1024 * 1024,
      podCount: 2,
      cpuRequests: 0.1,
      cpuLimits: 0.2,
      memoryRequests: 128 * 1024 * 1024,
      memoryLimits: 256 * 1024 * 1024,
    },
    {
      namespace: 'monitoring',
      cpuUsage: 0.089,
      memoryUsage: 384 * 1024 * 1024,
      podCount: 3,
      cpuRequests: 0.2,
      cpuLimits: 0.6,
      memoryRequests: 384 * 1024 * 1024,
      memoryLimits: 768 * 1024 * 1024,
    },
    {
      namespace: 'ingress-nginx',
      cpuUsage: 0.011,
      memoryUsage: 64 * 1024 * 1024,
      podCount: 1,
      cpuRequests: 0.1,
      cpuLimits: 0.2,
      memoryRequests: 90 * 1024 * 1024,
      memoryLimits: 180 * 1024 * 1024,
    },
    {
      namespace: 'kube-system',
      cpuUsage: 0.056,
      memoryUsage: 192 * 1024 * 1024,
      podCount: 13,
      cpuRequests: 0.25,
      cpuLimits: 0.5,
      memoryRequests: 256 * 1024 * 1024,
      memoryLimits: 512 * 1024 * 1024,
    },
  ],
  pods: [
    { name: 'argocd-server-7b9f8c8d4f-x7k2m', namespace: 'argocd', cpuUsage: 0.015, memoryUsage: 128 * 1024 * 1024, status: 'Running' },
    { name: 'argocd-repo-server-6d8f7b9c5d-p4n8k', namespace: 'argocd', cpuUsage: 0.012, memoryUsage: 96 * 1024 * 1024, status: 'Running' },
    { name: 'prometheus-server-7c8b9d5f4d-m9k7j', namespace: 'monitoring', cpuUsage: 0.045, memoryUsage: 256 * 1024 * 1024, status: 'Running' },
    { name: 'grafana-6f5d8b9c7a-h5m3n', namespace: 'monitoring', cpuUsage: 0.022, memoryUsage: 80 * 1024 * 1024, status: 'Running' },
    { name: 'jovies-app-5d7f9c8b4a-x2j9k', namespace: 'jovies', cpuUsage: 0.008, memoryUsage: 64 * 1024 * 1024, status: 'Running' },
    { name: 'portfolio-app-4c6d8b7a5f-p7k2m', namespace: 'portfolio', cpuUsage: 0.015, memoryUsage: 96 * 1024 * 1024, status: 'Running' },
    { name: 'todo-app-3b5c7d6a4e-m4j8n', namespace: 'todo', cpuUsage: 0.011, memoryUsage: 56 * 1024 * 1024, status: 'Running' },
    { name: 'ingress-nginx-controller-7f8d9c5b4a-x9k6m', namespace: 'ingress-nginx', cpuUsage: 0.011, memoryUsage: 64 * 1024 * 1024, status: 'Running' },
    { name: 'coredns-5d78c9db5f-j8k7m', namespace: 'kube-system', cpuUsage: 0.003, memoryUsage: 24 * 1024 * 1024, status: 'Running' },
    { name: 'metrics-server-6d94bc8694-p9k3n', namespace: 'kube-system', cpuUsage: 0.008, memoryUsage: 32 * 1024 * 1024, status: 'Running' },
  ],
};

export async function GET() {
  // 개발 환경이고 PROMETHEUS_URL이 없으면 Mock 데이터 반환
  if (USE_MOCK_DATA) {
    console.log('Using mock data for local development');
    // 약간의 랜덤성 추가 (실시간처럼 보이게)
    const randomizedMetrics = {
      ...MOCK_CLUSTER_METRICS,
      totalCpu: MOCK_CLUSTER_METRICS.totalCpu * (0.8 + Math.random() * 0.4),
      totalMemory: MOCK_CLUSTER_METRICS.totalMemory * (0.9 + Math.random() * 0.2),
      namespaces: MOCK_CLUSTER_METRICS.namespaces.map(ns => ({
        ...ns,
        cpuUsage: ns.cpuUsage * (0.8 + Math.random() * 0.4),
        memoryUsage: ns.memoryUsage * (0.9 + Math.random() * 0.2),
      })),
      pods: MOCK_CLUSTER_METRICS.pods.map(pod => ({
        ...pod,
        cpuUsage: pod.cpuUsage * (0.8 + Math.random() * 0.4),
        memoryUsage: pod.memoryUsage * (0.9 + Math.random() * 0.2),
      })),
    };
    return NextResponse.json(randomizedMetrics);
  }

  try {
    // 모든 Prometheus 쿼리를 병렬로 실행
    const queries = {
      // 클러스터 전체 메트릭
      totalCpu: 'sum(rate(container_cpu_usage_seconds_total{namespace!="",container!="POD",container!=""}[5m]))',
      totalMemory: 'sum(container_memory_usage_bytes{namespace!="",container!="POD",container!=""})',
      totalPods: 'count(kube_pod_info)',
      totalNodes: 'count(kube_node_info)',

      // Namespace별 메트릭
      namespaceCpu: 'sum(rate(container_cpu_usage_seconds_total{namespace!="",container!="POD",container!=""}[5m])) by (namespace)',
      namespaceMemory: 'sum(container_memory_usage_bytes{namespace!="",container!="POD",container!=""}) by (namespace)',
      namespacePodCount: 'count(kube_pod_info) by (namespace)',
      namespaceCpuRequests: 'sum(kube_pod_container_resource_requests{resource="cpu",namespace!=""}) by (namespace)',
      namespaceCpuLimits: 'sum(kube_pod_container_resource_limits{resource="cpu",namespace!=""}) by (namespace)',
      namespaceMemoryRequests: 'sum(kube_pod_container_resource_requests{resource="memory",namespace!=""}) by (namespace)',
      namespaceMemoryLimits: 'sum(kube_pod_container_resource_limits{resource="memory",namespace!=""}) by (namespace)',

      // Pod별 메트릭
      podCpu: 'sum(rate(container_cpu_usage_seconds_total{namespace!="",container!="POD",container!="",pod!=""}[5m])) by (pod,namespace)',
      podMemory: 'sum(container_memory_usage_bytes{namespace!="",container!="POD",container!="",pod!=""}) by (pod,namespace)',
      podStatus: 'kube_pod_status_phase{namespace!=""}',
    };

    // 모든 쿼리를 병렬로 실행
    const responses = await Promise.all(
      Object.entries(queries).map(async ([key, query]) => {
        const encodedQuery = encodeURIComponent(query);
        const response = await fetch(`${PROMETHEUS_URL}/api/v1/query?query=${encodedQuery}`);
        const data = await response.json();
        return [key, data.data?.result || []];
      })
    );

    const metricsData = Object.fromEntries(responses);

    // 클러스터 전체 메트릭 추출
    const totalCpu = metricsData.totalCpu[0]?.value?.[1] ? parseFloat(metricsData.totalCpu[0].value[1]) : 0;
    const totalMemory = metricsData.totalMemory[0]?.value?.[1] ? parseFloat(metricsData.totalMemory[0].value[1]) : 0;
    const totalPods = metricsData.totalPods[0]?.value?.[1] ? parseFloat(metricsData.totalPods[0].value[1]) : 0;
    const totalNodes = metricsData.totalNodes[0]?.value?.[1] ? parseFloat(metricsData.totalNodes[0].value[1]) : 0;

    // Namespace별 데이터 결합
    const namespaceMap = new Map();

    (metricsData.namespaceCpu as PrometheusResult[]).forEach((result) => {
      const namespace = result.metric.namespace;
      const cpuUsage = parseFloat(result.value[1]);
      namespaceMap.set(namespace, { namespace, cpuUsage, memoryUsage: 0, podCount: 0, cpuRequests: 0, cpuLimits: 0, memoryRequests: 0, memoryLimits: 0 });
    });

    (metricsData.namespaceMemory as PrometheusResult[]).forEach((result) => {
      const namespace = result.metric.namespace;
      const memoryUsage = parseFloat(result.value[1]);
      const existing = namespaceMap.get(namespace) || { namespace, cpuUsage: 0, memoryUsage: 0, podCount: 0, cpuRequests: 0, cpuLimits: 0, memoryRequests: 0, memoryLimits: 0 };
      namespaceMap.set(namespace, { ...existing, memoryUsage });
    });

    (metricsData.namespacePodCount as PrometheusResult[]).forEach((result) => {
      const namespace = result.metric.namespace;
      const podCount = parseFloat(result.value[1]);
      const existing = namespaceMap.get(namespace) || { namespace, cpuUsage: 0, memoryUsage: 0, podCount: 0, cpuRequests: 0, cpuLimits: 0, memoryRequests: 0, memoryLimits: 0 };
      namespaceMap.set(namespace, { ...existing, podCount });
    });

    (metricsData.namespaceCpuRequests as PrometheusResult[]).forEach((result) => {
      const namespace = result.metric.namespace;
      const cpuRequests = parseFloat(result.value[1]);
      const existing = namespaceMap.get(namespace) || { namespace, cpuUsage: 0, memoryUsage: 0, podCount: 0, cpuRequests: 0, cpuLimits: 0, memoryRequests: 0, memoryLimits: 0 };
      namespaceMap.set(namespace, { ...existing, cpuRequests });
    });

    (metricsData.namespaceCpuLimits as PrometheusResult[]).forEach((result) => {
      const namespace = result.metric.namespace;
      const cpuLimits = parseFloat(result.value[1]);
      const existing = namespaceMap.get(namespace) || { namespace, cpuUsage: 0, memoryUsage: 0, podCount: 0, cpuRequests: 0, cpuLimits: 0, memoryRequests: 0, memoryLimits: 0 };
      namespaceMap.set(namespace, { ...existing, cpuLimits });
    });

    (metricsData.namespaceMemoryRequests as PrometheusResult[]).forEach((result) => {
      const namespace = result.metric.namespace;
      const memoryRequests = parseFloat(result.value[1]);
      const existing = namespaceMap.get(namespace) || { namespace, cpuUsage: 0, memoryUsage: 0, podCount: 0, cpuRequests: 0, cpuLimits: 0, memoryRequests: 0, memoryLimits: 0 };
      namespaceMap.set(namespace, { ...existing, memoryRequests });
    });

    (metricsData.namespaceMemoryLimits as PrometheusResult[]).forEach((result) => {
      const namespace = result.metric.namespace;
      const memoryLimits = parseFloat(result.value[1]);
      const existing = namespaceMap.get(namespace) || { namespace, cpuUsage: 0, memoryUsage: 0, podCount: 0, cpuRequests: 0, cpuLimits: 0, memoryRequests: 0, memoryLimits: 0 };
      namespaceMap.set(namespace, { ...existing, memoryLimits });
    });

    const namespaces = Array.from(namespaceMap.values());

    // Pod별 데이터 결합
    const podMap = new Map();

    (metricsData.podCpu as PrometheusResult[]).forEach((result) => {
      const pod = result.metric.pod;
      const namespace = result.metric.namespace;
      const cpuUsage = parseFloat(result.value[1]);
      podMap.set(`${namespace}/${pod}`, { name: pod, namespace, cpuUsage, memoryUsage: 0, status: 'Unknown' });
    });

    (metricsData.podMemory as PrometheusResult[]).forEach((result) => {
      const pod = result.metric.pod;
      const namespace = result.metric.namespace;
      const memoryUsage = parseFloat(result.value[1]);
      const existing = podMap.get(`${namespace}/${pod}`) || { name: pod, namespace, cpuUsage: 0, memoryUsage: 0, status: 'Unknown' };
      podMap.set(`${namespace}/${pod}`, { ...existing, memoryUsage });
    });

    (metricsData.podStatus as PrometheusResult[]).forEach((result) => {
      const pod = result.metric.pod;
      const namespace = result.metric.namespace;
      const phase = result.metric.phase;
      const value = parseFloat(result.value[1]);
      if (value === 1) {
        const existing = podMap.get(`${namespace}/${pod}`);
        if (existing) {
          existing.status = phase;
        }
      }
    });

    const pods = Array.from(podMap.values());

    return NextResponse.json({
      totalCpu,
      totalMemory,
      totalPods,
      totalNodes,
      namespaces,
      pods,
    });
  } catch (error) {
    console.error('Failed to fetch metrics from Prometheus:', error);

    // 에러 발생 시에도 Mock 데이터 반환 (개발 환경)
    if (process.env.NODE_ENV === 'development') {
      console.log('Falling back to mock data due to error');
      return NextResponse.json(MOCK_CLUSTER_METRICS);
    }

    return NextResponse.json({ error: 'Failed to fetch metrics' }, { status: 500 });
  }
}
