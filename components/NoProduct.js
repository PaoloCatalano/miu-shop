import Link from "next/link";
import { NextSeo } from "next-seo";
import Image from "next/image";
import pic from "../public/oops.jpeg";
import { rgbDataURL } from "../utils/blurData";
import GoBack from "./GoBack";

export default function PleaseSign() {
  return (
    <div className="home_page">
      <style jsx>{`
        ._center {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        ._h1style {
          text-align: center;
          margin-top: 5rem;
        }
      `}</style>
      <NextSeo title={`${process.env.WEBSITE_NAME} | Product Not Available`} />
      <div className="_center">
        <h1 className="_center _h1style">
          <span>
            <Image
              className="rounded"
              alt="O"
              src={pic}
              layout="fixed"
              placeholder="blur"
              width={120}
              height={175}
              blurDataURL={rgbDataURL()}
              quality={100}
            />
          </span>
          ops!, this product is not available
        </h1>
      </div>
      <div className="_center">
        <Link href="/">
          <button
            type="button"
            className="btn btn-warning w-100 text-uppercase m-5"
          >
            <a> enjoy shopping </a>
          </button>
        </Link>
      </div>
      <GoBack />
    </div>
  );
}
