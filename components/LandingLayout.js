import Image from "next/image";

import { rgbDataURL } from "../utils/blurData";

export default function LandingLayout({ children }) {
  return (
    <>
      <aside className="_bglg">
        <Image
          alt="background blue"
          src="/bglg.jpeg"
          layout="fill"
          objectFit="contain"
          objectPosition="left top"
          quality={100}
          placeholder="blur"
          blurDataURL={rgbDataURL(23, 162, 184)}
        />
      </aside>
      <aside className="_bgm">
        <Image
          alt="background blue"
          src="/bgm.jpeg"
          layout="fill"
          objectFit="contain"
          objectPosition="left top"
          quality={100}
          placeholder="blur"
          blurDataURL={rgbDataURL(23, 162, 184)}
        />
      </aside>
      <aside className="_bgsm">
        <Image
          alt="background blue"
          src="/bgsm.jpeg"
          layout="fill"
          objectFit="contain"
          objectPosition="left top"
          quality={100}
          placeholder="blur"
          blurDataURL={rgbDataURL(23, 162, 184)}
        />
      </aside>
      {children}
      <aside className="_bglg">
        <Image
          alt="background blue"
          src="/bglg.jpeg"
          layout="fill"
          objectFit="contain"
          objectPosition="right top"
          quality={100}
          placeholder="blur"
          blurDataURL={rgbDataURL(23, 162, 184)}
        />
      </aside>
      <aside className="_bgm">
        <Image
          alt="background blue"
          src="/bgm.jpeg"
          layout="fill"
          objectFit="contain"
          objectPosition="right top"
          quality={100}
          placeholder="blur"
          blurDataURL={rgbDataURL(23, 162, 184)}
        />
      </aside>
      <aside className="_bgsm">
        <Image
          alt="background blue"
          src="/bgsm.jpeg"
          layout="fill"
          objectFit="contain"
          objectPosition="right top"
          quality={100}
          placeholder="blur"
          blurDataURL={rgbDataURL(23, 162, 184)}
        />
      </aside>
    </>
  );
}
