import {useState, useEffect} from 'react'
import { useForm } from 'react-hook-form'
import { useSelector , useDispatch } from 'react-redux'
import {Link , useNavigate} from 'react-router-dom'
import LandingIntro from './LandingIntro'
import ErrorText from  '../../components/Typography/ErrorText'
import CheckCircleIcon  from '@heroicons/react/24/solid/CheckCircleIcon'
import { forgetPassword } from '../auth/authAction'

function ForgotPassword(){

    const {loading , userInfo , message , error , success} = useSelector((state)=>state.auth)
    console.log(message)
    console.log(success)
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { register , handleSubmit , formState : {errors}} = useForm();



   const [linkSent, setLinkSent] = useState(false)
   const [printMessage , SetPrintMessage] = useState('')

    useEffect(()=>{
        
       if(success){
        setLinkSent(true)
        SetPrintMessage(message)
       } 
       return () => setLinkSent(false);
    }, [success]);
  

    const submitForm = (data)=>{
        dispatch(forgetPassword(data))
    }

    return(
        <div className="min-h-screen bg-base-200 flex items-center">
            <div className="card mx-auto w-full max-w-5xl  shadow-xl">
                <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
                <div className=''>
                        <LandingIntro />
                </div>
                <div className='py-24 px-10'>
                    <h2 className='text-2xl font-semibold mb-2 text-center'>Forgot Password</h2>

                    {
                        linkSent && 
                        <>
                            <div className='text-center mt-8'><CheckCircleIcon className='inline-block w-32 text-success'/></div>
                            <p className='my-4 text-xl font-bold text-center'>Link Sent</p>
                            <p className='mt-4 mb-8 font-semibold text-center'>{`${printMessage}Check your email to reset password`}</p>
                            <div className='text-center mt-4'><Link to="/login"><button className="btn btn-block btn-primary ">Login</button></Link></div>

                        </>
                    }

                    {
                        !linkSent && 
                        <>
                            <p className='my-8 font-semibold text-center'>We will send password reset link on your email Id</p>
                            <form onSubmit={handleSubmit(submitForm)}>

                                <div className="mb-4">

                                <div className='flex flex-col justify-center mt-4'>
                                    <label htmlFor='email' className='mb-2'>Email</label>
                                    <input
                                        type='email'
                                        id='email'
                                        // className='w-full py-2 px-3 mb-3 border rounded border-gray-400'
                                        className='input input-bordered input-primary w-full max-w-xl'
                                        {...register('email', { required: 'email is required' })}
                                    />
                                    {errors.emial && <span className='text-red-600'>{errors.emial.message}</span>}
                                </div>

                                </div>

                                <ErrorText styleClass="mt-12">{error}</ErrorText>
                                <button type="submit" className={"btn mt-2 w-full btn-primary" + (loading ? " loading" : "")}>Send Reset Link</button>

                                <div className='text-center mt-4'>Don't have an account yet? <Link to="/register"><button className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Register</button></Link></div>
                            </form>
                        </>
                    }
                    
                </div>
            </div>
            </div>
        </div>
    )
}

export default ForgotPassword