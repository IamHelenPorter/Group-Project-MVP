import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon'

import HomePage from './components/HomePage.jsx';

import HospitalList from './components/HospitalList.jsx';
import DoctorList from './components/DoctorList.jsx';
import SpecialtyList from './components/SpecialtyList.jsx';
import Registration from './components/Registration.jsx';
import Login from './components/Login.jsx';
import BookWithDoctor from './components/BookWithDoctor.jsx';
import ProfilePage from './PatientProfile/ProfilePage.jsx'


function App() {
  return (
    <Router>
      <div>
        <LocalizationProvider dateAdapter={AdapterLuxon}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/hospitals" element={<HospitalList />} />
            <Route path="/hospitals/:id/doctors" element={<DoctorList />} />
            <Route path="/specialties" element={<SpecialtyList />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/login" element={<Login />} />

            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/doctor/:doctor_id" element={<BookWithDoctor />} />

          </Routes>
        </LocalizationProvider>
      </div>
    </Router>
  );
}

export default App;
