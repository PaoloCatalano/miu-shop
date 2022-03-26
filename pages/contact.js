import Head from "next/head";
import GoBack from "../components/GoBack";
import Socials from "../components/Socials";

export default function Contact() {
  return (
    <div className="row _contact-page">
      <Head>
        <title>Contact Page</title>
      </Head>
      <div className="col-md-6 mx-auto">
        <h1 className="text-uppercase text-center mt-4">Contact</h1>
        <div className="_division"></div>
        <section className="m-5">
          <article>
            <p>
              Miu Shop (<span className="_info-bold">μ-Shop</span>) is a online
              shop selling various handmade items
            </p>
            <p>
              Navigating through the product pages, you will find stickers,
              dolls, clothes, kimonos, paintings, handcrafts, and much more.
            </p>
            <strong>Enjoy shopping with us!</strong>
          </article>
          <article>
            <p>
              For more info or any questions contact us at:{" "}
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
            <p>And follow us in social medias</p>
            <p>
              <Socials />
            </p>
          </article>
        </section>
        <GoBack />
      </div>
    </div>
  );
}
