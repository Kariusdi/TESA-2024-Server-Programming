"use client";

import { FC, useState } from "react";
import Image from "next/image";
import Linear from "@/assets/trending-up.png";
import Dashboard from "@/assets/layers.png";
import Trello from "@/assets/trello.png";
import User from "@/assets/user.png";
import { usePathname, useRouter } from "next/navigation";

const menuList = [
  { title: "Dashboard", icon: Dashboard, path: "/main/dashboard" },
  { title: "Maintenance Logs", icon: Trello, path: "/main/maintenancelogs" },
  // { title: "Export Summary", icon: Share },
];

const AppMenu: FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedMenu, setSelectedMenu] = useState<string>(pathname);
  return (
    <aside className="h-screen w-[220px] p-3">
      <div className="bg-[#34150F] h-full w-full flex flex-col justify-between items-center p-2 rounded-[10px]">
        <div className="mt-10">
          <div className="font-bold text-white flex justify-center items-center space-x-5 text-[12px] mb-12">
            <Image
              src={Linear}
              alt="logo"
              width={50}
              height={50}
              quality={100}
            />
            <div>
              <h3>Lintech</h3>
              <h3>Group</h3>
              <h3>CDTI</h3>
            </div>
          </div>
          <hr className="mb-24 opacity-50" />
          <ul className="space-y-7">
            {menuList.map((ele, idx) => (
              <div
                key={idx}
                className={`flex justify-start items-center space-x-5 transition-all duration-200 ${
                  selectedMenu === ele.path ? "bg-[#F85F3F]" : "bg-[#34150F]"
                } p-3 rounded-[10px] text-sm`}
                onClick={() => {
                  router.push(ele.path);
                }}
              >
                <Image
                  src={ele.icon}
                  alt={ele.title}
                  width={20}
                  height={20}
                  quality={100}
                />
                <li
                  key={idx + 2}
                  className="font-bold text-white cursor-pointer"
                  onClick={() => setSelectedMenu(ele.path)}
                >
                  {ele.title}
                </li>
              </div>
            ))}
          </ul>
        </div>
        <div className="flex justify-center items-center space-x-5 mb-5">
          <Image src={User} alt="user" width={20} height={20} quality={100} />
          <h1 className="text-white font-bold text-sm">Admin</h1>
        </div>
      </div>
    </aside>
  );
};

export default AppMenu;
