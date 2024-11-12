import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import md5 from "md5";
import { cn } from "../../lib/utils";
import { Switch } from "../ui/switch";
import JoyItLogo from "../../../public/images/logo.webp";
import CustomPopover from "../ui/notifications";
import { IconMenu2, IconSun, IconMoon } from "@tabler/icons-react";
//@ts-ignore
import { ButtonLogin } from "@joyit/user-management";
import { Button } from "../ui/button";
import { t } from "i18next";
import { Link } from "react-router-dom";
import { useTheme } from "../theme-provider";
import { UserTypes } from "../layout";
import { DecodedAccessToken } from "../../types";

interface NavbarProps {
  userNavigation: { name: string; href: string }[];
  user: UserTypes;
  userInfo: DecodedAccessToken | undefined;
  setSidebarOpen: (value: boolean) => void;
  handlechangeLanguage: () => void;
}

export default function Navbar({
  user,
  userInfo,
  userNavigation,
  setSidebarOpen,
  handlechangeLanguage,
}: NavbarProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { setTheme } = useTheme();

  const handleSwitchChange = (checked: boolean) => {
    setIsDarkMode(checked);
    setTheme(checked ? "dark" : "light");
  };

  const userEmail = userInfo ? userInfo.email : "user1245@example.com";
  const userAvatar = `https://www.gravatar.com/avatar/${md5(userEmail)}?d=identicon`;

  return (
    <div className="sticky top-0 z-40 flex h-[88px] shrink-0 items-center gap-x-4 bg-popover px-3  sm:gap-x-6 sm:px-6 lg:px-container border-b border-[#E2E8F0]">
      <button
        type="button"
        className="text-gray-700 lg:hidden size-10 rounded-full border border-[#E2E8F0] flex items-center justify-center"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <IconMenu2 stroke={1.5} className="h-4 w-4" aria-hidden="true" />
      </button>

      <div className="flex  h-16 shrink-0 items-center justify-start lg:w-40">
        <img className="h-7 w-auto" src={JoyItLogo} alt="My Org" />
      </div>

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <div className="relative flex flex-1"></div>
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          {user === "recruiter" && (
            <>
              <Button className="bg-transparent dark:bg-primary-foreground hover:bg-backgroundF-100 text-secondary-500 dark:hover:text-secondary-500 border-[1px] border-secondary-500 rounded-lg">
                Publicar un empleo
              </Button>
              <Button
                variant="secondary"
                className="h-[31px] rounded-lg hidden md:block"
              >
                Buscar talento con IA
              </Button>
            </>
          )}

          {user !== "public" && <CustomPopover />}

          <Button
            type="button"
            onClick={handlechangeLanguage}
            className="hidden xl:block"
          >
            {t("language")}
          </Button>
          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center p-1.5">
              <span className="sr-only">Open user menu</span>
              <img
                className="h-8 w-8 rounded-full bg-gray-50"
                src={userAvatar}
                alt=""
              />
              <span className="hidden lg:flex lg:items-center">
                <span
                  className="ml-2 text-sm font-semibold leading-6 text-secondary-500 dark:text-secondary-foreground"
                  aria-hidden="true"
                >
                  {userInfo ? userInfo.name : t("user.login")}
                </span>
              </span>
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                {userNavigation.map((item) => (
                  <Menu.Item key={item.name}>
                    {({ active }) => (
                      <Link
                        to={item.href}
                        className={cn(
                          active ? "bg-gray-50" : "",
                          "block px-3 py-1 text-sm leading-6 text-gray-900"
                        )}
                      >
                        {item.name}
                      </Link>
                    )}
                  </Menu.Item>
                ))}
                <Menu.Item>
                  <div
                    className={cn(
                      "block px-3 py-1 text-sm leading-6 text-gray-900"
                    )}
                  >
                    <ButtonLogin />
                  </div>
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>

          <div className="items-center space-x-2 ml-2 hidden xl:flex">
            {isDarkMode ? <IconMoon size={22} /> : <IconSun size={22} />}
            <Switch id="airplane-mode" onCheckedChange={handleSwitchChange} />
          </div>
        </div>
      </div>
    </div>
  );
}
