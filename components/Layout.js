import { useRouter } from "next/router";
import NavBar from "./NavBar";
import Notify from "./Notify";
import Modal from "./Modal";
import Footer from "./Footer";

function Layout({ children }) {
  const router = useRouter();
  if (router.asPath === "/landing" || router.asPath === "/landing/") {
    return (
      <div className="container">
        <Notify />
        {children}
      </div>
    );
  }
  return (
    <div className="container _grid-nav-main-footer">
      <NavBar />
      <Notify />
      <Modal />
      <div style={{ marginBottom: "9rem" }}>{children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
