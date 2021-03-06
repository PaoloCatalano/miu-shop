import { useContext, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { DataContext } from "../store/GlobalState";
import CartItem from "../components/CartItem";
import { getData, postData } from "../utils/fetchData";
import GoBack from "../components/GoBack";
import { validateNumber } from "../utils/valid";

const Cart = () => {
  const { state, dispatch } = useContext(DataContext);
  const { cart, auth, orders } = state;

  const [total, setTotal] = useState(0);

  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [isNumb, setIsNumb] = useState(true);

  const [callback, setCallback] = useState(false);
  const router = useRouter();

  const handleNumber = (e) => {
    const { value } = e.target;
    if (value === "") {
      setIsNumb(true);
    } else {
      setIsNumb(validateNumber(value));
    }
  };

  useEffect(() => {
    if (auth?.user) {
      setAddress(auth.user.address !== null ? auth.user.address : "");
      setMobile(auth.user.mobile !== null ? auth.user.mobile : "");
    }
  }, [auth]);

  useEffect(() => {
    const getTotal = () => {
      const res = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity;
      }, 0);

      setTotal(res);
    };

    getTotal();
  }, [cart]);

  useEffect(() => {
    const cartLocal = JSON.parse(localStorage.getItem("__next__cart"));
    if (cartLocal && cartLocal.length > 0) {
      let newArr = [];

      const updateCart = async () => {
        for (const item of cartLocal) {
          const res = await getData(`product/${item._id}`);

          if (res.err)
            dispatch({ type: "NOTIFY", payload: { error: res.err } });

          if (!res.err) {
            const { _id, title, images, price, inStock, sold } = res.product;
            if (res.product && inStock > 0) {
              newArr.push({
                _id,
                title,
                images,
                price,
                inStock,
                sold,
                quantity: item.quantity > inStock ? 1 : item.quantity,
              });
            }
          }
        }

        dispatch({ type: "ADD_CART", payload: newArr });
      };

      updateCart();
    }
  }, [callback]);

  const handlePayment = async () => {
    if (!address || !mobile || !isNumb)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Please add your address and mobile number." },
      });

    let newCart = [];
    for (const item of cart) {
      const res = await getData(`product/${item._id}`);
      if (res.product.inStock - item.quantity >= 0) {
        newCart.push(item);
      }
    }

    if (newCart.length < cart.length) {
      setCallback(!callback);
      return dispatch({
        type: "NOTIFY",
        payload: {
          error: "The product is out of stock or the quantity is insufficient.",
        },
      });
    }

    dispatch({ type: "NOTIFY", payload: { loading: true } });

    postData("order", { address, mobile, cart, total }, auth.token).then(
      (res) => {
        if (res.err)
          return dispatch({ type: "NOTIFY", payload: { error: res.err } });

        dispatch({ type: "ADD_CART", payload: [] });

        const newOrder = {
          ...res.newOrder,
          user: auth.user,
        };
        dispatch({ type: "ADD_ORDERS", payload: [...orders, newOrder] });
        dispatch({ type: "NOTIFY", payload: { success: res.msg } });
        return router.push(`/order/${res.newOrder._id}`);
      }
    );
  };

  if (cart.length === 0)
    return (
      <div className="row mx-auto">
        <div className="col-md-8 text-secondary table-responsive my-5">
          <h2 className="text-uppercase">The Cart is empty</h2>
        </div>
        <Link href="/">
          <button
            type="button"
            className="btn btn-warning w-100 text-uppercase"
          >
            <a> enjoy shopping </a>
          </button>
        </Link>
      </div>
    );

  return (
    <div className="row mx-auto">
      <NextSeo
        title={`${process.env.WEBSITE_NAME} | Cart`}
        canonical="https://miu-shop.vercel.app/cart"
        openGraph={{
          title: `${process.env.WEBSITE_NAME} | Cart`,
          url: "https://miu-shop.vercel.app/cart",
        }}
      />

      <div className="col-md-8 text-secondary table-responsive my-3">
        <h2 className="text-uppercase">Shopping Cart</h2>

        <table className="table my-3">
          <tbody>
            {cart.map((item) => (
              <CartItem
                key={item._id}
                item={item}
                dispatch={dispatch}
                cart={cart}
              />
            ))}
          </tbody>
        </table>
        <hr />
        <button
          className="btn btn-outline-danger ml-2 mb-4"
          data-toggle="modal"
          data-target="#exampleModal"
          onClick={() =>
            dispatch({
              type: "ADD_MODAL",
              payload: [
                {
                  data: "",
                  id: "",
                  title: "Empty the Cart?",
                  type: "EMPTY_CART",
                },
              ],
            })
          }
        >
          DELETE ALL
        </button>
      </div>
      <div className="col-md-4 my-3 text-right text-uppercase text-secondary">
        <form>
          <h2>Shipping</h2>

          <label htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            id="address"
            placeholder="Your address"
            className="form-control mb-2"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />

          <label htmlFor="mobile">
            {!isNumb && (
              <span className="text-danger"> ???? Must be a number!</span>
            )}{" "}
            Mobile
          </label>
          <input
            type="text"
            name="mobile"
            id="mobile"
            className={`form-control mb-2 ${!isNumb && "is-invalid"}`}
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            maxLength={15}
            placeholder="Your mobile"
            onInput={handleNumber}
            required
          />
        </form>

        <h3>
          Total: <span className="text-danger">${total}</span>
        </h3>

        <Link href={auth.user ? "#!" : "/signin"}>
          <a className="btn btn-dark my-2" onClick={handlePayment}>
            Proceed with payment
          </a>
        </Link>
      </div>
      <GoBack />
    </div>
  );
};

export default Cart;
