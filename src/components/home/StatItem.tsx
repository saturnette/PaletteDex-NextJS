import { LucideIcon } from "lucide-react";

interface StatItemProps {
  icon: LucideIcon;
  title: string;
  value: string | number;
  iconSize?: string;
  layout?: "horizontal" | "vertical";
}

export default function StatItem({
  icon: Icon,
  title,
  value,
  iconSize = "w-8 h-8",
  layout = "vertical",
}: StatItemProps) {
  return layout === "horizontal" ? (
    <div className="flex items-center justify-center">
      <Icon className={`${iconSize} mr-2`} />
      <span>{title}: {value}</span>
    </div>
  ) : (
    <div className="flex flex-col items-center">
      <Icon className={`${iconSize} mb-2`} />
      <span className="text-lg font-semibold">{title}</span>
      <span className="text-xl">{value}</span>
    </div>
  );
}
