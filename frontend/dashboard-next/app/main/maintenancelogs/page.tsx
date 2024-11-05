"use client";
import AppLogs from "@/app/_components/AppLogs";
import { useStatus } from "@/hooks/useStatus";
import { FC, useEffect } from "react";

const MaintenanceLogsPage: FC = () => {
  const { data, error, isLoading, isValidating } = useStatus();
  return (
    <>
      <AppLogs dataSource={data ?? []} />
    </>
  );
};

export default MaintenanceLogsPage;
