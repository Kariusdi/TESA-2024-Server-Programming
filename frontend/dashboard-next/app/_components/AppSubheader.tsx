import { FC } from "react";

interface AppSubHeaderProps {
  title: string;
}

const AppSubHeader: FC<AppSubHeaderProps> = ({ title }) => {
  return (
    <h1 className="text-2xl font-bold text-[#34150F] self-start">{title}</h1>
  );
};

export default AppSubHeader;
