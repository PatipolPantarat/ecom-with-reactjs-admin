import { RadioButtonProps } from "../config/interface";
import { Fragment } from "react";
import { RadioGroup } from "@headlessui/react";
export const RadioButton = ({
  options,
  selectedValue,
  setSelectedValue,
}: RadioButtonProps) => {
  return (
    <div>
      <RadioGroup
        value={selectedValue}
        onChange={setSelectedValue}
        className="flex w-full justify-evenly gap-2"
      >
        {options.map((option) => (
          <RadioGroup.Option
            key={option.value}
            value={option.value}
            as={Fragment}
          >
            {({ active, checked }) => (
              <li
                className={`${
                  active || checked ? `bg-primary-light` : `bg-white`
                } text-dark py-2 px-4 rounded-md flex justify-between items-center cursor-pointer gap-2`}
              >
                {option.icon}
                {option.label}
              </li>
            )}
          </RadioGroup.Option>
        ))}
      </RadioGroup>
    </div>
  );
};
