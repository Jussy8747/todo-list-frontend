import {
setShowAddTodo,
setTodoText,
setSelectedDay,
setShowSelectDay
}from '../slices/localState.js'

import { useDispatch, useSelector } from 'react-redux'
import {useAddTodoMutation} from '../slices/TodoApiSlice'
import { toast } from 'react-toastify';

const ShowAddTodo = () => {

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const [addTodo] = useAddTodoMutation()
const dispatch = useDispatch()

  const {
    selectedDay,
    showSelectDay,
    todoId,
    todotext
    } = useSelector((state)=>state.localState)


    const handleNextButton = async (e) =>{
        e.preventDefault()
   if(todoId == 2){
    dispatch(setShowAddTodo(false))
     try {
      await addTodo({
         "todo": todotext,
         "dayOfWeek": selectedDay
       }).unwrap()
       toast.success('Todo added', {
        autoClose: 1000
      })
     } catch (error) {
       toast.error(error);
     }
   }else if(todoId == 1){
     dispatch(setShowSelectDay(true))
   }  
 }

 const  handleAddTodo =async(e)=>{
    e.preventDefault();
    dispatch(setShowSelectDay(false))
    dispatch(setShowAddTodo(false))
  try {
   await addTodo({
      "todo": todotext,
      "dayOfWeek": selectedDay
    }).unwrap()
    toast.success('Todo added', {
      autoClose: 1000
    })
  } catch (error) {
    toast.error(error);
  }
  }




  return (
        <div className='fixed top-0 left-0 w-screen h-screen z-50 bg-gray-800
         flex justify-center items-center' style={{
            backgroundColor: 'rgba(31, 41, 55, 0.7)'
         }}>
          <h1 className='absolute top-10 right-10 text-4xl text-gray-300
          font-bold'><button onClick={()=>  dispatch(setShowAddTodo(false))}>X</button></h1>
          <div className='p-4 w-2/4 h-2/4 flex flex-col'>
         
          <input type="text" name='New_todo' placeholder='Add New Todo' 
          className='w-10/12 h-20 p-4 mb-5 rounded-xl
          text-xl text-gray-700 focus:outline-none' 
          onChange={(e)=>dispatch(setTodoText(e.target.value))}/>
    
        {!showSelectDay &&(
          <button className='w-10/12 h-16 p-2 bg-blue-900 rounded-xl 
          text-xl text-white' onClick={handleNextButton}>Next</button>
        )}  
           
           {showSelectDay &&    (<>
            <select name='select' id='select' className='w-10/12 h-20 rounded-lg my-4
            focus:outline-none' value={selectedDay} 
            onChange={(e)=>dispatch(setSelectedDay(e.target.value))}>
              {daysOfWeek.map((day) => {
                return <option key={day} value={day} >{day}</option>;
              })}
            </select>
    
            <button className='w-10/12 h-16 p-2 bg-blue-900 rounded-xl 
          text-xl text-white' type='submit' onClick={handleAddTodo}>Done</button>
           </>) }
           
           
          </div>
        </div>
      )
  
}

export default ShowAddTodo