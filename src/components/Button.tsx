import clsx from "clsx";
import {
  EllipsisHorizontalIcon,
  ClipboardIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { ButtonProps } from "../config/interface";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};
export function Button({
  children,
  className,
  disabled = false,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled}
      className={clsx(
        "flex h-10 items-center rounded-lg px-4 text-sm font-medium text-white justify-center duration-150 border-2 hover:bg-white",
        className,
        props.color === "primary" &&
          "bg-primary border-primary hover:text-primary",
        props.color === "secondary" &&
          "bg-secondary border-secondary hover:text-secondary",
        props.color === "info" && "bg-info border-info hover:text-info",
        props.color === "success" &&
          "bg-success border-success hover:text-success",
        props.color === "warning" &&
          "bg-warning border-warning hover:text-warning",
        props.color === "danger" && "bg-danger border-danger hover:text-danger",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      {children}
    </button>
  );
}

interface OptionsProps {
  id: string;
  status: string;
}
export function Options({ id, status }: OptionsProps) {
  const updateStatus = async (id: string) => {
    try {
      console.log("id : ", id);
      console.log("status : ", status);
      await axios.put(`http://localhost:5000/products/update/${id}`, {
        status: status === "active" ? "disabled" : "active",
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Menu as="div" className="relative">
      <div>
        <Menu.Button className="relative flex items-center">
          <EllipsisHorizontalIcon className="h-6 w-6" />
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
        <Menu.Items className="absolute rounded-md bg-white w-32 left-0 py-1 mt-2 shadow-lg ring-1 ring-dark-300 z-10">
          <Menu.Item>
            {({ active }) => (
              <Link
                to={`/products/detail/${id}`}
                className={classNames(
                  active ? "bg-gray-100" : "",
                  "flex px-4 py-2 text-md text-dark hover:text-info hover:bg-info-light items-center justify-between"
                )}
              >
                Info
                <ClipboardIcon className="h-5 w-5 ms-2 inline-block" />
              </Link>
            )}
          </Menu.Item>
          {status !== "active" ? (
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="#"
                  className={classNames(
                    active ? "bg-gray-100" : "",
                    "flex px-4 py-2 text-md text-dark hover:text-success hover:bg-success-light items-center justify-between"
                  )}
                  onClick={() => updateStatus(id)}
                >
                  Enable
                  <TrashIcon className="h-5 w-5 ms-2 inline-block" />
                </Link>
              )}
            </Menu.Item>
          ) : (
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="#"
                  className={classNames(
                    active ? "bg-gray-100" : "",
                    "flex px-4 py-2 text-md text-dark hover:text-danger hover:bg-danger-light items-center justify-between"
                  )}
                  onClick={() => updateStatus(id)}
                >
                  Disable
                  <TrashIcon className="h-5 w-5 ms-2 inline-block" />
                </Link>
              )}
            </Menu.Item>
          )}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
