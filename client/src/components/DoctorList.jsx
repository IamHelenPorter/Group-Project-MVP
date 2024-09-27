import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function DoctorList() {
  const { id } = useParams();
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    axios.get(`/api/doctor/hospital/${id}`)
      .then(response => {
        setDoctors(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the doctors!", error);
      });
  }, [id]);

  useEffect(() => {
    axios.get(`api/hospitals/${id}/doctors`)
      .then(response => {
        setDoctors(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the doctors!", error);
      });
  }, [id]);

  return (
    <div>
      <h2>Doctors at Hospital</h2>
      <ul>
        {doctors.map(doctor => (
          <li key={doctor.id}>{doctor.name} - {doctor.speciality}</li>
        ))}
      </ul>
    </div>
  );
}


export default DoctorList;

