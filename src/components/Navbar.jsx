import { FaBars} from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import {setHandBars, } from '../slices/localState.js'


const Navbar = () => {


  

  const {searchTodo2, searchTodo, selectedDay, showHandbars} = useSelector((state)=>state.localState)
  const dispatch = useDispatch()

  
 

  const handleHandburger = () =>{
    dispatch(setHandBars(!showHandbars))
    const left = document.getElementsByClassName('leftSection')[0];
    if (left) {
      left.classList.toggle('hidden', showHandbars); // You can define the "show-sidebar" class in CSS/SCSS to control how the left section behaves when shown/hidden
    }

  }

  return (

  <nav className="block sm:hidden bg-gray-700  fixed top-0 left-0 right-0 z-30">
    <div className="container mx-auto h-16 flex justify-between items-center pr-6
    text-2xl text-white">
        <div className="flex">
      <div className="ml-3" onClick={handleHandburger}>
        {!showHandbars && <FaBars className="text-4xl"/> }
      </div>

      
     
        </div>
        


          <div>

          {searchTodo2 || searchTodo ? <h2 className=' text-gray-400 pl-6 pt-2 '>
       Search Result</h2> : <h2 className=' text-gray-400 pl-6 pt-2'>
        {selectedDay} Todos </h2>}
            </div>

  
    </div>
  </nav>
  )
}

export default Navbar