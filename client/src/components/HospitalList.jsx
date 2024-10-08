import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function HospitalList() {
  const [hospitals, setHospitals] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/hospitals')
      .then(response => {
        setHospitals(response.data);
      })
      .catch(error => {
        console.error("Error fetching hospitals:", error);
        setError('Failed to fetch hospitals');
      });
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>All Hospitals</h2>
      <ul>
        {hospitals.length > 0 ? (
          hospitals.map(hospital => (
            <li key={hospital.hospital_id}>
              {/* Navigate to doctors list for the selected hospital */}
              <button onClick={() => navigate(`/hospitals/${hospital.hospital_id}/doctor`)}>
                {hospital.name} - {hospital.address}
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

export default HospitalList;
