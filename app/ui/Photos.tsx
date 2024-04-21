import Image from "next/image";
import placeholder from "../../public/images/placeholder-news.jpg";
import clsx from "clsx";

export default function Photos() {
  const images = [placeholder, placeholder, placeholder, placeholder, placeholder];
  const rotations = ["rotate-2", "-rotate-2", "rotate-2", "-rotate-2", "rotate-2"];

  //Div container that stores images
  // rotations[i % rotations.length]
  //clsx just need  value so it can add rotation to index
  //rotation[0] = rotate-2
  //rotation[1] = -rotate-2

  return (
    <div className="mt-16 sm:mt-20">
      <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
        {images.map((image, i) => (
          <div
            key={i}
            className={clsx(
              "relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 sm:w-72 sm:rounded-2xl dark:bg-zinc-800",
              rotations[i]
            )}
          >
            <Image
              src={image}
              alt={`image-${i}`}
              sizes="(min-width:640px) 18rem, 11rem"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
