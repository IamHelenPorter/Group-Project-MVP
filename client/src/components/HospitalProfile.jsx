import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function HospitalProfile() {
  const { hospital_id } = useParams(); 
  const [hospital, setHospital] = useState(null);


  useEffect(() => {
    axios.get(`/api/hospitals/${hospital_id}`) 
      .then(response => {
        setHospital(response.data[0]); 
      })
      .catch(error => {
        console.error("There was an error fetching the hospital details!", error);
      });
  }, [hospital_id]);

  if (!hospital) return <p>Loading hospital details...</p>;

  return (
    <div>
      <h2>{hospital.name}</h2>
      <p>Address: {hospital.address}</p>
      <p>Emergency Services: {hospital.emergency ? 'Available' : 'Not Available'}</p>
      <p>Departments: {hospital.departments}</p>
    </div>
  );
}

export default HospitalProfile;
