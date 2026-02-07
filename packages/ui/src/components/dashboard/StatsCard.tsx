import { type FC } from "react";
import { Card } from "../ui/card";

interface StatsCardProps {
  title: string;
  value: number;
  icon?: string;
  colorClass?: string;
}

const StatsCard: FC<StatsCardProps> = ({ title, value, icon, colorClass = "bg-blue-500" }) => {
  return (
    <Card className="p-4 sm:p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            {title}
          </p>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
        </div>
        {icon && (
          <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full ${colorClass} flex items-center justify-center text-white text-xl sm:text-2xl`}>
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
};

export default StatsCard;
