import { NextRequest, NextResponse } from 'next/server';

// 클러스터 내부에서 실행되는 경우 클러스터 내부 서비스 URL 사용
// 외부에서 실행되는 경우 환경 변수로 설정 가능
const ARGOCD_SERVER_URL = process.env.ARGOCD_SERVER_URL || 'https://argocd-server.argocd.svc.cluster.local';
const ARGOCD_TOKEN = process.env.ARGOCD_TOKEN || '';
const ARGOCD_CA_CERT = process.env.ARGOCD_CA_CERT || '';

// Node.js 환경에서 커스텀 fetch 함수 생성 (인증서 지원)
async function fetchWithCert(url: string, options: RequestInit = {}): Promise<Response> {
  // 브라우저 환경에서는 기본 fetch 사용
  if (typeof window !== 'undefined') {
    return fetch(url, options);
  }

  // Node.js 환경에서 인증서가 있으면 커스텀 agent 사용
  if (ARGOCD_CA_CERT) {
    const https = require('https');
    const { Agent } = https;
    
    const agent = new Agent({
      ca: ARGOCD_CA_CERT,
      rejectUnauthorized: true,
    });

    // Node.js의 fetch에 agent 전달
    const nodeOptions: any = {
      ...options,
      agent,
    };

    return fetch(url, nodeOptions);
  }

  return fetch(url, options);
}

interface ArgoCDApplication {
  metadata: {
    name: string;
    namespace: string;
  };
  spec: {
    source: {
      repoURL: string;
      path?: string;
      targetRevision: string;
    };
    destination: {
      server: string;
      namespace: string;
    };
  };
  status: {
    health: {
      status: string;
    };
    sync: {
      status: string;
    };
    resources?: Array<{
      kind: string;
      name: string;
      namespace: string;
      status: string;
      health?: {
        status: string;
      };
    }>;
  };
}

// GET /api/argocd - Get all ArgoCD applications
export async function GET(request: NextRequest) {
  try {
    if (!ARGOCD_TOKEN) {
      return NextResponse.json(
        { error: 'ArgoCD token not configured' },
        { status: 500 }
      );
    }

    // ArgoCD API v1 - Get applications
    const response = await fetchWithCert(`${ARGOCD_SERVER_URL}/api/v1/applications`, {
      headers: {
        'Authorization': `Bearer ${ARGOCD_TOKEN}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('ArgoCD API error:', response.status, errorText);
      return NextResponse.json(
        { error: `ArgoCD API error: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    // Read-only로 필터링 (필요한 정보만 반환)
    const applications = (data.items || []).map((app: ArgoCDApplication) => ({
      name: app.metadata.name,
      namespace: app.metadata.namespace,
      repoURL: app.spec.source.repoURL,
      path: app.spec.source.path || '',
      targetRevision: app.spec.source.targetRevision,
      destination: app.spec.destination,
      health: app.status.health?.status || 'Unknown',
      sync: app.status.sync?.status || 'Unknown',
      resources: app.status.resources?.map((resource) => ({
        kind: resource.kind,
        name: resource.name,
        namespace: resource.namespace,
        status: resource.status,
        health: resource.health?.status || 'Unknown',
      })) || [],
    }));

    return NextResponse.json({
      applications,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching ArgoCD applications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch ArgoCD applications' },
      { status: 500 }
    );
  }
}

