import {
    setShowAddTodo,
    setTodoId,
    setSelectedDay,
    setSearchTodoItem,
    setSearchTodo,
    setHandBars
} from '../slices/localState.js'
import { SetTodo } from '../slices/TodoSlice.js';
import { useEffect } from 'react';
import {FaPlus, FaCalendarDay} from 'react-icons/fa';
import { logout } from "../slices/authSlice"
import { useDispatch, useSelector } from 'react-redux'
import {useSearchTodoQuery,} from '../slices/TodoApiSlice.js'
import { useLogoutMutation} from '../slices/AuthUserSlice.js'
import { toast } from 'react-toastify';




const LeftSection = () => {

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let today = new Date().getDay()
    const {profileInfo} = useSelector((state)=>state.auth)
  

    const {showAddTodo, searchTodo, showHandbars} = useSelector((state)=>state.localState)
      
      
      const dispatch = useDispatch()
      const { data: search } = useSearchTodoQuery(searchTodo);
    const [logOut] = useLogoutMutation()


    const handleNextButton = (e)=>{
        e.preventDefault();
        dispatch(setShowAddTodo(!showAddTodo))
      dispatch(setTodoId(1))
      dispatch(setHandBars(!showHandbars))
      const left = document.getElementsByClassName('leftSection')[0];
      if (left) {
          left.classList.toggle('hidden', showHandbars); // You can define the "show-sidebar" class in CSS/SCSS to control how the left section behaves when shown/hidden
      }
    }

    const handleSearch =(e)=>{
        dispatch(setSearchTodo(e.target.value)) 
        dispatch(setSearchTodoItem([...search]))
        }

        const handlelogout = async ()=>{
            try {
               await fetch('users/auth/logout') 
                await logOut().unwrap()
                dispatch(logout())
                dispatch(SetTodo(null))
                toast.success('logged out', {
                    autoClose: 1000, 
                  })
            } catch (error) {
                toast.error(error)
            }  
        }

        useEffect(()=>{
            searchTodo.length > 0 && dispatch(setSearchTodoItem(search))
          }, [searchTodo, dispatch,  search])
  

  return (
   
    <div className="hidden w-72 absolute top-0 z-50 bg-gray-800
    sm:z-0 sm:top-0 sm:block sm:shrink-0 sm:w-80 h-screen
     sm:bg-gray-700 sm:relative
    leftSection" style={{
        '@media (max-width: 640px)': {
            backgroundColor: 'rgba(31, 41, 55, 0.7)'
        }
    }}>
    

    <div className='w-full absolute top-0 border-b-2 pb-4 h-44'>
    
        <div className='h-12 rounded-lg w-11/12 hover:bg-gray-500
                mx-auto text-white text-xl flex items-center mt-8 pl-2
             border border-gray-500' onClick={handleNextButton}>
            <FaPlus className='mr-3'/> New Todo
        </div>

        <div >
             <input type="text" name='searchTodo' placeholder='search todos'
             className='h-12 rounded-lg w-11/12 bg-gray-300 hover:bg-gray-500
             mx-auto text-gray-800 text-xl flex items-center mt-8 pl-2
          border border-gray-500 focus:outline-none' value={searchTodo} onChange={handleSearch}/>
        </div>
    
    </div>
    
    
    <div className='mt-44 overflow-hidden '>

        {!showHandbars && (
             <div className='mt-2'>
             <p className='text-gray-400 pl-7 py-2 text-xl'>Today</p>
             <div className='h-12 rounded-lg w-11/12 hover:bg-gray-500
                     mx-auto text-white text-xl flex items-center pl-3'
                  onClick={()=> dispatch(setSelectedDay(daysOfWeek[today]))}   >
                 {`${daysOfWeek[today]}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`}</div>
            </div>
         
        )}

            {daysOfWeek.map(day=>{
                if(day !== daysOfWeek[today]){
                    return (
                        <div key={day} className='h-12 rounded-lg w-11/12 hover:bg-gray-500
                    mx-auto text-white text-xl flex items-center mt-3 pl-2
                 border border-gray-500' onClick={()=>{
                  dispatch(setSelectedDay(day))
                 }}>
                <FaCalendarDay className='mr-3'/> { day }
                </div>
                )
                }else if(showHandbars){
                  return   (
                    <div key={day} className='h-12 rounded-lg w-11/12 hover:bg-gray-500
                mx-auto text-white text-xl flex items-center mt-3 pl-2
             border border-gray-500' onClick={()=>{
              dispatch(setSelectedDay(day))
             }}>
            <FaCalendarDay className='mr-3'/> { day }
            </div>
            )
                }
            })}
       
    
       
     </div>
    
       
    
        <div className="flex-0 flex flex-col absolute h-38 w-full bg-gray-700 gap-2 sm:mb-3
        bottom-0 sm:bottom-2 border-t-2 pt-2 pb-4">
        <div className="h-12 rounded-lg w-11/12 hover:bg-gray-500
        mx-auto text-white text-xl flex items-center justify-center border 
        border-gray-500" onClick={handlelogout}>Log Out</div>
        
        <div className="h-12 rounded-lg w-11/12 hover:bg-gray-500
        mx-auto text-white text-xl flex items-center pl-4">
            <div className="bg-red-500 w-9 text-center rounded h-9 mr-3">
                {profileInfo?.name.slice(0,3)}</div>
            {profileInfo?.email.slice(0,15)}</div>
        </div>
        {showHandbars && <div className='absolute top-0 left-72 w-12 h-12
            border-4 ml-2 mt-2 flex justify-center items-center'
            onClick={()=>{
            dispatch(setHandBars(!showHandbars))
            const left = document.getElementsByClassName('leftSection')[0];
            if (left) {
                left.classList.toggle('hidden', showHandbars); // You can define the "show-sidebar" class in CSS/SCSS to control how the left section behaves when shown/hidden
            }
            }}> 
            <h1 className=" text-2xl text-white font-bold ">X</h1>
            </div>}
    </div>
           
  )
}

export default LeftSection