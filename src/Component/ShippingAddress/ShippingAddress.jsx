import { useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { FaSpinner } from 'react-icons/fa6';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function ShippingAddress() {

  const {cartId} =useParams()
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const schema = Yup.object().shape({
    city: Yup.string().required('Please enter your city'),
    phone: Yup.string().required('Please enter your phone number'),
    details: Yup.string().required('Please enter details'),
  });

  const formik = useFormik({
    initialValues: {
      city: '',
      phone: '',
      details: ''
    },
    validationSchema: schema,
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true);
      setErrorMessage('');
      
      try {
        const response = await axios.post(
          'https://ecommerce.routemisr.com/api/v1/orders/checkout-session/'+ cartId,
          { ShippingAddress: values },
          {
            headers: {
              token: localStorage.getItem('token')
            },
            params: {
              url: 'http://localhost:5173'
            }
          }
        );

        console.log(response.data);
        if (response.data?.session?.url) {
          console.log(response.data.session.url);
          location.href =response.data.session.url
        } else {
          console.error('Session or URL not found in the response.');
        }

        resetForm();
        console.log('Form submitted successfully');
      } catch (error) {
        console.error(error);
        setErrorMessage(error.response?.data?.message || 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    }
  });

  return (
    <div className="container p-16">
        <Helmet>
    <title>
    Shipping Address
    </title>
  </Helmet>
      <h2 className="text-3xl font-semibold my-7">Add your Shipping Address</h2>
      {errorMessage && (
        <div className="p-4 mt-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
          <span className="font-medium">{errorMessage}</span>
        </div>
      )}
      <form onSubmit={formik.handleSubmit}>
        {/* City Field */}
        <div className="mt-3">
          <label htmlFor="city" className="block mb-1 text-lg font-thin text-black">City:</label>
          <input
            name="city"
            {...formik.getFieldProps('city')}
            type="text"
            id="city"
            className="border border-gray-300 text-black text-sm rounded-lg focus:ring-green-500 focus:border-green-500 focus:outline-2 outline-green-400 block w-full p-2.5"
            required
          />
          {formik.errors.city && formik.touched.city ? (
            <div className="p-4 mt-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
              <span className="font-medium">{formik.errors.city}</span>
            </div>
          ) : null}
        </div>

        {/* Details Field */}
        <div className="mt-3">
          <label htmlFor="details" className="block mb-1 text-lg font-thin text-black">Details:</label>
          <input
            name="details"
            {...formik.getFieldProps('details')}
            type="text"
            id="details"
            className="border border-gray-300 text-black text-sm rounded-lg focus:ring-green-500 focus:border-green-500 focus:outline-2 outline-green-400 block w-full p-2.5"
            required
          />
          {formik.errors.details && formik.touched.details ? (
            <div className="p-4 mt-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
              <span className="font-medium">{formik.errors.details}</span>
            </div>
          ) : null}
        </div>

        {/* Phone Field */}
        <div className="mt-3">
          <label htmlFor="phone" className="block mb-1 text-lg font-thin text-black">Phone:</label>
          <input
            name="phone"
            {...formik.getFieldProps('phone')}
            type="tel"
            id="phone"
            className="border border-gray-300 text-black text-sm rounded-lg focus:ring-green-500 focus:border-green-500 focus:outline-2 outline-green-400 block w-full p-2.5"
            required
          />
          {formik.errors.phone && formik.touched.phone ? (
            <div className="p-4 mt-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
              <span className="font-medium">{formik.errors.phone}</span>
            </div>
          ) : null}
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-between mt-3">
          <button
            disabled={isLoading}
            type="submit"
            className="bg-white text-green-700 border-green-700 border-2 group disabled:text-green-800 hover:bg-green-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium mt-3 rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 text-center duration-300"
          >
            {isLoading ? <FaSpinner className="animate-spin group-hover:text-white" /> : 'Check out'}
          </button>
        </div>
      </form>
    </div>
  );
}
