import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import {  useForgetPasswordMutation, useResetPasswordMutation} from '../slices/AuthUserSlice'
import { toast } from "react-toastify"

const ForgetPassword = () => {
const [nextThing, setNextthing] = useState(false)
const [email, setEmail] = useState('')
const [token, setToken] = useState('')

const [forgetPassword, { isLoading: isLoadingForget }] = useForgetPasswordMutation();
const [resetPassword, {  isLoading: isLoadingReset }] = useResetPasswordMutation();

const nav = useNavigate()


const handleSubmit = async (e)=>{
    e.preventDefault()
    try {
    await forgetPassword({email}).unwrap()
     setNextthing(true) 
     setEmail('')  
    } catch (error) {
     (error); 
    }
}

const handleResetPaswors = async(e)=>{
    e.preventDefault()
    if(token == ''){
        toast.error('Enter the token sent to your email')
    }
    try {
        const reset = await resetPassword({token}).unwrap()  
        if(reset){
            const {userId} = reset
            nav(`/reset-password/${userId}`)
        } 
        } catch (error) {
        toast.error(error.data.message); 
        }
    
}

if(nextThing){
    return (
        <div>
            <div className="h-screen flex flex-col justify-center items-center ">
    <div className="w-96 relative">
    <p className="text-xl text-center">Enter the token we sent to Email Address to reset your password</p>
    <form className="flex flex-col mb-4" onSubmit={handleResetPaswors}>

        <input type="number" name="forgetpassword" placeholder="enter your token"
        className="w-full h-12 my-6 focus:outline-1 outline-gray-500 p-4 text-xl
        border border-gray-300"
        value={token} onChange={(e)=>setToken(e.target.value)}/>

        <button type="submit" className="w-full bg-gray-500 h-12 rounded-lg
        hover:bg-gray-400  transition-all ease-in duration-300 text-xl
        text-white">{isLoadingReset ? 'wait...' : 
        ('Reset')}</button>
    </form>
    </div>
   
    </div>
        </div>
    )
}else{
  return (
    <div className="h-screen flex flex-col justify-center items-center ">
    <h1 className="text-4xl font-bold py-5">Reset Your Password </h1>
    <div className="w-96 relative">
    <p className="text-xl text-center">Enter Your Email Address we Will Send Instruction To Reset Your Password</p>
    <form className="flex flex-col mb-4" onSubmit={handleSubmit}>

        <input type="email" name="forgetpassword" placeholder="enter your email"
        className="w-full h-12 my-6 focus:outline-1 outline-gray-500 p-4 text-xl"
       value={email} onChange={(e)=>setEmail(e.target.value)}/>

        <button type="submit" className="w-full bg-gray-500 h-12 rounded-lg
        hover:bg-gray-400  transition-all ease-in duration-300 text-xl
        text-white">{isLoadingForget ? 'wait...' : 
        ('Continue')}</button>

    </form>
    <Link to='/' className=" absolute right-0 font-bold text-xl text-gray-600">Go Back..</Link>
    </div>
   
    </div>
  )}
}

export default ForgetPassword