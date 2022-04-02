import Head from "next/head";
import Image from "next/image";
import GoBack from "../components/GoBack";
import Socials from "../components/Socials";
import { rgbDataURL } from "../utils/blurData";
import logo from "../public/logo.png";

export default function Contact() {
  return (
    <div className="row _contact-page">
      <Head>
        <title>Contact Page</title>
      </Head>
      <div className="col-md-6 mx-auto">
        <div className="_image-container">
          <Image
            className="rounded"
            alt="logo miu shop"
            src={logo}
            layout="intrinsic"
            placeholder="blur"
            width={386}
            height={386}
            blurDataURL={rgbDataURL()}
            quality={100}
          />
        </div>

        <h1 className="text-uppercase text-center mt-4">Contact</h1>
        <div className="_division"></div>
        <section className="m-5">
          <article></article>
          <article>
            <p>
              For any question or information, do not hesitate to contact us at
              the following email:{" "}
              <a
                href={`mailto:${process.env.ADMIN_EMAIL}`}
                className="text-danger"
                style={{
                  transition: "var(--transition)",
                }}
              >
                {process.env.ADMIN_EMAIL}
              </a>
            </p>
          </article>
          <article>
            <p>You can find more at our pages:</p>

            <Socials />
          </article>
          <p>
            <strong>Enjoy shopping with us!</strong>
          </p>
        </section>
        <GoBack />
      </div>
    </div>
  );
}
