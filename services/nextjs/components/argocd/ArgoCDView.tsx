'use client';

import { useEffect, useState } from 'react';
import { RefreshCw, CheckCircle2, XCircle, AlertCircle, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface Application {
  name: string;
  namespace: string;
  repoURL: string;
  path: string;
  targetRevision: string;
  destination: {
    server: string;
    namespace: string;
  };
  health: string;
  sync: string;
  resources: Array<{
    kind: string;
    name: string;
    namespace: string;
    status: string;
    health: string;
  }>;
}

interface ArgoCDData {
  applications: Application[];
  timestamp: string;
}

const getHealthIcon = (status: string) => {
  switch (status.toLowerCase()) {
    case 'healthy':
      return <CheckCircle2 className="w-5 h-5 text-green-500" />;
    case 'degraded':
      return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    case 'progressing':
      return <Clock className="w-5 h-5 text-blue-500" />;
    case 'suspended':
      return <AlertCircle className="w-5 h-5 text-gray-500" />;
    case 'missing':
    case 'unknown':
      return <XCircle className="w-5 h-5 text-red-500" />;
    default:
      return <AlertCircle className="w-5 h-5 text-gray-500" />;
  }
};

const getSyncIcon = (status: string) => {
  switch (status.toLowerCase()) {
    case 'synced':
      return <CheckCircle2 className="w-5 h-5 text-green-500" />;
    case 'outofsync':
      return <XCircle className="w-5 h-5 text-yellow-500" />;
    case 'unknown':
      return <AlertCircle className="w-5 h-5 text-gray-500" />;
    default:
      return <AlertCircle className="w-5 h-5 text-gray-500" />;
  }
};

const getHealthColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'healthy':
      return 'text-green-500';
    case 'degraded':
      return 'text-yellow-500';
    case 'progressing':
      return 'text-blue-500';
    case 'suspended':
      return 'text-gray-500';
    case 'missing':
    case 'unknown':
      return 'text-red-500';
    default:
      return 'text-gray-500';
  }
};

const getSyncColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'synced':
      return 'text-green-500';
    case 'outofsync':
      return 'text-yellow-500';
    case 'unknown':
      return 'text-gray-500';
    default:
      return 'text-gray-500';
  }
};

export default function ArgoCDView() {
  const [data, setData] = useState<ArgoCDData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchApplications = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/argocd');
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch ArgoCD data');
      console.error('Error fetching ArgoCD applications:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
    // 30초마다 자동 새로고침
    const interval = setInterval(fetchApplications, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading && !data) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <RefreshCw className="w-8 h-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <XCircle className="w-12 h-12 text-red-500" />
        <p className="text-red-500">{error}</p>
        <button
          onClick={fetchApplications}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!data || data.applications.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-500">No applications found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">ArgoCD Applications</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Last updated: {new Date(data.timestamp).toLocaleString()}
          </p>
        </div>
        <button
          onClick={fetchApplications}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data.applications.map((app) => (
          <Card key={app.name} className="p-6 hover:shadow-lg transition-shadow">
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold mb-1">{app.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {app.namespace}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Health:</span>
                  <div className="flex items-center gap-2">
                    {getHealthIcon(app.health)}
                    <span className={`text-sm font-medium ${getHealthColor(app.health)}`}>
                      {app.health}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Sync:</span>
                  <div className="flex items-center gap-2">
                    {getSyncIcon(app.sync)}
                    <span className={`text-sm font-medium ${getSyncColor(app.sync)}`}>
                      {app.sync}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                  <div>
                    <span className="font-medium">Repository:</span>{' '}
                    <a
                      href={app.repoURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {app.repoURL.split('/').pop()}
                    </a>
                  </div>
                  <div>
                    <span className="font-medium">Revision:</span> {app.targetRevision}
                  </div>
                  {app.path && (
                    <div>
                      <span className="font-medium">Path:</span> {app.path}
                    </div>
                  )}
                  <div>
                    <span className="font-medium">Destination:</span>{' '}
                    {app.destination.namespace}
                  </div>
                  <div>
                    <span className="font-medium">Resources:</span> {app.resources.length}
                  </div>
                </div>
              </div>

              {app.resources.length > 0 && (
                <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                  <details className="cursor-pointer">
                    <summary className="text-sm font-medium mb-2">
                      Resources ({app.resources.length})
                    </summary>
                    <div className="mt-2 space-y-1 max-h-40 overflow-y-auto">
                      {app.resources.map((resource, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between text-xs p-2 bg-gray-50 dark:bg-gray-800 rounded"
                        >
                          <div>
                            <span className="font-medium">{resource.kind}</span>
                            <span className="text-gray-500 ml-2">{resource.name}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            {getHealthIcon(resource.health)}
                            <span className={getHealthColor(resource.health)}>
                              {resource.health}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </details>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

