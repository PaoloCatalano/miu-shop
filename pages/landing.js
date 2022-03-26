import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import LandingLayout from "../components/LandingLayout";
import logo from "../public/logo.png";
import { rgbDataURL } from "../utils/blurData";

export default function landing() {
  return (
    <div className="_landing">
      <Head>
        <title>{process.env.WEBSITE_NAME}</title>
      </Head>
      <LandingLayout>
        <main>
          <div className="_logo">
            <Image
              className="rounded "
              alt="logo miu shop"
              src={logo}
              layout="responsive"
              placeholder="blur"
              blurDataURL={rgbDataURL()}
            />
          </div>
          <h1>WELCOME TO THE MIU SHOP!</h1>
          <h4>
            You will find stickers, dolls, clothes, kimonos, paintings,
            handcrafts, and much more.
          </h4>

          <Link href="/">
            <button className="btn btn-warning d-block mx-auto mb-4">
              <a>Start shopping now!</a>
            </button>
          </Link>
        </main>
      </LandingLayout>
    </div>
  );
}
