import { FC } from "react";

interface AppHeaderProps {
  title: string;
}

const AppHeader: FC<AppHeaderProps> = ({ title }) => {
  return <h1 className="text-3xl font-bold mt-5 text-[#34150F]">{title}</h1>;
};

export default AppHeader;
