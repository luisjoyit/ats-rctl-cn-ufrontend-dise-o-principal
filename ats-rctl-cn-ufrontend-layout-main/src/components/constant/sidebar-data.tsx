import {
  IconArrowRight,
  IconBuilding,
  IconFiles,
  IconHelp,
  IconHome,
  IconLogout,
  IconMessage,
  IconReport,
  IconSearch,
  IconSettings,
  IconSpeakerphone,
} from "@tabler/icons-react";
import {
  CircleHelp,
  FolderCheck,
  LayoutDashboard,
  ListChecks,
  Search,
  Settings,
  UserRound,
} from "lucide-react";
import { t } from "i18next";

export function getNavigation(user, activePath) {
  if (user === "applicant") {
    return getNavigationAplicant(activePath);
  } else if (user === "recruiter") {
    return getNavigationRecruiter(activePath);
  } else {
    return getNavigationPublic(activePath);
  }
}

function getNavigationAplicant(activePath) {
  return [
    {
      name: t("sidebar.BuscarEmpleo"),
      href: "/recruitment/applicants/offers/1",
      icon: <Search size={18} strokeWidth={1} />,
      current: activePath.startsWith("/recruitment/applicants/offers/"),
    },
    {
      name: t("sidebar.MisPostulaciones"),
      href: "/recruitment/applicants/candidate/applications",
      icon: <FolderCheck size={18} strokeWidth={1} />,
      current: activePath === "/recruitment/applicants/candidate/applications",
    },
    {
      name: t("sidebar.MisEvaluaciones"),
      href: "/recruitment/applicants/candidate/myEvaluations",
      icon: <ListChecks size={18} strokeWidth={1} />,
      current: activePath === "/recruitment/applicants/candidate/myEvaluations",
    },
    {
      name: t("sidebar.Dashboard"),
      href: "/recruitment/applicants/dashboard",
      icon: <LayoutDashboard size={18} strokeWidth={1} />,
      current: activePath === "/recruitment/applicants/dashboard",
    },
    {
      name: t("sidebar.MiPerfil"),
      href: "/recruitment/applicants/candidate/myProfile",
      icon: <UserRound size={18} strokeWidth={1} />,
      current:
        activePath === "/recruitment/applicants/candidate/myProfile" ||
        activePath ===
          "/recruitment/applicants/candidate/myProfile/MyPortfolio",
      children: [
        {
          name: t("sidebar.MiCv"),
          href: "/recruitment/applicants/candidate/myProfile",
          current: activePath === "/recruitment/applicants/candidate/myProfile",
        },
        {
          name: t("sidebar.MiPortafolio"),
          href: "/recruitment/applicants/candidate/myProfile/MyPortfolio",
          current:
            activePath ===
            "/recruitment/applicants/candidate/myProfile/MyPortfolio",
        },
      ],
    },
    {
      name: t("sidebar.Configuracion"),
      href: "/recruitment/applicants/settings/cuenta",
      icon: <Settings size={18} strokeWidth={1} />,
      current: activePath === "/recruitment/applicants/settings/cuenta",
    },
    {
      name: t("sidebar.Ayuda"),
      href: "/recruitment/applicants/faq",
      icon: <CircleHelp size={18} strokeWidth={1} />,
      current: activePath === "/recruitment/applicants/faq",
    },
  ];
}

function getNavigationPublic(activePath) {
  return [
    {
      name: t("sidebar.BuscarEmpleo"),
      href: "/recruitment/applicants/offers/1",
      icon: <IconSearch stroke={1} />,
      current: activePath.startsWith("/recruitment/applicants/offers/"),
    },
  ];
}

function getNavigationRecruiter(activePath) {
  return [
    {
      name: t("sidebar.Dashboard"),
      href: "/recruitment/company/dashboard",
      icon: <IconHome stroke={1} />,
      current: activePath === "/recruitment/company/dashboard",
    },
    {
      name: t("sidebar.BuscarTalentos"),
      // href: "/recruitment/company/searchTalent",
      href: "/recruitment/company/offers",
      icon: <IconSearch stroke={1} />,
      current: activePath.startsWith("/recruitment/company/offers/"),
    },
    {
      name: t("sidebar.Mensajes"),
      href: "/recruitment/company/messages",
      icon: <IconMessage stroke={1} />,
      current: activePath === "/recruitment/company/messages",
    },
    {
      name: t("sidebar.MisProcesos"),
      href: "/recruitment/company/myProcesses",
      icon: <IconSpeakerphone stroke={1} />,
      current: activePath.startsWith("/recruitment/company/myProcesses"),
      children: [
        {
          name: t("sidebar.MisProcesos"),
          href: "/recruitment/company/myProcesses",
          icon: <IconArrowRight stroke={1} width={14} />,
          current:
            activePath.startsWith("/recruitment/company/myProcesses") &&
            activePath !== "/recruitment/company/myProcesses/createJob",
        },
        {
          name: t("sidebar.PublicarEmpleo"),
          href: "/recruitment/company/myProcesses/createJob",
          icon: <IconArrowRight stroke={1} width={14} />,
          current: activePath === "/recruitment/company/myProcesses/createJob",
        },
      ],
    },
    {
      name: t("sidebar.MisEvaluaciones"),
      href: "/recruitment/company/myEvaluations",
      icon: <IconFiles stroke={1} />,
      current: activePath.startsWith("/recruitment/company/myEvaluations"),
    },
    {
      name: t("sidebar.Reportes"),
      href: "/recruitment/company/myReports",
      icon: <IconReport stroke={1} />,
      current: activePath === "/recruitment/company/myReports",
    },
    {
      name: t("sidebar.MiCompañia"),
      href: "/recruitment/company/myCompany",
      icon: <IconBuilding stroke={1} />,
      current: activePath === "/recruitment/company/myCompany",
      separator: true,
    },
    {
      name: t("sidebar.Configuracion"),
      href: "/recruitment/company/settings",
      icon: <IconSettings stroke={1} />,
      current: activePath.startsWith("/recruitment/company/settings"),
    },
    {
      name: t("sidebar.Ayuda"),
      href: "/recruitment/company/faq",
      icon: <IconHelp stroke={1} />,
      current: activePath === "/recruitment/company/faq",
      separator: true,
    },
    {
      name: "Logout",
      href: "/login",
      icon: <IconLogout stroke={1} />,
      current: activePath === "/login",
    },
  ];
}
