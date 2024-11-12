import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DashboardLayout } from "./components/layout";
import "./lib/i18/i18n";
//@ts-ignore
import { AuthWrapper } from "@joyit/user-management";
//@ts-ignore
import { RecruitmentApp } from "@joyit/recruitment";
import { ThemeProvider } from "./components/theme-provider";


export default function Root(props) {
  const getIsAuthenticated = localStorage.getItem("isLogged");
  if (getIsAuthenticated === "false" || getIsAuthenticated === null) {
    window.location.href = "/login";
  }
  return (
    <AuthWrapper>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<DashboardLayout />}>
                <Route path="recruitment/*" element={<RecruitmentApp />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
    </AuthWrapper>
  );
}
