import { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { DataContext } from "../../store/GlobalState";
import { addToCart } from "../../store/Actions";
import { rgbDataURL } from "../../utils/blurData";
import { useProduct } from "../../utils/swr";
import AddButton from "../AddButton";

const ProductItem = ({ product, handleCheck }) => {
  const { state, dispatch } = useContext(DataContext);
  const { cart, auth, categories } = state;
  const router = useRouter();

  const noSalePage = router.pathname !== "/sales";

  const nameCategory = categories
    .filter((category) => category._id === product.category)
    .map((item) => item.name);

  const { prodSWR, isLoading, isError } = useProduct(product._id);

  const userLink = () => {
    return (
      <>
        <Link href={`/product/${product._id}`}>
          <a
            className="btn btn-outline-info"
            style={{ marginRight: "5px", flex: 1 }}
          >
            View
          </a>
        </Link>
        <button
          className="btn btn-warning"
          style={{ marginLeft: "5px", flex: 1 }}
          disabled={prodSWR?.product?.inStock === 0 ? true : false}
          onClick={() => {
            dispatch({ type: "NOTIFY", payload: { success: "Added to cart" } });
            return dispatch(addToCart(product, cart));
          }}
        >
          <AddButton />
        </button>
      </>
    );
  };

  const adminLink = () => {
    return (
      <>
        <Link href={`/create/${product._id}`}>
          <a className="btn btn-info" style={{ marginRight: "5px", flex: 1 }}>
            Edit
          </a>
        </Link>
        <button
          className="btn btn-danger"
          style={{ marginLeft: "5px", flex: 1 }}
          data-toggle="modal"
          data-target="#exampleModal"
          onClick={() =>
            dispatch({
              type: "ADD_MODAL",
              payload: [
                {
                  data: "",
                  id: product._id,
                  title: product.title,
                  type: "DELETE_PRODUCT",
                },
              ],
            })
          }
        >
          Delete
        </button>
      </>
    );
  };
  return (
    <div className="card _custom-card">
      <div className="text-uppercase text-center font-weight-bold _nameCategory-title">
        {nameCategory}
      </div>

      {noSalePage && auth.user && auth.user.role === "admin" && (
        <input
          type="checkbox"
          checked={product.checked}
          className="position-absolute"
          style={{ height: "20px", width: "20px", zIndex: 1 }}
          onChange={() => handleCheck(product._id)}
        />
      )}
      <Link href={`/product/${product._id}`}>
        <a className="card-img-top position-relative">
          {product.onSale && (
            <div className="polygon">
              <p>sale</p>
            </div>
          )}
          <Image
            className="card-img-top"
            src={product.images[0].url}
            alt={product.images[0].url}
            layout="fill"
            objectFit="cover"
            placeholder="blur"
            blurDataURL={rgbDataURL()}
            sizes="50vw"
            quality={100}
            priority={true}
          />
        </a>
      </Link>
      <div className="_division"></div>
      <div className="card-body">
        <h5
          className="card-title text-capitalize text-center _gray-text"
          title={product.title}
        >
          {product.title}
        </h5>

        <div className="row justify-content-between mx-0">
          <h6 className="_info-bold">€{product.price}</h6>
          {prodSWR ? (
            prodSWR.product?.inStock > 0 ? (
              <h6 className="_info-bold">
                In Stock: {prodSWR.product.inStock}
              </h6>
            ) : (
              <h6 className="text-danger">Out Stock</h6>
            )
          ) : (
            <h6 className="text-danger">
              <span>{isLoading && "⌛"}</span>
              {isError && `maybe in Stock: ${product.inStock}`}
            </h6>
          )}
        </div>

        <p
          className="card-text text-muted text-capitalize"
          style={{ height: 35 }}
          title={product.description}
        >
          {product.description}
        </p>

        <div className="row justify-content-between mx-0">
          {!auth.user || auth.user.role !== "admin" ? userLink() : adminLink()}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
