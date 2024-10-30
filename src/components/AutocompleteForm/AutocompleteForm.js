import { useState, useEffect, useCallback } from "react";

const Autocomplete = ({
  options = [],
  className = "",
  onSelect,
  value,
  isProduct = undefined,
  error,
  onBlur,
  name,
}) => {
  const [inputValue, setInputValue] = useState(value || "");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  // Actualiza el valor de entrada si se controla desde fuera
  useEffect(() => {
    if (value !== undefined) {
      setInputValue(value);
    }
  }, [value]);

  // Función de debounce para evitar filtrados innecesarios
  const debounceFilter = useCallback(
    (value) => {
      if (debounceTimeout) clearTimeout(debounceTimeout);

      const newTimeout = setTimeout(() => {
        if (value) {
          const filtered = options.filter((option) =>
            option.toLowerCase().includes(value.toLowerCase())
          );
          setFilteredOptions(filtered);
          setShowOptions(filtered.length > 0);
        } else {
          setFilteredOptions([]);
          setShowOptions(false);
        }
      }, 300);

      setDebounceTimeout(newTimeout);
    },
    [debounceTimeout, options]
  );

  // Filtra opciones basadas en el input
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    onSelect && onSelect(value);
    debounceFilter(value);
  };

  // Selecciona una opción y llama a la función de selección externa
  const handleOptionClick = (option) => {
    setInputValue(option);
    setFilteredOptions([]);
    setTimeout(() => setShowOptions(false), 0);

    onSelect &&
      (typeof isProduct !== "undefined"
        ? onSelect(option, isProduct)
        : onSelect(option, true));
  };

  return (
    <div className="relative min-h-[75px]">
      <input
        type="text"
        className={`w-full p-3 outline-none border-none focus:border-transparent focus:ring-0 ${className}`}
        value={inputValue}
        onChange={handleInputChange}
        onBlur={onBlur}
        name={name}
      />
      {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
      {showOptions && filteredOptions.length > 0 && (
        <ul className="absolute left-0 right-0 z-10 w-full mt-2 overflow-hidden bg-white border border-gray-300 rounded-md shadow-lg max-h-48">
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              className="p-2 cursor-pointer hover:bg-blue-500 hover:text-white"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
