import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { cn } from "../../lib/utils";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { IconChevronDown } from "@tabler/icons-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { t } from "i18next";
import { ArrowLeft, ChevronsLeft, ChevronsRight } from "lucide-react";
import md5 from "md5";

interface NavigationItem {
  name: string;
  href: string;
  current: boolean;
  icon: JSX.Element;
  separator?: boolean;
  isLogout?: boolean;
  children?: NavigationItem[];
  addIconMessage?: boolean;
}

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;
  siderbarOpenDesktop: boolean;
  setSidebarOpenDesktop: (value: boolean) => void;
  setActivePath?: (value: string) => void;
  navigation: NavigationItem[];
}

export default function Sidebar({
  setSidebarOpen,
  sidebarOpen,
  siderbarOpenDesktop,
  setActivePath,
  setSidebarOpenDesktop,
  navigation,
}: SidebarProps) {
  const userEmail = "mario123@example.com";
  const userAvatar = `https://www.gravatar.com/avatar/${md5(
    userEmail
  )}?d=identicon`;

  return (
    <>
      {/* //? Sidebar for mobile */}
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full flex-1">
                <div className="flex grow flex-col gap-y-6 overflow-y-auto bg-popover px-6 pt-2 pb-4 ring-1 ring-white/10">
                  <button
                    className="rounded-full p-3 flex items-center justify-center border border-[#E2E8F0] w-fit my-4"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <ArrowLeft size={18} strokeWidth={1.5} />
                  </button>
                  <div className="flex h-16 shrink-0 items-center flex-row gap-4">
                    <img
                      className="h-16 w-16 rounded-full bg-gray-50"
                      src={userAvatar}
                      alt=""
                    />
                    <div className="flex flex-col gap-2">
                      <span className="font-semibold text-lg text-[#020617]">
                        Alma Gonzáles
                      </span>
                      <span className="text-sm text-[#64748B]">
                        UX/UI Designer
                      </span>
                    </div>
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <Collapsible className="h-full">
                      <ul role="list" className="flex flex-1 flex-col h-full">
                        <li className="h-full">
                          <ul role="list" className="flex flex-col h-full">
                            <div className="flex-grow -mx-2 space-y-2">
                              {navigation.map((item, index) => (
                                <li key={item.name} className="w-[98%]">
                                  <Link
                                    to={item.href}
                                    onClick={() => {
                                      setActivePath(item.href);
                                      !item.children && setSidebarOpen(false);
                                    }}
                                    className={cn(
                                      item.current
                                        ? "bg-[#DBEAFE]"
                                        : "text-[#020617] dark:text-foreground hover:bg-muted-50",
                                      "group flex gap-x-3 rounded-xl px-5 py-3 text-sm leading-6 items-center font-medium h-10"
                                    )}
                                  >
                                    {item.icon}
                                    <span
                                      className={cn(
                                        "transition-all duration-200 ease-in-out block"
                                      )}
                                    >
                                      {item.name}
                                    </span>
                                    {item.addIconMessage && (
                                      <span className="size-5 rounded-full text-[#F8FAFA] flex items-center justify-center text-xs bg-[#FF4444] absolute right-11">
                                        3
                                      </span>
                                    )}
                                    {item.children && (
                                      <CollapsibleTrigger asChild>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="p-0 bg-transparent hover:bg-transparent"
                                        >
                                          <IconChevronDown className="h-4 w-4" />
                                        </Button>
                                      </CollapsibleTrigger>
                                    )}
                                  </Link>
                                  <CollapsibleContent>
                                    {item.children && item.current && (
                                      <ul className="mt-2">
                                        {item.children.map((subitem) => (
                                          <li key={subitem.name}>
                                            <Link
                                              to={subitem.href}
                                              onClick={() => {
                                                setActivePath(subitem.href);
                                                setSidebarOpen(false);
                                              }}
                                              className={cn(
                                                subitem.current
                                                  ? "font-semibold"
                                                  : "font-normal",
                                                "group flex gap-x-3 rounded-md leading-6 justify-start items-center ml-4 text-[#64748B]"
                                              )}
                                            >
                                              <span
                                                className={cn(
                                                  "transition-all duration-200 ease-in-out text-sm flex h-8 items-center"
                                                )}
                                              >
                                                {subitem.name}
                                              </span>
                                            </Link>
                                          </li>
                                        ))}
                                      </ul>
                                    )}
                                  </CollapsibleContent>
                                  {index === navigation.length - 3 && (
                                    <Separator className="my-10" />
                                  )}
                                </li>
                              ))}
                            </div>
                          </ul>
                        </li>
                      </ul>
                    </Collapsible>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* //? Sidebar for desktop */}
      <aside
        className={cn(
          "hidden lg:fixed lg:inset-y-0 z-[20] lg:flex lg:flex-col drop-shadow-sm transition duration-700 border-r border-[#E2E8F0]",
          siderbarOpenDesktop ? "lg:w-[83px]" : "lg:w-sidebar"
        )}
      >
        <div className="flex grow flex-col gap-y-12 overflow-y-auto bg-popover px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center justify-center " />
          <nav className="flex flex-1 flex-col transition duration-500">
            <Collapsible className="h-full">
              <ul role="list" className="flex flex-1 flex-col h-full">
                <li className="h-full">
                  <ul role="list" className="flex flex-col h-full">
                    <div className="flex-grow -mx-2 space-y-2">
                      {navigation.slice(0, -2).map((item, index) => (
                        <li key={item.name} className="w-[98%]">
                          <Link
                            to={item.href}
                            onClick={() => setActivePath(item.href)}
                            className={cn(
                              item.current
                                ? "bg-[#DBEAFE]"
                                : "text-[#020617] dark:text-foreground hover:bg-muted-50",
                              "group flex gap-x-3 rounded-xl px-5 py-3 text-sm leading-6 items-center font-medium h-11",
                              siderbarOpenDesktop &&
                                "p-2 justify-center gap-x-1"
                            )}
                          >
                            {item.icon}
                            <span
                              className={cn(
                                "transition-all duration-200 ease-in-out",
                                siderbarOpenDesktop ? "hidden" : "block"
                              )}
                            >
                              {item.name}
                            </span>
                            {item.addIconMessage && (
                              <span className="size-5 rounded-full text-[#F8FAFA] flex items-center justify-center text-xs bg-[#FF4444] absolute right-11">
                                3
                              </span>
                            )}
                            {item.children && (
                              <CollapsibleTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="p-0 bg-transparent hover:bg-transparent"
                                >
                                  <IconChevronDown
                                    className={
                                      siderbarOpenDesktop ? "w-3" : "w-4 h-4"
                                    }
                                  />
                                </Button>
                              </CollapsibleTrigger>
                            )}
                          </Link>
                          <CollapsibleContent>
                            {item.children && item.current && (
                              <ul className="mt-2">
                                {item.children.map((subitem) => (
                                  <li key={subitem.name}>
                                    <Link
                                      to={subitem.href}
                                      onClick={() =>
                                        setActivePath(subitem.href)
                                      }
                                      className={cn(
                                        subitem.current
                                          ? "font-semibold"
                                          : "font-normal",
                                        "group flex gap-x-3 rounded-md leading-6 justify-start items-center ml-4 text-[#64748B]",
                                        siderbarOpenDesktop && "justify-center"
                                      )}
                                    >
                                      {/* {subitem.icon} */}
                                      <span
                                        className={`${
                                          siderbarOpenDesktop
                                            ? "h-10 flex"
                                            : "hidden"
                                        }`}
                                      />
                                      <span
                                        className={cn(
                                          "transition-all duration-200 ease-in-out text-sm",
                                          siderbarOpenDesktop
                                            ? "hidden"
                                            : "flex h-9 items-center"
                                        )}
                                      >
                                        {subitem.name}
                                      </span>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </CollapsibleContent>
                        </li>
                      ))}
                    </div>
                    {/* Lista de los dos últimos elementos */}
                    <div className="mt-auto -mx-2 space-y-2">
                      {navigation.slice(-2).map((item) => (
                        <li key={item.name}>
                          <Link
                            to={item.href}
                            onClick={() => setActivePath(item.href)}
                            className={cn(
                              item.current
                                ? "bg-[#DBEAFE]"
                                : "text-[#020617] dark:text-foreground hover:bg-muted-50",
                              "group flex gap-x-3 rounded-xl px-5 py-3 text-sm leading-6 items-center font-medium",
                              siderbarOpenDesktop && "p-2 justify-center"
                            )}
                          >
                            {item.icon}
                            <span
                              className={cn(
                                "transition-all duration-200 ease-in-out",
                                siderbarOpenDesktop ? "hidden" : "block"
                              )}
                            >
                              {item.name}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </div>
                  </ul>
                </li>
              </ul>
            </Collapsible>
          </nav>
        </div>
        <button
          className="absolute top-[7.5rem] -right-[0.9rem] rounded-full size-[28px] p-1.5 bg-[#FFFFFF] text-secondary-500 border border-[#E2E8F0]
          dark:bg-backgroundF-500 z-[300] flex items-center justify-center"
          onClick={() => setSidebarOpenDesktop(!siderbarOpenDesktop)}
        >
          {siderbarOpenDesktop ? (
            <ChevronsRight
              className="h-4 w-4 text-[#020617]"
              strokeWidth={1.5}
            />
          ) : (
            <ChevronsLeft
              className="h-4 w-4 text-[#020617]"
              strokeWidth={1.5}
            />
          )}
        </button>
      </aside>
    </>
  );
}
