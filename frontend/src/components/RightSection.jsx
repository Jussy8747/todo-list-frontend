import {
    setShowAddTodo,
    setTodoId,
   setSearchTodoItem,
   setSearchTodo2,
} from '../slices/localState.js'
import SearchItems from '../components/SearchItem.jsx';
import Todo from '../components/Todo';
import { useDispatch, useSelector } from 'react-redux'
import {  useEffect } from 'react';
import {useClearTodoMutation, useGetTodoQuery, useSearchTodoByDayQuery} from '../slices/TodoApiSlice'
import {SetTodo} from '../slices/TodoSlice.js'
import Spinner from './Spinner.jsx';
import Navbar from './Navbar.jsx';

const RightSection = () => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let today = new Date().getDay()

    
    const dispatch = useDispatch()
    const {searchTodo2, searchTodo, selectedDay, searchTodoItem} = useSelector((state)=>state.localState)
    const {todos} = useSelector((state)=>state.todo)
    
  
    const {data, isLoading, refetch} = useGetTodoQuery(selectedDay || daysOfWeek[today])
    const [clear ] = useClearTodoMutation()
    
    const {data: search} = useSearchTodoByDayQuery({
      day: selectedDay || daysOfWeek[today],
      q: searchTodo2,
    })

    const handleSeach = (e)=>{
      dispatch(setSearchTodo2(e.target.value)) 
      
    }
        useEffect(() => {
          refetch()
            if ( data) {
              dispatch(SetTodo([ ...data ]));
            }
            
          
          }, [ data,]);

        useEffect(()=>{
          searchTodo2.length > 0 && dispatch(setSearchTodoItem(search))
        }, [searchTodo2, dispatch, searchTodoItem, search])


          const handleClear = async () =>{
            await clear(selectedDay).unwrap();
          }

           
          

const todoRender = ()=>{
  {if(searchTodo2  || searchTodo){
    return searchTodoItem.map(item => <SearchItems key={item._id} item={item}/>)
  }else{
    return isLoading ? (
      <Spinner />
    ) : todos && todos.length > 0 ? (
       <div className='flex flex-col justify-center items-center'>

      {todos.map((item) => {
       
      return <Todo key={item._id}  item={item} />;
         
      })}
       <button className=' w-9/12 bg-red-700 
     mx-auto sm:ml-28 my-10 h-14 text-white text-2xl rounded-lg
     transition ease-in-out duration-200 hover:bg-gray-800'
     onClick={handleClear}>Clear Todos</button>
    </div>
    ) : (
      <div className='text-bg-gray-800 w-full h-full flex justify-center'>
         
          <div className=' mr-6 ml-4 h-10 mt-44 text-4xl'>
          <h1> Opp! no Todo for Today. </h1>
          <div className='flex flex-row-reverse mt-3'>
          <p className='text-xl pt-2'>Click Here To Add New Todo For {selectedDay}</p> 
          <button className='h-10 w-28 text-xl font-bold 
               text-gray-400 bg-blue-800 hover:bg-gray-900 
               transition duration-200 ease-in rounded-lg mr-2'
               onClick={()=>{
                 dispatch(setShowAddTodo(true))
                 dispatch(setTodoId(2))
               }}>Add Todo</button>
          </div>
              
            </div>
         </div>
    )
  } 
}
}





  return (
    <div className=" sm:flex-1 bg-gray-400 h-screen overflow-y-auto overflow-x-hidden scrollbar-hidden ">
      <Navbar/>
    <div className='hidden sm:flex flex-row justify-end items-center
       h-20 fixed top-0 mb-10 right-0 z-10 bg-gray-400 ml-2' style={{
        width: '81.25%'
       }}>
        
    <div className='w-2/6 flex' >
    <input type="text" name="search_todo" placeholder='search_todo'
    value={searchTodo2} onChange={handleSeach} 
   className='h-10 w-full
         focus:outline-none p-2 rounded-lg'/>
    
        <div className=' mr-6 ml-4 h-10 flex '>
            <button className='h-10 w-28 text-xl font-bold 
            text-gray-400 bg-gray-700 hover:bg-gray-900 
            transition duration-200 ease-in rounded-lg'
            onClick={()=>{
              dispatch(setShowAddTodo(true))
              dispatch(setTodoId(2))
            }}>Add Todo</button>
         </div>
    </div>
    </div>


        {/* todos */}

        <div className="mt-28">
      {searchTodo2 || searchTodo ? <h2 className='hidden sm:block text-2xl text-gray-800 pl-6 font-bold -mb-4 '>
       Search Result</h2> : <h2 className='hidden sm:block  text-2xl text-gray-800 pl-6 font-bold -mb-4 '>
        {selectedDay} Todos </h2>}
        
       { todoRender()}
        </div>
</div>
  )
}

export default RightSection