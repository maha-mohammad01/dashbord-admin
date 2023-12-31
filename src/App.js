import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dash from './dashboard/Dash';
import Login from './LoginAdmin/Login';
import Users from './dashboard/Users';
import Bookingground from './dashboard/Bookingground';
import DashboardA from './dashboard/DashboardA';
import SideBar from './dashboard/Sidebar';

function App() {
  return (
    <div className="App">
      <Router>
        
        <SideBar />
        <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/bookingground" element={<Bookingground />} />
        <Route path="/dashboarda" element={<DashboardA/>} />
      
          <Route path="/login" element={<Login />} />
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
