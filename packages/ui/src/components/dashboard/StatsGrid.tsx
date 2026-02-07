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
          <div key={i} className="h-24 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg"></div>
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
        colorClass="bg-blue-500"
      />
      <StatsCard
        title="Applied"
        value={stats.applied}
        icon="📤"
        colorClass="bg-green-500"
      />
      <StatsCard
        title="Interviews"
        value={stats.interview}
        icon="💼"
        colorClass="bg-purple-500"
      />
      <StatsCard
        title="Rejected"
        value={stats.rejected}
        icon="❌"
        colorClass="bg-red-500"
      />
    </div>
  );
};

export default StatsGrid;
