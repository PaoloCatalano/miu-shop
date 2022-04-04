import { useState, useContext } from "react";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { useRouter } from "next/router";
import { DataContext } from "../store/GlobalState";
import { postData } from "../utils/fetchData";

const Signin = () => {
  const initialState = { email: "" };
  const [userData, setUserData] = useState(initialState);
  const { email } = userData;

  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;

  const router = useRouter();

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    dispatch({ type: "NOTIFY", payload: {} });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "NOTIFY", payload: { loading: true } });
    const res = await postData("resetPassword/forgot-password", userData);

    if (res.err)
      return dispatch({ type: "NOTIFY", payload: { error: res.err } });
    dispatch({ type: "NOTIFY", payload: { success: res.msg } });

    // dispatch({
    //   type: "AUTH",
    //   payload: {
    //     token: res.access_token,
    //     user: res.user,
    //   },
    // });
  };

  return (
    <div>
      <NextSeo title={`${process.env.WEBSITE_NAME} | Forgot Password`} />

      <form
        className="mx-auto my-4"
        style={{ maxWidth: "500px" }}
        onSubmit={handleSubmit}
      >
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            required
            name="email"
            value={email}
            onChange={handleChangeInput}
          />
        </div>

        <button type="submit" className="btn btn-dark w-100">
          Get Reset Password Link
        </button>

        <p className="my-2">
          You don't have an account?{" "}
          <Link href="/register">
            <a className="_color-red">Register Now</a>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signin;
