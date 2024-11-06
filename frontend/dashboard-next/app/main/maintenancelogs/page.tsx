"use client";
import AppLogs from "@/app/_components/AppLogs";
import { useFetchStatus } from "@/hooks/useStatus";
import { FC } from "react";

const MaintenanceLogsPage: FC = () => {
  const { data, error, isLoading, isValidating } = useFetchStatus();
  return (
    <>
      <AppLogs dataSource={data ?? []} />
    </>
  );
};

export default MaintenanceLogsPage;
