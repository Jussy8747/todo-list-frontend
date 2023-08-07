import {Link} from 'react-router-dom'

const Hero = () => {
  return (
    <div className="bgDiv">
       <div className="pt-44 flex flex-col justify-center items-center">
        

        <div className='mt-32'>
          <button className='w-52 h-16 text-white text-2xl 
          bg-blue-800 hover:bg-gray-700 text-gray-30 rounded-lg
          transition-all duration-200 ease-in
          mr-10'> 
          <Link to='/login'
          >Sign In </Link>
          </button>
       <button className='w-52 h-16 text-white text-2xl bg-green-800
        hover:bg-gray-700 text-gray-30 rounded-lg transition-all duration-200
         ease-in'>
       <Link to='/register'>Sign Up</Link>
       </button>
        </div>
       
       </div> 
   </div>
  )
}

export default Hero