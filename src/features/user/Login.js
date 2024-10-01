import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import LandingIntro from './LandingIntro';
import ErrorText from '../../components/Typography/ErrorText';
import { userLogin } from '../auth/authAction';

function Login() {
  const { loading, userInfo, message, error, success, userToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();


 useEffect(() => {
    // Check for token in local storage or redirect after successful login
    const token = localStorage.getItem('userToken');
    if (token) {
      navigate('/app/dashboard');
    } else if (userInfo) {
      navigate('/app/dashboard');
    }
  }, [navigate, userInfo]);


  const submitForm = (data) => {
    dispatch(userLogin(data));
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center">
      <div className="card mx-auto w-full max-w-5xl shadow-xl">
        <div className="grid md:grid-cols-2 grid-cols-1 bg-base-100 rounded-xl">
          <div className=''>
            <LandingIntro />
          </div>
          <div className='py-24 px-10'>
            <h2 className='text-2xl font-semibold mb-2 text-center'>Login</h2>
            <form onSubmit={handleSubmit(submitForm)}>
              <div className="mb-4">
                <div className='flex flex-col justify-center mt-4'>
                  <label htmlFor='mobile' className='mb-2'>Mobile No</label>
                  <input
                    type='text'
                    id='mobile'
                    className='input input-bordered input-primary w-full max-w-xl'
                    {...register('mobile', { required: 'Mobile No is required' })}
                  />
                  {errors.mobile && <span className='text-red-600'>{errors.mobile.message}</span>}
                </div>

                <div className='flex flex-col justify-center mt-4'>
                  <label htmlFor='password' className='mb-2'>Password</label>
                  <input
                    type='password'
                    id='password'
                    className='input input-bordered input-primary w-full max-w-xl'
                    {...register('password', { required: 'Password is required' })}
                  />
                  {errors.password && <span className='text-red-600'>{errors.password.message}</span>}
                </div>
              </div>

              <div className='text-right text-primary'>
                <Link to="/forgot-password">
                  <span className="text-sm inline-block hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Forgot Password?</span>
                </Link>
              </div>

              <ErrorText styleClass="mt-8">{error}</ErrorText>
              <button type="submit" className={"btn mt-2 w-full btn-primary" + (loading ? " loading" : "")}>Login</button>

              <div className='text-center mt-4'>Don't have an account yet? 
                <Link to="/register">
                  <span className="inline-block hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Register</span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
