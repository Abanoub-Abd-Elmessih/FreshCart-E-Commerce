import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useFormik } from 'formik';
import { FaSpinner } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import * as Yup from'yup'
import { EmailContext } from '../../Contexts/EmailContext';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../Contexts/AuthenticationContext';
import { Helmet } from 'react-helmet';
export default function ForgetPassword() {
  const navigate =useNavigate();
  const {setTheEmail } =useContext(EmailContext);
  const {token } =useContext(AuthContext);
  const schema = Yup.object().shape({
    email: Yup.string().required('Please enter your Email').email('Must be valid Email'),
  });

  const mutation = useMutation({
    mutationFn: (values) => axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', values),
    onSuccess: (data) => {
      console.log('Code Send Successfully', data);
      navigate('/verifyCode')
      setTheEmail(formik.values.email)
    },
    onError: (error) => {
      console.error('failed sending the Code', error);
    }
  })

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: schema,
    onSubmit: (values, { resetForm }) => {
      mutation.mutate(values, {
        onSuccess: () => {
          resetForm();
          console.log('Send successful');
        }
      });
    }
  });
  return (
    <div className='container p-10'>
        <Helmet>
  <title>
    forget password
  </title>
</Helmet>
      <form onSubmit={formik.handleSubmit}>
      <h2 className="text-3xl font-semibold my-7">Please enter your email for verification :</h2>
      {mutation.isError && mutation.error?.response?.statusText === "Not Found" ? (
            <div className="p-4 mt-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
              <span className="font-medium">There is no user registered with this email address</span>
            </div>) : null}
        {/* Start Email Field */}
        <div className="mt-3">
          <label htmlFor="email" className="block mb-1 text-lg font-thin text-black">Email:</label>
          <input name="email" {...formik.getFieldProps('email')} type="email" id="email" className="border border-gray-300 text-black text-sm rounded-lg focus:ring-green-500 focus:border-green-500 focus:outline-2 outline-green-400 block w-full p-2.5" required />
          {formik.errors.email && formik.touched.email ? <div className="p-4 mt-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
          <span className="font-medium">{formik.errors.email}</span>
          </div> : null}
        </div>
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
