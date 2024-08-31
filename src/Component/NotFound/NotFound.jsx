import { Helmet } from 'react-helmet'
import error404 from '../../assets/imgs/404.png'
export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
        <Helmet>
  <title>
    NotFound
  </title>
</Helmet>
      <img src={error404} alt='error photo' />
      <p className='text-3xl font-bold text-green-500'>Page Not Found</p>
    </div>
  )
}
