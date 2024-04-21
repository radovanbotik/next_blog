"use client";
import { Fragment, ReactNode } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import Divider from "./Divider";
import Button from "./Button";

type ModalProps = {
  isOpen: boolean;
  header: string;
  subheader: string;
  setIsOpen: (arg: boolean) => void;
  children: ReactNode;
};

export default function Modal(props: ModalProps) {
  const { isOpen, setIsOpen } = props;

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={() => setIsOpen(false)} className={"relative z-50"}>
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <Transition.Child
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          as={Fragment}
        >
          <div className="fixed inset-0 flex bg-black/30" aria-hidden="true" />
        </Transition.Child>

        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              {/* The actual Dialog panel */}
              <Dialog.Panel
                className={
                  "relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6"
                }
              >
                {/* Close Panel Icon Button */}
                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <Button onClick={() => setIsOpen(false)} variant="secondary">
                    <XMarkIcon className="w-4 h-4" />
                  </Button>
                </div>
                {/* Header, Title */}
                <Fragment>
                  {/* <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                  </div> */}
                  <div className="text-center ">
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                      {props.header}
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">{props.subheader}</p>
                    </div>
                  </div>
                </Fragment>

                <div className="my-2">
                  <Divider />
                </div>
                {/* Content */}
                {props.children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
