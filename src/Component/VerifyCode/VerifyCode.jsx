import { useMutation } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup'
import { EmailContext } from "../../Contexts/EmailContext";
import axios from "axios";
import { useFormik } from "formik";
import { FaSpinner } from "react-icons/fa6";
import { AuthContext } from "../../Contexts/AuthenticationContext";

export default function VerifyCode() {
  const navigate =useNavigate();
  const {token} =useContext(AuthContext);
  const {theEmail} =useContext(EmailContext);
  const schema = Yup.object().shape({
    code: Yup.string().required('Please enter the verification code')
  });

  const mutation = useMutation({
    mutationFn: (values) => axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', { resetCode: values.code }),
    onSuccess: (data) => {
      console.log('Reset Successfully', data);
      navigate('/ResetAccount')
    },
    onError: (error) => {
      console.error('Wrong Code', error);
    }
  })

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);
  const formik = useFormik({
    initialValues: {
      code: '',
    },
    validationSchema: schema,
    onSubmit: (values, { resetForm }) => {
      console.log('Submitting values:', values);
      mutation.mutate(values, {
        onSuccess: () => {
          resetForm();
          console.log('successful');
        }
      });
    }
  });
  return (
    <div className='container p-10'>
      <form onSubmit={formik.handleSubmit}>
      <h2 className="text-3xl font-semibold my-7">Verify the Code Sent to this Email : <span className="text-green-500">{theEmail}</span></h2>
      {mutation.isError && mutation.error?.response?.statusText === "Bad Request" ? (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 mt-3" role="alert">
              <span className="font-medium">Wrong Code</span>
            </div>) : null}
      {mutation.isError && mutation.error?.response?.data?.statusMsg === "error" ? (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 mt-3" role="alert">
              <span className="font-medium">Wrong Code</span>
            </div>) : null}
        {/* Start code Field */}
        <div className="mt-3">
          <label htmlFor="code" className="block mb-1 text-lg font-thin text-black">Code:</label>
          <input name="code" {...formik.getFieldProps('code')} type="text" id="Code" className="border border-gray-300 text-black text-sm rounded-lg focus:ring-green-500 focus:border-green-500 focus:outline-2 outline-green-400 block w-full p-2.5" required />        </div>
          <button
          disabled={mutation.isPending}
          type="submit"
          className=" bg-white text-green-700 border-green-700 border-2 group disabled:text-green-800 hover:bg-green-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium mt-3 rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 text-center duration-300"
        >
          {mutation.isPending ? <FaSpinner className="animate-spin group-hover:text-white"/> : 'Verify'}
        </button>
        </form>
    </div>
  )
}
