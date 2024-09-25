import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function HospitalList() {
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    axios.get('/api/hospitals')
      .then(response => {
        setHospitals(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the hospitals!", error);
      });
  }, []);

  return (
    <div>
      <h2>Hospitals</h2>
      <ul>
        {hospitals.map(hospital => (
          <li key={hospital.hospital_id}>
            <Link to={`/hospitals/${hospital.hospital_id}/doctors`}>{hospital.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}


export default HospitalList;

