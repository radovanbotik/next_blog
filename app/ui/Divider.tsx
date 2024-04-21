type Props = {
  icon?: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
      title?: string | undefined;
      titleId?: string | undefined;
    } & React.RefAttributes<SVGSVGElement>
  >;
};

export default function Divider(props: Props) {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-gray-300" />
      </div>
      {props.icon && (
        <div className="relative flex justify-center">
          <span className="bg-white px-2 text-gray-500">
            <props.icon className="h-5 w-5 text-gray-500" aria-hidden="true" />
          </span>
        </div>
      )}
    </div>
  );
}
