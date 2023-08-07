import {Link, useNavigate} from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRegisterMutation} from '../slices/AuthUserSlice'
import {setUserInfo} from '../slices/authSlice.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import {toast} from 'react-toastify'
const SignUp = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password:'',
    confirm_password :''
  })

  const {name, email, password, confirm_password} = formData 

  const dispatch = useDispatch()
  const nav = useNavigate()

  const {userInfo} = useSelector((state)=> state.auth)

  const [register, { isLoading} ] = useRegisterMutation()

  const handleChange = (e)=>{
    const {name, value} = e.target
    setFormData({
      ...formData,
      [name]: value
    })
   
  }


  useEffect(()=>{
    if(userInfo){
      nav('/')
    }
  }, [nav, userInfo])

  const handleSubmit = async (e) =>{
    e.preventDefault()
    if(password === confirm_password){
      try {
        const res = await register({name, email, password}).unwrap()
        dispatch(setUserInfo({...res}))
        toast.success('Successfully ', {
          autoClose: 1000, // Time in milliseconds after which the toast will automatically close // Set to true to make the toast draggable
        })
        nav('/')
      } catch (err) {
        toast.error(err);
      }

    }else{
      toast.error('invalide User credentails');
    }
  }

  const handleGoogleLogin = async() =>{
    window.location.href = 'http://localhost:5000/users/auth/google'

  }
  const handleFacebookLogin = async() =>{
    window.location.href = 'http://localhost:5000/users/auth/facebook'
  }

  return (
    <div className="bgDiv h-full w-full">
     <div className="flex justify-center items-center container">
      <form onSubmit={handleSubmit} className="loginForm">

        <div className="my-7 opacity-100">
        <input type="text" name="name" placeholder="Enter You Name" 
        value={name} onChange={handleChange} required/>
        </div>
        
        <div className="mb-5 opacity-100">
        <input type="email" name="email" placeholder="Enter Your Email" 
        value={email} onChange={handleChange} required/>
        </div>
       
       <div className="mb-5">
        <input  required type="password" name="password" placeholder="Enter Your Password" 
       value={password} onChange={handleChange} />
       </div>
        
        <div className="mb-5">
        <input  required type="password" name="confirm_password" placeholder="Conform Password"
        value={confirm_password} onChange={handleChange}/>
        </div>
       
        {isLoading ?    <span className="loader mx-auto my-7"></span> : (
           <button type="submit" className="bg-gray-700 mt-3
           hover:bg-gray-500  transition-all ease-in duration-200
            text-white inputButton"
           >Submit</button>
   

        )}
       
       
        <p className='py-5 text-center text-white text-xl pr-3'>
          Already have an account?   <Link to='/'
          className='text-2xl pl-2 text-gray-100 font-bold
           hover:text-gray-400'>Sign in</Link></p>
      
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
                Register with Google</button>
                </div>
     
                <div className="otherButton bg-white my-4 text-black
         hover:bg-gray-600 hover:text-white transition-all ease-in
          duration-300 flex items-center ">
              <FontAwesomeIcon icon={faFacebook} style={{ color: '#3b5998' }} />
       <button type="button" className=""
        onClick={handleFacebookLogin}>
            Register with Facebook</button>
            </div>

      
      </form>
   
   
      </div>
    </div>
  )
}

export default SignUp