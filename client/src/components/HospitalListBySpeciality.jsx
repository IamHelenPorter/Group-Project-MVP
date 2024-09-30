import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function HospitalListBySpeciality() {
  const { speciality } = useParams();
  const [hospitals, setHospitals] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/hospitals/speciality/${speciality}`)
      .then(response => {
        setHospitals(response.data.data);
      })
      .catch(error => {
        console.error("Error fetching hospitals:", error);
        setError('Failed to fetch hospitals');
      });
  }, [speciality]);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Hospitals Specialising in {speciality}</h2>
      <ul>
          {hospitals.length > 0 ? (
            hospitals.map((hospital) => (
        <li key={hospitals.hospital_id}> 
        <button onClick={() => navigate(`/doctor/hospitals/${hospitals.hospital_id}/speciality/${speciality}/doctor`)}>
          {hospitals.name} - {hospitals.address}
        </button>
        </li>
    ))
  ) : (
    <p>No hospitals available</p>
  )}
      </ul>

    </div>
  );
}

export default HospitalListBySpeciality;
