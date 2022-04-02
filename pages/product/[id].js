import { useState, useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import NoProduct from "../../components/NoProduct";
import { getData } from "../../utils/fetchData";
import { DataContext } from "../../store/GlobalState";
import { addToCart } from "../../store/Actions";
import { rgbDataURL } from "../../utils/blurData";
import { useProduct } from "../../utils/swr";
import AddButton from "../../components/AddButton";
import GoBack from "../../components/GoBack";

const DetailProduct = (props) => {
  //if(props.product === null)
  if (Object.values(props).includes(null)) {
    return <NoProduct />;
  }

  const prodID = props.product._id;

  const [product] = useState(props.product);
  const [tab, setTab] = useState(0);

  const { state, dispatch } = useContext(DataContext);
  const { cart, categories } = state;
  const nameCategory = categories
    .filter((category) => category._id === product.category)
    .map((item) => item.name);
  //SWR
  const { prodSWR, isLoading, isError } = useProduct(prodID);

  const isActive = (index) => {
    if (tab === index) return " active";
    return "";
  };

  return (
    <div className="row detail_page">
      <Head>
        <title>Detail Product</title>
        <meta
          name="description"
          content={product.description + ", " + product.content}
        />
      </Head>

      <div className="col-md-6 ">
        <div className="position-relative image-container">
          <Image
            className="d-block img-thumbnail rounded mt-4 w-100"
            src={product.images[tab].url}
            alt={product.images[tab].url}
            layout="fill"
            objectFit="contain"
            placeholder="blur"
            blurDataURL={rgbDataURL()}
            sizes="50vw"
            quality={100}
          />
        </div>

        <div className="row mx-0" style={{ cursor: "pointer" }}>
          {product.images.map((img, index) => (
            <Image
              key={index}
              src={img.url}
              alt={img.url}
              className={`img-thumbnail rounded mr-1 mt-1 ${isActive(index)}`}
              width={60}
              height={65}
              layout="fixed"
              onClick={() => setTab(index)}
            />
          ))}
        </div>
      </div>

      <div className="col-md-6 mt-3">
        <h2 className="text-uppercase text-center">{product.title}</h2>
        <div className="_division mb-5"></div>
        <h5 className="text-info">
          Price: <span className="_info-bold">€ {product.price}</span>
        </h5>
        <div className="row mx-0 d-flex justify-content-between">
          {prodSWR ? (
            prodSWR.product.inStock > 0 ? (
              <h6 className="text-secondary">
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

          {prodSWR ? (
            <h6 className="text-secondary">Sold: {prodSWR.product.sold}</h6>
          ) : (
            <h6 className="text-secondary">
              Sold {product.sold}?<span>{isLoading && "⌛"}</span>
            </h6>
          )}
        </div>
        <div className="d-inline-flex align-items-baseline ">
          <h5 className="text-info mt-4 mr-2">Category:</h5>
          <Link href={`/?category=${product.category}#products`}>
            <a className="btn btn-outline-info">{nameCategory}</a>
          </Link>
        </div>
        <h5 className="text-info mt-4">Description:</h5>
        <div className="mb-5 _callout rounded">
          <h6 className="my-2">{product.description}</h6>
          <div className="my-2">{product.content}</div>
        </div>
        {product.inStock <= 0 ? (
          <button
            type="button"
            className="btn btn-secondary d-block my-3 px-5"
            disabled={true}
            style={{ cursor: "not-allowed" }}
          >
            Sold Out
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-info d-block my-3 px-5"
            disabled={prodSWR?.product.inStock === 0 ? true : false}
            onClick={() => {
              dispatch({
                type: "NOTIFY",
                payload: { success: "Added to cart" },
              });

              return dispatch(addToCart(product, cart));
            }}
          >
            <AddButton />
          </button>
        )}
        <GoBack />
        <Link href="/cart">
          <button type="button" className="btn btn-warning d-block my-3 px-5">
            <a>Go to Cart</a>
          </button>
        </Link>
      </div>
    </div>
  );
};

export async function getServerSideProps({ params: { id } }) {
  const res = await getData(`product/${id}`);

  if (!res) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { product: res.product || null }, // will be passed to the page component as props
  };
}

export default DetailProduct;
