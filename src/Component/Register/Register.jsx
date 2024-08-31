import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useFormik } from "formik"
import { useContext, useEffect } from "react";
import { FaSpinner } from "react-icons/fa6";
import * as Yup from 'yup'
import { AuthContext } from "../../Contexts/AuthenticationContext";
import { useNavigate } from "react-router-dom";
import { EmailContext } from "../../Contexts/EmailContext";
import { Helmet } from "react-helmet";

export default function Register() {

  const {token ,setToken} = useContext(AuthContext);
  const {setTheEmail} =useContext(EmailContext);
  const navigate =useNavigate()

  localStorage.clear()
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const schema = Yup.object().shape({
    name: Yup.string().required('Please enter your Name').min(3, 'Name minimum is 3 characters').max(15, 'Name maximum is 15 characters'),
    email: Yup.string().required('Please enter your Email').email('Must be valid Email'),
    password: Yup.string().required('Please enter your Password').matches(/^[A-Za-z][A-Za-z0-9]{5,8}$/, 'Password must start with a letter, be 6-9 characters long, and contain only letters and numbers'),
    rePassword: Yup.string().required('Please re-enter your Password').oneOf([Yup.ref('password')], "Passwords don't match"),
    phone: Yup.string().required('Please enter your Phone number').matches(/^01[0125][0-9]{8}$/, 'Must be a valid Egyptian number')
  });

  const mutation = useMutation({
    mutationFn: (values) => axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values),
    onSuccess: (data) => {
      console.log('Registration successful', data);
      setToken(data.data.token)
      setTheEmail(data.data.user.email)
      navigate('/')
    },
    onError: (error) => {
      console.error('Registration failed', error);
    }
  })

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: ''
    },
    validationSchema: schema,
    onSubmit: (values, { resetForm }) => {
      mutation.mutate(values, {
        onSuccess: () => {
          resetForm();
          console.log('Registration successful');
        }
      });
    }
  });

  return (
    <div className="container p-10 lg:px-32">
        <Helmet>
  <title>
    Register
  </title>
</Helmet>
      <h2 className="text-3xl font-semibold my-7">Register now:</h2>
      <form onSubmit={formik.handleSubmit}>
        {/* Start Name Field */}
        <div>
          <label htmlFor="name" className="block mb-1 text-lg font-thin text-black">Name:</label>
          <input name="name" {...formik.getFieldProps('name')} type="text" id="name" className="border border-gray-300 text-black text-sm rounded-lg focus:ring-green-500 focus:border-green-500 focus:outline-2 outline-green-400 block w-full p-2.5" required />
        {formik.errors.name && formik.touched.name ? <div className="p-4 mt-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
          <span className="font-medium">{formik.errors.name}</span>
        </div> : null}
        </div>

        {/* Start Email Field */}
        <div className="mt-3">
          <label htmlFor="email" className="block mb-1 text-lg font-thin text-black">Email:</label>
          <input name="email" {...formik.getFieldProps('email')} type="email" id="email" className="border border-gray-300 text-black text-sm rounded-lg focus:ring-green-500 focus:border-green-500 focus:outline-2 outline-green-400 block w-full p-2.5" required />
        {formik.errors.email && formik.touched.email ? <div className="p-4 mt-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
          <span className="font-medium">{formik.errors.email}</span>
        </div> : null}
        {mutation.isError && mutation.error?.response?.data?.message === "Account Already Exists" ? (
            <div className="p-4 mt-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
              <span className="font-medium">Account Already Exists</span>
            </div>) : null}
        
        </div>

        {/* Start Password Field */}
        <div className="mt-3">
          <label htmlFor="password" className="block mb-1 text-lg font-thin text-black">Password:</label>
          <input name="password" {...formik.getFieldProps('password')} type="password" id="password" className="border border-gray-300 text-black text-sm rounded-lg focus:ring-green-500 focus:border-green-500 focus:outline-2 outline-green-400 block w-full p-2.5" required />
        {formik.errors.password && formik.touched.password ? <div className="p-4 mt-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
          <span className="font-medium">{formik.errors.password}</span>
        </div> : null}
        </div>
        
        {/* Start rePassword Field */}
        <div className="mt-3">
          <label htmlFor="rePassword" className="block mb-1 text-lg font-thin text-black">Re-Password:</label>
          <input name="rePassword" {...formik.getFieldProps('rePassword')} type="password" id="rePassword" className="border border-gray-300 text-black text-sm rounded-lg focus:ring-green-500 focus:border-green-500 focus:outline-2 outline-green-400 block w-full p-2.5" required />
        {formik.errors.rePassword && formik.touched.rePassword ? <div className="p-4 mt-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
          <span className="font-medium">{formik.errors.rePassword}</span>
        </div> : null}
        </div>
        
        {/* Start Phone Field */}
        <div className="my-3">
          <label htmlFor="phone" className="block mb-1 text-lg font-thin text-black">Phone:</label>
          <input name="phone" {...formik.getFieldProps('phone')} type="tel" id="phone" className="border border-gray-300 text-black text-sm rounded-lg focus:ring-green-500 focus:border-green-500 focus:outline-2 outline-green-400 block w-full p-2.5" required />
        {formik.errors.phone && formik.touched.phone ? <div className="p-4 mt-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
          <span className="font-medium">{formik.errors.phone}</span>
        </div> : null}
        </div>
        
        {/* Start button Field */}
        <div className="text-end">
        <button
          disabled={mutation.isPending}
          type="submit"
          className=" bg-white text-green-700 border-green-700 border-2 group disabled:text-green-800 hover:bg-green-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium mt-3 rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 text-center duration-300"
        >
          {mutation.isPending ? <FaSpinner className="animate-spin group-hover:text-white"/> : 'Register now'}
        </button>
        </div>
      </form>
    </div>
  )
}