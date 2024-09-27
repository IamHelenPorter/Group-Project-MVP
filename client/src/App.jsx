import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomePage from './components/HomePage.jsx';
import HospitalList from './components/HospitalList.jsx';
import HospitalProfile from './components/HospitalProfile';
import DoctorList from './components/DoctorList.jsx';
import DoctorListByHospital from './components/DoctorListbyHospital.jsx';
import DoctorProfile from './components/DoctorProfile.jsx';
import SpecialityList from './components/SpecialityList.jsx';
import Registration from './components/Registration.jsx';
import Login from './components/Login.jsx';
import ProfilePage from './PatientProfile/ProfilePage.jsx';
import HospitalListBySpeciality from './components/HospitalListBySpeciality.jsx';
import DoctorListBySpecialityAndHospital from './components/DoctorListBySpecialityAndHospital.jsx';

function App() {
  return (
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
          <Route path="/doctor/:doctor_id" element={<DoctorProfile />} />

          <Route path="/hospitals/:id" element={<HospitalProfile />} />
          <Route path="/hospitals/:id/doctor" element={<DoctorList />} />
          <Route path="/speciality" element={<SpecialityList />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<ProfilePage />} />

          {/* New Routes */}
          {/* Hospitals by specialty */}
          <Route path="/hospitals/speciality/:speciality" element={<HospitalListBySpeciality />} />

          {/* Doctors by hospital and specialty */}
          <Route path="/doctor/hospital/:hospital_id/speciality/:speciality" element={<DoctorListBySpecialityAndHospital />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
