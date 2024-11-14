"use client";
import AppHeader from "@/app/_components/AppHeader";
import React, { useCallback, useEffect, useState } from "react";

const AudioLogs = () => {
  const [showValidating, setShowValidating] = useState(true);
  const [showLoading, setShowLoading] = useState(true);
  const [audioSets, setAudioSets] = useState<
    { id: string; filename: string; rate: number; timeStamp: string }[]
  >([]);
  useEffect(() => {
    const fetcher = async () => {
      try {
        await fetch("http://127.0.0.1:80/audio/get_all", {
          method: "GET",
        })
          .then(async (res) => {
            if (res.status === 403) {
              console.log("Token expired. Redirecting to /");
            } else {
              return await res.json();
            }
          })
          .then((data) => {
            console.log(data.data[0]);
            setAudioSets(data.data[0]);
          })
          .catch((err) => console.log("Error! This Collection is Empty", err));
      } catch (error) {
        console.log(error);
      }
    };
    fetcher();
  }, []);

  const handleDownload = useCallback(async (filename: string) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:80/audio/download/${encodeURIComponent(filename)}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        if (response.status === 403) {
          console.log("Token expired. Redirecting to /");
        } else {
          console.log("Failed to download file.");
        }
        return;
      }

      // Process the file as a blob
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      // Create a link to download the file
      const link = document.createElement("a");
      link.href = url;
      link.download = filename; // Use the filename from the function parameter
      document.body.appendChild(link);
      link.click();

      // Cleanup
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log("Error downloading the file:", error);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowValidating(false);
      setShowLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  if (showLoading || showValidating) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <section className="py-2 px-3 flex flex-col justify-start items-start w-full mx-10">
      <div className="flex justify-between items-center w-full mb-5">
        <AppHeader title={"Audio Logs"} />
      </div>
      {audioSets?.map((ele, idx) => (
        <div
          key={idx}
          className="w-full h-20 bg-white shadow-lg rounded-[10px] px-10 flex justify-between items-center my-2"
        >
          <div className="flex justify-center items-center space-x-10">
            <div className="text-3xl">🔊 </div>
            <div className="">
              <p className="text-[12px]">TimeStamp: {ele.timeStamp}</p>
              <p className="text-2xl font-bold">{ele.filename}</p>
              <p className="text-[12px] mt-1">Sampling Rate: {ele.rate}</p>
            </div>
          </div>

          <div
            onClick={() => handleDownload(ele.filename)}
            className="bg-green-500 p-3 rounded-xl font-bold cursor-pointer hover:bg-green-900 hover:text-white"
          >
            Download
          </div>
        </div>
      ))}
    </section>
  );
};

export default AudioLogs;
