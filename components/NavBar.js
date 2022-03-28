import React, { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { DataContext } from "../store/GlobalState";
import Cookie from "js-cookie";
import Image from "next/image";
import { FaShoppingCart } from "react-icons/fa";
import { GiShirtButton } from "react-icons/gi";
import { BsShopWindow } from "react-icons/bs";

function NavBar() {
  const router = useRouter();
  const { state, dispatch } = useContext(DataContext);
  const { auth, cart } = state;

  const isActive = (r) => {
    if (r === router.pathname) {
      return " active";
    } else {
      return "";
    }
  };

  const handleLogout = () => {
    Cookie.remove("refreshtoken", { path: "api/auth/accessToken" });
    localStorage.removeItem("firstLogin");
    dispatch({ type: "AUTH", payload: {} });
    dispatch({ type: "NOTIFY", payload: { success: "Logged out!" } });
    return router.push("/");
  };

  const adminRouter = () => {
    return (
      <>
        <Link href="/users">
          <a className="dropdown-item">Users</a>
        </Link>
        <Link href="/create">
          <a className="dropdown-item">Products</a>
        </Link>
        <Link href="/categories">
          <a className="dropdown-item">Categories</a>
        </Link>
      </>
    );
  };

  const loggedRouter = () => {
    return (
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle icon-container"
          href="#"
          id="navbarDropdownMenuLink"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <Image
            src={auth.user.avatar}
            alt={auth.user.avatar}
            className="rounded-circle"
            layout="fixed"
            width={30}
            height={30}
          />{" "}
          <span>{auth.user.name}</span>
        </a>

        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <Link href="/profile">
            <a className="dropdown-item">Profile</a>
          </Link>
          {auth.user.role === "admin" && adminRouter()}
          <div className="dropdown-divider"></div>
          <button className="dropdown-item" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </li>
    );
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark _bg-color _navbar">
      <style jsx>{`
        a {
          display: inline-flex;
        }
        ._dash {
          color: var(--red);
        }
        button {
          width: 40px;
        }
        .__shop-icon {
          color: var(--main-color-10);
          margin-right: 5px;
          margin-top: -5px;
        }
        .__μ {
          font-size: 32px;
          margin-top: -14px;
        }
      `}</style>
      <Link href="/">
        <a className="navbar-brand">
          <div className="__shop-icon">
            <BsShopWindow />{" "}
          </div>
          <div className="__μ">μ</div>
          <span className="_dash">-</span>Shop
        </a>
      </Link>
      <button
        className="navbar-toggler rounded-circle"
        // style={{ width: 40 }}
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <GiShirtButton className="_toggler-icon" />
      </button>
      <div
        className="collapse navbar-collapse justify-content-end"
        id="navbarNavDropdown"
      >
        <ul className="navbar-nav p-1 navbar-list">
          <li className="nav-item mr-3">
            <Link href="/cart">
              <a className={"nav-link icon-container" + isActive("/cart")}>
                <div className="position-relative">
                  <FaShoppingCart aria-hidden="true" />
                  <span className="position-absolute _length-cart">
                    {cart.length}
                  </span>
                </div>{" "}
                Cart
              </a>
            </Link>
          </li>
          {Object.keys(auth).length === 0 ? (
            <li className="nav-item">
              <Link href="/signin">
                <a className={"nav-link" + isActive("/signin")}>
                  <i className="fas fa-user" aria-hidden="true"></i> Sign in
                </a>
              </Link>
            </li>
          ) : (
            loggedRouter()
          )}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
