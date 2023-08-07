import {Link, useNavigate} from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLoginMutation, } from '../slices/AuthUserSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import {login} from '../slices/authSlice.js'
import '../styles/Home.scss'
import { toast } from 'react-toastify';

const Home = () => {

  const [formData, setFormData] = useState({
    
    email: '',
    password:'',
  
  })

  const { email, password,} = formData 

 
  const nav = useNavigate()
  const dispatch = useDispatch()
  const {userInfo} = useSelector((state)=> state.auth)

  const [signin, {isLoading} ] = useLoginMutation()
  // const {isLoading: Facebook, refetch} = useLoginWithFacebookQuery()
  // const {isLoading: google, refetch: googleRefetch} = useLoginWithGoogleQuery()

  const handleChange = (e)=>{
    const {name, value} = e.target
    setFormData({
      ...formData,
      [name]: value
    })
   
  }


  useEffect(()=>{
    if(userInfo){
      nav('/mainpage')
    }
  }, [nav, userInfo])

  const handleSubmit = async (e) =>{
    e.preventDefault()

      try {
       const res =  await signin({ email, password}).unwrap()
       dispatch(login({...res}))
    
       toast.success(`welcome ${userInfo.name}`, {
        position: 'top-center', // Set the position of the toast
        autoClose: 5000, // Time in milliseconds after which the toast will automatically close
        hideProgressBar: false, // Set to true to hide the progress bar
        closeOnClick: true, // Set to true to close the toast when clicked
        pauseOnHover: true, // Set to true to pause the timer when hovering over the toast
        draggable: true, // Set to true to make the toast draggable
      });
      } catch (err) {
      toast.error(err,  {
        autoClose: 2000, // Time in milliseconds after which the toast will automatically close // Set to true to make the toast draggable
      });
      }
  }

  const handleFacebookLogin = async() =>{
    window.location.href = 'http://localhost:5000/users/auth/facebook'
  }

  const handleGoogleLogin = async() =>{
    window.location.href = 'http://localhost:5000/users/auth/google'
 
  }



  return ( 
     
     <div className="bgDiv h-full w-full">
    <div className="flex flex-col justify-center items-center">
     <form onSubmit={handleSubmit} className="loginForm">
    <h1 className=" text-3xl text-white py-8
    ">Hi Dear! welcome to this TodoApp created by Justice.
     input your details to continue</h1>
      
       
       <div className="mb-5">
       <input type="text" name="email" placeholder="Enter Your Email" 
       onChange={handleChange} value={email}/>
       </div>
      
      <div className="mb-5">
       <input type="password" name="password" placeholder="Enter Your Password" 
      onChange={handleChange} value={password}/>
      </div>
      
       <Link className=" pl-3 text-gray-100 w-72
         text-2xl cursor-pointer hover:text-gray-300 transition-all ease-in duration-300"
         to='/forgetPassword' >Forgotten Password?</Link>

      {isLoading ?    <span className="loader mx-auto my-7"></span> : (
        <>
        <button type="submit" className="bg-gray-700 mt-5 text-white
       hover:bg-gray-500  transition-all ease-in duration-200 inputButton">Continue</button>

      </>
      ) }
        
        <p className="py-5 text-center text-white text-xl pr-3">Dont&apos;t have an account?<Link to='/register'
         className='text-2xl pl-2 text-gray-100 font-bold hover:text-gray-400'>Sign Up</Link></p>

         
       <div className='flex justify-center items-center'>
        <hr className='text-gray-900 w-2/5' />
        <span className='text-white text-xl px-4 font-bold'>OR</span>
        <hr className='bg-gray-800 w-2/5'/>
       </div>
        

         <div className="otherButton bg-white my-4 text-black
         hover:bg-gray-600 hover:text-white transition-all ease-in
          duration-300 flex items-center ">
          <FontAwesomeIcon icon={faGoogle} style={{ color: '#DB4437' }} /> 
        <button type="button"  className='w-'
         onClick={ handleGoogleLogin}>
                Continue with Google</button>
                </div>
     
                <div className="otherButton bg-white my-4 text-black
         hover:bg-gray-600 hover:text-white transition-all ease-in
          duration-300 flex items-center ">
              <FontAwesomeIcon icon={faFacebook} style={{ color: '#3b5998' }} />
       <button type="button" className=""
        onClick={handleFacebookLogin}>
            Continue with Facebook</button>
            </div>
     </form>
    </div>
   </div>
  )
}

export default Home