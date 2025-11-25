import ArgoCDView from '@/components/argocd/ArgoCDView';

export const metadata = {
  title: 'ArgoCD - Infrastructure Status',
  description: 'View ArgoCD applications status (Read-only)',
};

export default function ArgoCDPage() {
  return (
    <div className="container mx-auto px-4 py-8 pt-24 max-w-7xl">
      <ArgoCDView />
    </div>
  );
}

