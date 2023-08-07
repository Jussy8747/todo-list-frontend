import {useDeteleTodoMutation} from '../slices/TodoApiSlice.js'
import { FaTrashAlt} from 'react-icons/fa';

const SearchItems = ({item}) => {
    const {todo, dayOfWeek, _id} = item


    const [deleteItem, {isLoading}] = useDeteleTodoMutation()
  


    const handleDelete = async()=>{
        
      
        await deleteItem(_id)
       
      }

  return (
   <>
   
    <div className="mt-10 ml-16 p-4 bg-gray-800 w-10/12 relative rounded-xl">
    <h2 className='text-gray-400'>{dayOfWeek}</h2>
<div>
    <p className='text-white text-xl'>{todo}</p>
</div>
{isLoading ? <span className="loader absolute bottom-0 right-1">wait..</span> : (
  <span className="absolute bottom-0 right-0 text-2xl text-red-600 font-bold
  p-3" onClick={handleDelete}><FaTrashAlt/></span>
)}
    </div>
    </>  
  )
}

export default SearchItems