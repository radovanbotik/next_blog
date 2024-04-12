import { ComponentPropsWithoutRef } from "react";

type Props = ComponentPropsWithoutRef<"label"> &
  ComponentPropsWithoutRef<"input"> & { labelText?: string; buttonText: string };

export default function Input(props: Props) {
  return (
    <div>
      {props.labelText && (
        <label htmlFor={props.id} className="block text-sm font-medium leading-6 text-gray-900">
          {props.labelText}
        </label>
      )}
      <div className={`${props.labelText ? "mt-2" : ""} flex rounded-md shadow-sm`}>
        <div className="relative flex flex-grow items-stretch focus-within:z-10">
          <input
            type={props.type}
            name={props.name}
            id={props.id}
            className="block w-full rounded-md py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 border-0 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder={props.placeholder}
            defaultValue={props.defaultValue}
            readOnly={props.readOnly}
          />
          <button
            type="button"
            className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            {props.buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}
