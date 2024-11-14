"use client";
import { ImageLoaderProps } from "@/types/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC, useCallback, useState } from "react";
import { useForm } from "react-hook-form";

interface FormData {
  username: string;
  password: string;
}

const LoginPage: FC = () => {
  const [notMatched, setNotMatched] = useState<boolean>(false);
  const [data, setData] = useState("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const formSubmit = useCallback(
    async (data: FormData) => {
      const body = {
        fullname: data.username,
        password: data.password,
      };

      await fetch("http://127.0.0.1:80/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.access_token);
          localStorage.setItem("token", data.access_token);
          router.push("/main/dashboard");
        })
        .catch((err) => {
          setNotMatched(true);
          console.log("Error!", err);
          throw err;
        });
    },
    [notMatched, data]
  );

  const imageLoader = useCallback(
    ({ src, width, quality = 100 }: ImageLoaderProps): string => {
      return `https://teeptrak.com/wp-content/uploads/2020/10/${src}?w=${width}&q=${quality}`;
    },
    []
  );

  return (
    <section className="flex justify-center items-center h-screen w-screen">
      <form onSubmit={handleSubmit(formSubmit)}>
        <div className="flex h-[648px] w-[969px] bg-white shadow-lg rounded-[25px]">
          <div className="relative h-full w-1/2">
            <p>{data}</p>
            <Image
              loader={imageLoader}
              src="TRS-mesurervotreperformancemachine-scaled.jpeg"
              alt="machines"
              width={100}
              height={100}
              quality={100}
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
                  {...register("username", { required: true })}
                />
                {errors.username && <ErrorMessage msg="Username is required" />}
              </div>

              <div className="w-full max-w-sm min-w-[200px]">
                <input
                  className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border-b-2 border-slate-200  px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300"
                  placeholder="Password"
                  type="password"
                  {...register("password", { required: true })}
                />
                {errors.password && <ErrorMessage msg="Password is required" />}
              </div>
              <div className="w-full">
                {notMatched && (
                  <div className="text-red-500 text-[15px] w-full text-center mb-5">
                    Authentication doesn't match, please try again.
                  </div>
                )}
                <input
                  type="submit"
                  value="Submit"
                  className="h-[48px] w-full bg-[#F85F3F] rounded-[10px] text-white font-bold"
                />
                <div className="text-slate-400 text-[15px] w-full text-center mt-5">
                  LinearOnly Group. CDTI
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default LoginPage;

const ErrorMessage: FC<{ msg: string }> = ({ msg }) => {
  return <p className="text-sm text-red-500 mt-2 ml-2">{msg}</p>;
};
