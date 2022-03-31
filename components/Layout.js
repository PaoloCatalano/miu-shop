import { useRouter } from "next/router";
import NavBar from "./NavBar";
import Notify from "./Notify";
import Modal from "./Modal";
import Footer from "./Footer";

function Layout({ children }) {
  const router = useRouter();
  if (router.asPath === "/landing" || router.asPath === "/landing/") {
    return <div className="container">{children}</div>;
  }
  return (
    <div className="container">
      <NavBar />
      <Notify />
      <Modal />
      <div style={{ marginBottom: "9rem" }}>
        {children}

        <Footer />
      </div>
    </div>
  );
}

export default Layout;
