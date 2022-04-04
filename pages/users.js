import { NextSeo } from "next-seo";
import { useContext } from "react";
import { DataContext } from "../store/GlobalState";
import Link from "next/link";
import Image from "next/image";
import PleaseSign from "../components/PleaseSign";
import { FaTimes, FaCheck, FaEdit, FaTrashAlt } from "react-icons/fa";

const Users = () => {
  const { state, dispatch } = useContext(DataContext);
  const { users, auth, modal } = state;

  if (!auth.user || auth.user.role !== "admin") return <PleaseSign />;
  return (
    <div className="table-responsive">
      <NextSeo
        title={`${process.env.WEBSITE_NAME} | Users`}
        openGraph={{
          url: "https://miu-shop.vercel.app/users",
        }}
      />

      <legend className="mt-5">
        <div className="_alert alert-danger _legend">ADMIN ROOT</div>
        <div className="_alert alert-info _legend">ADMIN</div>
      </legend>

      <table className="table w-100 ">
        <thead>
          <tr>
            <th></th>
            <th>Avatar</th>
            <th>Name</th>
            <th>Email</th>
            <th>Verified</th>
            <th>Action</th>
            <th>ID</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user, index) => (
            <tr
              key={user._id}
              style={
                user.root && user.role === "admin"
                  ? { background: "var(--red-0)" }
                  : user.role === "admin"
                  ? { background: "var(--main-color-0)" }
                  : null
              }
            >
              <th>{index + 1}</th>

              <th>
                <Image
                  src={user.avatar}
                  alt={user.avatar}
                  layout="fixed"
                  width={30}
                  height={30}
                  className="overflow-hidden rounded-circle _border-icon-gray"
                />
              </th>
              <th>{user.name}</th>
              <th>{user.email}</th>
              <th>
                {user.isVerified ? (
                  <FaCheck className="text-success" />
                ) : (
                  <FaTimes className="text-danger" />
                )}
              </th>
              <th>
                <div className="d-flex justify-content-between">
                  <Link
                    href={
                      auth.user.root && auth.user.email !== user.email
                        ? `/edit_user/${user._id}`
                        : "#!"
                    }
                  >
                    <a>
                      <FaEdit className="text-info mr-2" title="Edit" />
                    </a>
                  </Link>

                  {auth.user.root && auth.user.email !== user.email ? (
                    <span
                      style={{ cursor: "pointer" }}
                      className="text-danger ml-2"
                      title="Remove"
                      data-toggle="modal"
                      data-target="#exampleModal"
                      onClick={() =>
                        dispatch({
                          type: "ADD_MODAL",
                          payload: [
                            {
                              data: users,
                              id: user._id,
                              title: user.name,
                              type: "ADD_USERS",
                            },
                          ],
                        })
                      }
                    >
                      <FaTrashAlt />
                    </span>
                  ) : (
                    <span>
                      <FaTrashAlt
                        className="text-success ml-2"
                        title="Can't Remove"
                        style={{ cursor: "not-allowed" }}
                      />
                    </span>
                  )}
                </div>
              </th>
              <th>{user._id}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
