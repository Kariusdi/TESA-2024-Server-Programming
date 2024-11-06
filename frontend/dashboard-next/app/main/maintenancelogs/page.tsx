"use client";
import AppLogs from "@/app/_components/AppLogs";
import { useFetchStatus } from "@/hooks/useFetchStatus";
import { FC, useEffect, useState } from "react";

const MaintenanceLogsPage: FC = () => {
  const { data, error, isLoading, isValidating } = useFetchStatus();
  const [showValidating, setShowValidating] = useState(true);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowValidating(false);
      setShowLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  if (showLoading || showValidating || isLoading || isValidating) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  if (error) {
    return <div>Error occurs</div>;
  }

  return (
    <>
      <AppLogs dataSource={data ?? []} />
    </>
  );
};

export default MaintenanceLogsPage;
