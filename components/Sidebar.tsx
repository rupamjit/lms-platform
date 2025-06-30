"use client"
import { BarChart4, MonitorPlay } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const routes = [
  {
    icon: <MonitorPlay />,
    label: "Courses",
    path: "/instructor/courses",
  },
  {
    icon: <BarChart4 />,
    label: "Performance",
    path: "/instructor/performance",
  },
];

const Sidebar = () => {

    const pathName = usePathname()

  return (
    <div className="flex mt-4 min-h-screen  flex-col w-64 border-r shadow-md px-3 my-4 gap-4 text-sm font-medium ">
      {routes.map((route, _idx) => (
        <Link
          className={`flex items-center ${pathName === route.path?"bg-zinc-200":""} gap-4 p-3 rounded-lg hover:bg-zinc-200`}
          href={route.path}
          key={_idx}
        >
          {route.icon}
          {route.label}
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
