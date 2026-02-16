import { type FC } from "react";
import { Card } from "../ui/card";

interface StatsCardProps {
  title: string;
  value: number;
  icon?: string;
  colorClass?: string;
}

const StatsCard: FC<StatsCardProps> = ({ title, value, icon }) => {
  return (
    <Card className="p-5 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
            {title}
          </p>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
              {value}
            </p>
          </div>
        </div>
        {icon && (
          <div className="w-10 h-10 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 text-xl border border-gray-100 dark:border-gray-700">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
};

export default StatsCard;
