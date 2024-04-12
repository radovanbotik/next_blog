"use client";
import { useEffect, useState } from "react";
import Modal from "../../../ui/modals/Modal";
import SocialMedia from "./SocialMedia";
import { ShareIcon } from "@heroicons/react/20/solid";

export default function ShareArticle() {
  const [clicked, setClicked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const buttonText = clicked ? "Sharing" : "Share this article";
  const articleUrl = window.location.href;

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
        <SocialMedia defaultValue={articleUrl} />
      </Modal>
      <button
        type="button"
        className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-50 px-2.5 py-1.5 text-sm font-semibold text-indigo-600 shadow-sm hover:text-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        // className="text-base font-semibold leading-7 text-indigo-600"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        {/* {buttonText} */}
        <ShareIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
        Share this article
      </button>
    </>
  );
}
