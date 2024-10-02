import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SpecialityList() {
  const [specialities, setSpecialities] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/speciality')
      .then(response => {
        setSpecialities(response.data.data);
      })
      .catch(error => {
        console.error("Error fetching specialities:", error);
        setError('Failed to fetch specialities');
      });
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Specialities</h2>
      <ul>
        {specialities && specialities.map(speciality => (
          <li key={speciality.speciality}>
            <button onClick={() => navigate(`/hospitals/speciality/${speciality.speciality}`)}>
              {speciality.speciality}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SpecialityList;
