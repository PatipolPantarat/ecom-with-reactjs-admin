import {
  ChevronDownIcon,
  ClipboardIcon,
  EllipsisHorizontalIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { SelectProps } from "../config/interface";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};
export function SelectOptions({ options, className }: SelectProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  const handleSearch = useDebouncedCallback((searchQuery: string) => {
    console.log("searchQuery : ", searchQuery);
    searchQuery
      ? searchParams.set("search", searchQuery)
      : searchParams.delete("search");
    console.log(`${location.pathname}?${searchParams.toString()}`);
    navigate(`${location.pathname}?${searchParams.toString()}`);
  }, 300);
  return (
    <div className="relative">
      <select
        className={`text-dark-600 focus:outline-none focus:border-primary rounded-md px-3 py-2 pe-10 border border-dark-300 appearance-none ${className}`}
        onChange={(e) => handleSearch(e.target.value)}
      >
        {options.map((option) => (
          <option key={option.name} value={option.value}>
            <p className="text-primary">{option.name}</p>
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
        <ChevronDownIcon className="h-5 w-5 text-primary" />
      </div>
    </div>
  );
}

export function DropdownOptions({ options, className }: SelectProps) {
  return (
    <Menu as="div" className="relative">
      <div>
        <Menu.Button className="flex items-center justify-between text-dark-600 focus:outline-none focus:border-primary rounded-md px-3 py-2 pe-10 border border-dark-300 appearance-none">
          <span>Category</span>
          <ChevronDownIcon className="h-5 w-5 text-primary border" />
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
        <Menu.Items className="absolute rounded-md bg-white w-48 left-0 py-1 mt-2 shadow-lg ring-1 ring-dark-300 z-10 cursor-pointer">
          {options.map((value) => (
            <Menu.Item>
              {({ active }) => (
                <div
                  className={classNames(
                    active ? "bg-gray-100" : "",
                    "flex px-4 py-2 text-md text-dark hover:bg-info-light items-center justify-between"
                  )}
                >
                  {value}
                </div>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
