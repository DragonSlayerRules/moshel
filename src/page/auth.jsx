import React, { useState } from "react";
import logo from "../assets/frameBlack.png";
import { Link, useParams } from "react-router-dom";
import { post } from "../services/service";

function Auth() {
  const params = useParams();
  const [data, setData] = useState();

const handleSubmit = (e) =>{
  e.preventDefault()
  post
    .postRegister(data, params.type)
    .then((response) => console.log(response))
    .catch((error) => console.error(error));
}
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 container mx-auto px-8 mb-80 mt-40">
        <div className="">
          <img className="mx-auto h-10 w-auto" src={logo} alt="Your Company" />
          <h2 className="text-center text-2xl font-medium text-secondary mt-2">
            {params.type === "login"
              ? "Sign in to your account"
              : `Welcome!! let's get you registered`}
          </h2>
        </div>
        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-base font-medium text-secondary"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="text"
                  autoComplete="email"
                  required
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, username: e.target.value }))
                  }
                  className="block w-full rounded-md px-2 border-0 py-1.5 text-secondary ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                {/* <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div> */}
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, password: e.target.value }))
                  }
                  className="block w-full rounded-md px-2 border-0 py-1.5 text-secondary ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm"
                />
              </div>
            </div>
            {params.type === "register" && (
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Re-enter Password
                  </label>
                  {/* <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div> */}
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        rePassword: e.target.value,
                      }))
                    }
                    className="block w-full rounded-md px-2 border-0 py-1.5 text-secondary ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm"
                  />
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-secondary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-smfocus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {params.type === "login" ? "Login" : "Register"}
              </button>
            </div>
          </form>

          <p className="mt-1 text-center text-sm text-secondary font-normal">
            {params.type === "login" ? "Not a member? " : "already a member? "}
            <Link
              to={`/auth/${params.type === "login" ? "register" : "login"}`}
              href="#"
              className="font-semibold leading-6 text-secondary"
            >
              {params.type === "login" ? "sign here" : "login here"}
            </Link>
          </p>
        </div>

        <div className="text-xl text-black mx-auto w-1/3 mt-20 text-center">
          Login and register are still in progress, the developer decide to
          collab with{" "}
          <a
            href="https://www.linkedin.com/in/eric-pradana/"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            Eric Pradana
          </a>{" "}
          as backend developer
        </div>
      </div>
    </>
  );
}

export default Auth;
