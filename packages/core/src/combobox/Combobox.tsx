import Select, { components, GroupBase, InputProps, Props } from "react-select";
import { classNames } from "../utils";

function InputField(props: InputProps<unknown, boolean, GroupBase<unknown>>) {
  return <components.Input {...props} className="dark:text-secondary-100" />;
}

// ReactSelect Component
export type Combobox = Props;
export function Combobox({
  isSearchable = true,
  isClearable = true,
  ...props
}: Combobox) {
  return (
    <Select
      {...props}
      unstyled
      components={{
        DropdownIndicator: () => (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        ),
        Input: InputField,
      }}
      isSearchable={isSearchable}
      isClearable={isClearable}
      styles={{
        control: (base, state) => ({
          ...base,
          zIndex: 1,
        }),
        menuPortal: (base) => ({
          ...base,
          zIndex: 999,
        }),
        menu: () => ({}),
      }}
      menuPortalTarget={document.body}
      classNames={{
        container: () => "rounded-md",
        control: (state) =>
          classNames(
            state.isFocused
              ? "ring-2 border-primary-500 ring-primary-100 dark:ring-primary-900"
              : "dark:border-secondary-700",
            "dark:bg-transparent  dark:text-secondary-100 rounded-md px-2 border z-1 !min-h-[30px] md:!min-h-[42px] !py-1"
          ),
        clearIndicator: () => "text-zinc-400 stroke-1 hover:text-zinc-600 ",
        menu: () =>
          "dark:bg-secondary-800 bg-white rounded-md shadow-xl p-1 border-0 w-full absolute mt-1",
        menuList: () => "focus:dark:bg-secondary-700",
        valueContainer: () => "gap-1",
        multiValue: () =>
          "dark:bg-secondary-800 dark:text-secondary-100 bg-secondary-100 rounded-md overflow-hidden py-1 pr-1 pl-3 items-center",
        multiValueLabel: () =>
          "dark:text-secondary-100 py-1 mr-3 font-medium text-sm",
        multiValueRemove: () =>
          "hover:bg-secondary-300 dark:hover:bg-secondary-700 text-secondary-600 dark:text-secondary-200 p-1 rounded-md",
        input: () => "dark:text-secondary-100",
        singleValue: () => "dark:text-secondary-100",
        option: (state) =>
          classNames(
            state.isFocused && "bg-secondary-200/60 dark:bg-secondary-700/70",
            state.isSelected && "bg-secondary-200/60 dark:bg-secondary-700/70",
            "text-secondary-700 hover:bg-secondary-200/60 dark:text-secondary-300 dark:hover:bg-secondary-700/70 active:bg-secondary-200 dark:active:bg-secondary-700 rounded-md px-5 py-1 font-semibold duration-200"
          ),
        placeholder: () => "text-secondary-400 dark:text-secondary-600",
      }}
    />
  );
}
