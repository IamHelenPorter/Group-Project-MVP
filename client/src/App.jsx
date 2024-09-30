import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
import HomePage from './components/HomePage.jsx';
import HospitalList from './components/HospitalList.jsx';
import HospitalProfile from './components/HospitalProfile';
import DoctorList from './components/DoctorList.jsx';
import DoctorListByHospital from './components/DoctorListbyHospital.jsx';
import SpecialityList from './components/SpecialityList.jsx';
import Registration from './components/Registration.jsx';
import Login from './components/Login.jsx';
import ProfilePage from './PatientProfile/ProfilePage.jsx';
import HospitalListBySpeciality from './components/HospitalListBySpeciality.jsx';
import DoctorListBySpecialityAndHospital from './components/DoctorListBySpecialityAndHospital.jsx';
import BookWithDoctor from './components/BookWithDoctor.jsx';
import Search from './components/Search.jsx';


import { useState, useContext } from 'react';
import AuthContext from "./context/AuthContext.js"
import axios from 'axios';

function App() {
   // !! converts the value to a boolean
    // if the token is present, isLoggedIn is true, else it is false
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const [error, setError] = useState('');
  
  const login = async (credentials) => {
    // send a POST request to /api/auth/login with the username and password
    try {
      // axios return a data object with the response from the server
      const { data } = await axios("/api/login", {
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

  // const login = (formData) => {
  //   // event.preventDefault();
  //   axios.post('/api/login', formData)
  //     .then(response => {
  //       // successful login
  //       console.log('Login successful', response.data);
  //       navigate('/');  
  //     })
  //     .catch(error => {
  //       setError(error.response ? error.response.data.message : 'Login failed');
  //     });
  // };

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
      <div>
        <Routes>
          {/* Existing Routes */}
          <Route path="/" element={<HomePage />} />
          {/* View all hospitals */}
          <Route path="/hospitals" element={<HospitalList />} />
          {/* View doctors by hospital */}
          <Route path="/hospitals/:hospital_id/doctor" element={<DoctorListByHospital />} />
          {/* View doctor profile */}
          
          <Route path="/hospitals/:id" element={<HospitalProfile />} />
          <Route path="/hospitals/:id/doctor" element={<DoctorList />} />
          <Route path="/speciality" element={<SpecialityList />} />
          <Route path= "/" element={<HomePage />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/doctor/:doctor_id/book" element={<BookWithDoctor />} />
          <Route path="/search" element={<Search />} />

          {/* New Routes */}
          {/* Hospitals by specialty */}
          <Route path="/hospitals/speciality/:speciality" element={<HospitalListBySpeciality />} />

          {/* Doctors by hospital and specialty */}
          <Route path="/doctor/hospital/:hospital_id/speciality/:speciality" element={<DoctorListBySpecialityAndHospital />} />
        </Routes>
      </div>
    </Router>
    </AuthContext.Provider>
  );
}

export default App;
