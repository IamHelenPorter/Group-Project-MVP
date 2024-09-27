import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function DoctorListByHospital() {
  const { hospital_id } = useParams();
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/hospitals/${hospital_id}/doctor`)
      .then(response => {
        setDoctors(response.data);
      })
      .catch(error => {
        console.error("Error fetching doctors:", error);
        setError('Failed to fetch doctors');
      });
  }, [hospital_id]);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Doctors at Hospital {hospital_id}</h2>
      <ul>
        {doctors.length > 0 ? (
          doctors.map(doctor => (
            <li key={doctor.doctor_id}>
              {/* Navigate to doctor profile */}
              <button onClick={() => navigate(`/doctor/${doctor.doctor_id}`)}>
                Dr. {doctor.first_name} {doctor.last_name} - {doctor.qualifications}
              </button>
            </li>
          ))
        ) : (
          <p>No doctors available</p>
        )}
      </ul>
    </div>
  );
}

export default DoctorListByHospital;
