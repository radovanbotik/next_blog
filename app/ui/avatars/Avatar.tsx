type Props = {
  destination: string;
  icon: JSX.Element;
};
export default function Avatar(props: Props) {
  return <span className="inline-block h-14 w-14 overflow-hidden rounded-full bg-gray-100">{props.icon}</span>;
}
