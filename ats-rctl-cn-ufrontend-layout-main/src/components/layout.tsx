import { useState } from "react";
import Navbar from "./Navbar/navbar";
import Sidebar from "./Sidebar/sidebar";
import { cn } from "../lib/utils";
import { useLanguage } from "../hooks/useLanguage";
import { getNavigation } from "./constant/sidebar-data";
import { getUserNavigation } from "./constant/user-navigation";
import { Outlet, } from "react-router-dom";
// @ts-ignore
import { useUserRole } from "@joyit/user-management";

export type UserTypes = "applicant" | "recruiter" | "public";

export function DashboardLayout() {
  const { viewUser, userInfo } = useUserRole()
  const { handleChangeLanguage } = useLanguage();

  const [activePath, setActivePath] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [siderbarOpenDesktop, setSidebarOpenDesktop] = useState(false);

  const navigation = getNavigation(viewUser, activePath);
  const userNavigation = getUserNavigation(viewUser, activePath);

  return (
    <div className="font-inter">
      <Sidebar
        navigation={navigation}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        setActivePath={setActivePath}
        siderbarOpenDesktop={siderbarOpenDesktop}
        setSidebarOpenDesktop={setSidebarOpenDesktop}
      />

      <div>
        <Navbar
          user={viewUser as UserTypes}
          userInfo={userInfo}
          setSidebarOpen={setSidebarOpen}
          userNavigation={userNavigation}
          handlechangeLanguage={handleChangeLanguage}
        />

        <main
          className={cn(
            "bg-background min-h-[calc(100vh-70px)]",
            siderbarOpenDesktop ? "lg:pl-[71px]" : "lg:pl-sidebar"
          )}
        >
          <div className="px-4 py-6 sm:px-6 lg:px-12 overflow-x-hidden w-full max-w-[1280px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
