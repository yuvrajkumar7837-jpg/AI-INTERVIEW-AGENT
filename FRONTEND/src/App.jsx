import { Route, Routes } from 'react-router-dom';
import { Home } from './Pages/Home';
import { Auth } from './Pages/Auth';
import { useEffect } from 'react';
import axios from 'axios';
import { setUser } from './redux/userslice';
import { useDispatch } from 'react-redux';

export const ServerUrl = "http://localhost:8000/";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const res = await axios.get(ServerUrl + "api/user/current", {
          withCredentials: true 
        });
        dispatch(setUser(res.data));
      } catch (error) {
        if (error.response?.status === 401) {
          // User is not logged in (guest session)
          dispatch(setUser(null));
        } else {
          console.error("Error fetching current user:", error);
          dispatch(setUser(null));
        }
      }
    }; 

    getCurrentUser();
  }, [dispatch]);

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/auth' element={<Auth />} />
    </Routes>
  );
}

export default App;