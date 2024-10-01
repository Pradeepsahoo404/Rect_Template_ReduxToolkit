import React from 'react'
import { useState , useEffect } from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import LandingIntro from './LandingIntro'
import ErrorText from '../../components/Typography/ErrorText'
import { verifyForgetPassword } from '../auth/authAction'
import { Link, useNavigate , useParams} from 'react-router-dom'

const VerifyForgetPassword = () => {
    const {loading , userInfo , message , error , success} = useSelector(state => state.auth)

    const {resetToken} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const { register , handleSubmit , formState : {errors}} = useForm()
    
    useEffect(()=>{
      if(success){
        navigate('/app/dashboard')
      }
    } , [success])
    
    const submitForm = (data)=>{
      console.log(resetToken , "resetToken")
      const { password, confirmPassword } = data;
      if(resetToken){
        dispatch(verifyForgetPassword({
          newPassword: password,
          confirmPassword: confirmPassword,
          resetToken: resetToken
        }))

      }
      
    
    }
  return (
    <div className="min-h-screen bg-base-200 flex items-center">
      <div className="card mx-auto w-full max-w-5xl shadow-xl">
        <div className="grid md:grid-cols-2 grid-cols-1 bg-base-100 rounded-xl">
          <div className=''>
            <LandingIntro />
          </div>
          <div className='py-24 px-10'>
            <h2 className='text-2xl font-semibold mb-2 text-center'>Re-set Password</h2>
            <form onSubmit={handleSubmit(submitForm)}>
              <div className="mb-4">
                <div className='flex flex-col justify-center mt-4'>
                  <label htmlFor='password' className='mb-2'>New Password</label>
                  <input
                    type='password'
                    id='password'
                    className='input input-bordered input-primary w-full max-w-xl'
                    {...register('password', { required: 'New Password is required' })}
                  />
                  {errors.password && <span className='text-red-600'>{errors.password.message}</span>}
                </div>

                <div className='flex flex-col justify-center mt-4'>
                  <label htmlFor='confirmPassword' className='mb-2'>Confirm Password</label>
                  <input
                    type='text'
                    id='confirmPassword'
                    className='input input-bordered input-primary w-full max-w-xl'
                    {...register('confirmPassword', { required: 'Confirm Password is required' })}
                  />
                  {errors.confirmPassword && <span className='text-red-600'>{errors.confirmPassword.message}</span>}
                </div>
              </div>

              <ErrorText styleClass="mt-8">{error}</ErrorText>
              <button type="submit" className={"btn mt-2 w-full btn-primary" + (loading ? " loading" : "")}>Create</button>

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
  )
}

export default VerifyForgetPassword
