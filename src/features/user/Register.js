import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import LandingIntro from "./LandingIntro";
import ErrorText from "../../components/Typography/ErrorText";
import { registerUser } from "../auth/authAction.js";

function Register() {
  const { loading, userInfo,message , error, success } = useSelector((state) => state.auth);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    if (userInfo) {
      navigate('/app/dashboard');
    }
    if (success) {
      navigate('/login');
    }
  }, [navigate, userInfo, success]);

  const submitForm = (data) => {
    dispatch(registerUser(data));
  }

  return (
    <div className="min-h-screen bg-base-200 flex items-center">
      <div className="card mx-auto w-full max-w-5xl shadow-xl">
        <div className="grid md:grid-cols-2 grid-cols-1 bg-base-100 rounded-xl">
          <div className="">
            <LandingIntro />
          </div>
          <div className="py-24 px-10">
            <h2 className="text-2xl font-semibold mb-2 text-center">Register</h2>
            <form onSubmit={handleSubmit(submitForm)}>
              <div className="mb-4">
             

                <div className='flex flex-col justify-center mt-4'>
                  <label htmlFor='name' className='mb-2'>Name</label>
                  <input
                    type='text'
                    id='name'
                    // className='w-full py-2 px-3 mb-3 border rounded border-gray-400'
                    className='input input-bordered input-primary w-full max-w-xl'
                    {...register('name', { required: 'Name is required' })}
                  />
                  {errors.name && <span className='text-red-600'>{errors.name.message}</span>}
                </div>

                <div className='flex flex-col justify-center mt-4'>
                  <label htmlFor='mobile' className='mb-2'>Mobile</label>
                  <input
                    type='text'
                    id='mobile'
                    className='input input-bordered input-primary w-full max-w-xl'
                    {...register('mobile', { required: 'Mobile number is required' })}
                  />
                  {errors.mobile && <span className='text-red-600'>{errors.mobile.message}</span>}
                </div>

                <div className='flex flex-col justify-center mt-4'>
                  <label htmlFor='email' className='mb-2'>Email</label>
                  <input
                    type='email'
                    id='email'
                    className='input input-bordered input-primary w-full max-w-xl'
                    {...register('email', { required: 'Email is required' })}
                  />
                  {errors.email && <span className='text-red-600'>{errors.email.message}</span>}
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

              <ErrorText styleClass="mt-8">{error}</ErrorText>
              <button
                type="submit"
                className={`btn mt-2 w-full btn-primary ${loading ? "loading" : ""}`}
              >
                Register
              </button>

              <div className="text-center mt-4">
                Already have an account?{" "}
                <Link to="/login">
                  <span className="inline-block hover:text-primary hover:underline cursor-pointer transition duration-200">
                    Login
                  </span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
