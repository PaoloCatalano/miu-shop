import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { getData } from "../utils/fetchData";
import ProductItem from "../components/product/ProductItem";
import { rgbDataURL } from "../utils/blurData";
import product_pic from "../public/onSale.png";
import GoBack from "../components/GoBack";

const OnSale = (props) => {
  const [products, setProducts] = useState(props.products);

  useEffect(() => {
    setProducts(props.products);
  }, [props.products]);

  const handleCheck = (id) => {
    products.forEach((product) => {
      if (product._id === id) product.checked = !product.checked;
    });
    setProducts([...products]);
  };

  return (
    <div className="home_page">
      <Head>
        <title>{process.env.WEBSITE_NAME} | On Sale!</title>
      </Head>

      <div className="_image-container">
        <Image
          className="rounded"
          alt="logo miu shop"
          src={product_pic}
          layout="intrinsic"
          placeholder="blur"
          width={510}
          height={382.5}
          blurDataURL={rgbDataURL()}
          quality={100}
        />
      </div>
      <div className="_division mb-5"></div>

      <div className="products">
        {products.length === 0 ? (
          <h2>No Products</h2>
        ) : (
          products.map((product) => (
            <ProductItem
              key={product._id}
              product={product}
              handleCheck={handleCheck}
            />
          ))
        )}
      </div>
      <GoBack />
    </div>
  );
};

export async function getServerSideProps() {
  const res = await getData("productsOnSale");
  // server side rendering
  return {
    props: {
      products: res.products,
      result: res.result,
    }, // will be passed to the page component as props
  };
}

export default OnSale;
