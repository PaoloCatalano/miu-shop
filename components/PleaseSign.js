import { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import GoBack from "./GoBack";
import Loading from "./Loading";

export default function PleaseSign() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    let timer = setTimeout(() => setShow(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="home_page">
      {show ? (
        <>
          <Head>
            <title>Miu Loading...</title>
          </Head>
          <Loading />
        </>
      ) : (
        <>
          <Head>
            <title>Unauthorized Access</title>
          </Head>

          <h1 style={{ textAlign: "center", marginTop: "1rem" }}>
            Unauthorized Access
          </h1>
          <div style={{ display: "grid", placeItems: "center" }}>
            <Link href="/signin">
              <button
                type="button"
                className="btn btn-outline-info d-block my-3 px-5"
              >
                <a>Please Sign in!</a>
              </button>
            </Link>
          </div>
          <GoBack />
        </>
      )}
    </div>
  );
}
