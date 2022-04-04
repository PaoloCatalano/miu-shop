import { useContext, useState } from "react";
import { NextSeo } from "next-seo";
import Link from "next/link";
import Image from "next/image";
import GoBack from "../components/GoBack";
import { rgbDataURL } from "../utils/blurData";
import categories_pic from "../public/categories.png";
import { DataContext } from "../store/GlobalState";
import { updateItem } from "../store/Actions";
import { postData, putData } from "../utils/fetchData";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const Categories = () => {
  const [name, setName] = useState("");

  const { state, dispatch } = useContext(DataContext);
  const { categories, auth } = state;

  const [id, setId] = useState("");

  const createCategory = async () => {
    if (auth.user) {
      if (auth.user.role !== "admin")
        return dispatch({
          type: "NOTIFY",
          payload: { error: "Authentication is not vaild." },
        });
    }

    if (!name)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Name can not be left blank." },
      });

    dispatch({ type: "NOTIFY", payload: { loading: true } });

    let res;
    if (id) {
      res = await putData(`categories/${id}`, { name }, auth.token);
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
      dispatch(updateItem(categories, id, res.category, "ADD_CATEGORIES"));
    } else {
      res = await postData("categories", { name }, auth.token);
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
      dispatch({
        type: "ADD_CATEGORIES",
        payload: [...categories, res.newCategory],
      });
    }
    setName("");
    setId("");
    return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
  };

  const handleEditCategory = (category) => {
    setId(category._id);
    setName(category.name);
  };

  return (
    // <div className="col-md-6 mx-auto my-3">
    <div className="col-sm mx-auto my-3">
      <NextSeo
        title={`${process.env.WEBSITE_NAME} | Categories`}
        description={`In this e-commerce website you will find categories like: ${categories.map(
          (c) => c.name
        )}`}
        canonical="https://miu-shop.vercel.app/categories"
        openGraph={{
          title: `${process.env.WEBSITE_NAME} | Categories`,
          description: `Categories: ${categories.map((c) => c.name)}`,
          url: "https://miu-shop.vercel.app/categories",
        }}
      />

      {auth.user?.role === "admin" && (
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Add a new category"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <button className="btn btn-secondary ml-1" onClick={createCategory}>
            {id ? "Update" : "Create"}
          </button>
        </div>
      )}
      <div className="_image-container">
        <Image
          className="rounded"
          alt="logo miu shop"
          src={categories_pic}
          layout="intrinsic"
          placeholder="blur"
          width={510}
          height={382.5}
          blurDataURL={rgbDataURL()}
          quality={100}
        />
      </div>
      <div className="_division"></div>
      <ul className="categories products">
        {categories.map((category) => (
          <li key={category._id} className="my-4 text-capitalize rounded">
            <Link href={`/?category=${category._id}#products`}>
              <a className="w-100 h-100">{category.name}</a>
            </Link>
            {auth.user?.role === "admin" && (
              <div className="d-flex justify-content-around">
                <span
                  style={{ cursor: "pointer" }}
                  className="mr-2 text-info"
                  onClick={() => handleEditCategory(category)}
                >
                  <FaEdit />
                </span>

                <span
                  style={{ cursor: "pointer" }}
                  className="text-danger"
                  data-toggle="modal"
                  data-target="#exampleModal"
                  onClick={() =>
                    dispatch({
                      type: "ADD_MODAL",
                      payload: [
                        {
                          data: categories,
                          id: category._id,
                          title: category.name,
                          type: "ADD_CATEGORIES",
                        },
                      ],
                    })
                  }
                >
                  <FaTrashAlt />
                </span>
              </div>
            )}
          </li>
        ))}
      </ul>
      <GoBack />
    </div>
  );
};

export default Categories;
