import Image from "next/image";

export default function LandingLayout({ children }) {
  return (
    <>
      <aside className="_bglg">
        <Image
          alt="backgroud"
          src="/bglg.jpeg"
          layout="fill"
          objectFit="contain"
          objectPosition="left top"
          quality={100}
        />
      </aside>
      <aside className="_bgm">
        <Image
          alt="backgroud"
          src="/bgm.jpeg"
          layout="fill"
          objectFit="contain"
          objectPosition="left top"
          quality={100}
        />
      </aside>
      <aside className="_bgsm">
        <Image
          alt="backgroud"
          src="/bgsm.jpeg"
          layout="fill"
          objectFit="contain"
          objectPosition="left top"
          quality={100}
        />
      </aside>
      {children}
      <aside className="_bglg">
        <Image
          alt="backgroud"
          src="/bglg.jpeg"
          layout="fill"
          objectFit="contain"
          objectPosition="right top"
          quality={100}
        />
      </aside>
      <aside className="_bgm">
        <Image
          alt="backgroud"
          src="/bgm.jpeg"
          layout="fill"
          objectFit="contain"
          objectPosition="right top"
          quality={100}
        />
      </aside>
      <aside className="_bgsm">
        <Image
          alt="backgroud"
          src="/bgsm.jpeg"
          layout="fill"
          objectFit="contain"
          objectPosition="right top"
          quality={100}
        />
      </aside>
    </>
  );
}