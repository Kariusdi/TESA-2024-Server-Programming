import { FC } from "react";

interface AppHeaderProps {
  title: string;
}

const AppHeader: FC<AppHeaderProps> = ({ title }) => {
  return (
    <h1 className="text-3xl font-bold mt-2 text-white bg-[#34150F] px-2 py-2 rounded-lg self-start drop-shadow-lg">
      {title}
    </h1>
  );
};

export default AppHeader;
