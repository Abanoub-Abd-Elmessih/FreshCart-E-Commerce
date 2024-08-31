  import { useMutation } from "@tanstack/react-query";
  import axios from "axios";
  import { useFormik } from "formik";
  import { useContext, useEffect } from "react";
  import { FaSpinner } from "react-icons/fa6";
  import * as Yup from 'yup'
  import { AuthContext } from "../../Contexts/AuthenticationContext";
  import { Link, useNavigate } from "react-router-dom";
  import { EmailContext } from "../../Contexts/EmailContext";
import { Helmet } from "react-helmet";


  export default function Login() {

    const {token ,setToken} =useContext(AuthContext);
    const {setTheEmail} =useContext(EmailContext);
    const navigate =useNavigate();

    localStorage.clear()
    useEffect(() => {
      if (token) {
        navigate("/");
      }
    }, [token, navigate]);

    const schema = Yup.object().shape({
      email: Yup.string().required('Please enter your Email').email('Must be valid Email'),
      password: Yup.string().required('Please enter your Password')
    });

    const mutation = useMutation({
      mutationFn: (values) => axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values),
      onSuccess: (data) => {
        console.log('Login successful', data);
        setToken(data.data.token);
        setTheEmail(data.data.user.email)
        navigate('/')
      },
      onError: (error) => {
        console.error('Login failed', error);
      }
    })

    const formik = useFormik({
      initialValues: {
        email: '',
        password: ''
      },
      validationSchema: schema,
      onSubmit: (values, { resetForm }) => {
        mutation.mutate(values, {
          onSuccess: () => {
            resetForm();
            console.log('Login successful');
          }
        });
      }
    });
    return (
      <div className="container p-10">
            <Helmet>
    <title>
      Login
    </title>
  </Helmet>
        <h2 className="text-3xl font-semibold my-7">Login now :</h2>
        {mutation.isError && mutation.error?.response?.data?.message === "Incorrect email or password" ? (
              <div className="p-4 mt-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                <span className="font-medium">Incorrect email or password</span>
              </div>) : null}
        <form onSubmit={formik.handleSubmit}>
          {/* Start Email Field */}
          <div className="mt-3">
            <label htmlFor="email" className="block mb-1 text-lg font-thin text-black">Email:</label>
            <input name="email" {...formik.getFieldProps('email')} type="email" id="email" className="border border-gray-300 text-black text-sm rounded-lg focus:ring-green-500 focus:border-green-500 focus:outline-2 outline-green-400 block w-full p-2.5" required />
          {formik.errors.email && formik.touched.email ? <div className="p-4 mt-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
            <span className="font-medium">{formik.errors.email}</span>
          </div> : null}
          </div>
          {/* Start Password Field */}
          <div className="mt-3 password-field">
            <label htmlFor="password" className="block mb-1 text-lg font-thin text-black">Password:</label>
            <input name="password" {...formik.getFieldProps('password')} type="password" id="password" className="border border-gray-300 text-black text-sm rounded-lg focus:ring-green-500 focus:border-green-500 focus:outline-2 outline-green-400 block w-full p-2.5" required />
          {formik.errors.password && formik.touched.password ? <div className="p-4 mt-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
            <span className="font-medium">{formik.errors.password}</span>
          </div> : null}
          </div>
          <div className="flex items-center justify-between mt-3">
          <Link to={'/forgetPassword'} className="text-2xl font-semibold text-gray-700 transition-all duration-300 hover:text-green-600 ">Forget your password ?</Link>
          <button
            disabled={mutation.isPending}
            type="submit"
            className=" bg-white text-green-700 border-green-700 border-2 group disabled:text-green-800 hover:bg-green-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium mt-3 rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 text-center duration-300"
          >
            {mutation.isPending ? <FaSpinner className="animate-spin group-hover:text-white"/> : 'Login now'}
          </button>
          </div>
        </form>
      </div>
    )
  }
