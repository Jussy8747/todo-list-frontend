import { useSelector, useDispatch } from 'react-redux';
import ShowAddTodo from '../components/ShowAddTodo';
import LeftSection from '../components/LeftSection';
import RightSection from '../components/RightSection';
import { login, setUserInfo } from '../slices/authSlice.js';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setSelectedDay } from '../slices/localState.js';


const MainPage = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let today = new Date().getDay();
  const { showAddTodo } = useSelector((state) => state.localState);
  

  useEffect(() => {
    
    const getProfile = async()=>{
      try {
        const res = await fetch('users/profile')
        if (res.ok) {
          const data = await res.json();
          dispatch(setUserInfo({ ...data }));
          dispatch(login({ ...data }));
        } 
      } catch (error) {
         (error)
      }
    }
  
getProfile()
},[dispatch]);


  useEffect(() => {
    dispatch(setSelectedDay(daysOfWeek[today]));
    if(!userInfo){
      nav('/')
    }
   
},[userInfo, nav]);


  return (
    <>
      {showAddTodo && <ShowAddTodo />}
      <div className="main flex m-h-full overflow-hidde relativen">
        {/* left section */}
        <LeftSection />

        {/* right section */}
        <RightSection />
      </div>
    </>
  )
};

export default MainPage;
