import Image from "next/image";
import Link from "next/link";
import { NextSeo } from "next-seo";
import LandingLayout from "../components/LandingLayout";
import logo from "../public/logo.png";
import { rgbDataURL } from "../utils/blurData";

export default function landing() {
  return (
    <div className="_landing">
      <NextSeo
        //  title={`${process.env.WEBSITE_NAME} | Landing`}
        // description="In this e-commerce...."
        canonical="https://miu-shop.vercel.app/landing"
        openGraph={{
          url: "https://miu-shop.vercel.app/landing",
        }}
      />
      <LandingLayout>
        <main>
          <div className="_logo">
            <Image
              className="rounded"
              alt="logo miu shop"
              src={logo}
              width={500}
              height={500}
              placeholder="blur"
              blurDataURL={rgbDataURL(23, 162, 184)}
              quality={100}
              priority
            />
          </div>
          <h2>WELCOME TO THE MIU SHOP!</h2>
          <h4>
            You will find stickers, dolls, kimonos, handcrafts, and much more.
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
