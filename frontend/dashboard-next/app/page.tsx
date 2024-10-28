"use client";
import { ImageLoaderProps } from "@/types/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC, useCallback } from "react";

const LoginPage: FC = () => {
  const router = useRouter();
  const imageLoader = useCallback(
    ({ src, width, quality = 100 }: ImageLoaderProps): string => {
      return `https://teeptrak.com/wp-content/uploads/2020/10/${src}?w=${width}&q=${quality}`;
    },
    []
  );

  const handleSubmit = useCallback(() => {
    router.push("/dashboard");
  }, []);
  return (
    <section className="flex justify-center items-center h-screen w-screen">
      <div className="flex h-[648px] w-[969px] bg-white shadow-lg rounded-[25px]">
        <div className="relative h-full w-1/2">
          <Image
            loader={imageLoader}
            src="TRS-mesurervotreperformancemachine-scaled.jpeg"
            alt="machines"
            width={100}
            height={100}
            quality={100}
            // placeholder="blur"
            className="absolute w-full h-full object-cover z-0 rounded-tl-[25px] rounded-bl-[25px]"
          />
          <div className="absolute h-full w-full bg-black opacity-70 z-10 rounded-tl-[25px] rounded-bl-[25px]"></div>
          <div className="absolute h-full w-full z-20 text-white font-bold flex flex-col justify-center items-center">
            <div>
              <h1 className="text-[64px]">Predictive</h1>
              <h1 className="text-[64px]">Maintenance</h1>
              <h3 className="text-[32px]">Dashboard</h3>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center w-1/2">
          <div className="flex flex-col justify-center items-start w-3/4 space-y-10">
            <h2 className="text-[48px] font-bold">Log in</h2>
            <div className="w-full max-w-sm min-w-[200px]">
              <input
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border-b-2 border-slate-200  px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300"
                placeholder="Username"
                type="text"
              />
            </div>
            <div className="w-full max-w-sm min-w-[200px]">
              <input
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border-b-2 border-slate-200  px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300"
                placeholder="Password"
                type="password"
              />
            </div>
            <div className="w-full">
              <button
                className="h-[48px] w-full bg-[#F85F3F] rounded-[10px] text-white font-bold"
                onClick={() => handleSubmit()}
              >
                Submit
              </button>
              <div className="text-slate-400 text-[15px] w-full text-center mt-5">
                LinearOnly Group. CDTI
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
