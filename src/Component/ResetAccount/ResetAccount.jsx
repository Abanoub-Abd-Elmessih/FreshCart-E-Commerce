import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useFormik } from "formik";
import { useContext, useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { AuthContext } from "../../Contexts/AuthenticationContext";

export default function ResetAccount() {
  const navigate = useNavigate();
  const {token, setToken } = useContext(AuthContext);
  const schema = Yup.object().shape({
    email: Yup.string()
      .required("Please enter your Email")
      .email("Must be valid Email"),
    password: Yup.string()
      .required("Please enter your Password")
      .matches(
        /^[A-Za-z][A-Za-z0-9]{5,8}$/,
        "Password must start with a letter, be 6-9 characters long, and contain only letters and numbers"
      ),
  });
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const mutation = useMutation({
    mutationFn: (values) =>
      axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", {
        email: values.email,
        newPassword: values.password,
      }),
    onSuccess: (data) => {
      console.log("Reset successful", data);
      navigate("/");
      setToken(data.data.token);
      localStorage.removeItem("code");
    },
    onError: (error) => {
      console.error("Reset failed", error);
      if (error.response) {
        console.log("Response data:", error.response.data);
      }
    },
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values, { resetForm }) => {
      mutation.mutate(values, {
        onSuccess: () => {
          resetForm();
          console.log("Login successful");
        },
      });
    },
  });
  return (
    <>
        <div className="container p-10">
          <h2 className="text-3xl font-semibold my-7">
            Enter your Email and New Password:
          </h2>
          {mutation.isError &&
          mutation.error?.response?.statusText === "Not Found" ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 mt-3"
              role="alert"
            >
              <span className="font-medium">
                There is no user with this email address
              </span>
            </div>
          ) : null}
          <form onSubmit={formik.handleSubmit}>
            {/* Start Email Field */}
            <div className="mt-3">
              <label
                htmlFor="email"
                className="block mb-1 text-lg font-thin text-black"
              >
                Email:
              </label>
              <input
                name="email"
                {...formik.getFieldProps("email")}
                type="email"
                id="email"
                className="border border-gray-300 text-black text-sm rounded-lg focus:ring-green-500 focus:border-green-500 focus:outline-2 outline-green-400 block w-full p-2.5"
                required
              />
              {formik.errors.email && formik.touched.email ? (
                <div
                  className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 mt-3"
                  role="alert"
                >
                  <span className="font-medium">{formik.errors.email}</span>
                </div>
              ) : null}
            </div>
            {/* Start Password Field */}
            <div className="password-field mt-3">
              <label
                htmlFor="password"
                className="block mb-1 text-lg font-thin text-black"
              >
                Password:
              </label>
              <input
                name="password"
                {...formik.getFieldProps("password")}
                type="password"
                id="password"
                className="border border-gray-300 text-black text-sm rounded-lg focus:ring-green-500 focus:border-green-500 focus:outline-2 outline-green-400 block w-full p-2.5"
                required
              />
              {formik.errors.password && formik.touched.password ? (
                <div
                  className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 mt-3"
                  role="alert"
                >
                  <span className="font-medium">{formik.errors.password}</span>
                </div>
              ) : null}
            </div>
            <div className="mt-3">
              <button
                disabled={mutation.isPending}
                type="submit"
                className=" bg-white text-green-700 border-green-700 border-2 group disabled:text-green-800 hover:bg-green-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium mt-3 rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 text-center duration-300"
              >
                {mutation.isPending ? (
                  <FaSpinner className="animate-spin group-hover:text-white" />
                ) : (
                  "Update"
                )}
              </button>
            </div>
          </form>
        </div>
    </>
  );
}
