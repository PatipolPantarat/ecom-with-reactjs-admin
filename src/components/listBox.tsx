import { Listbox, Transition } from "@headlessui/react";
import { ListBoxProps } from "../config/interface";
import { Fragment } from "react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

export const ListBox = ({
  options,
  selectedValue,
  setSelectedValue,
  className,
}: ListBoxProps) => {
  return (
    <Listbox value={selectedValue} onChange={setSelectedValue}>
      <div className="relative">
        <Listbox.Button className="relative w-full border border-dark-300 p-2 rounded-md">
          <span
            className={`${
              selectedValue ? "text-dark" : "text-dark-400"
            } block truncate  capitalize`}
          >
            {selectedValue ? selectedValue : "Select an option"}
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDownIcon className="h-5 w-5 text-dark" />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg sm:text-sm">
            {options.map((option, index) => (
              <Listbox.Option
                key={index}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 text-dark ${
                    active && "bg-primary-light "
                  }`
                }
                value={option}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium text-primary" : "font-normal"
                      }`}
                    >
                      {option}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-success">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};
