import React, { useState, useEffect, useRef } from "react";
import BellIcons from "../../../public/svg/belllIcon";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Link } from "react-router-dom";
//@ts-ignore
import { t, useLanguage } from "@joyit/layout";
import { IconBell } from "@tabler/icons-react";
import { PopoverArrow } from "@radix-ui/react-popover";
import { Bell } from "lucide-react";

interface PopoverProps {
  variant?: string;
  size?: string;
}

const IMG_URL_PROFILE =
  "https://www.blogdelfotografo.com/wp-content/uploads/2022/01/retrato-anillo-luz.webp";

const CustomPopover = ({ variant, size }: PopoverProps) => {
  const isMobile = () => window.innerWidth <= 640;
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(!open); // Alterna el estado de apertura
  };

  return isMobile() ? (
    <>
      <div className="relative">
        <Button
          className={`rounded-full bg-white border border-[#E2E8F0] size-10 ${variant} ${size}`}
          variant="outline"
          size="icon"
          onClick={toggleOpen}
        >
          <Bell strokeWidth={2} className="h-4 w-4 text-[#020617]" />
          <div className="bg-secondary-500 text-secondary-foreground rounded-full h-4 w-4 text-[11px] leading-3 absolute -top-0 -right-1">
            <span className="flex justify-center items-center h-full w-full">
              4
            </span>
          </div>
        </Button>
      </div>

      {open && (
        <div className="fixed left-0 top-[70px] w-full h-[calc(100vh-60px)] bg-white z-50">
          <header className="text-secondary-500 text-sm font-bold bg-accent-100 py-[10px] px-4">
            Notificaciones
          </header>
          <NotificationList />
          <footer className="text-secondary text-sm font-bold text-center bg-accent-100 py-[10px] px-4 hover:bg-accent-200 mt-3">
            <Link
              to="/recruitment/applicants/notifications"
              onClick={toggleOpen}
            >
              Ver toda la actividad
            </Link>
          </footer>
        </div>
      )}
    </>
  ) : (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="relative">
          <Button
            className={`rounded-full bg-white border border-[#E2E8F0] size-10 ${variant} ${size}`}
            variant="outline"
            size="icon"
          >
            <Bell strokeWidth={2} className="h-4 w-4 text-[#020617]" />
          </Button>
          {/* //? badge de notificaciones */}
          <div className="bg-secondary-500 text-secondary-foreground rounded-full h-4 w-4 text-[11px] leading-3 absolute -top-0 -right-1">
            <span className="flex justify-center items-center h-full w-full">
              4
            </span>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="bg-white font-inter shadow-md p-0 rounded-lg w-[367px] -translate-x-14"
        sideOffset={5}
        align="start"
      >
        <header className="text-secondary-500 text-sm font-bold bg-accent-100 py-[10px] px-4">
          Notificaciones
        </header>
        <NotificationList />
        <footer className="text-secondary text-sm font-bold text-center bg-accent-100 py-[10px] px-4 hover:bg-accent-200 mt-3">
          <Link to="/recruitment/applicants/notifications" onClick={toggleOpen}>
            Ver toda la actividad
          </Link>
        </footer>
        <PopoverArrow className="fill-accent-100 w-6 h-2 -translate-x-14" />
      </PopoverContent>
    </Popover>
  );
};

const NotificationList = () => {
  const notifications = [
    {
      img: IMG_URL_PROFILE,
      text: "Postulaste a un empleo",
      timestamp: "Ahora",
    },
    {
      img: IMG_URL_PROFILE,
      text: "Postulaste a un empleo",
      timestamp: "Hace 1h",
    },
    {
      img: IMG_URL_PROFILE,
      text: "Postulaste a un empleo",
      timestamp: "Hace 4h",
    },
    {
      img: "https://avatars.githubusercontent.com/u/124599?v=4",
      name: "Apprecio",
      text: "te ha invitado a una entrevista para el puesto de Frontend Developer",
      timestamp: "Hace 24h",
    },
  ];

  return (
    <div className="grid gap-3 ">
      {notifications.map((notification, index) => (
        <div
        {items.map((item, index) => (
          <li key={index} className="...">{item.name}</li>
        ))}        
        >
          <div className="flex items-center justify-between gap-4 w-">
            <img
              src={notification.img}
              alt="profile_img"
              className="h-9 w-9 rounded-full object-cover"
            />
            <p className="text-secondary text-xs antialiased max-w-[197px]">
              {notification.name && (
                <span className="font-semibold">{notification.name}</span>
              )}
              &nbsp;
              {notification.text}
            </p>
          </div>

          <span className="text-muted-500 text-xs font-semibold antialiased">
            {notification.timestamp}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CustomPopover;
