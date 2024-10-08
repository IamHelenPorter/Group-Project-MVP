import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon'

import PrivateRoute from './components/PrivateRoute.jsx';
import Navbar from './components/Navbar.jsx';

import Homepage from './components/Homepage.jsx';
import HospitalList from './components/HospitalList.jsx';
import HospitalProfile from './components/HospitalProfile.jsx';
import DoctorList from './components/DoctorList.jsx';
import DoctorListByHospital from './components/DoctorListbyHospital.jsx';
import SpecialityList from './components/SpecialityList.jsx';
import Registration from './components/Registration.jsx';
import Login from './components/Login.jsx';
import ProfilePage from './PatientProfile/ProfilePage.jsx';
import HospitalListBySpeciality from './components/HospitalListBySpeciality.jsx';
import DoctorListBySpecialityAndHospital from './components/DoctorListBySpecialityAndHospital.jsx';
import BookWithDoctor from './components/BookWithDoctor.jsx';



import { useState, useContext } from 'react';
import AuthContext from "./context/AuthContext.js"
import axios from 'axios';

function App() {
   // !! converts the value to a boolean
    // if the token is present, isLoggedIn is true, else it is false
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  
  const login = async (credentials) => {
    // send a POST request to /api/auth/login with the username and password
    try {
      // axios return a data object with the response from the server
      const { data } = await axios("http://localhost:4000/api/login", {
        method: "POST",
        data: credentials,
      });
      console.log("logged in", data);
      //store it locally
      localStorage.setItem("token", data.token);
      

      // update the isLoggedIn state
      setIsLoggedIn(true);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    // remove the token from the local storage
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  const authObj = {
    isLoggedIn,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authObj}>
      
      
      
    <Router>
    <Navbar/>
      <div>
      <LocalizationProvider dateAdapter={AdapterLuxon}>
        <Routes>

          <Route path="/navbar" element={<Navbar />}/>
        
          {/* Existing Routes */}
          <Route path="/" element={<Homepage />} />
          {/* View all hospitals */}
          <Route path="/hospitals" element={<HospitalList />} />
          {/* View doctors by hospital */}
          <Route path="/hospitals/:hospital_id/doctor" element={<DoctorListByHospital />} />
          {/* View doctor profile */}
          
          <Route path="/hospitals/:hospital_id" element={<HospitalProfile />} />
          <Route path="/hospitals/:id/doctor" element={<DoctorList />} />
          <Route path="/speciality" element={<SpecialityList />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/doctor/:doctor_id/book" element={<BookWithDoctor />} />

          {/* New Routes */}
          {/* Hospitals by specialty */}
          <Route path="/hospitals/speciality/:speciality" element={<HospitalListBySpeciality />} />

          {/* Doctors by hospital and specialty */}
          <Route path="/doctor/hospitals/:hospital_id/speciality/:speciality/doctor" element={<DoctorListBySpecialityAndHospital />} />
        </Routes>
        </LocalizationProvider>
      </div>
    </Router>
    </AuthContext.Provider>
  );
}

export default App;
