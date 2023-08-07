import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useReset_passwordMutation } from "../slices/AuthUserSlice"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"


const ResetPassword = () => {

    const [formData, setFormData] = useState({
        new_password:"", 
        confirm_password:""
    })
    const {userId} = useParams()

    const {new_password, confirm_password} = formData
    const nav = useNavigate()
    const [reset, {isLoading}] = useReset_passwordMutation()

    const handlechange = (e)=>{
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()
        if(new_password !== confirm_password){
            toast.error('password didnt match');
        }

        try {
            const cleanedId = userId.replace(':', '');
            const data = {
                userId : cleanedId,
                password: new_password,
            }
             ();
            await reset({...data}).unwrap()
            toast.success('Password Resetted', {
                autoClose: 1000
            })
            nav('/')
        } catch (error) {
        toast.error('field to reset password')
        }
        
    }


  return (
    <div>
        <div className="h-screen flex flex-col justify-center items-center ">
    <div className="w-96 relative">
    <h1>Create New Password</h1>
    <form className="flex flex-col mb-4" onSubmit={handleSubmit}>

        <input type="password" name="new_password" placeholder="Enter New Password" 
        className="w-full h-12 my-6 focus:outline-1 outline-gray-500 p-4 text-xl
        border border-gray-300" value={new_password} onChange={handlechange}/>

        <input type="password" name="confirm_password"  placeholder="Confirm New Password"
        className="w-full h-12 my-6 focus:outline-1 outline-gray-500 p-4 text-xl
        border border-gray-300" value={confirm_password} onChange={handlechange}/>

        <button type="submit" className="w-full bg-gray-500 h-12 rounded-lg
        hover:bg-gray-400  transition-all ease-in duration-300 text-xl
        text-white">{isLoading ? ( <span className="loader mx-auto my-7"></span>) : 
        ('Reset')}</button>
    </form>
    </div>
   
    </div>
    </div>
  )
}

export default ResetPassword