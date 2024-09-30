import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function DoctorListBySpecialityAndHospital() {
  const { hospital_id, speciality } = useParams();
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`/api/doctor/hospitals/${hospital_id}/speciality/${speciality}/doctor`)
      .then(response => {
        setDoctors(response.data);
      })
      .catch(error => {
        console.error("Error fetching doctors:", error);
        setError('Failed to fetch doctors');
      });
  }, [hospital_id, speciality]);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Doctors Specialising in {speciality} at Hospital {hospital_id}</h2>
      <ul>
        {doctors.length > 0 ? (
          doctors.map(doctor => (
            <li key={doctor.doctor_id}>
              {doctor.first_name} {doctor.last_name} - {doctor.qualifications}
            </li>
          ))
        ) : (
          <p>No doctors available</p>
        )}
      </ul>
    </div>
  );
}

export default DoctorListBySpecialityAndHospital;
