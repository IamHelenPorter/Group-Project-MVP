import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function HomePage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [searchInitiated, setSearchInitiated] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    // Make API call to search endpoint
    axios.get(`/api/search?query=${query}`)
      .then(response => {
        setResults(response.data.data); 
      })
      .catch(error => {
        console.error("Error fetching search results:", error);
        setError('Failed to fetch search results');
      });
  };

  const handleResultClick = (result) => {
    if (result.type === 'doctor') {
      navigate(`/doctor/${result.doctor_id}/book`);
    } else if (result.type === 'hospital') {
      navigate(`/hospitals/${result.hospital_id}/doctor`);
    } else if (result.type === 'speciality') {
      navigate(`/hospitals/speciality/${result.speciality}`);
    }
  };

  return (
    <div>
      <h1>Welcome to Our Hospital Portal</h1>
      <p>Search for doctors, hospitals, or specialities</p>

      {/* Search Bar */}
      <form onSubmit={handleSearch}>
        <input
          type="text"
          name="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search doctors, specialities, or hospitals by name"
        />
        <button type="submit">Search</button>
      </form>

      {/* Display search results */}
      {error && <p>{error}</p>}
      <ul>
      {searchInitiated && results.length === 0 && !error ? (
          <p>No results found</p>
        ) : (
          results.map(result => (
            <li key={result.type === 'doctor' ? result.doctor_id : result.hospital_id || result.speciality}>
              <button onClick={() => handleResultClick(result)}>
                {result.type === 'doctor' && `Dr. ${result.first_name} ${result.last_name} - ${result.speciality} at ${result.hospital_name}`}
                {result.type === 'hospital' && `${result.hospital_name}`}
                {result.type === 'speciality' && `Speciality: ${result.speciality}`}
              </button>
            </li>
          ))
        )}
      </ul>

      {/* Navigation Buttons */}
      <button onClick={() => navigate('/speciality')}>View Specialities</button>
      <button onClick={() => navigate('/hospitals')}>View Hospitals</button>

      {/* Registration/Login Buttons */}
      <button onClick={() => navigate('/register')}>Register</button>
      <button onClick={() => navigate('/login')}>Login</button>
    </div>
  );
}

export default HomePage;
