import { FolderOpen } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

const EmptyState = ({ title, description, icon }: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center rounded-xl border border-dashed bg-card p-12 text-center animate-fade-in">
    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-muted">
      {icon || <FolderOpen className="h-7 w-7 text-muted-foreground" />}
    </div>
    <h3 className="text-lg font-semibold text-foreground">{title}</h3>
    <p className="mt-1 text-sm text-muted-foreground">{description}</p>
  </div>
);

export default EmptyState;
