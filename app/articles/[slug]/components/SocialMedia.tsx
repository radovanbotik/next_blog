import { Fragment } from "react";
import WhatsApp from "@/public/svgs/WhatsApp";
import Facebook from "@/public/svgs/Facebook";
import LinkedIn from "@/public/svgs/LinkedIn";
import Messenger from "@/public/svgs/Messenger";
import Avatar from "../../../ui/avatars/Avatar";
import Input from "../../../ui/input/Input";

type Props = {
  currentPage: string;
};

const platforms = [
  { destination: "Facebook", icon: <Facebook /> },
  { destination: "WhatsApp", icon: <WhatsApp /> },
  { destination: "LinkedIn", icon: <LinkedIn /> },
  { destination: "Messenger", icon: <Messenger /> },
];

export default function SocialMedia(props: Props) {
  return (
    <Fragment>
      <div className="pt-4">
        <div className="flex justify-evenly">
          {platforms.map(platform => (
            <Avatar key={platform.destination} {...platform} />
          ))}
        </div>
      </div>
      <div className="mt-5 sm:mt-6">
        <Input buttonText="Share" readOnly={true} defaultValue={props.currentPage} />
      </div>
    </Fragment>
  );
}
