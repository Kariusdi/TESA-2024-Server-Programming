"use client";
import { FC, useCallback, useEffect, useState } from "react";
import AppHeader from "./AppHeader";
import { StatusData, StatusDataNoId } from "@/types/types";
import { useMaintenance } from "@/hooks/useMaintenance";
import { status_deleter, status_updater } from "@/utils/api_methods";

interface AppLogs {
  dataSource?: StatusData[];
}

const AppLogs: FC<AppLogs> = ({ dataSource }) => {
  const { modalOpen, setModalOpen, maintenaceDataSet } = useMaintenance();
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] =
    useState<boolean>(false);

  useEffect(() => {
    dataSource?.length !== 0 ? setDeleteOpen(true) : setDeleteOpen(false);
  }, [dataSource]);

  const handleDeleteLogs = useCallback(async () => {
    await status_deleter();
    location.reload();
    setDeleteConfirmationOpen(false);
  }, []);

  return (
    <>
      {modalOpen && (
        <>
          <div className="absolute h-full w-full bg-black opacity-70 z-10" />
          <div className="absolute left-0 top-[25%] w-full z-20 text-white font-bold flex flex-col justify-center items-center">
            <div
              className={`relative text-center bg-white text-black px-10 py-10 rounded-2xl shadow-2xl transform transition-transform duration-300 ease-in-out`}
            >
              <button
                className="absolute right-5 top-3"
                onClick={() => setModalOpen(false)}
              >
                X
              </button>
              <h1 className="text-[54px]">🚧</h1>

              <h1 className="text-[64px]">
                Machine
                {maintenaceDataSet.map(
                  (ele, idx) =>
                    ` ${ele.id}${
                      idx !== maintenaceDataSet.length - 1 ? "," : ""
                    }`
                )}
              </h1>
              <h3 className="text-[32px] bg-[#F8A23F] rounded-lg leading-loose">
                Needs Maintenance
              </h3>
            </div>
          </div>
        </>
      )}
      {deleteConfirmationOpen && (
        <>
          <div className="absolute h-full w-full bg-black opacity-70 z-10" />
          <div className="absolute left-0 top-[25%] w-full z-20 text-white font-bold flex flex-col justify-center items-center">
            <div
              className={`relative text-center bg-white text-black px-10 pt-10 pb-20 rounded-2xl shadow-2xl transform transition-transform duration-300 ease-in-out`}
            >
              <h1 className="text-[54px]">🚨</h1>
              <h1 className="text-[64px]">Are You Sure ?</h1>
              <h3 className="text-[32px] rounded-lg leading-loose">
                You want to <span className="text-[#CB1202]">DELETE</span>
              </h3>
              <div className="flex justify-center items-center space-x-2 absolute right-2 bottom-2 mt-2">
                <button
                  onClick={() => setDeleteConfirmationOpen(false)}
                  className="bg-gray-100 px-10 py-2 rounded-lg transition-all duration-300 hover:bg-gray-200 hover:shadow-inner"
                >
                  NO
                </button>
                <button
                  onClick={() => handleDeleteLogs()}
                  className="bg-[#f85f3f] px-10 py-2 text-white rounded-lg transition-all duration-300 hover:bg-black hover:shadow-inner hover:text-[#f85f3f]"
                >
                  YES
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      <section className="py-2 px-3 flex flex-col justify-start items-start w-full mx-10">
        <div className="flex justify-between items-center w-full">
          <AppHeader title={"Maintenance Logs"} />
          {deleteOpen && (
            <button
              onClick={() => setDeleteConfirmationOpen(true)}
              className="mt-5 text-white font-bold bg-[#f85f3f] rounded-md px-10 py-2 transition-all duration-300 hover:bg-black hover:shadow-inner hover:text-[#f85f3f]"
            >
              Delete
            </button>
          )}
        </div>
        <div className="mt-10"></div>
        {dataSource?.length !== 0 ? (
          dataSource?.map((ele, idx) => (
            <Logs
              key={idx}
              id={ele.id}
              status={ele.status}
              date={ele.date}
              _id={ele._id}
            />
          ))
        ) : (
          <p>There's no logs yet...</p>
        )}
      </section>
    </>
  );
};

const Logs: FC<StatusData> = ({ id, status, date, _id }) => {
  const [statusLabel, setStatusLabel] = useState(() => {
    return status === -1 ? "Needs Maintenance" : "Good";
  });
  const [loader, setLoader] = useState<boolean>(false);
  const [doneConfirmationOpen, setDoneConfirmationOpen] =
    useState<boolean>(false);

  const updateStatus = useCallback(
    async (id: number, status: number, date: string, _id: string) => {
      const updated_data: StatusDataNoId = {
        id,
        status: 0,
        date,
      };
      setLoader(true);
      await status_updater(_id, updated_data);
      setTimeout(() => {
        setStatusLabel("Good");
        setLoader(false);
        setDoneConfirmationOpen(false);
      }, 700);
    },
    [_id]
  );
  return (
    <div className="relative w-full h-20 bg-white shadow-lg rounded-[10px] px-10 flex justify-between items-center my-2 mx-5">
      <div
        className={`absolute top-[25%] -left-4 transition-all duration-700 ${
          statusLabel === "Needs Maintenance" ? "bg-[#F8A23F]" : "bg-[#23CB02]"
        } h-10 w-10 rounded-full`}
      />
      <div className="flex flex-col justify-center items-start">
        <p className="text-[12px] text-gray-500 mb-1">Alert Date: {date}</p>
        <h1 className="text-xl font-semibold">Machine {id}</h1>
        <p
          className={`${
            statusLabel === "Needs Maintenance"
              ? "text-[#F8A23F]"
              : "text-[#23CB02]"
          } font-bold transition-all duration-700`}
        >
          {statusLabel}
        </p>
      </div>
      <div className="flex justify-center items-center transition-all duration-300">
        {/* {statusLabel !== "Good" } */}
        {!doneConfirmationOpen && loader === false && statusLabel !== "Good" ? (
          <button
            onClick={() => setDoneConfirmationOpen(true)}
            className="font-bold bg-gray-100 rounded-md p-2 transition-all duration-300 translate-y-0 hover:-translate-y-1 hover:bg-[#23CB02] hover:text-white"
          >
            <p>Done ✅</p>
          </button>
        ) : doneConfirmationOpen &&
          loader === false &&
          statusLabel !== "Good" ? (
          <div className="flex justify-center items-center space-x-1 font-bold">
            <p className="mr-2">Sure?</p>
            <button
              onClick={() => setDoneConfirmationOpen(false)}
              className="bg-gray-100 p-2 rounded-md transition-all duration-300 hover:bg-gray-200"
            >
              No
            </button>

            <button
              onClick={() => updateStatus(id, status, date, _id)}
              className="bg-[#23CB02] text-white p-2 rounded-md transition-all duration-300 hover:bg-black hover:shadow-inner hover:text-[#23CB02]"
            >
              Yes
            </button>
          </div>
        ) : loader ? (
          <div className="loader"></div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default AppLogs;
