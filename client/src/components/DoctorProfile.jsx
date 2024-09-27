import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function DoctorProfile() {
  const { doctor_id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`/api/doctor/${doctor_id}`)
      .then(response => {
        setDoctor(response.data);
      })
      .catch(error => {
        console.error("Error fetching doctor profile:", error);
        setError('Failed to fetch doctor profile');
      });
  }, [doctor_id]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!doctor) {
    return <p>Loading doctor profile...</p>;
  }

  return (
    <div>
      <h2>Dr. {doctor.first_name} {doctor.last_name}</h2>
      <p>Speciality: {doctor.speciality}</p>
      <p>Qualifications: {doctor.qualifications}</p>
      <p>Hospital: {doctor.hospital_name}</p>
    </div>
  );
}

export default DoctorProfile;
