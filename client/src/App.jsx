import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage.jsx';
import HospitalList from './components/HospitalList.jsx';
import DoctorList from './components/DoctorList.jsx';
import SpecialtyList from './components/SpecialtyList.jsx';
import Registration from './components/Registration.jsx';
import Login from './components/Login.jsx';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/hospitals" element={<HospitalList />} />
          <Route path="/hospitals/:id/doctors" element={<DoctorList />} />
          <Route path="/specialties" element={<SpecialtyList />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
