import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    const query = event.target.elements.search.value;
    // Add search functionality based on query
    console.log('Searching for:', query);
  };

  return (
    <div>
      <h1>Welcome to Our Hospital Portal</h1>
      <p>Search for doctors, hospitals, or specialties</p>

      {/* Search Bar */}
      <form onSubmit={handleSearch}>
        <input type="text" name="search" placeholder="Search doctors by name" />
        <button type="submit">Search</button>
      </form>

      {/* Navigation Buttons */}
      <button onClick={() => navigate('/specialties')}>View Specialties</button>
      <button onClick={() => navigate('/hospitals')}>View Hospitals</button>

      {/* Registration/Login Buttons */}
      <button onClick={() => navigate('/register')}>Register</button>
      <button onClick={() => navigate('/login')}>Login</button>
    </div>
  );
}

export default HomePage;