import { type FC } from "react";
import StatsCard from "./StatsCard";
import type { JobStats } from "@/redux/types/mail.types";

interface StatsGridProps {
  stats: JobStats;
  isLoading?: boolean;
}

const StatsGrid: FC<StatsGridProps> = ({ stats, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-28 bg-zinc-100 dark:bg-zinc-900 animate-pulse rounded-xl border border-zinc-200 dark:border-zinc-800"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <StatsCard
        title="Total Applications"
        value={stats.total}
        icon="📊"
      />
      <StatsCard
        title="Applied"
        value={stats.applied}
        icon="📤"
      />
      <StatsCard
        title="Interviews"
        value={stats.interview}
        icon="💼"
      />
      <StatsCard
        title="Rejected"
        value={stats.rejected}
        icon="❌"
      />
    </div>
  );
};

export default StatsGrid;
