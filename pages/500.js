import Image from "next/image";
import Link from "next/link";
import { NextSeo } from "next-seo";
import pic from "../public/500.png";
import { rgbDataURL } from "../utils/blurData";
import GoBack from "../components/GoBack";

export default function ErrorPage() {
  return (
    <div>
      <NextSeo title={`${process.env.WEBSITE_NAME} | Server Error Page`} />
      <div className="_image-container">
        <Image
          className="rounded"
          alt="500 error page miu shop"
          src={pic}
          layout="intrinsic"
          placeholder="blur"
          width={900}
          blurDataURL={rgbDataURL()}
          quality={100}
        />
      </div>
      <center>
        <h1>Oops..there was an internal server error.</h1>
      </center>
      <div style={{ display: "grid", placeItems: "center" }}>
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
