"use client";
import { useEffect, useState, ComponentPropsWithoutRef, ReactNode } from "react";
import Modal from "./Modal";
import WhatsApp from "@/public/svgs/WhatsApp";
import Facebook from "@/public/svgs/Facebook";
import LinkedIn from "@/public/svgs/LinkedIn";
import Messenger from "@/public/svgs/Messenger";
import { ShareIcon } from "@heroicons/react/20/solid";
import Button from "@/app/ui/Button";

function URLToCLipboard({ children, ...props }: ComponentPropsWithoutRef<"input"> & { children: ReactNode }) {
  return (
    <div>
      {children && (
        <label htmlFor={props.id} className="block text-sm font-medium leading-6 text-gray-900">
          {children}
        </label>
      )}
      <div className={`${children ? "mt-2" : ""} flex rounded-md shadow-sm`}>
        <div className="relative flex flex-grow items-stretch focus-within:z-10">
          <input
            className="block w-full rounded-md py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 border-0 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            {...props}
          />
          <button
            type="button"
            className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Share
          </button>
        </div>
      </div>
    </div>
  );
}
function CTA(props: { destination: string; icon: JSX.Element }) {
  return <span className="inline-block h-14 w-14 overflow-hidden rounded-full bg-gray-100">{props.icon}</span>;
}

function ToShare({ currentPage }: { currentPage: string }) {
  const platforms = [
    { destination: "Facebook", icon: <Facebook /> },
    { destination: "WhatsApp", icon: <WhatsApp /> },
    { destination: "LinkedIn", icon: <LinkedIn /> },
    { destination: "Messenger", icon: <Messenger /> },
  ];

  return (
    <>
      <div className="pt-4">
        <div className="flex justify-evenly">
          {platforms.map(platform => (
            <CTA key={platform.destination} {...platform} />
          ))}
        </div>
      </div>
      <div className="mt-5 sm:mt-6">
        <URLToCLipboard readOnly={true} defaultValue={currentPage}>
          Copy
        </URLToCLipboard>
      </div>
    </>
  );
}

export default function ShareArticle({ currentPage }: { currentPage: string }) {
  const [clicked, setClicked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) setClicked(true);
    if (!isOpen) setClicked(false);
  }, [isOpen]);

  return (
    <>
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        header={"Where to share?"}
        subheader={"Choose a platform to share this article."}
      >
        <ToShare currentPage={currentPage} />
      </Modal>
      <Button
        type="button"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <ShareIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
        Share this article
      </Button>
    </>
  );
}
