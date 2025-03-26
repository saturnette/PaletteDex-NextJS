import { FC, ReactNode } from "react";

interface StatItemProps {
  icon: ReactNode;
  label: string;
  value: string | number;
}

const StatItem: FC<StatItemProps> = ({ icon, label, value }) => {
  return (
    <div>
      <div className="mx-auto flex justify-center">{icon}</div>
      <p>{label}</p>
      <p>{value}</p>
    </div>
  );
};

export default StatItem;