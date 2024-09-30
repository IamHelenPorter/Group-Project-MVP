import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function HospitalProfile() {
  const { id } = useParams(); 
  const [hospital, setHospital] = useState(null);


  useEffect(() => {
    axios.get(`/api/hospitals/${id}`) 
      .then(response => {
        setHospital(response.data[0]); 
      })
      .catch(error => {
        console.error("There was an error fetching the hospital details!", error);
      });
  }, [id]);

  if (!hospital) return <p>Loading hospital details...</p>;

  return (
    <div>
      <h2>{hospitals.name}</h2>
      <p>Address: {hospitals.address}</p>
      <p>Emergency Services: {hospitals.emergency ? 'Available' : 'Not Available'}</p>
      <p>Departments: {hospitals.departments}</p>
    </div>
  );
}

export default HospitalProfile;
