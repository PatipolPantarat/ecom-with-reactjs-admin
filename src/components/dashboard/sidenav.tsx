import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import {
  Squares2X2Icon,
  ShoppingBagIcon,
  ComputerDesktopIcon,
  UserIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

const productsMenu = [
  {
    name: "All Products",
    link: "/products",
  },
  {
    name: "Add Products",
    link: "/products/add",
  },
  {
    name: "Categories",
    link: "/products/categories",
  },
];

export default function SideNav() {
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  console.log("pathSegments : ", pathSegments);

  useEffect(() => {
    toggleProductMenu();
  });
  const toggleProductMenu = () => {
    pathSegments[1] === "products"
      ? setIsProductsOpen(true)
      : setIsProductsOpen(false);
    console.log("isProductsOpen : ", isProductsOpen);
  };
  return (
    <div className="bg-white rounded-3xl py-6 shadow flex flex-col gap-2 h-full">
      <div
        className={clsx(
          "text-dark-500 font-medium hover:text-primary duration-150",
          {
            " text-primary": location.pathname === "/",
          }
        )}
      >
        <Link to={"/"} className="flex items-center">
          <div
            className={clsx("p-4 pl-6", {
              " text-primary bg-primary-light rounded-e-full":
                location.pathname === "/",
            })}
          >
            <Squares2X2Icon className="h-6 w-6" />
          </div>
          <p className="ms-2">Dashboard</p>
        </Link>
      </div>
      <div
        className={clsx(
          "text-dark-500 font-medium hover:text-primary duration-150",
          {
            " text-primary": location.pathname === "/orders",
          }
        )}
      >
        <Link to={"/orders"} className="flex items-center">
          <div
            className={clsx("p-4 pl-6", {
              " text-primary bg-primary-light rounded-e-full":
                location.pathname === "/orders",
            })}
          >
            <ShoppingBagIcon className="h-6 w-6" />
          </div>
          <p className="ms-2">Orders</p>
        </Link>
      </div>

      <div
        className={clsx("text-dark-500 font-medium duration-150", {
          " text-primary": pathSegments[1] === "products",
        })}
      >
        <Link
          to={"/products"}
          className="flex items-center hover:text-primary"
          onClick={toggleProductMenu}
        >
          <div
            className={clsx("p-4 pl-6", {
              " text-primary bg-primary-light rounded-e-full":
                pathSegments[1] === "products",
            })}
          >
            <ComputerDesktopIcon className="h-6 w-6" />
          </div>
          <div className="flex justify-between w-full items-center pe-6 ">
            <p className="ms-2">Products</p>
            <ChevronDownIcon
              className={clsx("h-5 w-5 duration-150", {
                "rotate-180 text-primary":
                  isProductsOpen && pathSegments[1] === "products",
              })}
            />
          </div>
        </Link>
      </div>
      {isProductsOpen &&
        productsMenu.map((menu: { name: string; link: string }) => (
          <div
            key={menu.name}
            className={clsx(
              "py-1 px-16 text-dark-500 font-medium text-sm hover:text-primary duration-150",
              {
                " text-primary": location.pathname === menu.link,
              }
            )}
          >
            <Link to={menu.link}>{menu.name}</Link>
          </div>
        ))}
      <div
        className={clsx(
          "text-dark-500 font-medium hover:text-primary duration-150",
          {
            " text-primary": location.pathname === "/customers",
          }
        )}
      >
        <Link to={"/customers"} className="flex items-center">
          <div
            className={clsx("p-4 pl-6", {
              " text-primary bg-primary-light rounded-e-full":
                location.pathname === "/customers",
            })}
          >
            <UserIcon className="h-6 w-6" />
          </div>
          <p className="ms-2">Customers</p>
        </Link>
      </div>
    </div>
  );
}
