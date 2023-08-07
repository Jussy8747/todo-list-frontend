import { FaTrashAlt} from 'react-icons/fa';
import {useDeteleTodoMutation} from '../slices/TodoApiSlice.js'
import { toast } from 'react-toastify';

const Todo = ({item}) => {
  const { todo, _id} = item





  const [deleteItem, {isLoading}] = useDeteleTodoMutation()

  const handleDelete = async()=>{
    try {
      await deleteItem(_id)
      toast.success('Todo deleted', {
        autoClose: 1000
      })
    } catch (error) {
      toast.error('field to delete todo')
    }
    
   
  }

  return (
    <div className="mt-10 sm:ml-16 p-4 bg-gray-800 w-10/12 relative rounded-xl">

<div>
    <p className='text-white text-xl'>{todo}</p>
</div>
{isLoading ? <span className="loader absolute bottom-0 right-1">wait..</span> : (
  <span className="absolute bottom-0 right-0 text-2xl text-red-600 font-bold
  p-3" onClick={handleDelete}><FaTrashAlt/></span>
)}

    </div>
  )
}

export default Todo