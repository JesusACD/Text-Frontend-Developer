import { useState, useEffect, useCallback } from "react";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { nanoid } from "nanoid";

const Autocomplet = ({
  options = [],
  className = "",
  onSelect,
  value,
  onChange,
}) => {
  const [inputValue, setInputValue] = useState(value || "");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  useEffect(() => {
    if (value !== undefined) {
      setInputValue(value);
    }
  }, [value]);

  const debounceFilter = useCallback(
    (value) => {
      if (debounceTimeout) clearTimeout(debounceTimeout);

      const newTimeout = setTimeout(() => {
        if (value) {
          const filtered = options.filter((option) =>
            option.toLowerCase().includes(value.toLowerCase())
          );
          setFilteredOptions(filtered);
        } else {
          setFilteredOptions([]);
        }
      }, 300); // Ajusta el tiempo de debounce según tus necesidades

      setDebounceTimeout(newTimeout);
    },
    [debounceTimeout, options]
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    onChange && onChange(value);
    debounceFilter(value);
  };

  const handleOptionSelect = (option) => {
    setInputValue(option);
    setFilteredOptions([]);
    onSelect && onSelect(option);
  };

  return (
    <div className={`relative ${className}`}>
      <Combobox value={inputValue} onChange={handleOptionSelect}>
        <div className="relative">
          <div className="flex">
            <ComboboxInput
              as="input"
              type="text"
              className="w-full p-2 outline-none"
              onChange={handleInputChange}
              displayValue={() => inputValue}
            />
            <ComboboxButton className="flex items-center justify-center px-2">
              <ChevronDownIcon className="w-5 h-5 text-gray-400" />
            </ComboboxButton>
          </div>

          {filteredOptions.length > 0 && (
            <ComboboxOptions className="absolute left-0 right-0 z-10 w-full mt-2 overflow-hidden bg-white border border-gray-300 rounded-md shadow-lg max-h-48">
              {filteredOptions.map((option) => (
                <ComboboxOption
                  key={nanoid()}
                  value={option}
                  className={({ active }) =>
                    clsx(
                      "p-2 cursor-pointer",
                      active ? "bg-blue-500 text-white" : "text-gray-900"
                    )
                  }
                >
                  {({ selected, active }) => (
                    <div className="flex items-center">
                      <span
                        className={clsx(
                          "block truncate",
                          selected && "font-semibold"
                        )}
                      >
                        {option}
                      </span>
                      {selected && (
                        <CheckIcon
                          className="w-5 h-5 ml-2 text-blue-500"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                  )}
                </ComboboxOption>
              ))}
            </ComboboxOptions>
          )}
        </div>
      </Combobox>
    </div>
  );
};

export default Autocomplet;
