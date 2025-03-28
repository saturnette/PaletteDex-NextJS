import { Crown, Medal } from "lucide-react";

export function getPositionIcon(position: number) {
  switch (position) {
    case 1:
      return { Icon: Crown, className: "w-8 h-8 text-yellow-500" };
    case 2:
      return { Icon: Medal, className: "w-6 h-6 text-gray-400" };
    case 3:
      return { Icon: Medal, className: "w-6 h-6 text-orange-700" };
    default:
      return null;
  }
}
