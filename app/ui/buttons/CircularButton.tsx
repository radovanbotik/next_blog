import { PlusIcon } from "@heroicons/react/24/outline";
import { ReactNode } from "react";

type Props = {
  buttonText: string;
  icon?: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
      title?: string | undefined;
      titleId?: string | undefined;
    } & React.RefAttributes<SVGSVGElement>
  >;
  onClick?: () => void;
};

export default function CircularButton(props: Props) {
  return (
    <button
      onClick={props.onClick}
      type="button"
      className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 "
    >
      <span className="sr-only">{props.buttonText}</span>
      {props.icon && <props.icon className="h-6 w-6" aria-hidden="true" />}
    </button>
  );
}
