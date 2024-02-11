import {
  EnvelopeIcon,
  BellIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import AuthService from "../../services/authservice";
import { useAuth } from "../../context/AuthContext";

const textTitle = [
  {
    name: "Dashboard",
    link: "",
  },
  {
    name: "Orders",
    link: "orders",
  },
  {
    name: "Products",
    link: "products",
  },
  {
    name: "Customers",
    link: "customers",
  },
];

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

export default function Navbar() {
  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const [user, setUser] = useState<string>("user_null");
  const auth = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await AuthService.getCurrentUser();
        setUser(user.username);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await AuthService.logout();
      auth.logout();
    } catch (error) {
      console.error("Failed to logout", error);
    }
  };

  return (
    <div className="h-16 bg-white shadow-sm">
      <div className="max-w-[1440px] grid grid-cols-5 mx-auto h-full">
        <div className="text-3xl font-bold flex justify-start items-center">
          Icon
        </div>
        <div className="col-start-2 col-span-3 flex justify-between items-center">
          <h1 className="text-xl font-medium capitalize">
            {textTitle.map(
              (text) => pathSegments[1] === text.link && text.name
            )}
            {pathSegments[2] && " / " + pathSegments[2]}
          </h1>

          <div className="flex items-center">
            <EnvelopeIcon className="h-7 w-7 ms-8 text-dark-500 hover:text-primary duration-100" />
            <BellIcon className="h-7 w-7 ms-5 text-dark-500 hover:text-primary duration-100" />
          </div>
        </div>
        <div className="flex justify-end items-center">
          <Menu as="div" className="relative">
            <div>
              <Menu.Button className="relative flex items-center hover:text-primary duration-200">
                <span className="me-3 font-medium">{user}</span>
                <img
                  src="https://picsum.photos/200"
                  alt="https://picsum.photos/200"
                  className="rounded-full w-10 h-10 ring-1 ring-dark-300 hover:ring-primary duration-200"
                />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute rounded-md bg-white w-40 right-0 py-1 mt-2 shadow-lg ring-1 ring-dark-300">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/login"
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "flex px-4 py-2 text-md text-dark hover:text-primary items-center justify-between"
                      )}
                      onClick={handleLogout}
                    >
                      Sign out
                      <ArrowLeftStartOnRectangleIcon className="h-5 w-5 ms-2 inline-block rotate-180" />
                    </Link>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  );
}
