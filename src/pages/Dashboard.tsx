import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../redux/store'
import { logout } from '../redux/authSlice';
import NavigationSection from '../components/NavigationSection'
import StatisticsSection from '../components/StatisticsSection'
import WelcomeSection from '../components/WelcomeSection'

const Dashboard = () => {

  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  console.log(user);

  const handleLogout = async ()=>{
    dispatch(logout());
  }

  return (
    <div>
      <nav>
        <div>
          <h1>Plan.io</h1>
          <h3>Welcome {user?.name}</h3>
          <button onClick={handleLogout}>logout</button>
        </div>

        <WelcomeSection/>

        <StatisticsSection/>

        <NavigationSection/>

       
      </nav>
    </div>
  )
}

export default Dashboard;